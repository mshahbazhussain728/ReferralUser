






// import { setErrors } from "../../../utils/utility";
// import apiServices from "../../../services/requestHandler";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   freeUser: {
//     users: [],
//     stats: {
//       totalUsers: 0,
//       thisMonthUsers: 0,
//       thisWeekUsers: 0,
//       revenue: 0,
//     },
//     pagination: {
//       totalRecords: 0,
//       currentPage: 1,
//       totalPages: 1,
//       pageSize: 10,
//     },
//   },
//   loading: false,
//   error: null,
// };

// export const readFreeUserListing = createAsyncThunk(
//   "free/user",
//   async (args, thunkApi) => {
//     const { params, setError } = args;

//     try {
//       const response = await apiServices.freeUsers(params);

//       // response?.data is the full API response:
//       // {
//       //   success: true,
//       //   message: "Free users fetched successfully.",
//       //   pagination: { totalRecords, currentPage, perPage, totalPages },
//       //   data: {
//       //     freeUsers: [ { id, referredUid, points, name, image, type,
//       //                    phoneCode, balance, phoneNo, installedDate,
//       //                    createdAt, updatedAt, deletedAt, Subscriptions[] } ],
//       //     stats: { totalUsers, thisMonthUsers, thisWeekUsers, revenue }
//       //   }
//       // }
//       return response?.data;
//     } catch (e) {
//       const errorMessage = e?.response?.data?.message || "Network Error";
//       thunkApi.dispatch(setErrorMessage(errorMessage));
//       setErrors(setError, e?.response?.data || {});

//       return thunkApi.rejectWithValue({
//         message: errorMessage,
//         status: e?.response?.status || 500,
//       });
//     }
//   }
// );

// const freeUserSlice = createSlice({
//   name: "free-user",
//   initialState,
//   reducers: {
//     setErrorMessage: (state, action) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(readFreeUserListing.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });

//     builder.addCase(readFreeUserListing.fulfilled, (state, action) => {
//       state.loading = false;

//       const payload = action.payload;
//       if (!payload) return;

//       // payload is the full API response object:
//       // payload.data.freeUsers  → user rows
//       // payload.data.stats      → summary stats
//       // payload.pagination      → pagination info

//       // Users
//       state.freeUser.users = payload?.data?.freeUsers ?? [];

//       // Stats
//       state.freeUser.stats = {
//         totalUsers:     payload?.data?.stats?.totalUsers     ?? 0,
//         thisMonthUsers: payload?.data?.stats?.thisMonthUsers ?? 0,
//         thisWeekUsers:  payload?.data?.stats?.thisWeekUsers  ?? 0,
//         revenue:        payload?.data?.stats?.revenue        ?? 0,
//       };

//       // Pagination — API returns "perPage", slice stores it as "pageSize"
//       state.freeUser.pagination = {
//         totalRecords: payload?.pagination?.totalRecords ?? 0,
//         currentPage:  payload?.pagination?.currentPage  ?? 1,
//         totalPages:   payload?.pagination?.totalPages   ?? 1,
//         pageSize:     payload?.pagination?.perPage      ?? 10,
//       };
//     });

//     builder.addCase(readFreeUserListing.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload?.message || "Failed to fetch users";
//       state.freeUser.users = [];
//     });
//   },
// });

// export default freeUserSlice.reducer;
// export const { setErrorMessage } = freeUserSlice.actions;




// import { setErrors } from "../../../utils/utility";
// import apiServices from "../../../services/requestHandler";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   freeUser: {
//     users: [],
//     stats: {
//       totalUsers: 0,
//       thisMonthUsers: 0,
//       thisWeekUsers: 0,
//       revenue: 0,
//     },
//     pagination: {
//       totalRecords: 0,
//       currentPage: 1,
//       totalPages: 1,
//       pageSize: 10,
//     },
//   },
//   loading: false,
//   error: null,
// };

// export const readFreeUserListing = createAsyncThunk(
//   "free/user",
//   async (args, thunkApi) => {
//     const { params, setError } = args;

//     try {
//       // get() in HttpProvider returns raw axios response
//       // so response.data = full API response body:
//       // {
//       //   success: true,
//       //   message: "Free users fetched successfully.",
//       //   pagination: { totalRecords, currentPage, perPage, totalPages },
//       //   data: {
//       //     freeUsers: [...],
//       //     stats: { totalUsers, thisMonthUsers, thisWeekUsers, revenue }
//       //   }
//       // }
//       const response = await apiServices.freeUsers(params);
//       return response?.data;
//     } catch (e) {
//       const errorMessage = e?.response?.data?.message || "Network Error";
//       thunkApi.dispatch(setErrorMessage(errorMessage));
//       setErrors(setError, e?.response?.data || {});
//       return thunkApi.rejectWithValue({
//         message: errorMessage,
//         status: e?.response?.status || 500,
//       });
//     }
//   }
// );

