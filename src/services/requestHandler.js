






// import { del, post, get } from "./HttpProvider";
// import featureConstants from "./features-constants";

// const SERVICE_URLS = {
//   sign_up:               "/auth/signup",
//   login:                 "/auth/send-otp",
//   logout:                "/auth/logout",
//   profile_picture:       "/auth/upload-profile-picture",  
//   free_user:             "/referrals/users/free",
//   points_history:        "/referrals/points/get",

//   referral_discounts:    "/referrals/discounts",

//   coupon_history:        "/referrals/coupons/all",
//   redeem_request:        "/referrals/points/redeem",
//   redeem_history:        "/referrals/redeem/history",
//   update_redeem_history: "/referrals/redeem/history/update",
//   prem_user:             "/referrals/users/details",
//   view_results:          "/referrals/get/counts",
//   view_links:            "/referrals/apps/links",
//   my_rewards:            "/referrals/reward",
//   my_rewards_discounts:  "/referrals/discounts",
//   rewards_coupon:        "/referrals/coupon/add",
//   premium_user:          "/referrals/users/paid",
//   all_prem_users:        "/referrals/users/premium/all",
//   discount:              "/referrals/discount/all",
//   free_all_user:         "/referrals/users/free/all",
//   marketers_users:       "/referrals/users/marketers/all",
//   single_user_details:   "/referrals/user/single/details",
//   payment_request:       "/referrals/users/payment/requests",
//   update_payment_history: "/referrals/users/payment/requests",
//   trial_users:           "/referrals/users/trial",
//   get_links:             "/referrals/apps/links",
//   referred_user:         "/referrals/details/get",
//   referred_user_details: "/referrals/users/details",
// };

// // ── Auth ──────────────────────────────────────────────────────────────────────
// const signUp = (data) =>
//   post(SERVICE_URLS.sign_up, data, { feature: featureConstants.login });

// const login = (data) =>
//   post(SERVICE_URLS.login, data, { feature: featureConstants.login });

// const logout = (data) =>
//   post(SERVICE_URLS.logout, data, { feature: featureConstants.login });

// // ── Premium Users ─────────────────────────────────────────────────────────────
// const premiumUserDetails = (data) =>
//   post(SERVICE_URLS.prem_user, data, { feature: featureConstants.login });

// const premiumUser = (params) =>
//   get(
//     SERVICE_URLS.premium_user,
//     params,
//     { feature: featureConstants.login },
//     { detail: false }
//   );

// const allPremiumUsers = (data) =>
//   post(SERVICE_URLS.all_prem_users, data, { feature: featureConstants.login });

// // ── Referral ──────────────────────────────────────────────────────────────────
// const getReferredUser = (data) =>
//   post(SERVICE_URLS.referred_user, data, { feature: featureConstants.login });

// const getReferredUserDetails = (data) =>
//   post(SERVICE_URLS.referred_user_details, data, { feature: featureConstants.login });

// // ── Dashboard ─────────────────────────────────────────────────────────────────
// const viewResults = (data) =>
//   post(SERVICE_URLS.view_results, data, { feature: featureConstants.login });

// const viewLinks = () =>
//   get(
//     SERVICE_URLS.view_links,
//     {},
//     { feature: featureConstants.login },
//     { detail: false }
//   );

// // ── Free Users ────────────────────────────────────────────────────────────────
// const freeUsers = (params) =>
//   get(
//     SERVICE_URLS.free_user,
//     params,
//     { feature: featureConstants.login },
//     { detail: false }
//   );

// const freeAllUsers = (data) =>
//   post(SERVICE_URLS.free_all_user, data, { feature: featureConstants.login });

// // ── Rewards ───────────────────────────────────────────────────────────────────
// const redeemRequest = (data) =>
//   post(SERVICE_URLS.redeem_request, data, { feature: featureConstants.login });

// // ✅ CRITICAL FIX: data must be a plain object (NOT FormData) so that
// // HttpProvider sets Content-Type: application/json and the API accepts it.
// // Sending FormData causes the server to receive empty/wrong fields → 400 error
// // with "Invalid coupon type. Must be monthly or yearly."
// const rewardsCoupon = (data) => {
//   // Safety: if somehow FormData is passed, convert it to a plain object
//   if (data instanceof FormData) {
//     const plain = {};
//     data.forEach((value, key) => { plain[key] = value; });
//     return post(SERVICE_URLS.rewards_coupon, plain, { feature: featureConstants.login });
//   }
//   return post(SERVICE_URLS.rewards_coupon, data, { feature: featureConstants.login });
// };

