// // import { formatDate } from "../../utils/function";

// // export const RecordCard = ({ data, pageTitle, isPointHistory }) => {
// //   const clearanceLabel = pageTitle?.includes("Trial")
// //     ? "Clearance Date & Time"
// //     : pageTitle?.includes("Subscribed")
// //     ? "Cleared Date & Time"
// //     : pageTitle?.includes("Cancelled")
// //     ? "Cancelled Date & Time"
// //     : "Clearance Date & Time";

// //   return (
// //     <div className="flex flex-col gap-y-3">
// //       {data?.map((item, index) => {
// //         console.log(item?.subscribeDate, "item?.subscribeDate");

// //         return (
// //           <div
// //             key={index}
// //             className="pt-[15px] pb-5 shadow-md rounded-[12px] bg-white"
// //           >
// //             <div className="flex gap-x-2 px-[15px]">
// //               <img
// //                 src={item?.image}
// //                 alt="profile"
// //                 className="min-w-[55px] min-h-[55px] max-w-[55px] max-h-[55px] rounded-[5px] object-cover"
// //               />
// //               <div className="flex flex-col gap-y-2">
// //                 <p className="text-base font-semibold">{item?.name}</p>
// //                 <div className="flex items-center gap-x-1">
// //                   <span className="text-[#848484] text-xs font-medium">
// //                     {isPointHistory ? "Earned Points:" : "Installed on:"}
// //                   </span>
// //                   <span className="font-medium text-xs">
// //                     {isPointHistory
// //                       ? item?.points
// //                       : formatDate(item?.installedDate)}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="px-[41px] flex items-center mt-[10px]">
// //               <div className="flex flex-col gap-y-1 border-r border-r-[#e5e5e5] pr-[18px]">
// //                 <span className="text-[10px] font-normal text-[#848484]">
// //                   {isPointHistory
// //                     ? "Installed Date & Time"
// //                     : " Subscribed Date & Time"}
// //                 </span>
// //                 <span className="text-[11px] font-medium">
// //                   {isPointHistory
// //                     ? formatDate(item?.installedDate)
// //                     : formatDate(item?.subscribeDate)}
// //                 </span>
// //               </div>

// //               <div className="flex flex-col gap-y-1 pl-[18px]">
// //                 <span className="text-[10px] font-normal text-[#848484]">
// //                   {isPointHistory ? "Subscribed Date & Time" : clearanceLabel}
// //                 </span>
// //                 <span className="text-[11px] font-medium">
// //                   {isPointHistory
// //                     ? formatDate(item?.Subscriptions[0]?.startDate)
// //                     : formatDate(item?.clearanceDate)}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
// //         );
// //       })}

// //       {data?.length > 0 && (
// //         <p className="text-center text-gray-500 text-sm mt-3">
// //           No more data available
// //         </p>
// //       )}
// //     </div>
// //   );
// // };




import { formatDate } from "../../utils/function";

export const RecordCard = ({ data, pageTitle, isPointHistory }) => {
  const clearanceLabel = pageTitle?.includes("Trial")
    ? "Clearance Date & Time"
    : pageTitle?.includes("Subscribed")
    ? "Cleared Date & Time"
    : pageTitle?.includes("Cancelled")
    ? "Cancelled Date & Time"
    : "Clearance Date & Time";

  return (
    <div className="flex flex-col gap-y-3">
      {data?.map((item, index) => {
        // Get subscription data from the first subscription
        const subscription = item?.Subscriptions?.[0];
        const subscribeDate = subscription?.startDate || subscription?.createdAt;
        const clearanceDate = subscription?.clearedDate || subscription?.canceledDate;

        return (
          <div
            key={index}
            className="pt-[15px] pb-5 shadow-md rounded-[12px] bg-white"
          >
            <div className="flex gap-x-2 px-[15px]">
              <img
                src={item?.image}
                alt="profile"
                className="min-w-[55px] min-h-[55px] max-w-[55px] max-h-[55px] rounded-[5px] object-cover"
              />
              <div className="flex flex-col gap-y-2">
                <p className="text-base font-semibold">{item?.name}</p>
                <div className="flex items-center gap-x-1">
                  <span className="text-[#848484] text-xs font-medium">
                    {isPointHistory ? "Earned Points:" : "Installed on:"}
                  </span>
                  <span className="font-medium text-xs">
                    {isPointHistory
                      ? item?.points
                      : formatDate(item?.installedDate)}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-[41px] flex items-center mt-[10px]">
              <div className="flex flex-col gap-y-1 border-r border-r-[#e5e5e5] pr-[18px]">
                <span className="text-[10px] font-normal text-[#848484]">
                  {isPointHistory
                    ? "Installed Date & Time"
                    : "Subscribed Date & Time"}
                </span>
                <span className="text-[11px] font-medium">
                  {isPointHistory
                    ? formatDate(item?.installedDate)
                    : formatDate(subscribeDate)}
                </span>
              </div>

              <div className="flex flex-col gap-y-1 pl-[18px]">
                <span className="text-[10px] font-normal text-[#848484]">
                  {isPointHistory ? "Subscribed Date & Time" : clearanceLabel}
                </span>
                <span className="text-[11px] font-medium">
                  {isPointHistory
                    ? formatDate(subscription?.startDate)
                    : formatDate(clearanceDate)}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {data?.length > 0 && (
        <p className="text-center text-gray-500 text-sm mt-3">
          No more data available
        </p>
      )}
    </div>
  );
};


