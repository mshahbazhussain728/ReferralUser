

// // import { formatDate } from "../../../utils/function";
// // import profile from "../../../assets/pngs/profile.jpg";

// // const getImage = (img) => {
// //   if (!img) return profile;
// //   if (img.startsWith("http://") || img.startsWith("https://")) return img;
// //   return profile;
// // };

// // export const MonthlyPremUsersTableRows = ({ data }) => {
// //   return (
// //     <div className="overflow-y-visible flex flex-col gap-y-[10px]">
// //       {data?.map((item, index) => {
// //         const sub           = item?.Subscriptions?.[0];
// //         const subscribeDate = sub?.startDate    ?? sub?.createdAt    ?? null;
// //         const clearanceDate = sub?.clearedDate  ?? sub?.canceledDate ?? null;
// //         const planType      = sub?.planType     ?? "N/A";
// //         const status        = sub?.status       ?? "N/A";

// //         return (
// //           <div
// //             key={index}
// //             className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[10px] px-[15px] grid grid-cols-[minmax(180px,_3fr)_minmax(150px,_2fr)_minmax(150px,_2fr)_minmax(150px,_2fr)_minmax(120px,_2fr)_minmax(100px,_1fr)] items-center gap-x-4"
// //           >
// //             {/* Column 1: Name + Image */}
// //             <div className="flex items-center gap-x-[18px] min-w-0">
// //               <img
// //                 src={getImage(item?.image)}
// //                 alt="profile"
// //                 className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-full object-cover"
// //               />
// //               <span className="text-base font-medium truncate">
// //                 {item?.name || "N/A"}
// //               </span>
// //             </div>

// //             {/* Column 2: Installed Date */}
// //             <span className="text-base font-medium flex items-center justify-center whitespace-nowrap ml-[-40px]">
// //               {item?.installedDate ? formatDate(item.installedDate) : "N/A"}
// //             </span>

// //             {/* Column 3: Subscribed Date */}
// //             <span className="text-base font-medium flex items-center justify-center whitespace-nowrap ml-[-20px]">
// //               {subscribeDate ? formatDate(subscribeDate) : "N/A"}
// //             </span>

// //             {/* Column 4: Clearance Date */}
// //             <span className="text-base font-medium flex items-center justify-center whitespace-nowrap">
// //               {clearanceDate ? formatDate(clearanceDate) : "N/A"}
// //             </span>

// //             {/* Column 5: Plan Type */}
// //             <span className="text-base font-medium flex items-center justify-center capitalize whitespace-nowrap ml-[-5px]">
// //               {planType}
// //             </span>

// //             {/* Column 6: Status */}
// //             <div className="flex items-center justify-center">
// //               <span
// //                 className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ml-[-10px]
// //                   ${
// //                     status === "active"
// //                       ? "bg-green-100 text-green-800"
// //                       : status === "canceled" || status === "cancelled"
// //                       ? "bg-red-100 text-red-800"
// //                       : "bg-blue-100 text-blue-800"
// //                   }`}
// //               >
// //                 {status}
// //               </span>
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };





// ///working fine






// // import { formatDate } from "../../../utils/function";
// // import profile from "../../../assets/pngs/profile.jpg";

// // const getImage = (img) => {
// //   if (!img) return profile;
// //   if (img.startsWith("http://") || img.startsWith("https://")) return img;
// //   return profile;
// // };

// // export const MonthlyPremUsersTableRows = ({ data, isSubPage }) => {
// //   return (
// //     <div className="overflow-y-visible flex flex-col gap-y-[10px]">
// //       {data?.map((item, index) => {
// //         const sub           = item?.Subscriptions?.[0] ?? {};
// //         const subscribeDate = sub?.startDate   ?? null;
// //         const clearanceDate = sub?.clearedDate ?? null;
// //         const planType      = sub?.planType    ?? "N/A";
// //         const status        = sub?.status      ?? "N/A";

