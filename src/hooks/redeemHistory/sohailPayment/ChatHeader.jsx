/* eslint-disable react/prop-types */

import { Search, X} from "lucide-react";
import { memo, useMemo } from "react";

export const ChatHeader = ({
  chatUser,
  isChatClosed,
    isOnline = false,   // ✅ ADD THIS

  searchQuery,
  onSearchChange,
  formatLastSeen,
  chatStatus,
 
  isTyping = false,           // ✅ New Prop
}) => {
  const statusStyles = useMemo(() => {
    const statusLower = (chatStatus || "").toLowerCase().trim();

    let bgColor = "bg-gray-200";
    let textColor = "text-gray-600";
    let displayText = "Pending";

    if (statusLower === "successful") {
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      displayText = "Successful";
    } else if (statusLower === "inprogress" || statusLower === "in progress") {
      bgColor = "bg-[#F2994A33]";
      textColor = "text-[#F2994A]";
      displayText = "In Progress";
    } else if (statusLower === "pending" || statusLower === "cancelled") {
      bgColor = "bg-gray-200";
      textColor = "text-gray-600";
      displayText = statusLower === "cancelled" ? "Cancelled" : "Pending";
    }

    return { bgColor, textColor, displayText };
  }, [chatStatus]);

  return (
    <div className="bg-white border-b lg:rounded-t-xl shadow-sm px-3 sm:px-4 md:px-5 py-3 md:py-4 w-full">
      {/* Main Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          <img
            src={chatUser.avatar}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0 object-cover border border-gray-200"
            alt={chatUser.name}
            onError={(e) => {
              e.target.src =
                "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-xs md:text-sm truncate">
              {chatUser.name}
            </p>
            
            {/* ✅ Updated Last Seen + Typing Indicator */}
            <p className="text-[10px] md:text-xs flex items-center gap-1">
  {isTyping ? (
    <span className="text-blue-500 font-medium">typing...</span>
  ) : isOnline ? (
    <span className="text-green-500 flex items-center gap-1 font-medium">
      <span className="text-[12px] leading-none">●</span> Online
    </span>
  ) : (
    <span className="text-gray-400">
      {formatLastSeen()}
    </span>
  )}
</p>
          </div>

          {isChatClosed && (
            <span className="text-[10px] sm:text-xs text-gray-700 font-medium whitespace-nowrap">
              Closed
            </span>
          )}
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-auto sm:min-w-[240px]">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 hover:border-[#055860] focus-within:border-[#055860] bg-white">
            <Search size={16} className="text-gray-500 flex-shrink-0" />

            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 outline-none text-sm bg-transparent placeholder-gray-400"
            />

     

            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Status Section */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] md:text-xs text-[#055860] font-bold">
              Status
            </p>
            <p className="text-[10px] md:text-xs text-gray-500">
              Your status {chatStatus}
            </p>
          </div>
          <div>
            <p
              className={`inline-block text-[10px] md:text-xs font-medium px-3 py-1 ${statusStyles.textColor} ${statusStyles.bgColor}`}
            >
              {statusStyles.displayText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatHeader);