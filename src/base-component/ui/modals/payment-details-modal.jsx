// // // // // // import React, { useRef } from "react";
// // // // // // import html2canvas from "html2canvas";
// // // // // // import { BaseModal } from "./base-modal";
// // // // // // import { LinkButton } from "../button/link-icon";
// // // // // // import { SaveIcon } from "../../../assets/svgs/components/save-icon";
// // // // // // import { ShareDetailIcon } from "../../../assets/svgs/components/share-details-icon";
// // // // // // import { useSelector } from "react-redux";
// // // // // // import { formatDate } from "../../../utils/function";
// // // // // // import { getRedeemStatusStyles } from "../../../utils/utility";

// // // // // // export const PaymentDetailsModal = ({ onClose }) => {
// // // // // //   const modalRef = useRef(null);
// // // // // //   const {
// // // // // //     reqSentDate,
// // // // // //     points,
// // // // // //     reqApprovedDate,
// // // // // //     paymentMethod,
// // // // // //     paymentDate,
// // // // // //     status,
// // // // // //     onShare,
// // // // // //   } = useSelector((state) => state.global.modal.data) || {};

// // // // // //   const paymentDetailsData = [
// // // // // //     {
// // // // // //       heading: "Request Sent",
// // // // // //       data: reqSentDate ? formatDate(reqSentDate) : "N/A",
// // // // // //     },
// // // // // //     {
// // // // // //       heading: "Points Redeemed",
// // // // // //       data: points ?? "N/A",
// // // // // //     },
// // // // // //     {
// // // // // //       heading: "Request Approved",
// // // // // //       data: reqApprovedDate ? formatDate(reqApprovedDate) : "N/A",
// // // // // //     },
// // // // // //     {
// // // // // //       heading: "Payment Method",
// // // // // //       data: paymentMethod ?? "N/A",
// // // // // //     },
// // // // // //     {
// // // // // //       heading: "Payment Date",
// // // // // //       data: paymentDate ? formatDate(paymentDate) : "N/A",
// // // // // //     },
// // // // // //   ];

// // // // // //   const handleSaveToGallery = async () => {
// // // // // //     if (modalRef.current) {
// // // // // //       const canvas = await html2canvas(modalRef.current);
// // // // // //       const image = canvas.toDataURL("image/png");

// // // // // //       const link = document.createElement("a");
// // // // // //       link.href = image;
// // // // // //       link.download = "payment_details.png";
// // // // // //       document.body.appendChild(link);
// // // // // //       link.click();
// // // // // //       document.body.removeChild(link);
// // // // // //     }
// // // // // //   };

// // // // // //   const { bg, text } = getRedeemStatusStyles(status);

// // // // // //   return (
// // // // // //     <BaseModal
// // // // // //       onClose={onClose}
// // // // // //       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit"
// // // // // //     >
// // // // // //       <div ref={modalRef} className="p-[22px] md:p-[30px]">
// // // // // //         <div className="flex items-center justify-between mb-[7px]">
// // // // // //           <span className="text-[20px] md:text-[28px] font-semibold">
// // // // // //             Payment Details
// // // // // //           </span>
// // // // // //           <div
// // // // // //             className={`px-[4.5px] md:px-[7.5px] py-[2.5px] md:py-[5px] rounded-[3px] text-center  ${bg} ${text}`}
// // // // // //           >
// // // // // //             <span className={`text-xs font-medium ${bg} ${text}`}>
// // // // // //               {status}
// // // // // //             </span>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         {paymentDetailsData?.map((item, index) => {
// // // // // //           return (
// // // // // //             <div
// // // // // //               key={index}
// // // // // //               className={`flex items-center justify-between py-[15px] ${
// // // // // //                 index !== paymentDetailsData.length - 1
// // // // // //                   ? "border-b border-b-[#d9d9d9]"
// // // // // //                   : "pb-0"
// // // // // //               }`}
// // // // // //             >
// // // // // //               <p className="text-xs md:text-base font-semibold text-[#333333]">
// // // // // //                 {item?.heading}
// // // // // //               </p>
// // // // // //               <span className="text-base font-semibold text-[#727272]">
// // // // // //                 {item?.data}
// // // // // //               </span>
// // // // // //             </div>
// // // // // //           );
// // // // // //         })}

