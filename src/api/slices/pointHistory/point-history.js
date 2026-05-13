// import { setErrors } from "../../../utils/utility";
// import apiServices from "../../../services/requestHandler";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   pointsHistory: [],
//   loading: true,
//   error: null,
// };

// export const readPointsHistory = createAsyncThunk(
//   "points/history",
//   async (args, thunkApi) => {
//     const { params, setError } = args;

//     try {
//       const response = await apiServices.pointsHistory(params);

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

// const pointsHistorySlice = createSlice({
//   name: "points-history",
//   initialState,
//   reducers: {
//     setErrorMessage: (state, action) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(readPointsHistory.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(readPointsHistory.fulfilled, (state, action) => {
//       state.loading = false;
//       if (action?.payload) state.pointsHistory = action.payload.data;
//     });
//     builder.addCase(readPointsHistory.rejected, (state) => {
//       state.loading = false;
//     });
//   },
// });

// export default pointsHistorySlice.reducer;
// export const { setErrorMessage } = pointsHistorySlice.actions;





import { setErrors } from "../../../utils/utility";
import apiServices from "../../../services/requestHandler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  pointsHistory: [],
  loading: false, // ✅ FIX: was true, caused perpetual loading state
  error: null,
};

export const readPointsHistory = createAsyncThunk(
  "points/history",
  async (args, thunkApi) => {
    const { params, setError } = args;

    try {
      const response = await apiServices.pointsHistory(params);
      return response?.data;
    } catch (e) {
      const errorMessage = e?.response?.data?.message || "Network Error";
      thunkApi.dispatch(setErrorMessage(errorMessage));
      if (setError) setErrors(setError, e?.response?.data || {}); // ✅ FIX: guard against undefined setError
      return thunkApi.rejectWithValue({
        message: errorMessage,
        status: e?.response?.status || 500,
      });
    }
  }
);

const pointsHistorySlice = createSlice({
  name: "points-history",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readPointsHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readPointsHistory.fulfilled, (state, action) => {
      state.loading = false;
      if (action?.payload) {
        state.pointsHistory = action.payload.data || []; // ✅ FIX: fallback to []
      }
    });
    builder.addCase(readPointsHistory.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default pointsHistorySlice.reducer;
export const { setErrorMessage } = pointsHistorySlice.actions;