// //         return (
// //           <div
// //             key={index}
// //             className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[10px] px-[15px] grid grid-cols-[minmax(180px,_3fr)_minmax(150px,_2fr)_minmax(150px,_2fr)_minmax(150px,_2fr)_minmax(120px,_2fr)_minmax(100px,_1fr)] items-center gap-x-4"
// //           >
// //             {/* Column 1: Image + Name + Email */}
// //             <div className="flex items-center gap-x-[18px] min-w-0">
// //               <img
// //                 src={getImage(item?.image)}
// //                 alt={item?.name || "profile"}
// //                 className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-full object-cover"
// //                 onError={(e) => {
// //                   e.target.onerror = null;
// //                   e.target.src = profile;
// //                 }}
// //               />
// //               {/* Name + Email stacked */}
// //               <div className="flex flex-col min-w-0">
// //                 <span className="text-base font-medium truncate">
// //                   {item?.name || "N/A"}
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Column 2: Installed Date */}
// //             <span className="text-base font-medium flex justify-center items-center whitespace-nowrap ml-[-8px]">
// //               {item?.installedDate ? formatDate(item.installedDate) : "N/A"}
// //             </span>

// //             {/* Column 3: Subscribed Date */}
// //             <span className="text-base font-medium flex items-center justify-center whitespace-nowrap ml-[6px]">
// //               {subscribeDate ? formatDate(subscribeDate) : "N/A"}
// //             </span>

// //             {/* Column 4: Clearance Date */}
// //             <span className="text-base font-medium flex items-center justify-center whitespace-nowrap ml-[8px]">
// //               {clearanceDate ? formatDate(clearanceDate) : "N/A"}
// //             </span>

// //             {/* Column 5: Plan Type */}
// //             <span className="text-base font-medium flex items-center justify-center capitalize whitespace-nowrap ml-[-5px]">
// //               {planType}
// //             </span>

// //             {/* Column 6: Status Badge */}
// //             <div className="flex items-center justify-center">
// //               <span
// //                 className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ml-[-10px]
// //                   ${
// //                     status === "active"
// //                       ? "bg-green-100 text-green-800"
// //                       : status === "canceled" || status === "cancelled"
// //                       ? "bg-red-100 text-red-800"
// //                       : status === "trial"
// //                       ? "bg-blue-100 text-blue-800"
// //                       : "bg-gray-100 text-gray-600"
// //                   }`}
// //               >
// //                 {status}
// //               </span>
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };


// ///uuu

// import { formatDate } from "../../../utils/function";
// import profile from "../../../assets/pngs/profile.jpg";

// const getImage = (img) => {
//   if (!img) return profile;
//   if (img.startsWith("http://") || img.startsWith("https://")) return img;
//   return profile;
// };

// export const MonthlyPremUsersTableRows = ({ data, isSubPage }) => {
//   return (
//     <div className="overflow-y-visible flex flex-col gap-y-[10px]">
//       {data?.map((item, index) => {
//         const sub           = item?.Subscriptions?.[0] ?? {};
//         const subscribeDate = sub?.startDate   ?? null;
//         const clearanceDate = sub?.clearedDate ?? null;
//         const planType      = sub?.planType    ?? "N/A";
//         const status        = sub?.status      ?? "N/A";

//         return (
//           <div
//             key={index}
//             className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[10px] px-[15px] grid grid-cols-[minmax(180px,_3fr)_minmax(170px,_2fr)_minmax(170px,_2fr)_minmax(170px,_2fr)_minmax(80px,_2fr)_minmax(10px,_1fr)] items-center gap-x-4"
//           >
//             {/* Column 1: Image + Name */}
//             <div className="flex items-center gap-x-[10px] min-w-0">
//               <img
//                 src={getImage(item?.image)}
//                 alt={item?.name || "profile"}
//                 className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = profile;
//                 }}
//               />
//               <div className="flex flex-col min-w-0">
//                 <span className="text-base font-medium truncate">
//                   {item?.name || "N/A"}
//                 </span>
//               </div>
//             </div>

//             {/* Column 2: Installed Date */}
//             <span className="text-base font-medium flex items-center justify-start whitespace-nowrap ml-[-10px]">
//               {item?.installedDate ? formatDate(item.installedDate) : "N/A"}
//             </span>