// const myRewards = (data) =>
//   post(SERVICE_URLS.my_rewards, data, { feature: featureConstants.login });

// const myRewardsDiscount = () =>
//   get(
//     SERVICE_URLS.my_rewards_discounts,
//     {},
//     { feature: featureConstants.login },
//     { detail: false }
//   );

// // ── History ───────────────────────────────────────────────────────────────────
// const pointsHistory = (params) =>
//   get(
//     SERVICE_URLS.points_history,
//     params,
//     { feature: featureConstants.login },
//     { detail: false }
//   );

// const redeemHistory = (params) =>
//   get(
//     SERVICE_URLS.redeem_history,
//     params,
//     { feature: featureConstants.login },
//     { detail: false }
//   );

// const updateRedeemHistory = (data) =>
//   post(SERVICE_URLS.update_redeem_history, data, { feature: featureConstants.login });

// const couponHistory = (params) =>
//   get(
//     SERVICE_URLS.coupon_history,
//     params,
//     { feature: featureConstants.login },
//     { detail: false }
//   );

// const apiServices = {
//   // Auth
//   signUp,
//   login,
//   logout,
//   // Premium Users
//   premiumUser,
//   allPremiumUsers,
//   premiumUserDetails,
//   // Referral
//   getReferredUser,
//   getReferredUserDetails,
//   // Dashboard
//   viewResults,
//   viewLinks,
//   // Free Users
//   freeUsers,
//   freeAllUsers,
//   // Rewards
//   redeemRequest,
//   rewardsCoupon,
//   myRewards,
//   myRewardsDiscount,
//   // History
//   pointsHistory,
//   redeemHistory,
//   updateRedeemHistory,
//   couponHistory,
// };

// export default apiServices;


// //updated



import { del, post, get } from "./HttpProvider";
import featureConstants from "./features-constants";

const SERVICE_URLS = {
  // Auth
  sign_up:               "/auth/signup/google",
  login:                 "/auth/login/google",
  apple_signin:          "/auth/signin/apple",
  logout:                "/auth/logout",
  profile_picture:       "/auth/upload-profile-picture",

  // Users
  free_user:             "/referrals/users/free",
  free_all_user:         "/referrals/users/free/all",
  premium_user:          "/referrals/users/paid",
  all_prem_users:        "/referrals/users/premium/all",
  marketers_users:       "/referrals/users/marketers/all",
  single_user_details:   "/referrals/user/single/details",
  payment_request:       "/referrals/users/payment/requests",
  update_payment_history:"/referrals/users/payment/requests",
  trial_users:           "/referrals/users/trial",
  prem_user:             "/referrals/users/details",
  referred_user_details: "/referrals/users/details",

  // Referral / Dashboard
  view_results:          "/referrals/get/counts",
  referred_user:         "/referrals/details/get",

  // Discounts
  referral_discounts:    "/referrals/discounts",
  my_rewards_discounts:  "/referrals/discounts",
  discount:              "/referrals/discount/all",

  // Rewards / Coupons
  my_rewards:            "/referrals/reward",
  rewards_coupon:        "/referrals/coupon/add",
  coupon_history:        "/referrals/coupons/all",

  // Points / Redeem
  points_history:        "/referrals/points/get",
  redeem_request:        "/referrals/points/redeem",
  redeem_history:        "/referrals/redeem/history",
  update_redeem_history: "/referrals/redeem/history/update",

  // Links
  view_links:            "/referrals/apps/links",
  get_links:             "/referrals/apps/links",
};

// ── Auth ──────────────────────────────────────────────────────────────────────
const signUp = (data) =>
  post(SERVICE_URLS.sign_up, data, { feature: featureConstants.login });

const login = (data) =>
  post(SERVICE_URLS.login, data, { feature: featureConstants.login });

const appleSignIn = (data) =>
  post(SERVICE_URLS.apple_signin, data, { feature: featureConstants.login });

