

// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
// import { ModalType } from "../../types/ui";
// import { useForm } from "react-hook-form";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch, useSelector } from "react-redux";
// import { PointIcon } from "../../assets/svgs/components/point-icon";
// import { updateModalType } from "../../api/slices/globalSlice/global";
// import { GetCouponIcon } from "../../assets/svgs/components/get-coupon-icon";
// import { GetCouponFormFields } from "../../components/myRewards/get-coupon-fields";
// import { readMyRewards, readMyRewardsDiscount, createCoupon } from "../../api/slices/myRewards/myRewardsSlice";
// import { generateGetCouponValidationSchema } from "../../validation/redeem-points-validation";

// export const useMyRewards = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isRedeeming, setIsRedeeming] = useState(false);
//   const [myRewardsDiscount, setMyRewardsDiscount] = useState(null);

//   const { loading, myRewards: reduxMyRewards } = useSelector((state) => state.myRewards);
//   const { user, loading: authLoading } = useSelector((state) => state.auth);

//   const uid = user?.id;
//   const schema = generateGetCouponValidationSchema();

//   // ── Fetch my rewards on mount
//   useEffect(() => {
//     if (authLoading || !uid) return;
//     const fetchRewards = async () => {
//       try {
//         const formData = new FormData();
//         formData.append("uid", uid);
//         const result = await dispatch(readMyRewards({ data: formData }));
//         const accessToken = result?.payload?.data?.user?.accessToken;
//         if (accessToken) {
//           Cookies.set("accessToken", accessToken, { expires: 7 });
//         }
//       } catch (err) {
//         console.error("Error fetching my rewards:", err);
//       }
//     };
//     fetchRewards();
//   }, [dispatch, authLoading, uid]);

//   // ── Fetch rewards discount
//   useEffect(() => {
//     const fetchMyRewardsDiscount = async () => {
//       try {
//         const response = await dispatch(readMyRewardsDiscount({}));
//         if (response?.payload?.data) {
//           setMyRewardsDiscount(response?.payload?.data);
//         }
//       } catch (err) {
//         console.error("Error fetching rewards discount:", err);
//       }
//     };
//     fetchMyRewardsDiscount();
//   }, [dispatch]);

//   const handleGetCouponModal = () => {
//     dispatch(updateModalType({ type: ModalType.GET_COUPON_MODAL }));
//   };

//   const rewardsActions = [
//     { icon: PointIcon, text: "Points History", onClick: () => navigate("/point-history") },
//     { icon: GetCouponIcon, text: "Get a coupon", onClick: handleGetCouponModal },
//     { icon: PointIcon, text: "Request Redeem", onClick: () => navigate("/request-redeem") },
//   ];

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//     watch,
//     clearErrors,
//   } = useForm({
//     resolver: yupResolver(schema),
//     mode: "onSubmit",
//     reValidateMode: "onSubmit",
//   });

//   const couponTypeValue = watch("couponType");

//   // ── Clear error as soon as user picks an option
//   useEffect(() => {
//     if (couponTypeValue) {
//       clearErrors("couponType");
//     }
//   }, [couponTypeValue, clearErrors]);

//   const fields = GetCouponFormFields(register, isRedeeming);

//   // ── onSubmit now handles opening the modal after validation passes
//   const onSubmit = async (data) => {
//     const normalizedType = String(data?.couponType).trim().toLowerCase();

//     const points =
//       normalizedType === "monthly"
//         ? myRewardsDiscount?.referralPointsForMonthlySubscription || 0
//         : myRewardsDiscount?.referralPointsForYearlySubscription || 0;

//     dispatch(
//       updateModalType({
//         type: ModalType.COUPON_CONFIRMATION,
//         data: { couponType: normalizedType, points },
//       })
//     );
//   };

//   const reward = reduxMyRewards?.reward ?? {};

