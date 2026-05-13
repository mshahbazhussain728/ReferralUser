// import React, { useState } from "react";
// import { BaseModal } from "./base-modal";
// import { LinkButton } from "../button/link-icon";
// import { CopyIcon } from "../../../assets/svgs/components/copy-icon";
// import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// import discountCodeIcon from "../../../assets/pngs/discount-code-icon.png";
// import { useSelector } from "react-redux";

// export const ReferralDiscountModal = ({ onClose }) => {
//   const { onShare, links, deviceType } =
//     useSelector((state) => state.global.modal.data) || {};
//   const [copyCode, setCopyCode] = useState(false);

//   const matchedCode = links?.find((item) => item?.deviceType === deviceType);
//   const discountCode = matchedCode?.discountCode;

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(discountCode);
//     setCopyCode(true);
//     setTimeout(() => setCopyCode(false), 2000);
//   };

//   return (
//     <BaseModal
//       onClose={onClose}
//       containerClassName="w-full max-w-[341px] md:max-w-[490.5px] min-h-fit md:min-h-[294px] md:max-h-[294px]"
//     >
//       <div className="flex items-center flex-col pt-[25px] pb-[35px] px-[18px] md:py-[30px] md:px-[48px]">
//         <p className="text-[#055860] text-[22px] font-semibold md:font-bold md:text-2xl text-center">
//           IOS Appstore Discount Code
//         </p>

//         <div className="flex flex-col items-center gap-y-4 mt-[19px] mb-5">
//           <img
//             src={discountCodeIcon}
//             alt="icon"
//             className="w-[73px] h-[41.12px] md:w-[97px] md:h-[55px]"
//           />
//           <span className="text-[#000AFF] font-normal text-[27px]">
//             {discountCode}
//           </span>
//         </div>

//         <div className="flex items-center gap-x-[15px] md:gap-x-[33px]">
//           <LinkButton
//             icon={CopyIcon}
//             text="Copy Code"
//             onClick={handleCopyCode}
//             containerClassName="p-[15px] md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-semibold text-base md:text-lg"
//           />
//           <LinkButton
//             icon={ShareIcon}
//             text="Share Code"
//             onClick={onShare}
//             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-semibold text-base md:text-lg"
//           />
//         </div>
//       </div>
//     </BaseModal>
//   );
// };




// import React, { useState } from "react";
// import { BaseModal } from "./base-modal";
// import { LinkButton } from "../button/link-icon";
// import { CopyIcon } from "../../../assets/svgs/components/copy-icon";
// import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// import discountCodeIcon from "../../../assets/pngs/discount-code-icon.png";
// import { useSelector } from "react-redux";

// export const ReferralDiscountModal = ({ onClose }) => {
//   const { onShare, links, deviceType } =
//     useSelector((state) => state.global.modal.data) || {};
//   const [copyCode, setCopyCode] = useState(false);

//   const matchedCode = links?.find((item) => item?.deviceType === deviceType);
//   const discountCode = matchedCode?.discountCode;

//   // Determine modal title based on device type
//   const modalTitle = deviceType === "ios" 
//     ? "IOS Appstore Discount Code" 
//     : "Android Playstore Discount Code";

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(discountCode);
//     setCopyCode(true);
//     setTimeout(() => setCopyCode(false), 2000);
//   };

//   return (
//     <BaseModal
//       onClose={onClose}
//       containerClassName="w-full max-w-[341px] md:max-w-[490.5px] min-h-fit md:min-h-[294px] md:max-h-[294px]"
//     >
//       <div className="flex items-center flex-col pt-[25px] pb-[35px] px-[18px] md:py-[30px] md:px-[48px]">
//         <p className="text-[#055860] text-[22px] font-semibold md:font-bold md:text-2xl text-center">
//           {modalTitle}
//         </p>

//         <div className="flex flex-col items-center gap-y-4 mt-[19px] mb-5">
//           <img
//             src={discountCodeIcon}
//             alt="icon"
//             className="w-[73px] h-[41.12px] md:w-[97px] md:h-[55px]"
//           />
//           <span className="text-[#000AFF] font-normal text-[27px]">
//             {discountCode}
//           </span>
//         </div>

//         {copyCode && <p className="text-green-600 font-medium mb-2">Copied!</p>}

//         <div className="flex items-center gap-x-[15px] md:gap-x-[33px]">
//           <LinkButton
//             icon={CopyIcon}
//             text="Copy Code"
//             onClick={handleCopyCode}
//             containerClassName="p-[15px] md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-semibold text-base md:text-lg"
//           />
//           <LinkButton
//             icon={ShareIcon}
//             text="Share Code"
//             onClick={onShare}
//             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-semibold text-base md:text-lg"
//           />
//         </div>
//       </div>
//     </BaseModal>
//   );
// };




import React, { useState } from "react";
import { BaseModal } from "./base-modal";
import { LinkButton } from "../button/link-icon";
import { CopyIcon } from "../../../assets/svgs/components/copy-icon";
import { ShareIcon } from "../../../assets/svgs/components/share-icon";
import discountCodeIcon from "../../../assets/pngs/discount-code-icon.png";
import { useSelector } from "react-redux";

export const ReferralDiscountModal = ({ onClose }) => {
  const { onShare, links, deviceType } =
    useSelector((state) => state.global.modal.data) || {};
  const [copyCode, setCopyCode] = useState(false);

  // Case-insensitive match against API response deviceType ("android" / "ios")
  const matchedCode = links?.find(
    (item) => item?.deviceType?.toLowerCase() === deviceType?.toLowerCase()
  );
  const discountCode = matchedCode?.discountCode;

  const modalTitle =
    deviceType?.toLowerCase() === "ios"
      ? "IOS Appstore Discount Code"
      : "Android Playstore Discount Code";

  const handleCopyCode = () => {
    if (!discountCode) return;
    navigator.clipboard.writeText(discountCode);
    setCopyCode(true);
    setTimeout(() => setCopyCode(false), 2000);
  };

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-full max-w-[341px] md:max-w-[490.5px] min-h-fit md:min-h-[294px] md:max-h-[294px]"
    >
      <div className="flex items-center flex-col pt-[25px] pb-[35px] px-[18px] md:py-[30px] md:px-[48px]">
        <p className="text-[#055860] text-[22px] font-semibold md:font-bold md:text-2xl text-center">
          {modalTitle}
        </p>

        <div className="flex flex-col items-center gap-y-4 mt-[19px] mb-5">
          <img
            src={discountCodeIcon}
            alt="icon"
            className="w-[73px] h-[41.12px] md:w-[97px] md:h-[55px]"
          />
          <span className="text-[#000AFF] font-normal text-[27px]">
            {discountCode ?? "—"}
          </span>
        </div>

        {copyCode && (
          <p className="text-green-600 font-medium mt-[-10px]">Copied!</p>
        )}

        <div className="flex items-center gap-x-[15px] md:gap-x-[33px]">
          <LinkButton
            icon={CopyIcon}
            text="Copy Code"
            onClick={handleCopyCode}
            disabled={!discountCode}
            containerClassName="p-[15px] md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-semibold text-base md:text-lg"
          />
          <LinkButton
            icon={ShareIcon}
            text="Share Code"
            onClick={onShare}
            containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-semibold text-base md:text-lg"
          />
        </div>
      </div>
    </BaseModal>
  );
};