// // // // // //         <div className="mt-[25px] md:mt-[35px] flex items-center gap-x-[15px] md:gap-x-[33px]">
// // // // // //           <LinkButton
// // // // // //             icon={SaveIcon}
// // // // // //             text="Save to Gallery"
// // // // // //             onClick={handleSaveToGallery}
// // // // // //             containerClassName="rounded-[10px] md:py-[17px] md:px-[18.5px] w-full text-base md:text-lg font-semibold text-white"
// // // // // //           />
// // // // // //           <LinkButton
// // // // // //             icon={ShareDetailIcon}
// // // // // //             text="Share details"
// // // // // //             onClick={onShare}
// // // // // //             containerClassName="rounded-[10px] md:py-[17px] md:px-[27px] w-full text-base md:text-lg font-semibold text-white"
// // // // // //           />
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </BaseModal>
// // // // // //   );
// // // // // // };





// // // // // /////Remove



// // // // import React, { useRef } from "react";
// // // // import html2canvas from "html2canvas";
// // // // import { BaseModal } from "./base-modal";
// // // // import { LinkButton } from "../button/link-icon";
// // // // import { SaveIcon } from "../../../assets/svgs/components/save-icon";
// // // // import { ShareDetailIcon } from "../../../assets/svgs/components/share-details-icon";
// // // // import { useSelector } from "react-redux";
// // // // import { formatDate } from "../../../utils/function";
// // // // import { getRedeemStatusStyles } from "../../../utils/utility";

// // // // export const PaymentDetailsModal = ({ onClose }) => {
// // // //   const modalRef = useRef(null);
// // // //   const {
// // // //     reqSentDate,
// // // //     points,
// // // //     reqApprovedDate,
// // // //     paymentMethod,
// // // //     paymentDate,
// // // //     status,
// // // //     onShare,
// // // //   } = useSelector((state) => state.global.modal.data) || {};

// // // //   const paymentDetailsData = [
// // // //     {
// // // //       heading: "Request Sent",
// // // //       data: reqSentDate ? formatDate(reqSentDate) : "N/A",
// // // //     },
// // // //     {
// // // //       heading: "Points Redeemed",
// // // //       data: points ?? "N/A",
// // // //     },
// // // //     {
// // // //       heading: "Request Approved",
// // // //       data: reqApprovedDate ? formatDate(reqApprovedDate) : "N/A",
// // // //     },
// // // //     {
// // // //       heading: "Payment Method",
// // // //       data: paymentMethod ?? "N/A",
// // // //     },
// // // //     {
// // // //       heading: "Payment Date",
// // // //       data: paymentDate ? formatDate(paymentDate) : "N/A",
// // // //     },
// // // //   ];

// // // //   const handleSaveToGallery = async () => {
// // // //     if (modalRef.current) {
// // // //       const canvas = await html2canvas(modalRef.current);
// // // //       const image = canvas.toDataURL("image/png");

// // // //       const link = document.createElement("a");
// // // //       link.href = image;
// // // //       link.download = "payment_details.png";
// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       document.body.removeChild(link);
// // // //     }
// // // //   };

// // // //   const { bg, text } = getRedeemStatusStyles(status);

// // // //   return (
// // // //     <BaseModal
// // // //       onClose={onClose}
// // // //       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit"
// // // //     >
// // // //       <div ref={modalRef} className="p-[22px] md:p-[30px]">
// // // //         <div className="flex items-center justify-between mb-[7px]">
// // // //           <span className="text-[20px] md:text-[28px] font-semibold">
// // // //             Payment Details
// // // //           </span>
// // // //           <div
// // // //             className={`px-[4.5px] md:px-[7.5px] py-[2.5px] md:py-[5px] rounded-[3px] text-center  ${bg} ${text}`}
// // // //           >
// // // //             <span className={`text-xs font-medium ${bg} ${text}`}>
// // // //               {status}
// // // //             </span>
// // // //           </div>
// // // //         </div>
// // // //         {paymentDetailsData?.map((item, index) => {
// // // //           return (
// // // //             <div
// // // //               key={index}
// // // //               className={`flex items-center justify-between py-[15px] ${
// // // //                 index !== paymentDetailsData.length - 1
// // // //                   ? "border-b border-b-[#d9d9d9]"
// // // //                   : "pb-0"
// // // //               }`}
// // // //             >
// // // //               <p className="text-xs md:text-base font-semibold text-[#333333]">
// // // //                 {item?.heading}
// // // //               </p>
// // // //               <span className="text-base font-semibold text-[#727272]">
// // // //                 {item?.data}
// // // //               </span>
// // // //             </div>
// // // //           );
// // // //         })}

// // // //         <div className="mt-[25px] md:mt-[35px] flex items-center gap-x-[15px] md:gap-x-[33px]">
// // // //           <LinkButton
// // // //             icon={SaveIcon}
// // // //             text="Save to Gallery"
// // // //             onClick={handleSaveToGallery}
// // // //             containerClassName="rounded-[10px] md:py-[17px] md:px-[18.5px] w-full text-base md:text-lg font-semibold text-white"
// // // //           />
// // // //           <LinkButton
// // // //             icon={ShareDetailIcon}
// // // //             text="Share details"
// // // //             onClick={onShare}
// // // //             containerClassName="rounded-[10px] md:py-[17px] md:px-[27px] w-full text-base md:text-lg font-semibold text-white"
// // // //           />
// // // //         </div>
// // // //       </div>
// // // //     </BaseModal>
// // // //   );
// // // // };



// // // //////


// // import React, { useRef } from "react";
// // import html2canvas from "html2canvas";
// // import { BaseModal } from "./base-modal";
// // import { LinkButton } from "../button/link-icon";
// // import { SaveIcon } from "../../../assets/svgs/components/save-icon";
// // import { ShareDetailIcon } from "../../../assets/svgs/components/share-details-icon";
// // import { useSelector } from "react-redux";
// // import { formatDate } from "../../../utils/function";
// // import { getRedeemStatusStyles } from "../../../utils/utility";

// // export const PaymentDetailsModal = ({ onClose }) => {
// //   const modalRef = useRef(null);
// //   const {
// //     reqSentDate,
// //     points,
// //     reqApprovedDate,
// //     paymentMethod,
// //     paymentDate,
// //     status,
// //     onShare,
// //   } = useSelector((state) => state.global.modal.data) || {};

// //   const paymentDetailsData = [
// //     {
// //       heading: "Request Sent",
// //       data: reqSentDate ? formatDate(reqSentDate) : "N/A",
// //     },
// //     {
// //       heading: "Points Redeemed",
// //       data: points ?? "N/A",
// //     },
// //     {
// //       heading: "Request Approved",
// //       data: reqApprovedDate ? formatDate(reqApprovedDate) : "N/A",
// //     },
// //     {
// //       heading: "Payment Method",
// //       data: paymentMethod ?? "N/A",
// //     },
// //     {
// //       heading: "Payment Date",
// //       data: paymentDate ? formatDate(paymentDate) : "N/A",
// //     },
// //   ];

// //   const handleSaveToGallery = async () => {
// //     if (modalRef.current) {
// //       const canvas = await html2canvas(modalRef.current);
// //       const image = canvas.toDataURL("image/png");

// //       const link = document.createElement("a");
// //       link.href = image;
// //       link.download = "payment_details.png";
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //     }
// //   };

// //   // ✅ Only addition: pass the DOM element to onShare
// //   const handleShareClick = () => {
// //     if (onShare) onShare(modalRef.current);
// //   };

