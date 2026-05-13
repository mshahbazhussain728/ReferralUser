// import React from "react";
// import { BaseModal } from "./base-modal";
// import { ModalType } from "../../../types/ui";
// import { BaseButton } from "../button/base-button";
// import { useDispatch, useSelector } from "react-redux";
// import { PointIcon } from "../../../assets/svgs/components/point-icon";
// import { updateModalType } from "../../../api/slices/globalSlice/global";
// import couponPointIcon from "../../../assets/svgs/coupon-points-icon.svg";
// import { createCoupon } from "../../../api/slices/myRewards/myRewardsSlice";

// export const RedeemPointsModal = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { isLoading } = useSelector((state) => state.myRewards);
//   const { actionType, type, points } =
//     useSelector((state) => state.global.modal.data) || {};

//   const handleAddCoupon = async () => {
//     const userId = user?.id
//     if (!userId) return;

//     const formData = new FormData();
//     formData.append("userId", 2);
//     formData.append("points", points);
//     formData.append("type", type);

//     try {
//       await dispatch(
//         createCoupon({
//           data: formData,
//         })
//       ).then((response) => {
//         if (response?.payload) {
//           const couponCode = response?.payload?.data?.coupon?.coupon;

//           if (actionType === "REDEEM_SUCCESS" && couponCode) {
//             dispatch(
//               updateModalType({
//                 type: ModalType.REDEEM_SUCCESS,
//                 data: { couponCode },
//               })
//             );
//           }
//         }
//       });
//     } catch (err) {
//       console.error("Error fetching free users:", err);
//     }
//   };

//   return (
//     <BaseModal
//       onClose={onClose}
//       containerClassName="w-full max-w-[341px] md:max-w-[451px] min-h-fit"
//     >
//       <div className="mt-5 mb-[30px] px-[18px] md:px-[65px] flex flex-col items-center">
//         <img src={couponPointIcon} alt="icon" />

//         <div className="flex items-center gap-x-[6px] mb-[6px] mt-[10px]">
//           <PointIcon iconClassName="#691188" />
//           <span className="font-bold text-[22px] md:text-2xl text-primary">
//             {points} Points
//           </span>
//         </div>
//         <p className="font-medium text-[15px] text-[#333333] mb-[27px] text-center mt-2">
//           Anyone can use this coupon to get a free subscription
//         </p>

//         <div className="flex items-center gap-x-5 w-full">
//           <BaseButton
//             text="Cancel"
//             onClick={onClose}
//             containerClassName="text-lg font-semibold rounded-[10px] text-white w-full py-0 h-[50px]"
//           />
//           <BaseButton
//             text="Redeem"
//             onClick={handleAddCoupon}
//             containerClassName="text-lg font-semibold rounded-[10px] text-white w-full py-0 h-[50px]"
//             loading={isLoading}
//           />
//         </div>
//       </div>
//     </BaseModal>
//   );
// };










import React from "react";
import { BaseModal } from "./base-modal";
import { ModalType } from "../../../types/ui";
import { BaseButton } from "../button/base-button";
import { useDispatch, useSelector } from "react-redux";
import { PointIcon } from "../../../assets/svgs/components/point-icon";
import { updateModalType } from "../../../api/slices/globalSlice/global";
import couponPointIcon from "../../../assets/svgs/coupon-points-icon.svg";
import { createCoupon } from "../../../api/slices/myRewards/myRewardsSlice";
import { toast } from "react-toastify";

export const RedeemPointsModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.myRewards);
  const { actionType, type, points, couponType } =
    useSelector((state) => state.global.modal.data) || {};

  const handleAddCoupon = async () => {
    const userId = user?.id;
    if (!userId) return;

    // ✅ Fixed: use actual userId, not hardcoded 2
    const couponPayload = {
      uid: String(userId),
      userId: String(userId),
      type: type || couponType,
      points,
    };

    try {
      const response = await dispatch(
        createCoupon({ data: couponPayload, setError: () => {} })
      );

      if (response?.payload?.success) {
        const couponData = response?.payload?.data?.coupon;
        const couponCode = couponData?.coupon;

        // ── Step 3: Show "Anyone can use this coupon" popup
        dispatch(updateModalType({
          type: ModalType.COUPON_POINTS,
          data: {
            message: "Anyone can use this coupon to get a free subscription",
            couponCode,
            coupon: couponCode,
            couponType: couponData?.type,
            expiryDate: couponData?.expiryDate,
            points: couponData?.points,
            status: couponData?.status,
            actionType: "COUPON_SUCCESS",
          },
        }));

        // ── Step 4: After 3s show "Coupon Generated" popup + toast
        setTimeout(() => {
          dispatch(updateModalType({
            type: ModalType.REDEEM_SUCCESS,
            data: {
              actionType: "COUPON_SUCCESS",
              title: "Coupon Generated!",
              message: "Coupon generated and added successfully",
              couponCode,
              coupon: couponCode,
              couponType: couponData?.type,
              expiryDate: couponData?.expiryDate,
              points,
              status: couponData?.status,
            },
          }));
          toast.success("Coupon generated and added successfully");
        }, 3000);
      }
    } catch (err) {
      console.error("Error creating coupon:", err);
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-full max-w-[341px] md:max-w-[451px] min-h-fit"
    >
      <div className="mt-5 mb-[30px] px-[18px] md:px-[65px] flex flex-col items-center">
        <img src={couponPointIcon} alt="icon" />

        <div className="flex items-center gap-x-[6px] mb-[6px] mt-[10px]">
          <PointIcon iconClassName="#691188" />
          <span className="font-bold text-[22px] md:text-2xl text-primary">
            {points} Points
          </span>
        </div>
        <p className="font-medium text-[15px] text-[#333333] mb-[27px] text-center mt-2">
          Anyone can use this coupon to get a free subscription
        </p>

        <div className="flex items-center gap-x-5 w-full">
          <BaseButton
            text="Cancel"
            onClick={onClose}
            containerClassName="text-lg font-semibold rounded-[10px] text-white w-full py-0 h-[50px]"
          />
          <BaseButton
            text="Redeem"
            onClick={handleAddCoupon}
            containerClassName="text-lg font-semibold rounded-[10px] text-white w-full py-0 h-[50px]"
            loading={isLoading}
          />
        </div>
      </div>
    </BaseModal>
  );
};