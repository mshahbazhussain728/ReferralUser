// // // // import apiServices from "../../../services/requestHandler";
// // // // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // // // const initialState = {
// // // //   myRewards: null,
// // // //   rewardsDiscount: null,
// // // //   rewardsCoupon: null,
// // // //   loading: true,
// // // //   isLoading: false,
// // // //   error: null,
// // // //   // activeRewardPoints: null,
// // // // };

// // // // export const readMyRewards = createAsyncThunk(
// // // //   "my/rewards",
// // // //   async (args, thunkApi) => {
// // // //     const { data, setError } = args;
// // // //     try {
// // // //       const response = await apiServices.myRewards(data);

// // // //       return response?.data;
// // // //     } catch (e) {
// // // //       const errorMessage = e?.response?.data?.message || "Network Error";
// // // //       thunkApi.dispatch(setErrorMessage(errorMessage));

// // // //       return thunkApi.rejectWithValue({
// // // //         message: errorMessage,
// // // //         status: e?.response?.status || 500,
// // // //       });
// // // //     }
// // // //   }
// // // // );

// // // // export const readMyRewardsDiscount = createAsyncThunk(
// // // //   "rewards/discount",
// // // //   async (args, thunkApi) => {
// // // //     try {
// // // //       const response = await apiServices.myRewardsDiscount();

// // // //       return response?.data;
// // // //     } catch (e) {
// // // //       const errorMessage = e?.response?.data?.message || "Network Error";
// // // //       thunkApi.dispatch(setErrorMessage(errorMessage));

// // // //       return thunkApi.rejectWithValue({
// // // //         message: errorMessage,
// // // //         status: e?.response?.status || 500,
// // // //       });
// // // //     }
// // // //   }
// // // // );

// // // // export const createCoupon = createAsyncThunk(
// // // //   "create/coupon",
// // // //   async (args, thunkApi) => {
// // // //     const { data, setError } = args;

// // // //     try {
// // // //       const response = await apiServices.rewardsCoupon(data);
// // // //       return response?.data;
// // // //     } catch (e) {
// // // //       const errorMessage = e?.response?.data?.message || "Network Error";
// // // //       thunkApi.dispatch(setErrorMessage(errorMessage));
// // // //       setErrors(setError, e?.response?.data || {});

// // // //       return thunkApi.rejectWithValue({
// // // //         message: errorMessage,
// // // //         status: e?.response?.status || 500,
// // // //       });
// // // //     }
// // // //   }
// // // // );

// // // // const myRewardsSlice = createSlice({
// // // //   name: "my-rewards",
// // // //   initialState,
// // // //   reducers: {
// // // //     setErrorMessage: (state, action) => {
// // // //       state.error = action.payload;
// // // //     },
// // // //   },
// // // //   extraReducers: (builder) => {
// // // //     builder.addCase(readMyRewards.pending, (state) => {
// // // //       state.loading = true;
// // // //     });
// // // //     builder.addCase(readMyRewards.fulfilled, (state, action) => {
// // // //       if (action?.payload) {
// // // //         state.myRewards = action.payload.data;

// // // //         // state.activeRewardPoints = action.payload.data?.reward?.active || null;
// // // //       }

// // // //       state.loading = false;
// // // //     });
// // // //     builder.addCase(readMyRewards.rejected, (state) => {
// // // //       state.loading = false;
// // // //     });
// // // //     builder.addCase(readMyRewardsDiscount.pending, (state) => {
// // // //       state.loading = true;
// // // //     });
// // // //     builder.addCase(readMyRewardsDiscount.fulfilled, (state, action) => {
// // // //       if (action?.payload) state.rewardsDiscount = action.payload.data;
// // // //       state.loading = false;
// // // //     });
// // // //     builder.addCase(readMyRewardsDiscount.rejected, (state) => {
// // // //       state.loading = false;
// // // //     });
// // // //     builder.addCase(createCoupon.pending, (state) => {
// // // //       state.isLoading = true;
// // // //     });
// // // //     builder.addCase(createCoupon.fulfilled, (state, action) => {
// // // //       if (action?.payload) state.rewardsCoupon = action.payload.data;
// // // //       state.isLoading = false;
// // // //     });
// // // //     builder.addCase(createCoupon.rejected, (state) => {
// // // //       state.isLoading = false;
// // // //     });
// // // //   },
// // // // });

