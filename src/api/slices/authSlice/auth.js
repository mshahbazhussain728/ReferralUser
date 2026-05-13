import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiServices from "../../../services/requestHandler";
import { setErrors } from "../../../utils/utility";
import Cookies from "js-cookie";

// ── Cookie Options ────────────────────────────────────────────────────────────
const COOKIE_OPTIONS = {
  expires: 1,
  sameSite: "Lax",
  secure: true,
  path: "/",
};

const USER_COOKIE_KEY = "referralUser";

// ── Storage Helpers ───────────────────────────────────────────────────────────
// IMPORTANT: always pass user WITH accessToken/refreshToken embedded
// so the referralUser cookie fallback in getAuthToken() always works
const saveUserToStorage = (user) => {
  try {
    if (user) {
      Cookies.set(USER_COOKIE_KEY, JSON.stringify(user), {
        expires: 7,
        sameSite: "Lax",
        secure: true,
        path: "/",
      });
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      Cookies.remove(USER_COOKIE_KEY, { path: "/" });
      localStorage.removeItem("user");
    }
  } catch {
    // Silently fail
  }
};

const getUserFromStorage = () => {
  try {
    const fromCookie = Cookies.get(USER_COOKIE_KEY);
    if (fromCookie) return JSON.parse(fromCookie);

    const fromLocal = localStorage.getItem("user");
    if (fromLocal) return JSON.parse(fromLocal);

    return null;
  } catch {
    return null;
  }
};

// ── Clear All Auth Storage ────────────────────────────────────────────────────
const clearAllStorage = () => {
  Cookies.remove("accessToken", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });
  Cookies.remove(USER_COOKIE_KEY, { path: "/" });
  Cookies.remove("FamoCareAppleUID", { path: "/" });
  Cookies.remove("FamoCareAppleUsername", { path: "/" });
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("FamoCareAppleUserID");
  localStorage.removeItem("FamoCareAppleUsername");
};

// ── Rehydrate on Load ─────────────────────────────────────────────────────────
const savedUser = getUserFromStorage();

const initialState = {
  user: savedUser || null,
  signedUser: savedUser || null,
  loading: false,
  authLoading: false,
  error: null,
  errorData: null,
};

// ── Thunks ────────────────────────────────────────────────────────────────────

// Regular Login
export const logIn = createAsyncThunk("login/user", async (args, thunkApi) => {
  const { data, setError } = args;
  try {
    const response = await apiServices.login(data);
    const userData = response?.data;

    if (userData?.success) {
      const { accessToken, refreshToken, user } = userData;

      if (accessToken) Cookies.set("accessToken", accessToken, COOKIE_OPTIONS);
      if (refreshToken) Cookies.set("refreshToken", refreshToken, { ...COOKIE_OPTIONS, expires: 7 });

      // FIX: embed tokens inside user so referralUser cookie fallback works
      const userWithToken = { ...user, accessToken, refreshToken };
      saveUserToStorage(userWithToken);
      thunkApi.dispatch(setUser(userWithToken));
    }

    return userData;
  } catch (e) {
    thunkApi.dispatch(setErrorMessage(e?.data?.message || "Login failed"));
    setErrors(setError, e?.data?.data || {});
    return thunkApi.rejectWithValue({
      error: e?.response?.data?.message || "Login failed",
      data: e?.response?.data?.data,
    });
  }
});

// Sign Up
export const signUp = createAsyncThunk("signup/user", async (args, thunkApi) => {
  const { data, setError } = args;
  try {
    const response = await apiServices.signUp(data);
    thunkApi.dispatch(setErrorMessage(null));
    return response.data;
  } catch (e) {
    setErrors(setError, e?.data?.data);
    thunkApi.dispatch(setErrorMessage(e?.data?.data?.message));
    return e;
  }
});

// Log Out
export const logoutUser = createAsyncThunk("user/logout", async (_, thunkApi) => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    const accessToken = Cookies.get("accessToken");

    // Hardcoded absolute URL — bypasses HttpProvider/interceptors completely
    await fetch("https://apis.famocare.com/api/referralsystem/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({ refreshToken: refreshToken || "" }),
    });
  } catch {
    // Silently ignore logout API errors — always clear storage
  } finally {
    // Always clear everything regardless of API success/failure
    clearAllStorage();
    thunkApi.dispatch(setUser(null));
    thunkApi.dispatch(setSignedUser(null));
    thunkApi.dispatch(setErrorMessage(null));
  }
  return true;
});

