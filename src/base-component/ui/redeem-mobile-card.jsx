
/* eslint-disable react/prop-types */
import { getRedeemStatusStyles } from "../../utils/utility";

export const RedeemMobileCard = ({
  data,
  onClick,
  onChat,
  currentPage,
  totalPages,
}) => {
  const isLastPage = totalPages > 0 && currentPage === totalPages;

  return (
    <div className="flex flex-col gap-y-3">
      {data?.map((item, index) => {
        const { bg, text } = getRedeemStatusStyles(item?.status);
        const statusLabel =
          item?.status === "inProgress" ? "In Progress" : item?.status;

        const statusLower = (item?.status || "").toLowerCase().trim();
        const canOpen =
          statusLower === "successful" ||
          statusLower === "inprogress" ||
          statusLower === "in progress";

        const showRedDot =
          statusLower === "inprogress" || statusLower === "in progress";

        const chatBgClass = canOpen
          ? "bg-[#009F44] hover:bg-[#008737]"
          : "bg-[#BABABA] hover:bg-[#a8a8a8] cursor-not-allowed opacity-60";

        return (
          <div
            key={index}
            onClick={() =>
              onClick(
                item?.createdAt,
                item?.points,
                item?.approvedDate,
                item?.paymentMethod,
                item?.paymentDate,
                item?.status,
              )
            }
            className="cursor-pointer p-[18px] rounded-[12px] bg-white shadow-md flex items-center justify-between"
          >
            <div className="flex flex-col gap-y-2">
              {/* ... your existing left side content ... */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#000000]">
                  Redeemed :{" "}
                  {new Date(item?.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <span className="text-xs text-[#000000] mt-1 text-center w-full">
                  {new Date(item?.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-x-1">
                <span className="text-xs font-medium text-[#848484]">
                  Redeemed Points
                </span>
                <span className="text-xs font-medium text-primary">
                  {item?.points}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-y-2">
              <div
                className={`px-[4.5px] py-[2.5px] min-w-[61px] max-w-[61px] rounded-[3px] text-center ${bg} ${text}`}
              >
                <span className={`text-[10px] font-medium`}>{statusLabel}</span>
              </div>

              {/* FIXED: Explicitly pass status along with item */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!canOpen) return;
                  
                  // Call onChat with full item (it already includes status)
                  onChat?.(item);
                }}
                disabled={!canOpen}
                className={`
                  relative px-4 py-1.5 text-white rounded-md text-xs font-medium 
                  transition-colors inline-block text-center min-w-[61px]
                  ${chatBgClass}
                `}
              >
                Chat
                
              </button>
            </div>
          </div>
        );
      })}

      {isLastPage && data?.length > 0 && (
        <p className="text-center text-gray-500 text-sm mt-3">
          No more data available
        </p>
      )}
    </div>
  );
};