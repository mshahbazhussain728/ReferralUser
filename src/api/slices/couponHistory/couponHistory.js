// // // import { setErrors } from "../../../utils/utility";
// // // import apiServices from "../../../services/requestHandler";
// // // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // // const initialState = {
// // //   couponHistory: [],
// // //   loading: true,
// // //   error: null,
// // // };

// // // export const readCouponHistory = createAsyncThunk(
// // //   "coupon/history",
// // //   async (args, thunkApi) => {
// // //     const { params, setError } = args;

// // //     try {
// // //       const response = await apiServices.couponHistory(params);
// // //       return response?.data;
// // //     } catch (e) {
// // //       const errorMessage = e?.response?.data?.message || "Network Error";
// // //       thunkApi.dispatch(setErrorMessage(errorMessage));
// // //       setErrors(setError, e?.response?.data || {});

// // //       return thunkApi.rejectWithValue({
// // //         message: errorMessage,
// // //         status: e?.response?.status || 500,
// // //       });
// // //     }
// // //   }
// // // );

// // // const couponHistorySlice = createSlice({
// // //   name: "coupon-history",
// // //   initialState,
// // //   reducers: {
// // //     setErrorMessage: (state, action) => {
// // //       state.error = action.payload;
// // //     },
// // //   },
// // //   extraReducers: (builder) => {
// // //     builder.addCase(readCouponHistory.pending, (state) => {
// // //       state.loading = true;
// // //     });
// // //     builder.addCase(readCouponHistory.fulfilled, (state, action) => {
// // //       if (action?.payload) state.couponHistory = action.payload.data;
// // //       state.loading = false;
// // //     });
// // //     builder.addCase(readCouponHistory.rejected, (state) => {
// // //       state.loading = false;
// // //     });
// // //   },
// // // });

// // // export default couponHistorySlice.reducer;
// // // export const { setErrorMessage } = couponHistorySlice.actions;


// // // import { setErrors } from "../../../utils/utility";
// // // import apiServices from "../../../services/requestHandler";
// // // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // // const initialState = {
// // //   couponHistory: {
// // //     data: [],
// // //     pagination: {
// // //       total: 0,
// // //       page: 1,
// // //       size: 10,
// // //       pages: 0,
// // //     },
// // //   },
// // //   loading: false,
// // //   error: null,
// // // };

// // // export const readCouponHistory = createAsyncThunk(
// // //   "coupon/history",
// // //   async (args, thunkApi) => {
// // //     const { params, setError } = args;

// // //     try {
// // //       console.log("🔵 API call with params:", params);
// // //       const response = await apiServices.couponHistory(params);
// // //       console.log("🟢 API Response:", response?.data);
      
// // //       return response?.data;
// // //     } catch (e) {
// // //       const errorMessage = e?.response?.data?.message || "Network Error";
// // //       thunkApi.dispatch(setErrorMessage(errorMessage));
// // //       setErrors(setError, e?.response?.data || {});

// // //       console.error("🔴 API Error:", errorMessage);

// // //       return thunkApi.rejectWithValue({
// // //         message: errorMessage,
// // //         status: e?.response?.status || 500,
// // //       });
// // //     }
// // //   }
// // // );

// // // const couponHistorySlice = createSlice({
// // //   name: "coupon-history",
// // //   initialState,
// // //   reducers: {
// // //     setErrorMessage: (state, action) => {
// // //       state.error = action.payload;
// // //     },
// // //   },
// // //   extraReducers: (builder) => {
// // //     builder.addCase(readCouponHistory.pending, (state) => {
// // //       console.log("⏳ Loading coupon history...");
// // //       state.loading = true;
// // //       state.error = null;
// // //     });
    
// // //     builder.addCase(readCouponHistory.fulfilled, (state, action) => {
// // //       console.log("✅ Fulfilled with payload:", action.payload);
// // //       console.log("📊 action.payload.data:", action.payload?.data);
// // //       console.log("📊 action.payload.pagination:", action.payload?.pagination);
      
// // //       state.loading = false;
      
