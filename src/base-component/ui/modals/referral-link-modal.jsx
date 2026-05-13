// // // // // // import React, { useState } from "react";
// // // // // // import { BaseModal } from "./base-modal";
// // // // // // import { useSelector } from "react-redux";
// // // // // // import { LinkButton } from "../button/link-icon";
// // // // // // import { CopyIcon } from "../../../assets/svgs/components/copy-icon";
// // // // // // import { ShareIcon } from "../../../assets/svgs/components/share-icon";

// // // // // // export const ReferralLinkModal = ({ onClose }) => {
// // // // // //   const [copied, setCopied] = useState(false);
// // // // // //   const { links, deviceType, onShare } =
// // // // // //     useSelector((state) => state.global.modal.data) || {};

// // // // // //   const matchedLink = links?.find((item) => item?.deviceType === deviceType);

// // // // // //   const referralLink = matchedLink?.link
// // // // // //     ? `https://${matchedLink.link}`
// // // // // //     : "https://apps.apple.com/us/app/disney/id1446075923?pt=123456&ct=default";

// // // // // //   const handleCopy = () => {
// // // // // //     navigator.clipboard.writeText(referralLink);
// // // // // //     setCopied(true);
// // // // // //     setTimeout(() => setCopied(false), 2000);
// // // // // //   };

// // // // // //   return (
// // // // // //     <BaseModal
// // // // // //       onClose={onClose}
// // // // // //       containerClassName="max-w-[341px] md:max-w-[490.5px] min-h-fit"
// // // // // //     >
// // // // // //       <div className="flex items-center flex-col px-[18px] py-[30px]">
// // // // // //         <h3 className="text-[#5A5FDC] font-semibold md:font-bold text-[22px] md:text-2xl">
// // // // // //           IOS Appstore Referral Link
// // // // // //         </h3>

// // // // // //         <p className="text-[#000AFF] font-medium text-base mt-3 md:mt-5 text-center break-all">
// // // // // //           {referralLink}
// // // // // //         </p>

// // // // // //         {copied && <p className="text-green-600 font-medium mt-2">Copied!</p>}

// // // // // //         <div className="flex items-center gap-x-[15px] md:gap-x-[33px] mt-5 md:mt-[30px]">
// // // // // //           <LinkButton
// // // // // //             icon={CopyIcon}
// // // // // //             text="Copy Link"
// // // // // //             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
// // // // // //             onClick={handleCopy}
// // // // // //           />
// // // // // //           <LinkButton
// // // // // //             icon={ShareIcon}
// // // // // //             onClick={onShare}
// // // // // //             text="Share Link"
// // // // // //             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
// // // // // //           />
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </BaseModal>
// // // // // //   );
// // // // // // };





// // // // // import React, { useState } from "react";
// // // // // import { BaseModal } from "./base-modal";
// // // // // import { useSelector } from "react-redux";
// // // // // import { LinkButton } from "../button/link-icon";
// // // // // import { CopyIcon } from "../../../assets/svgs/components/copy-icon";
// // // // // import { ShareIcon } from "../../../assets/svgs/components/share-icon";

// // // // // export const ReferralLinkModal = ({ onClose }) => {
// // // // //   const [copied, setCopied] = useState(false);
// // // // //   const { links, deviceType, onShare } =
// // // // //     useSelector((state) => state.global.modal.data) || {};

// // // // //   const matchedLink = links?.find((item) => item?.deviceType === deviceType);

// // // // //   const referralLink = matchedLink?.link
// // // // //     ? `https://${matchedLink.link}`
// // // // //     : deviceType === "ios"
// // // // //     ? "https://apps.apple.com/us/app/disney/id1446075923?pt=123456&ct=default"
// // // // //     : "https://play.google.com/store/apps/details?id=com.example.app";

// // // // //   // Determine modal title based on device type
// // // // //   const modalTitle = deviceType === "ios" 
// // // // //     ? "IOS Appstore Referral Link" 
// // // // //     : "Android Playstore Referral Link";

// // // // //   const handleCopy = () => {
// // // // //     navigator.clipboard.writeText(referralLink);
// // // // //     setCopied(true);
// // // // //     setTimeout(() => setCopied(false), 2000);
// // // // //   };

// // // // //   return (
// // // // //     <BaseModal
// // // // //       onClose={onClose}
// // // // //       containerClassName="max-w-[341px] md:max-w-[490.5px] min-h-fit"
// // // // //     >
// // // // //       <div className="flex items-center flex-col px-[18px] py-[30px]">
// // // // //         <h3 className="text-[#5A5FDC] font-semibold md:font-bold text-[22px] md:text-2xl">
// // // // //           {modalTitle}
// // // // //         </h3>

// // // // //         <p className="text-[#000AFF] font-medium text-base mt-3 md:mt-5 text-center break-all">
// // // // //           {referralLink}
// // // // //         </p>

// // // // //         {copied && <p className="text-green-600 font-medium mt-2">Copied!</p>}

// // // // //         <div className="flex items-center gap-x-[15px] md:gap-x-[33px] mt-5 md:mt-[30px]">
// // // // //           <LinkButton
// // // // //             icon={CopyIcon}
// // // // //             text="Copy Link"
// // // // //             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
// // // // //             onClick={handleCopy}
// // // // //           />
// // // // //           <LinkButton
// // // // //             icon={ShareIcon}
// // // // //             onClick={onShare}
// // // // //             text="Share Link"
// // // // //             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
// // // // //           />
// // // // //         </div>
// // // // //       </div>
// // // // //     </BaseModal>
// // // // //   );
// // // // // };