// //   const { bg, text } = getRedeemStatusStyles(status);

// // PaymentDetailsModal.jsx




// //   return (
// //     <BaseModal
// //       onClose={onClose}
// //       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit"
// //     >
// //       <div ref={modalRef} className="p-[22px] md:p-[30px]">
// //         <div className="flex items-center justify-between mb-[7px]">
// //           <span className="text-[20px] md:text-[28px] font-semibold">
// //             Payment Details
// //           </span>
// //           <div
// //             className={`px-[4.5px] md:px-[7.5px] py-[2.5px] md:py-[5px] rounded-[3px] text-center  ${bg} ${text}`}
// //           >
// //             <span className={`text-xs font-medium ${bg} ${text}`}>
// //               {status}
// //             </span>
// //           </div>
// //         </div>
// //         {paymentDetailsData?.map((item, index) => {
// //           return (
// //             <div
// //               key={index}
// //               className={`flex items-center justify-between py-[15px] ${
// //                 index !== paymentDetailsData.length - 1
// //                   ? "border-b border-b-[#d9d9d9]"
// //                   : "pb-0"
// //               }`}
// //             >
// //               <p className="text-xs md:text-base font-semibold text-[#333333]">
// //                 {item?.heading}
// //               </p>
// //               <span className="text-base font-semibold text-[#727272]">
// //                 {item?.data}
// //               </span>
// //             </div>
// //           );
// //         })}

// //         <div className="mt-[25px] md:mt-[35px] flex items-center gap-x-[15px] md:gap-x-[33px]">
// //           <LinkButton
// //             icon={SaveIcon}
// //             text="Save to Gallery"
// //             onClick={handleSaveToGallery}
// //             containerClassName="rounded-[10px] md:py-[17px] md:px-[18.5px] w-full text-base md:text-lg font-semibold text-white"
// //           />
// //           <LinkButton
// //             icon={ShareDetailIcon}
// //             text="Share details"
// //             onClick={handleShareClick}
// //             containerClassName="rounded-[10px] md:py-[17px] md:px-[27px] w-full text-base md:text-lg font-semibold text-white"
// //           />
// //         </div>
// //       </div>
// //     </BaseModal>
// //   );
// // };




// // //////




// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import { BaseModal } from "./base-modal";
// import { LinkButton } from "../button/link-icon";
// import { SaveIcon } from "../../../assets/svgs/components/save-icon";
// import { ShareDetailIcon } from "../../../assets/svgs/components/share-details-icon";
// import { useSelector } from "react-redux";
// import { formatDate } from "../../../utils/function";
// import { getRedeemStatusStyles } from "../../../utils/utility";

// export const PaymentDetailsModal = ({ onClose }) => {
//   const modalRef = useRef(null);
//   const modalData = useSelector((state) => state.global.modal.data) || {};

//   const {
//     reqSentDate,
//     points,
//     reqApprovedDate,
//     paymentMethod,
//     paymentDate,
//     status,
//     onShare,
//   } = modalData;

//   const paymentDetailsData = [
//     { heading: "Request Sent", data: reqSentDate ? formatDate(reqSentDate) : "N/A" },
//     { heading: "Points Redeemed", data: points ?? "N/A" },
//     { heading: "Request Approved", data: reqApprovedDate ? formatDate(reqApprovedDate) : "N/A" },
//     { heading: "Payment Method", data: paymentMethod ?? "N/A" },
//     { heading: "Payment Date", data: paymentDate ? formatDate(paymentDate) : "N/A" },
//   ];

