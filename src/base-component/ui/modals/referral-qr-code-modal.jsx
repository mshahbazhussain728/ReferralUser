// // // // // import React from "react";
// // // // // import { BaseModal } from "./base-modal";
// // // // // import { useSelector } from "react-redux";
// // // // // import { LinkButton } from "../button/link-icon";
// // // // // import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// // // // // import QRCode from "react-qr-code";

// // // // // export const ReferralQRCodeModal = ({ onClose }) => {
// // // // //   const { onShare, links, deviceType } =
// // // // //     useSelector((state) => state.global.modal.data) || {};

// // // // //   const matchedLink = links?.find((item) => item?.deviceType === deviceType);

// // // // //   return (
// // // // //     <BaseModal
// // // // //       onClose={onClose}
// // // // //       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit max-h-fit"
// // // // //     >
// // // // //       <div className="flex items-center flex-col py-[30px] px-[27px] md:px-[90px]">
// // // // //         <p className="text-[#055860] font-semibold text-[22px] md:text-[28px] text-center mb-[27px] md:mb-[33px]">
// // // // //           IOS Appstore Referral QR Code
// // // // //         </p>

// // // // //         {/* <img
// // // // //           src={qrCodeIcon}
// // // // //           alt="icon"
// // // // //           className="w-[182px] md:h-[226px] h-[182px] md:w-[226px]"
// // // // //         /> */}

// // // // //         <QRCode value={matchedLink.link} size={226} />

// // // // //         <LinkButton
// // // // //           icon={ShareIcon}
// // // // //           text="Share QR Cod"
// // // // //           onClick={onShare}
// // // // //           containerClassName="py-[15px] px-6 mt-[32px] md:mt-[45.5px] rounded-[10px] text-lg font -semibold text-white"
// // // // //         />
// // // // //       </div>
// // // // //     </BaseModal>
// // // // //   );
// // // // // };





// // // // // import React from "react";
// // // // // import { BaseModal } from "./base-modal";
// // // // // import { useSelector } from "react-redux";
// // // // // import { LinkButton } from "../button/link-icon";
// // // // // import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// // // // // import QRCode from "react-qr-code";

// // // // // export const ReferralQRCodeModal = ({ onClose }) => {
// // // // //   const { onShare, links, deviceType } =
// // // // //     useSelector((state) => state.global.modal.data) || {};

// // // // //   const matchedLink = links?.find((item) => item?.deviceType === deviceType);

// // // // //   // Determine modal title based on device type
// // // // //   const modalTitle = deviceType === "ios" 
// // // // //     ? "IOS Appstore Referral QR Code" 
// // // // //     : "Android Playstore Referral QR Code";

// // // // //   return (
// // // // //     <BaseModal
// // // // //       onClose={onClose}
// // // // //       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit max-h-fit"
// // // // //     >
// // // // //       <div className="flex items-center flex-col py-[30px] px-[27px] md:px-[90px]">
// // // // //         <p className="text-[#055860] font-semibold text-[22px] md:text-[28px] text-center mb-[27px] md:mb-[33px]">
// // // // //           {modalTitle}
// // // // //         </p>

// // // // //         {/* <img
// // // // //           src={qrCodeIcon}
// // // // //           alt="icon"
// // // // //           className="w-[182px] md:h-[226px] h-[182px] md:w-[226px]"
// // // // //         /> */}

// // // // //         <QRCode value={matchedLink?.link || ""} size={226} />

// // // // //         <LinkButton
// // // // //           icon={ShareIcon}
// // // // //           text="Share QR Code"
// // // // //           onClick={onShare}
// // // // //           containerClassName="py-[15px] px-6 mt-[32px] md:mt-[45.5px] rounded-[10px] text-lg font-semibold text-white"
// // // // //         />
// // // // //       </div>
// // // // //     </BaseModal>
// // // // //   );
// // // // // };








// // // // import React from "react";
// // // // import { BaseModal } from "./base-modal";
// // // // import { useSelector } from "react-redux";
// // // // import { LinkButton } from "../button/link-icon";
// // // // import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// // // // import QRCode from "react-qr-code";

