



// import { useEffect, useState } from "react";
// import { getStatusStyles } from "../../../utils/utility";
// import { formatDate } from "../../../utils/function";

// export const CouponHistoryTableRows = ({ data }) => {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // Update current time every minute to check for expired coupons
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000); // Check every 60 seconds (1 minute)

//     return () => clearInterval(interval);
//   }, []);

//   // Function to check if coupon is expired
//   const getCouponStatus = (item) => {
//     const expiryDate = new Date(item?.expiryDate);
    
//     // If expiry date has passed, return "expired"
//     if (expiryDate < currentTime) {
//       return "expired";
//     }
    
//     // Otherwise return the status from API
//     return item?.status;
//   };

//   return (
//     <div className={`overflow-y-visible flex flex-col gap-y-[10px]`}>
//       {data?.map((item, index) => {
//         const actualStatus = getCouponStatus(item);
//         const { bg, text } = getStatusStyles(actualStatus);
        
//         return (
//           <div
//             key={index}
//             className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[26px] px-10 grid grid-cols-[minmax(120px,_2fr)_minmax(150px,_3fr)_minmax(150px,_3fr)_minmax(150px,_3fr)_minmax(100px,_1fr)_minmax(120px,_2fr)] items-center"
//           >
//             <span className="text-base font-medium capitalize">{item?.type}</span>

//             <span className="text-base font-medium flex items-center justify-center">
//               {item?.coupon}
//             </span>

//             <span className="text-base font-medium flex items-center justify-center">
//               {formatDate(item?.createdAt)}
//             </span>

//             <span className="text-base font-medium flex items-center justify-center ml-3">
//               {formatDate(item?.expiryDate)}
//             </span>

//             <span className="text-base font-medium flex items-center justify-center">
//               {item?.points}
//             </span>

//             <div className="flex items-center justify-center">
//               <div
//                 className={`px-2 py-[5px] min-w-[77px] max-w-[77px] rounded-[3px] text-center cursor-pointer ${bg}`}
//               >
//                 <span className={`text-xs font-medium capitalize ${text}`}>
//                   {actualStatus}
//                 </span>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };



///remove below



import { getStatusStyles } from "../../../utils/utility";
import { formatDate } from "../../../utils/function";

export const CouponHistoryTableRows = ({ data }) => {

  const getActualStatus = (item) => {
    const expiryDate = new Date(item?.expiryDate);
    const now = new Date();

    // If coupon already redeemed
    if (item?.status === "redeemed") {
      return "redeemed";
    }

    // If expiry date passed
    if (expiryDate < now) {
      return "expired";
    }

    // Otherwise keep API status
    return item?.status || "active";
  };

  return (
    <div className="overflow-y-visible flex flex-col gap-y-[10px]">
      {data?.map((item, index) => {
        const actualStatus = getActualStatus(item);
        const { bg, text } = getStatusStyles(actualStatus);

        return (
          // <div
          //   key={index}
          //   className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[26px] px-10 grid grid-cols-[minmax(120px,_2fr)_minmax(150px,_3fr)_minmax(150px,_3fr)_minmax(150px,_3fr)_minmax(100px,_1fr)_minmax(120px,_2fr)] items-center"
          // >

<div
  key={index}
  className="bg-white hover:bg-tableHoverColor rounded-[5px] py-[26px] px-10 grid grid-cols-[minmax(100px,_2fr)_minmax(100px,_3fr)_minmax(150px,_3fr)_minmax(150px,_3fr)_minmax(100px,_1fr)_minmax(120px,_2fr)] items-center gap-x-4"
>

            <span className="text-base font-medium capitalize">
              {item?.type}
            </span>

            <span className="text-base font-medium flex items-center justify-center ml-[-60px]">
              {item?.coupon}
            </span>

            <span className="text-base font-medium flex items-center justify-center whitespace-nowrap">
              {formatDate(item?.createdAt)}
            </span>

            <span className="text-base font-medium flex items-center justify-center whitespace-nowrap ml-[45px]">
              {formatDate(item?.expiryDate)}
            </span>

            <span className="text-base font-medium flex items-center justify-center ml-5">
              {item?.points}
            </span>

            <div className="flex items-center justify-center">
              <div
                className={`px-2 py-[5px] min-w-[77px] max-w-[77px] rounded-[3px] text-center ${bg}`}
              >
                <span className={`text-xs font-medium capitalize ${text}`}>
                  {actualStatus}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};