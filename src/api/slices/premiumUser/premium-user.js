

// import { setErrors } from "../../../utils/utility";
// import apiServices from "../../../services/requestHandler";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   premiumUser:     undefined,
//   allPremiumUsers: undefined,
//   referralCounts:  undefined,
//   loading:         false,
//   countsLoading:   false,
//   error:           null,
// };

// // POST /referrals/users/details
// // Body: { uid, type, status?, sort?, page, size }
// // Response: { metrics: { total, thisWeek, thisMonth, thisYear, totalrevenue, data[] }, pagination }
// // Each data item has a Subscriptions[] array with subscription details
// export const readPremiumUsers = createAsyncThunk(
//   "premium/user",
//   async (args, thunkApi) => {
//     const { data, setError } = args;
//     try {
//       const response = await apiServices.getReferredUserDetails(data);
//       return response?.data;
//     } catch (e) {
//       const errorMessage = e?.response?.data?.message || "Network Error";
//       thunkApi.dispatch(setErrorMessage(errorMessage));
//       if (setError) setErrors(setError, e?.response?.data || {});
//       return thunkApi.rejectWithValue({
//         message: errorMessage,
//         status: e?.response?.status || 500,
//       });
//     }
//   }
// );

// // POST /referrals/users/premium/all → simplified users (monthly/yearly main page)
// // Response: { success, message, count, data: [{ id, name, email, createdAt, status }] }
// export const readAllPremiumUsers = createAsyncThunk(
//   "premium/allUsers",
//   async (args, thunkApi) => {
//     const { data } = args;
//     try {
//       const response = await apiServices.allPremiumUsers(data);
//       return response?.data;
//     } catch (e) {
//       return thunkApi.rejectWithValue({
//         message: e?.response?.data?.message || "Network Error",
//       });
//     }
//   }
// );

// // POST /referrals/details/get → pre-computed counts per category
// // Response: { data: { monthlyTrialUsers, monthlySubscribedUsers, monthlyCanceledUsers,
// //                     monthlyTotal, yearlyTrialUsers, yearlySubscribedUsers,
// //                     yearlyCanceledUsers, yearlyTotal, freeUsers } }
// export const readReferralCounts = createAsyncThunk(
//   "premium/referralCounts",
//   async (args, thunkApi) => {
//     const { data } = args;
//     try {
//       const response = await apiServices.getReferredUser(data);
//       return response?.data;
//     } catch (e) {
//       return thunkApi.rejectWithValue({
//         message: e?.response?.data?.message || "Network Error",
//       });
//     }
//   }
// );

// const premiumUsersSlice = createSlice({
//   name: "premium-users",
//   initialState,
//   reducers: {
//     setErrorMessage: (state, action) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {

//     // ── readPremiumUsers ──────────────────────────────────────────────────
//     builder.addCase(readPremiumUsers.pending, (state) => {
//       state.loading = true;
//       state.error   = null;
//     });
//     builder.addCase(readPremiumUsers.fulfilled, (state, action) => {
//       state.loading = false;
//       const payload = action.payload;
//       if (!payload) return;

//       // Store raw data[] (with Subscriptions[] intact).
//       // Flattening happens in the hook so each page can shape data its own way.
//       state.premiumUser = {
//         data: payload?.metrics?.data ?? [],
//         metrics: {
//           total:        payload?.metrics?.total        ?? 0,
//           thisMonth:    payload?.metrics?.thisMonth    ?? 0,
//           thisWeek:     payload?.metrics?.thisWeek     ?? 0,
//           thisYear:     payload?.metrics?.thisYear     ?? 0,
//           totalrevenue: payload?.metrics?.totalrevenue ?? 0,
//         },
//         pagination: {
//           total:      payload?.pagination?.total      ?? 0,
//           page:       payload?.pagination?.page       ?? 1,
//           size:       payload?.pagination?.size       ?? 10,
//           totalPages: payload?.pagination?.totalPages ?? 1,
//         },
//       };
//     });
//     builder.addCase(readPremiumUsers.rejected, (state, action) => {
//       state.loading = false;
//       state.error   = action.payload?.message || "Failed to fetch users";
//     });

//     // ── readAllPremiumUsers ───────────────────────────────────────────────
//     builder.addCase(readAllPremiumUsers.pending, (state) => {
//       state.loading = true;
//       state.error   = null;
//     });
//     builder.addCase(readAllPremiumUsers.fulfilled, (state, action) => {
//       state.loading = false;
//       const payload = action.payload;
//       if (!payload) return;

//       state.allPremiumUsers = {
//         data:  payload?.data  ?? [],
//         count: payload?.count ?? 0,
//       };
//     });
//     builder.addCase(readAllPremiumUsers.rejected, (state, action) => {
//       state.loading = false;
//       state.error   = action.payload?.message || "Failed to fetch users";
//     });

//     // ── readReferralCounts ────────────────────────────────────────────────
//     builder.addCase(readReferralCounts.pending, (state) => {
//       state.countsLoading = true;
//     });
//     builder.addCase(readReferralCounts.fulfilled, (state, action) => {
//       state.countsLoading = false;
//       const payload = action.payload;
//       if (!payload) return;
//       // Stores the full data object:
//       // { freeUsers, monthlyTrialUsers, monthlySubscribedUsers, monthlyCanceledUsers,
//       //   monthlyTotal, yearlyTrialUsers, yearlySubscribedUsers, yearlyCanceledUsers, yearlyTotal }
//       state.referralCounts = payload?.data;
//     });
//     builder.addCase(readReferralCounts.rejected, (state) => {
//       state.countsLoading = false;
//     });
//   },
// });