//   return {
//     rewardsActions,
//     handleGetCouponModal,
//     fields,
//     onSubmit,
//     control,
//     handleSubmit,
//     errors,
//     loading: loading || isRedeeming,
//     myRewards: {
//       ...(reduxMyRewards ?? {}),
//       reward: {
//         ...reward,
//         active:   parseInt(reward?.active,   10) || 0,
//         total:    parseInt(reward?.total,     10) || 0,
//         coupons:  parseInt(reward?.coupons,   10) || 0,
//         redeemed: parseInt(reward?.redeemed,  10) || 0,
//       },
//     },
//     isRedeeming,
//   };
// };



//////


import Cookies from "js-cookie";
import { ModalType } from "../../types/ui";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { PointIcon } from "../../assets/svgs/components/point-icon";
import { updateModalType } from "../../api/slices/globalSlice/global";
import { GetCouponIcon } from "../../assets/svgs/components/get-coupon-icon";
import { GetCouponFormFields } from "../../components/myRewards/get-coupon-fields";
import { readMyRewards, readMyRewardsDiscount } from "../../api/slices/myRewards/myRewardsSlice";
import { generateGetCouponValidationSchema } from "../../validation/redeem-points-validation";

export const useMyRewards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [myRewardsDiscount, setMyRewardsDiscount] = useState(null);

  const { loading, myRewards: reduxMyRewards } = useSelector((state) => state.myRewards);
  const { user, loading: authLoading } = useSelector((state) => state.auth);

  const uid = user?.id;
  const schema = generateGetCouponValidationSchema();

  // ── Fetch my rewards on mount
  useEffect(() => {
    if (authLoading || !uid) return;
    const fetchRewards = async () => {
      try {
        const formData = new FormData();
        formData.append("uid", uid);
        const result = await dispatch(readMyRewards({ data: formData }));
        const accessToken = result?.payload?.data?.user?.accessToken;
        if (accessToken) {
          Cookies.set("accessToken", accessToken, { expires: 7 });
        }
      } catch (err) {
        console.error("Error fetching my rewards:", err);
      }
    };
    fetchRewards();
  }, [dispatch, authLoading, uid]);

  // ── Fetch rewards discount
  useEffect(() => {
    const fetchMyRewardsDiscount = async () => {
      try {
        const response = await dispatch(readMyRewardsDiscount({}));
        if (response?.payload?.data) {
          setMyRewardsDiscount(response?.payload?.data);
        }
      } catch (err) {
        console.error("Error fetching rewards discount:", err);
      }
    };
    fetchMyRewardsDiscount();
  }, [dispatch]);

  const handleGetCouponModal = () => {
    dispatch(updateModalType({ type: ModalType.GET_COUPON_MODAL }));
  };

  const rewardsActions = [
    { icon: PointIcon, text: "Points History", onClick: () => navigate("/point-history") },
    { icon: GetCouponIcon, text: "Get a coupon", onClick: handleGetCouponModal },
    { icon: PointIcon, text: "Request Redeem", onClick: () => navigate("/request-redeem") },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // ✅ pass control as third argument
  const fields = GetCouponFormFields(register, isRedeeming, control);

  // ✅ reads validated data directly — no race condition, works on Safari/WebKit/Apple
  const onSubmit = (data) => {
    const normalizedType = String(data.couponType).trim().toLowerCase();

    const points =
      normalizedType === "monthly"
        ? myRewardsDiscount?.referralPointsForMonthlySubscription || 0
        : myRewardsDiscount?.referralPointsForYearlySubscription || 0;

    dispatch(
      updateModalType({
        type: ModalType.COUPON_CONFIRMATION,
        data: { couponType: normalizedType, points },
      })
    );
  };

  const reward = reduxMyRewards?.reward ?? {};

  return {
    rewardsActions,
    handleGetCouponModal,
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    loading: loading || isRedeeming,
    myRewards: {
      ...(reduxMyRewards ?? {}),
      reward: {
        ...reward,
        active:   parseInt(reward?.active,   10) || 0,
        total:    parseInt(reward?.total,     10) || 0,
        coupons:  parseInt(reward?.coupons,   10) || 0,
        redeemed: parseInt(reward?.redeemed,  10) || 0,
      },
    },
    isRedeeming,
  };
};