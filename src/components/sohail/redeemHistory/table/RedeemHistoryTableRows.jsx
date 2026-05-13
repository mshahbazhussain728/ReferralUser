// // src/components/sohail/redeemHistory/table/RedeemHistoryTableRows.jsx

// /* eslint-disable react/prop-types */
// import RedeemHistoryTableRow from "./RedeemHistoryTableRow"; // ← Default import (no curly braces)

// export const RedeemHistoryTableRows = ({ data, onPaymentDetails, onChat }) => {
//   if (!data || data.length === 0) {
//     return null;
//   }
//   return (
//     <div className="overflow-y-visible flex flex-col gap-y-[2px]">
//       {data.map((item) => (
//         <RedeemHistoryTableRow
//           key={item?.id || item?._id || item?.createdAt || Math.random()}
//           item={item}
//           onPaymentDetails={onPaymentDetails}
//           onChat={onChat}
//         />
//       ))}
//     </div>
//   );
// };

// // Memoize the wrapper
// import { memo } from "react";
// export default memo(RedeemHistoryTableRows);


/////


// src/components/sohail/redeemHistory/table/RedeemHistoryTableRows.jsx

/* eslint-disable react/prop-types */
import RedeemHistoryTableRow from "./RedeemHistoryTableRow"; // ← Default import (no curly braces)

export const RedeemHistoryTableRows = ({ data, onPaymentDetails, onChat }) => {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <div className="overflow-y-visible flex flex-col gap-y-[2px]">
      {data.map((item) => (
        <RedeemHistoryTableRow
          key={item?.id || item?._id || item?.createdAt || Math.random()}
          item={item}
          onPaymentDetails={onPaymentDetails}
          onChat={onChat}
        />
      ))}
    </div>
  );
};

// Memoize the wrapper
import { memo } from "react";
export default memo(RedeemHistoryTableRows);