//             {/* Column 3: Subscribed Date */}
//             <span className="text-base font-medium flex items-center justify-start whitespace-nowrap ml-[-10px]">
//               {subscribeDate ? formatDate(subscribeDate) : "N/A"}
//             </span>

//             {/* Column 4: Clearance Date */}
//             <span className="text-base font-medium flex items-center justify-start whitespace-nowrap ml-[-10px]">
//               {clearanceDate ? formatDate(clearanceDate) : "N/A"}
//             </span>

//             {/* Column 5: Plan Type */}
//             <span className="text-base font-medium flex items-center justify-center capitalize whitespace-nowrap ml-[-20px]">
//               {planType}
//             </span>

//             {/* Column 6: Status Badge */}
//             <div className="flex items-center justify-center">
//               <span
//                 className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ml-[-5px]
//                   ${
//                     status === "active"
//                       ? "bg-green-100 text-green-800"
//                       : status === "canceled" || status === "cancelled"
//                       ? "bg-red-100 text-red-800"
//                       : status === "trial"
//                       ? "bg-blue-100 text-blue-800"
//                       : "bg-gray-100 text-gray-600"
//                   }`}
//               >
//                 {status}
//               </span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };


///uu1


import { formatDate } from "../../../utils/function";
import profile from "../../../assets/pngs/profile.jpg";

const getImage = (img) => {
  if (!img) return profile;
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  return profile;
};

export const MonthlyPremUsersTableRows = ({ data, isSubPage }) => {
  return (
    <div className="overflow-y-visible flex flex-col gap-y-[10px]">
      {data?.map((item, index) => {
        const sub           = item?.Subscriptions?.[0] ?? {};
        const subscribeDate = sub?.startDate   ?? null;
        const clearanceDate = sub?.clearedDate ?? null;
        const planType      = sub?.planType    ?? "N/A";
        const status        = sub?.status      ?? "N/A";

        return (
          // <div
          //   key={index}
          //   className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[10px] px-[15px] grid grid-cols-[minmax(170px,_3fr)_minmax(170px,_2fr)_minmax(170px,_2fr)_minmax(170px,_2fr)_minmax(80px,_2fr)_minmax(10px,_1fr)] items-center gap-x-4"
          // >

<div
  key={index}
  className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[10px] px-[15px] grid grid-cols-[minmax(150px,_3fr)_minmax(170px,_2fr)_minmax(170px,_2fr)_minmax(170px,_2fr)_minmax(80px,_2fr)_minmax(80px,_1fr)] items-center gap-x-4"
>


            {/* Column 1: Image + Name */}
            <div className="flex items-center gap-x-[10px] min-w-0">
              <img
                src={getImage(item?.image)}
                alt={item?.name || "profile"}
                className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = profile;
                }}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-base font-medium truncate">
                  {item?.name || "N/A"}
                </span>
              </div>
            </div>

            {/* Column 2: Installed Date */}
            <span className="text-base font-medium flex items-center justify-start whitespace-nowrap ml-[-10px]">
              {item?.installedDate ? formatDate(item.installedDate) : "N/A"}
            </span>

            {/* Column 3: Subscribed Date */}
            <span className="text-base font-medium flex items-center justify-start whitespace-nowrap ml-[-10px]">
              {subscribeDate ? formatDate(subscribeDate) : "N/A"}
            </span>

            {/* Column 4: Clearance Date */}
            <span className="text-base font-medium flex items-center justify-start whitespace-nowrap ml-[-10px]">
              {clearanceDate ? formatDate(clearanceDate) : "N/A"}
            </span>

            {/* Column 5: Plan Type */}
            <span className="text-base font-medium flex items-center justify-center capitalize whitespace-nowrap ml-[-20px]">
              {planType}
            </span>

            {/* Column 6: Status Badge */}
            <div className="flex items-center justify-center">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ml-[-5px]
                  ${
                    status === "active"
                      ? "bg-green-100 text-green-800"
                      : status === "canceled" || status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : status === "trial"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
              >
                {status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};