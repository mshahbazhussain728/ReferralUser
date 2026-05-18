




// // // // // // // // // // // import React, { useRef } from "react";
// // // // // // // // // // // import { BaseModal } from "./base-modal";
// // // // // // // // // // // import { CopyField } from "../copy-link-field";
// // // // // // // // // // // import { shareLinks } from "../../../utils/static";
// // // // // // // // // // // import { NextIcon } from "../../../assets/svgs/components/next-icon";
// // // // // // // // // // // import { useSelector } from "react-redux";
// // // // // // // // // // // import PlayStore from "../../../assets/pngs/PlayStore.png";

// // // // // // // // // // // export const ShareModal = ({ onClose }) => {
// // // // // // // // // // //   const scrollRef = useRef(null);

// // // // // // // // // // //   const modalData = useSelector((state) => state.global.modal?.data) || {};

// // // // // // // // // // //   const {
// // // // // // // // // // //     // ── Referral fields (existing) ──
// // // // // // // // // // //     deviceType,
// // // // // // // // // // //     androidAppReferralLink,
// // // // // // // // // // //     iosAppReferralLink,

// // // // // // // // // // //     // ── Payment fields ──
// // // // // // // // // // //     reqSentDate,
// // // // // // // // // // //     points,
// // // // // // // // // // //     reqApprovedDate,
// // // // // // // // // // //     paymentMethod,
// // // // // // // // // // //     paymentDate,
// // // // // // // // // // //     status,
// // // // // // // // // // //     statusDisplay,
// // // // // // // // // // //   } = modalData;

// // // // // // // // // // //   // ── If payment fields exist → payment share mode ──
// // // // // // // // // // //   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);

// // // // // // // // // // //   // ── Referral link (existing logic, unchanged) ──
// // // // // // // // // // //   const referralLink =
// // // // // // // // // // //     deviceType?.toLowerCase() === "ios"
// // // // // // // // // // //       ? iosAppReferralLink
// // // // // // // // // // //       : androidAppReferralLink;

// // // // // // // // // // //   // ── Plain text for payment sharing ──
// // // // // // // // // // //   const buildPaymentText = () =>
// // // // // // // // // // //     `Payment Details\n` +
// // // // // // // // // // //     `───────────────\n` +
// // // // // // // // // // //     `Request Sent     : ${reqSentDate  || "N/A"}\n` +
// // // // // // // // // // //     `Points Redeemed  : ${points       || "0"  }\n` +
// // // // // // // // // // //     `Request Approved : ${reqApprovedDate || "N/A"}\n` +
// // // // // // // // // // //     `Payment Method   : ${paymentMethod  || "N/A"}\n` +
// // // // // // // // // // //     `Payment Date     : ${paymentDate    || "N/A"}\n` +
// // // // // // // // // // //     `Status           : ${statusDisplay?.label || status || "Pending"}`;

// // // // // // // // // // //   // ── Share URL builder ──
// // // // // // // // // // //   const getShareUrl = (label) => {
// // // // // // // // // // //     if (isPaymentShare) {
// // // // // // // // // // //       const text    = encodeURIComponent(buildPaymentText());
// // // // // // // // // // //       const appUrl  = encodeURIComponent("https://famocare.com");
// // // // // // // // // // //       switch (label) {
// // // // // // // // // // //         case "Facebook":  return `https://www.facebook.com/sharer/sharer.php?quote=${text}&u=${appUrl}`;
// // // // // // // // // // //         case "Twitter":   return `https://twitter.com/intent/tweet?text=${text}`;
// // // // // // // // // // //         case "WhatsApp":  return `https://wa.me/?text=${text}`;
// // // // // // // // // // //         case "Telegram":  return `https://t.me/share/url?url=${appUrl}&text=${text}`;
// // // // // // // // // // //         case "Reddit":    return `https://www.reddit.com/submit?title=${text}`;
// // // // // // // // // // //         case "Tumblr":    return `https://www.tumblr.com/share/link?description=${text}`;
// // // // // // // // // // //         case "Blogger":   return `https://www.blogger.com/blog-this.g?n=${text}`;
// // // // // // // // // // //         case "Instagram": return "https://www.instagram.com/";
// // // // // // // // // // //         default:          return "#";
// // // // // // // // // // //       }
// // // // // // // // // // //     }