// // //       if (action?.payload) {
// // //         state.couponHistory = {
// // //           data: action.payload?.data || [],
// // //           pagination: action.payload?.pagination || {
// // //             total: 0,
// // //             page: 1,
// // //             size: 10,
// // //             pages: 0,
// // //           },
// // //         };
// // //         console.log("📊 State updated to:", state.couponHistory);
// // //       }
// // //     });
    
// // //     builder.addCase(readCouponHistory.rejected, (state, action) => {
// // //       console.error("❌ Rejected:", action.payload);
// // //       state.loading = false;
// // //       state.error = action.payload?.message || "Failed to fetch";
// // //       state.couponHistory = initialState.couponHistory;
// // //     });
// // //   },
// // // });

// // // export default couponHistorySlice.reducer;
// // // export const { setErrorMessage } = couponHistorySlice.actions;




// // import { setErrors } from "../../../utils/utility";
// // import apiServices from "../../../services/requestHandler";
// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   couponHistory: undefined,
// //   loading: true,
// //   error: null,
// // };

// // export const readCouponHistory = createAsyncThunk(
// //   "coupon/history",
// //   async (args, thunkApi) => {
// //     const { params, setError } = args;

// //     try {
// //       const response = await apiServices.couponHistory(params);
// //       return response?.data;
// //     } catch (e) {
// //       const errorMessage = e?.response?.data?.message || "Network Error";
// //       thunkApi.dispatch(setErrorMessage(errorMessage));
// //       setErrors(setError, e?.response?.data || {});

// //       return thunkApi.rejectWithValue({
// //         message: errorMessage,
// //         status: e?.response?.status || 500,
// //       });
// //     }
// //   }
// // );

// // const couponHistorySlice = createSlice({
// //   name: "coupon-history",
// //   initialState,
// //   reducers: {
// //     setErrorMessage: (state, action) => {
// //       state.error = action.payload;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder.addCase(readCouponHistory.pending, (state) => {
// //       state.loading = true;
// //     });
// //     builder.addCase(readCouponHistory.fulfilled, (state, action) => {
// //       if (action?.payload) {
// //         // Structure the data to match what the hook expects
// //         state.couponHistory = {
// //           data: action.payload.data,
// //           pagination: {
// //             total: action.payload.pagination?.total || 0,
// //             page: action.payload.pagination?.page || 1,
// //             size: action.payload.pagination?.size || 10,
// //             pages: action.payload.pagination?.pages || 0,
// //           }
// //         };
// //       }
// //       state.loading = false;
// //     });
// //     builder.addCase(readCouponHistory.rejected, (state) => {
// //       state.loading = false;
// //     });
// //   },
// // });

// // export default couponHistorySlice.reducer;
// // export const { setErrorMessage } = couponHistorySlice.actions;





import { setErrors } from "../../../utils/utility";
import apiServices from "../../../services/requestHandler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  couponHistory: {
    data: [],
    pagination: { total: 0, page: 1, size: 10, pages: 0 },
  },
  loading: false,
  error: null,
};

export const readCouponHistory = createAsyncThunk(
  "coupon/history",
  async (args, thunkApi) => {
    const { params, setError } = args;

    try {
      const response = await apiServices.couponHistory(params);
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

const couponHistorySlice = createSlice({
  name: "coupon-history",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readCouponHistory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(readCouponHistory.fulfilled, (state, action) => {
      state.couponHistory = {
        data: Array.isArray(action.payload?.data) ? action.payload.data : [],
        pagination: {
          total: action.payload?.pagination?.total || 0,
          page: action.payload?.pagination?.page || 1,
          size: action.payload?.pagination?.size || 10,
          pages: action.payload?.pagination?.pages || 0,
        },
      };
      state.loading = false;
    });

    builder.addCase(readCouponHistory.rejected, (state) => {
      state.couponHistory = {
        data: [],
        pagination: { total: 0, page: 1, size: 10, pages: 0 },
      };
      state.loading = false;
    });
  },
});

export default couponHistorySlice.reducer;
export const { setErrorMessage } = couponHistorySlice.actions;



