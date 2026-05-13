// src/components/sohail/redeemHistory/table/RedeemHistoryTableRow.jsx

/* eslint-disable react/prop-types */
import { RedeemChatButton } from "./RedeemChatButton";
import { memo } from "react";

export const RedeemHistoryTableRow = ({ item, onPaymentDetails, onChat }) => {
  const handleStatusClick = () => {
    onPaymentDetails?.(
      item?.createdAt,
      item?.points,
      item?.approvedDate,
      item?.paymentMethod,
      item?.paymentDate,
      item?.status
    );
  };


  // ✅ Status styling logic
  const statusLower = (item?.status || "").toLowerCase().trim();

  let statusTextColor = "";
  let statusBgColor = "";

  if (statusLower === "inprogress" || statusLower === "in progress") {
    statusTextColor = "text-[#F2994A]";
    statusBgColor = "bg-[#F2994A33]";
  } else if (statusLower === "pending") {
    statusTextColor = "text-[#2F80ED]";
    statusBgColor = "bg-[#2F80ED26]";
  } else if (statusLower === "successful") {
    statusTextColor = "text-[#05B035]";
    statusBgColor = "bg-[#05B03526]";
  } else if (statusLower === "cancelled") {
    statusTextColor = "text-[#E80000]";
    statusBgColor = "bg-[#E8000026]";
  }

  return (
    <div className="bg-[#FFFFFF]  rounded-[5px] py-[26px] px-10 grid grid-cols-[minmax(170px,_3fr)_minmax(170px,_3fr)_minmax(170px,_3fr)_minmax(170px,_170px)] items-center">
 {/* Date */}
<span className="flex flex-col">
  {/* Date (left aligned) */}
  <span className="text-sm font-medium text-[#000000]">
    Redeemed : {new Date(item?.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })}
  </span>

  {/* Time (centered only) */}
  <span className="text-xs text-[#000000] mt-1  pl-12 w-full">
    {new Date(item?.createdAt).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}
  </span>
</span>

      {/* Points */}
      <span className="text-base font-medium flex items-center justify-center">
        {item?.points}
      </span>

      {/* Chat Button */}
      <RedeemChatButton item={item} onChat={onChat} />

      {/* Status */}
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={handleStatusClick}
      >
        <div
          className={`px-[9.2px] py-[5px] min-w-[77px] max-w-[87px] text-center ${statusBgColor}`}
        >
          <span className={`text-xs capitalize font-medium ${statusTextColor}`}>
            {item?.status}
          </span>
        </div>
      </div>
    </div>
  );
};

// ✅ Memoized + Default Export
export default memo(RedeemHistoryTableRow);