// // // // export default myRewardsSlice.reducer;
// // // // export const { setErrorMessage } = myRewardsSlice.actions;




// // import apiServices from "../../../services/requestHandler";
// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   myRewards: null,
// //   rewardsDiscount: null,
// //   rewardsCoupon: null,
// //   loading: true,
// //   isLoading: false,
// //   error: null,
// // };

// // export const readMyRewards = createAsyncThunk(
// //   "my/rewards",
// //   async (args, thunkApi) => {
// //     const { data, setError } = args;
// //     try {
// //       const response = await apiServices.myRewards(data);
// //       return response?.data;
// //     } catch (e) {
// //       const errorMessage = e?.response?.data?.message || "Network Error";
// //       thunkApi.dispatch(setErrorMessage(errorMessage));
// //       return thunkApi.rejectWithValue({
// //         message: errorMessage,
// //         status: e?.response?.status || 500,
// //       });
// //     }
// //   }
// // );

// // export const readMyRewardsDiscount = createAsyncThunk(
// //   "rewards/discount",
// //   async (args, thunkApi) => {
// //     try {
// //       const response = await apiServices.myRewardsDiscount();
// //       return response?.data;
// //     } catch (e) {
// //       const errorMessage = e?.response?.data?.message || "Network Error";
// //       thunkApi.dispatch(setErrorMessage(errorMessage));
// //       return thunkApi.rejectWithValue({
// //         message: errorMessage,
// //         status: e?.response?.status || 500,
// //       });
// //     }
// //   }
// // );

// // export const createCoupon = createAsyncThunk(
// //   "create/coupon",
// //   async (args, thunkApi) => {
// //     const { data, setError } = args;
// //     try {
// //       const response = await apiServices.rewardsCoupon(data);
// //       // ✅ Pass points used back so the slice can update myRewards immediately
// //       return { ...response?.data, _pointsUsed: data?.points };
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

// // const myRewardsSlice = createSlice({
// //   name: "my-rewards",
// //   initialState,
// //   reducers: {
// //     setErrorMessage: (state, action) => {
// //       state.error = action.payload;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder.addCase(readMyRewards.pending, (state) => {
// //       state.loading = true;
// //     });
// //     builder.addCase(readMyRewards.fulfilled, (state, action) => {
// //       if (action?.payload) {
// //         state.myRewards = action.payload.data;
// //       }
// //       state.loading = false;
// //     });
// //     builder.addCase(readMyRewards.rejected, (state) => {
// //       state.loading = false;
// //     });

// //     builder.addCase(readMyRewardsDiscount.pending, (state) => {
// //       state.loading = true;
// //     });
// //     builder.addCase(readMyRewardsDiscount.fulfilled, (state, action) => {
// //       if (action?.payload) state.rewardsDiscount = action.payload.data;
// //       state.loading = false;
// //     });
// //     builder.addCase(readMyRewardsDiscount.rejected, (state) => {
// //       state.loading = false;
// //     });

// //     builder.addCase(createCoupon.pending, (state) => {
// //       state.isLoading = true;
// //     });
// //     builder.addCase(createCoupon.fulfilled, (state, action) => {
// //       if (action?.payload) {
// //         state.rewardsCoupon = action.payload.data;

// //         // ✅ Immediately update myRewards in Redux so all components reflect
// //         // the new balance and coupon points without waiting for a re-fetch
// //         const pointsUsed = action.payload._pointsUsed || 0;
// //         if (state.myRewards?.reward && pointsUsed) {
// //           state.myRewards = {
// //             ...state.myRewards,
// //             reward: {
// //               ...state.myRewards.reward,
// //               active: (state.myRewards.reward.active ?? 0) - pointsUsed,
// //               coupons: (state.myRewards.reward.coupons ?? 0) + pointsUsed,
// //             },
// //           };
// //         }
// //       }
// //       state.isLoading = false;
// //     });
// //     builder.addCase(createCoupon.rejected, (state) => {
// //       state.isLoading = false;
// //     });
// //   },
// // });