// // // // export const ReferralQRCodeModal = ({ onClose }) => {
// // // //   const { onShare, links, deviceType } =
// // // //     useSelector((state) => state.global.modal.data) || {};

// // // //   const matchedLink = links?.find((item) => item?.deviceType === deviceType);

// // // //   // ✅ Build redirect URL: famocare.com shows first, then redirects to app store
// // // //   const appStoreLink = matchedLink?.link || "";
// // // //   const encodedAppLink = encodeURIComponent(appStoreLink);

// // // //   // ✅ QR points to famocare.com with redirect param to app store
// // // //   const qrValue = appStoreLink
// // // //     ? `https://famocare.com?redirect=${encodedAppLink}`
// // // //     : "https://famocare.com";

// // // //   // Determine modal title based on device type
// // // //   const modalTitle =
// // // //     deviceType === "ios"
// // // //       ? "IOS Appstore Referral QR Code"
// // // //       : "Android Playstore Referral QR Code";

// // // //   return (
// // // //     <BaseModal
// // // //       onClose={onClose}
// // // //       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit max-h-fit"
// // // //     >
// // // //       <div className="flex items-center flex-col py-[30px] px-[27px] md:px-[90px]">
// // // //         <p className="text-[#055860] font-semibold text-[22px] md:text-[28px] text-center mb-[27px] md:mb-[33px]">
// // // //           {modalTitle}
// // // //         </p>

// // // //         {/* ✅ QR Code with correct value */}
// // // //         <QRCode
// // // //           value={qrValue}
// // // //           size={226}
// // // //           style={{ height: "auto", maxWidth: "100%", width: "100%" }}
// // // //           viewBox="0 0 256 256"
// // // //         />

// // // //         {/* ✅ Show the destination URL below QR */}
// // // //         <p className="text-xs text-gray-400 mt-3 text-center break-all">
// // // //           Scan to visit{" "}
// // // //           <span className="text-[#055860] font-medium">famocare.com</span>
// // // //           {appStoreLink ? " → then redirects to app store" : ""}
// // // //         </p>

// // // //         <LinkButton
// // // //           icon={ShareIcon}
// // // //           text="Share QR Code"
// // // //           onClick={onShare}
// // // //           containerClassName="py-[15px] px-6 mt-[32px] md:mt-[45.5px] rounded-[10px] text-lg font-semibold text-white"
// // // //         />
// // // //       </div>
// // // //     </BaseModal>
// // // //   );
// // // // };









// // // // import React from "react";
// // // // import { BaseModal } from "./base-modal";
// // // // import { useSelector } from "react-redux";
// // // // import { LinkButton } from "../button/link-icon";
// // // // import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// // // // import QRCode from "react-qr-code";

// // // // export const ReferralQRCodeModal = ({ onClose }) => {
// // // //   const modalData = useSelector((state) => state.global.modal?.data) || {};
// // // //   const { onShare, links = [], deviceType } = modalData;

// // // //   // Find correct store link
// // // //   const matchedLink = links.find((item) => item?.deviceType === deviceType);

// // // //   const appStoreLink = matchedLink?.link || "";

// // // //   // Encode store link
// // // //   const encodedAppLink = encodeURIComponent(appStoreLink);

// // // //   // QR Value (redirect flow)
// // // //   const qrValue = appStoreLink
// // // //     ? `https://apps.apple.com?redirect=${encodedAppLink}`
// // // //     : "https://famocare.com";

// // // //   // Modal Title
// // // //   const modalTitle =
// // // //     deviceType === "ios"
// // // //       ? "IOS Appstore Referral QR Code"
// // // //       : "Android Playstore Referral QR Code";

// // // //   return (
// // // //     <BaseModal
// // // //       onClose={onClose}
// // // //       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit max-h-fit"
// // // //     >
// // // //       <div className="flex flex-col items-center py-[30px] px-[27px] md:px-[90px]">

// // // //         {/* Title */}
// // // //         <p className="text-[#055860] font-semibold text-[22px] md:text-[28px] text-center mb-[27px] md:mb-[33px]">
// // // //           {modalTitle}
// // // //         </p>

