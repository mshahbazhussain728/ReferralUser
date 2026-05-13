// src/components/sohailPayment/ChatInput.jsx
/* eslint-disable react/prop-types */
import { Paperclip, Send, X, Loader2 } from "lucide-react";
import { memo } from "react";

export const ChatInput = ({
  messageInput,
  onMessageChange,
  onSendMessage,
  uploadedFile,
  onFileUpload,
  onRemoveFile,
  isUploading,
  isChatClosed,
  triggerFileInput,
  fileInputRef,
  chatStatus,           // ← Already available from parent
}) => {
  const isSuccessful = (chatStatus || "").toLowerCase() === "successful";

  // Disable everything if chat is closed OR status is successful
  const isDisabled = isChatClosed || isSuccessful || isUploading;

  // Cannot type when image is selected or when disabled
  const isInputDisabled = isDisabled || !!uploadedFile;

  const canSend = 
    !isDisabled && 
    (messageInput.trim() || uploadedFile) && 
    !isUploading;

  return (
    <>
      {/* Image Preview Bar */}
      {uploadedFile && (
        <div className="border-t border-gray-200 px-3 sm:px-4 md:px-5 py-2 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-100 rounded">
              <Paperclip size={14} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium truncate max-w-[200px]">
                {uploadedFile.name}
              </p>
              <p className="text-[10px] text-gray-500">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          <button
            onClick={onRemoveFile}
            disabled={isUploading}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={14} className="text-gray-500" />
          </button>
        </div>
      )}

      {/* Main Input Area */}
      <div className="border-t px-3 sm:px-4 md:px-5 py-2.5 md:py-3 flex items-center gap-2 bg-[#FFFFFF] flex-shrink-0">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileUpload}
          className="hidden"
        />

        {/* Attachment Button */}
        <button
          onClick={triggerFileInput}
          disabled={isDisabled}
          className={`p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Paperclip size={18} className="text-gray-500" />
        </button>

        {/* Message Input */}
        <input
          placeholder={
            isSuccessful 
              ? "This chat is successful - cannot send messages" 
              : uploadedFile 
              ? "Image selected - cannot type text" 
              : "Type here"
          }
          value={messageInput}
          onChange={onMessageChange}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          className={`flex-1 outline-none text-xs sm:text-sm px-4 py-2.5 bg-[#F4F4F4] rounded-full min-w-0 transition-all ${
            isInputDisabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={isInputDisabled}
        />

        {/* Send Button / Loader */}
        <button
          onClick={onSendMessage}
          disabled={!canSend}
          className={`p-2.5 rounded-full transition-all flex-shrink-0 flex items-center justify-center w-10 h-10 ${
            canSend 
              ? "bg-[#6C2BD9] hover:bg-[#5a24b5]" 
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isUploading ? (
            <Loader2 size={18} className="text-white animate-spin" />
          ) : (
            <Send size={16} className="text-white" />
          )}
        </button>
      </div>
    </>
  );
};

export default memo(ChatInput);