//   const handleSaveToGallery = async () => {
//     if (!modalRef.current) return;
//     const canvas = await html2canvas(modalRef.current, {
//       useCORS: true,
//       backgroundColor: "#ffffff",
//       scale: 2,
//     });
//     const image = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = image;
//     link.download = "payment_details.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleShareClick = async () => {
//     if (!modalRef.current) return;
//     try {
//       const canvas = await html2canvas(modalRef.current, {
//         useCORS: true,
//         backgroundColor: "#ffffff",
//         scale: 2,
//       });
//       canvas.toBlob((blob) => {
//         if (blob && onShare) {
//           onShare(blob); // ← passes real PNG blob
//         }
//       }, "image/png");
//     } catch (error) {
//       console.error("Screenshot failed:", error);
//     }
//   };

//   const { bg, text } = getRedeemStatusStyles(status);

//   return (
//     <BaseModal
//       onClose={onClose}
//       containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit"
//     >
//       <div ref={modalRef} className="p-[22px] md:p-[30px] bg-white">
//         <div className="flex items-center justify-between mb-[7px]">
//           <span className="text-[20px] md:text-[28px] font-semibold">
//             Payment Details
//           </span>
//           <div className={`px-[4.5px] md:px-[7.5px] py-[2.5px] md:py-[5px] rounded-[3px] text-center ${bg} ${text}`}>
//             <span className={`text-xs font-medium ${bg} ${text}`}>
//               {status}
//             </span>
//           </div>
//         </div>

//         {paymentDetailsData.map((item, index) => (
//           <div
//             key={index}
//             className={`flex items-center justify-between py-[15px] ${
//               index !== paymentDetailsData.length - 1
//                 ? "border-b border-b-[#d9d9d9]"
//                 : "pb-0"
//             }`}
//           >
//             <p className="text-xs md:text-base font-semibold text-[#333333]">
//               {item.heading}
//             </p>
//             <span className="text-base font-semibold text-[#727272]">
//               {item.data}
//             </span>
//           </div>
//         ))}

// <div className="mt-[25px] md:mt-[35px] flex items-center gap-x-[10px] md:gap-x-[16px]">
//   <LinkButton
//     icon={SaveIcon}
//     text="Save to Gallery"
//     onClick={handleSaveToGallery}
//     containerClassName="rounded-[10px] py-[10px] px-[12px] md:py-[17px] md:px-[18.5px] w-full text-sm md:text-lg font-semibold text-white"
//   />
//   <LinkButton
//     icon={ShareDetailIcon}
//     text="Share details"
//     onClick={handleShareClick}
//     containerClassName="rounded-[10px] py-[10px] px-[12px] md:py-[17px] md:px-[27px] w-full text-sm md:text-lg font-semibold text-white"
//   />
// </div>
// </div>


//     </BaseModal>
//   );
// };



////



import React from "react";
import { BaseModal } from "./base-modal";
import { LinkButton } from "../button/link-icon";
import { SaveIcon } from "../../../assets/svgs/components/save-icon";
import { ShareDetailIcon } from "../../../assets/svgs/components/share-details-icon";
import { useSelector } from "react-redux";
import { formatDate } from "../../../utils/function";
import { getRedeemStatusStyles } from "../../../utils/utility";