// // // //         {/* QR Code */}
// // // //         <div className="bg-white p-4 rounded-lg shadow-sm">
// // // //           <QRCode
// // // //             value={qrValue}
// // // //             size={220}
// // // //             style={{ width: "100%", height: "auto" }}
// // // //           />
// // // //         </div>

// // // //         {/* Info Text */}
// // // //         <p className="text-xs text-gray-400 mt-4 text-center break-all">
// // // //           {/* Scan to visit{" "}
// // // //           <span className="text-[#055860] font-medium">
// // // //             famocare.com
// // // //           </span> */}
// // // //           {appStoreLink ? " → then redirects to app store" : ""}
// // // //         </p>

// // // //         {/* Share Button */}
// // // //         <LinkButton
// // // //           icon={ShareIcon}
// // // //           text="Share QR Code"
// // // //           onClick={onShare}
// // // //           containerClassName="py-[15px] px-6 mt-[32px] md:mt-[45px] rounded-[10px] text-lg font-semibold text-white"
// // // //         />
// // // //       </div>
// // // //     </BaseModal>
// // // //   );
// // // // };





// // // //remove below


// // // // import React from "react";
// // // // import { BaseModal } from "./base-modal";
// // // // import { useSelector } from "react-redux";
// // // // import { LinkButton } from "../button/link-icon";
// // // // import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// // // // import QRCode from "react-qr-code";

// // // // export const ReferralQRCodeModal = ({ onClose }) => {
// // // //   const modalData = useSelector((state) => state.global.modal?.data) || {};
// // // //   const { onShare, links = [], deviceType } = modalData;

// // // //   // ORIGINAL APP STORE AND PLAY STORE LINKS
// // // //   const appleStoreLink = "https://apps.apple.com/us/app/famocare-family-organizer-ai/id6752908773";
// // // //   const googlePlayLink = "https://play.google.com/store/apps/details?id=com.appistan.famocare&pcampaignid=web_share";

// // // //   // Determine which link to use based on device type
// // // //   let storeLink = "";
// // // //   let modalTitle = "";
  
// // // //   if (deviceType === "ios") {
// // // //     storeLink = appleStoreLink;
// // // //     modalTitle = "iOS App Store Referral QR Code";
// // // //     console.log("iOS device - using App Store link:", appleStoreLink);
// // // //   } else if (deviceType === "android") {
// // // //     storeLink = googlePlayLink;
// // // //     modalTitle = "Android Play Store Referral QR Code";
// // // //     console.log("Android device - using Google Play link:", googlePlayLink);
// // // //   } else {
// // // //     // For unknown device type, use matched link from Redux or default to App Store
// // // //     const matchedLink = links.find((item) => item?.deviceType === deviceType);
// // // //     storeLink = matchedLink?.link || appleStoreLink;
// // // //     modalTitle = "App Store Referral QR Code";
// // // //     console.log("Unknown device - using default link:", storeLink);
// // // //   }

// // // //   // QR Value - direct store link (no redirect)
// // // //   const qrValue = storeLink || "https://famocare.com";

// // // //   return (
// // // //     <BaseModal
// // // //       onClose={onClose}
// // // //       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit max-h-fit"
// // // //     >
// // // //       <div className="flex flex-col items-center py-[30px] px-[27px] md:px-[90px]">

// // // //         {/* Title */}
// // // //         <p className="text-[#055860] font-semibold text-[22px] md:text-[28px] text-center mb-[27px] md:mb-[33px]">
// // // //           {modalTitle}
// // // //         </p>

// // // //         {/* QR Code */}
// // // //         <div className="bg-white p-4 rounded-lg shadow-sm">
// // // //           <QRCode
// // // //             value={qrValue}
// // // //             size={220}
// // // //             style={{ width: "100%", height: "auto" }}
// // // //           />
// // // //         </div>

// // // //         {/* Info Text */}
// // // //         <p className="text-xs text-gray-400 mt-4 text-center break-all">
// // // //           {deviceType === "ios" && "Scan to download from App Store"}
// // // //           {deviceType === "android" && "Scan to download from Google Play"}
// // // //           {!deviceType && "Scan to download Famocare"}
          
// // // //           {/* Show the actual link being used */}
// // // //           <span className="block text-[#055860] font-medium mt-2 text-xs break-all">
// // // //             {storeLink}
// // // //           </span>
// // // //         </p>