// ── Slice ─────────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Central setter — syncs Redux + cookies + localStorage
    setUser: (state, action) => {
      state.user = action.payload;
      state.signedUser = action.payload;
      saveUserToStorage(action.payload);
    },

    setSignedUser: (state, action) => {
      state.signedUser = action.payload;
    },

    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },

    // OAuth handler — used by Apple & Google OAuth flows
    // FIX: saves user WITH tokens embedded so referralUser cookie fallback works
    setOAuthUser: (state, action) => {
      const payload = action.payload;

      // Support both camelCase and snake_case token keys from different providers
      const accessToken = payload.accessToken || payload.access_token || null;
      const refreshToken = payload.refreshToken || payload.refresh_token || null;

      // Strip ALL token fields from user object
      const {
        accessToken: _a1,
        refreshToken: _r1,
        access_token: _a2,
        refresh_token: _r2,
        ...userFields
      } = payload;

      // Apple only sends user fields on FIRST login — reuse existing on subsequent logins
      const user = Object.keys(userFields).length > 0
        ? userFields
        : (state.user || {});

      // Save standalone token cookies
      if (accessToken) {
        Cookies.set("accessToken", accessToken, COOKIE_OPTIONS);
      }
      if (refreshToken) {
        Cookies.set("refreshToken", refreshToken, { ...COOKIE_OPTIONS, expires: 7 });
      }

      // Clear stale user data before saving fresh
      Cookies.remove(USER_COOKIE_KEY, { path: "/" });
      localStorage.removeItem("user");

      // FIX: embed tokens inside user object so referralUser cookie
      // fallback in getAuthToken() always finds the token
      const userWithToken = { ...user, accessToken, refreshToken };

      state.user = userWithToken;
      state.signedUser = userWithToken;
      saveUserToStorage(userWithToken);
    },
  },

  extraReducers: (builder) => {

    // ── Sign Up ───────────────────────────────────────────────────────────────
    builder.addCase(signUp.pending, (state) => { state.loading = true; });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      if (action?.payload) state.signedUser = action.payload.data;
    });
    builder.addCase(signUp.rejected, (state) => { state.loading = false; });

    // ── Log In ────────────────────────────────────────────────────────────────
    builder.addCase(logIn.pending, (state) => { state.loading = true; });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loading = false;
      if (action?.payload?.success) {
        const { accessToken, refreshToken, user } = action.payload;
        // FIX: embed tokens in user state (consistent with logIn thunk above)
        const userWithToken = { ...user, accessToken, refreshToken };
        state.user = userWithToken;
        state.signedUser = userWithToken;
        saveUserToStorage(userWithToken);
      }
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.loading = false;
      state.errorData = action.payload?.data || null;
    });

    // ── Log Out ───────────────────────────────────────────────────────────────
    builder.addCase(logoutUser.pending, (state) => { state.loading = true; });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.signedUser = null;
      state.error = null;
      state.errorData = null;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.signedUser = null;
      state.error = null;
      state.errorData = null;
    });
  },
});

export default authSlice.reducer;
export const { setUser, setSignedUser, setErrorMessage, setOAuthUser } =
  authSlice.actions;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import apiServices from "../../../services/requestHandler";
// import { setErrors } from "../../../utils/utility";
// import Cookies from "js-cookie";

// // ── Cookie Options ────────────────────────────────────────────────────────────
// const COOKIE_OPTIONS = {
//   expires:  1,
//   sameSite: "Lax",
//   secure:   true,
//   path:     "/",
// };

// const USER_COOKIE_KEY = "referralUser";

// // ── Storage Helpers ───────────────────────────────────────────────────────────
// const saveUserToStorage = (user) => {
//   try {
//     if (user) {
//       Cookies.set(USER_COOKIE_KEY, JSON.stringify(user), {
//         expires:  7,
//         sameSite: "Lax",
//         secure:   true,
//         path:     "/",
//       });
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       Cookies.remove(USER_COOKIE_KEY, { path: "/" });
//       localStorage.removeItem("user");
//     }
//   } catch {
//     // Silently fail
//   }
// };

// const getUserFromStorage = () => {
//   try {
//     const fromCookie = Cookies.get(USER_COOKIE_KEY);
//     if (fromCookie) return JSON.parse(fromCookie);

//     const fromLocal = localStorage.getItem("user");
//     if (fromLocal) return JSON.parse(fromLocal);

//     return null;
//   } catch {
//     return null;
//   }
// };

// // ── Clear All Auth Storage ────────────────────────────────────────────────────
// const clearAllStorage = () => {
//   Cookies.remove("accessToken",           { path: "/" });
//   Cookies.remove("refreshToken",          { path: "/" });
//   Cookies.remove(USER_COOKIE_KEY,         { path: "/" });
//   Cookies.remove("FamoCareAppleUID",      { path: "/" });
//   Cookies.remove("FamoCareAppleUsername", { path: "/" });
//   localStorage.removeItem("user");
//   localStorage.removeItem("FamoCareAppleUserID");
//   localStorage.removeItem("FamoCareAppleUsername");
// };

// // ── Rehydrate on Load ─────────────────────────────────────────────────────────
// const savedUser = getUserFromStorage();

// const initialState = {
//   user:        savedUser || null,
//   signedUser:  savedUser || null,
//   loading:     false,
//   authLoading: false,
//   error:       null,
//   errorData:   null,
// };

// // ── Thunks ────────────────────────────────────────────────────────────────────

// // Regular Login
// export const logIn = createAsyncThunk("login/user", async (args, thunkApi) => {
//   const { data, setError } = args;
//   try {
//     const response = await apiServices.login(data);
//     const userData = response?.data;

