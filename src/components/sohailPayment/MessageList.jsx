// // src/components/sohailPayment/MessageList.jsx
// /* eslint-disable react/prop-types */
// import { MessageBubble } from "./MessageBubble";
// import React from "react";
// import { memo } from "react";
// import { Loader2 } from "lucide-react";

// export const MessageList = ({
//   filteredMessages,
//   searchQuery,
//   formatMessageDate,
//   isLoading = false,        // ← New prop for loading state
// }) => {
//   // Show professional loading state
//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center py-20 gap-3">
//         <Loader2 size={28} className="text-[#055860] animate-spin" />
//         <p className="text-sm text-gray-500">Loading chat history...</p>
//       </div>
//     );
//   }

//   // Show messages when available
//   if (filteredMessages.length > 0) {
//     return (
//       <>
//         {Object.entries(
//           filteredMessages.reduce((groups, msg) => {
//             let date = new Date();
//             if (msg.createdAt) date = new Date(msg.createdAt);
//             else if (msg.time)
//               date = new Date(new Date().toDateString() + " " + msg.time);

//             const dateKey = date.toISOString().split("T")[0];

//             if (!groups[dateKey]) groups[dateKey] = [];
//             groups[dateKey].push(msg);
//             return groups;
//           }, {}),
//         )
//           .sort(([a], [b]) => a.localeCompare(b))
//           .map(([dateKey, messages]) => {
//             const displayDate = formatMessageDate(dateKey);

//             return (
//               <React.Fragment key={dateKey}>
//                 <div
//                   data-date={displayDate}
//                   className="flex justify-center my-2 md:my-2"
//                 >
//                   <div className="bg-[#FFFFFF] text-[#6c6c6c] text-[10px] md:text-xs px-5 py-1 rounded-full shadow-sm border border-gray-100 font-medium">
//                     {displayDate}
//                   </div>
//                 </div>

//                 {messages.map((msg) => (
//                   <div key={msg.id} id={`msg-${msg.id}`}>
//                     <MessageBubble msg={msg} searchQuery={searchQuery} />
//                   </div>
//                 ))}
//               </React.Fragment>
//             );
//           })}
//       </>
//     );
//   }

//   // No messages found after loading
//   if (searchQuery) {
//     return (
//       <div className="text-center py-16 text-gray-500 text-sm">
//         No messages found for{" "}
//         <span className="font-medium text-gray-600">{searchQuery}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="text-center py-16 text-gray-400 text-sm">
//       No messages yet
//     </div>
//   );
// };

// export default memo(MessageList);


////


// src/components/sohailPayment/MessageList.jsx
/* eslint-disable react/prop-types */
import { MessageBubble } from "./MessageBubble";
import React from "react";
import { memo } from "react";
import { Loader2 } from "lucide-react";

export const MessageList = ({
  filteredMessages,
  searchQuery,
  formatMessageDate,
  isLoading = false,        // ← New prop for loading state
}) => {
  // Show professional loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-20 gap-3">
        <Loader2 size={28} className="text-[#055860] animate-spin" />
        <p className="text-sm text-gray-500">Loading chat history...</p>
      </div>
    );
  }

  // Show messages when available
  if (filteredMessages.length > 0) {
    return (
      <>
        {Object.entries(
          filteredMessages.reduce((groups, msg) => {
            let date = new Date();
            if (msg.createdAt) date = new Date(msg.createdAt);
            else if (msg.time)
              date = new Date(new Date().toDateString() + " " + msg.time);

            const dateKey = date.toISOString().split("T")[0];

            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(msg);
            return groups;
          }, {}),
        )
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([dateKey, messages]) => {
            const displayDate = formatMessageDate(dateKey);

            return (
              <React.Fragment key={dateKey}>
                <div
                  data-date={displayDate}
                  className="flex justify-center my-2 md:my-2"
                >
                  <div className="bg-[#FFFFFF] text-[#6c6c6c] text-[10px] md:text-xs px-5 py-1 rounded-full shadow-sm border border-gray-100 font-medium">
                    {displayDate}
                  </div>
                </div>

                {messages.map((msg) => (
                  <div key={msg.id} id={`msg-${msg.id}`}>
                    <MessageBubble msg={msg} searchQuery={searchQuery} />
                  </div>
                ))}
              </React.Fragment>
            );
          })}
      </>
    );
  }

  // No messages found after loading
  if (searchQuery) {
    return (
      <div className="text-center py-16 text-gray-500 text-sm">
        No messages found for{" "}
        <span className="font-medium text-gray-600">{searchQuery}</span>
      </div>
    );
  }

  return (
    <div className="text-center py-16 text-gray-400 text-sm">
      No messages yet
    </div>
  );
};

export default memo(MessageList);