// export default premiumUsersSlice.reducer;
// export const { setErrorMessage } = premiumUsersSlice.actions;



////Updates




import { setErrors } from "../../../utils/utility";
import apiServices from "../../../services/requestHandler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  premiumUser:     undefined,
  allPremiumUsers: undefined,
  referralCounts:  undefined,
  loading:         false,
  countsLoading:   false,
  error:           null,
};

// POST /referrals/users/details
// Body: { uid, type, status?, sort?, page, size }
// status values: trial | active | canceled | expired | refunded
// Response: { metrics: { total, thisWeek, thisMonth, thisYear, totalrevenue, data[] }, pagination }
export const readPremiumUsers = createAsyncThunk(
  "premium/user",
  async (args, thunkApi) => {
    const { data, setError } = args;
    try {
      const response = await apiServices.getReferredUserDetails(data);
      return response?.data;
    } catch (e) {
      const errorMessage = e?.response?.data?.message || "Network Error";
      thunkApi.dispatch(setErrorMessage(errorMessage));
      if (setError) setErrors(setError, e?.response?.data || {});
      return thunkApi.rejectWithValue({
        message: errorMessage,
        status: e?.response?.status || 500,
      });
    }
  }
);

// POST /referrals/users/premium/all → simplified users (monthly/yearly main page)
// Response: { success, message, count, data: [{ id, name, email, createdAt, status }] }
export const readAllPremiumUsers = createAsyncThunk(
  "premium/allUsers",
  async (args, thunkApi) => {
    const { data } = args;
    try {
      const response = await apiServices.allPremiumUsers(data);
      return response?.data;
    } catch (e) {
      return thunkApi.rejectWithValue({
        message: e?.response?.data?.message || "Network Error",
      });
    }
  }
);

// POST /referrals/details/get → pre-computed counts per category
// Response: { data: { freeUsers,
//   monthlyTrialUsers, monthlySubscribedUsers, monthlyCanceledUsers,
//   monthlyExpiredUsers, monthlyRefundedUsers, monthlyTotal,
//   yearlyTrialUsers, yearlySubscribedUsers, yearlyCanceledUsers,
//   yearlyExpiredUsers, yearlyRefundedUsers, yearlyTotal } }
export const readReferralCounts = createAsyncThunk(
  "premium/referralCounts",
  async (args, thunkApi) => {
    const { data } = args;
    try {
      const response = await apiServices.getReferredUser(data);
      return response?.data;
    } catch (e) {
      return thunkApi.rejectWithValue({
        message: e?.response?.data?.message || "Network Error",
      });
    }
  }
);

const premiumUsersSlice = createSlice({
  name: "premium-users",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {

    // ── readPremiumUsers ──────────────────────────────────────────────────
    builder.addCase(readPremiumUsers.pending, (state) => {
      state.loading = true;
      state.error   = null;
    });
    builder.addCase(readPremiumUsers.fulfilled, (state, action) => {
      state.loading = false;
      const payload = action.payload;
      if (!payload) return;

      state.premiumUser = {
        data: payload?.metrics?.data ?? [],
        metrics: {
          total:        payload?.metrics?.total        ?? 0,
          thisMonth:    payload?.metrics?.thisMonth    ?? 0,
          thisWeek:     payload?.metrics?.thisWeek     ?? 0,
          thisYear:     payload?.metrics?.thisYear     ?? 0,
          totalrevenue: payload?.metrics?.totalrevenue ?? 0,
        },
        pagination: {
          total:      payload?.pagination?.total      ?? 0,
          page:       payload?.pagination?.page       ?? 1,
          size:       payload?.pagination?.size       ?? 10,
          totalPages: payload?.pagination?.totalPages ?? 1,
        },
      };
    });
    builder.addCase(readPremiumUsers.rejected, (state, action) => {
      state.loading = false;
      state.error   = action.payload?.message || "Failed to fetch users";
    });

    // ── readAllPremiumUsers ───────────────────────────────────────────────
    builder.addCase(readAllPremiumUsers.pending, (state) => {
      state.loading = true;
      state.error   = null;
    });
    builder.addCase(readAllPremiumUsers.fulfilled, (state, action) => {
      state.loading = false;
      const payload = action.payload;
      if (!payload) return;

      state.allPremiumUsers = {
        data:  payload?.data  ?? [],
        count: payload?.count ?? 0,
      };
    });
    builder.addCase(readAllPremiumUsers.rejected, (state, action) => {
      state.loading = false;
      state.error   = action.payload?.message || "Failed to fetch users";
    });

    // ── readReferralCounts ────────────────────────────────────────────────
    builder.addCase(readReferralCounts.pending, (state) => {
      state.countsLoading = true;
    });
    builder.addCase(readReferralCounts.fulfilled, (state, action) => {
      state.countsLoading = false;
      const payload = action.payload;
      if (!payload) return;
      // Stores the full data object from API — keys include:
      // monthlyRefundedUsers, yearlyRefundedUsers, monthlyExpiredUsers, yearlyExpiredUsers, etc.
      state.referralCounts = payload?.data;
    });
    builder.addCase(readReferralCounts.rejected, (state) => {
      state.countsLoading = false;
    });
  },
});

export default premiumUsersSlice.reducer;
export const { setErrorMessage } = premiumUsersSlice.actions;