// // export default myRewardsSlice.reducer;
// // export const { setErrorMessage } = myRewardsSlice.actions;




// import apiServices from "../../../services/requestHandler";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   myRewards: null,
//   rewardsDiscount: null,
//   rewardsCoupon: null,
//   loading: true,
//   isLoading: false,
//   error: null,
// };

// export const readMyRewards = createAsyncThunk(
//   "my/rewards",
//   async (args, thunkApi) => {
//     const { data, setError } = args;
//     try {
//       const response = await apiServices.myRewards(data);
//       return response?.data;
//     } catch (e) {
//       const errorMessage = e?.response?.data?.message || "Network Error";
//       thunkApi.dispatch(setErrorMessage(errorMessage));
//       return thunkApi.rejectWithValue({
//         message: errorMessage,
//         status: e?.response?.status || 500,
//       });
//     }
//   }
// );

// export const readMyRewardsDiscount = createAsyncThunk(
//   "rewards/discount",
//   async (args, thunkApi) => {
//     try {
//       const response = await apiServices.myRewardsDiscount();
//       return response?.data;
//     } catch (e) {
//       const errorMessage = e?.response?.data?.message || "Network Error";
//       thunkApi.dispatch(setErrorMessage(errorMessage));
//       return thunkApi.rejectWithValue({
//         message: errorMessage,
//         status: e?.response?.status || 500,
//       });
//     }
//   }
// );

// export const createCoupon = createAsyncThunk(
//   "create/coupon",
//   async (args, thunkApi) => {
//     const { data, setError } = args;
//     try {
//       const response = await apiServices.rewardsCoupon(data);
//       // data is a plain object so data.points works directly
//       return { ...response?.data, _pointsUsed: Number(data?.points) || 0 };
//     } catch (e) {
//       const errorMessage = e?.response?.data?.message || "Network Error";
//       thunkApi.dispatch(setErrorMessage(errorMessage));
//       if (setError) setError(e?.response?.data || {});
//       return thunkApi.rejectWithValue({
//         message: errorMessage,
//         status: e?.response?.status || 500,
//       });
//     }
//   }
// );

// const myRewardsSlice = createSlice({
//   name: "my-rewards",
//   initialState,
//   reducers: {
//     setErrorMessage: (state, action) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(readMyRewards.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(readMyRewards.fulfilled, (state, action) => {
//       if (action?.payload) {
//         state.myRewards = action.payload.data;
//       }
//       state.loading = false;
//     });
//     builder.addCase(readMyRewards.rejected, (state) => {
//       state.loading = false;
//     });

//     builder.addCase(readMyRewardsDiscount.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(readMyRewardsDiscount.fulfilled, (state, action) => {
//       if (action?.payload) state.rewardsDiscount = action.payload.data;
//       state.loading = false;
//     });
//     builder.addCase(readMyRewardsDiscount.rejected, (state) => {
//       state.loading = false;
//     });

//     builder.addCase(createCoupon.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(createCoupon.fulfilled, (state, action) => {
//       if (action?.payload) {
//         state.rewardsCoupon = action.payload.data;

//         const pointsUsed = Number(action.payload._pointsUsed) || 0;
//         if (state.myRewards?.reward && pointsUsed) {
//           state.myRewards = {
//             ...state.myRewards,
//             reward: {
//               ...state.myRewards.reward,
//               active: Number(state.myRewards.reward.active || 0) - pointsUsed,
//               coupons: Number(state.myRewards.reward.coupons || 0) + pointsUsed,
//             },
//           };
//         }
//       }
//       state.isLoading = false;
//     });
//     builder.addCase(createCoupon.rejected, (state) => {
//       state.isLoading = false;
//     });
//   },
// });

