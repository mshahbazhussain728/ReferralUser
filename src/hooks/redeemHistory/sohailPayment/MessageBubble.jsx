// src/components/sohailPayment/MessageBubble.jsx
/* eslint-disable react/prop-types */
import { memo } from "react";
const highlightText = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span
        key={index}
        className="bg-yellow-200 text-black px-1 rounded"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};
export const MessageBubble = ({ msg, searchQuery }) => {
  const isMe = msg.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[65%] rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all ${
          isMe
            ? "bg-[#0F5D63] text-white rounded-br-none"
            : "bg-white text-gray-700 rounded-bl-none shadow"
        }`}
      >
        {msg.imageUrl && (
          <div className="mb-2 rounded-lg overflow-hidden">
            <img
              src={msg.imageUrl}
              alt="Sent image"
              className="max-w-full max-h-[320px] object-contain rounded-lg"
            />
          </div>
        )}
{msg.text && (
  <p className="break-words">
    {highlightText(msg.text, searchQuery)}
  </p>
)}
        <p
          className={`text-[9px] md:text-[10px] mt-1 text-right ${
            isMe ? "text-gray-200" : "text-gray-400"
          }`}
        >
          {msg.time}
        </p>
      </div>
    </div>
  );
};

export default memo(MessageBubble);