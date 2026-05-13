import auth from "../slices/authSlice/auth";
import globalSlice from "../slices/globalSlice/global";
import freeUserSlice from "../slices/freeUserSlice/freeUser";
import pointsHistory from "../slices/pointHistory/point-history";
import couponHistorySlice from "../slices/couponHistory/couponHistory";
import redeemRequest from "../slices/redeemRequest/redeem-request";
import redeemHistorySlice from "../slices/redeemHistory/redeem-history";
import premiumUsersSlice from "../slices/premiumUser/premium-user";
import dashboardSlice from "../slices/dashboard/dashboardSlice";
import myRewardsSlice from "../slices/myRewards/myRewardsSlice";

const reducer = {
  auth,
  global: globalSlice,
  freeUser: freeUserSlice,
  redeemRequest: redeemRequest,
  pointsHistory: pointsHistory,
  couponHistory: couponHistorySlice,
  redeemHistory: redeemHistorySlice,
  premiumUsers: premiumUsersSlice,
  dashboard: dashboardSlice,
  myRewards: myRewardsSlice,
};

export default reducer;