export const PaymentDetailsModal = ({ onClose }) => {
  const modalData = useSelector((state) => state.global.modal.data) || {};

  const {
    reqSentDate,
    points,
    reqApprovedDate,
    paymentMethod,
    paymentDate,
    status,
    onShare,
  } = modalData;

  const paymentDetailsData = [
    { heading: "Request Sent", data: reqSentDate ? formatDate(reqSentDate) : "N/A" },
    { heading: "Points Redeemed", data: points ?? "N/A" },
    { heading: "Request Approved", data: reqApprovedDate ? formatDate(reqApprovedDate) : "N/A" },
    { heading: "Payment Method", data: paymentMethod ?? "N/A" },
    { heading: "Payment Date", data: paymentDate ? formatDate(paymentDate) : "N/A" },
  ];

  // ── Same status colors as getRedeemStatusStyles ───────────────────────────
  const getStatusColors = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "cancelled" || s === "canceled")
      return { bg: "#ffe4e6", text: "#e11d48" };
    if (s === "approved" || s === "completed" || s === "success" || s === "successful")
      return { bg: "#dcfce7", text: "#16a34a" };
    if (s === "pending")
      return { bg: "#fef9c3", text: "#ca8a04" };
    return { bg: "#f3f4f6", text: "#374151" };
  };

  // ── Draw SVG path on canvas using Path2D ──────────────────────────────────
  const drawSvgPath = (ctx, pathData, fill, svgW, svgH, x, y, drawW, drawH) => {
    const scaleX = drawW / svgW;
    const scaleY = drawH / svgH;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scaleX, scaleY);
    ctx.fillStyle = fill;
    ctx.fill(new Path2D(pathData));
    ctx.restore();
  };

  // ── SaveIcon: viewBox="0 0 17 16" ────────────────────────────────────────
  const drawSaveIcon = (ctx, cx, cy, color) => {
    const drawW = 17;
    const drawH = 16;
    const x = cx - drawW / 2;
    const y = cy - drawH / 2;
    const path =
      "M4.5625 2.9375V0.125H10.1875V2.9375C10.1875 3.08668 10.1282 3.22976 10.0227 3.33525C9.91726 3.44074 9.77418 3.5 9.625 3.5H5.125C4.97582 3.5 4.83274 3.44074 4.72725 3.33525C4.62176 3.22976 4.5625 3.08668 4.5625 2.9375ZM4 15.875H13V13.94H4V15.875ZM4 12.815H13V11.69H4V12.815ZM15.8125 3.89375L13.2081 0.738125C13.05 0.546606 12.8516 0.392351 12.6269 0.286367C12.4023 0.180383 12.1571 0.125283 11.9087 0.125H11.3125V2.9375C11.3125 3.38505 11.1347 3.81428 10.8182 4.13074C10.5018 4.44721 10.0726 4.625 9.625 4.625H5.125C4.67745 4.625 4.24822 4.44721 3.93176 4.13074C3.61529 3.81428 3.4375 3.38505 3.4375 2.9375V0.125H2.3125C1.86495 0.125 1.43572 0.30279 1.11926 0.619257C0.80279 0.935725 0.625 1.36495 0.625 1.8125V14.1875C0.625 14.6351 0.80279 15.0643 1.11926 15.3807C1.43572 15.6972 1.86495 15.875 2.3125 15.875H2.875V10.25C2.875 9.80245 3.05279 9.37322 3.36926 9.05676C3.68572 8.74029 4.11495 8.5625 4.5625 8.5625H12.4375C12.8851 8.5625 13.3143 8.74029 13.6307 9.05676C13.9472 9.37322 14.125 9.80245 14.125 10.25V15.875H14.6875C15.1351 15.875 15.5643 15.6972 15.8807 15.3807C16.1972 15.0643 16.375 14.6351 16.375 14.1875V5.1425C16.3737 4.9066 16.323 4.67358 16.2261 4.45849C16.1292 4.2434 15.9883 4.05102 15.8125 3.89375ZM12.4375 9.6875H4.5625C4.41332 9.6875 4.27024 9.74676 4.16475 9.85225C4.05926 9.95774 4 10.1008 4 10.25V10.565H13V10.25C13 10.1008 12.9407 9.95774 12.8352 9.85225C12.7298 9.74676 12.5867 9.6875 12.4375 9.6875Z";
    drawSvgPath(ctx, path, color, 17, 16, x, y, drawW, drawH);
  };

  // ── ShareDetailIcon: viewBox="0 0 18 18", two paths ──────────────────────
  const drawShareIcon = (ctx, cx, cy, color) => {
    const drawW = 18;
    const drawH = 18;
    const x = cx - drawW / 2;
    const y = cy - drawH / 2;

    const path1 =
      "M17.8428 5.23434L12.9678 0.171895C12.89 0.0913206 12.7899 0.0357898 12.6804 0.0124052C12.5708 -0.0109794 12.4568 -0.00115456 12.3529 0.040623C12.2488 0.0826226 12.1596 0.154747 12.0968 0.24775C12.034 0.340752 12.0004 0.450394 12.0004 0.562617V3.00018H11.8129C7.78095 3.00018 4.50049 6.28064 4.50049 10.3126V11.4376C4.50049 11.6985 4.68421 11.9161 4.93842 11.9754C4.97977 11.9858 5.02097 11.9903 5.06217 11.9903C5.27448 11.9903 5.47771 11.8658 5.57591 11.6701C6.63044 9.5603 8.75062 8.25007 11.1094 8.25007H12.0004V10.6875C12.0003 10.7997 12.0339 10.9093 12.0967 11.0022C12.1595 11.0951 12.2488 11.1671 12.3529 11.2088C12.5637 11.295 12.8088 11.2426 12.9678 11.0775L17.8428 6.01508C18.0528 5.79686 18.0528 5.45339 17.8428 5.23437V5.23434Z";
    const path2 =
      "M15.7503 18H2.25046C1.00999 18 0.000488281 16.9906 0.000488281 15.75V5.25022C0.000488281 4.00974 1.00999 3.00024 2.25046 3.00024H4.50044C4.91517 3.00024 5.25038 3.33546 5.25038 3.75019C5.25038 4.16492 4.91517 4.50013 4.50044 4.50013H2.25046C1.83643 4.50013 1.50038 4.83619 1.50038 5.25022V15.75C1.50038 16.164 1.83643 16.5001 2.25046 16.5001H15.7503C16.1642 16.5001 16.5002 16.164 16.5002 15.75V9.75016C16.5002 9.33543 16.8355 9.00008 17.2502 9.00008C17.665 9.00008 18.0003 9.33543 18.0003 9.75016V15.75C18.0003 16.9906 16.9908 18 15.7503 18Z";

    drawSvgPath(ctx, path1, color, 18, 18, x, y, drawW, drawH);
    drawSvgPath(ctx, path2, color, 18, 18, x, y, drawW, drawH);
  };

  // ── Main canvas builder ───────────────────────────────────────────────────
  const buildCanvas = () => {
    const scale = 2;
    const W = 380;
    const PAD = 22;
    const ROW_H = 50;
    const BTN_H = 44;
    const BTN_RADIUS = 10;
    const BADGE_RADIUS = 3;
    const BTN_GAP = 10;
    const ICON_SIZE = 18;
    const ICON_GAP = 7;

    const totalH =
      PAD + 50 +
      paymentDetailsData.length * ROW_H +
      25 + BTN_H + PAD;

    const canvas = document.createElement("canvas");
    canvas.width = W * scale;
    canvas.height = totalH * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, totalH);

    let y = PAD;

    // ── Title ────────────────────────────────────────────────────────────────
    ctx.fillStyle = "#000000";
    ctx.font = "600 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText("Payment Details", PAD, y + 14);

    // ── Status Badge ─────────────────────────────────────────────────────────
    const { bg: badgeBg, text: badgeTextColor } = getStatusColors(status);
    const badgeLabel = status || "";
    ctx.font = "500 12px -apple-system, BlinkMacSystemFont, sans-serif";
    const badgeTextW = ctx.measureText(badgeLabel).width;
    const badgePadX = 8;
    const badgeH = 22;
    const badgeW = badgeTextW + badgePadX * 2;
    const badgeX = W - PAD - badgeW;
    const badgeY = y + 3;

    ctx.fillStyle = badgeBg;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, BADGE_RADIUS);
    ctx.fill();

    ctx.fillStyle = badgeTextColor;
    ctx.textBaseline = "middle";
    ctx.fillText(badgeLabel, badgeX + badgePadX, badgeY + badgeH / 2);

    y += 40;

    // ── Detail Rows ──────────────────────────────────────────────────────────
    paymentDetailsData.forEach((item, index) => {
      const rowY = y + ROW_H * index;
      const centerY = rowY + ROW_H / 2;

      if (index !== 0) {
        ctx.strokeStyle = "#d9d9d9";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(PAD, rowY);
        ctx.lineTo(W - PAD, rowY);
        ctx.stroke();
      }

      ctx.fillStyle = "#333333";
      ctx.font = "600 14px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(item.heading, PAD, centerY);

      ctx.fillStyle = "#727272";
      ctx.font = "600 14px -apple-system, BlinkMacSystemFont, sans-serif";
      const valW = ctx.measureText(String(item.data)).width;
      ctx.fillText(String(item.data), W - PAD - valW, centerY);
    });

    y += paymentDetailsData.length * ROW_H + 25;

    // ── Buttons ──────────────────────────────────────────────────────────────
    const btnW = (W - PAD * 2 - BTN_GAP) / 2;

    const drawButton = (label, bx, drawIcon) => {
      // Button bg
      ctx.fillStyle = "#691188";
      ctx.beginPath();
      ctx.roundRect(bx, y, btnW, BTN_H, BTN_RADIUS);
      ctx.fill();

      // Measure text
      ctx.font = "600 14px -apple-system, BlinkMacSystemFont, sans-serif";
      const textW = ctx.measureText(label).width;
      const totalContentW = ICON_SIZE + ICON_GAP + textW;
      const startX = bx + (btnW - totalContentW) / 2;
      const centerY = y + BTN_H / 2;

      // Draw exact SVG icon
      drawIcon(ctx, startX + ICON_SIZE / 2, centerY, "#ffffff");

      // Draw label
      ctx.fillStyle = "#ffffff";
      ctx.font = "600 14px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(label, startX + ICON_SIZE + ICON_GAP, centerY);
    };

    drawButton("Save to Gallery", PAD, drawSaveIcon);
    drawButton("Share details", PAD + btnW + BTN_GAP, drawShareIcon);

    return canvas;
  };

  const handleSaveToGallery = () => {
    const canvas = buildCanvas();
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "payment_details.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareClick = () => {
    const canvas = buildCanvas();
    canvas.toBlob((blob) => {
      if (blob && onShare) {
        onShare(blob);
      }
    }, "image/png");
  };

  const { bg, text } = getRedeemStatusStyles(status);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-full max-w-[341px] md:max-w-[478px] min-h-fit"
    >
      <div className="p-[22px] md:p-[30px] bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-[7px]">
          <span className="text-[20px] md:text-[28px] font-semibold">
            Payment Details
          </span>
          <div className={`px-[4.5px] md:px-[7.5px] py-[2.5px] md:py-[5px] rounded-[3px] text-center ${bg} ${text}`}>
            <span className="text-xs font-medium">{status}</span>
          </div>
        </div>

        {/* Rows */}
        {paymentDetailsData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-[15px] ${
              index !== paymentDetailsData.length - 1
                ? "border-b border-b-[#d9d9d9]"
                : "pb-0"
            }`}
          >
            <p className="text-xs md:text-base font-semibold text-[#333333]">
              {item.heading}
            </p>
            <span className="text-base font-semibold text-[#727272]">
              {item.data}
            </span>
          </div>
        ))}

        {/* Buttons */}
        <div className="mt-[25px] md:mt-[35px] flex items-center gap-x-[10px] md:gap-x-[16px]">
          <LinkButton
            icon={SaveIcon}
            text="Save to Gallery"
            onClick={handleSaveToGallery}
            containerClassName="rounded-[10px] py-[10px] px-[12px] md:py-[17px] md:px-[18.5px] w-full text-sm md:text-lg font-semibold text-white"
          />
          <LinkButton
            icon={ShareDetailIcon}
            text="Share details"
            onClick={handleShareClick}
            containerClassName="rounded-[10px] py-[10px] px-[12px] md:py-[17px] md:px-[27px] w-full text-sm md:text-lg font-semibold text-white"
          />
        </div>
      </div>
    </BaseModal>
  );
};