//     if (userData?.success) {
//       const { accessToken, refreshToken, user } = userData;

//       if (accessToken)  Cookies.set("accessToken",  accessToken,  COOKIE_OPTIONS);
//       if (refreshToken) Cookies.set("refreshToken", refreshToken, { ...COOKIE_OPTIONS, expires: 7 });

//       saveUserToStorage(user);
//       thunkApi.dispatch(setUser(user));
//     }

//     return userData;
//   } catch (e) {
//     thunkApi.dispatch(setErrorMessage(e?.data?.message || "Login failed"));
//     setErrors(setError, e?.data?.data || {});
//     return thunkApi.rejectWithValue({
//       error: e?.response?.data?.message || "Login failed",
//       data:  e?.response?.data?.data,
//     });
//   }
// });

// // Sign Up
// export const signUp = createAsyncThunk("signup/user", async (args, thunkApi) => {
//   const { data, setError } = args;
//   try {
//     const response = await apiServices.signUp(data);
//     thunkApi.dispatch(setErrorMessage(null));
//     return response.data;
//   } catch (e) {
//     setErrors(setError, e?.data?.data);
//     thunkApi.dispatch(setErrorMessage(e?.data?.data?.message));
//     return e;
//   }
// });

// // Log Out
// export const logoutUser = createAsyncThunk("user/logout", async (_, thunkApi) => {
//   try {
//     const refreshToken = Cookies.get("refreshToken");
//     const accessToken  = Cookies.get("accessToken");

//     // Hardcoded absolute URL — bypasses HttpProvider/interceptors completely
//     await fetch("https://apis.famocare.com/api/referralsystem/auth/logout", {
//       method:  "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
//       },
//       body: JSON.stringify({ refreshToken: refreshToken || "" }),
//     });
//   } catch (e) {
//     // Silently ignore logout API errors — always clear storage
//   } finally {
//     // Always clear everything regardless of API success/failure
//     clearAllStorage();
//     thunkApi.dispatch(setUser(null));
//     thunkApi.dispatch(setSignedUser(null));
//     thunkApi.dispatch(setErrorMessage(null));
//   }
//   return true;
// });

// // ── Slice ─────────────────────────────────────────────────────────────────────
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {

//     // Central setter — syncs Redux + cookies + localStorage
//     setUser: (state, action) => {
//       state.user       = action.payload;
//       state.signedUser = action.payload;
//       saveUserToStorage(action.payload);
//     },

//     setSignedUser: (state, action) => {
//       state.signedUser = action.payload;
//     },

//     setErrorMessage: (state, action) => {
//       state.error = action.payload;
//     },

//     // OAuth handler — clears stale data first, saves fresh user
//     setOAuthUser: (state, action) => {
//       const { accessToken, refreshToken, ...user } = action.payload;

//       if (accessToken) {
//         Cookies.set("accessToken", accessToken, COOKIE_OPTIONS);
//       }
//       if (refreshToken) {
//         Cookies.set("refreshToken", refreshToken, { ...COOKIE_OPTIONS, expires: 7 });
//       }

//       // Clear old stale user from ALL storage before saving fresh one
//       Cookies.remove(USER_COOKIE_KEY, { path: "/" });
//       localStorage.removeItem("user");

//       state.user       = user;
//       state.signedUser = user;
//       saveUserToStorage(user);
//     },
//   },

//   extraReducers: (builder) => {

//     // ── Sign Up ───────────────────────────────────────────────────────────────
//     builder.addCase(signUp.pending,   (state) => { state.loading = true; });
//     builder.addCase(signUp.fulfilled, (state, action) => {
//       state.loading = false;
//       if (action?.payload) state.signedUser = action.payload.data;
//     });
//     builder.addCase(signUp.rejected,  (state) => { state.loading = false; });

//     // ── Log In ────────────────────────────────────────────────────────────────
//     builder.addCase(logIn.pending,   (state) => { state.loading = true; });
//     builder.addCase(logIn.fulfilled, (state, action) => {
//       state.loading = false;
//       if (action?.payload?.success) {
//         state.user       = action.payload.user;
//         state.signedUser = action.payload.user;
//         saveUserToStorage(action.payload.user);
//       }
//     });
//     builder.addCase(logIn.rejected, (state, action) => {
//       state.loading   = false;
//       state.errorData = action.payload?.data || null;
//     });

//     // ── Log Out ───────────────────────────────────────────────────────────────
//     builder.addCase(logoutUser.pending,   (state) => { state.loading = true; });
//     builder.addCase(logoutUser.fulfilled, (state) => {
//       state.loading    = false;
//       state.user       = null;
//       state.signedUser = null;
//       state.error      = null;
//       state.errorData  = null;
//     });
//     builder.addCase(logoutUser.rejected, (state) => {
//       state.loading    = false;
//       state.user       = null;
//       state.signedUser = null;
//       state.error      = null;
//       state.errorData  = null;
//     });
//   },
// });

// export default authSlice.reducer;
// export const { setUser, setSignedUser, setErrorMessage, setOAuthUser } =
//   authSlice.actions;