// // import React, { useState, useEffect } from "react";
// // import { BaseModal } from "./base-modal";
// // import { useSelector } from "react-redux";
// // import { LinkButton } from "../button/link-icon";
// // import { CopyIcon } from "../../../assets/svgs/components/copy-icon";
// // import { ShareIcon } from "../../../assets/svgs/components/share-icon";

// // export const ReferralLinkModal = ({ onClose }) => {
// //   const [copied, setCopied] = useState(false);
// //   const [links, setLinks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const { deviceType, onShare } =
// //     useSelector((state) => state.global.modal.data) || {};

// //   useEffect(() => {
// //     const fetchLinks = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await fetch(
// //           "https://referralapis.appistan.co/api/referrals/apps/links",
// //           { method: "GET" }
// //         );
// //         const json = await response.json();
// //         if (json.success) {
// //           setLinks(json.data);
// //         } else {
// //           setError("Failed to fetch links.");
// //         }
// //       } catch (err) {
// //         setError("Something went wrong.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchLinks();
// //   }, []);

// //   const matchedLink = links?.find(
// //     (item) => item?.deviceType?.toLowerCase() === deviceType?.toLowerCase()
// //   );

// //   const referralLink = matchedLink?.link
// //     ? `https://${matchedLink.link}`
// //     : null;

// //   const modalTitle =
// //     deviceType?.toLowerCase() === "ios"
// //       ? "IOS Appstore Referral Link"
// //       : "Android Playstore Referral Link";

// //   const handleCopy = () => {
// //     if (!referralLink) return;
// //     navigator.clipboard.writeText(referralLink);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   return (
// //     <BaseModal
// //       onClose={onClose}
// //       containerClassName="max-w-[341px] md:max-w-[490.5px] min-h-fit"
// //     >
// //       <div className="flex items-center flex-col px-[18px] py-[30px]">
// //         <h3 className="text-[#5A5FDC] font-semibold md:font-bold text-[22px] md:text-2xl">
// //           {modalTitle}
// //         </h3>

// //         {loading ? (
// //           <p className="text-gray-400 font-medium text-base mt-3 md:mt-5">
// //             Loading...
// //           </p>
// //         ) : error ? (
// //           <p className="text-red-500 font-medium text-base mt-3 md:mt-5">
// //             {error}
// //           </p>
// //         ) : (
// //           <p className="text-[#000AFF] font-medium text-base mt-3 md:mt-5 text-center break-all">
// //             {referralLink ?? "—"}
// //           </p>
// //         )}

// //         {copied && (
// //           <p className="text-green-600 font-medium mt-2">Copied!</p>
// //         )}

// //         <div className="flex items-center gap-x-[15px] md:gap-x-[33px] mt-5 md:mt-[30px]">
// //           <LinkButton
// //             icon={CopyIcon}
// //             text="Copy Link"
// //             disabled={!referralLink || loading}
// //             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
// //             onClick={handleCopy}
// //           />
// //           <LinkButton
// //             icon={ShareIcon}
// //             onClick={onShare}
// //             text="Share Link"
// //             disabled={loading}
// //             containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
// //           />
// //         </div>
// //       </div>
// //     </BaseModal>
// //   );
// // };





// ////remove



import React, { useState } from "react";
import { BaseModal } from "./base-modal";
import { useSelector } from "react-redux";
import { LinkButton } from "../button/link-icon";
import { CopyIcon } from "../../../assets/svgs/components/copy-icon";
import { ShareIcon } from "../../../assets/svgs/components/share-icon";
import { getModalCallback } from "../../../hooks/dashboard/useDashboard";

export const ReferralLinkModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const { deviceType, androidAppReferralLink, iosAppReferralLink } =
    useSelector((state) => state.global.modal.data) || {};

  const referralLink =
    deviceType?.toLowerCase() === "ios"
      ? iosAppReferralLink
      : androidAppReferralLink;

  const modalTitle =
    deviceType?.toLowerCase() === "ios"
      ? "iOS Appstore Referral Link"
      : "Android Playstore Referral Link";

  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const onShare = getModalCallback("onShare");
    if (onShare) onShare();
  };

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[341px] md:max-w-[490.5px] min-h-fit"
    >
      <div className="flex items-center flex-col px-[18px] py-[30px]">
        <h3 className="text-[#000719] font-semibold md:font-bold text-[22px] md:text-2xl">
          {modalTitle}
        </h3>

        {referralLink ? (
          <p className="text-[#000AFF] font-medium text-base mt-3 md:mt-5 text-center break-all">
            {referralLink}
          </p>
        ) : (
          <p className="text-red-500 font-medium text-base mt-3 md:mt-5">
            Referral link not available.
          </p>
        )}

        {copied && (
          <p className="text-green-600 font-medium mt-2">Copied!</p>
        )}

        <div className="flex items-center gap-x-[15px] md:gap-x-[33px] mt-5 md:mt-[30px]">
          <LinkButton
            icon={CopyIcon}
            text="Copy Link"
            disabled={!referralLink}
            containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
            onClick={handleCopy}
          />
          <LinkButton
            icon={ShareIcon}
            onClick={handleShare}
            text="Share Link"
            disabled={!referralLink}
            containerClassName="p-5 md:py-[11px] md:px-[22.5px] rounded-[10px] text-white font-normal text-lg"
          />
        </div>
      </div>
    </BaseModal>
  );
};


