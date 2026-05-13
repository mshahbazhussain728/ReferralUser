






// import { setErrors } from "../../../utils/utility";
// import apiServices from "../../../services/requestHandler";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   redeemHistory: [],
//   pagination: {
//     total: 0,
//     page: 1,
//     size: 10,
//     pages: 0,
//   },
//   loading: true,
//   error: null,
// };

// // Read Redeem History - GET API
// export const readRedeemHistory = createAsyncThunk(
//   "redeem/history",
//   async (args, thunkApi) => {
//     const { params, setError } = args;

//     try {
//       const response = await apiServices.redeemHistory(params);
      
//       // API returns: { success, message, data: [...], pagination: {...} }
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

// // Update Redeem History - POST API
// export const updateRedeemHistory = createAsyncThunk(
//   "redeem/history/update",
//   async (args, thunkApi) => {
//     const { data, setError } = args;

//     try {
//       const response = await apiServices.updateRedeemHistory(data);
      
//       // API returns: { success, message, data: {...} }
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

// const redeemHistorySlice = createSlice({
//   name: "redeem-history",
//   initialState,
//   reducers: {
//     setErrorMessage: (state, action) => {
//       state.error = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     resetRedeemHistory: (state) => {
//       state.redeemHistory = [];
//       state.pagination = initialState.pagination;
//       state.loading = true;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Read Redeem History
//     builder.addCase(readRedeemHistory.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(readRedeemHistory.fulfilled, (state, action) => {
//       if (action?.payload) {
//         state.redeemHistory = action.payload.data || [];
//         state.pagination = action.payload.pagination || initialState.pagination;
//       }
//       state.loading = false;
//     });
//     builder.addCase(readRedeemHistory.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload?.message || "Failed to load redeem history";
//     });

//     // Update Redeem History
//     builder.addCase(updateRedeemHistory.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(updateRedeemHistory.fulfilled, (state, action) => {
//       if (action?.payload?.data) {
//         // Update the specific item in the redeemHistory array
//         const updatedItem = action.payload.data;
//         const index = state.redeemHistory.findIndex(item => item.id === updatedItem.id);
        
//         if (index !== -1) {
//           state.redeemHistory[index] = updatedItem;
//         }
//       }
//       state.loading = false;
//     });
//     builder.addCase(updateRedeemHistory.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload?.message || "Failed to update redeem history";
//     });
//   },
// });

// export default redeemHistorySlice.reducer;
// export const { setErrorMessage, clearError, resetRedeemHistory } = redeemHistorySlice.actions;





import { setErrors } from "../../../utils/utility";
import apiServices from "../../../services/requestHandler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  redeemHistory: [],
  pagination: {
    total: 0,
    page: 1,
    size: 10,
    pages: 0,
  },
  loading: false, // ✅ was `true` — caused infinite loader before first fetch
  error: null,
};

// Read Redeem History - GET API
export const readRedeemHistory = createAsyncThunk(
  "redeem/history",
  async (args, thunkApi) => {
    const { params, setError } = args;

    try {
      const response = await apiServices.redeemHistory(params);
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

// Update Redeem History - POST API
export const updateRedeemHistory = createAsyncThunk(
  "redeem/history/update",
  async (args, thunkApi) => {
    const { data, setError } = args;

    try {
      const response = await apiServices.updateRedeemHistory(data);
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

const redeemHistorySlice = createSlice({
  name: "redeem-history",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetRedeemHistory: (state) => {
      state.redeemHistory = [];
      state.pagination = initialState.pagination;
      state.loading = false; // ✅ was `true` — reset should not trigger loader
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── Read Redeem History ──────────────────────────────────────────
    builder.addCase(readRedeemHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(readRedeemHistory.fulfilled, (state, action) => {
      // ✅ Always update state regardless of payload shape
      state.redeemHistory = Array.isArray(action.payload?.data)
        ? action.payload.data
        : [];
      state.pagination = action.payload?.pagination || initialState.pagination;
      state.loading = false;
    });

    builder.addCase(readRedeemHistory.rejected, (state, action) => {
      // ✅ Reset data on error so empty state shows instead of stale data
      state.redeemHistory = [];
      state.pagination = initialState.pagination;
      state.loading = false;
      state.error = action.payload?.message || "Failed to load redeem history";
    });

    // ── Update Redeem History ────────────────────────────────────────
    builder.addCase(updateRedeemHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateRedeemHistory.fulfilled, (state, action) => {
      if (action.payload?.data) {
        const updatedItem = action.payload.data;
        const index = state.redeemHistory.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.redeemHistory[index] = updatedItem;
        }
      }
      state.loading = false;
    });

    builder.addCase(updateRedeemHistory.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload?.message || "Failed to update redeem history";
    });
  },
});

export default redeemHistorySlice.reducer;
export const { setErrorMessage, clearError, resetRedeemHistory } =
  redeemHistorySlice.actions;