const logout = (data) =>
  post(SERVICE_URLS.logout, data, { feature: featureConstants.login });

// ── Premium Users ─────────────────────────────────────────────────────────────
const premiumUserDetails = (data) =>
  post(SERVICE_URLS.prem_user, data, { feature: featureConstants.login });

const premiumUser = (params) =>
  get(
    SERVICE_URLS.premium_user,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const allPremiumUsers = (data) =>
  post(SERVICE_URLS.all_prem_users, data, { feature: featureConstants.login });

// ── Referral ──────────────────────────────────────────────────────────────────
const getReferredUser = (data) =>
  post(SERVICE_URLS.referred_user, data, { feature: featureConstants.login });

const getReferredUserDetails = (data) =>
  post(SERVICE_URLS.referred_user_details, data, { feature: featureConstants.login });

// ── Dashboard ─────────────────────────────────────────────────────────────────
const viewResults = (data) =>
  post(SERVICE_URLS.view_results, data, { feature: featureConstants.login });

const viewLinks = () =>
  get(
    SERVICE_URLS.view_links,
    {},
    { feature: featureConstants.login },
    { detail: false }
  );

// ── Free Users ────────────────────────────────────────────────────────────────
const freeUsers = (params) =>
  get(
    SERVICE_URLS.free_user,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const freeAllUsers = (data) =>
  post(SERVICE_URLS.free_all_user, data, { feature: featureConstants.login });

// ── Trial / Marketers / Single User ──────────────────────────────────────────
const trialUsers = (params) =>
  get(
    SERVICE_URLS.trial_users,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const marketersUsers = (data) =>
  post(SERVICE_URLS.marketers_users, data, { feature: featureConstants.login });

const singleUserDetails = (data) =>
  post(SERVICE_URLS.single_user_details, data, { feature: featureConstants.login });

// ── Payment ───────────────────────────────────────────────────────────────────
const paymentRequest = (params) =>
  get(
    SERVICE_URLS.payment_request,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const updatePaymentHistory = (data) =>
  post(SERVICE_URLS.update_payment_history, data, { feature: featureConstants.login });

// ── Rewards ───────────────────────────────────────────────────────────────────
const redeemRequest = (data) =>
  post(SERVICE_URLS.redeem_request, data, { feature: featureConstants.login });

const rewardsCoupon = (data) => {
  if (data instanceof FormData) {
    const plain = {};
    data.forEach((value, key) => { plain[key] = value; });
    return post(SERVICE_URLS.rewards_coupon, plain, { feature: featureConstants.login });
  }
  return post(SERVICE_URLS.rewards_coupon, data, { feature: featureConstants.login });
};

const myRewards = (data) =>
  post(SERVICE_URLS.my_rewards, data, { feature: featureConstants.login });

const myRewardsDiscount = () =>
  get(
    SERVICE_URLS.my_rewards_discounts,
    {},
    { feature: featureConstants.login },
    { detail: false }
  );

// ── History ───────────────────────────────────────────────────────────────────
const pointsHistory = (params) =>
  get(
    SERVICE_URLS.points_history,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const redeemHistory = (params) =>
  get(
    SERVICE_URLS.redeem_history,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const updateRedeemHistory = (data) =>
  post(SERVICE_URLS.update_redeem_history, data, { feature: featureConstants.login });

const couponHistory = (params) =>
  get(
    SERVICE_URLS.coupon_history,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const apiServices = {
  // Auth
  signUp,
  login,
  appleSignIn,
  logout,
  // Premium Users
  premiumUser,
  allPremiumUsers,
  premiumUserDetails,
  // Referral
  getReferredUser,
  getReferredUserDetails,
  // Dashboard
  viewResults,
  viewLinks,
  // Free Users
  freeUsers,
  freeAllUsers,
  // Trial / Marketers / Single
  trialUsers,
  marketersUsers,
  singleUserDetails,
  // Payment
  paymentRequest,
  updatePaymentHistory,
  // Rewards
  redeemRequest,
  rewardsCoupon,
  myRewards,
  myRewardsDiscount,
  // History
  pointsHistory,
  redeemHistory,
  updateRedeemHistory,
  couponHistory,
};

export default apiServices;