// // // // // // // // // // //     // ── Original referral URLs (100% unchanged) ──
// // // // // // // // // // //     const encoded = encodeURIComponent(referralLink || "");
// // // // // // // // // // //     const text    = encodeURIComponent("Join Famocare using my referral link!");
// // // // // // // // // // //     switch (label) {
// // // // // // // // // // //       case "Facebook":  return "https://www.facebook.com/sharer/sharer.php?u=" + encoded;
// // // // // // // // // // //       case "Twitter":   return "https://twitter.com/intent/tweet?url=" + encoded + "&text=" + text;
// // // // // // // // // // //       case "WhatsApp":  return "https://wa.me/?text=" + encodeURIComponent("Join Famocare: " + (referralLink || ""));
// // // // // // // // // // //       case "Telegram":  return "https://t.me/share/url?url=" + encoded + "&text=" + text;
// // // // // // // // // // //       case "Reddit":    return "https://www.reddit.com/submit?url=" + encoded + "&title=Join+Famocare";
// // // // // // // // // // //       case "Tumblr":    return "https://www.tumblr.com/share/link?url=" + encoded;
// // // // // // // // // // //       case "Blogger":   return "https://www.blogger.com/blog-this.g?u=" + encoded;
// // // // // // // // // // //       case "Instagram": return "https://www.instagram.com/";
// // // // // // // // // // //       default:          return referralLink || "#";
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // ── EasyPaisa: native share on mobile, clipboard fallback on desktop ──
// // // // // // // // // // //   const handleEasyPaisaShare = async () => {
// // // // // // // // // // //     const text = buildPaymentText();
// // // // // // // // // // //     if (navigator.share) {
// // // // // // // // // // //       try {
// // // // // // // // // // //         await navigator.share({ title: "Payment Details", text });
// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         if (err.name !== "AbortError") copyToClipboard(text);
// // // // // // // // // // //       }
// // // // // // // // // // //     } else {
// // // // // // // // // // //       copyToClipboard(text);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const copyToClipboard = (text) => {
// // // // // // // // // // //     navigator.clipboard
// // // // // // // // // // //       .writeText(text)
// // // // // // // // // // //       .then(() => alert("Payment details copied to clipboard!"))
// // // // // // // // // // //       .catch(() => alert("Could not copy. Please copy manually."));
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleScrollRight = () => {
// // // // // // // // // // //     if (scrollRef.current) {
// // // // // // // // // // //       scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // ── App store button styles (unchanged) ──
// // // // // // // // // // //   const appleClassName =
// // // // // // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // // // // // //     (deviceType === "ios"
// // // // // // // // // // //       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
// // // // // // // // // // //       : "bg-gray-800 text-white hover:bg-gray-900");

// // // // // // // // // // //   const googleClassName =
// // // // // // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // // // // // //     (deviceType === "android"
// // // // // // // // // // //       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
// // // // // // // // // // //       : "bg-green-700 text-white hover:bg-green-800");

// // // // // // // // // // //   return (
// // // // // // // // // // //     <BaseModal
// // // // // // // // // // //       onClose={onClose}
// // // // // // // // // // //       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
// // // // // // // // // // //     >
// // // // // // // // // // //       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">

// // // // // // // // // // //         {/* Title */}
// // // // // // // // // // //         <p className="text-lg text-[#055860] md:text-[36px] font-semibold mb-[22px]">
// // // // // // // // // // //           {isPaymentShare ? "Share Payment Details" : "Share Referral Link"}
// // // // // // // // // // //         </p>

// // // // // // // // // // //         <div className="relative">
// // // // // // // // // // //           {isPaymentShare && (
// // // // // // // // // // //             <button
// // // // // // // // // // //              ></button>
// // // // // // // // // // //            )}

// // // // // // // // // // //           <div
// // // // // // // // // // //             ref={scrollRef}
// // // // // // // // // // //             className="flex gap-5 justify-between md:justify-center md:gap-x-6 flex-wrap md:flex-nowrap md:overflow-x-auto no-scrollbar my-5 md:mt-[22px] md:mb-[47px]"
// // // // // // // // // // //           >
// // // // // // // // // // //             {shareLinks?.map((link) => (
// // // // // // // // // // //               <a
// // // // // // // // // // //                 key={link.label}
// // // // // // // // // // //                 href={getShareUrl(link.label)}
// // // // // // // // // // //                 target="_blank"
// // // // // // // // // // //                 rel="noopener noreferrer"
// // // // // // // // // // //                 title={link.label}
// // // // // // // // // // //                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity"
// // // // // // // // // // //               >
// // // // // // // // // // //                 {link.icon}
// // // // // // // // // // //                 <span className="text-[10px] md:text-[20px] font-medium">
// // // // // // // // // // //                   {link.label}
// // // // // // // // // // //                 </span>
// // // // // // // // // // //               </a>
// // // // // // // // // // //             ))}

// // // // // // // // // // //             <div className="absolute -right-4 top-5 hidden md:block">
// // // // // // // // // // //               <NextIcon onClick={handleScrollRight} />
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>

// // // // // // // // // // //           {/* ═══════════════════════════════════════════════
// // // // // // // // // // //               REFERRAL MODE ONLY — copy field + app stores
// // // // // // // // // // //               100% unchanged from your original code
// // // // // // // // // // //               ═══════════════════════════════════════════════ */}
// // // // // // // // // // //           {!isPaymentShare && (
// // // // // // // // // // //             <>
// // // // // // // // // // //               <CopyField value={referralLink || ""} />

// // // // // // // // // // //               <div className="mt-6 text-sm text-gray-600 text-center">
// // // // // // // // // // //                 <p className="mb-3 font-medium">Download from official stores:</p>
// // // // // // // // // // //                 <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
// // // // // // // // // // //                   <a
// // // // // // // // // // //                     href={iosAppReferralLink || "#"}
// // // // // // // // // // //                     target="_blank"
// // // // // // // // // // //                     rel="noopener noreferrer"
// // // // // // // // // // //                     className={appleClassName}
// // // // // // // // // // //                   >
// // // // // // // // // // //                     <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
// // // // // // // // // // //                       <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
// // // // // // // // // // //                     </svg>
// // // // // // // // // // //                     App Store
// // // // // // // // // // //                   </a>
// // // // // // // // // // //                   <a
// // // // // // // // // // //                     href={androidAppReferralLink || "#"}
// // // // // // // // // // //                     target="_blank"
// // // // // // // // // // //                     rel="noopener noreferrer"
// // // // // // // // // // //                     className={googleClassName}
// // // // // // // // // // //                   >
// // // // // // // // // // //                     <img
// // // // // // // // // // //                       src={PlayStore}
// // // // // // // // // // //                       alt="Play Store"
// // // // // // // // // // //                       width="16"
// // // // // // // // // // //                       height="15"
// // // // // // // // // // //                       style={{ marginRight: "10px" }}
// // // // // // // // // // //                     />
// // // // // // // // // // //                     Google Play
// // // // // // // // // // //                   </a>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 <p className="mt-4 text-sm text-gray-600">
// // // // // // // // // // //                   {(!deviceType ||
// // // // // // // // // // //                     (deviceType !== "ios" && deviceType !== "android")) &&
// // // // // // // // // // //                     "Select your platform above"}
// // // // // // // // // // //                 </p>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </>
// // // // // // // // // // //           )}

// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </BaseModal>
// // // // // // // // // // //   );
// // // // // // // // // // // };


// // // // // // // // // // import React, { useRef } from "react";
// // // // // // // // // // import { BaseModal } from "./base-modal";
// // // // // // // // // // import { CopyField } from "../copy-link-field";
// // // // // // // // // // import { shareLinks } from "../../../utils/static";
// // // // // // // // // // import { NextIcon } from "../../../assets/svgs/components/next-icon";
// // // // // // // // // // import { useSelector } from "react-redux";
// // // // // // // // // // import PlayStore from "../../../assets/pngs/PlayStore.png";

// // // // // // // // // // export const ShareModal = ({ onClose }) => {
// // // // // // // // // //   const scrollRef = useRef(null);

// // // // // // // // // //   const modalData = useSelector((state) => state.global.modal?.data) || {};

// // // // // // // // // //   const {
// // // // // // // // // //     // ── Referral fields (existing) ──
// // // // // // // // // //     deviceType,
// // // // // // // // // //     androidAppReferralLink,
// // // // // // // // // //     iosAppReferralLink,

// // // // // // // // // //     // ── Payment fields ──
// // // // // // // // // //     reqSentDate,
// // // // // // // // // //     points,
// // // // // // // // // //     reqApprovedDate,
// // // // // // // // // //     paymentMethod,
// // // // // // // // // //     paymentDate,
// // // // // // // // // //     status,
// // // // // // // // // //     statusDisplay,
// // // // // // // // // //   } = modalData;

// // // // // // // // // //   // ── If payment fields exist → payment share mode ──
// // // // // // // // // //   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);

// // // // // // // // // //   // ── Referral link (existing logic, unchanged) ──
// // // // // // // // // //   const referralLink =
// // // // // // // // // //     deviceType?.toLowerCase() === "ios"
// // // // // // // // // //       ? iosAppReferralLink
// // // // // // // // // //       : androidAppReferralLink;

// // // // // // // // // //   // ── Plain text for payment sharing ──
// // // // // // // // // //   const buildPaymentText = () =>
// // // // // // // // // //     `Payment Details\n` +
// // // // // // // // // //     `───────────────\n` +
// // // // // // // // // //     `Request Sent     : ${reqSentDate  || "N/A"}\n` +
// // // // // // // // // //     `Points Redeemed  : ${points       || "0"  }\n` +
// // // // // // // // // //     `Request Approved : ${reqApprovedDate || "N/A"}\n` +
// // // // // // // // // //     `Payment Method   : ${paymentMethod  || "N/A"}\n` +
// // // // // // // // // //     `Payment Date     : ${paymentDate    || "N/A"}\n` +
// // // // // // // // // //     `Status           : ${statusDisplay?.label || status || "Pending"}`;

// // // // // // // // // //   // ── Share URL builder ──
// // // // // // // // // //   const getShareUrl = (label) => {
// // // // // // // // // //     if (isPaymentShare) {
// // // // // // // // // //       const text    = encodeURIComponent(buildPaymentText());
// // // // // // // // // //       const appUrl  = encodeURIComponent("https://famocare.com");
// // // // // // // // // //       switch (label) {
// // // // // // // // // //         case "Facebook":  return `https://www.facebook.com/sharer/sharer.php?quote=${text}&u=${appUrl}`;
// // // // // // // // // //         case "Twitter":   return `https://twitter.com/intent/tweet?text=${text}`;
// // // // // // // // // //         case "WhatsApp":  return `https://wa.me/?text=${text}`;
// // // // // // // // // //         case "Telegram":  return `https://t.me/share/url?url=${appUrl}&text=${text}`;
// // // // // // // // // //         case "Reddit":    return `https://www.reddit.com/submit?title=${text}`;
// // // // // // // // // //         case "Tumblr":    return `https://www.tumblr.com/share/link?description=${text}`;
// // // // // // // // // //         case "Blogger":   return `https://www.blogger.com/blog-this.g?n=${text}`;
// // // // // // // // // //         case "Instagram": return "https://www.instagram.com/";
// // // // // // // // // //         default:          return "#";
// // // // // // // // // //       }
// // // // // // // // // //     }

// // // // // // // // // //     // ── Original referral URLs (100% unchanged) ──
// // // // // // // // // //     const encoded = encodeURIComponent(referralLink || "");
// // // // // // // // // //     const text    = encodeURIComponent("Join Famocare using my referral link!");
// // // // // // // // // //     switch (label) {
// // // // // // // // // //       case "Facebook":  return "https://www.facebook.com/sharer/sharer.php?u=" + encoded;
// // // // // // // // // //       case "Twitter":   return "https://twitter.com/intent/tweet?url=" + encoded + "&text=" + text;
// // // // // // // // // //       case "WhatsApp":  return "https://wa.me/?text=" + encodeURIComponent("Join Famocare: " + (referralLink || ""));
// // // // // // // // // //       case "Telegram":  return "https://t.me/share/url?url=" + encoded + "&text=" + text;
// // // // // // // // // //       case "Reddit":    return "https://www.reddit.com/submit?url=" + encoded + "&title=Join+Famocare";
// // // // // // // // // //       case "Tumblr":    return "https://www.tumblr.com/share/link?url=" + encoded;
// // // // // // // // // //       case "Blogger":   return "https://www.blogger.com/blog-this.g?u=" + encoded;
// // // // // // // // // //       case "Instagram": return "https://www.instagram.com/";
// // // // // // // // // //       default:          return referralLink || "#";
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ── EasyPaisa: native share on mobile, clipboard fallback on desktop ──
// // // // // // // // // //   const handleEasyPaisaShare = async () => {
// // // // // // // // // //     const text = buildPaymentText();
// // // // // // // // // //     if (navigator.share) {
// // // // // // // // // //       try {
// // // // // // // // // //         await navigator.share({ title: "Payment Details", text });
// // // // // // // // // //       } catch (err) {
// // // // // // // // // //         if (err.name !== "AbortError") copyToClipboard(text);
// // // // // // // // // //       }
// // // // // // // // // //     } else {
// // // // // // // // // //       copyToClipboard(text);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const copyToClipboard = (text) => {
// // // // // // // // // //     navigator.clipboard
// // // // // // // // // //       .writeText(text)
// // // // // // // // // //       .then(() => alert("Payment details copied to clipboard!"))
// // // // // // // // // //       .catch(() => alert("Could not copy. Please copy manually."));
// // // // // // // // // //   };

// // // // // // // // // //   const handleScrollRight = () => {
// // // // // // // // // //     if (scrollRef.current) {
// // // // // // // // // //       scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ── App store button styles (unchanged) ──
// // // // // // // // // //   const appleClassName =
// // // // // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // // // // //     (deviceType === "ios"
// // // // // // // // // //       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
// // // // // // // // // //       : "bg-gray-800 text-white hover:bg-gray-900");

// // // // // // // // // //   const googleClassName =
// // // // // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // // // // //     (deviceType === "android"
// // // // // // // // // //       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
// // // // // // // // // //       : "bg-green-700 text-white hover:bg-green-800");

// // // // // // // // // //   return (
// // // // // // // // // //     <BaseModal
// // // // // // // // // //       onClose={onClose}
// // // // // // // // // //       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
// // // // // // // // // //     >
// // // // // // // // // //       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">

// // // // // // // // // //         {/* Title */}
// // // // // // // // // //         <p className="text-lg text-[#055860] md:text-[36px] font-semibold mb-[22px]">
// // // // // // // // // //           {isPaymentShare ? "Share Payment Details" : "Share Referral Link"}
// // // // // // // // // //         </p>

// // // // // // // // // //         <div className="relative">
// // // // // // // // // //           {isPaymentShare && (
// // // // // // // // // //             <button
// // // // // // // // // //              ></button>
// // // // // // // // // //            )}

// // // // // // // // // //           <div
// // // // // // // // // //             ref={scrollRef}
// // // // // // // // // //             className="flex gap-5 justify-between md:justify-center md:gap-x-6 flex-wrap md:flex-nowrap md:overflow-x-auto no-scrollbar my-5 md:mt-[22px] md:mb-[47px]"
// // // // // // // // // //           >
// // // // // // // // // //             {shareLinks?.map((link) => (
// // // // // // // // // //               <a
// // // // // // // // // //                 key={link.label}
// // // // // // // // // //                 href={getShareUrl(link.label)}
// // // // // // // // // //                 target="_blank"
// // // // // // // // // //                 rel="noopener noreferrer"
// // // // // // // // // //                 title={link.label}
// // // // // // // // // //                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity"
// // // // // // // // // //               >
// // // // // // // // // //                 {link.icon}
// // // // // // // // // //                 <span className="text-[10px] md:text-[20px] font-medium">
// // // // // // // // // //                   {link.label}
// // // // // // // // // //                 </span>
// // // // // // // // // //               </a>
// // // // // // // // // //             ))}

// // // // // // // // // //             <div className="absolute -right-4 top-5 hidden md:block">
// // // // // // // // // //               <NextIcon onClick={handleScrollRight} />
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>

// // // // // // // // // //           {/* ═══════════════════════════════════════════════
// // // // // // // // // //               REFERRAL MODE ONLY — copy field + app stores
// // // // // // // // // //               100% unchanged from your original code
// // // // // // // // // //               ═══════════════════════════════════════════════ */}
// // // // // // // // // //           {!isPaymentShare && (
// // // // // // // // // //             <>
// // // // // // // // // //               <CopyField value={referralLink || ""} />

// // // // // // // // // //               <div className="mt-6 text-sm text-gray-600 text-center">
// // // // // // // // // //                 <p className="mb-3 font-medium">Download from official stores:</p>
// // // // // // // // // //                 <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
// // // // // // // // // //                   <a
// // // // // // // // // //                     href={iosAppReferralLink || "#"}
// // // // // // // // // //                     target="_blank"
// // // // // // // // // //                     rel="noopener noreferrer"
// // // // // // // // // //                     className={appleClassName}
// // // // // // // // // //                   >
// // // // // // // // // //                     <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
// // // // // // // // // //                       <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
// // // // // // // // // //                     </svg>
// // // // // // // // // //                     App Store
// // // // // // // // // //                   </a>
// // // // // // // // // //                   <a
// // // // // // // // // //                     href={androidAppReferralLink || "#"}
// // // // // // // // // //                     target="_blank"
// // // // // // // // // //                     rel="noopener noreferrer"
// // // // // // // // // //                     className={googleClassName}
// // // // // // // // // //                   >
// // // // // // // // // //                     <img
// // // // // // // // // //                       src={PlayStore}
// // // // // // // // // //                       alt="Play Store"
// // // // // // // // // //                       width="16"
// // // // // // // // // //                       height="15"
// // // // // // // // // //                       style={{ marginRight: "10px" }}
// // // // // // // // // //                     />
// // // // // // // // // //                     Google Play
// // // // // // // // // //                   </a>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <p className="mt-4 text-sm text-gray-600">
// // // // // // // // // //                   {(!deviceType ||
// // // // // // // // // //                     (deviceType !== "ios" && deviceType !== "android")) &&
// // // // // // // // // //                     "Select your platform above"}
// // // // // // // // // //                 </p>
// // // // // // // // // //               </div>
// // // // // // // // // //             </>
// // // // // // // // // //           )}

// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </BaseModal>
// // // // // // // // // //   );
// // // // // // // // // // };



// // // // // // // // // /////

// // // // // // // // // import React, { useRef, useState, useEffect } from "react";
// // // // // // // // // import { BaseModal } from "./base-modal";
// // // // // // // // // import { CopyField } from "../copy-link-field";
// // // // // // // // // import { shareLinks } from "../../../utils/static";
// // // // // // // // // import { NextIcon } from "../../../assets/svgs/components/next-icon";
// // // // // // // // // import { useSelector } from "react-redux";
// // // // // // // // // import PlayStore from "../../../assets/pngs/PlayStore.png";
// // // // // // // // // import html2canvas from "html2canvas";

// // // // // // // // // export const ShareModal = ({ onClose }) => {
// // // // // // // // //   const scrollRef = useRef(null);
// // // // // // // // //   const paymentContentRef = useRef(null);
// // // // // // // // //   const [canScrollLeft, setCanScrollLeft] = useState(false);
// // // // // // // // //   const [canScrollRight, setCanScrollRight] = useState(true);

// // // // // // // // //   const modalData = useSelector((state) => state.global.modal?.data) || {};

// // // // // // // // //   const {
// // // // // // // // //     // ── Referral fields (existing) ──
// // // // // // // // //     deviceType,
// // // // // // // // //     androidAppReferralLink,
// // // // // // // // //     iosAppReferralLink,

// // // // // // // // //     // ── Payment fields ──
// // // // // // // // //     reqSentDate,
// // // // // // // // //     points,
// // // // // // // // //     reqApprovedDate,
// // // // // // // // //     paymentMethod,
// // // // // // // // //     paymentDate,
// // // // // // // // //     status,
// // // // // // // // //   } = modalData;

// // // // // // // // //   // ── If payment fields exist → payment share mode ──
// // // // // // // // //   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);

// // // // // // // // //   // ── Referral link (existing logic, unchanged) ──
// // // // // // // // //   const referralLink =
// // // // // // // // //     deviceType?.toLowerCase() === "ios"
// // // // // // // // //       ? iosAppReferralLink
// // // // // // // // //       : androidAppReferralLink;

// // // // // // // // //   // Format date for display
// // // // // // // // //   const formatDateForShare = (date) => {
// // // // // // // // //     if (!date) return "N/A";
// // // // // // // // //     return new Date(date).toLocaleDateString('en-US', {
// // // // // // // // //       year: 'numeric',
// // // // // // // // //       month: 'short',
// // // // // // // // //       day: 'numeric'
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   // ── Function to capture screenshot and share ──
// // // // // // // // //   const captureAndShare = async (platform) => {
// // // // // // // // //     if (paymentContentRef.current) {
// // // // // // // // //       try {
// // // // // // // // //         // Capture the payment details card
// // // // // // // // //         const canvas = await html2canvas(paymentContentRef.current, {
// // // // // // // // //           scale: 2,
// // // // // // // // //           backgroundColor: '#ffffff',
// // // // // // // // //           logging: false,
// // // // // // // // //         });
        
// // // // // // // // //         const imageData = canvas.toDataURL("image/png");
        
// // // // // // // // //         // For WhatsApp and other platforms that support image sharing
// // // // // // // // //         if (platform === "WhatsApp") {
// // // // // // // // //           // Convert base64 to blob for sharing
// // // // // // // // //           const blob = await (await fetch(imageData)).blob();
// // // // // // // // //           const file = new File([blob], "payment_details.png", { type: "image/png" });
          
// // // // // // // // //           if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
// // // // // // // // //             try {
// // // // // // // // //               await navigator.share({
// // // // // // // // //                 title: "Payment Details",
// // // // // // // // //                 files: [file],
// // // // // // // // //               });
// // // // // // // // //             } catch (err) {
// // // // // // // // //               if (err.name !== "AbortError") {
// // // // // // // // //                 // Fallback to opening WhatsApp with text
// // // // // // // // //                 const text = buildPaymentText();
// // // // // // // // //                 window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
// // // // // // // // //               }
// // // // // // // // //             }
// // // // // // // // //           } else {
// // // // // // // // //             // Fallback: open WhatsApp with text
// // // // // // // // //             const text = buildPaymentText();
// // // // // // // // //             window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
// // // // // // // // //           }
// // // // // // // // //         } else {
// // // // // // // // //           // For other platforms, open in new tab with text
// // // // // // // // //           const text = buildPaymentText();
// // // // // // // // //           const shareUrl = getShareUrl(platform, text);
// // // // // // // // //           if (shareUrl && shareUrl !== "#") {
// // // // // // // // //             window.open(shareUrl, '_blank');
// // // // // // // // //           }
// // // // // // // // //         }
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Error capturing screenshot:", error);
// // // // // // // // //         // Fallback to text sharing
// // // // // // // // //         const text = buildPaymentText();
// // // // // // // // //         const shareUrl = getShareUrl(platform, text);
// // // // // // // // //         if (shareUrl && shareUrl !== "#") {
// // // // // // // // //           window.open(shareUrl, '_blank');
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ── Plain text for payment sharing (fallback) ──
// // // // // // // // //   const buildPaymentText = () => {
// // // // // // // // //     const statusDisplay = status || "Pending";
// // // // // // // // //     return `Payment Details\n` +
// // // // // // // // //       `───────────────\n` +
// // // // // // // // //       `Request Sent     : ${reqSentDate ? formatDateForShare(reqSentDate) : "N/A"}\n` +
// // // // // // // // //       `Points Redeemed  : ${points || "0"}\n` +
// // // // // // // // //       `Request Approved : ${reqApprovedDate ? formatDateForShare(reqApprovedDate) : "N/A"}\n` +
// // // // // // // // //       `Payment Method   : ${paymentMethod || "N/A"}\n` +
// // // // // // // // //       `Payment Date     : ${paymentDate ? formatDateForShare(paymentDate) : "N/A"}\n` +
// // // // // // // // //       `Status           : ${statusDisplay}`;
// // // // // // // // //   };

// // // // // // // // //   // ── Share URL builder ──
// // // // // // // // //   const getShareUrl = (label, text) => {
// // // // // // // // //     const encodedText = encodeURIComponent(text);
// // // // // // // // //     const appUrl = encodeURIComponent("https://famocare.com");
    
// // // // // // // // //     switch (label) {
// // // // // // // // //       case "Facebook":  
// // // // // // // // //         return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
// // // // // // // // //       case "Twitter":   
// // // // // // // // //         return `https://twitter.com/intent/tweet?text=${encodedText}`;
// // // // // // // // //       case "WhatsApp":  
// // // // // // // // //         return `https://wa.me/?text=${encodedText}`;
// // // // // // // // //       case "Telegram":  
// // // // // // // // //         return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
// // // // // // // // //       case "Reddit":    
// // // // // // // // //         return `https://www.reddit.com/submit?title=${encodedText}`;
// // // // // // // // //       case "Tumblr":    
// // // // // // // // //         return `https://www.tumblr.com/share/link?description=${encodedText}`;
// // // // // // // // //       case "Blogger":   
// // // // // // // // //         return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
// // // // // // // // //       case "Instagram": 
// // // // // // // // //         return "https://www.instagram.com/";
// // // // // // // // //       default:          
// // // // // // // // //         return "#";
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Handle platform click
// // // // // // // // //   const handlePlatformClick = async (link) => {
// // // // // // // // //     if (isPaymentShare) {
// // // // // // // // //       await captureAndShare(link.label);
// // // // // // // // //     } else {
// // // // // // // // //       // Original referral sharing
// // // // // // // // //       const url = getReferralShareUrl(link.label);
// // // // // // // // //       if (url && url !== "#") {
// // // // // // // // //         window.open(url, '_blank');
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Original referral share URLs (unchanged)
// // // // // // // // //   const getReferralShareUrl = (label) => {
// // // // // // // // //     const encoded = encodeURIComponent(referralLink || "");
// // // // // // // // //     const text = encodeURIComponent("Join Famocare using my referral link!");
// // // // // // // // //     switch (label) {
// // // // // // // // //       case "Facebook":  
// // // // // // // // //         return "https://www.facebook.com/sharer/sharer.php?u=" + encoded;
// // // // // // // // //       case "Twitter":   
// // // // // // // // //         return "https://twitter.com/intent/tweet?url=" + encoded + "&text=" + text;
// // // // // // // // //       case "WhatsApp":  
// // // // // // // // //         return "https://wa.me/?text=" + encodeURIComponent("Join Famocare: " + (referralLink || ""));
// // // // // // // // //       case "Telegram":  
// // // // // // // // //         return "https://t.me/share/url?url=" + encoded + "&text=" + text;
// // // // // // // // //       case "Reddit":    
// // // // // // // // //         return "https://www.reddit.com/submit?url=" + encoded + "&title=Join+Famocare";
// // // // // // // // //       case "Tumblr":    
// // // // // // // // //         return "https://www.tumblr.com/share/link?url=" + encoded;
// // // // // // // // //       case "Blogger":   
// // // // // // // // //         return "https://www.blogger.com/blog-this.g?u=" + encoded;
// // // // // // // // //       case "Instagram": 
// // // // // // // // //         return "https://www.instagram.com/";
// // // // // // // // //       default:          
// // // // // // // // //         return referralLink || "#";
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Check scroll position for chevron buttons
// // // // // // // // //   const checkScroll = () => {
// // // // // // // // //     if (scrollRef.current) {
// // // // // // // // //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
// // // // // // // // //       setCanScrollLeft(scrollLeft > 0);
// // // // // // // // //       setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleScrollLeft = () => {
// // // // // // // // //     if (scrollRef.current) {
// // // // // // // // //       scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleScrollRight = () => {
// // // // // // // // //     if (scrollRef.current) {
// // // // // // // // //       scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const scrollElement = scrollRef.current;
// // // // // // // // //     if (scrollElement) {
// // // // // // // // //       checkScroll();
// // // // // // // // //       scrollElement.addEventListener('scroll', checkScroll);
// // // // // // // // //       return () => scrollElement.removeEventListener('scroll', checkScroll);
// // // // // // // // //     }
// // // // // // // // //   }, []);

// // // // // // // // //   // ── App store button styles (unchanged) ──
// // // // // // // // //   const appleClassName =
// // // // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // // // //     (deviceType === "ios"
// // // // // // // // //       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
// // // // // // // // //       : "bg-gray-800 text-white hover:bg-gray-900");

// // // // // // // // //   const googleClassName =
// // // // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // // // //     (deviceType === "android"
// // // // // // // // //       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
// // // // // // // // //       : "bg-green-700 text-white hover:bg-green-800");

// // // // // // // // //   return (
// // // // // // // // //     <BaseModal
// // // // // // // // //       onClose={onClose}
// // // // // // // // //       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
// // // // // // // // //     >
// // // // // // // // //       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">
// // // // // // // // //         {/* Title */}
// // // // // // // // //         <p className="text-lg text-[#055860] md:text-[36px] font-semibold mb-[22px]">
// // // // // // // // //           {isPaymentShare ? "Share Payment Details" : "Share Referral Link"}
// // // // // // // // //         </p>

// // // // // // // // //         {/* Payment Details Card - Only visible in payment share mode */}
// // // // // // // // //         {isPaymentShare && (
// // // // // // // // //           <div 
// // // // // // // // //             ref={paymentContentRef}
// // // // // // // // //           >
// // // // // // // // //             </div>
// // // // // // // // //         )}

// // // // // // // // //           <div
// // // // // // // // //             ref={scrollRef}
// // // // // // // // //             className="flex gap-5 justify-start md:justify-center md:gap-x-6 flex-nowrap md:overflow-x-auto no-scrollbar my-5 md:mt-[22px] md:mb-[47px] overflow-x-auto scroll-smooth"
// // // // // // // // //             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
// // // // // // // // //           >
// // // // // // // // //             {shareLinks?.map((link) => (
// // // // // // // // //               <button
// // // // // // // // //                 key={link.label}
// // // // // // // // //                 onClick={() => handlePlatformClick(link)}
// // // // // // // // //                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
// // // // // // // // //                 title={link.label}
// // // // // // // // //               >
// // // // // // // // //                 {link.icon}
// // // // // // // // //                 <span className="text-[10px] md:text-[20px] font-medium">
// // // // // // // // //                   {link.label}
// // // // // // // // //                 </span>
// // // // // // // // //               </button>
// // // // // // // // //             ))}
// // // // // // // // //           </div>

// // // // // // // // //           {/* Right Chevron Button */}
// // // // // // // // //           {canScrollRight && (
// // // // // // // // //             <button
// // // // // // // // //               onClick={handleScrollRight}
// // // // // // // // //               className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50 transition-colors md:block hidden"
// // // // // // // // //               aria-label="Scroll right"
// // // // // // // // //             >
// // // // // // // // //               <NextIcon />
// // // // // // // // //             </button>
// // // // // // // // //           )}
// // // // // // // // //         </div>

// // // // // // // // //         {/* ═══════════════════════════════════════════════
// // // // // // // // //             REFERRAL MODE ONLY — copy field + app stores
// // // // // // // // //             ═══════════════════════════════════════════════ */}
// // // // // // // // //         {!isPaymentShare && (
// // // // // // // // //           <>
// // // // // // // // //             <CopyField value={referralLink || ""} />

// // // // // // // // //             <div className="mt-6 text-sm text-gray-600 text-center">
// // // // // // // // //               <p className="mb-3 font-medium">Download from official stores:</p>
// // // // // // // // //               <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
// // // // // // // // //                 <a
// // // // // // // // //                   href={iosAppReferralLink || "#"}
// // // // // // // // //                   target="_blank"
// // // // // // // // //                   rel="noopener noreferrer"
// // // // // // // // //                   className={appleClassName}
// // // // // // // // //                 >
// // // // // // // // //                   <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
// // // // // // // // //                     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
// // // // // // // // //                   </svg>
// // // // // // // // //                   App Store
// // // // // // // // //                 </a>
// // // // // // // // //                 <a
// // // // // // // // //                   href={androidAppReferralLink || "#"}
// // // // // // // // //                   target="_blank"
// // // // // // // // //                   rel="noopener noreferrer"
// // // // // // // // //                   className={googleClassName}
// // // // // // // // //                 >
// // // // // // // // //                   <img
// // // // // // // // //                     src={PlayStore}
// // // // // // // // //                     alt="Play Store"
// // // // // // // // //                     width="16"
// // // // // // // // //                     height="15"
// // // // // // // // //                     style={{ marginRight: "10px" }}
// // // // // // // // //                   />
// // // // // // // // //                   Google Play
// // // // // // // // //                 </a>
// // // // // // // // //               </div>

// // // // // // // // //               <p className="mt-4 text-sm text-gray-600">
// // // // // // // // //                 {(!deviceType ||
// // // // // // // // //                   (deviceType !== "ios" && deviceType !== "android")) &&
// // // // // // // // //                   "Select your platform above"}
// // // // // // // // //               </p>
// // // // // // // // //             </div>
// // // // // // // // //           </>
// // // // // // // // //         )}
// // // // // // // // //     </BaseModal>
// // // // // // // // //   );
// // // // // // // // // };




// // // // // // // // /////




// // // // // // // // import React, { useRef, useState, useEffect } from "react";
// // // // // // // // import { BaseModal } from "./base-modal";
// // // // // // // // import { CopyField } from "../copy-link-field";
// // // // // // // // import { shareLinks } from "../../../utils/static";
// // // // // // // // import { NextIcon } from "../../../assets/svgs/components/next-icon";
// // // // // // // // import { useSelector } from "react-redux";
// // // // // // // // import PlayStore from "../../../assets/pngs/PlayStore.png";
// // // // // // // // import html2canvas from "html2canvas";

// // // // // // // // export const ShareModal = ({ onClose }) => {
// // // // // // // //   const scrollRef = useRef(null);
// // // // // // // //   const [canScrollLeft, setCanScrollLeft] = useState(false);
// // // // // // // //   const [canScrollRight, setCanScrollRight] = useState(true);

// // // // // // // //   const modalData = useSelector((state) => state.global.modal?.data) || {};

// // // // // // // //   const {
// // // // // // // //     deviceType,
// // // // // // // //     androidAppReferralLink,
// // // // // // // //     iosAppReferralLink,
// // // // // // // //     reqSentDate,
// // // // // // // //     points,
// // // // // // // //     paymentMethod,
// // // // // // // //     reqApprovedDate,
// // // // // // // //     paymentDate,
// // // // // // // //     status,
// // // // // // // //     sourceElement,   // ✅ DOM element from PaymentDetailsModal
// // // // // // // //   } = modalData;

// // // // // // // //   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);

// // // // // // // //   const referralLink =
// // // // // // // //     deviceType?.toLowerCase() === "ios"
// // // // // // // //       ? iosAppReferralLink
// // // // // // // //       : androidAppReferralLink;

// // // // // // // //   // ✅ Silently capture PaymentDetailsModal, then share — no card rendered here
// // // // // // // //   const captureAndShare = async (platform) => {
// // // // // // // //     let imageBlob = null;

// // // // // // // //     if (sourceElement) {
// // // // // // // //       try {
// // // // // // // //         const canvas = await html2canvas(sourceElement, {
// // // // // // // //           scale: 2,
// // // // // // // //           backgroundColor: "#ffffff",
// // // // // // // //           useCORS: true,
// // // // // // // //           logging: false,
// // // // // // // //         });
// // // // // // // //         const dataUrl = canvas.toDataURL("image/png");
// // // // // // // //         const response = await fetch(dataUrl);
// // // // // // // //         imageBlob = await response.blob();
// // // // // // // //       } catch (err) {
// // // // // // // //         console.error("Capture failed:", err);
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     // Try native image sharing (mobile — works with WhatsApp, Telegram etc.)
// // // // // // // //     if (imageBlob) {
// // // // // // // //       try {
// // // // // // // //         const file = new File([imageBlob], "payment_details.png", {
// // // // // // // //           type: "image/png",
// // // // // // // //         });
// // // // // // // //         if (navigator.share && navigator.canShare?.({ files: [file] })) {
// // // // // // // //           await navigator.share({ title: "Payment Details", files: [file] });
// // // // // // // //           return;
// // // // // // // //         }
// // // // // // // //       } catch (err) {
// // // // // // // //         if (err.name === "AbortError") return; // user cancelled
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     // Fallback: open platform URL with plain text (desktop / unsupported browsers)
// // // // // // // //     const text = buildPaymentText();
// // // // // // // //     const url = getShareUrl(platform, text);
// // // // // // // //     if (url && url !== "#") window.open(url, "_blank");
// // // // // // // //   };

// // // // // // // //   const buildPaymentText = () =>
// // // // // // // //     `Payment Details\n` +
// // // // // // // //     `───────────────\n` +
// // // // // // // //     `Request Sent     : ${reqSentDate ?? "N/A"}\n` +
// // // // // // // //     `Points Redeemed  : ${points ?? "0"}\n` +
// // // // // // // //     `Request Approved : ${reqApprovedDate ?? "N/A"}\n` +
// // // // // // // //     `Payment Method   : ${paymentMethod ?? "N/A"}\n` +
// // // // // // // //     `Payment Date     : ${paymentDate ?? "N/A"}\n` +
// // // // // // // //     `Status           : ${status ?? "Pending"}`;

// // // // // // // //   const getShareUrl = (label, text) => {
// // // // // // // //     const encodedText = encodeURIComponent(text);
// // // // // // // //     const appUrl = encodeURIComponent("https://famocare.com");
// // // // // // // //     switch (label) {
// // // // // // // //       case "Facebook":  return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
// // // // // // // //       case "Twitter":   return `https://twitter.com/intent/tweet?text=${encodedText}`;
// // // // // // // //       case "WhatsApp":  return `https://wa.me/?text=${encodedText}`;
// // // // // // // //       case "Telegram":  return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
// // // // // // // //       case "Reddit":    return `https://www.reddit.com/submit?title=${encodedText}`;
// // // // // // // //       case "Tumblr":    return `https://www.tumblr.com/share/link?description=${encodedText}`;
// // // // // // // //       case "Blogger":   return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
// // // // // // // //       case "Instagram": return "https://www.instagram.com/";
// // // // // // // //       default:          return "#";
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const getReferralShareUrl = (label) => {
// // // // // // // //     const encoded = encodeURIComponent(referralLink || "");
// // // // // // // //     const text = encodeURIComponent("Join Famocare using my referral link!");
// // // // // // // //     switch (label) {
// // // // // // // //       case "Facebook":  return "https://www.facebook.com/sharer/sharer.php?u=" + encoded;
// // // // // // // //       case "Twitter":   return "https://twitter.com/intent/tweet?url=" + encoded + "&text=" + text;
// // // // // // // //       case "WhatsApp":  return "https://wa.me/?text=" + encodeURIComponent("Join Famocare: " + (referralLink || ""));
// // // // // // // //       case "Telegram":  return "https://t.me/share/url?url=" + encoded + "&text=" + text;
// // // // // // // //       case "Reddit":    return "https://www.reddit.com/submit?url=" + encoded + "&title=Join+Famocare";
// // // // // // // //       case "Tumblr":    return "https://www.tumblr.com/share/link?url=" + encoded;
// // // // // // // //       case "Blogger":   return "https://www.blogger.com/blog-this.g?u=" + encoded;
// // // // // // // //       case "Instagram": return "https://www.instagram.com/";
// // // // // // // //       default:          return referralLink || "#";
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handlePlatformClick = (link) => {
// // // // // // // //     if (isPaymentShare) {
// // // // // // // //       captureAndShare(link.label);
// // // // // // // //     } else {
// // // // // // // //       const url = getReferralShareUrl(link.label);
// // // // // // // //       if (url && url !== "#") window.open(url, "_blank");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const checkScroll = () => {
// // // // // // // //     if (scrollRef.current) {
// // // // // // // //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
// // // // // // // //       setCanScrollLeft(scrollLeft > 0);
// // // // // // // //       setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     const el = scrollRef.current;
// // // // // // // //     if (el) {
// // // // // // // //       checkScroll();
// // // // // // // //       el.addEventListener("scroll", checkScroll);
// // // // // // // //       return () => el.removeEventListener("scroll", checkScroll);
// // // // // // // //     }
// // // // // // // //   }, []);

// // // // // // // //   const appleClassName =
// // // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // // //     (deviceType === "ios"
// // // // // // // //       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
// // // // // // // //       : "bg-gray-800 text-white hover:bg-gray-900");

// // // // // // // //   const googleClassName =
// // // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // // //     (deviceType === "android"
// // // // // // // //       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
// // // // // // // //       : "bg-green-700 text-white hover:bg-green-800");

// // // // // // // //   return (
// // // // // // // //     <BaseModal
// // // // // // // //       onClose={onClose}
// // // // // // // //       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
// // // // // // // //     >
// // // // // // // //       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">
// // // // // // // //         <p className="text-lg text-[#055860] md:text-[36px] font-semibold mb-[22px]">
// // // // // // // //           {isPaymentShare ? "Share Payment Details" : "Share Referral Link"}
// // // // // // // //         </p>

// // // // // // // //         {/* ✅ No card here — completely removed */}

// // // // // // // //         <div className="relative">
// // // // // // // //           {canScrollLeft && (
// // // // // // // //             <button
// // // // // // // //               onClick={() => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
// // // // // // // //               className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50 transition-colors md:block hidden"
// // // // // // // //               aria-label="Scroll left"
// // // // // // // //             >
// // // // // // // //               <NextIcon className="rotate-180" />
// // // // // // // //             </button>
// // // // // // // //           )}

// // // // // // // //           <div
// // // // // // // //             ref={scrollRef}
// // // // // // // //             className="flex gap-5 justify-start md:justify-center md:gap-x-6 flex-nowrap overflow-x-auto no-scrollbar my-5 md:mt-[22px] md:mb-[47px] scroll-smooth"
// // // // // // // //             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
// // // // // // // //           >
// // // // // // // //             {shareLinks?.map((link) => (
// // // // // // // //               <button
// // // // // // // //                 key={link.label}
// // // // // // // //                 onClick={() => handlePlatformClick(link)}
// // // // // // // //                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
// // // // // // // //                 title={link.label}
// // // // // // // //               >
// // // // // // // //                 {link.icon}
// // // // // // // //                 <span className="text-[10px] md:text-[20px] font-medium">
// // // // // // // //                   {link.label}
// // // // // // // //                 </span>
// // // // // // // //               </button>
// // // // // // // //             ))}
// // // // // // // //           </div>

// // // // // // // //           {canScrollRight && (
// // // // // // // //             <button
// // // // // // // //               onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
// // // // // // // //               className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50 transition-colors md:block hidden"
// // // // // // // //               aria-label="Scroll right"
// // // // // // // //             >
// // // // // // // //               <NextIcon />
// // // // // // // //             </button>
// // // // // // // //           )}
// // // // // // // //         </div>

// // // // // // // //         {!isPaymentShare && (
// // // // // // // //           <>
// // // // // // // //             <CopyField value={referralLink || ""} />
// // // // // // // //             <div className="mt-6 text-sm text-gray-600 text-center">
// // // // // // // //               <p className="mb-3 font-medium">Download from official stores:</p>
// // // // // // // //               <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
// // // // // // // //                 <a href={iosAppReferralLink || "#"} target="_blank" rel="noopener noreferrer" className={appleClassName}>
// // // // // // // //                   <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
// // // // // // // //                     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
// // // // // // // //                   </svg>
// // // // // // // //                   App Store
// // // // // // // //                 </a>
// // // // // // // //                 <a href={androidAppReferralLink || "#"} target="_blank" rel="noopener noreferrer" className={googleClassName}>
// // // // // // // //                   <img src={PlayStore} alt="Play Store" width="16" height="15" style={{ marginRight: "10px" }} />
// // // // // // // //                   Google Play
// // // // // // // //                 </a>
// // // // // // // //               </div>
// // // // // // // //               <p className="mt-4 text-sm text-gray-600">
// // // // // // // //                 {(!deviceType || (deviceType !== "ios" && deviceType !== "android")) && "Select your platform above"}
// // // // // // // //               </p>
// // // // // // // //             </div>
// // // // // // // //           </>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </BaseModal>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // ////////





// // // // // // // import React, { useRef, useState, useEffect } from "react";
// // // // // // // import { BaseModal } from "./base-modal";
// // // // // // // import { CopyField } from "../copy-link-field";
// // // // // // // import { shareLinks } from "../../../utils/static";
// // // // // // // import { NextIcon } from "../../../assets/svgs/components/next-icon";
// // // // // // // import { useSelector } from "react-redux";
// // // // // // // import PlayStore from "../../../assets/pngs/PlayStore.png";

// // // // // // // export const ShareModal = ({ onClose }) => {
// // // // // // //   const scrollRef = useRef(null);
// // // // // // //   const [canScrollLeft, setCanScrollLeft] = useState(false);
// // // // // // //   const [canScrollRight, setCanScrollRight] = useState(true);

// // // // // // //   const modalData = useSelector((state) => state.global.modal?.data) || {};

// // // // // // //   const {
// // // // // // //     deviceType,
// // // // // // //     androidAppReferralLink,
// // // // // // //     iosAppReferralLink,
// // // // // // //     reqSentDate,
// // // // // // //     points,
// // // // // // //     paymentMethod,
// // // // // // //     reqApprovedDate,
// // // // // // //     paymentDate,
// // // // // // //     status,
// // // // // // //     imageBlob,   // ✅ pre-captured screenshot blob from PaymentDetailsModal
// // // // // // //   } = modalData;

// // // // // // //   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);

// // // // // // //   const referralLink =
// // // // // // //     deviceType?.toLowerCase() === "ios"
// // // // // // //       ? iosAppReferralLink
// // // // // // //       : androidAppReferralLink;

// // // // // // //   const handlePlatformClick = async (link) => {
// // // // // // //     if (isPaymentShare) {
// // // // // // //       await sharePaymentImage(link.label);
// // // // // // //     } else {
// // // // // // //       const url = getReferralShareUrl(link.label);
// // // // // // //       if (url && url !== "#") window.open(url, "_blank");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ✅ Always share the image blob — no re-capturing, no text fallback on mobile
// // // // // // //   const sharePaymentImage = async (platform) => {
// // // // // // //     if (imageBlob) {
// // // // // // //       const file = new File([imageBlob], "payment_details.png", {
// // // // // // //         type: "image/png",
// // // // // // //       });

// // // // // // //       // Mobile: native share sheet — opens WhatsApp, Telegram etc. with image
// // // // // // //       if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
// // // // // // //         try {
// // // // // // //           await navigator.share({ title: "Payment Details", files: [file] });
// // // // // // //           return;
// // // // // // //         } catch (err) {
// // // // // // //           if (err.name === "AbortError") return; // user dismissed
// // // // // // //         }
// // // // // // //       }

// // // // // // //       // Desktop: open image in new tab so user can save and share manually
// // // // // // //       const blobUrl = URL.createObjectURL(imageBlob);
// // // // // // //       window.open(blobUrl, "_blank");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     // Last resort fallback if blob missing
// // // // // // //     const text = buildPaymentText();
// // // // // // //     const url = getShareUrl(platform, text);
// // // // // // //     if (url && url !== "#") window.open(url, "_blank");
// // // // // // //   };

// // // // // // //   const buildPaymentText = () =>
// // // // // // //     `Payment Details\n` +
// // // // // // //     `───────────────\n` +
// // // // // // //     `Request Sent     : ${reqSentDate ?? "N/A"}\n` +
// // // // // // //     `Points Redeemed  : ${points ?? "0"}\n` +
// // // // // // //     `Request Approved : ${reqApprovedDate ?? "N/A"}\n` +
// // // // // // //     `Payment Method   : ${paymentMethod ?? "N/A"}\n` +
// // // // // // //     `Payment Date     : ${paymentDate ?? "N/A"}\n` +
// // // // // // //     `Status           : ${status ?? "Pending"}`;

// // // // // // //   const getShareUrl = (label, text) => {
// // // // // // //     const encodedText = encodeURIComponent(text);
// // // // // // //     const appUrl = encodeURIComponent("https://famocare.com");
// // // // // // //     switch (label) {
// // // // // // //       case "Facebook":  return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
// // // // // // //       case "Twitter":   return `https://twitter.com/intent/tweet?text=${encodedText}`;
// // // // // // //       case "WhatsApp":  return `https://wa.me/?text=${encodedText}`;
// // // // // // //       case "Telegram":  return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
// // // // // // //       case "Reddit":    return `https://www.reddit.com/submit?title=${encodedText}`;
// // // // // // //       case "Tumblr":    return `https://www.tumblr.com/share/link?description=${encodedText}`;
// // // // // // //       case "Blogger":   return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
// // // // // // //       case "Instagram": return "https://www.instagram.com/";
// // // // // // //       default:          return "#";
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getReferralShareUrl = (label) => {
// // // // // // //     const encoded = encodeURIComponent(referralLink || "");
// // // // // // //     const text = encodeURIComponent("Join Famocare using my referral link!");
// // // // // // //     switch (label) {
// // // // // // //       case "Facebook":  return "https://www.facebook.com/sharer/sharer.php?u=" + encoded;
// // // // // // //       case "Twitter":   return "https://twitter.com/intent/tweet?url=" + encoded + "&text=" + text;
// // // // // // //       case "WhatsApp":  return "https://wa.me/?text=" + encodeURIComponent("Join Famocare: " + (referralLink || ""));
// // // // // // //       case "Telegram":  return "https://t.me/share/url?url=" + encoded + "&text=" + text;
// // // // // // //       case "Reddit":    return "https://www.reddit.com/submit?url=" + encoded + "&title=Join+Famocare";
// // // // // // //       case "Tumblr":    return "https://www.tumblr.com/share/link?url=" + encoded;
// // // // // // //       case "Blogger":   return "https://www.blogger.com/blog-this.g?u=" + encoded;
// // // // // // //       case "Instagram": return "https://www.instagram.com/";
// // // // // // //       default:          return referralLink || "#";
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const checkScroll = () => {
// // // // // // //     if (scrollRef.current) {
// // // // // // //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
// // // // // // //       setCanScrollLeft(scrollLeft > 0);
// // // // // // //       setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     const el = scrollRef.current;
// // // // // // //     if (el) {
// // // // // // //       checkScroll();
// // // // // // //       el.addEventListener("scroll", checkScroll);
// // // // // // //       return () => el.removeEventListener("scroll", checkScroll);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   const appleClassName =
// // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // //     (deviceType === "ios"
// // // // // // //       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
// // // // // // //       : "bg-gray-800 text-white hover:bg-gray-900");

// // // // // // //   const googleClassName =
// // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // //     (deviceType === "android"
// // // // // // //       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
// // // // // // //       : "bg-green-700 text-white hover:bg-green-800");

// // // // // // //   return (
// // // // // // //     <BaseModal
// // // // // // //       onClose={onClose}
// // // // // // //       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
// // // // // // //     >
// // // // // // //       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">
// // // // // // //         <p className="text-lg text-[#055860] md:text-[36px] font-semibold mb-[22px]">
// // // // // // //           {isPaymentShare ? "Share Payment Details" : "Share Referral Link"}
// // // // // // //         </p>

// // // // // // //         <div className="relative">
// // // // // // //           {canScrollLeft && (
// // // // // // //             <button
// // // // // // //               onClick={() => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
// // // // // // //               className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50 transition-colors md:block hidden"
// // // // // // //               aria-label="Scroll left"
// // // // // // //             >
// // // // // // //               <NextIcon className="rotate-180" />
// // // // // // //             </button>
// // // // // // //           )}

// // // // // // //           <div
// // // // // // //             ref={scrollRef}
// // // // // // //             className="flex gap-5 justify-start md:justify-center md:gap-x-6 flex-nowrap overflow-x-auto no-scrollbar my-5 md:mt-[22px] md:mb-[47px] scroll-smooth"
// // // // // // //             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
// // // // // // //           >
// // // // // // //             {shareLinks?.map((link) => (
// // // // // // //               <button
// // // // // // //                 key={link.label}
// // // // // // //                 onClick={() => handlePlatformClick(link)}
// // // // // // //                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
// // // // // // //                 title={link.label}
// // // // // // //               >
// // // // // // //                 {link.icon}
// // // // // // //                 <span className="text-[10px] md:text-[20px] font-medium">
// // // // // // //                   {link.label}
// // // // // // //                 </span>
// // // // // // //               </button>
// // // // // // //             ))}
// // // // // // //           </div>

// // // // // // //           {canScrollRight && (
// // // // // // //             <button
// // // // // // //               onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
// // // // // // //               className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50 transition-colors md:block hidden"
// // // // // // //               aria-label="Scroll right"
// // // // // // //             >
// // // // // // //               <NextIcon />
// // // // // // //             </button>
// // // // // // //           )}
// // // // // // //         </div>

// // // // // // //         {!isPaymentShare && (
// // // // // // //           <>
// // // // // // //             <CopyField value={referralLink || ""} />
// // // // // // //             <div className="mt-6 text-sm text-gray-600 text-center">
// // // // // // //               <p className="mb-3 font-medium">Download from official stores:</p>
// // // // // // //               <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
// // // // // // //                 <a href={iosAppReferralLink || "#"} target="_blank" rel="noopener noreferrer" className={appleClassName}>
// // // // // // //                   <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
// // // // // // //                     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
// // // // // // //                   </svg>
// // // // // // //                   App Store
// // // // // // //                 </a>
// // // // // // //                 <a href={androidAppReferralLink || "#"} target="_blank" rel="noopener noreferrer" className={googleClassName}>
// // // // // // //                   <img src={PlayStore} alt="Play Store" width="16" height="15" style={{ marginRight: "10px" }} />
// // // // // // //                   Google Play
// // // // // // //                 </a>
// // // // // // //               </div>
// // // // // // //               <p className="mt-4 text-sm text-gray-600">
// // // // // // //                 {(!deviceType || (deviceType !== "ios" && deviceType !== "android")) && "Select your platform above"}
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //           </>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </BaseModal>
// // // // // // //   );
// // // // // // // };




// // // // // // //////

// // // // // // // import React, { useRef, useState, useEffect } from "react";
// // // // // // // import { BaseModal } from "./base-modal";
// // // // // // // import { CopyField } from "../copy-link-field";
// // // // // // // import { shareLinks } from "../../../utils/static";
// // // // // // // import { NextIcon } from "../../../assets/svgs/components/next-icon";
// // // // // // // import { useSelector } from "react-redux";
// // // // // // // import PlayStore from "../../../assets/pngs/PlayStore.png";
// // // // // // // import Fb from "../../../assets/pngs/Fb.png";
// // // // // // // import Embed from "../../../assets/pngs/Embed.png";
// // // // // // // import ChevronRight from "../../../assets/pngs/ChevronRight.png";

// // // // // // // export const ShareModal = ({ onClose }) => {
// // // // // // //   const scrollRef = useRef(null);
// // // // // // //   const [canScrollLeft, setCanScrollLeft] = useState(false);
// // // // // // //   const [canScrollRight, setCanScrollRight] = useState(true);

// // // // // // //   const modalData = useSelector((state) => state.global.modal?.data) || {};

// // // // // // //   const {
// // // // // // //     deviceType,
// // // // // // //     androidAppReferralLink,
// // // // // // //     iosAppReferralLink,
// // // // // // //     reqSentDate,
// // // // // // //     points,
// // // // // // //     paymentMethod,
// // // // // // //     reqApprovedDate,
// // // // // // //     paymentDate,
// // // // // // //     status,
// // // // // // //     imageBlob,
// // // // // // //   } = modalData;

// // // // // // //   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);

// // // // // // //   const referralLink =
// // // // // // //     deviceType?.toLowerCase() === "ios"
// // // // // // //       ? iosAppReferralLink
// // // // // // //       : androidAppReferralLink;

// // // // // // //   const handlePlatformClick = async (link) => {
// // // // // // //     if (isPaymentShare) {
// // // // // // //       await sharePaymentImage(link.label);
// // // // // // //     } else {
// // // // // // //       const url = getReferralShareUrl(link.label);
// // // // // // //       if (url && url !== "#") window.open(url, "_blank");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const sharePaymentImage = async (platform) => {
// // // // // // //     if (imageBlob) {
// // // // // // //       const file = new File([imageBlob], "payment_details.png", {
// // // // // // //         type: "image/png",
// // // // // // //       });
// // // // // // //       if (
// // // // // // //         navigator.share &&
// // // // // // //         navigator.canShare &&
// // // // // // //         navigator.canShare({ files: [file] })
// // // // // // //       ) {
// // // // // // //         try {
// // // // // // //           await navigator.share({ title: "Payment Details", files: [file] });
// // // // // // //           return;
// // // // // // //         } catch (err) {
// // // // // // //           if (err.name === "AbortError") return;
// // // // // // //         }
// // // // // // //       }
// // // // // // //       const blobUrl = URL.createObjectURL(imageBlob);
// // // // // // //       window.open(blobUrl, "_blank");
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     const text = buildPaymentText();
// // // // // // //     const url = getShareUrl(platform, text);
// // // // // // //     if (url && url !== "#") window.open(url, "_blank");
// // // // // // //   };

// // // // // // //   const buildPaymentText = () =>
// // // // // // //     `Payment Details\n` +
// // // // // // //     `───────────────\n` +
// // // // // // //     `Request Sent     : ${reqSentDate ?? "N/A"}\n` +
// // // // // // //     `Points Redeemed  : ${points ?? "0"}\n` +
// // // // // // //     `Request Approved : ${reqApprovedDate ?? "N/A"}\n` +
// // // // // // //     `Payment Method   : ${paymentMethod ?? "N/A"}\n` +
// // // // // // //     `Payment Date     : ${paymentDate ?? "N/A"}\n` +
// // // // // // //     `Status           : ${status ?? "Pending"}`;

// // // // // // //   const getShareUrl = (label, text) => {
// // // // // // //     const encodedText = encodeURIComponent(text);
// // // // // // //     const appUrl = encodeURIComponent("https://famocare.com");
// // // // // // //     switch (label) {
// // // // // // //       case "Facebook":  return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
// // // // // // //       case "Twitter":   return `https://twitter.com/intent/tweet?text=${encodedText}`;
// // // // // // //       case "WhatsApp":  return `https://wa.me/?text=${encodedText}`;
// // // // // // //       case "Telegram":  return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
// // // // // // //       case "Reddit":    return `https://www.reddit.com/submit?title=${encodedText}`;
// // // // // // //       case "Tumblr":    return `https://www.tumblr.com/share/link?description=${encodedText}`;
// // // // // // //       case "Blogger":   return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
// // // // // // //       case "Instagram": return "https://www.instagram.com/";
// // // // // // //       default:          return "#";
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getReferralShareUrl = (label) => {
// // // // // // //     const encoded = encodeURIComponent(referralLink || "");
// // // // // // //     const text = encodeURIComponent("Join Famocare using my referral link!");
// // // // // // //     switch (label) {
// // // // // // //       case "Facebook":  return "https://www.facebook.com/sharer/sharer.php?u=" + encoded;
// // // // // // //       case "Twitter":   return "https://twitter.com/intent/tweet?url=" + encoded + "&text=" + text;
// // // // // // //       case "WhatsApp":  return "https://wa.me/?text=" + encodeURIComponent("Join Famocare: " + (referralLink || ""));
// // // // // // //       case "Telegram":  return "https://t.me/share/url?url=" + encoded + "&text=" + text;
// // // // // // //       case "Reddit":    return "https://www.reddit.com/submit?url=" + encoded + "&title=Join+Famocare";
// // // // // // //       case "Tumblr":    return "https://www.tumblr.com/share/link?url=" + encoded;
// // // // // // //       case "Blogger":   return "https://www.blogger.com/blog-this.g?u=" + encoded;
// // // // // // //       case "Instagram": return "https://www.instagram.com/";
// // // // // // //       default:          return referralLink || "#";
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const checkScroll = () => {
// // // // // // //     if (scrollRef.current) {
// // // // // // //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
// // // // // // //       setCanScrollLeft(scrollLeft > 0);
// // // // // // //       setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     const el = scrollRef.current;
// // // // // // //     if (el) {
// // // // // // //       checkScroll();
// // // // // // //       el.addEventListener("scroll", checkScroll);
// // // // // // //       return () => el.removeEventListener("scroll", checkScroll);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   // Sized to match your existing shareLinks icons exactly
// // // // // // //   const extraLinks = [
// // // // // // //     {
// // // // // // //       label: "Facebook",
// // // // // // //       icon: (
// // // // // // //         <img
// // // // // // //           src={Fb}
// // // // // // //           alt="Facebook"
// // // // // // //           className="w-[90px] h-[90px] object-contain"
// // // // // // //         />
// // // // // // //       ),
// // // // // // //       onClick: () => handlePlatformClick({ label: "Facebook" }),
// // // // // // //     },
// // // // // // //     {
// // // // // // //       label: "Embed",
// // // // // // //       icon: (
// // // // // // //         <img
// // // // // // //           src={Embed}
// // // // // // //           alt="Embed"
// // // // // // //           className="w-[90px] h-[90px] object-contain"
// // // // // // //         />
// // // // // // //       ),
// // // // // // //       onClick: () => handlePlatformClick({ label: "Embed" }),
// // // // // // //     },
// // // // // // //   ];

// // // // // // //   const allLinks = [...(shareLinks || []), ...extraLinks];

// // // // // // //   const appleClassName =
// // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // //     (deviceType === "ios"
// // // // // // //       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
// // // // // // //       : "bg-gray-800 text-white hover:bg-gray-900");

// // // // // // //   const googleClassName =
// // // // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // // // //     (deviceType === "android"
// // // // // // //       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
// // // // // // //       : "bg-green-700 text-white hover:bg-green-800");

// // // // // // //   return (
// // // // // // //     <BaseModal
// // // // // // //       onClose={onClose}
// // // // // // //       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
// // // // // // //     >
// // // // // // //       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">
// // // // // // //         <p className="text-lg text-[#055860] md:text-[36px] font-semibold mb-[22px]">
// // // // // // //           {isPaymentShare ? "Share Payment Details" : "Share Referral Link"}
// // // // // // //         </p>

// // // // // // //         <div className="relative">
// // // // // // //           {canScrollLeft && (
// // // // // // //             <button
// // // // // // //               onClick={() =>
// // // // // // //                 scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" })
// // // // // // //               }
// // // // // // //               className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50 transition-colors md:block hidden"
// // // // // // //               aria-label="Scroll left"
// // // // // // //             >
// // // // // // //               <img
// // // // // // //                 src={ChevronRight}
// // // // // // //                 alt="scroll left"
// // // // // // //                 className="w-10 h-10 md:w-5 md:h-5 rotate-180"
// // // // // // //               />
// // // // // // //             </button>
// // // // // // //           )}

// // // // // // //           <div
// // // // // // //             ref={scrollRef}
// // // // // // //             className="flex gap-5 justify-start md:justify-center md:gap-x-6 flex-nowrap overflow-x-auto no-scrollbar my-5 md:mt-[22px] md:mb-[47px] scroll-smooth"
// // // // // // //             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
// // // // // // //           >
// // // // // // //             {allLinks?.map((link) => (
// // // // // // //               <button
// // // // // // //                 key={link.label}
// // // // // // //                 onClick={() =>
// // // // // // //                   link.onClick ? link.onClick() : handlePlatformClick(link)
// // // // // // //                 }
// // // // // // //                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
// // // // // // //                 title={link.label}
// // // // // // //               >
// // // // // // //                 {link.icon}
// // // // // // //                 <span className="text-[10px] md:text-[20px] font-medium">
// // // // // // //                   {link.label}
// // // // // // //                 </span>
// // // // // // //               </button>
// // // // // // //             ))}
// // // // // // //           </div>

// // // // // // //           {canScrollRight && (
// // // // // // //             <button
// // // // // // //               onClick={() =>
// // // // // // //                 scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })
// // // // // // //               }
// // // // // // //               className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50 transition-colors md:block hidden"
// // // // // // //               aria-label="Scroll right"
// // // // // // //             >
// // // // // // //               <img
// // // // // // //                 src={ChevronRight}
// // // // // // //                 alt="scroll right"
// // // // // // //                 className="w-4 h-4 md:w-5 md:h-5"
// // // // // // //               />
// // // // // // //             </button>
// // // // // // //           )}
// // // // // // //         </div>

// // // // // // //         {!isPaymentShare && (
// // // // // // //           <>
// // // // // // //             <CopyField value={referralLink || ""} />
// // // // // // //             <div className="mt-6 text-sm text-gray-600 text-center">
// // // // // // //               <p className="mb-3 font-medium">Download from official stores:</p>
// // // // // // //               <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
// // // // // // //                 <a
// // // // // // //                   href={iosAppReferralLink || "#"}
// // // // // // //                   target="_blank"
// // // // // // //                   rel="noopener noreferrer"
// // // // // // //                   className={appleClassName}
// // // // // // //                 >
// // // // // // //                   <svg
// // // // // // //                     className="w-5 h-5 mr-2 flex-shrink-0"
// // // // // // //                     viewBox="0 0 24 24"
// // // // // // //                     fill="currentColor"
// // // // // // //                   >
// // // // // // //                     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
// // // // // // //                   </svg>
// // // // // // //                   App Store
// // // // // // //                 </a>
// // // // // // //                 <a
// // // // // // //                   href={androidAppReferralLink || "#"}
// // // // // // //                   target="_blank"
// // // // // // //                   rel="noopener noreferrer"
// // // // // // //                   className={googleClassName}
// // // // // // //                 >
// // // // // // //                   <img
// // // // // // //                     src={PlayStore}
// // // // // // //                     alt="Play Store"
// // // // // // //                     width="16"
// // // // // // //                     height="15"
// // // // // // //                     style={{ marginRight: "10px" }}
// // // // // // //                   />
// // // // // // //                   Google Play
// // // // // // //                 </a>
// // // // // // //               </div>
// // // // // // //               <p className="mt-4 text-sm text-gray-600">
// // // // // // //                 {(!deviceType ||
// // // // // // //                   (deviceType !== "ios" && deviceType !== "android")) &&
// // // // // // //                   "Select your platform above"}
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //           </>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </BaseModal>
// // // // // // //   );
// // // // // // // };




// // // // // import React, { useRef, useState, useEffect } from "react";
// // // // // import { BaseModal } from "./base-modal";
// // // // // import { CopyField } from "../copy-link-field";
// // // // // import { shareLinks } from "../../../utils/static";
// // // // // import { useSelector } from "react-redux";
// // // // // import PlayStore from "../../../assets/pngs/PlayStore.png";
// // // // // import Fb from "../../../assets/pngs/Fb.png";
// // // // // import ChevronRight from "../../../assets/pngs/ChevronRight.png";

// // // // // export const ShareModal = ({ onClose }) => {
// // // // //   const scrollRef = useRef(null);
// // // // //   const [canScrollRight, setCanScrollRight] = useState(true);

// // // // //   const modalData = useSelector((state) => state.global.modal?.data) || {};

// // // // //   const {
// // // // //     deviceType,
// // // // //     androidAppReferralLink,
// // // // //     iosAppReferralLink,
// // // // //     reqSentDate,
// // // // //     points,
// // // // //     paymentMethod,
// // // // //     reqApprovedDate,
// // // // //     paymentDate,
// // // // //     status,
// // // // //     imageBlob,
// // // // //   } = modalData;

// // // // //   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);

// // // // //   const referralLink =
// // // // //     deviceType?.toLowerCase() === "ios"
// // // // //       ? iosAppReferralLink
// // // // //       : androidAppReferralLink;

// // // // //   const handlePlatformClick = async (link) => {
// // // // //     if (isPaymentShare) {
// // // // //       await sharePaymentImage(link.label);
// // // // //     } else {
// // // // //       const url = getReferralShareUrl(link.label);
// // // // //       if (url && url !== "#") window.open(url, "_blank");
// // // // //     }
// // // // //   };

// // // // //   const sharePaymentImage = async (platform) => {
// // // // //     if (imageBlob) {
// // // // //       const file = new File([imageBlob], "payment_details.png", {
// // // // //         type: "image/png",
// // // // //       });
// // // // //       if (
// // // // //         navigator.share &&
// // // // //         navigator.canShare &&
// // // // //         navigator.canShare({ files: [file] })
// // // // //       ) {
// // // // //         try {
// // // // //           await navigator.share({ title: "Payment Details", files: [file] });
// // // // //           return;
// // // // //         } catch (err) {
// // // // //           if (err.name === "AbortError") return;
// // // // //         }
// // // // //       }
// // // // //       const blobUrl = URL.createObjectURL(imageBlob);
// // // // //       window.open(blobUrl, "_blank");
// // // // //       return;
// // // // //     }
// // // // //     const text = buildPaymentText();
// // // // //     const url = getShareUrl(platform, text);
// // // // //     if (url && url !== "#") window.open(url, "_blank");
// // // // //   };

// // // // //   const buildPaymentText = () =>
// // // // //     `Payment Details\n` +
// // // // //     `───────────────\n` +
// // // // //     `Request Sent     : ${reqSentDate ?? "N/A"}\n` +
// // // // //     `Points Redeemed  : ${points ?? "0"}\n` +
// // // // //     `Request Approved : ${reqApprovedDate ?? "N/A"}\n` +
// // // // //     `Payment Method   : ${paymentMethod ?? "N/A"}\n` +
// // // // //     `Payment Date     : ${paymentDate ?? "N/A"}\n` +
// // // // //     `Status           : ${status ?? "Pending"}`;

// // // // //   const getShareUrl = (label, text) => {
// // // // //     const encodedText = encodeURIComponent(text);
// // // // //     const appUrl = encodeURIComponent("https://famocare.com");
// // // // //     switch (label) {
// // // // //       case "Facebook":
// // // // //         return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
// // // // //       case "Twitter":
// // // // //         return `https://twitter.com/intent/tweet?text=${encodedText}`;
// // // // //       case "WhatsApp":
// // // // //         return `https://wa.me/?text=${encodedText}`;
// // // // //       case "Telegram":
// // // // //         return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
// // // // //       case "Reddit":
// // // // //         return `https://www.reddit.com/submit?title=${encodedText}`;
// // // // //       case "Tumblr":
// // // // //         return `https://www.tumblr.com/share/link?description=${encodedText}`;
// // // // //       case "Blogger":
// // // // //         return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
// // // // //       case "Instagram":
// // // // //         return "https://www.instagram.com/";
// // // // //       default:
// // // // //         return "#";
// // // // //     }
// // // // //   };

// // // // //   const getReferralShareUrl = (label) => {
// // // // //     const encoded = encodeURIComponent(referralLink || "");
// // // // //     const text = encodeURIComponent("Join Famocare using my referral link!");
// // // // //     switch (label) {
// // // // //       case "Facebook":
// // // // //         return "https://www.facebook.com/sharer/sharer.php?u=" + encoded;
// // // // //       case "Twitter":
// // // // //         return (
// // // // //           "https://twitter.com/intent/tweet?url=" + encoded + "&text=" + text
// // // // //         );
// // // // //       case "WhatsApp":
// // // // //         return (
// // // // //           "https://wa.me/?text=" +
// // // // //           encodeURIComponent("Join Famocare: " + (referralLink || ""))
// // // // //         );
// // // // //       case "Telegram":
// // // // //         return "https://t.me/share/url?url=" + encoded + "&text=" + text;
// // // // //       case "Reddit":
// // // // //         return (
// // // // //           "https://www.reddit.com/submit?url=" +
// // // // //           encoded +
// // // // //           "&title=Join+Famocare"
// // // // //         );
// // // // //       case "Tumblr":
// // // // //         return "https://www.tumblr.com/share/link?url=" + encoded;
// // // // //       case "Blogger":
// // // // //         return "https://www.blogger.com/blog-this.g?u=" + encoded;
// // // // //       case "Instagram":
// // // // //         return "https://www.instagram.com/";
// // // // //       default:
// // // // //         return referralLink || "#";
// // // // //     }
// // // // //   };

// // // // //   const checkScroll = () => {
// // // // //     if (scrollRef.current) {
// // // // //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
// // // // //       setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     const el = scrollRef.current;
// // // // //     if (el) {
// // // // //       checkScroll();
// // // // //       el.addEventListener("scroll", checkScroll);
// // // // //       return () => el.removeEventListener("scroll", checkScroll);
// // // // //     }
// // // // //   }, []);

// // // // //   // Remove Facebook from shareLinks if it already exists to avoid duplicates,
// // // // //   // then put our Facebook first
// // // // //   const filteredShareLinks = (shareLinks || []).filter(
// // // // //     (link) => link.label?.toLowerCase() !== "facebook"
// // // // //   );

// // // // //   const facebookLink = {
// // // // //     label: "Facebook",
// // // // //     icon: (
// // // // //       <img
// // // // //         src={Fb}
// // // // //         alt="Facebook"
// // // // //         className="w-[90px] h-[90px] object-contain"
// // // // //       />
// // // // //     ),
// // // // //     onClick: () => handlePlatformClick({ label: "Facebook" }),
// // // // //   };

// // // // //   const allLinks = [facebookLink, ...filteredShareLinks];

// // // // //   const appleClassName =
// // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // //     (deviceType === "ios"
// // // // //       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
// // // // //       : "bg-gray-800 text-white hover:bg-gray-900");

// // // // //   const googleClassName =
// // // // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // // // //     (deviceType === "android"
// // // // //       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
// // // // //       : "bg-green-700 text-white hover:bg-green-800");

// // // // //   return (
// // // // //     <BaseModal
// // // // //       onClose={onClose}
// // // // //       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
// // // // //     >
// // // // //       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">
// // // // //         <p className="text-lg text-[#000000] md:text-[36px] font-semibold mb-[22px]">
// // // // //           {isPaymentShare ? "Share Payment Details" : "Share Referral Link"}
// // // // //         </p>

// // // // //         {/* Icons row — chevron sits on the RIGHT edge only, like the screenshot */}
// // // // //         <div className="relative my-5 md:mt-[22px] md:mb-[47px]">
// // // // //           {/* Scrollable icons */}
// // // // //           <div
// // // // //             ref={scrollRef}
// // // // //             className="flex gap-5 md:gap-x-6 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth"
// // // // //             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
// // // // //           >
// // // // //             {allLinks?.map((link) => (
// // // // //               <button
// // // // //                 key={link.label}
// // // // //                 onClick={() =>
// // // // //                   link.onClick ? link.onClick() : handlePlatformClick(link)
// // // // //                 }
// // // // //                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
// // // // //                 title={link.label}
// // // // //               >
// // // // //                 {link.icon}
// // // // //                 <span className="text-[10px] md:text-[20px] font-medium">
// // // // //                   {link.label}
// // // // //                 </span>
// // // // //               </button>
// // // // //             ))}
// // // // //           </div>

// // // // //           {/* Right chevron — absolutely positioned on right edge, vertically centered */}
// // // // //           {canScrollRight && (
// // // // //             <button
// // // // //               onClick={() =>
// // // // //                 scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })
// // // // //               }
// // // // //               className="absolute right-0 top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center rounded-full transition-colors"
// // // // //               aria-label="Scroll right"
// // // // //             >
// // // // //               <img
// // // // //                 src={ChevronRight}
// // // // //                 alt="scroll right"
// // // // //                 className="w-[45px] h-[45px]"
// // // // //               />
// // // // //             </button>
// // // // //           )}
// // // // //         </div>

// // // // //         {!isPaymentShare && (
// // // // //           <>
// // // // //             <CopyField value={referralLink || ""} />
// // // // //             <div className="mt-6 text-sm text-gray-600 text-center">
// // // // //               <p className="mb-3 font-medium">Download from official stores:</p>
// // // // //               <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
// // // // //                 <a
// // // // //                   href={iosAppReferralLink || "#"}
// // // // //                   target="_blank"
// // // // //                   rel="noopener noreferrer"
// // // // //                   className={appleClassName}
// // // // //                 >
// // // // //                   <svg
// // // // //                     className="w-5 h-5 mr-2 flex-shrink-0"
// // // // //                     viewBox="0 0 24 24"
// // // // //                     fill="currentColor"
// // // // //                   >
// // // // //                     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
// // // // //                   </svg>
// // // // //                   App Store
// // // // //                 </a>
// // // // //                 <a
// // // // //                   href={androidAppReferralLink || "#"}
// // // // //                   target="_blank"
// // // // //                   rel="noopener noreferrer"
// // // // //                   className={googleClassName}
// // // // //                 >
// // // // //                   <img
// // // // //                     src={PlayStore}
// // // // //                     alt="Play Store"
// // // // //                     width="16"
// // // // //                     height="15"
// // // // //                     style={{ marginRight: "10px" }}
// // // // //                   />
// // // // //                   Google Play
// // // // //                 </a>
// // // // //               </div>
// // // // //               <p className="mt-4 text-sm text-gray-600">
// // // // //                 {(!deviceType ||
// // // // //                   (deviceType !== "ios" && deviceType !== "android")) &&
// // // // //                   "Select your platform above"}
// // // // //               </p>
// // // // //             </div>
// // // // //           </>
// // // // //         )}
// // // // //       </div>
// // // // //     </BaseModal>
// // // // //   );
// // // // // };




// // // // ////////



// // // import React, { useRef, useState, useEffect } from "react";
// // // import { BaseModal } from "./base-modal";
// // // import { CopyField } from "../copy-link-field";
// // // import { shareLinks } from "../../../utils/static";
// // // import { useSelector } from "react-redux";
// // // import PlayStore from "../../../assets/pngs/PlayStore.png";
// // // import Fb from "../../../assets/pngs/Fb.png";
// // // import ChevronRight from "../../../assets/pngs/ChevronRight.png";

// // // export const ShareModal = ({ onClose }) => {
// // //   const scrollRef = useRef(null);
// // //   const [canScrollRight, setCanScrollRight] = useState(true);

// // //   const modalData = useSelector((state) => state.global.modal?.data) || {};

// // //   const {
// // //     deviceType,
// // //     androidAppReferralLink,
// // //     iosAppReferralLink,
// // //     reqSentDate,
// // //     points,
// // //     paymentMethod,
// // //     reqApprovedDate,
// // //     paymentDate,
// // //     status,
// // //     imageBlob,
// // //   } = modalData;

// // //   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);

// // //   const referralLink =
// // //     deviceType?.toLowerCase() === "ios"
// // //       ? iosAppReferralLink
// // //       : androidAppReferralLink;

// // //   const handlePlatformClick = async (link) => {
// // //     if (isPaymentShare) {
// // //       await sharePaymentImage(link.label);
// // //     } else {
// // //       const url = getReferralShareUrl(link.label);
// // //       if (url && url !== "#") window.open(url, "_blank");
// // //     }
// // //   };

// // //   const sharePaymentImage = async (platform) => {
// // //     if (imageBlob) {
// // //       const file = new File([imageBlob], "payment_details.png", {
// // //         type: "image/png",
// // //       });

// // //       if (
// // //         navigator.share &&
// // //         navigator.canShare &&
// // //         navigator.canShare({ files: [file] })
// // //       ) {
// // //         try {
// // //           await navigator.share({ title: "Payment Details", files: [file] });
// // //           return;
// // //         } catch (err) {
// // //           if (err.name === "AbortError") return;
// // //         }
// // //       }

// // //       const blobUrl = URL.createObjectURL(imageBlob);
// // //       const downloadLink = document.createElement("a");
// // //       downloadLink.href = blobUrl;
// // //       downloadLink.download = "payment_details.png";
// // //       document.body.appendChild(downloadLink);
// // //       downloadLink.click();
// // //       document.body.removeChild(downloadLink);

// // //       setTimeout(() => {
// // //         const fallbackText = encodeURIComponent(
// // //           "Here are my payment details (see the downloaded image)."
// // //         );
// // //         let platformUrl = "#";
// // //         switch (platform) {
// // //           case "WhatsApp":
// // //             platformUrl = "https://wa.me/?text=" + fallbackText;
// // //             break;
// // //           case "Telegram":
// // //             platformUrl = "https://t.me/share/url?url=https://famocare.com&text=" + fallbackText;
// // //             break;
// // //           case "Twitter":
// // //             platformUrl = "https://twitter.com/intent/tweet?text=" + fallbackText;
// // //             break;
// // //           case "Facebook":
// // //             platformUrl = "https://www.facebook.com/sharer/sharer.php?quote=" + fallbackText + "&u=" + encodeURIComponent("https://famocare.com");
// // //             break;
// // //           case "Reddit":
// // //             platformUrl = "https://www.reddit.com/submit?title=" + fallbackText;
// // //             break;
// // //           case "Tumblr":
// // //             platformUrl = "https://www.tumblr.com/share/link?description=" + fallbackText;
// // //             break;
// // //           case "Blogger":
// // //             platformUrl = "https://www.blogger.com/blog-this.g?n=" + fallbackText;
// // //             break;
// // //           case "Instagram":
// // //             platformUrl = "https://www.instagram.com/";
// // //             break;
// // //           default:
// // //             platformUrl = "#";
// // //         }
// // //         if (platformUrl !== "#") window.open(platformUrl, "_blank");
// // //         URL.revokeObjectURL(blobUrl);
// // //       }, 500);

// // //       return;
// // //     }

// // //     const text = buildPaymentText();
// // //     const url = getShareUrl(platform, text);
// // //     if (url && url !== "#") window.open(url, "_blank");
// // //   };

// // //   const buildPaymentText = () =>
// // //     "Payment Details\n" +
// // //     "───────────────\n" +
// // //     "Request Sent     : " + (reqSentDate ?? "N/A") + "\n" +
// // //     "Points Redeemed  : " + (points ?? "0") + "\n" +
// // //     "Request Approved : " + (reqApprovedDate ?? "N/A") + "\n" +
// // //     "Payment Method   : " + (paymentMethod ?? "N/A") + "\n" +
// // //     "Payment Date     : " + (paymentDate ?? "N/A") + "\n" +
// // //     "Status           : " + (status ?? "Pending");

// // //   const getShareUrl = (label, text) => {
// // //     const encodedText = encodeURIComponent(text);
// // //     const appUrl = encodeURIComponent("https://famocare.com");
// // //     switch (label) {
// // //       case "Facebook":
// // //         return "https://www.facebook.com/sharer/sharer.php?quote=" + encodedText + "&u=" + appUrl;
// // //       case "Twitter":
// // //         return "https://twitter.com/intent/tweet?text=" + encodedText;
// // //       case "WhatsApp":
// // //         return "https://wa.me/?text=" + encodedText;
// // //       case "Telegram":
// // //         return "https://t.me/share/url?url=" + appUrl + "&text=" + encodedText;
// // //       case "Reddit":
// // //         return "https://www.reddit.com/submit?title=" + encodedText;
// // //       case "Tumblr":
// // //         return "https://www.tumblr.com/share/link?description=" + encodedText;
// // //       case "Blogger":
// // //         return "https://www.blogger.com/blog-this.g?n=" + encodedText;
// // //       case "Instagram":
// // //         return "https://www.instagram.com/";
// // //       default:
// // //         return "#";
// // //     }
// // //   };

// // //   const getReferralShareUrl = (label) => {
// // //     const encoded = encodeURIComponent(referralLink || "");
// // //     const text = encodeURIComponent("Join Famocare using my referral link!");
// // //     switch (label) {
// // //       case "Facebook":
// // //         return "https://www.facebook.com/sharer/sharer.php?u=" + encoded;
// // //       case "Twitter":
// // //         return "https://twitter.com/intent/tweet?url=" + encoded + "&text=" + text;
// // //       case "WhatsApp":
// // //         return "https://wa.me/?text=" + encodeURIComponent("Join Famocare: " + (referralLink || ""));
// // //       case "Telegram":
// // //         return "https://t.me/share/url?url=" + encoded + "&text=" + text;
// // //       case "Reddit":
// // //         return "https://www.reddit.com/submit?url=" + encoded + "&title=Join+Famocare";
// // //       case "Tumblr":
// // //         return "https://www.tumblr.com/share/link?url=" + encoded;
// // //       case "Blogger":
// // //         return "https://www.blogger.com/blog-this.g?u=" + encoded;
// // //       case "Instagram":
// // //         return "https://www.instagram.com/";
// // //       default:
// // //         return referralLink || "#";
// // //     }
// // //   };

// // //   const checkScroll = () => {
// // //     if (scrollRef.current) {
// // //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
// // //       setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const el = scrollRef.current;
// // //     if (el) {
// // //       checkScroll();
// // //       el.addEventListener("scroll", checkScroll);
// // //       return () => el.removeEventListener("scroll", checkScroll);
// // //     }
// // //   }, []);

// // //   const filteredShareLinks = (shareLinks || []).filter(
// // //     (link) => link.label?.toLowerCase() !== "facebook"
// // //   );

// // //   const facebookLink = {
// // //     label: "Facebook",
// // //     icon: (
// // //       <img
// // //         src={Fb}
// // //         alt="Facebook"
// // //         className="w-[90px] h-[90px] object-contain"
// // //       />
// // //     ),
// // //     onClick: () => handlePlatformClick({ label: "Facebook" }),
// // //   };

// // //   const allLinks = [facebookLink, ...filteredShareLinks];

// // //   const appleClassName =
// // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // //     (deviceType === "ios"
// // //       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
// // //       : "bg-gray-800 text-white hover:bg-gray-900");

// // //   const googleClassName =
// // //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// // //     (deviceType === "android"
// // //       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
// // //       : "bg-green-700 text-white hover:bg-green-800");

// // //   return (
// // //     <BaseModal
// // //       onClose={onClose}
// // //       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
// // //     >
// // //       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">
// // //         <p className="text-lg text-[#000000] md:text-[36px] font-semibold mb-[22px]">
// // //           {isPaymentShare ? "Share Payment Details" : "Share Referral Link"}
// // //         </p>

// // //         <div className="relative my-5 md:mt-[22px] md:mb-[47px]">
// // //           <div
// // //             ref={scrollRef}
// // //             className="flex gap-5 md:gap-x-6 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth"
// // //             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
// // //           >
// // //             {allLinks.map((link) => (
// // //               <button
// // //                 key={link.label}
// // //                 onClick={() =>
// // //                   link.onClick ? link.onClick() : handlePlatformClick(link)
// // //                 }
// // //                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
// // //                 title={link.label}
// // //               >
// // //                 {link.icon}
// // //                 <span className="text-[10px] md:text-[20px] font-medium">
// // //                   {link.label}
// // //                 </span>
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {canScrollRight && (
// // //             <button
// // //               onClick={() =>
// // //                 scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })
// // //               }
// // //               className="absolute right-0 top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center rounded-full transition-colors"
// // //               aria-label="Scroll right"
// // //             >
// // //               <img
// // //                 src={ChevronRight}
// // //                 alt="scroll right"
// // //                 className="w-[45px] h-[45px]"
// // //               />
// // //             </button>
// // //           )}
// // //         </div>

// // //         {!isPaymentShare && (
// // //           <div>
// // //             <CopyField value={referralLink || ""} />
// // //             <div className="mt-6 text-sm text-gray-600 text-center">
// // //               <p className="mb-3 font-medium">Download from official stores:</p>
// // //               <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
                
// // //                   href={iosAppReferralLink || "#"}
// // //                   target="_blank"
// // //                   rel="noopener noreferrer"
// // //                   className={appleClassName}
// // //                 >
// // //                   <svg
// // //                     className="w-5 h-5 mr-2 flex-shrink-0"
// // //                     viewBox="0 0 24 24"
// // //                     fill="currentColor"
// // //                   >
// // //                     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
// // //                   </svg>
// // //                   App Store
// // //                 {/* </a> */}
                
// // //                   href={androidAppReferralLink || "#"}
// // //                   target="_blank"
// // //                   rel="noopener noreferrer"
// // //                   className={googleClassName}
// // //                 >
// // //                   <img
// // //                     src={PlayStore}
// // //                     alt="Play Store"
// // //                     width="16"
// // //                     height="15"
// // //                     style={{ marginRight: "10px" }}
// // //                   />
// // //                   Google Play
// // //                 {/* </a> */}
// // //               </div>
// // //                <p className="mt-4 text-sm text-gray-600">
// // //                 {(!deviceType ||
// // //                   (deviceType !== "ios" && deviceType !== "android")) &&
// // //                   "Select your platform above"
// // //                   }
// // //               </p> 
// // //             </div>
// // //            </div>
// // //         )}
// // //       </div>
// // //     </BaseModal>
// // //   );
// // // };






// // import React, { useRef, useState, useEffect } from "react";
// // import { BaseModal } from "./base-modal";
// // import { CopyField } from "../copy-link-field";
// // import { shareLinks } from "../../../utils/static";
// // import { useSelector } from "react-redux";
// // import PlayStore from "../../../assets/pngs/PlayStore.png";
// // import Fb from "../../../assets/pngs/Fb.png";
// // import ChevronRight from "../../../assets/pngs/ChevronRight.png";

// // const REFERRAL_BASE_URL = "https://referral.famocare.com/";

// // export const ShareModal = ({ onClose }) => {
// //   const scrollRef = useRef(null);
// //   const [canScrollRight, setCanScrollRight] = useState(true);
// //   const [couponCopied, setCouponCopied] = useState(false);

// //   const modalData = useSelector((state) => state.global.modal?.data) || {};

// //   const {
// //     deviceType,
// //     androidAppReferralLink,
// //     iosAppReferralLink,
// //     reqSentDate,
// //     points,
// //     paymentMethod,
// //     reqApprovedDate,
// //     paymentDate,
// //     status,
// //     imageBlob,
// //     couponCode,
// //     isCouponRedeemed,
// //   } = modalData;

// //   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);
// //   const isCouponShare = Boolean(isCouponRedeemed && couponCode);

// //   // Determine share mode title
// //   const modalTitle = isCouponShare
// //     ? "Share Coupon Code"
// //     : isPaymentShare
// //     ? "Share Payment Details"
// //     : "Share Referral Link";

// //   // Build referral link using base URL + device-specific path
// //   const referralLink =
// //     deviceType?.toLowerCase() === "ios"
// //       ? iosAppReferralLink || REFERRAL_BASE_URL
// //       : androidAppReferralLink || REFERRAL_BASE_URL;

// //   const handlePlatformClick = async (link) => {
// //     if (isCouponShare) {
// //       const url = getCouponShareUrl(link.label);
// //       if (url && url !== "#") window.open(url, "_blank");
// //     } else if (isPaymentShare) {
// //       await sharePaymentImage(link.label);
// //     } else {
// //       const url = getReferralShareUrl(link.label);
// //       if (url && url !== "#") window.open(url, "_blank");
// //     }
// //   };

// //   // ── Coupon share URLs ──────────────────────────────────────────────────────
// //   const buildCouponText = () =>
// //     `🎉 Use my coupon code *${couponCode}* on Famocare and get exclusive rewards!\n` +
// //     `Download now: ${REFERRAL_BASE_URL}`;

// //   const getCouponShareUrl = (label) => {
// //     const encodedText = encodeURIComponent(buildCouponText());
// //     const appUrl = encodeURIComponent(REFERRAL_BASE_URL);
// //     switch (label) {
// //       case "Facebook":
// //         return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
// //       case "Twitter":
// //         return `https://twitter.com/intent/tweet?text=${encodedText}`;
// //       case "WhatsApp":
// //         return `https://wa.me/?text=${encodedText}`;
// //       case "Telegram":
// //         return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
// //       case "Reddit":
// //         return `https://www.reddit.com/submit?title=${encodedText}`;
// //       case "Tumblr":
// //         return `https://www.tumblr.com/share/link?description=${encodedText}`;
// //       case "Blogger":
// //         return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
// //       case "Instagram":
// //         return "https://www.instagram.com/";
// //       default:
// //         return "#";
// //     }
// //   };

// //   // ── Payment share logic ────────────────────────────────────────────────────
// //   const sharePaymentImage = async (platform) => {
// //     if (imageBlob) {
// //       const file = new File([imageBlob], "payment_details.png", {
// //         type: "image/png",
// //       });

// //       if (
// //         navigator.share &&
// //         navigator.canShare &&
// //         navigator.canShare({ files: [file] })
// //       ) {
// //         try {
// //           await navigator.share({ title: "Payment Details", files: [file] });
// //           return;
// //         } catch (err) {
// //           if (err.name === "AbortError") return;
// //         }
// //       }

// //       const blobUrl = URL.createObjectURL(imageBlob);
// //       const downloadLink = document.createElement("a");
// //       downloadLink.href = blobUrl;
// //       downloadLink.download = "payment_details.png";
// //       document.body.appendChild(downloadLink);
// //       downloadLink.click();
// //       document.body.removeChild(downloadLink);

// //       setTimeout(() => {
// //         const fallbackText = encodeURIComponent(
// //           "Here are my payment details (see the downloaded image)."
// //         );
// //         const url = getShareUrl(platform, decodeURIComponent(fallbackText));
// //         if (url && url !== "#") window.open(url, "_blank");
// //         URL.revokeObjectURL(blobUrl);
// //       }, 500);

// //       return;
// //     }

// //     const text = buildPaymentText();
// //     const url = getShareUrl(platform, text);
// //     if (url && url !== "#") window.open(url, "_blank");
// //   };

// //   const buildPaymentText = () =>
// //     "Payment Details\n" +
// //     "───────────────\n" +
// //     "Request Sent     : " + (reqSentDate ?? "N/A") + "\n" +
// //     "Points Redeemed  : " + (points ?? "0") + "\n" +
// //     "Request Approved : " + (reqApprovedDate ?? "N/A") + "\n" +
// //     "Payment Method   : " + (paymentMethod ?? "N/A") + "\n" +
// //     "Payment Date     : " + (paymentDate ?? "N/A") + "\n" +
// //     "Status           : " + (status ?? "Pending");

// //   const getShareUrl = (label, text) => {
// //     const encodedText = encodeURIComponent(text);
// //     const appUrl = encodeURIComponent(REFERRAL_BASE_URL);
// //     switch (label) {
// //       case "Facebook":
// //         return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
// //       case "Twitter":
// //         return `https://twitter.com/intent/tweet?text=${encodedText}`;
// //       case "WhatsApp":
// //         return `https://wa.me/?text=${encodedText}`;
// //       case "Telegram":
// //         return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
// //       case "Reddit":
// //         return `https://www.reddit.com/submit?title=${encodedText}`;
// //       case "Tumblr":
// //         return `https://www.tumblr.com/share/link?description=${encodedText}`;
// //       case "Blogger":
// //         return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
// //       case "Instagram":
// //         return "https://www.instagram.com/";
// //       default:
// //         return "#";
// //     }
// //   };

// //   // ── Referral share URLs ────────────────────────────────────────────────────
// //   const getReferralShareUrl = (label) => {
// //     const link = referralLink || REFERRAL_BASE_URL;
// //     const encoded = encodeURIComponent(link);
// //     const text = encodeURIComponent("Join Famocare using my referral link!");
// //     switch (label) {
// //       case "Facebook":
// //         return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
// //       case "Twitter":
// //         return `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`;
// //       case "WhatsApp":
// //         return `https://wa.me/?text=${encodeURIComponent("Join Famocare: " + link)}`;
// //       case "Telegram":
// //         return `https://t.me/share/url?url=${encoded}&text=${text}`;
// //       case "Reddit":
// //         return `https://www.reddit.com/submit?url=${encoded}&title=Join+Famocare`;
// //       case "Tumblr":
// //         return `https://www.tumblr.com/share/link?url=${encoded}`;
// //       case "Blogger":
// //         return `https://www.blogger.com/blog-this.g?u=${encoded}`;
// //       case "Instagram":
// //         return "https://www.instagram.com/";
// //       default:
// //         return link;
// //     }
// //   };

// //   // ── Coupon copy helper ─────────────────────────────────────────────────────
// //   const handleCopyCoupon = () => {
// //     if (!couponCode) return;
// //     navigator.clipboard.writeText(couponCode).then(() => {
// //       setCouponCopied(true);
// //       setTimeout(() => setCouponCopied(false), 2000);
// //     });
// //   };

// //   // ── Scroll detection ───────────────────────────────────────────────────────
// //   const checkScroll = () => {
// //     if (scrollRef.current) {
// //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
// //       setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
// //     }
// //   };

// //   useEffect(() => {
// //     const el = scrollRef.current;
// //     if (el) {
// //       checkScroll();
// //       el.addEventListener("scroll", checkScroll);
// //       return () => el.removeEventListener("scroll", checkScroll);
// //     }
// //   }, []);

// //   // ── Build link list ────────────────────────────────────────────────────────
// //   const filteredShareLinks = (shareLinks || []).filter(
// //     (link) => link.label?.toLowerCase() !== "facebook"
// //   );

// //   const facebookLink = {
// //     label: "Facebook",
// //     icon: (
// //       <img
// //         src={Fb}
// //         alt="Facebook"
// //         className="w-[90px] h-[90px] object-contain"
// //       />
// //     ),
// //     onClick: () => handlePlatformClick({ label: "Facebook" }),
// //   };

// //   const allLinks = [facebookLink, ...filteredShareLinks];

// //   // ── App store button classes ───────────────────────────────────────────────
// //   const appleClassName =
// //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// //     (deviceType === "ios"
// //       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
// //       : "bg-gray-800 text-white hover:bg-gray-900");

// //   const googleClassName =
// //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// //     (deviceType === "android"
// //       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
// //       : "bg-green-700 text-white hover:bg-green-800");

// //   return (
// //     <BaseModal
// //       onClose={onClose}
// //       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
// //     >
// //       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">
// //         {/* ── Title ── */}
// //         <p className="text-lg text-[#000000] md:text-[36px] font-semibold mb-[22px]">
// //           {modalTitle}
// //         </p>

// //         {/* ── Social platform icons ── */}
// //         <div className="relative my-5 md:mt-[22px] md:mb-[47px]">
// //           <div
// //             ref={scrollRef}
// //             className="flex gap-5 md:gap-x-6 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth"
// //             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
// //           >
// //             {allLinks.map((link) => (
// //               <button
// //                 key={link.label}
// //                 onClick={() =>
// //                   link.onClick ? link.onClick() : handlePlatformClick(link)
// //                 }
// //                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
// //                 title={link.label}
// //               >
// //                 {link.icon}
// //                 <span className="text-[10px] md:text-[20px] font-medium">
// //                   {link.label}
// //                 </span>
// //               </button>
// //             ))}
// //           </div>

// //           {canScrollRight && (
// //             <button
// //               onClick={() =>
// //                 scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })
// //               }
// //               className="absolute right-0 top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center rounded-full transition-colors"
// //               aria-label="Scroll right"
// //             >
// //               <img
// //                 src={ChevronRight}
// //                 alt="scroll right"
// //                 className="w-[45px] h-[45px]"
// //               />
// //             </button>
// //           )}
// //         </div>

// //         {/* ── Referral link + app store buttons ── */}
// //         {!isPaymentShare && !isCouponShare && (
// //           <div>
// //             <CopyField value={referralLink || REFERRAL_BASE_URL} />
// //             <div className="mt-6 text-sm text-gray-600 text-center">
// //               <p className="mb-3 font-medium">Download from official stores:</p>
// //               <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
// //                 <a
// //                   href={iosAppReferralLink || REFERRAL_BASE_URL}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className={appleClassName}
// //                 >
// //                   <svg
// //                     className="w-5 h-5 mr-2 flex-shrink-0"
// //                     viewBox="0 0 24 24"
// //                     fill="currentColor"
// //                   >
// //                     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
// //                   </svg>
// //                   App Store
// //                 </a>

// //                 <a
// //                   href={androidAppReferralLink || REFERRAL_BASE_URL}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className={googleClassName}
// //                 >
// //                   <img
// //                     src={PlayStore}
// //                     alt="Play Store"
// //                     width="16"
// //                     height="15"
// //                     style={{ marginRight: "10px" }}
// //                   />
// //                   Google Play
// //                 </a>
// //               </div>

// //               {(!deviceType ||
// //                 (deviceType !== "ios" && deviceType !== "android")) && (
// //                 <p className="mt-4 text-sm text-gray-600">
// //                   Select your platform above
// //                 </p>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* ── Coupon code section (shown when coupon is redeemed) ── */}
// //         {isCouponShare && couponCode && (
// //           <div className="mt-4">
// //             <p className="text-sm text-gray-500 mb-2 font-medium">
// //               Your Coupon Code
// //             </p>
// //             <div className="flex items-center gap-3 border border-dashed border-green-500 rounded-xl px-4 py-3 bg-green-50">
// //               {/* Coupon code display */}
// //               <span className="flex-1 text-center text-xl md:text-2xl font-bold tracking-widest text-green-700 select-all">
// //                 {couponCode}
// //               </span>

// //               {/* Copy button */}
// //               <button
// //                 onClick={handleCopyCoupon}
// //                 className="flex items-center gap-1 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 active:scale-95 transition-all whitespace-nowrap"
// //               >
// //                 {couponCopied ? (
// //                   <>
// //                     {/* Checkmark icon */}
// //                     <svg
// //                       className="w-4 h-4"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                       strokeWidth={2.5}
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         d="M5 13l4 4L19 7"
// //                       />
// //                     </svg>
// //                     Copied!
// //                   </>
// //                 ) : (
// //                   <>
// //                     {/* Copy icon */}
// //                     <svg
// //                       className="w-4 h-4"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                       strokeWidth={2}
// //                     >
// //                       <rect x="9" y="9" width="13" height="13" rx="2" />
// //                       <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
// //                     </svg>
// //                     Copy
// //                   </>
// //                 )}
// //               </button>
// //             </div>

// //             <p className="mt-3 text-xs text-gray-400 text-center">
// //               Share this code with friends so they can enjoy discounts on Famocare!
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     </BaseModal>
// //   );
// // };



// // import React, { useRef, useState, useEffect } from "react";
// // import { BaseModal } from "./base-modal";
// // import { CopyField } from "../copy-link-field";
// // import { shareLinks } from "../../../utils/static";
// // import { useSelector } from "react-redux";
// // import PlayStore from "../../../assets/pngs/PlayStore.png";
// // import Fb from "../../../assets/pngs/Fb.png";
// // import ChevronRight from "../../../assets/pngs/ChevronRight.png";

// // const REFERRAL_BASE_URL = "https://referral.famocare.com/";

// // export const ShareModal = ({ onClose }) => {
// //   const scrollRef = useRef(null);
// //   const [canScrollRight, setCanScrollRight] = useState(true);

// //   const modalData = useSelector((state) => state.global.modal?.data) || {};

// //   const {
// //     deviceType,
// //     androidAppReferralLink,
// //     iosAppReferralLink,
// //     reqSentDate,
// //     points,
// //     paymentMethod,
// //     reqApprovedDate,
// //     paymentDate,
// //     status,
// //     imageBlob,
// //     couponCode,
// //     isCouponRedeemed,
// //   } = modalData;

// //   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);
// //   const isCouponShare = Boolean(isCouponRedeemed && couponCode);

// //   // Determine share mode title
// //   const modalTitle = isCouponShare
// //     ? "Share Coupon Code"
// //     : isPaymentShare
// //     ? "Share Payment Details"
// //     : "Share Referral Link";

// //   // Build referral link using base URL + device-specific path
// //   const referralLink =
// //     deviceType?.toLowerCase() === "ios"
// //       ? iosAppReferralLink || REFERRAL_BASE_URL
// //       : androidAppReferralLink || REFERRAL_BASE_URL;

// //   const handlePlatformClick = async (link) => {
// //     if (isCouponShare) {
// //       const url = getCouponShareUrl(link.label);
// //       if (url && url !== "#") window.open(url, "_blank");
// //     } else if (isPaymentShare) {
// //       await sharePaymentImage(link.label);
// //     } else {
// //       const url = getReferralShareUrl(link.label);
// //       if (url && url !== "#") window.open(url, "_blank");
// //     }
// //   };

// //   // ── Coupon share URLs ──────────────────────────────────────────────────────
// //   const buildCouponText = () =>
// //     `🎉 Use my coupon code *${couponCode}* on Famocare and get exclusive rewards!\n` +
// //     `Download now: ${REFERRAL_BASE_URL}`;

// //   const getCouponShareUrl = (label) => {
// //     const encodedText = encodeURIComponent(buildCouponText());
// //     const appUrl = encodeURIComponent(REFERRAL_BASE_URL);
// //     switch (label) {
// //       case "Facebook":
// //         return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
// //       case "Twitter":
// //         return `https://twitter.com/intent/tweet?text=${encodedText}`;
// //       case "WhatsApp":
// //         return `https://wa.me/?text=${encodedText}`;
// //       case "Telegram":
// //         return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
// //       case "Reddit":
// //         return `https://www.reddit.com/submit?title=${encodedText}`;
// //       case "Tumblr":
// //         return `https://www.tumblr.com/share/link?description=${encodedText}`;
// //       case "Blogger":
// //         return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
// //       case "Instagram":
// //         return "https://www.instagram.com/";
// //       default:
// //         return "#";
// //     }
// //   };

// //   // ── Payment share logic ────────────────────────────────────────────────────
// //   const sharePaymentImage = async (platform) => {
// //     if (imageBlob) {
// //       const file = new File([imageBlob], "payment_details.png", {
// //         type: "image/png",
// //       });

// //       if (
// //         navigator.share &&
// //         navigator.canShare &&
// //         navigator.canShare({ files: [file] })
// //       ) {
// //         try {
// //           await navigator.share({ title: "Payment Details", files: [file] });
// //           return;
// //         } catch (err) {
// //           if (err.name === "AbortError") return;
// //         }
// //       }

// //       const blobUrl = URL.createObjectURL(imageBlob);
// //       const downloadLink = document.createElement("a");
// //       downloadLink.href = blobUrl;
// //       downloadLink.download = "payment_details.png";
// //       document.body.appendChild(downloadLink);
// //       downloadLink.click();
// //       document.body.removeChild(downloadLink);

// //       setTimeout(() => {
// //         const fallbackText = encodeURIComponent(
// //           "Here are my payment details (see the downloaded image)."
// //         );
// //         const url = getShareUrl(platform, decodeURIComponent(fallbackText));
// //         if (url && url !== "#") window.open(url, "_blank");
// //         URL.revokeObjectURL(blobUrl);
// //       }, 500);

// //       return;
// //     }

// //     const text = buildPaymentText();
// //     const url = getShareUrl(platform, text);
// //     if (url && url !== "#") window.open(url, "_blank");
// //   };

// //   const buildPaymentText = () =>
// //     "Payment Details\n" +
// //     "───────────────\n" +
// //     "Request Sent     : " + (reqSentDate ?? "N/A") + "\n" +
// //     "Points Redeemed  : " + (points ?? "0") + "\n" +
// //     "Request Approved : " + (reqApprovedDate ?? "N/A") + "\n" +
// //     "Payment Method   : " + (paymentMethod ?? "N/A") + "\n" +
// //     "Payment Date     : " + (paymentDate ?? "N/A") + "\n" +
// //     "Status           : " + (status ?? "Pending");

// //   const getShareUrl = (label, text) => {
// //     const encodedText = encodeURIComponent(text);
// //     const appUrl = encodeURIComponent(REFERRAL_BASE_URL);
// //     switch (label) {
// //       case "Facebook":
// //         return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
// //       case "Twitter":
// //         return `https://twitter.com/intent/tweet?text=${encodedText}`;
// //       case "WhatsApp":
// //         return `https://wa.me/?text=${encodedText}`;
// //       case "Telegram":
// //         return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
// //       case "Reddit":
// //         return `https://www.reddit.com/submit?title=${encodedText}`;
// //       case "Tumblr":
// //         return `https://www.tumblr.com/share/link?description=${encodedText}`;
// //       case "Blogger":
// //         return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
// //       case "Instagram":
// //         return "https://www.instagram.com/";
// //       default:
// //         return "#";
// //     }
// //   };

// //   // ── Referral share URLs ────────────────────────────────────────────────────
// //   const getReferralShareUrl = (label) => {
// //     const link = referralLink || REFERRAL_BASE_URL;
// //     const encoded = encodeURIComponent(link);
// //     const text = encodeURIComponent("Join Famocare using my referral link!");
// //     switch (label) {
// //       case "Facebook":
// //         return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
// //       case "Twitter":
// //         return `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`;
// //       case "WhatsApp":
// //         return `https://wa.me/?text=${encodeURIComponent("Join Famocare: " + link)}`;
// //       case "Telegram":
// //         return `https://t.me/share/url?url=${encoded}&text=${text}`;
// //       case "Reddit":
// //         return `https://www.reddit.com/submit?url=${encoded}&title=Join+Famocare`;
// //       case "Tumblr":
// //         return `https://www.tumblr.com/share/link?url=${encoded}`;
// //       case "Blogger":
// //         return `https://www.blogger.com/blog-this.g?u=${encoded}`;
// //       case "Instagram":
// //         return "https://www.instagram.com/";
// //       default:
// //         return link;
// //     }
// //   };

// //   // ── Scroll detection ───────────────────────────────────────────────────────
// //   const checkScroll = () => {
// //     if (scrollRef.current) {
// //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
// //       setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
// //     }
// //   };

// //   useEffect(() => {
// //     const el = scrollRef.current;
// //     if (el) {
// //       checkScroll();
// //       el.addEventListener("scroll", checkScroll);
// //       return () => el.removeEventListener("scroll", checkScroll);
// //     }
// //   }, []);

// //   // ── Build link list ────────────────────────────────────────────────────────
// //   const filteredShareLinks = (shareLinks || []).filter(
// //     (link) => link.label?.toLowerCase() !== "facebook"
// //   );

// //   const facebookLink = {
// //     label: "Facebook",
// //     icon: (
// //       <img
// //         src={Fb}
// //         alt="Facebook"
// //         className="w-[90px] h-[90px] object-contain"
// //       />
// //     ),
// //     onClick: () => handlePlatformClick({ label: "Facebook" }),
// //   };

// //   const allLinks = [facebookLink, ...filteredShareLinks];

// //   // ── App store button classes ───────────────────────────────────────────────
// //   const appleClassName =
// //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// //     (deviceType === "ios"
// //       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
// //       : "bg-gray-800 text-white hover:bg-gray-900");

// //   const googleClassName =
// //     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
// //     (deviceType === "android"
// //       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
// //       : "bg-green-700 text-white hover:bg-green-800");

// //   return (
// //     <BaseModal
// //       onClose={onClose}
// //       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
// //     >
// //       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">
// //         {/* ── Title ── */}
// //         <p className="text-lg text-[#000000] md:text-[36px] font-semibold mb-[22px]">
// //           {modalTitle}
// //         </p>

// //         {/* ── Social platform icons ── */}
// //         <div className="relative my-5 md:mt-[22px] md:mb-[47px]">
// //           <div
// //             ref={scrollRef}
// //             className="flex gap-5 md:gap-x-6 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth"
// //             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
// //           >
// //             {allLinks.map((link) => (
// //               <button
// //                 key={link.label}
// //                 onClick={() =>
// //                   link.onClick ? link.onClick() : handlePlatformClick(link)
// //                 }
// //                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
// //                 title={link.label}
// //               >
// //                 {link.icon}
// //                 <span className="text-[10px] md:text-[20px] font-medium">
// //                   {link.label}
// //                 </span>
// //               </button>
// //             ))}
// //           </div>

// //           {canScrollRight && (
// //             <button
// //               onClick={() =>
// //                 scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })
// //               }
// //               className="absolute right-0 top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center rounded-full transition-colors"
// //               aria-label="Scroll right"
// //             >
// //               <img
// //                 src={ChevronRight}
// //                 alt="scroll right"
// //                 className="w-[45px] h-[45px]"
// //               />
// //             </button>
// //           )}
// //         </div>

// //         {/* ── Referral link + app store buttons ── */}
// //         {!isPaymentShare && !isCouponShare && (
// //           <div>
// //             <CopyField value={referralLink || REFERRAL_BASE_URL} />
// //             <div className="mt-6 text-sm text-gray-600 text-center">
// //               <p className="mb-3 font-medium">Download from official stores:</p>
// //               <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
// //                 <a
// //                   href={iosAppReferralLink || REFERRAL_BASE_URL}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className={appleClassName}
// //                 >
// //                   <svg
// //                     className="w-5 h-5 mr-2 flex-shrink-0"
// //                     viewBox="0 0 24 24"
// //                     fill="currentColor"
// //                   >
// //                     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
// //                   </svg>
// //                   App Store
// //                 </a>

// //                 <a
// //                   href={androidAppReferralLink || REFERRAL_BASE_URL}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className={googleClassName}
// //                 >
// //                   <img
// //                     src={PlayStore}
// //                     alt="Play Store"
// //                     width="16"
// //                     height="15"
// //                     style={{ marginRight: "10px" }}
// //                   />
// //                   Google Play
// //                 </a>
// //               </div>

// //               {(!deviceType ||
// //                 (deviceType !== "ios" && deviceType !== "android")) && (
// //                 <p className="mt-4 text-sm text-gray-600">
// //                   Select your platform above
// //                 </p>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* ── Coupon code section (shown when coupon is redeemed) ── */}
// //         {isCouponShare && couponCode && (
// //           <CopyField value={`https://referral.famocare.com/${couponCode}`} />
// //         )}
// //       </div>
// //     </BaseModal>
// //   );
// // };




// import React, { useRef, useState, useEffect } from "react";
// import { BaseModal } from "./base-modal";
// import { CopyField } from "../copy-link-field";
// import { shareLinks } from "../../../utils/static";
// import { useSelector } from "react-redux";
// import PlayStore from "../../../assets/pngs/PlayStore.png";
// import Fb from "../../../assets/pngs/Fb.png";
// import ChevronRight from "../../../assets/pngs/ChevronRight.png";

// const REFERRAL_BASE_URL = "https://referral.famocare.com/";

// export const ShareModal = ({ onClose }) => {
//   const scrollRef = useRef(null);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   const modalData = useSelector((state) => state.global.modal?.data) || {};

//   const {
//     deviceType,
//     androidAppReferralLink,
//     iosAppReferralLink,
//     reqSentDate,
//     points,
//     paymentMethod,
//     reqApprovedDate,
//     paymentDate,
//     status,
//     imageBlob,
//     couponCode,
//     isCouponRedeemed,
//   } = modalData;

//   const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);
//   const isCouponShare = Boolean(isCouponRedeemed && couponCode);

//   // Determine share mode title
//   const modalTitle = isCouponShare
//     ? "Share Coupon Code"
//     : isPaymentShare
//     ? "Share Payment Details"
//     : "Share Referral Link";

//   // Build referral link using base URL + device-specific path
//   const referralLink =
//     deviceType?.toLowerCase() === "ios"
//       ? iosAppReferralLink || REFERRAL_BASE_URL
//       : androidAppReferralLink || REFERRAL_BASE_URL;

//   const handlePlatformClick = async (link) => {
//     if (isCouponShare) {
//       const url = getCouponShareUrl(link.label);
//       if (url && url !== "#") window.open(url, "_blank");
//     } else if (isPaymentShare) {
//       await sharePaymentImage(link.label);
//     } else {
//       const url = getReferralShareUrl(link.label);
//       if (url && url !== "#") window.open(url, "_blank");
//     }
//   };

//   // ── Coupon share URLs ──────────────────────────────────────────────────────
//   const buildCouponText = () =>
//     `🎉 Use my coupon code *${couponCode}* on Famocare and get exclusive rewards!\n` +
//     `Join Famocare using my referral link: https://referral.famocare.com/${couponCode}`;

//   const getCouponShareUrl = (label) => {
//     const encodedText = encodeURIComponent(buildCouponText());
//     const appUrl = encodeURIComponent(REFERRAL_BASE_URL);
//     switch (label) {
//       case "Facebook":
//         return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
//       case "Twitter":
//         return `https://twitter.com/intent/tweet?text=${encodedText}`;
//       case "WhatsApp":
//         return `https://wa.me/?text=${encodedText}`;
//       case "Telegram":
//         return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
//       case "Reddit":
//         return `https://www.reddit.com/submit?title=${encodedText}`;
//       case "Tumblr":
//         return `https://www.tumblr.com/share/link?description=${encodedText}`;
//       case "Blogger":
//         return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
//       case "Instagram":
//         return "https://www.instagram.com/";
//       default:
//         return "#";
//     }
//   };

//   // ── Payment share logic ────────────────────────────────────────────────────
//   const sharePaymentImage = async (platform) => {
//     if (imageBlob) {
//       const file = new File([imageBlob], "payment_details.png", {
//         type: "image/png",
//       });

//       if (
//         navigator.share &&
//         navigator.canShare &&
//         navigator.canShare({ files: [file] })
//       ) {
//         try {
//           await navigator.share({ title: "Payment Details", files: [file] });
//           return;
//         } catch (err) {
//           if (err.name === "AbortError") return;
//         }
//       }

//       const blobUrl = URL.createObjectURL(imageBlob);
//       const downloadLink = document.createElement("a");
//       downloadLink.href = blobUrl;
//       downloadLink.download = "payment_details.png";
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);

//       setTimeout(() => {
//         const fallbackText = encodeURIComponent(
//           "Here are my payment details (see the downloaded image)."
//         );
//         const url = getShareUrl(platform, decodeURIComponent(fallbackText));
//         if (url && url !== "#") window.open(url, "_blank");
//         URL.revokeObjectURL(blobUrl);
//       }, 500);

//       return;
//     }

//     const text = buildPaymentText();
//     const url = getShareUrl(platform, text);
//     if (url && url !== "#") window.open(url, "_blank");
//   };

//   const buildPaymentText = () =>
//     "Payment Details\n" +
//     "───────────────\n" +
//     "Request Sent     : " + (reqSentDate ?? "N/A") + "\n" +
//     "Points Redeemed  : " + (points ?? "0") + "\n" +
//     "Request Approved : " + (reqApprovedDate ?? "N/A") + "\n" +
//     "Payment Method   : " + (paymentMethod ?? "N/A") + "\n" +
//     "Payment Date     : " + (paymentDate ?? "N/A") + "\n" +
//     "Status           : " + (status ?? "Pending");

//   const getShareUrl = (label, text) => {
//     const encodedText = encodeURIComponent(text);
//     const appUrl = encodeURIComponent(REFERRAL_BASE_URL);
//     switch (label) {
//       case "Facebook":
//         return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
//       case "Twitter":
//         return `https://twitter.com/intent/tweet?text=${encodedText}`;
//       case "WhatsApp":
//         return `https://wa.me/?text=${encodedText}`;
//       case "Telegram":
//         return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
//       case "Reddit":
//         return `https://www.reddit.com/submit?title=${encodedText}`;
//       case "Tumblr":
//         return `https://www.tumblr.com/share/link?description=${encodedText}`;
//       case "Blogger":
//         return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
//       case "Instagram":
//         return "https://www.instagram.com/";
//       default:
//         return "#";
//     }
//   };

//   // ── Referral share URLs ────────────────────────────────────────────────────
//   const getReferralShareUrl = (label) => {
//     const link = referralLink || REFERRAL_BASE_URL;
//     const encoded = encodeURIComponent(link);
//     const text = encodeURIComponent("Join Famocare using my referral link!");
//     switch (label) {
//       case "Facebook":
//         return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
//       case "Twitter":
//         return `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`;
//       case "WhatsApp":
//         return `https://wa.me/?text=${encodeURIComponent("Join Famocare: " + link)}`;
//       case "Telegram":
//         return `https://t.me/share/url?url=${encoded}&text=${text}`;
//       case "Reddit":
//         return `https://www.reddit.com/submit?url=${encoded}&title=Join+Famocare`;
//       case "Tumblr":
//         return `https://www.tumblr.com/share/link?url=${encoded}`;
//       case "Blogger":
//         return `https://www.blogger.com/blog-this.g?u=${encoded}`;
//       case "Instagram":
//         return "https://www.instagram.com/";
//       default:
//         return link;
//     }
//   };

//   // ── Scroll detection ───────────────────────────────────────────────────────
//   const checkScroll = () => {
//     if (scrollRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//       setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
//     }
//   };

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (el) {
//       checkScroll();
//       el.addEventListener("scroll", checkScroll);
//       return () => el.removeEventListener("scroll", checkScroll);
//     }
//   }, []);

//   // ── Build link list ────────────────────────────────────────────────────────
//   const filteredShareLinks = (shareLinks || []).filter(
//     (link) => link.label?.toLowerCase() !== "facebook"
//   );

//   const facebookLink = {
//     label: "Facebook",
//     icon: (
//       <img
//         src={Fb}
//         alt="Facebook"
//         className="w-[40px] h-[40px] md:w-[90px] md:h-[90px] object-contain"
//       />
//     ),
//     onClick: () => handlePlatformClick({ label: "Facebook" }),
//   };

//   const allLinks = [facebookLink, ...filteredShareLinks];

//   // ── App store button classes ───────────────────────────────────────────────
//   const appleClassName =
//     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
//     (deviceType === "ios"
//       ? "bg-black text-white ring-2 ring-offset-2 ring-black"
//       : "bg-gray-800 text-white hover:bg-gray-900");

//   const googleClassName =
//     "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
//     (deviceType === "android"
//       ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
//       : "bg-green-700 text-white hover:bg-green-800");

//   return (
//     <BaseModal
//       onClose={onClose}
//       containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
//     >
//       <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">
//         {/* ── Title ── */}
//         <p className="text-lg text-[#000000] md:text-[36px] font-semibold mb-[22px]">
//           {modalTitle}
//         </p>

//         {/* ── Social platform icons ── */}
//         <div className="relative my-5 md:mt-[22px] md:mb-[47px]">
//           <div
//             ref={scrollRef}
//             className="flex gap-5 md:gap-x-6 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             {allLinks.map((link) => (
//               <button
//                 key={link.label}
//                 onClick={() =>
//                   link.onClick ? link.onClick() : handlePlatformClick(link)
//                 }
//                 className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
//                 title={link.label}
//               >
//                 {link.icon}
//                 <span className="text-[10px] md:text-[20px] font-medium">
//                   {link.label}
//                 </span>
//               </button>
//             ))}
//           </div>

//           {canScrollRight && (
//             <button
//               onClick={() =>
//                 scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })
//               }
//               className="absolute right-0 top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center rounded-full transition-colors"
//               aria-label="Scroll right"
//             >
//               <img
//                 src={ChevronRight}
//                 alt="scroll right"
//                 className="w-[45px] h-[45px]"
//               />
//             </button>
//           )}
//         </div>

//         {/* ── Referral link + app store buttons ── */}
//         {!isPaymentShare && !isCouponShare && (
//           <div>
//             <CopyField value={referralLink || REFERRAL_BASE_URL} />
//             <div className="mt-6 text-sm text-gray-600 text-center">
//               <p className="mb-3 font-medium">Download from official stores:</p>
//               <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
//                 <a
//                   href={iosAppReferralLink || REFERRAL_BASE_URL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={appleClassName}
//                 >
//                   <svg
//                     className="w-5 h-5 mr-2 flex-shrink-0"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
//                   </svg>
//                   App Store
//                 </a>

//                 <a
//                   href={androidAppReferralLink || REFERRAL_BASE_URL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={googleClassName}
//                 >
//                   <img
//                     src={PlayStore}
//                     alt="Play Store"
//                     width="16"
//                     height="15"
//                     style={{ marginRight: "10px" }}
//                   />
//                   Google Play
//                 </a>
//               </div>

//               {(!deviceType ||
//                 (deviceType !== "ios" && deviceType !== "android")) && (
//                 <p className="mt-4 text-sm text-gray-600">
//                   Select your platform above
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ── Coupon code section (shown when coupon is redeemed) ── */}
//         {isCouponShare && couponCode && (
//           <CopyField value={`https://referral.famocare.com/${couponCode}`} />
//         )}
//       </div>
//     </BaseModal>
//   );
// };



import React, { useRef, useState, useEffect } from "react";
import { BaseModal } from "./base-modal";
import { CopyField } from "../copy-link-field";
import { shareLinks } from "../../../utils/static";
import { useSelector } from "react-redux";
import PlayStore from "../../../assets/pngs/PlayStore.png";
import ChevronRight from "../../../assets/pngs/ChevronRight.png";

const REFERRAL_BASE_URL = "https://referral.famocare.com/";

export const ShareModal = ({ onClose }) => {
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const modalData = useSelector((state) => state.global.modal?.data) || {};

  const {
    deviceType,
    androidAppReferralLink,
    iosAppReferralLink,
    reqSentDate,
    points,
    paymentMethod,
    reqApprovedDate,
    paymentDate,
    status,
    imageBlob,
    couponCode,
    isCouponRedeemed,
  } = modalData;

  const isPaymentShare = Boolean(reqSentDate || points || paymentMethod);
  const isCouponShare = Boolean(isCouponRedeemed && couponCode);

  // Determine share mode title
  const modalTitle = isCouponShare
    ? "Share Coupon Code"
    : isPaymentShare
    ? "Share Payment Details"
    : "Share Referral Link";

  // Build referral link using base URL + device-specific path
  const referralLink =
    deviceType?.toLowerCase() === "ios"
      ? iosAppReferralLink || REFERRAL_BASE_URL
      : androidAppReferralLink || REFERRAL_BASE_URL;

  const handlePlatformClick = async (link) => {
    if (isCouponShare) {
      const url = getCouponShareUrl(link.label);
      if (url && url !== "#") window.open(url, "_blank");
    } else if (isPaymentShare) {
      await sharePaymentImage(link.label);
    } else {
      const url = getReferralShareUrl(link.label);
      if (url && url !== "#") window.open(url, "_blank");
    }
  };

  // ── Coupon share URLs ──────────────────────────────────────────────────────
  const buildCouponText = () =>
    // `🎉 Use my coupon code *${couponCode}* on Famocare and get exclusive rewards!\n` +
    // `Join Famocare using my referral link: https://referral.famocare.com/${couponCode}`;
     `Use my coupon code *${couponCode}* on Famocare to get a Free Subscription!\n` +
    `Join Now: ${REFERRAL_BASE_URL}`;

  const getCouponShareUrl = (label) => {
    const encodedText = encodeURIComponent(buildCouponText());
    const appUrl = encodeURIComponent(REFERRAL_BASE_URL);
    switch (label) {
      case "Facebook":
        return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
      case "Twitter":
        return `https://twitter.com/intent/tweet?text=${encodedText}`;
      case "WhatsApp":
        return `https://wa.me/?text=${encodedText}`;
      case "Telegram":
        return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
      case "Reddit":
        return `https://www.reddit.com/submit?title=${encodedText}`;
      case "Tumblr":
        return `https://www.tumblr.com/share/link?description=${encodedText}`;
      case "Blogger":
        return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
      case "Instagram":
        return "https://www.instagram.com/";
      default:
        return "#";
    }
  };

  // ── Payment share logic ────────────────────────────────────────────────────
  const sharePaymentImage = async (platform) => {
    if (imageBlob) {
      const file = new File([imageBlob], "payment_details.png", {
        type: "image/png",
      });

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({ title: "Payment Details", files: [file] });
          return;
        } catch (err) {
          if (err.name === "AbortError") return;
        }
      }

      const blobUrl = URL.createObjectURL(imageBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = "payment_details.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setTimeout(() => {
        const fallbackText = encodeURIComponent(
          "Here are my payment details (see the downloaded image)."
        );
        const url = getShareUrl(platform, decodeURIComponent(fallbackText));
        if (url && url !== "#") window.open(url, "_blank");
        URL.revokeObjectURL(blobUrl);
      }, 500);

      return;
    }

    const text = buildPaymentText();
    const url = getShareUrl(platform, text);
    if (url && url !== "#") window.open(url, "_blank");
  };

  const buildPaymentText = () =>
    "Payment Details\n" +
    "───────────────\n" +
    "Request Sent     : " + (reqSentDate ?? "N/A") + "\n" +
    "Points Redeemed  : " + (points ?? "0") + "\n" +
    "Request Approved : " + (reqApprovedDate ?? "N/A") + "\n" +
    "Payment Method   : " + (paymentMethod ?? "N/A") + "\n" +
    "Payment Date     : " + (paymentDate ?? "N/A") + "\n" +
    "Status           : " + (status ?? "Pending");

  const getShareUrl = (label, text) => {
    const encodedText = encodeURIComponent(text);
    const appUrl = encodeURIComponent(REFERRAL_BASE_URL);
    switch (label) {
      case "Facebook":
        return `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${appUrl}`;
      case "Twitter":
        return `https://twitter.com/intent/tweet?text=${encodedText}`;
      case "WhatsApp":
        return `https://wa.me/?text=${encodedText}`;
      case "Telegram":
        return `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;
      case "Reddit":
        return `https://www.reddit.com/submit?title=${encodedText}`;
      case "Tumblr":
        return `https://www.tumblr.com/share/link?description=${encodedText}`;
      case "Blogger":
        return `https://www.blogger.com/blog-this.g?n=${encodedText}`;
      case "Instagram":
        return "https://www.instagram.com/";
      default:
        return "#";
    }
  };

  // ── Referral share URLs ────────────────────────────────────────────────────
  const getReferralShareUrl = (label) => {
    const link = referralLink || REFERRAL_BASE_URL;
    const encoded = encodeURIComponent(link);
    const text = encodeURIComponent("Join Famocare using my referral link!");
    switch (label) {
      case "Facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
      case "Twitter":
        return `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`;
      case "WhatsApp":
        return `https://wa.me/?text=${encodeURIComponent("Join Famocare: " + link)}`;
      case "Telegram":
        return `https://t.me/share/url?url=${encoded}&text=${text}`;
      case "Reddit":
        return `https://www.reddit.com/submit?url=${encoded}&title=Join+Famocare`;
      case "Tumblr":
        return `https://www.tumblr.com/share/link?url=${encoded}`;
      case "Blogger":
        return `https://www.blogger.com/blog-this.g?u=${encoded}`;
      case "Instagram":
        return "https://www.instagram.com/";
      default:
        return link;
    }
  };

  // ── Scroll detection ───────────────────────────────────────────────────────
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  // ── Build link list ────────────────────────────────────────────────────────
  const allLinks = shareLinks || [];

  // ── App store button classes ───────────────────────────────────────────────
  const appleClassName =
    "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
    (deviceType === "ios"
      ? "bg-black text-white ring-2 ring-offset-2 ring-black"
      : "bg-gray-800 text-white hover:bg-gray-900");

  const googleClassName =
    "inline-flex items-center justify-center w-[160px] h-[48px] px-6 py-3 rounded-lg transition-colors " +
    (deviceType === "android"
      ? "bg-green-600 text-white ring-2 ring-offset-2 ring-green-600"
      : "bg-green-700 text-white hover:bg-green-800");

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-full max-w-[341px] md:max-w-[728px] min-h-fit"
    >
      <div className="p-5 md:px-[30px] md:pt-[28px] md:pb-[50px]">
        {/* ── Title ── */}
        <p className="text-lg text-[#000000] md:text-[36px] font-semibold mb-[22px]">
          {modalTitle}
        </p>

        {/* ── Social platform icons ── */}
        {/* <div className="relative my-5 md:mt-[22px] md:mb-[47px]"> */}

          <div className="relative my-5 md:mt-[22px] md:mb-[47px]" style={{ "--bg": "white" }}>

          <div
            ref={scrollRef}
            // className="flex gap-5 md:gap-x-6 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth"
             className="flex gap-5 md:gap-x-6 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth pr-10 md:pr-12"

            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {allLinks.map((link) => (
              <button
                key={link.label}
                onClick={() =>
                  link.onClick ? link.onClick() : handlePlatformClick(link)
                }
                className="flex flex-col items-center gap-y-[6px] md:gap-y-3 text-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
                title={link.label}
              >
                {link.icon}
                <span className="text-[10px] md:text-[20px] font-medium">
                  {link.label}
                </span>
              </button>
            ))}
          </div>

 {canScrollRight && (
   <div className="absolute right-0 top-0 h-full w-14 h-14 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, var(--bg, white) 100%)" }}>
     <button
       onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
       className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center"
     >
       <img src={ChevronRight} alt="scroll right" className="w-[50px] h-[50px] mt-[-28px]" />

     </button>
     </div>
 )}

        </div>

        {/* ── Referral link + app store buttons ── */}
        {!isPaymentShare && !isCouponShare && (
          <div>
            <CopyField value={referralLink || REFERRAL_BASE_URL} />
            <div className="mt-6 text-sm text-gray-600 text-center">
              <p className="mb-3 font-medium">Download from official stores:</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center whitespace-nowrap">
                <a
                  href={iosAppReferralLink || REFERRAL_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={appleClassName}
                >
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink mt-[-2px]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.49.87 3.27.87.78 0 2.25-1.07 3.79-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </a>

                <a
                  href={androidAppReferralLink || REFERRAL_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={googleClassName}
                >
                  <img
                    src={PlayStore}
                    alt="Play Store"
                    width="16"
                    height="15"
                    style={{ marginRight: "10px" }}
                  />

                  Google Play
                </a>
              </div>

              {(!deviceType ||
                (deviceType !== "ios" && deviceType !== "android")) && (
                <p className="mt-4 text-sm text-gray-600">
                  Select your platform above
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── Coupon code section (shown when coupon is redeemed) ── */}
        {isCouponShare && couponCode && (
          <CopyField value={`https://referral.famocare.com/${couponCode}`} />
        )}
      </div>
    </BaseModal>
  );
};





