// // // // import { getStatusStyles } from "../../utils/utility";

// // // // export const CouponDetailsCard = ({ data }) => {
// // // //   return (
// // // //     <div className="flex flex-col gap-y-3">
// // // //       {data?.map((item, index) => {
// // // //         const { bg, text } = getStatusStyles(item?.status);
// // // //         return (
// // // //           <div
// // // //             key={index}
// // // //             className="p-[18px] rounded-[12px] shadow-md bg-white"
// // // //           >
// // // //             <div className="flex justify-between items-center">
// // // //               <span className="text-base font-semibold">{item?.type}</span>
// // // //               <div
// // // //                 className={`px-[12.5px] py-[2.5px] rounded-[3px] text-center cursor-pointer ${bg}`}
// // // //               >
// // // //                 <span className={`text-xs font-medium ${text}`}>
// // // //                   {item?.status}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //             <div className="flex items-center mt-[10px]">
// // // //               <div className="flex flex-col gap-y-1 border-r border-r-[#e5e5e5] pr-[30px]">
// // // //                 <span className="text-[#848484] text-[10px] font-normal">
// // // //                   Coupon
// // // //                 </span>
// // // //                 <span className="text-[#848484] text-[11px] font-medium">
// // // //                   {item?.coupon}
// // // //                 </span>
// // // //               </div>
// // // //               <div className="flex flex-col gap-y-1 pl-[30px]">
// // // //                 <span className="text-[#848484] text-[10px] font-normal">
// // // //                   Redeemed Date & Time
// // // //                 </span>
// // // //                 <span className="text-[#848484] text-[11px] font-medium">
// // // //                   {item?.redeemDate}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         );
// // // //       })}

// // // //       {data?.length > 0 && (
// // // //         <p className="text-center text-gray-500 text-sm mt-3">
// // // //           No more data available
// // // //         </p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };




// // // // import { getStatusStyles } from "../../utils/utility";

// // // // export const CouponDetailsCard = ({ data }) => {
// // // //   // Format date helper
// // // //   const formatDate = (dateString) => {
// // // //     if (!dateString) return "N/A";
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       return date.toLocaleDateString("en-US", {
// // // //         year: "numeric",
// // // //         month: "short",
// // // //         day: "numeric",
// // // //         hour: "2-digit",
// // // //         minute: "2-digit",
// // // //       });
// // // //     } catch (error) {
// // // //       return "Invalid Date";
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col gap-y-3">
// // // //       {data?.map((item, index) => {
// // // //         const { bg, text } = getStatusStyles(item?.status);
// // // //         return (
// // // //           <div
// // // //             key={index}
// // // //             className="p-[18px] rounded-[12px] shadow-md bg-white"
// // // //           >
// // // //             <div className="flex justify-between items-center">
// // // //               <span className="text-base font-semibold">{item?.type}</span>
// // // //               <div
// // // //                 className={`px-[12.5px] py-[2.5px] rounded-[3px] text-center cursor-pointer ${bg}`}
// // // //               >
// // // //                 <span className={`text-xs font-medium ${text}`}>
// // // //                   {item?.status}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //             <div className="flex items-center mt-[10px]">
// // // //               <div className="flex flex-col gap-y-1 border-r border-r-[#e5e5e5] pr-[30px]">
// // // //                 <span className="text-[#848484] text-[10px] font-normal">
// // // //                   Coupon
// // // //                 </span>
// // // //                 <span className="text-[#848484] text-[11px] font-medium">
// // // //                   {item?.coupon}
// // // //                 </span>
// // // //               </div>
// // // //               <div className="flex flex-col gap-y-1 pl-[30px]">
// // // //                 <span className="text-[#848484] text-[10px] font-normal">
// // // //                   Redeemed Date & Time
// // // //                 </span>
// // // //                 <span className="text-[#848484] text-[11px] font-medium">
// // // //                   {formatDate(item?.createdAt)}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         );
// // // //       })}

// // // //       {data?.length === 0 && (
// // // //         <p className="text-center text-gray-500 text-sm mt-3">
// // // //           No coupons available
// // // //         </p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };



// // import { getStatusStyles } from "../../utils/utility";

// // export const CouponDetailsCard = ({ data }) => {
// //   const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
// //     try {
// //       const date = new Date(dateString);
// //       return date.toLocaleDateString("en-US", {
// //         year: "numeric",
// //         month: "short",
// //         day: "numeric",
// //         hour: "2-digit",
// //         minute: "2-digit",
// //       });
// //     } catch (error) {
// //       return "Invalid Date";
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col gap-y-3">
// //       {Array.isArray(data) && data?.map((item, index) => {
// //         // ✅ Always trust API status — no local expiry override
// //         const actualStatus = item?.status?.toLowerCase() || "unknown";
// //         const { bg, text } = getStatusStyles(actualStatus);

// //         return (
// //           <div
// //             key={item?.id ?? index}
// //             className="p-[18px] rounded-[12px] shadow-md bg-white"
// //           >
// //             <div className="flex justify-between items-center">
// //               <span className="text-base font-semibold capitalize">{item?.type}</span>
// //               <div
// //                 className={`px-[12.5px] py-[2.5px] rounded-[3px] text-center cursor-pointer ${bg}`}
// //               >
// //                 {/* ✅ Show actualStatus from API, not raw item?.status */}
// //                 <span className={`text-xs font-medium capitalize ${text}`}>
// //                   {actualStatus}
// //                 </span>
// //               </div>
// //             </div>

// //             <div className="flex items-center mt-[10px]">
// //               <div className="flex flex-col gap-y-1 border-r border-r-[#e5e5e5] pr-[30px]">
// //                 <span className="text-[#848484] text-[10px] font-normal">
// //                   Coupon
// //                 </span>
// //                 <span className="text-[#848484] text-[11px] font-medium">
// //                   {item?.coupon}
// //                 </span>
// //               </div>
// //               <div className="flex flex-col gap-y-1 pl-[30px]">
// //                 <span className="text-[#848484] text-[10px] font-normal">
// //                   Redeemed Date & Time
// //                 </span>
// //                 <span className="text-[#848484] text-[11px] font-medium">
// //                   {formatDate(item?.createdAt)}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
// //         );
// //       })}

// //       {Array.isArray(data) && data?.length === 0 && (
// //         <p className="text-center text-gray-500 text-sm mt-3">
// //           No coupons available
// //         </p>
// //       )}
// //     </div>
// //   );
// // };







// import { getStatusStyles } from "../../utils/utility";

// const resolveStatus = (item) => {
//   const apiStatus = item?.status?.toLowerCase() || "unknown";

//   if (apiStatus === "active" && item?.expiryDate) {
//     const isExpired = new Date(item.expiryDate) < new Date();
//     if (isExpired) return "expired";
//   }

//   return apiStatus;
// };

// export const CouponDetailsCard = ({ data }) => {
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch (error) {
//       return "Invalid Date";
//     }
//   };

//   return (
//     <div className="flex flex-col gap-y-3">
//       {Array.isArray(data) &&
//         data?.map((item, index) => {
//           const actualStatus = resolveStatus(item);
//           const { bg, text } = getStatusStyles(actualStatus);

//           return (
//             <div
//               key={item?.id ?? index}
//               className="p-[18px] rounded-[12px] shadow-md bg-white"
//             >
//               <div className="flex justify-between items-center">
//                 <span className="text-base font-semibold capitalize">
//                   {item?.type}
//                 </span>
//                 <div
//                   className={`px-[12.5px] py-[2.5px] rounded-[3px] text-center cursor-pointer ${bg}`}
//                 >
//                   <span className={`text-xs font-medium capitalize ${text}`}>
//                     {actualStatus}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center mt-[10px]">
//                 <div className="flex flex-col gap-y-1 border-r border-r-[#e5e5e5] pr-[30px]">
//                   <span className="text-[#848484] text-[10px] font-normal">
//                     Coupon
//                   </span>
//                   <span className="text-[#848484] text-[11px] font-medium">
//                     {item?.coupon}
//                   </span>
//                 </div>
//                 <div className="flex flex-col gap-y-1 pl-[30px]">
//                   <span className="text-[#848484] text-[10px] font-normal">
//                     Redeemed Date & Time
//                   </span>
//                   <span className="text-[#848484] text-[11px] font-medium">
//                     {formatDate(item?.createdAt)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//       {Array.isArray(data) && data?.length === 0 && (
//         <p className="text-center text-gray-500 text-sm mt-3">
//           No coupons available
//         </p>
//       )}
//     </div>
//   );
// };



////////



import { getStatusStyles } from "../../utils/utility";

const resolveStatus = (item) => {
  const apiStatus = item?.status?.toLowerCase() || "unknown";

  if (apiStatus === "active" && item?.expiryDate) {
    const isExpired = new Date(item.expiryDate) < new Date();
    if (isExpired) return "expired";
  }

  return apiStatus;
};

export const CouponDetailsCard = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      {Array.isArray(data) &&
        data?.map((item, index) => {
          const actualStatus = resolveStatus(item);
          const { bg, text } = getStatusStyles(actualStatus);

          return (
            <div
              key={item?.id ?? index}
              className="p-[18px] rounded-[12px] shadow-md bg-white"
            >
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold capitalize">
                  {item?.type}
                </span>
                <div
                  className={`px-[12.5px] py-[2.5px] rounded-[3px] text-center cursor-pointer ${bg}`}
                >
                  <span className={`text-xs font-medium capitalize ${text}`}>
                    {actualStatus}
                  </span>
                </div>
              </div>

              <div className="flex items-center mt-[10px]">
                <div className="flex flex-col gap-y-1 border-r border-r-[#e5e5e5] pr-[30px]">
                  <span className="text-[#848484] text-[10px] font-normal">
                    Coupon
                  </span>
                  <span className="text-[#848484] text-[11px] font-medium">
                    {item?.coupon}
                  </span>
                </div>
                <div className="flex flex-col gap-y-1 pl-[30px]">
                  <span className="text-[#848484] text-[10px] font-normal">
                    Redeemed Date & Time
                  </span>
                  <span className="text-[#848484] text-[11px] font-medium">
                    {formatDate(item?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};