// // // //         {/* Share Button */}
// // // //         <LinkButton
// // // //           icon={ShareIcon}
// // // //           text="Share QR Code"
// // // //           onClick={onShare}
// // // //           containerClassName="py-[15px] px-6 mt-[32px] md:mt-[45px] rounded-[10px] text-lg font-semibold text-white"
// // // //         />
// // // //       </div>
// // // //     </BaseModal>
// // // //   );
// // // // };







// import React from "react";
// import { BaseModal } from "./base-modal";
// import { useSelector } from "react-redux";
// import { LinkButton } from "../button/link-icon";
// import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// import QRCode from "react-qr-code";

// export const ReferralQRCodeModal = ({ onClose }) => {
//   const modalData = useSelector((state) => state.global.modal?.data) || {};
//   const { onShare, links = [], deviceType } = modalData;

//   const appleStoreLink = "https://apps.apple.com/us/app/famocare-family-organizer-ai/id6752908773";
//   const googlePlayLink = "https://play.google.com/store/apps/details?id=com.appistan.famocare&pcampaignid=web_share";

//   let storeLink = "";
//   let modalTitle = "";
  
//   if (deviceType === "ios") {
//     storeLink = appleStoreLink;
//     modalTitle = "iOS App Store Referral QR Code";
//   } else if (deviceType === "android") {
//     storeLink = googlePlayLink;
//     modalTitle = "Android Play Store Referral QR Code";
//   } else {
//     const matchedLink = links.find((item) => item?.deviceType === deviceType);
//     storeLink = matchedLink?.link || appleStoreLink;
//     modalTitle = "App Store Referral QR Code";
//   }

//   const qrValue = storeLink || "https://famocare.com";

//   return (
//     <BaseModal
//       onClose={onClose}
//       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit max-h-fit"
//     >
//       <div className="flex flex-col items-center py-[30px] px-[27px] md:px-[90px]">

//         <p className="text-[#055860] font-semibold text-[22px] md:text-[28px] mb-[27px] md:mb-[33px] text-center">
//           {modalTitle}
//         </p>

//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <QRCode
//             value={qrValue}
//             size={220}
//             style={{ width: "100%", height: "auto" }}
//           />
//         </div>

//         <LinkButton
//           icon={ShareIcon}
//           text="Share QR Code"
//           onClick={onShare}
//           containerClassName="py-[15px] px-6 mt-[32px] md:mt-[45px] rounded-[10px] text-lg font-semibold text-white"
//         />
//       </div>
//     </BaseModal>
//   );
// };


///remove




// import React from "react";
// import { BaseModal } from "./base-modal";
// import { useSelector } from "react-redux";
// import { LinkButton } from "../button/link-icon";
// import { ShareIcon } from "../../../assets/svgs/components/share-icon";
// import QRCode from "react-qr-code";
// import { getModalCallback } from "../../../hooks/dashboard/useDashboard";

// export const ReferralQRCodeModal = ({ onClose }) => {
//   const { deviceType, androidAppReferralLink, iosAppReferralLink } =
//     useSelector((state) => state.global.modal?.data) || {};

//   const qrValue =
//     deviceType?.toLowerCase() === "ios"
//       ? iosAppReferralLink
//       : androidAppReferralLink;

//   const modalTitle =
//     deviceType?.toLowerCase() === "ios"
//       ? "iOS App Store Referral QR Code"
//       : "Android Play Store Referral QR Code";

//   const handleShare = () => {
//     const onShare = getModalCallback("onShare");
//     if (onShare) onShare();
//   };

//   return (
//     <BaseModal
//       onClose={onClose}
//       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit max-h-fit"
//     >
//       <div className="flex flex-col items-center py-[30px] px-[27px] md:px-[90px]">
//         <p className="text-[#055860] font-semibold text-[22px] md:text-[28px] mb-[27px] md:mb-[33px] text-center">
//           {modalTitle}
//         </p>

//         {qrValue ? (
//           // <div className="bg-white p-4 rounded-lg shadow-sm">
//           //   <QRCode
//           //     value={qrValue}
//           //     size={220}
//           //     style={{ width: "100%", height: "auto" }}
//           //   />
//           // </div>