// export default myRewardsSlice.reducer;
// export const { setErrorMessage } = myRewardsSlice.actions;






import apiServices from "../../../services/requestHandler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  myRewards: null,
  rewardsDiscount: null,
  rewardsCoupon: null,
  loading: true,
  isLoading: false,
  error: null,
};

export const readMyRewards = createAsyncThunk(
  "my/rewards",
  async (args, thunkApi) => {
    const { data, setError } = args;
    try {
      const response = await apiServices.myRewards(data);
      return response?.data;
    } catch (e) {
      const errorMessage = e?.response?.data?.message || "Network Error";
      thunkApi.dispatch(setErrorMessage(errorMessage));
      return thunkApi.rejectWithValue({
        message: errorMessage,
        status: e?.response?.status || 500,
      });
    }
  }
);

export const readMyRewardsDiscount = createAsyncThunk(
  "rewards/discount",
  async (args, thunkApi) => {
    try {
      const response = await apiServices.myRewardsDiscount();
      return response?.data;
    } catch (e) {
      const errorMessage = e?.response?.data?.message || "Network Error";
      thunkApi.dispatch(setErrorMessage(errorMessage));
      return thunkApi.rejectWithValue({
        message: errorMessage,
        status: e?.response?.status || 500,
      });
    }
  }
);

export const createCoupon = createAsyncThunk(
  "create/coupon",
  async (args, thunkApi) => {
    const { data, setError } = args;
    try {
      const response = await apiServices.rewardsCoupon(data);
      return { ...response?.data, _pointsUsed: Number(data?.points) || 0 };
    } catch (e) {
      const errorMessage = e?.response?.data?.message || "Network Error";
      thunkApi.dispatch(setErrorMessage(errorMessage));
      if (setError) setError(e?.response?.data || {});
      return thunkApi.rejectWithValue({
        message: errorMessage,
        status: e?.response?.status || 500,
      });
    }
  }
);

const myRewardsSlice = createSlice({
  name: "my-rewards",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readMyRewards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readMyRewards.fulfilled, (state, action) => {
      if (action?.payload) {
        state.myRewards = action.payload.data;
      }
      state.loading = false;
    });
    builder.addCase(readMyRewards.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readMyRewardsDiscount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readMyRewardsDiscount.fulfilled, (state, action) => {
      if (action?.payload) state.rewardsDiscount = action.payload.data;
      state.loading = false;
    });
    builder.addCase(readMyRewardsDiscount.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createCoupon.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCoupon.fulfilled, (state, action) => {
      if (action?.payload) {
        state.rewardsCoupon = action.payload.data;

        // ✅ Directly patch Redux myRewards.reward from the API's updatedPoints
        // so the UI updates instantly without any re-fetch or page refresh
        const updatedPoints = action.payload?.data?.updatedPoints;
        if (updatedPoints && state.myRewards?.reward) {
          state.myRewards = {
            ...state.myRewards,
            reward: {
              ...state.myRewards.reward,
              active:   parseInt(updatedPoints.active, 10)   || 0,
              total:    parseInt(updatedPoints.total, 10)    || 0,
              coupons:  parseInt(updatedPoints.coupons, 10)  || 0,
              redeemed: parseInt(updatedPoints.redeemed, 10) || 0,
            },
          };
        } else {
          // Fallback: optimistically deduct points if updatedPoints not returned
          const pointsUsed = Number(action.payload._pointsUsed) || 0;
          if (state.myRewards?.reward && pointsUsed) {
            state.myRewards = {
              ...state.myRewards,
              reward: {
                ...state.myRewards.reward,
                active:  Number(state.myRewards.reward.active  || 0) - pointsUsed,
                coupons: Number(state.myRewards.reward.coupons || 0) + pointsUsed,
              },
            };
          }
        }
      }
      state.isLoading = false;
    });
    builder.addCase(createCoupon.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default myRewardsSlice.reducer;
export const { setErrorMessage } = myRewardsSlice.actions;