// const freeUserSlice = createSlice({
//   name: "free-user",
//   initialState,
//   reducers: {
//     setErrorMessage: (state, action) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(readFreeUserListing.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });

//     builder.addCase(readFreeUserListing.fulfilled, (state, action) => {
//       state.loading = false;

//       const payload = action.payload;
//       if (!payload) return;

//       // payload = full API response body
//       // payload.data.freeUsers  → user rows
//       // payload.data.stats      → summary stats
//       // payload.pagination      → pagination meta (uses "perPage" not "pageSize")

//       state.freeUser.users = payload?.data?.freeUsers ?? [];

//       state.freeUser.stats = {
//         totalUsers:     payload?.data?.stats?.totalUsers     ?? 0,
//         thisMonthUsers: payload?.data?.stats?.thisMonthUsers ?? 0,
//         thisWeekUsers:  payload?.data?.stats?.thisWeekUsers  ?? 0,
//         revenue:        payload?.data?.stats?.revenue        ?? 0,
//       };

//       state.freeUser.pagination = {
//         totalRecords: payload?.pagination?.totalRecords ?? 0,
//         currentPage:  payload?.pagination?.currentPage  ?? 1,
//         totalPages:   payload?.pagination?.totalPages   ?? 1,
//         pageSize:     payload?.pagination?.perPage      ?? 10, // API sends "perPage", stored as "pageSize"
//       };
//     });

//     builder.addCase(readFreeUserListing.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload?.message || "Failed to fetch users";
//       state.freeUser.users = [];
//     });
//   },
// });

// export default freeUserSlice.reducer;
// export const { setErrorMessage } = freeUserSlice.actions;






import { setErrors } from "../../../utils/utility";
import apiServices from "../../../services/requestHandler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  freeUser: {
    users: [],
    stats: {
      totalUsers:     0,
      thisMonthUsers: 0,
      thisWeekUsers:  0,
      revenue:        0,
    },
    pagination: {
      totalRecords: 0,
      currentPage:  1,
      totalPages:   1,
      pageSize:     10,
    },
  },
  loading: false,
  error:   null,
};

// GET /referrals/users/free
// Response: { pagination, data: { freeUsers[], stats: {} } }
export const readFreeUserListing = createAsyncThunk(
  "free/user",
  async (args, thunkApi) => {
    const { params, setError } = args;
    try {
      const response = await apiServices.freeUsers(params); // ← GET /free
      return response?.data;
    } catch (e) {
      const errorMessage = e?.response?.data?.message || "Network Error";
      thunkApi.dispatch(setErrorMessage(errorMessage));
      setErrors(setError, e?.response?.data || {});
      return thunkApi.rejectWithValue({
        message: errorMessage,
        status: e?.response?.status || 500,
      });
    }
  }
);

const freeUserSlice = createSlice({
  name: "free-user",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readFreeUserListing.pending, (state) => {
      state.loading = true;
      state.error   = null;
    });
    builder.addCase(readFreeUserListing.fulfilled, (state, action) => {
      state.loading = false;
      const payload = action.payload;
      if (!payload) return;

      state.freeUser.users = payload?.data?.freeUsers ?? [];

      state.freeUser.stats = {
        totalUsers:     payload?.data?.stats?.totalUsers     ?? 0,
        thisMonthUsers: payload?.data?.stats?.thisMonthUsers ?? 0,
        thisWeekUsers:  payload?.data?.stats?.thisWeekUsers  ?? 0,
        revenue:        payload?.data?.stats?.revenue        ?? 0,
      };

      state.freeUser.pagination = {
        totalRecords: payload?.pagination?.totalRecords ?? 0,
        currentPage:  payload?.pagination?.currentPage  ?? 1,
        totalPages:   payload?.pagination?.totalPages   ?? 1,
        pageSize:     payload?.pagination?.perPage      ?? 10,
      };
    });
    builder.addCase(readFreeUserListing.rejected, (state, action) => {
      state.loading        = false;
      state.error          = action.payload?.message || "Failed to fetch users";
      state.freeUser.users = [];
    });
  },
});

export default freeUserSlice.reducer;
export const { setErrorMessage } = freeUserSlice.actions;