// <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-[200px] md:max-w-[250px]">
//   <QRCode
//     value={qrValue}
//     size={220}
//     style={{ width: "100%", height: "auto" }}
//   />
// </div>

//         ) : (
//           <p className="text-red-500 font-medium text-base">
//             Referral link not available.
//           </p>
//         )}

//         {/* <LinkButton
//           icon={ShareIcon}
//           text="Share QR Code"
//           onClick={handleShare}
//           disabled={!qrValue}
//           containerClassName="py-[15px] px-6 mt-[32px] md:mt-[45px] rounded-[10px] text-lg font-semibold text-white"
//         /> */}
//    <button
//   // onClick={handleShare}
//   // disabled={!qrValue}
//   // // className="flex items-center gap-2 py-[12px] px-6 mt-[32px] md:mt-[45px] rounded-[10px] text-base md:text-lg font-semibold text-white bg-[#055860] disabled:opacity-50"
//   // className="flex items-center gap-2 py-[12px] px-6 mt-[32px] md:mt-[45px] rounded-[10px] text-base md:text-lg font-semibold text-[#055860] bg-white border border-[#055860] hover:bg-[#055860] hover:text-white transition duration-200 disabled:opacity-50"

//   onClick={handleShare}
//   disabled={!qrValue}
//   className="group flex items-center gap-2 py-[12px] px-6 mt-[32px] md:mt-[45px] rounded-[10px] text-base md:text-lg font-semibold text-[#055860] bg-white border border-[#055860] hover:bg-[#055860] hover:text-white transition duration-200 disabled:opacity-50"

// >
//   {/* <ShareIcon className="w-5 h-5 flex-shrink-0 text-[#055860]" /> */}
//     <ShareIcon className="w-5 h-5 flex-shrink-0 text-[#055860] group-hover:text-white transition duration-200" />

//   <span>Share QR Code</span>
// </button>
//       </div>
//     </BaseModal>
//   );
// };




import React from "react";
import { BaseModal } from "./base-modal";
import { useSelector } from "react-redux";
import { ShareIcon } from "../../../assets/svgs/components/share-icon";
import QRCode from "react-qr-code";
import { getModalCallback } from "../../../hooks/dashboard/useDashboard";

export const ReferralQRCodeModal = ({ onClose }) => {
  const { deviceType, androidAppReferralLink, iosAppReferralLink } =
    useSelector((state) => state.global.modal?.data) || {};

  const qrValue =
    deviceType?.toLowerCase() === "ios"
      ? iosAppReferralLink
      : androidAppReferralLink;

  const modalTitle =
    deviceType?.toLowerCase() === "ios"
      ? "iOS App Store Referral QR Code"
      : "Android Play Store Referral QR Code";

  const handleShare = () => {
    const onShare = getModalCallback("onShare");
    if (onShare) onShare();
  };

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit max-h-fit"
    >
      <div className="flex flex-col items-center py-[30px] px-[27px] md:px-[90px]">
        <p className="text-[#000719] font-semibold text-[22px] md:text-[28px] mb-[27px] md:mb-[33px] text-center">
          {modalTitle}
        </p>

        {qrValue ? (
          <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-[200px] md:max-w-[250px]">
            <QRCode
              value={qrValue}
              size={220}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ) : (
          <p className="text-red-500 font-medium text-base">
            Referral link not available.
          </p>
        )}

        <button
          onClick={handleShare}
          disabled={!qrValue}
          className="group flex items-center gap-2 py-[12px] px-6 mt-[32px] md:mt-[45px] rounded-[10px] text-base md:text-lg font-semibold text-[#691188] bg-white border border-[#691188] hover:bg-[#691188] hover:text-white active:bg-[#055860] active:text-white transition duration-200 disabled:opacity-50"
        >
          {/* <ShareIcon className="w-5 h-5 flex-shrink-0 text-[#691188] group-hover:text-[#691188] group-active:text-white transition duration-200" /> */}
          <ShareIcon className="w-5 h-5 flex-shrink-0 text-[#691188] group-hover:text-white transition duration-200" />
          <span>Share QR Code</span>
        </button>
      </div>
    </BaseModal>
  );
};