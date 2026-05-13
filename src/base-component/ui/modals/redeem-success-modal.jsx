// // import React from "react";
// // import { BaseModal } from "./base-modal";
// // import checkIcon from "../../../assets/svgs/check-icon.svg";
// // import { CopiedTextField } from "../copy-field";
// // import { LinkButton } from "../button/link-icon";
// // import { CopyIcon } from "../../../assets/svgs/components/copy-icon";
// // import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// // import { useDispatch, useSelector } from "react-redux";
// // import { updateModalType } from "../../../api/slices/globalSlice/global";
// // import { ModalType } from "../../../types/ui";

// // export const RedeemSuccessModal = ({ onClose }) => {
// //   const dispatch = useDispatch();
// //   const { couponCode } = useSelector((state) => state.global.modal.data) || {};

// //   const handleShare = () => {
// //     dispatch(updateModalType({ type: ModalType.SHARE_MODAL }));
// //   };

// //   return (
// //     <BaseModal
// //       onClose={onClose}
// //       containerClassName="w-full max-w-[341px] md:max-w-[451px] min-h-fit"
// //     >
// //       <div className="py-[32px] px-[18px] md:px-[43px] flex flex-col items-center">
// //         <img src={checkIcon} alt="icon" />
// //         <p className="text-primary text-[22px] md:text-2xl font-bold mt-[15px] mb-5">
// //           Redeemed Successfully
// //         </p>

// //         <CopiedTextField
// //           couponCode={couponCode}
// //           text="Coupon Code"
// //           onShare={handleShare}
// //         />

// //         <div className="border-2 border-[#989898] rounded-[5px] py-[9px] px-4 flex items-center md:hidden gap-x-2">
// //           <span className="text-[#989898] font-semibold text-lg">
// //             Coupon Code:
// //           </span>
// //           <span className="text-[#989898] font-semibold text-lg">
// //             {couponCode}
// //           </span>
// //         </div>
// //         <div className="flex items-center md:hidden gap-x-[15px] md:gap-x-[33px] mt-5 md:mt-[30px]">
// //           <LinkButton
// //             icon={CopyIcon}
// //             text="Copy Link"
// //             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
// //           />
// //           <LinkButton
// //             icon={ShareIcon}
// //             text="Share Link"
// //             onClick={handleShare}
// //             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
// //           />
// //         </div>
// //       </div>
// //     </BaseModal>
// //   );
// // };



// import React, { useState } from "react";
// import { BaseModal } from "./base-modal";
// import checkIcon from "../../../assets/svgs/check-icon.svg";
// import { CopiedTextField } from "../copy-field";
// import { LinkButton } from "../button/link-icon";
// import { CopyIcon } from "../../../assets/svgs/components/copy-icon";
// import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// import { useDispatch, useSelector } from "react-redux";
// import { updateModalType } from "../../../api/slices/globalSlice/global";
// import { ModalType } from "../../../types/ui";

// const REFERRAL_LINK = "https://referral.famocare.com/XT09S8SW";

// export const RedeemSuccessModal = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const [copied, setCopied] = useState(false);

//   const { couponCode } = useSelector((state) => state.global.modal.data) || {};

//   const handleShare = () => {
//     dispatch(
//       updateModalType({
//         type: ModalType.SHARE_MODAL,
//         data: {
//           couponCode,
//           isCouponRedeemed: true,
//           referralLink: REFERRAL_LINK,
//         },
//       })
//     );
//   };

//   const handleCopy = () => {
//     if (!couponCode) return;
//     const textToCopy = `${couponCode}\n${REFERRAL_LINK}`;
//     navigator.clipboard.writeText(textToCopy).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   return (
//     <BaseModal
//       onClose={onClose}
//       containerClassName="w-full max-w-[341px] md:max-w-[451px] min-h-fit"
//     >
//       <div className="py-[32px] px-[18px] md:px-[43px] flex flex-col items-center">
//         <img src={checkIcon} alt="icon" />
//         <p className="text-primary text-[22px] md:text-2xl font-bold mt-[15px] mb-5">
//           Redeemed Successfully
//         </p>

//         <CopiedTextField
//           couponCode={couponCode}
//           text="Coupon Code"
//           onShare={handleShare}
//         />

//         <div className="border-2 border-[#989898] rounded-[5px] py-[9px] px-4 flex items-center md:hidden gap-x-2">
//           <span className="text-[#989898] font-semibold text-lg">
//             Coupon Code:
//           </span>
//           <span className="text-[#989898] font-semibold text-lg">
//             {couponCode}
//           </span>
//         </div>
//         <div className="flex items-center md:hidden gap-x-[15px] md:gap-x-[33px] mt-5 md:mt-[30px]">
//           <LinkButton
//             icon={CopyIcon}
//             text={copied ? "Copied!" : "Copy Link"}
//             onClick={handleCopy}
//             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
//           />
//           <LinkButton
//             icon={ShareIcon}
//             text="Share Link"
//             onClick={handleShare}
//             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
//           />
//         </div>
//       </div>
//     </BaseModal>
//   );
// };




import React from "react";
import { BaseModal } from "./base-modal";
import checkIcon from "../../../assets/svgs/check-icon.svg";
import { CopiedTextField } from "../copy-field";
import { useDispatch, useSelector } from "react-redux";
import { updateModalType } from "../../../api/slices/globalSlice/global";
import { ModalType } from "../../../types/ui";

const REFERRAL_LINK = "https://referral.famocare.com/XT09S8SW";

export const RedeemSuccessModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const { couponCode } = useSelector((state) => state.global.modal.data) || {};

  const handleShare = () => {
    dispatch(
      updateModalType({
        type: ModalType.SHARE_MODAL,
        data: {
          couponCode,
          isCouponRedeemed: true,
          referralLink: REFERRAL_LINK,
        },
      })
    );
  };


  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-full max-w-[341px] md:max-w-[451px] min-h-fit"
    >
      <div className="py-[32px] px-[18px] md:px-[43px] flex flex-col items-center">
        <img src={checkIcon} alt="icon" />
        <p className="text-primary text-[22px] md:text-2xl font-bold mt-[15px] mb-5">
          Redeemed Successfully
        </p>

        <CopiedTextField
          couponCode={couponCode}
          text="Coupon Code"
          onShare={handleShare}
        />



      </div>
    </BaseModal>
  );
};