import { setErrors } from "../../../utils/utility";
import apiServices from "../../../services/requestHandler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  redeemRequest: undefined,
  loading: false,
  error: null,
};

export const redeemRequest = createAsyncThunk(
  "redeem/request",
  async (args, thunkApi) => {
    const { data, setError } = args;

    try {
      const response = await apiServices.redeemRequest(data);
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

const redeemRequestSlice = createSlice({
  name: "redeem-request",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(redeemRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(redeemRequest.fulfilled, (state, action) => {
      if (action?.payload) state.redeemRequest = action.payload.data;
      state.loading = false;
    });
    builder.addCase(redeemRequest.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default redeemRequestSlice.reducer;
export const { setErrorMessage } = redeemRequestSlice.actions;
