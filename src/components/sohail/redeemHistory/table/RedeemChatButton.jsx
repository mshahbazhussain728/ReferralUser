// // src/components/redeemHistory/table/RedeemChatButton.jsx
// /* eslint-disable react/prop-types */
// import { useMemo } from "react";

// export const RedeemChatButton = ({ item, onChat }) => {
//   const statusLower = (item?.status || "").toLowerCase().trim();

//   const { bgColor, canOpen, showRedDot } = useMemo(() => {
//     let bgColor = "#BABABA";
//     let canOpen = false;
//     let showRedDot = false;

//     if (statusLower === "successful") {
//       bgColor = "#009F44";
//       canOpen = true;
//     } else if (statusLower === "inprogress" || statusLower === "in progress") {
//       bgColor = "#009F44";
//       canOpen = true;
//       showRedDot = true; // ✅ always show red dot for in progress
//     } else if (statusLower === "pending" || statusLower === "cancelled") {
//       bgColor = "#BABABA";
//       canOpen = false;
//     }

//     return { bgColor, canOpen, showRedDot };
//   }, [statusLower]);

//   const disabledClass = !canOpen ? "cursor-not-allowed opacity-60" : "";

//   const handleClick = () => {
//     if (canOpen && onChat) {
//       onChat(item);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center relative">
//       <button
//         onClick={handleClick}
//         disabled={!canOpen}
//         className={`
//           relative px-4 py-2 text-white rounded-md text-sm font-semibold 
//           transition-colors inline-block
//           ${
//             bgColor === "#009F44"
//               ? "bg-[#009F44] hover:bg-[#008737]"
//               : "bg-[#BABABA] hover:bg-[#a8a8a8]"
//           }
//           ${disabledClass}
//         `}
//       >
//         Chat

//         {showRedDot && (
//           <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white" />
//         )}
//       </button>
//     </div>
//   );
// };


///

// src/components/redeemHistory/table/RedeemChatButton.jsx
/* eslint-disable react/prop-types */
import { useMemo } from "react";

export const RedeemChatButton = ({ item, onChat }) => {
  const statusLower = (item?.status || "").toLowerCase().trim();

  const { bgColor, canOpen, showRedDot } = useMemo(() => {
    let bgColor = "#BABABA";
    let canOpen = false;
    let showRedDot = false;

    if (statusLower === "successful") {
      bgColor = "#009F44";
      canOpen = true;
    } else if (statusLower === "inprogress" || statusLower === "in progress") {
      bgColor = "#009F44";
      canOpen = true;
      showRedDot = true; // ✅ always show red dot for in progress
    } else if (statusLower === "pending" || statusLower === "cancelled") {
      bgColor = "#BABABA";
      canOpen = false;
    }

    return { bgColor, canOpen, showRedDot };
  }, [statusLower]);

  const disabledClass = !canOpen ? "cursor-not-allowed opacity-60" : "";

  const handleClick = () => {
    if (canOpen && onChat) {
      onChat(item);
    }
  };

  return (
    <div className="flex items-center justify-center relative">
      <button
        onClick={handleClick}
        disabled={!canOpen}
        className={`
          relative px-4 py-2 text-white rounded-md text-sm font-semibold 
          transition-colors inline-block
          ${
            bgColor === "#009F44"
              ? "bg-[#009F44] hover:bg-[#008737]"
              : "bg-[#BABABA] hover:bg-[#a8a8a8]"
          }
          ${disabledClass}
        `}
      >
        Chat

        {showRedDot && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white" />
        )}
      </button>
    </div>
  );
};