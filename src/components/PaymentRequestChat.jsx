// // import React, {
// //   useState,
// //   useRef,
// //   useEffect,
// //   useCallback,
// //   useMemo,
// // } from "react";
// // import { useLocation } from "react-router-dom";
// // import { Menu } from "lucide-react";
// // import { SideBar } from "../base-component/Sidebar.jsx";
// // import io from "socket.io-client";
// // import Cookies from "js-cookie";
// // import { ChatHeader } from "./sohailPayment/ChatHeader";
// // import { MessageList } from "./sohailPayment/MessageList";
// // import { ChatInput } from "./sohailPayment/ChatInput";

// // const SOCKET_URL = "https://apis.famocare.com";
// // const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
// // const DEFAULT_AVATAR =
// //   "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
// // const UPLOADS_BASE = "https://apis.famocare.com/uploads/";

// // // ==================== SCROLL TO BOTTOM ICON ====================
// // export const ScrollToBottomIcon = ({ iconClassName = "#9E9E9E" }) => {
// //   return (
// //     <svg
// //       width="20"
// //       height="20"
// //       viewBox="0 0 20 20"
// //       fill="none"
// //       xmlns="http://www.w3.org/2000/svg"
// //     >
// //       <path
// //         d="M3 6L10 14L17 6"
// //         stroke={iconClassName}
// //         strokeWidth="3"
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //       />
// //     </svg>
// //   );
// // };

// // const buildImageUrl = (raw) => {
// //   if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
// //   const s = raw.trim();
// //   if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) {
// //     return DEFAULT_AVATAR;
// //   }
// //   if (
// //     s.startsWith("http://") ||
// //     s.startsWith("https://") ||
// //     s.startsWith("data:")
// //   ) {
// //     return s;
// //   }
// //   return UPLOADS_BASE + s;
// // };

// // const PaymentRequestChat = ({
// //   currentUserId,
// //   receiverId: propReceiverId,
// //   managerId: propManagerId,
// //   chatUserData: propChatUserData,
// // }) => {
// //   const location = useLocation();
// //   const passedState = location.state || {};

// //   // ==================== STATE ====================
// //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// //   const [messageInput, setMessageInput] = useState("");
// //   const [chatMessages, setChatMessages] = useState([]);
// //   const [uploadedFile, setUploadedFile] = useState(null);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [isChatClosed, setIsChatClosed] = useState(false);
// //   const [isTyping, setIsTyping] = useState(false);
// //   const [isOnline, setIsOnline] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [filteredMessages, setFilteredMessages] = useState([]);
// //   const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
// //   const [matchedIndexes, setMatchedIndexes] = useState([]);
// //   const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
// //   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
// //   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
// //   const [chatStatus, setChatStatus] = useState("in progress");
// //   const [managerData, setManagerData] = useState(null);

// //   // ==================== REFS ====================
// //   const fileInputRef = useRef(null);
// //   const messagesEndRef = useRef(null);
// //   const socketRef = useRef(null);
// //   const typingTimeoutRef = useRef(null);
// //   const scrollContainerRef = useRef(null);

// //   // ==================== IDs ====================
// //   const user = JSON.parse(Cookies.get("referralUser") || "{}");
// //   const finalUserId = currentUserId || user?.id;

// //   const receiverId =
// //     passedState.receiverId ||
// //     propReceiverId ||
// //     passedState.managerId ||
// //     passedState.userId;

// //   const managerId = passedState.managerId || propManagerId;

// //   const redeemId =
// //     passedState.redeemId ||
// //     passedState.id ||
// //     passedState.redeemItem?.id ||
// //     location.state?.redeemId ||
// //     location.state?.id;

// //   // Set initial chat status from navigation state
// //   useEffect(() => {
// //     const initialStatus = passedState.status || "in progress";
// //     setChatStatus(initialStatus);
// //   }, [passedState.status]);

// //   // Auto close chat when resolved
// //   useEffect(() => {
// //     if (chatStatus === "resolved") {
// //       setIsChatClosed(true);
// //     } else {
// //       setIsChatClosed(false);
// //     }
// //   }, [chatStatus]);

// //   // ==================== MANAGER DATA ====================
// //   useEffect(() => {
// //     const data =
// //       passedState.managerData ||
// //       passedState.chatUserData?.manager ||
// //       propChatUserData?.manager ||
// //       propChatUserData;

// //     if (data?.name) {
// //       setManagerData(data);
// //     }
// //   }, [passedState, propChatUserData]);

// //   const chatUser = useMemo(
// //     () => ({
// //       name: managerData?.name || "Manager",
// //       avatar: buildImageUrl(managerData?.imageUrl),
// //       id: managerData?.id,
// //       lastSeen: managerData?.lastSeen,
// //     }),
// //     [managerData],
// //   );

// //   // ==================== FORMATTERS ====================
// //   const formatTime = useCallback((date) => {
// //     return new Date(date).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   }, []);

// //   const formatLastSeen = useCallback(() => {
// //     if (isOnline === null) return "Checking...";
// //     if (isOnline) return "Active now";

// //     if (managerData?.lastSeen) {
// //       const date = new Date(managerData.lastSeen);
// //       const now = new Date();

// //       const isToday = date.toDateString() === now.toDateString();
// //       const yesterday = new Date(now);
// //       yesterday.setDate(yesterday.getDate() - 1);
// //       const isYesterday = date.toDateString() === yesterday.toDateString();

// //       let time = date.toLocaleTimeString([], {
// //         hour: "numeric",
// //         minute: "2-digit",
// //         hour12: true,
// //       });

// //       time = time.replace(/am$/i, "AM").replace(/pm$/i, "PM");

// //       if (isToday) return `Last seen today at ${time}`;
// //       if (isYesterday) return `Last seen yesterday at ${time}`;

// //       return `Last seen on ${date.toLocaleDateString()} at ${time}`;
// //     }

// //     return "Last seen recently";
// //   }, [isOnline, managerData]);

// //   const formatMessageDate = useCallback((dateKey) => {
// //     const date = new Date(dateKey);
// //     const today = new Date();
// //     const yesterday = new Date(today);
// //     yesterday.setDate(today.getDate() - 1);

// //     if (date.toDateString() === today.toDateString()) return "Today";
// //     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

// //     return date.toLocaleDateString("en-US", {
// //       weekday: "long",
// //       month: "long",
// //       day: "numeric",
// //     });
// //   }, []);

// //   const statusStyles = useMemo(() => {
// //     switch (chatStatus) {
// //       case "resolved":
// //         return {
// //           bgColor: "bg-green-100",
// //           textColor: "text-green-600",
// //           displayText: "RESOLVED",
// //         };
// //       case "unresolved":
// //         return {
// //           bgColor: "bg-red-100",
// //           textColor: "text-red-600",
// //           displayText: "UNRESOLVED",
// //         };
// //       default:
// //         return {
// //           bgColor: "bg-[#E0E0E0]",
// //           textColor: "text-[#3887FD]",
// //           displayText: "IN PROGRESS",
// //         };
// //     }
// //   }, [chatStatus]);

// //   // ==================== SCROLL HELPERS ====================
// //   const scrollToBottom = useCallback(() => {
// //     messagesEndRef.current?.scrollIntoView({
// //       behavior: "smooth",
// //       block: "end",
// //     });
// //   }, []);

// //   // ==================== SCROLL + BUTTON LOGIC ====================
// //   useEffect(() => {
// //     const container = scrollContainerRef.current;
// //     if (!container) return;

// //     const handleScroll = () => {
// //       const { scrollTop, scrollHeight, clientHeight } = container;
// //       const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
// //       const hasScroll = scrollHeight > clientHeight;

// //       if (hasScroll) {
// //         setShowScrollToBottom(distanceFromBottom > 100);
// //       } else {
// //         setShowScrollToBottom(chatMessages.length > 8);
// //       }
// //     };

// //     container.addEventListener("scroll", handleScroll, { passive: true });
// //     setTimeout(handleScroll, 200);

// //     return () => {
// //       container.removeEventListener("scroll", handleScroll);
// //     };
// //   }, [chatMessages]);

// //   // ==================== AUTO SCROLL ====================
// //   useEffect(() => {
// //     if (isLoadingHistory || chatMessages.length === 0) return;

// //     const container = scrollContainerRef.current;
// //     if (!container) return;

// //     const distanceFromBottom =
// //       container.scrollHeight - (container.scrollTop + container.clientHeight);
// //     const isNearBottom = distanceFromBottom < 80;

// //     if (!hasInitialScrollDone) {
// //       setTimeout(() => {
// //         scrollToBottom();
// //         setHasInitialScrollDone(true);
// //       }, 100);
// //       return;
// //     }

// //     if (isNearBottom) {
// //       setTimeout(() => {
// //         scrollToBottom();
// //       }, 100);
// //     }
// //   }, [chatMessages.length, isLoadingHistory, hasInitialScrollDone, scrollToBottom]);

// //   // Reset state when switching redeem requests
// //   useEffect(() => {
// //     setChatMessages([]);
// //     setFilteredMessages([]);
// //     setSearchQuery("");
// //     setHasInitialScrollDone(false);
// //     setIsLoadingHistory(true);
// //   }, [redeemId]);

// //   // ====================== SOCKET SETUP ======================
// //   useEffect(() => {
// //     if (!finalUserId || !receiverId || !redeemId) return;

// //     socketRef.current?.disconnect();

// //     const socket = io(SOCKET_URL, {
// //       auth: { userId: finalUserId },
// //       transports: ["websocket", "polling"],
// //       reconnection: true,
// //       reconnectionAttempts: 10,
// //       reconnectionDelay: 1000,
// //     });

// //     socketRef.current = socket;

// //     const roomPayload = { senderId: finalUserId, receiverId, redeemId };

// //     socket.emit("joinChat", roomPayload);
// //     socket.emit("fetchMessages", roomPayload);
// //     socket.emit("markAllMessagesAsRead", {
// //       senderId: receiverId,
// //       receiverId: finalUserId,
// //       redeemId,
// //       readerId: finalUserId,
// //     });
// //     socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
// //     socket.emit("userOnline", { userId: finalUserId, senderType: "user" });
// //     socket.emit("updateLastSeen", { userId: finalUserId, senderType: "user" });

// //     const statusInterval = setInterval(() => {
// //       socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
// //     }, 8000);

// //     socket.on("previousMessages", (messages) => {
// //       const formatted = (messages || []).map((msg) => ({
// //         id: msg.id,
// //         text: msg.messageType === "image" ? "" : msg.message || "",
// //         time: formatTime(msg.createdAt),
// //         createdAt: msg.createdAt,
// //         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
// //         messageType: msg.messageType || "text",
// //         imageUrl: msg.messageType === "image" ? msg.message : null,
// //       }));

// //       setChatMessages(formatted);
// //       setIsLoadingHistory(false);
// //     });

// //     socket.on("receiveMessage", (msg) => {
// //       const formatted = {
// //         id: msg.id,
// //         text: msg.messageType === "image" ? "" : msg.message || "",
// //         time: formatTime(msg.createdAt),
// //         createdAt: msg.createdAt,
// //         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
// //         messageType: msg.messageType || "text",
// //         imageUrl: msg.messageType === "image" ? msg.message : null,
// //       };

// //       setChatMessages((prev) => {
// //         if (prev.some((m) => m.id === formatted.id)) return prev;
// //         return [...prev, formatted];
// //       });
// //     });

// //     socket.on("userTyping", ({ senderId }) => {
// //       if (String(senderId) === String(receiverId)) setIsTyping(true);
// //     });

// //     socket.on("userStoppedTyping", ({ senderId }) => {
// //       if (String(senderId) === String(receiverId)) setIsTyping(false);
// //     });

// //     socket.on("chatStatusUpdated", (data) => {
// //       if (String(data?.redeemId) === String(redeemId)) {
// //         setChatStatus(data.status);
// //         if (data.status === "resolved") {
// //           setIsChatClosed(true);
// //         }
// //       }
// //     });

// //     socket.on("userStatusChanged", (data) => {
// //       if (String(data?.userId) === String(receiverId)) {
// //         const isNowOnline = data.status === "online";
// //         setIsOnline(isNowOnline);
// //         if (data.lastSeen) {
// //           setManagerData((prev) =>
// //             prev ? { ...prev, lastSeen: data.lastSeen } : prev,
// //           );
// //         }
// //       }
// //     });

// //     socket.on("connect", () => {
// //       socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
// //     });

// //     return () => {
// //       clearInterval(statusInterval);
// //       socket.disconnect();
// //     };
// //   }, [finalUserId, receiverId, redeemId, formatTime]);

// //   // ====================== SEARCH ======================
// //   useEffect(() => {
// //     if (!searchQuery.trim()) {
// //       setFilteredMessages(chatMessages);
// //       setMatchedIndexes([]);
// //       setCurrentMatchIndex(0);
// //       return;
// //     }

// //     const query = searchQuery.toLowerCase().trim();
// //     const indexes = [];
// //     const filtered = chatMessages.filter((msg, index) => {
// //       const match = (msg.text || "").toLowerCase().includes(query);
// //       if (match) indexes.push(index);
// //       return match;
// //     });

// //     setFilteredMessages(filtered);
// //     setMatchedIndexes(indexes);
// //     setCurrentMatchIndex(0);
// //   }, [searchQuery, chatMessages]);

// //   useEffect(() => {
// //     if (matchedIndexes.length === 0) return;
// //     const index = matchedIndexes[currentMatchIndex];
// //     const el = document.querySelector(`[data-msg-index="${index}"]`);
// //     if (el) {
// //       el.scrollIntoView({ behavior: "smooth", block: "center" });
// //     }
// //   }, [currentMatchIndex, matchedIndexes]);

// //   // ====================== HANDLERS ======================
// //   const uploadAndSendFile = useCallback(
// //     async (file, accompanyingText = "") => {
// //       if (!file || isUploading) return;

// //       setIsUploading(true);
// //       const formData = new FormData();
// //       formData.append("image", file);

// //       try {
// //         const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
// //         const result = await res.json();

// //         if (result.success && result.data?.imageUrl) {
// //           socketRef.current?.emit("sendMessage", {
// //             senderId: finalUserId,
// //             receiverId,
// //             redeemId,
// //             message: accompanyingText || result.data.imageUrl,
// //             senderType: "user",
// //             messageType: "image",
// //             managerId,
// //           });
// //         } else {
// //           alert("Failed to upload image. Please try again.");
// //         }
// //       } catch (error) {
// //         alert("Error uploading image");
// //       } finally {
// //         setIsUploading(false);
// //         setUploadedFile(null);
// //         if (fileInputRef.current) fileInputRef.current.value = "";
// //       }
// //     },
// //     [finalUserId, receiverId, redeemId, managerId, isUploading],
// //   );

// //   const handleSendMessage = useCallback(() => {
// //     if (isChatClosed || isUploading || (!messageInput.trim() && !uploadedFile)) {
// //       return;
// //     }

// //     if (uploadedFile) {
// //       uploadAndSendFile(uploadedFile, messageInput.trim());
// //     } else {
// //       socketRef.current?.emit("sendMessage", {
// //         senderId: finalUserId,
// //         receiverId,
// //         redeemId,
// //         message: messageInput.trim(),
// //         senderType: "user",
// //         messageType: "text",
// //         managerId,
// //       });
// //     }

// //     setMessageInput("");
// //   }, [
// //     messageInput, uploadedFile, isChatClosed, isUploading,
// //     finalUserId, receiverId, redeemId, managerId, uploadAndSendFile,
// //   ]);

// //   const handleFileUpload = useCallback(
// //     (e) => {
// //       if (isUploading) return;
// //       const file = e.target.files?.[0];
// //       if (file) {
// //         setUploadedFile(file);
// //         setMessageInput("");
// //       }
// //     },
// //     [isUploading],
// //   );

// //   const triggerFileInput = useCallback(() => {
// //     if (!isUploading) fileInputRef.current?.click();
// //   }, [isUploading]);

// //   const removeUploadedFile = useCallback(() => {
// //     setUploadedFile(null);
// //     if (fileInputRef.current) fileInputRef.current.value = "";
// //   }, []);

// //   const handleInputChange = useCallback(
// //     (e) => {
// //       if (isUploading || uploadedFile) {
// //         setMessageInput("");
// //         return;
// //       }

// //       const value = e.target.value;
// //       setMessageInput(value);

// //       if (socketRef.current) {
// //         socketRef.current.emit("typing", { senderId: finalUserId, receiverId, redeemId });

// //         if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

// //         typingTimeoutRef.current = setTimeout(() => {
// //           socketRef.current?.emit("stopTyping", {
// //             senderId: finalUserId,
// //             receiverId,
// //             redeemId,
// //           });
// //         }, 1800);
// //       }
// //     },
// //     [finalUserId, receiverId, redeemId, isUploading, uploadedFile],
// //   );

// //   useEffect(() => {
// //     return () => {
// //       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
// //     };
// //   }, []);

// //   // ====================== RENDER ======================
// //   return (
// //     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
// //       {/* Sidebar */}
// //       <div className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}>
// //         <SideBar
// //           isDrawer={isDrawerOpen}
// //           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
// //         />
// //       </div>

// //       {isDrawerOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
// //           onClick={() => setIsDrawerOpen(false)}
// //         />
// //       )}

// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
// //         {/* Mobile Purple Header */}
// //         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
// //               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
// //             >
// //               <Menu size={18} className="text-[#691188]" />
// //             </button>
// //             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
// //               Payment Request Chat
// //             </h1>
// //           </div>
// //           <img
// //             src={chatUser.avatar}
// //             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
// //             alt={chatUser.name}
// //             onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
// //           />
// //         </div>

// //         {/* Spacer for mobile header */}
// //         <div className="h-[60px] xl:hidden" />

// //         {/* Chat Container */}
// //         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">

// //           {/* ✅ Only on desktop — no white border on mobile */}
// //           <div className="h-[60px] w-full hidden xl:block bg-[#F2F4F7]" />

// //           <div className="flex-1 flex flex-col lg:px-8 lg:mb-8 overflow-hidden">
// //             <div className="flex-1 flex flex-col bg-white lg:rounded-2xl lg:shadow-md lg:border lg:border-gray-200 overflow-hidden">

// //               {/* Chat Header */}
// //               <div className="flex-shrink-0">
// //                 <ChatHeader
// //                   chatUser={chatUser}
// //                   isChatClosed={isChatClosed}
// //                   searchQuery={searchQuery}
// //                   onSearchChange={setSearchQuery}
// //                   formatLastSeen={formatLastSeen}
// //                   chatStatus={chatStatus}
// //                   totalMatches={matchedIndexes.length}
// //                   currentMatchIndex={currentMatchIndex}
// //                   onNext={() =>
// //                     setCurrentMatchIndex((prev) =>
// //                       prev < matchedIndexes.length - 1 ? prev + 1 : prev,
// //                     )
// //                   }
// //                   onPrev={() =>
// //                     setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
// //                   }
// //                   isTyping={isTyping}
// //                   isOnline={isOnline}
// //                 />
// //               </div>

// //               {/* Messages Area */}
// //               <div
// //                 ref={scrollContainerRef}
// //                 id="chat-scroll"
// //                 className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
// //               >
// //                 <MessageList
// //                   filteredMessages={filteredMessages}
// //                   searchQuery={searchQuery}
// //                   formatMessageDate={formatMessageDate}
// //                   isLoading={isLoadingHistory}
// //                   showScrollToBottom={showScrollToBottom}
// //                   onScrollToBottom={scrollToBottom}
// //                 />
// //                 <div ref={messagesEndRef} />
// //               </div>

// //               {/* Scroll to Bottom Button */}
// //               {showScrollToBottom && (
// //                 <button
// //                   onClick={scrollToBottom}
// //                   className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
// //                     bg-[#F4F4F4] hover:bg-[#c6c9c9]
// //                     p-2 rounded-full
// //                     shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
// //                     hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
// //                     transition-all duration-300 ease-out
// //                     flex items-center justify-center border border-white/80
// //                     active:scale-95"
// //                   aria-label="Scroll to bottom"
// //                 >
// //                   <ScrollToBottomIcon iconClassName="#9E9E9E" />
// //                 </button>
// //               )}

// //               {/* Chat Input */}
// //               <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
// //                 <ChatInput
// //                   messageInput={messageInput}
// //                   onMessageChange={handleInputChange}
// //                   onSendMessage={handleSendMessage}
// //                   uploadedFile={uploadedFile}
// //                   onFileUpload={handleFileUpload}
// //                   onRemoveFile={removeUploadedFile}
// //                   isUploading={isUploading}
// //                   isChatClosed={isChatClosed}
// //                   triggerFileInput={triggerFileInput}
// //                   fileInputRef={fileInputRef}
// //                   chatStatus={chatStatus}
// //                 />
// //               </div>

// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };






// // // const MemoizedChat = React.memo(PaymentRequestChat);
// // // export default MemoizedChat;



// // // import React, {
// // //   useState,
// // //   useRef,
// // //   useEffect,
// // //   useCallback,
// // //   useMemo,
// // // } from "react";
// // // import { useLocation } from "react-router-dom";
// // // import { Menu } from "lucide-react";
// // // import { SideBar } from "../base-component/Sidebar.jsx";
// // // import io from "socket.io-client";
// // // import Cookies from "js-cookie";
// // // import { ChatHeader } from "./sohailPayment/ChatHeader";
// // // import { MessageList } from "./sohailPayment/MessageList";
// // // import { ChatInput } from "./sohailPayment/ChatInput";

// // // const SOCKET_URL = "https://apis.famocare.com";
// // // const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
// // // const DEFAULT_AVATAR =
// // //   "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
// // // const UPLOADS_BASE = "https://apis.famocare.com/uploads/";

// // // const buildImageUrl = (raw) => {
// // //   if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
// // //   const s = raw.trim();
// // //   if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) {
// // //     return DEFAULT_AVATAR;
// // //   }
// // //   if (
// // //     s.startsWith("http://") ||
// // //     s.startsWith("https://") ||
// // //     s.startsWith("data:")
// // //   ) {
// // //     return s;
// // //   }
// // //   return UPLOADS_BASE + s;
// // // };

// // // const PaymentRequestChat = ({
// // //   currentUserId,
// // //   receiverId: propReceiverId,
// // //   managerId: propManagerId,
// // //   chatUserData: propChatUserData,
// // // }) => {
// // //   const location = useLocation();
// // //   const passedState = location.state || {};

// // //   // ==================== STATE ====================
// // //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// // //   const [messageInput, setMessageInput] = useState("");
// // //   const [chatMessages, setChatMessages] = useState([]);
// // //   const [uploadedFile, setUploadedFile] = useState(null);
// // //   const [isUploading, setIsUploading] = useState(false);
// // //   const [isChatClosed, setIsChatClosed] = useState(false);
// // //   const [isTyping, setIsTyping] = useState(false);
// // //   const [isOnline, setIsOnline] = useState(null);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [filteredMessages, setFilteredMessages] = useState([]);
// // //   const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
// // //   const [matchedIndexes, setMatchedIndexes] = useState([]);
// // //   const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
// // //   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
// // //   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
// // //   const [chatStatus, setChatStatus] = useState("in progress");
// // //   const [managerData, setManagerData] = useState(null);

// // //   // ==================== REFS ====================
// // //   const fileInputRef = useRef(null);
// // //   const messagesEndRef = useRef(null);
// // //   const socketRef = useRef(null);
// // //   const typingTimeoutRef = useRef(null);
// // //   const scrollContainerRef = useRef(null);

// // //   // ==================== IDs ====================
// // //   const user = JSON.parse(Cookies.get("referralUser") || "{}");
// // //   const finalUserId = currentUserId || user?.id;

// // //   const receiverId =
// // //     passedState.receiverId ||
// // //     propReceiverId ||
// // //     passedState.managerId ||
// // //     passedState.userId;

// // //   const managerId = passedState.managerId || propManagerId;

// // //   const redeemId =
// // //     passedState.redeemId ||
// // //     passedState.id ||
// // //     passedState.redeemItem?.id ||
// // //     location.state?.redeemId ||
// // //     location.state?.id;

// // //   // Set initial chat status from navigation state
// // //   useEffect(() => {
// // //     const initialStatus = passedState.status || "in progress";
// // //     setChatStatus(initialStatus);
// // //   }, [passedState.status]);

// // //   // ==================== MANAGER DATA ====================
// // //   useEffect(() => {
// // //     const data =
// // //       passedState.managerData ||
// // //       passedState.chatUserData?.manager ||
// // //       propChatUserData?.manager ||
// // //       propChatUserData;

// // //     if (data?.name) {
// // //       setManagerData(data);
// // //     }
// // //   }, [passedState, propChatUserData]);

// // //   const chatUser = useMemo(
// // //     () => ({
// // //       name: managerData?.name || "Manager",
// // //       avatar: buildImageUrl(managerData?.imageUrl),
// // //       id: managerData?.id,
// // //       lastSeen: managerData?.lastSeen,
// // //     }),
// // //     [managerData],
// // //   );

// // //   // ==================== FORMATTERS ====================
// // //   const formatTime = useCallback((date) => {
// // //     return new Date(date).toLocaleTimeString([], {
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //     });
// // //   }, []);

// // // const formatLastSeen = useCallback(() => {
// // //   if (isOnline === null) return "Checking...";
// // //   if (isOnline) return "Active now";

// // //   if (managerData?.lastSeen) {
// // //     const date = new Date(managerData.lastSeen);

// // //     const now = new Date();
// // //     const isToday = date.toDateString() === now.toDateString();

// // //     const yesterday = new Date();
// // //     yesterday.setDate(now.getDate() - 1);
// // //     const isYesterday = date.toDateString() === yesterday.toDateString();

// // //     const time = date.toLocaleTimeString([], {
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //     });

// // //     if (isToday) return `Last seen today at ${time}`;
// // //     if (isYesterday) return `Last seen yesterday at ${time}`;

// // //     return `Last seen on ${date.toLocaleDateString()} at ${time}`;
// // //   }

// // //   return "Last seen recently";
// // // }, [isOnline, managerData]);

// // //   const formatMessageDate = useCallback((dateKey) => {
// // //     const date = new Date(dateKey);
// // //     const today = new Date();
// // //     const yesterday = new Date(today);
// // //     yesterday.setDate(today.getDate() - 1);

// // //     if (date.toDateString() === today.toDateString()) return "Today";
// // //     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

// // //     return date.toLocaleDateString("en-US", {
// // //       weekday: "long",
// // //       month: "long",
// // //       day: "numeric",
// // //     });
// // //   }, []);

// // //   const statusStyles = useMemo(() => {
// // //     switch (chatStatus) {
// // //       case "resolved":
// // //         return {
// // //           bgColor: "bg-green-100",
// // //           textColor: "text-green-600",
// // //           displayText: "RESOLVED",
// // //         };
// // //       case "unresolved":
// // //         return {
// // //           bgColor: "bg-red-100",
// // //           textColor: "text-red-600",
// // //           displayText: "UNRESOLVED",
// // //         };
// // //       default:
// // //         return {
// // //           bgColor: "bg-[#E0E0E0]",
// // //           textColor: "text-[#3887FD]",
// // //           displayText: "IN PROGRESS",
// // //         };
// // //     }
// // //   }, [chatStatus]);

// // //   // ==================== SCROLL HELPERS ====================
// // //   const scrollToBottom = useCallback(() => {
// // //     messagesEndRef.current?.scrollIntoView({
// // //       behavior: "smooth",
// // //       block: "end",
// // //     });
// // //   }, []);

// // //   // ==================== SCROLL + BUTTON LOGIC (FIXED) ====================

// // //   // ✅ Handle scroll button visibility (like ChatGPT)
// // //   useEffect(() => {
// // //     const container = scrollContainerRef.current;
// // //     if (!container) return;

// // //     const handleScroll = () => {
// // //       const { scrollTop, scrollHeight, clientHeight } = container;

// // //       const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

// // //       // ✅ Show button only when user scrolls UP
// // //       const hasScroll = scrollHeight > clientHeight;

// // //       if (hasScroll) {
// // //         setShowScrollToBottom(distanceFromBottom > 100);
// // //       } else {
// // //         // ✅ fallback: show if many
// // //         setShowScrollToBottom(chatMessages.length > 8);
// // //       }
// // //     };

// // //     container.addEventListener("scroll", handleScroll, { passive: true });

// // //     // Initial check
// // //     setTimeout(handleScroll, 200);

// // //     return () => {
// // //       container.removeEventListener("scroll", handleScroll);
// // //     };
// // //   }, [chatMessages]);

// // //   // ==================== AUTO SCROLL (PROFESSIONAL) ====================
// // //   useEffect(() => {
// // //     if (isLoadingHistory || chatMessages.length === 0) return;

// // //     const container = scrollContainerRef.current;
// // //     if (!container) return;

// // //     const distanceFromBottom =
// // //       container.scrollHeight - (container.scrollTop + container.clientHeight);

// // //     const isNearBottom = distanceFromBottom < 80;

// // //     // ✅ First time → always scroll
// // //     if (!hasInitialScrollDone) {
// // //       setTimeout(() => {
// // //         scrollToBottom();
// // //         setHasInitialScrollDone(true);
// // //       }, 100);
// // //       return;
// // //     }

// // //     // ✅ Only auto-scroll if already near bottom
// // //     if (isNearBottom) {
// // //       setTimeout(() => {
// // //         scrollToBottom();
// // //       }, 100);
// // //     }
// // //   }, [
// // //     chatMessages.length,
// // //     isLoadingHistory,
// // //     hasInitialScrollDone,
// // //     scrollToBottom,
// // //   ]);

// // //   // Reset state when switching between different redeem requests
// // //   useEffect(() => {
// // //     setChatMessages([]);
// // //     setFilteredMessages([]);
// // //     setSearchQuery("");
// // //     setHasInitialScrollDone(false);
// // //     setIsLoadingHistory(true);
// // //   }, [redeemId]);

// // //   // ====================== SOCKET SETUP ======================
// // //   useEffect(() => {
// // //     if (!finalUserId || !receiverId || !redeemId) {
// // //       console.warn("Missing required IDs for socket connection");
// // //       return;
// // //     }

// // //     socketRef.current?.disconnect();

// // //     const socket = io(SOCKET_URL, {
// // //       auth: { userId: finalUserId },
// // //       transports: ["websocket", "polling"],
// // //       reconnection: true,
// // //       reconnectionAttempts: 10,
// // //       reconnectionDelay: 1000,
// // //     });

// // //     socketRef.current = socket;

// // //     const roomPayload = {
// // //       senderId: finalUserId,
// // //       receiverId,
// // //       redeemId,
// // //     };

// // //     socket.emit("joinChat", roomPayload);
// // //     socket.emit("fetchMessages", roomPayload);
// // //     socket.emit("markAllMessagesAsRead", {
// // //   senderId: receiverId,
// // //   receiverId: finalUserId,
// // //   redeemId,
// // //   readerId: finalUserId,
// // // });
// // //     socket.emit("getUserStatus", {
// // //       userId: receiverId,
// // //       senderType: "manager",
// // //     });

// // //     socket.on("allMessagesRead", (data) => {
// // //   console.log("✅ Messages marked as read:", data);
// // // });

// // //     // Declare user online + update last seen
// // //     socket.emit("userOnline", { userId: finalUserId, senderType: "user" });
// // //     socket.emit("updateLastSeen", { userId: finalUserId, senderType: "user" });

// // //     // Periodic status check every 8 seconds (best practice)
// // //     const statusInterval = setInterval(() => {
// // //       socket.emit("getUserStatus", {
// // //         userId: receiverId,
// // //         senderType: "manager",
// // //       });
// // //     }, 8000);

// // //     socket.on("previousMessages", (messages) => {
// // //       console.log("📥 previousMessages received:", messages?.length || 0);
// // //       const formatted = (messages || []).map((msg) => ({
// // //         id: msg.id,
// // //         text: msg.messageType === "image" ? "" : msg.message || "",
// // //         time: formatTime(msg.createdAt),
// // //         createdAt: msg.createdAt,
// // //         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
// // //         messageType: msg.messageType || "text",
// // //         imageUrl: msg.messageType === "image" ? msg.message : null,
// // //       }));

// // //       setChatMessages(formatted);
// // //       setIsLoadingHistory(false);
// // //     });

// // //     socket.on("receiveMessage", (msg) => {
// // //       const formatted = {
// // //         id: msg.id,
// // //         text: msg.messageType === "image" ? "" : msg.message || "",
// // //         time: formatTime(msg.createdAt),
// // //         createdAt: msg.createdAt,
// // //         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
// // //         messageType: msg.messageType || "text",
// // //         imageUrl: msg.messageType === "image" ? msg.message : null,
// // //       };

// // //       setChatMessages((prev) => {
// // //         if (prev.some((m) => m.id === formatted.id)) return prev;
// // //         return [...prev, formatted];
// // //       });
// // //     });

// // //     socket.on("userTyping", ({ senderId }) => {
// // //       if (String(senderId) === String(receiverId)) setIsTyping(true);
// // //     });

// // //     socket.on("userStoppedTyping", ({ senderId }) => {
// // //       if (String(senderId) === String(receiverId)) setIsTyping(false);
// // //     });

// // //     // ==================== IMPROVED STATUS LISTENER ====================
// // //     socket.on("userStatusChanged", (data) => {
// // //       console.log("🔴 [DEBUG User Side] userStatusChanged:", data);

// // //       if (String(data?.userId) === String(receiverId)) {
// // //         const isNowOnline = data.status === "online";
// // //         setIsOnline(isNowOnline);

// // //         if (data.lastSeen) {
// // //           setManagerData((prev) =>
// // //             prev ? { ...prev, lastSeen: data.lastSeen } : prev,
// // //           );
// // //         }

// // //         console.log(
// // //           `🎯 Manager Status → ${isNowOnline ? "🟢 ONLINE" : "⚫ OFFLINE"}`,
// // //         );
// // //       }
// // //     });

// // //     socket.on("connect", () => {
// // //       console.log("✅ [User Side] Socket Connected");

// // //       socket.emit("getUserStatus", {
// // //         userId: receiverId,
// // //         senderType: "manager",
// // //       });
// // //     });
// // //     socket.on("disconnect", (reason) =>
// // //       console.log("❌ [User Side] Disconnected:", reason),
// // //     );

// // //     return () => {
// // //       clearInterval(statusInterval);
// // //       socket.disconnect();
// // //     };
// // //   }, [finalUserId, receiverId, redeemId, formatTime]);

// // //   // ====================== SEARCH ======================
// // //   useEffect(() => {
// // //     if (!searchQuery.trim()) {
// // //       setFilteredMessages(chatMessages);
// // //       setMatchedIndexes([]);
// // //       setCurrentMatchIndex(0);
// // //       return;
// // //     }

// // //     const query = searchQuery.toLowerCase().trim();
// // //     const indexes = [];
// // //     const filtered = chatMessages.filter((msg, index) => {
// // //       const match = (msg.text || "").toLowerCase().includes(query);
// // //       if (match) indexes.push(index);
// // //       return match;
// // //     });

// // //     setFilteredMessages(filtered);
// // //     setMatchedIndexes(indexes);
// // //     setCurrentMatchIndex(0);
// // //   }, [searchQuery, chatMessages]);

// // //   // Highlight navigation effect
// // //   useEffect(() => {
// // //     if (matchedIndexes.length === 0) return;
// // //     const index = matchedIndexes[currentMatchIndex];
// // //     const el = document.querySelector(`[data-msg-index="${index}"]`);
// // //     if (el) {
// // //       el.scrollIntoView({ behavior: "smooth", block: "center" });
// // //     }
// // //   }, [currentMatchIndex, matchedIndexes]);

// // //   // ====================== HANDLERS ======================
// // //   const uploadAndSendFile = useCallback(
// // //     async (file, accompanyingText = "") => {
// // //       if (!file || isUploading) return;

// // //       setIsUploading(true);
// // //       const formData = new FormData();
// // //       formData.append("image", file);

// // //       try {
// // //         const res = await fetch(UPLOAD_URL, {
// // //           method: "POST",
// // //           body: formData,
// // //         });
// // //         const result = await res.json();

// // //         if (result.success && result.data?.imageUrl) {
// // //           socketRef.current?.emit("sendMessage", {
// // //             senderId: finalUserId,
// // //             receiverId,
// // //             redeemId,
// // //             message: accompanyingText || result.data.imageUrl,
// // //             senderType: "user",
// // //             messageType: "image",
// // //             managerId,
// // //           });
// // //         } else {
// // //           alert("Failed to upload image. Please try again.");
// // //         }
// // //       } catch (error) {
// // //         console.error("Upload error:", error);
// // //         alert("Error uploading image");
// // //       } finally {
// // //         setIsUploading(false);
// // //         setUploadedFile(null);
// // //         if (fileInputRef.current) fileInputRef.current.value = "";
// // //       }
// // //     },
// // //     [finalUserId, receiverId, redeemId, managerId, isUploading],
// // //   );

// // //   const handleSendMessage = useCallback(() => {
// // //     if (
// // //       isChatClosed ||
// // //       isUploading ||
// // //       (!messageInput.trim() && !uploadedFile)
// // //     ) {
// // //       return;
// // //     }

// // //     if (uploadedFile) {
// // //       uploadAndSendFile(uploadedFile, messageInput.trim());
// // //     } else {
// // //       socketRef.current?.emit("sendMessage", {
// // //         senderId: finalUserId,
// // //         receiverId,
// // //         redeemId,
// // //         message: messageInput.trim(),
// // //         senderType: "user",
// // //         messageType: "text",
// // //         managerId,
// // //       });
// // //     }

// // //     setMessageInput("");
// // //   }, [
// // //     messageInput,
// // //     uploadedFile,
// // //     isChatClosed,
// // //     isUploading,
// // //     finalUserId,
// // //     receiverId,
// // //     redeemId,
// // //     managerId,
// // //     uploadAndSendFile,
// // //   ]);

// // //   const handleFileUpload = useCallback(
// // //     (e) => {
// // //       if (isUploading) return;
// // //       const file = e.target.files?.[0];
// // //       if (file) {
// // //         setUploadedFile(file);
// // //         setMessageInput("");
// // //       }
// // //     },
// // //     [isUploading],
// // //   );

// // //   const triggerFileInput = useCallback(() => {
// // //     if (!isUploading) {
// // //       fileInputRef.current?.click();
// // //     }
// // //   }, [isUploading]);

// // //   const removeUploadedFile = useCallback(() => {
// // //     setUploadedFile(null);
// // //     if (fileInputRef.current) fileInputRef.current.value = "";
// // //   }, []);

// // //   const handleInputChange = useCallback(
// // //     (e) => {
// // //       if (isUploading || uploadedFile) {
// // //         setMessageInput("");
// // //         return;
// // //       }

// // //       const value = e.target.value;
// // //       setMessageInput(value);

// // //       if (socketRef.current) {
// // //         socketRef.current.emit("typing", {
// // //           senderId: finalUserId,
// // //           receiverId,
// // //           redeemId,
// // //         });

// // //         if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

// // //         typingTimeoutRef.current = setTimeout(() => {
// // //           socketRef.current?.emit("stopTyping", {
// // //             senderId: finalUserId,
// // //             receiverId,
// // //             redeemId,
// // //           });
// // //         }, 1800);
// // //       }
// // //     },
// // //     [finalUserId, receiverId, redeemId, isUploading, uploadedFile],
// // //   );

// // //   // Cleanup timeout on unmount
// // //   useEffect(() => {
// // //     return () => {
// // //       if (typingTimeoutRef.current) {
// // //         clearTimeout(typingTimeoutRef.current);
// // //       }
// // //     };
// // //   }, []);

// // //   // ====================== RENDER ======================
// // //   return (
// // //     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
// // //       {/* Sidebar */}
// // //       <div
// // //         className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}
// // //       >
// // //         <SideBar
// // //           isDrawer={isDrawerOpen}
// // //           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
// // //         />
// // //       </div>

// // //       {isDrawerOpen && (
// // //         <div
// // //           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
// // //           onClick={() => setIsDrawerOpen(false)}
// // //         />
// // //       )}

// // //       {/* Main Content */}
// // //       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
// // //         {/* Mobile Purple Header */}
// // //         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
// // //           <div className="flex items-center gap-3">
// // //             <button
// // //               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
// // //               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
// // //             >
// // //               <Menu size={18} className="text-[#691188]" />
// // //             </button>
// // //             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
// // //               Payment Request Chat
// // //             </h1>
// // //           </div>
// // //           <img
// // //             src={chatUser.avatar}
// // //             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
// // //             alt={chatUser.name}
// // //             onError={(e) => {
// // //               e.target.src = DEFAULT_AVATAR;
// // //             }}
// // //           />
// // //         </div>

// // //         {/* Spacer for mobile header */}
// // //         <div className="h-[60px] xl:hidden" />

// // //         {/* Chat Container */}
// // //         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">
// // //           {" "}
// // //           {/* <div className="h-[60px] w-full hidden xl:block bg-[#FFFFFF]" /> */}

// // //           <div className="flex-1 flex flex-col lg:px-8 lg:mt-8 overflow-hidden">
// // //             {/* Chat Header */}
// // //             <div className="flex-shrink-0">
// // //               <ChatHeader
// // //                 chatUser={chatUser}
// // //                 isChatClosed={isChatClosed}
// // //                 searchQuery={searchQuery}
// // //                 onSearchChange={setSearchQuery}
// // //                 formatLastSeen={formatLastSeen}
// // //                 chatStatus={chatStatus}
// // //                 totalMatches={matchedIndexes.length}
// // //                 currentMatchIndex={currentMatchIndex}
// // //                 onNext={() =>
// // //                   setCurrentMatchIndex((prev) =>
// // //                     prev < matchedIndexes.length - 1 ? prev + 1 : prev,
// // //                   )
// // //                 }
// // //                 onPrev={() =>
// // //                   setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
// // //                 }
// // //                 isTyping={isTyping}
// // //                   isOnline={isOnline}   // ✅ ADD THIS LINE

// // //               />
// // //             </div>

// // //             {/* Messages Area */}
// // //             <div
// // //               ref={scrollContainerRef}
// // //               id="chat-scroll"
// // //               className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
// // //             >
// // //               <MessageList
// // //                 filteredMessages={filteredMessages}
// // //                 searchQuery={searchQuery}
// // //                 formatMessageDate={formatMessageDate}
// // //                 isLoading={isLoadingHistory}
// // //                 showScrollToBottom={showScrollToBottom}
// // //                 onScrollToBottom={scrollToBottom}
// // //               />
// // //               <div ref={messagesEndRef} />
// // //             </div>

// // //             {/* Scroll to Bottom Button - Larger Bottom Shadow */}
// // //             {showScrollToBottom && (
// // //               <button
// // //                 onClick={scrollToBottom}
// // //                 className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
// // // bg-[#F4F4F4] hover:bg-[#c6c9c9] 
// // // p-2 rounded-full 
// // // shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
// // // hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
// // // transition-all duration-300 ease-out
// // // flex items-center justify-center border border-white/80
// // // active:scale-95
// // // opacity-100 translate-y-0"
// // //                 aria-label="Scroll to bottom"
// // //               >
// // //                 <img
// // //                   src="/scroll-icon.svg"
// // //                   alt="scroll down"
// // //                   className="w-5 h-5 object-contain "
// // //                 />
// // //               </button>
// // //             )}

// // //             {/* Chat Input */}
// // //             <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
// // //               <ChatInput
// // //                 messageInput={messageInput}
// // //                 onMessageChange={handleInputChange}
// // //                 onSendMessage={handleSendMessage}
// // //                 uploadedFile={uploadedFile}
// // //                 onFileUpload={handleFileUpload}
// // //                 onRemoveFile={removeUploadedFile}
// // //                 isUploading={isUploading}
// // //                 isChatClosed={isChatClosed}
// // //                 triggerFileInput={triggerFileInput}
// // //                 fileInputRef={fileInputRef}
// // //                 chatStatus={chatStatus}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const MemoizedChat = React.memo(PaymentRequestChat);
// // // export default MemoizedChat;


// ///



// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// import { useLocation } from "react-router-dom";
// import { Menu } from "lucide-react";
// import { SideBar } from "../base-component/Sidebar.jsx";
// import io from "socket.io-client";
// import Cookies from "js-cookie";
// import { ChatHeader } from "./sohailPayment/ChatHeader";
// import { MessageList } from "./sohailPayment/MessageList";
// import { ChatInput } from "./sohailPayment/ChatInput";

// const SOCKET_URL = "https://apis.famocare.com";
// const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
// const DEFAULT_AVATAR =
//   "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
// const UPLOADS_BASE = "https://apis.famocare.com/uploads/";

// // ==================== SCROLL TO BOTTOM ICON ====================
// export const ScrollToBottomIcon = ({ iconClassName = "#9E9E9E" }) => {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M3 6L10 14L17 6"
//         stroke={iconClassName}
//         strokeWidth="3"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };

// const buildImageUrl = (raw) => {
//   if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
//   const s = raw.trim();
//   if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) {
//     return DEFAULT_AVATAR;
//   }
//   if (
//     s.startsWith("http://") ||
//     s.startsWith("https://") ||
//     s.startsWith("data:")
//   ) {
//     return s;
//   }
//   return UPLOADS_BASE + s;
// };

// const PaymentRequestChat = ({
//   currentUserId,
//   receiverId: propReceiverId,
//   managerId: propManagerId,
//   chatUserData: propChatUserData,
// }) => {
//   const location = useLocation();
//   const passedState = location.state || {};

//   // ==================== STATE ====================
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [messageInput, setMessageInput] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isChatClosed, setIsChatClosed] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isOnline, setIsOnline] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
//   const [matchedIndexes, setMatchedIndexes] = useState([]);
//   const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
//   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
//   const [chatStatus, setChatStatus] = useState("in progress");
//   const [managerData, setManagerData] = useState(null);

//   // ==================== REFS ====================
//   const fileInputRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);
//   const typingTimeoutRef = useRef(null);
//   const scrollContainerRef = useRef(null);

//   // ==================== IDs ====================
//   const user = JSON.parse(Cookies.get("referralUser") || "{}");
//   const finalUserId = currentUserId || user?.id;

//   const receiverId =
//     passedState.receiverId ||
//     propReceiverId ||
//     passedState.managerId ||
//     passedState.userId;

//   const managerId = passedState.managerId || propManagerId;

//   const redeemId =
//     passedState.redeemId ||
//     passedState.id ||
//     passedState.redeemItem?.id ||
//     location.state?.redeemId ||
//     location.state?.id;

//   // Set initial chat status from navigation state
//   useEffect(() => {
//     const initialStatus = passedState.status || "in progress";
//     setChatStatus(initialStatus);
//   }, [passedState.status]);

//   // Auto close chat when resolved
//   useEffect(() => {
//     if (chatStatus === "resolved") {
//       setIsChatClosed(true);
//     } else {
//       setIsChatClosed(false);
//     }
//   }, [chatStatus]);

//   // ==================== MANAGER DATA ====================
//   useEffect(() => {
//     const data =
//       passedState.managerData ||
//       passedState.chatUserData?.manager ||
//       propChatUserData?.manager ||
//       propChatUserData;

//     if (data?.name) {
//       setManagerData(data);
//     }
//   }, [passedState, propChatUserData]);

//   const chatUser = useMemo(
//     () => ({
//       name: managerData?.name || "Manager",
//       avatar: buildImageUrl(managerData?.imageUrl),
//       id: managerData?.id,
//       lastSeen: managerData?.lastSeen,
//     }),
//     [managerData],
//   );

//   // ==================== FORMATTERS ====================
//   const formatTime = useCallback((date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   }, []);

//   const formatLastSeen = useCallback(() => {
//     if (isOnline === null) return "Checking...";
//     if (isOnline) return "Active now";

//     if (managerData?.lastSeen) {
//       const date = new Date(managerData.lastSeen);
//       const now = new Date();

//       const isToday = date.toDateString() === now.toDateString();
//       const yesterday = new Date(now);
//       yesterday.setDate(yesterday.getDate() - 1);
//       const isYesterday = date.toDateString() === yesterday.toDateString();

//       let time = date.toLocaleTimeString([], {
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: true,
//       });

//       time = time.replace(/am$/i, "AM").replace(/pm$/i, "PM");

//       if (isToday) return `Last seen today at ${time}`;
//       if (isYesterday) return `Last seen yesterday at ${time}`;

//       return `Last seen on ${date.toLocaleDateString()} at ${time}`;
//     }

//     return "Last seen recently";
//   }, [isOnline, managerData]);

//   const formatMessageDate = useCallback((dateKey) => {
//     const date = new Date(dateKey);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) return "Today";
//     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       month: "long",
//       day: "numeric",
//     });
//   }, []);

//   const statusStyles = useMemo(() => {
//     switch (chatStatus) {
//       case "resolved":
//         return {
//           bgColor: "bg-green-100",
//           textColor: "text-green-600",
//           displayText: "RESOLVED",
//         };
//       case "unresolved":
//         return {
//           bgColor: "bg-red-100",
//           textColor: "text-red-600",
//           displayText: "UNRESOLVED",
//         };
//       default:
//         return {
//           bgColor: "bg-[#E0E0E0]",
//           textColor: "text-[#3887FD]",
//           displayText: "IN PROGRESS",
//         };
//     }
//   }, [chatStatus]);

//   // ==================== SCROLL HELPERS ====================
//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//     });
//   }, []);

//   // ==================== SCROLL + BUTTON LOGIC ====================
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const { scrollTop, scrollHeight, clientHeight } = container;
//       const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
//       const hasScroll = scrollHeight > clientHeight;

//       if (hasScroll) {
//         setShowScrollToBottom(distanceFromBottom > 100);
//       } else {
//         setShowScrollToBottom(chatMessages.length > 8);
//       }
//     };

//     container.addEventListener("scroll", handleScroll, { passive: true });
//     setTimeout(handleScroll, 200);

//     return () => {
//       container.removeEventListener("scroll", handleScroll);
//     };
//   }, [chatMessages]);

//   // ==================== AUTO SCROLL ====================
//   useEffect(() => {
//     if (isLoadingHistory || chatMessages.length === 0) return;

//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const distanceFromBottom =
//       container.scrollHeight - (container.scrollTop + container.clientHeight);
//     const isNearBottom = distanceFromBottom < 80;

//     if (!hasInitialScrollDone) {
//       setTimeout(() => {
//         scrollToBottom();
//         setHasInitialScrollDone(true);
//       }, 100);
//       return;
//     }

//     if (isNearBottom) {
//       setTimeout(() => {
//         scrollToBottom();
//       }, 100);
//     }
//   }, [chatMessages.length, isLoadingHistory, hasInitialScrollDone, scrollToBottom]);

//   // Reset state when switching redeem requests
//   useEffect(() => {
//     setChatMessages([]);
//     setFilteredMessages([]);
//     setSearchQuery("");
//     setHasInitialScrollDone(false);
//     setIsLoadingHistory(true);
//   }, [redeemId]);

//   // ====================== SOCKET SETUP ======================
//   useEffect(() => {
//     if (!finalUserId || !receiverId || !redeemId) return;

//     socketRef.current?.disconnect();

//     const socket = io(SOCKET_URL, {
//       auth: { userId: finalUserId },
//       transports: ["websocket", "polling"],
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     });

//     socketRef.current = socket;

//     const roomPayload = { senderId: finalUserId, receiverId, redeemId };

//     socket.emit("joinChat", roomPayload);
//     socket.emit("fetchMessages", roomPayload);
//     socket.emit("markAllMessagesAsRead", {
//       senderId: receiverId,
//       receiverId: finalUserId,
//       redeemId,
//       readerId: finalUserId,
//     });
//     socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
//     socket.emit("userOnline", { userId: finalUserId, senderType: "user" });
//     socket.emit("updateLastSeen", { userId: finalUserId, senderType: "user" });

//     const statusInterval = setInterval(() => {
//       socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
//     }, 8000);

//     socket.on("previousMessages", (messages) => {
//       const formatted = (messages || []).map((msg) => ({
//         id: msg.id,
//         text: msg.messageType === "image" ? "" : msg.message || "",
//         time: formatTime(msg.createdAt),
//         createdAt: msg.createdAt,
//         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
//         messageType: msg.messageType || "text",
//         imageUrl: msg.messageType === "image" ? msg.message : null,
//       }));

//       setChatMessages(formatted);
//       setIsLoadingHistory(false);
//     });

//     socket.on("receiveMessage", (msg) => {
//       const formatted = {
//         id: msg.id,
//         text: msg.messageType === "image" ? "" : msg.message || "",
//         time: formatTime(msg.createdAt),
//         createdAt: msg.createdAt,
//         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
//         messageType: msg.messageType || "text",
//         imageUrl: msg.messageType === "image" ? msg.message : null,
//       };

//       setChatMessages((prev) => {
//         if (prev.some((m) => m.id === formatted.id)) return prev;
//         return [...prev, formatted];
//       });
//     });

//     socket.on("userTyping", ({ senderId }) => {
//       if (String(senderId) === String(receiverId)) setIsTyping(true);
//     });

//     socket.on("userStoppedTyping", ({ senderId }) => {
//       if (String(senderId) === String(receiverId)) setIsTyping(false);
//     });

//     socket.on("chatStatusUpdated", (data) => {
//       if (String(data?.redeemId) === String(redeemId)) {
//         setChatStatus(data.status);
//         if (data.status === "resolved") {
//           setIsChatClosed(true);
//         }
//       }
//     });

//     socket.on("userStatusChanged", (data) => {
//       if (String(data?.userId) === String(receiverId)) {
//         const isNowOnline = data.status === "online";
//         setIsOnline(isNowOnline);
//         if (data.lastSeen) {
//           setManagerData((prev) =>
//             prev ? { ...prev, lastSeen: data.lastSeen } : prev,
//           );
//         }
//       }
//     });

//     socket.on("connect", () => {
//       socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
//     });

//     return () => {
//       clearInterval(statusInterval);
//       socket.disconnect();
//     };
//   }, [finalUserId, receiverId, redeemId, formatTime]);

//   // ====================== SEARCH ======================
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredMessages(chatMessages);
//       setMatchedIndexes([]);
//       setCurrentMatchIndex(0);
//       return;
//     }

//     const query = searchQuery.toLowerCase().trim();
//     const indexes = [];
//     const filtered = chatMessages.filter((msg, index) => {
//       const match = (msg.text || "").toLowerCase().includes(query);
//       if (match) indexes.push(index);
//       return match;
//     });

//     setFilteredMessages(filtered);
//     setMatchedIndexes(indexes);
//     setCurrentMatchIndex(0);
//   }, [searchQuery, chatMessages]);

//   useEffect(() => {
//     if (matchedIndexes.length === 0) return;
//     const index = matchedIndexes[currentMatchIndex];
//     const el = document.querySelector(`[data-msg-index="${index}"]`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [currentMatchIndex, matchedIndexes]);

//   // ====================== HANDLERS ======================
//   const uploadAndSendFile = useCallback(
//     async (file, accompanyingText = "") => {
//       if (!file || isUploading) return;

//       setIsUploading(true);
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
//         const result = await res.json();

//         if (result.success && result.data?.imageUrl) {
//           socketRef.current?.emit("sendMessage", {
//             senderId: finalUserId,
//             receiverId,
//             redeemId,
//             message: accompanyingText || result.data.imageUrl,
//             senderType: "user",
//             messageType: "image",
//             managerId,
//           });
//         } else {
//           alert("Failed to upload image. Please try again.");
//         }
//       } catch (error) {
//         alert("Error uploading image");
//       } finally {
//         setIsUploading(false);
//         setUploadedFile(null);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//     },
//     [finalUserId, receiverId, redeemId, managerId, isUploading],
//   );

//   const handleSendMessage = useCallback(() => {
//     if (isChatClosed || isUploading || (!messageInput.trim() && !uploadedFile)) {
//       return;
//     }

//     if (uploadedFile) {
//       uploadAndSendFile(uploadedFile, messageInput.trim());
//     } else {
//       socketRef.current?.emit("sendMessage", {
//         senderId: finalUserId,
//         receiverId,
//         redeemId,
//         message: messageInput.trim(),
//         senderType: "user",
//         messageType: "text",
//         managerId,
//       });
//     }

//     setMessageInput("");
//   }, [
//     messageInput, uploadedFile, isChatClosed, isUploading,
//     finalUserId, receiverId, redeemId, managerId, uploadAndSendFile,
//   ]);

//   const handleFileUpload = useCallback(
//     (e) => {
//       if (isUploading) return;
//       const file = e.target.files?.[0];
//       if (file) {
//         setUploadedFile(file);
//         setMessageInput("");
//       }
//     },
//     [isUploading],
//   );

//   const triggerFileInput = useCallback(() => {
//     if (!isUploading) fileInputRef.current?.click();
//   }, [isUploading]);

//   const removeUploadedFile = useCallback(() => {
//     setUploadedFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   }, []);

//   const handleInputChange = useCallback(
//     (e) => {
//       if (isUploading || uploadedFile) {
//         setMessageInput("");
//         return;
//       }

//       const value = e.target.value;
//       setMessageInput(value);

//       if (socketRef.current) {
//         socketRef.current.emit("typing", { senderId: finalUserId, receiverId, redeemId });

//         if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//         typingTimeoutRef.current = setTimeout(() => {
//           socketRef.current?.emit("stopTyping", {
//             senderId: finalUserId,
//             receiverId,
//             redeemId,
//           });
//         }, 1800);
//       }
//     },
//     [finalUserId, receiverId, redeemId, isUploading, uploadedFile],
//   );

//   useEffect(() => {
//     return () => {
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//     };
//   }, []);

//   // ====================== RENDER ======================
//   return (
//     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
//       {/* Sidebar */}
//       <div className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}>
//         <SideBar
//           isDrawer={isDrawerOpen}
//           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
//         />
//       </div>

//       {isDrawerOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
//           onClick={() => setIsDrawerOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
//         {/* Mobile Purple Header */}
//         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
//               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
//             >
//               <Menu size={18} className="text-[#691188]" />
//             </button>
//             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
//               Payment Request Chat
//             </h1>
//           </div>
//           <img
//             src={chatUser.avatar}
//             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
//             alt={chatUser.name}
//             onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
//           />
//         </div>

//         {/* Spacer for mobile header */}
//         <div className="h-[60px] xl:hidden" />

//         {/* Chat Container */}
//         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">

//           {/* ✅ Only on desktop — no white border on mobile */}
//           <div className="h-[60px] w-full hidden xl:block bg-[#F2F4F7]" />

//           <div className="flex-1 flex flex-col lg:px-8 lg:mb-8 overflow-hidden">
//             <div className="flex-1 flex flex-col bg-white lg:rounded-2xl lg:shadow-md lg:border lg:border-gray-200 overflow-hidden">

//               {/* Chat Header */}
//               <div className="flex-shrink-0">
//                 <ChatHeader
//                   chatUser={chatUser}
//                   isChatClosed={isChatClosed}
//                   searchQuery={searchQuery}
//                   onSearchChange={setSearchQuery}
//                   formatLastSeen={formatLastSeen}
//                   chatStatus={chatStatus}
//                   totalMatches={matchedIndexes.length}
//                   currentMatchIndex={currentMatchIndex}
//                   onNext={() =>
//                     setCurrentMatchIndex((prev) =>
//                       prev < matchedIndexes.length - 1 ? prev + 1 : prev,
//                     )
//                   }
//                   onPrev={() =>
//                     setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
//                   }
//                   isTyping={isTyping}
//                   isOnline={isOnline}
//                 />
//               </div>

//               {/* Messages Area */}
//               <div
//                 ref={scrollContainerRef}
//                 id="chat-scroll"
//                 className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
//               >
//                 <MessageList
//                   filteredMessages={filteredMessages}
//                   searchQuery={searchQuery}
//                   formatMessageDate={formatMessageDate}
//                   isLoading={isLoadingHistory}
//                   showScrollToBottom={showScrollToBottom}
//                   onScrollToBottom={scrollToBottom}
//                 />
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Scroll to Bottom Button */}
//               {showScrollToBottom && (
//                 <button
//                   onClick={scrollToBottom}
//                   className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
//                     bg-[#F4F4F4] hover:bg-[#c6c9c9]
//                     p-2 rounded-full
//                     shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
//                     hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
//                     transition-all duration-300 ease-out
//                     flex items-center justify-center border border-white/80
//                     active:scale-95"
//                   aria-label="Scroll to bottom"
//                 >
//                   <ScrollToBottomIcon iconClassName="#9E9E9E" />
//                 </button>
//               )}

//               {/* Chat Input */}
//               <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
//                 <ChatInput
//                   messageInput={messageInput}
//                   onMessageChange={handleInputChange}
//                   onSendMessage={handleSendMessage}
//                   uploadedFile={uploadedFile}
//                   onFileUpload={handleFileUpload}
//                   onRemoveFile={removeUploadedFile}
//                   isUploading={isUploading}
//                   isChatClosed={isChatClosed}
//                   triggerFileInput={triggerFileInput}
//                   fileInputRef={fileInputRef}
//                   chatStatus={chatStatus}
//                 />
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MemoizedChat = React.memo(PaymentRequestChat);
// export default MemoizedChat;


////


// // // import React, { useState, useRef, useEffect } from "react";
// // // import { Search, Send, Paperclip, Menu, MoreVertical, Download, X } from "lucide-react";
// // // import { SideBar } from "../base-component/Sidebar.jsx";

// // // const messages = [
// // //   {
// // //     id: 1,
// // //     text: "Ok I was sure about that because Mr. Smith is terrible on teaching",
// // //     time: "9:45 AM",
// // //     sender: "other",
// // //   },
// // //   {
// // //     id: 2,
// // //     text: "Sure, what did you want to do?",
// // //     time: "11:35 PM",
// // //     sender: "me",
// // //   },
// // //   {
// // //     id: 3,
// // //     text: "How are you doing? I just wanted to see if you wanted to hang out tomorrow.",
// // //     time: "11:33 PM",
// // //     sender: "other",
// // //   },
// // //   {
// // //     id: 4,
// // //     text: "Sure, what did you want to do?",
// // //     time: "11:35 PM",
// // //     sender: "me",
// // //   },
// // //   {
// // //     id: 5,
// // //     text: "Ok I was sure about that because Mr. Smith is terrible on teaching",
// // //     time: "9:45 AM",
// // //     sender: "other",
// // //   },
// // // ];

// // // const PaymentRequestChat = () => {
// // //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// // //   const [messageInput, setMessageInput] = useState("");
// // //   const [chatMessages, setChatMessages] = useState(messages);
// // //   const [showOptions, setShowOptions] = useState(false);
// // //   const [uploadedFile, setUploadedFile] = useState(null);
// // //   const [chatStatus, setChatStatus] = useState("in progress");
// // //   const [isChatClosed, setIsChatClosed] = useState(false);
// // //   const [tempStatusMessage, setTempStatusMessage] = useState("");
// // //   const fileInputRef = useRef(null);
// // //   const messagesEndRef = useRef(null);
// // //   const tempStatusTimeoutRef = useRef(null);
// // //   const chatClosedTimeoutRef = useRef(null);

// // //   const chatUser = {
// // //     name: "Muhammad Junaid khan",
// // //     avatar: "https://i.pravatar.cc/200",
// // //   };

// // //   const handleDrawer = () => {
// // //     setIsDrawerOpen(!isDrawerOpen);
// // //   };

// // //   const handleStatusChange = (status) => {
// // //     setChatStatus(status);
// // //     setShowOptions(false);

// // //     const statusMessage = `Chat has been marked as ${status}`;
// // //     setTempStatusMessage(statusMessage);

// // //     if (tempStatusTimeoutRef.current) clearTimeout(tempStatusTimeoutRef.current);
// // //     if (chatClosedTimeoutRef.current) clearTimeout(chatClosedTimeoutRef.current);

// // //     tempStatusTimeoutRef.current = setTimeout(() => {
// // //       setTempStatusMessage("");
// // //     }, 3000);

// // //     chatClosedTimeoutRef.current = setTimeout(() => {
// // //       setIsChatClosed(true);
// // //     }, 3000);
// // //   };

// // //   const handleSendMessage = () => {
// // //     if (messageInput.trim() === "" && !uploadedFile) return;

// // //     const newMessage = {
// // //       id: chatMessages.length + 1,
// // //       text: messageInput,
// // //       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
// // //       sender: "me",
// // //       file: uploadedFile,
// // //     };

// // //     setChatMessages([...chatMessages, newMessage]);
// // //     setMessageInput("");
// // //     setUploadedFile(null);
// // //   };

// // //   const handleKeyPress = (e) => {
// // //     if (e.key === "Enter" && !e.shiftKey) {
// // //       e.preventDefault();
// // //       handleSendMessage();
// // //     }
// // //   };

// // //   const handleFileUpload = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       setUploadedFile({
// // //         name: file.name,
// // //         size: (file.size / 1024).toFixed(2) + " KB",
// // //         type: file.type,
// // //       });
// // //     }
// // //   };

// // //   const triggerFileInput = () => {
// // //     fileInputRef.current.click();
// // //   };

// // //   const removeUploadedFile = () => {
// // //     setUploadedFile(null);
// // //   };

// // //   const scrollToBottom = () => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   };

// // //   useEffect(() => {
// // //     scrollToBottom();
// // //   }, [chatMessages, tempStatusMessage]);

// // //   const getStatusStyles = () => {
// // //     switch (chatStatus) {
// // //       case "resolved":
// // //         return { bgColor: "bg-green-100", textColor: "text-green-600", displayText: "RESOLVED" };
// // //       case "unresolved":
// // //         return { bgColor: "bg-red-100", textColor: "text-red-600", displayText: "UNRESOLVED" };
// // //       default:
// // //         return { bgColor: "bg-[#E0E0E0]", textColor: "text-[#3887FD]", displayText: "IN PROGRESS" };
// // //     }
// // //   };

// // //   const statusStyles = getStatusStyles();

// // //   return (
// // //     <div className="min-h-screen flex bg-gray-100 overflow-hidden">

// // //       {/* Sidebar */}
// // //       <div className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-50`}>
// // //         <SideBar isDrawer={isDrawerOpen} handleDrawer={handleDrawer} />
// // //       </div>

// // //       {/* Overlay for mobile */}
// // //       {isDrawerOpen && (
// // //         <div
// // //           className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
// // //           onClick={handleDrawer}
// // //         />
// // //       )}

// // //       {/* Main Chat Area */}
// // //       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">

// // //         {/* Mobile Header */}
// // //         <div className="xl:hidden bg-[#691188] px-4 py-3 flex items-center justify-between">
// // //           <div className="flex items-center gap-3 flex-1 min-w-0">
// // //             <button
// // //               onClick={handleDrawer}
// // //               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
// // //             >
// // //               <Menu size={18} className="text-[#691188]" />
// // //             </button>
// // //             <h1 className="text-base sm:text-lg font-semibold text-white truncate">Payment Request Chat</h1>
// // //           </div>
// // //           <img
// // //             src={chatUser.avatar}
// // //             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 ml-2"
// // //             alt={chatUser.name}
// // //           />
// // //         </div>

// // //         {/* Chat Container */}
// // //         <div className="flex-1 flex items-stretch p-3 sm:p-4 md:p-6 overflow-hidden">
// // //           <div className="w-full max-w-full lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1200px] flex flex-col bg-white rounded-xl shadow overflow-hidden mx-auto">

// // //             {/* Chat Header */}
// // //             <div className="border-b flex-shrink-0">

// // //               {/* ── Top row: avatar + name + search + dots ── */}
// // //               {/* <div className="flex items-center justify-between px-3 sm:px-4 md:px-5 py-3 md:py-4 gap-2">

// // // <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
// // //   <img
// // //     src={chatUser.avatar}
// // //     className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0"
// // //     alt={chatUser.name}
// // //   />
// // //   <div className="min-w-0">
// // //     <p className="font-semibold text-xs md:text-sm truncate">{chatUser.name}</p>
// // //     <p className="text-[10px] md:text-xs text-gray-500">Last Seen 11:45 PM</p> */}
// // //     {/* Under name on small/medium */}
// // //      {/* {isChatClosed && (
// // //       <p className="lg:hidden text-[10px] sm:text-xs text-gray-700 font-medium mt-0.5">
// // //         Chat Closed
// // //       </p>
// // //     )}
// // //   </div>

// // //   {/* Centered on large/xl */}
// // //    {/* {isChatClosed && (
// // //     <span className="hidden lg:block absolute left-1/2 -translate-x-1/2 text-sm text-gray-700 font-medium whitespace-nowrap">
// // //       Chat Closed
// // //     </span>
// // //   )}   */}

// // // <div className="relative flex items-center justify-between px-3 sm:px-4 md:px-5 py-3 md:py-4 gap-2">

// // //   <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
// // //     <img
// // //       src={chatUser.avatar}
// // //       className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0"
// // //       alt={chatUser.name}
// // //     />
// // //     <div className="min-w-0">
// // //       <p className="font-semibold text-xs md:text-sm truncate">{chatUser.name}</p>
// // //       <p className="text-[10px] md:text-xs text-gray-500">Last Seen 11:45 PM</p>
// // //       {/* Under name — only on default mobile */}
// // //       {isChatClosed && (
// // //         <p className="surface-duo:hidden text-[10px] text-gray-700 font-medium mt-0.5">
// // //           Chat Closed
// // //         </p>
// // //       )}
// // //     </div>

// // //   {/* Centered — from Surface Duo and above */}
// // //   {isChatClosed && (
// // //     <span className="hidden surface-duo:block absolute left-1/2 -translate-x-1/2 text-xs md:text-sm text-gray-700 font-medium whitespace-nowrap pointer-events-none">
// // //       Chat Closed
// // //     </span>
// // //   )}



// // // </div>

// // //      {/* Right: search + dots — always fixed width, never wraps */}
// // // <div className="flex items-center gap-2 flex-shrink-0 relative">
// // //   {/* Search box — visible on all screens */}
// // //   <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-2 sm:px-3 py-2 hover:border-gray-400 focus-within:border-[#055860]">
// // //     <Search
// // //       size={14}
// // //       className="text-gray-500 flex-shrink-0 cursor-pointer hover:text-gray-700"
// // //     />
// // //     <input
// // //       type="text"
// // //       placeholder="Search..."
// // //       className="w-[60px] sm:w-[100px] md:w-[140px] outline-none text-xs sm:text-sm bg-transparent placeholder-gray-400"
// // //     />
// // //   </div>

// // //   {/* 3-dot menu */}
// // //   <div className="relative">
// // //     <MoreVertical
// // //       size={16}
// // //       className="text-gray-500 cursor-pointer hover:text-gray-700 flex-shrink-0"
// // //       onClick={() => setShowOptions(!showOptions)}
// // //     />
// // //     {showOptions && (
// // //       <div className="absolute right-0 top-6 mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
// // //         <ul className="py-1">
// // //           <li
// // //             onClick={() => handleStatusChange("resolved")}
// // //             className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs text-green-600 font-medium"
// // //           >
// // //             Resolved
// // //           </li>
// // //           <li
// // //             onClick={() => handleStatusChange("unresolved")}
// // //             className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs text-red-600 font-medium"
// // //           >
// // //             Unresolved
// // //           </li>
// // //         </ul>
// // //       </div>
// // //     )}
// // //   </div>
// // // </div>
// // // </div>

// // //               {/* ── Status row ── */}
// // //               <div className="px-3 sm:px-4 md:px-5 py-2 md:py-2.5 border-t border-gray-200">
// // //                 <div className="flex items-center justify-between gap-2">
// // //                   <div className="space-y-0.5 min-w-0">
// // //                     <p className="text-[10px] md:text-xs text-[#055860] font-bold">Status</p>
// // //                     <p className="text-[10px] md:text-xs text-gray-500 truncate">
// // //                       Your status {chatStatus}
// // //                     </p>
// // //                   </div>
// // //                   <div className="flex-shrink-0">
// // //                     <p className={`inline-block text-[10px] md:text-xs font-medium ${statusStyles.textColor} border ${statusStyles.bgColor} px-2 py-[5px] rounded whitespace-nowrap`}>
// // //                       {statusStyles.displayText}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Messages */}
// // //             <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 py-3 md:py-4 space-y-3 md:space-y-4 bg-[#F7F8FA]">
// // //               <div className="text-center text-[10px] md:text-xs text-gray-400">
// // //                 December 11, 2023
// // //               </div>

// // //               {chatMessages.map((msg) => (
// // //                 <div key={msg.id}>
// // //                   {msg.sender === "system" ? (
// // //                     <div className="text-center my-4">
// // //                       <div className="inline-block bg-gray-200 rounded-full px-4 py-2">
// // //                         <p className="text-xs text-gray-700 font-medium">{msg.text}</p>
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     <div className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
// // //                       <div
// // //                         className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[65%] rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm ${
// // //                           msg.sender === "me"
// // //                             ? "bg-[#0F5D63] text-white rounded-br-none"
// // //                             : "bg-white text-gray-700 rounded-bl-none shadow"
// // //                         }`}
// // //                       >
// // //                         {msg.file && (
// // //                           <div className="mb-2 p-2 bg-gray-800 bg-opacity-20 rounded-lg">
// // //                             <div className="flex items-center justify-between">
// // //                               <div className="flex items-center gap-2">
// // //                                 <Download size={12} />
// // //                                 <span className="text-xs truncate">{msg.file.name}</span>
// // //                               </div>
// // //                               <span className="text-xs text-gray-400">{msg.file.size}</span>
// // //                             </div>
// // //                           </div>
// // //                         )}
// // //                         {msg.text && <p className="break-words">{msg.text}</p>}
// // //                         <p className={`text-[9px] md:text-[10px] mt-1 text-right ${msg.sender === "me" ? "text-gray-200" : "text-gray-400"}`}>
// // //                           {msg.time}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               ))}

// // //               {tempStatusMessage && (
// // //                 <div className="text-center my-4 animate-fadeInOut">
// // //                   <div className="inline-block bg-blue-100 rounded-full px-4 py-2">
// // //                     <p className="text-xs text-blue-700 font-medium">{tempStatusMessage}</p>
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               <div ref={messagesEndRef} />
// // //             </div>

// // //             {/* File Upload Preview */}
// // //             {uploadedFile && (
// // //               <div className="border-t border-gray-200 px-3 sm:px-4 md:px-5 py-2 bg-gray-50 flex items-center justify-between flex-shrink-0">
// // //                 <div className="flex items-center gap-2 min-w-0">
// // //                   <div className="p-1 bg-blue-100 rounded flex-shrink-0">
// // //                     <Download size={14} className="text-blue-600" />
// // //                   </div>
// // //                   <div className="min-w-0">
// // //                     <p className="text-xs font-medium truncate max-w-[150px] sm:max-w-[200px]">{uploadedFile.name}</p>
// // //                     <p className="text-[10px] text-gray-500">{uploadedFile.size}</p>
// // //                   </div>
// // //                 </div>
// // //                 <button onClick={removeUploadedFile} className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0">
// // //                   <X size={14} className="text-gray-500" />
// // //                 </button>
// // //               </div>
// // //             )}

// // //             {/* Input */}
// // //             <div className="border-t px-3 sm:px-4 md:px-5 py-2.5 md:py-3 flex items-center gap-2 bg-white flex-shrink-0">
// // //               <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
// // //               <button onClick={triggerFileInput} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
// // //                 <Paperclip size={16} className="text-gray-500 md:w-[18px] md:h-[18px]" />
// // //               </button>
// // //               <input
// // //                 placeholder="Type here"
// // //                 value={messageInput}
// // //                 onChange={(e) => setMessageInput(e.target.value)}
// // //                 onKeyPress={handleKeyPress}
// // //                 className="flex-1 outline-none text-xs sm:text-sm px-3 py-2 bg-gray-100 rounded-full min-w-0"
// // //               />
// // //               <button
// // //                 onClick={handleSendMessage}
// // //                 disabled={(!messageInput.trim() && !uploadedFile) || isChatClosed}
// // //                 className={`p-2 md:p-2.5 rounded-full transition-colors flex-shrink-0 ${
// // //                   (messageInput.trim() || uploadedFile) && !isChatClosed
// // //                     ? "bg-[#6C2BD9] hover:bg-[#5a24b5] cursor-pointer"
// // //                     : "bg-gray-300 cursor-not-allowed"
// // //                 }`}
// // //               >
// // //                 <Send size={14} className="text-white md:w-[16px] md:h-[16px]" />
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Close dropdown on outside click */}
// // //       {showOptions && (
// // //         <div className="fixed inset-0 z-30" onClick={() => setShowOptions(false)} />
// // //       )}

// // //       <style>{`
// // //         @keyframes fadeInOut {
// // //           0% { opacity: 0; }
// // //           10% { opacity: 1; }
// // //           90% { opacity: 1; }
// // //           100% { opacity: 0; }
// // //         }
// // //         .animate-fadeInOut {
// // //           animation: fadeInOut 3s ease-in-out;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default PaymentRequestChat;



// // /////



// // import React, {
// //   useState,
// //   useRef,
// //   useEffect,
// //   useCallback,
// //   useMemo,
// // } from "react";
// // import { useLocation } from "react-router-dom";
// // import { Menu } from "lucide-react";
// // import { SideBar } from "../base-component/Sidebar.jsx";
// // import io from "socket.io-client";
// // import Cookies from "js-cookie";
// // import { ChatHeader } from "./sohailPayment/ChatHeader";
// // import { MessageList } from "./sohailPayment/MessageList";
// // import { ChatInput } from "./sohailPayment/ChatInput";

// // const SOCKET_URL = "https://apis.famocare.com";
// // const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
// // const DEFAULT_AVATAR =
// //   "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
// // const UPLOADS_BASE = "https://apis.famocare.com/uploads/";

// // const buildImageUrl = (raw) => {
// //   if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
// //   const s = raw.trim();
// //   if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) {
// //     return DEFAULT_AVATAR;
// //   }
// //   if (
// //     s.startsWith("http://") ||
// //     s.startsWith("https://") ||
// //     s.startsWith("data:")
// //   ) {
// //     return s;
// //   }
// //   return UPLOADS_BASE + s;
// // };

// // const PaymentRequestChat = ({
// //   currentUserId,
// //   receiverId: propReceiverId,
// //   managerId: propManagerId,
// //   chatUserData: propChatUserData,
// // }) => {
// //   const location = useLocation();
// //   const passedState = location.state || {};

// //   // ==================== STATE ====================
// //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// //   const [messageInput, setMessageInput] = useState("");
// //   const [chatMessages, setChatMessages] = useState([]);
// //   const [uploadedFile, setUploadedFile] = useState(null);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [isChatClosed, setIsChatClosed] = useState(false);
// //   const [isTyping, setIsTyping] = useState(false);
// //   const [isOnline, setIsOnline] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [filteredMessages, setFilteredMessages] = useState([]);
// //   const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
// //   const [matchedIndexes, setMatchedIndexes] = useState([]);
// //   const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
// //   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
// //   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
// //   const [chatStatus, setChatStatus] = useState("in progress");
// //   const [managerData, setManagerData] = useState(null);

// //   // ==================== REFS ====================
// //   const fileInputRef = useRef(null);
// //   const messagesEndRef = useRef(null);
// //   const socketRef = useRef(null);
// //   const typingTimeoutRef = useRef(null);
// //   const scrollContainerRef = useRef(null);

// //   // ==================== IDs ====================
// //   const user = JSON.parse(Cookies.get("referralUser") || "{}");
// //   const finalUserId = currentUserId || user?.id;

// //   const receiverId =
// //     passedState.receiverId ||
// //     propReceiverId ||
// //     passedState.managerId ||
// //     passedState.userId;

// //   const managerId = passedState.managerId || propManagerId;

// //   const redeemId =
// //     passedState.redeemId ||
// //     passedState.id ||
// //     passedState.redeemItem?.id ||
// //     location.state?.redeemId ||
// //     location.state?.id;

// //   // Set initial chat status from navigation state
// //   useEffect(() => {
// //     const initialStatus = passedState.status || "in progress";
// //     setChatStatus(initialStatus);
// //   }, [passedState.status]);

// //   // ==================== MANAGER DATA ====================
// //   useEffect(() => {
// //     const data =
// //       passedState.managerData ||
// //       passedState.chatUserData?.manager ||
// //       propChatUserData?.manager ||
// //       propChatUserData;

// //     if (data?.name) {
// //       setManagerData(data);
// //     }
// //   }, [passedState, propChatUserData]);

// //   const chatUser = useMemo(
// //     () => ({
// //       name: managerData?.name || "Manager",
// //       avatar: buildImageUrl(managerData?.imageUrl),
// //       id: managerData?.id,
// //       lastSeen: managerData?.lastSeen,
// //     }),
// //     [managerData],
// //   );

// //   // ==================== FORMATTERS ====================
// //   const formatTime = useCallback((date) => {
// //     return new Date(date).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   }, []);

// // const formatLastSeen = useCallback(() => {
// //   if (isOnline === null) return "Checking...";
// //   if (isOnline) return "Active now";

// //   if (managerData?.lastSeen) {
// //     const date = new Date(managerData.lastSeen);

// //     const now = new Date();
// //     const isToday = date.toDateString() === now.toDateString();

// //     const yesterday = new Date();
// //     yesterday.setDate(now.getDate() - 1);
// //     const isYesterday = date.toDateString() === yesterday.toDateString();

// //     const time = date.toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });

// //     if (isToday) return `Last seen today at ${time}`;
// //     if (isYesterday) return `Last seen yesterday at ${time}`;

// //     return `Last seen on ${date.toLocaleDateString()} at ${time}`;
// //   }

// //   return "Last seen recently";
// // }, [isOnline, managerData]);

// //   const formatMessageDate = useCallback((dateKey) => {
// //     const date = new Date(dateKey);
// //     const today = new Date();
// //     const yesterday = new Date(today);
// //     yesterday.setDate(today.getDate() - 1);

// //     if (date.toDateString() === today.toDateString()) return "Today";
// //     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

// //     return date.toLocaleDateString("en-US", {
// //       weekday: "long",
// //       month: "long",
// //       day: "numeric",
// //     });
// //   }, []);

// //   const statusStyles = useMemo(() => {
// //     switch (chatStatus) {
// //       case "resolved":
// //         return {
// //           bgColor: "bg-green-100",
// //           textColor: "text-green-600",
// //           displayText: "RESOLVED",
// //         };
// //       case "unresolved":
// //         return {
// //           bgColor: "bg-red-100",
// //           textColor: "text-red-600",
// //           displayText: "UNRESOLVED",
// //         };
// //       default:
// //         return {
// //           bgColor: "bg-[#E0E0E0]",
// //           textColor: "text-[#3887FD]",
// //           displayText: "IN PROGRESS",
// //         };
// //     }
// //   }, [chatStatus]);

// //   // ==================== SCROLL HELPERS ====================
// //   const scrollToBottom = useCallback(() => {
// //     messagesEndRef.current?.scrollIntoView({
// //       behavior: "smooth",
// //       block: "end",
// //     });
// //   }, []);

// //   // ==================== SCROLL + BUTTON LOGIC (FIXED) ====================

// //   // ✅ Handle scroll button visibility (like ChatGPT)
// //   useEffect(() => {
// //     const container = scrollContainerRef.current;
// //     if (!container) return;

// //     const handleScroll = () => {
// //       const { scrollTop, scrollHeight, clientHeight } = container;

// //       const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

// //       // ✅ Show button only when user scrolls UP
// //       const hasScroll = scrollHeight > clientHeight;

// //       if (hasScroll) {
// //         setShowScrollToBottom(distanceFromBottom > 100);
// //       } else {
// //         // ✅ fallback: show if many
// //         setShowScrollToBottom(chatMessages.length > 8);
// //       }
// //     };

// //     container.addEventListener("scroll", handleScroll, { passive: true });

// //     // Initial check
// //     setTimeout(handleScroll, 200);

// //     return () => {
// //       container.removeEventListener("scroll", handleScroll);
// //     };
// //   }, [chatMessages]);

// //   // ==================== AUTO SCROLL (PROFESSIONAL) ====================
// //   useEffect(() => {
// //     if (isLoadingHistory || chatMessages.length === 0) return;

// //     const container = scrollContainerRef.current;
// //     if (!container) return;

// //     const distanceFromBottom =
// //       container.scrollHeight - (container.scrollTop + container.clientHeight);

// //     const isNearBottom = distanceFromBottom < 80;

// //     // ✅ First time → always scroll
// //     if (!hasInitialScrollDone) {
// //       setTimeout(() => {
// //         scrollToBottom();
// //         setHasInitialScrollDone(true);
// //       }, 100);
// //       return;
// //     }

// //     // ✅ Only auto-scroll if already near bottom
// //     if (isNearBottom) {
// //       setTimeout(() => {
// //         scrollToBottom();
// //       }, 100);
// //     }
// //   }, [
// //     chatMessages.length,
// //     isLoadingHistory,
// //     hasInitialScrollDone,
// //     scrollToBottom,
// //   ]);

// //   // Reset state when switching between different redeem requests
// //   useEffect(() => {
// //     setChatMessages([]);
// //     setFilteredMessages([]);
// //     setSearchQuery("");
// //     setHasInitialScrollDone(false);
// //     setIsLoadingHistory(true);
// //   }, [redeemId]);

// //   // ====================== SOCKET SETUP ======================
// //   useEffect(() => {
// //     if (!finalUserId || !receiverId || !redeemId) {
// //       console.warn("Missing required IDs for socket connection");
// //       return;
// //     }

// //     socketRef.current?.disconnect();

// //     const socket = io(SOCKET_URL, {
// //       auth: { userId: finalUserId },
// //       transports: ["websocket", "polling"],
// //       reconnection: true,
// //       reconnectionAttempts: 10,
// //       reconnectionDelay: 1000,
// //     });

// //     socketRef.current = socket;

// //     const roomPayload = {
// //       senderId: finalUserId,
// //       receiverId,
// //       redeemId,
// //     };

// //     socket.emit("joinChat", roomPayload);
// //     socket.emit("fetchMessages", roomPayload);
// //     socket.emit("markAllMessagesAsRead", {
// //   senderId: receiverId,
// //   receiverId: finalUserId,
// //   redeemId,
// //   readerId: finalUserId,
// // });
// //     socket.emit("getUserStatus", {
// //       userId: receiverId,
// //       senderType: "manager",
// //     });

// //     socket.on("allMessagesRead", (data) => {
// //   console.log("✅ Messages marked as read:", data);
// // });

// //     // Declare user online + update last seen
// //     socket.emit("userOnline", { userId: finalUserId, senderType: "user" });
// //     socket.emit("updateLastSeen", { userId: finalUserId, senderType: "user" });

// //     // Periodic status check every 8 seconds (best practice)
// //     const statusInterval = setInterval(() => {
// //       socket.emit("getUserStatus", {
// //         userId: receiverId,
// //         senderType: "manager",
// //       });
// //     }, 8000);

// //     socket.on("previousMessages", (messages) => {
// //       console.log("📥 previousMessages received:", messages?.length || 0);
// //       const formatted = (messages || []).map((msg) => ({
// //         id: msg.id,
// //         text: msg.messageType === "image" ? "" : msg.message || "",
// //         time: formatTime(msg.createdAt),
// //         createdAt: msg.createdAt,
// //         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
// //         messageType: msg.messageType || "text",
// //         imageUrl: msg.messageType === "image" ? msg.message : null,
// //       }));

// //       setChatMessages(formatted);
// //       setIsLoadingHistory(false);
// //     });

// //     socket.on("receiveMessage", (msg) => {
// //       const formatted = {
// //         id: msg.id,
// //         text: msg.messageType === "image" ? "" : msg.message || "",
// //         time: formatTime(msg.createdAt),
// //         createdAt: msg.createdAt,
// //         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
// //         messageType: msg.messageType || "text",
// //         imageUrl: msg.messageType === "image" ? msg.message : null,
// //       };

// //       setChatMessages((prev) => {
// //         if (prev.some((m) => m.id === formatted.id)) return prev;
// //         return [...prev, formatted];
// //       });
// //     });

// //     socket.on("userTyping", ({ senderId }) => {
// //       if (String(senderId) === String(receiverId)) setIsTyping(true);
// //     });

// //     socket.on("userStoppedTyping", ({ senderId }) => {
// //       if (String(senderId) === String(receiverId)) setIsTyping(false);
// //     });

// //     // ==================== IMPROVED STATUS LISTENER ====================
// //     socket.on("userStatusChanged", (data) => {
// //       console.log("🔴 [DEBUG User Side] userStatusChanged:", data);

// //       if (String(data?.userId) === String(receiverId)) {
// //         const isNowOnline = data.status === "online";
// //         setIsOnline(isNowOnline);

// //         if (data.lastSeen) {
// //           setManagerData((prev) =>
// //             prev ? { ...prev, lastSeen: data.lastSeen } : prev,
// //           );
// //         }

// //         console.log(
// //           `🎯 Manager Status → ${isNowOnline ? "🟢 ONLINE" : "⚫ OFFLINE"}`,
// //         );
// //       }
// //     });

// //     socket.on("connect", () => {
// //       console.log("✅ [User Side] Socket Connected");

// //       socket.emit("getUserStatus", {
// //         userId: receiverId,
// //         senderType: "manager",
// //       });
// //     });
// //     socket.on("disconnect", (reason) =>
// //       console.log("❌ [User Side] Disconnected:", reason),
// //     );

// //     return () => {
// //       clearInterval(statusInterval);
// //       socket.disconnect();
// //     };
// //   }, [finalUserId, receiverId, redeemId, formatTime]);

// //   // ====================== SEARCH ======================
// //   useEffect(() => {
// //     if (!searchQuery.trim()) {
// //       setFilteredMessages(chatMessages);
// //       setMatchedIndexes([]);
// //       setCurrentMatchIndex(0);
// //       return;
// //     }

// //     const query = searchQuery.toLowerCase().trim();
// //     const indexes = [];
// //     const filtered = chatMessages.filter((msg, index) => {
// //       const match = (msg.text || "").toLowerCase().includes(query);
// //       if (match) indexes.push(index);
// //       return match;
// //     });

// //     setFilteredMessages(filtered);
// //     setMatchedIndexes(indexes);
// //     setCurrentMatchIndex(0);
// //   }, [searchQuery, chatMessages]);

// //   // Highlight navigation effect
// //   useEffect(() => {
// //     if (matchedIndexes.length === 0) return;
// //     const index = matchedIndexes[currentMatchIndex];
// //     const el = document.querySelector(`[data-msg-index="${index}"]`);
// //     if (el) {
// //       el.scrollIntoView({ behavior: "smooth", block: "center" });
// //     }
// //   }, [currentMatchIndex, matchedIndexes]);

// //   // ====================== HANDLERS ======================
// //   const uploadAndSendFile = useCallback(
// //     async (file, accompanyingText = "") => {
// //       if (!file || isUploading) return;

// //       setIsUploading(true);
// //       const formData = new FormData();
// //       formData.append("image", file);

// //       try {
// //         const res = await fetch(UPLOAD_URL, {
// //           method: "POST",
// //           body: formData,
// //         });
// //         const result = await res.json();

// //         if (result.success && result.data?.imageUrl) {
// //           socketRef.current?.emit("sendMessage", {
// //             senderId: finalUserId,
// //             receiverId,
// //             redeemId,
// //             message: accompanyingText || result.data.imageUrl,
// //             senderType: "user",
// //             messageType: "image",
// //             managerId,
// //           });
// //         } else {
// //           alert("Failed to upload image. Please try again.");
// //         }
// //       } catch (error) {
// //         console.error("Upload error:", error);
// //         alert("Error uploading image");
// //       } finally {
// //         setIsUploading(false);
// //         setUploadedFile(null);
// //         if (fileInputRef.current) fileInputRef.current.value = "";
// //       }
// //     },
// //     [finalUserId, receiverId, redeemId, managerId, isUploading],
// //   );

// //   const handleSendMessage = useCallback(() => {
// //     if (
// //       isChatClosed ||
// //       isUploading ||
// //       (!messageInput.trim() && !uploadedFile)
// //     ) {
// //       return;
// //     }

// //     if (uploadedFile) {
// //       uploadAndSendFile(uploadedFile, messageInput.trim());
// //     } else {
// //       socketRef.current?.emit("sendMessage", {
// //         senderId: finalUserId,
// //         receiverId,
// //         redeemId,
// //         message: messageInput.trim(),
// //         senderType: "user",
// //         messageType: "text",
// //         managerId,
// //       });
// //     }

// //     setMessageInput("");
// //   }, [
// //     messageInput,
// //     uploadedFile,
// //     isChatClosed,
// //     isUploading,
// //     finalUserId,
// //     receiverId,
// //     redeemId,
// //     managerId,
// //     uploadAndSendFile,
// //   ]);

// //   const handleFileUpload = useCallback(
// //     (e) => {
// //       if (isUploading) return;
// //       const file = e.target.files?.[0];
// //       if (file) {
// //         setUploadedFile(file);
// //         setMessageInput("");
// //       }
// //     },
// //     [isUploading],
// //   );

// //   const triggerFileInput = useCallback(() => {
// //     if (!isUploading) {
// //       fileInputRef.current?.click();
// //     }
// //   }, [isUploading]);

// //   const removeUploadedFile = useCallback(() => {
// //     setUploadedFile(null);
// //     if (fileInputRef.current) fileInputRef.current.value = "";
// //   }, []);

// //   const handleInputChange = useCallback(
// //     (e) => {
// //       if (isUploading || uploadedFile) {
// //         setMessageInput("");
// //         return;
// //       }

// //       const value = e.target.value;
// //       setMessageInput(value);

// //       if (socketRef.current) {
// //         socketRef.current.emit("typing", {
// //           senderId: finalUserId,
// //           receiverId,
// //           redeemId,
// //         });

// //         if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

// //         typingTimeoutRef.current = setTimeout(() => {
// //           socketRef.current?.emit("stopTyping", {
// //             senderId: finalUserId,
// //             receiverId,
// //             redeemId,
// //           });
// //         }, 1800);
// //       }
// //     },
// //     [finalUserId, receiverId, redeemId, isUploading, uploadedFile],
// //   );

// //   // Cleanup timeout on unmount
// //   useEffect(() => {
// //     return () => {
// //       if (typingTimeoutRef.current) {
// //         clearTimeout(typingTimeoutRef.current);
// //       }
// //     };
// //   }, []);

// //   // ====================== RENDER ======================
// //   return (
// //     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
// //       {/* Sidebar */}
// //       <div
// //         className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}
// //       >
// //         <SideBar
// //           isDrawer={isDrawerOpen}
// //           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
// //         />
// //       </div>

// //       {isDrawerOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
// //           onClick={() => setIsDrawerOpen(false)}
// //         />
// //       )}

// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
// //         {/* Mobile Purple Header */}
// //         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
// //               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
// //             >
// //               <Menu size={18} className="text-[#691188]" />
// //             </button>
// //             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
// //               Payment Request Chat
// //             </h1>
// //           </div>
// //           <img
// //             src={chatUser.avatar}
// //             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
// //             alt={chatUser.name}
// //             onError={(e) => {
// //               e.target.src = DEFAULT_AVATAR;
// //             }}
// //           />
// //         </div>

// //         {/* Spacer for mobile header */}
// //         <div className="h-[60px] xl:hidden" />

// //         {/* Chat Container */}
// //         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">
// //           {" "}
// //           <div className="h-[60px] w-full hidden xl:block bg-[#FFFFFF]" />
// //           <div className="flex-1 flex flex-col lg:px-8 lg:mt-8 overflow-hidden">
// //             {/* Chat Header */}
// //             <div className="flex-shrink-0">
// //               <ChatHeader
// //                 chatUser={chatUser}
// //                 isChatClosed={isChatClosed}
// //                 searchQuery={searchQuery}
// //                 onSearchChange={setSearchQuery}
// //                 formatLastSeen={formatLastSeen}
// //                 chatStatus={chatStatus}
// //                 totalMatches={matchedIndexes.length}
// //                 currentMatchIndex={currentMatchIndex}
// //                 onNext={() =>
// //                   setCurrentMatchIndex((prev) =>
// //                     prev < matchedIndexes.length - 1 ? prev + 1 : prev,
// //                   )
// //                 }
// //                 onPrev={() =>
// //                   setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
// //                 }
// //                 isTyping={isTyping}
// //                   isOnline={isOnline}   // ✅ ADD THIS LINE

// //               />
// //             </div>

// //             {/* Messages Area */}
// //             <div
// //               ref={scrollContainerRef}
// //               id="chat-scroll"
// //               className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
// //             >
// //               <MessageList
// //                 filteredMessages={filteredMessages}
// //                 searchQuery={searchQuery}
// //                 formatMessageDate={formatMessageDate}
// //                 isLoading={isLoadingHistory}
// //                 showScrollToBottom={showScrollToBottom}
// //                 onScrollToBottom={scrollToBottom}
// //               />
// //               <div ref={messagesEndRef} />
// //             </div>

// //             {/* Scroll to Bottom Button - Larger Bottom Shadow */}
// //             {showScrollToBottom && (
// //               <button
// //                 onClick={scrollToBottom}
// //                 className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
// // bg-[#F4F4F4] hover:bg-[#c6c9c9] 
// // p-2 rounded-full 
// // shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
// // hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
// // transition-all duration-300 ease-out
// // flex items-center justify-center border border-white/80
// // active:scale-95
// // opacity-100 translate-y-0"
// //                 aria-label="Scroll to bottom"
// //               >
// //                 <img
// //                   src="/scroll-icon.svg"
// //                   alt="scroll down"
// //                   className="w-5 h-5 object-contain "
// //                 />
// //               </button>
// //             )}

// //             {/* Chat Input */}
// //             <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
// //               <ChatInput
// //                 messageInput={messageInput}
// //                 onMessageChange={handleInputChange}
// //                 onSendMessage={handleSendMessage}
// //                 uploadedFile={uploadedFile}
// //                 onFileUpload={handleFileUpload}
// //                 onRemoveFile={removeUploadedFile}
// //                 isUploading={isUploading}
// //                 isChatClosed={isChatClosed}
// //                 triggerFileInput={triggerFileInput}
// //                 fileInputRef={fileInputRef}
// //                 chatStatus={chatStatus}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const MemoizedChat = React.memo(PaymentRequestChat);
// // export default MemoizedChat;


// // import React, {
// //   useState,
// //   useRef,
// //   useEffect,
// //   useCallback,
// //   useMemo,
// // } from "react";
// // import { useLocation } from "react-router-dom";
// // import { Menu } from "lucide-react";
// // import { SideBar } from "../base-component/Sidebar.jsx";
// // import io from "socket.io-client";
// // import Cookies from "js-cookie";
// // import { ChatHeader } from "./sohailPayment/ChatHeader";
// // import { MessageList } from "./sohailPayment/MessageList";
// // import { ChatInput } from "./sohailPayment/ChatInput";

// // const SOCKET_URL = "https://apis.famocare.com";
// // const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
// // const DEFAULT_AVATAR =
// //   "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
// // const UPLOADS_BASE = "https://apis.famocare.com/uploads/";

// // const buildImageUrl = (raw) => {
// //   if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
// //   const s = raw.trim();
// //   if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) {
// //     return DEFAULT_AVATAR;
// //   }
// //   if (
// //     s.startsWith("http://") ||
// //     s.startsWith("https://") ||
// //     s.startsWith("data:")
// //   ) {
// //     return s;
// //   }
// //   return UPLOADS_BASE + s;
// // };

// // const PaymentRequestChat = ({
// //   currentUserId,
// //   receiverId: propReceiverId,
// //   managerId: propManagerId,
// //   chatUserData: propChatUserData,
// // }) => {
// //   const location = useLocation();
// //   const passedState = location.state || {};

// //   // ==================== STATE ====================
// //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// //   const [messageInput, setMessageInput] = useState("");
// //   const [chatMessages, setChatMessages] = useState([]);
// //   const [uploadedFile, setUploadedFile] = useState(null);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [isChatClosed, setIsChatClosed] = useState(false);
// //   const [isTyping, setIsTyping] = useState(false);
// //   const [isOnline, setIsOnline] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [filteredMessages, setFilteredMessages] = useState([]);
// //   const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
// //   const [matchedIndexes, setMatchedIndexes] = useState([]);
// //   const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
// //   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
// //   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
// //   const [chatStatus, setChatStatus] = useState("in progress");
// //   const [managerData, setManagerData] = useState(null);

// //   // ==================== REFS ====================
// //   const fileInputRef = useRef(null);
// //   const messagesEndRef = useRef(null);
// //   const socketRef = useRef(null);
// //   const typingTimeoutRef = useRef(null);
// //   const scrollContainerRef = useRef(null);

// //   // ==================== IDs ====================
// //   const user = JSON.parse(Cookies.get("referralUser") || "{}");
// //   const finalUserId = currentUserId || user?.id;

// //   const receiverId =
// //     passedState.receiverId ||
// //     propReceiverId ||
// //     passedState.managerId ||
// //     passedState.userId;

// //   const managerId = passedState.managerId || propManagerId;

// //   const redeemId =
// //     passedState.redeemId ||
// //     passedState.id ||
// //     passedState.redeemItem?.id ||
// //     location.state?.redeemId ||
// //     location.state?.id;

// //   // Set initial chat status from navigation state
// //   useEffect(() => {
// //     const initialStatus = passedState.status || "in progress";
// //     setChatStatus(initialStatus);
// //   }, [passedState.status]);

// //   // ==================== MANAGER DATA ====================
// //   useEffect(() => {
// //     const data =
// //       passedState.managerData ||
// //       passedState.chatUserData?.manager ||
// //       propChatUserData?.manager ||
// //       propChatUserData;

// //     if (data?.name) {
// //       setManagerData(data);
// //     }
// //   }, [passedState, propChatUserData]);

// //   const chatUser = useMemo(
// //     () => ({
// //       name: managerData?.name || "Manager",
// //       avatar: buildImageUrl(managerData?.imageUrl),
// //       id: managerData?.id,
// //       lastSeen: managerData?.lastSeen,
// //     }),
// //     [managerData],
// //   );

// //   // ==================== FORMATTERS ====================
// //   const formatTime = useCallback((date) => {
// //     return new Date(date).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   }, []);

// // const formatLastSeen = useCallback(() => {
// //   if (isOnline === null) return "Checking...";
// //   if (isOnline) return "Active now";

// //   if (managerData?.lastSeen) {
// //     const date = new Date(managerData.lastSeen);

// //     const now = new Date();
// //     const isToday = date.toDateString() === now.toDateString();

// //     const yesterday = new Date();
// //     yesterday.setDate(now.getDate() - 1);
// //     const isYesterday = date.toDateString() === yesterday.toDateString();

// //     const time = date.toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });

// //     if (isToday) return `Last seen today at ${time}`;
// //     if (isYesterday) return `Last seen yesterday at ${time}`;

// //     return `Last seen on ${date.toLocaleDateString()} at ${time}`;
// //   }

// //   return "Last seen recently";
// // }, [isOnline, managerData]);

// //   const formatMessageDate = useCallback((dateKey) => {
// //     const date = new Date(dateKey);
// //     const today = new Date();
// //     const yesterday = new Date(today);
// //     yesterday.setDate(today.getDate() - 1);

// //     if (date.toDateString() === today.toDateString()) return "Today";
// //     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

// //     return date.toLocaleDateString("en-US", {
// //       weekday: "long",
// //       month: "long",
// //       day: "numeric",
// //     });
// //   }, []);

// //   const statusStyles = useMemo(() => {
// //     switch (chatStatus) {
// //       case "resolved":
// //         return {
// //           bgColor: "bg-green-100",
// //           textColor: "text-green-600",
// //           displayText: "RESOLVED",
// //         };
// //       case "unresolved":
// //         return {
// //           bgColor: "bg-red-100",
// //           textColor: "text-red-600",
// //           displayText: "UNRESOLVED",
// //         };
// //       default:
// //         return {
// //           bgColor: "bg-[#E0E0E0]",
// //           textColor: "text-[#3887FD]",
// //           displayText: "IN PROGRESS",
// //         };
// //     }
// //   }, [chatStatus]);

// //   // ==================== SCROLL HELPERS ====================
// //   const scrollToBottom = useCallback(() => {
// //     messagesEndRef.current?.scrollIntoView({
// //       behavior: "smooth",
// //       block: "end",
// //     });
// //   }, []);

// //   // ==================== SCROLL + BUTTON LOGIC (FIXED) ====================

// //   // ✅ Handle scroll button visibility (like ChatGPT)
// //   useEffect(() => {
// //     const container = scrollContainerRef.current;
// //     if (!container) return;

// //     const handleScroll = () => {
// //       const { scrollTop, scrollHeight, clientHeight } = container;

// //       const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

// //       // ✅ Show button only when user scrolls UP
// //       const hasScroll = scrollHeight > clientHeight;

// //       if (hasScroll) {
// //         setShowScrollToBottom(distanceFromBottom > 100);
// //       } else {
// //         // ✅ fallback: show if many
// //         setShowScrollToBottom(chatMessages.length > 8);
// //       }
// //     };

// //     container.addEventListener("scroll", handleScroll, { passive: true });

// //     // Initial check
// //     setTimeout(handleScroll, 200);

// //     return () => {
// //       container.removeEventListener("scroll", handleScroll);
// //     };
// //   }, [chatMessages]);

// //   // ==================== AUTO SCROLL (PROFESSIONAL) ====================
// //   useEffect(() => {
// //     if (isLoadingHistory || chatMessages.length === 0) return;

// //     const container = scrollContainerRef.current;
// //     if (!container) return;

// //     const distanceFromBottom =
// //       container.scrollHeight - (container.scrollTop + container.clientHeight);

// //     const isNearBottom = distanceFromBottom < 80;

// //     // ✅ First time → always scroll
// //     if (!hasInitialScrollDone) {
// //       setTimeout(() => {
// //         scrollToBottom();
// //         setHasInitialScrollDone(true);
// //       }, 100);
// //       return;
// //     }

// //     // ✅ Only auto-scroll if already near bottom
// //     if (isNearBottom) {
// //       setTimeout(() => {
// //         scrollToBottom();
// //       }, 100);
// //     }
// //   }, [
// //     chatMessages.length,
// //     isLoadingHistory,
// //     hasInitialScrollDone,
// //     scrollToBottom,
// //   ]);

// //   // Reset state when switching between different redeem requests
// //   useEffect(() => {
// //     setChatMessages([]);
// //     setFilteredMessages([]);
// //     setSearchQuery("");
// //     setHasInitialScrollDone(false);
// //     setIsLoadingHistory(true);
// //   }, [redeemId]);

// //   // ====================== SOCKET SETUP ======================
// //   useEffect(() => {
// //     if (!finalUserId || !receiverId || !redeemId) {
// //       console.warn("Missing required IDs for socket connection");
// //       return;
// //     }

// //     socketRef.current?.disconnect();

// //     const socket = io(SOCKET_URL, {
// //       auth: { userId: finalUserId },
// //       transports: ["websocket", "polling"],
// //       reconnection: true,
// //       reconnectionAttempts: 10,
// //       reconnectionDelay: 1000,
// //     });

// //     socketRef.current = socket;

// //     const roomPayload = {
// //       senderId: finalUserId,
// //       receiverId,
// //       redeemId,
// //     };

// //     socket.emit("joinChat", roomPayload);
// //     socket.emit("fetchMessages", roomPayload);
// //     socket.emit("markAllMessagesAsRead", {
// //   senderId: receiverId,
// //   receiverId: finalUserId,
// //   redeemId,
// //   readerId: finalUserId,
// // });
// //     socket.emit("getUserStatus", {
// //       userId: receiverId,
// //       senderType: "manager",
// //     });

// //     socket.on("allMessagesRead", (data) => {
// //   console.log("✅ Messages marked as read:", data);
// // });

// //     // Declare user online + update last seen
// //     socket.emit("userOnline", { userId: finalUserId, senderType: "user" });
// //     socket.emit("updateLastSeen", { userId: finalUserId, senderType: "user" });

// //     // Periodic status check every 8 seconds (best practice)
// //     const statusInterval = setInterval(() => {
// //       socket.emit("getUserStatus", {
// //         userId: receiverId,
// //         senderType: "manager",
// //       });
// //     }, 8000);

// //     socket.on("previousMessages", (messages) => {
// //       console.log("📥 previousMessages received:", messages?.length || 0);
// //       const formatted = (messages || []).map((msg) => ({
// //         id: msg.id,
// //         text: msg.messageType === "image" ? "" : msg.message || "",
// //         time: formatTime(msg.createdAt),
// //         createdAt: msg.createdAt,
// //         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
// //         messageType: msg.messageType || "text",
// //         imageUrl: msg.messageType === "image" ? msg.message : null,
// //       }));

// //       setChatMessages(formatted);
// //       setIsLoadingHistory(false);
// //     });

// //     socket.on("receiveMessage", (msg) => {
// //       const formatted = {
// //         id: msg.id,
// //         text: msg.messageType === "image" ? "" : msg.message || "",
// //         time: formatTime(msg.createdAt),
// //         createdAt: msg.createdAt,
// //         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
// //         messageType: msg.messageType || "text",
// //         imageUrl: msg.messageType === "image" ? msg.message : null,
// //       };

// //       setChatMessages((prev) => {
// //         if (prev.some((m) => m.id === formatted.id)) return prev;
// //         return [...prev, formatted];
// //       });
// //     });

// //     socket.on("userTyping", ({ senderId }) => {
// //       if (String(senderId) === String(receiverId)) setIsTyping(true);
// //     });

// //     socket.on("userStoppedTyping", ({ senderId }) => {
// //       if (String(senderId) === String(receiverId)) setIsTyping(false);
// //     });

// //     // ==================== IMPROVED STATUS LISTENER ====================
// //     socket.on("userStatusChanged", (data) => {
// //       console.log("🔴 [DEBUG User Side] userStatusChanged:", data);

// //       if (String(data?.userId) === String(receiverId)) {
// //         const isNowOnline = data.status === "online";
// //         setIsOnline(isNowOnline);

// //         if (data.lastSeen) {
// //           setManagerData((prev) =>
// //             prev ? { ...prev, lastSeen: data.lastSeen } : prev,
// //           );
// //         }

// //         console.log(
// //           `🎯 Manager Status → ${isNowOnline ? "🟢 ONLINE" : "⚫ OFFLINE"}`,
// //         );
// //       }
// //     });

// //     socket.on("connect", () => {
// //       console.log("✅ [User Side] Socket Connected");

// //       socket.emit("getUserStatus", {
// //         userId: receiverId,
// //         senderType: "manager",
// //       });
// //     });
// //     socket.on("disconnect", (reason) =>
// //       console.log("❌ [User Side] Disconnected:", reason),
// //     );

// //     return () => {
// //       clearInterval(statusInterval);
// //       socket.disconnect();
// //     };
// //   }, [finalUserId, receiverId, redeemId, formatTime]);

// //   // ====================== SEARCH ======================
// //   useEffect(() => {
// //     if (!searchQuery.trim()) {
// //       setFilteredMessages(chatMessages);
// //       setMatchedIndexes([]);
// //       setCurrentMatchIndex(0);
// //       return;
// //     }

// //     const query = searchQuery.toLowerCase().trim();
// //     const indexes = [];
// //     const filtered = chatMessages.filter((msg, index) => {
// //       const match = (msg.text || "").toLowerCase().includes(query);
// //       if (match) indexes.push(index);
// //       return match;
// //     });

// //     setFilteredMessages(filtered);
// //     setMatchedIndexes(indexes);
// //     setCurrentMatchIndex(0);
// //   }, [searchQuery, chatMessages]);

// //   // Highlight navigation effect
// //   useEffect(() => {
// //     if (matchedIndexes.length === 0) return;
// //     const index = matchedIndexes[currentMatchIndex];
// //     const el = document.querySelector(`[data-msg-index="${index}"]`);
// //     if (el) {
// //       el.scrollIntoView({ behavior: "smooth", block: "center" });
// //     }
// //   }, [currentMatchIndex, matchedIndexes]);

// //   // ====================== HANDLERS ======================
// //   const uploadAndSendFile = useCallback(
// //     async (file, accompanyingText = "") => {
// //       if (!file || isUploading) return;

// //       setIsUploading(true);
// //       const formData = new FormData();
// //       formData.append("image", file);

// //       try {
// //         const res = await fetch(UPLOAD_URL, {
// //           method: "POST",
// //           body: formData,
// //         });
// //         const result = await res.json();

// //         if (result.success && result.data?.imageUrl) {
// //           socketRef.current?.emit("sendMessage", {
// //             senderId: finalUserId,
// //             receiverId,
// //             redeemId,
// //             message: accompanyingText || result.data.imageUrl,
// //             senderType: "user",
// //             messageType: "image",
// //             managerId,
// //           });
// //         } else {
// //           alert("Failed to upload image. Please try again.");
// //         }
// //       } catch (error) {
// //         console.error("Upload error:", error);
// //         alert("Error uploading image");
// //       } finally {
// //         setIsUploading(false);
// //         setUploadedFile(null);
// //         if (fileInputRef.current) fileInputRef.current.value = "";
// //       }
// //     },
// //     [finalUserId, receiverId, redeemId, managerId, isUploading],
// //   );

// //   const handleSendMessage = useCallback(() => {
// //     if (
// //       isChatClosed ||
// //       isUploading ||
// //       (!messageInput.trim() && !uploadedFile)
// //     ) {
// //       return;
// //     }

// //     if (uploadedFile) {
// //       uploadAndSendFile(uploadedFile, messageInput.trim());
// //     } else {
// //       socketRef.current?.emit("sendMessage", {
// //         senderId: finalUserId,
// //         receiverId,
// //         redeemId,
// //         message: messageInput.trim(),
// //         senderType: "user",
// //         messageType: "text",
// //         managerId,
// //       });
// //     }

// //     setMessageInput("");
// //   }, [
// //     messageInput,
// //     uploadedFile,
// //     isChatClosed,
// //     isUploading,
// //     finalUserId,
// //     receiverId,
// //     redeemId,
// //     managerId,
// //     uploadAndSendFile,
// //   ]);

// //   const handleFileUpload = useCallback(
// //     (e) => {
// //       if (isUploading) return;
// //       const file = e.target.files?.[0];
// //       if (file) {
// //         setUploadedFile(file);
// //         setMessageInput("");
// //       }
// //     },
// //     [isUploading],
// //   );

// //   const triggerFileInput = useCallback(() => {
// //     if (!isUploading) {
// //       fileInputRef.current?.click();
// //     }
// //   }, [isUploading]);

// //   const removeUploadedFile = useCallback(() => {
// //     setUploadedFile(null);
// //     if (fileInputRef.current) fileInputRef.current.value = "";
// //   }, []);

// //   const handleInputChange = useCallback(
// //     (e) => {
// //       if (isUploading || uploadedFile) {
// //         setMessageInput("");
// //         return;
// //       }

// //       const value = e.target.value;
// //       setMessageInput(value);

// //       if (socketRef.current) {
// //         socketRef.current.emit("typing", {
// //           senderId: finalUserId,
// //           receiverId,
// //           redeemId,
// //         });

// //         if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

// //         typingTimeoutRef.current = setTimeout(() => {
// //           socketRef.current?.emit("stopTyping", {
// //             senderId: finalUserId,
// //             receiverId,
// //             redeemId,
// //           });
// //         }, 1800);
// //       }
// //     },
// //     [finalUserId, receiverId, redeemId, isUploading, uploadedFile],
// //   );

// //   // Cleanup timeout on unmount
// //   useEffect(() => {
// //     return () => {
// //       if (typingTimeoutRef.current) {
// //         clearTimeout(typingTimeoutRef.current);
// //       }
// //     };
// //   }, []);

// //   // ====================== RENDER ======================
// //   return (
// //     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
// //       {/* Sidebar */}
// //       <div
// //         className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}
// //       >
// //         <SideBar
// //           isDrawer={isDrawerOpen}
// //           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
// //         />
// //       </div>

// //       {isDrawerOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
// //           onClick={() => setIsDrawerOpen(false)}
// //         />
// //       )}

// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
// //         {/* Mobile Purple Header */}
// //         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
// //               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
// //             >
// //               <Menu size={18} className="text-[#691188]" />
// //             </button>
// //             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
// //               Payment Request Chat
// //             </h1>
// //           </div>
// //           <img
// //             src={chatUser.avatar}
// //             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
// //             alt={chatUser.name}
// //             onError={(e) => {
// //               e.target.src = DEFAULT_AVATAR;
// //             }}
// //           />
// //         </div>

// //         {/* Spacer for mobile header */}
// //         <div className="h-[60px] xl:hidden" />

// //         {/* Chat Container */}
// //         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">
// //           {" "}
// //           {/* <div className="h-[60px] w-full hidden xl:block bg-[#FFFFFF]" /> */}

// //           <div className="flex-1 flex flex-col lg:px-8 lg:mt-8 overflow-hidden">
// //             {/* Chat Header */}
// //             <div className="flex-shrink-0">
// //               <ChatHeader
// //                 chatUser={chatUser}
// //                 isChatClosed={isChatClosed}
// //                 searchQuery={searchQuery}
// //                 onSearchChange={setSearchQuery}
// //                 formatLastSeen={formatLastSeen}
// //                 chatStatus={chatStatus}
// //                 totalMatches={matchedIndexes.length}
// //                 currentMatchIndex={currentMatchIndex}
// //                 onNext={() =>
// //                   setCurrentMatchIndex((prev) =>
// //                     prev < matchedIndexes.length - 1 ? prev + 1 : prev,
// //                   )
// //                 }
// //                 onPrev={() =>
// //                   setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
// //                 }
// //                 isTyping={isTyping}
// //                   isOnline={isOnline}   // ✅ ADD THIS LINE

// //               />
// //             </div>

// //             {/* Messages Area */}
// //             <div
// //               ref={scrollContainerRef}
// //               id="chat-scroll"
// //               className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
// //             >
// //               <MessageList
// //                 filteredMessages={filteredMessages}
// //                 searchQuery={searchQuery}
// //                 formatMessageDate={formatMessageDate}
// //                 isLoading={isLoadingHistory}
// //                 showScrollToBottom={showScrollToBottom}
// //                 onScrollToBottom={scrollToBottom}
// //               />
// //               <div ref={messagesEndRef} />
// //             </div>

// //             {/* Scroll to Bottom Button - Larger Bottom Shadow */}
// //             {showScrollToBottom && (
// //               <button
// //                 onClick={scrollToBottom}
// //                 className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
// // bg-[#F4F4F4] hover:bg-[#c6c9c9] 
// // p-2 rounded-full 
// // shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
// // hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
// // transition-all duration-300 ease-out
// // flex items-center justify-center border border-white/80
// // active:scale-95
// // opacity-100 translate-y-0"
// //                 aria-label="Scroll to bottom"
// //               >
// //                 <img
// //                   src="/scroll-icon.svg"
// //                   alt="scroll down"
// //                   className="w-5 h-5 object-contain "
// //                 />
// //               </button>
// //             )}

// //             {/* Chat Input */}
// //             <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
// //               <ChatInput
// //                 messageInput={messageInput}
// //                 onMessageChange={handleInputChange}
// //                 onSendMessage={handleSendMessage}
// //                 uploadedFile={uploadedFile}
// //                 onFileUpload={handleFileUpload}
// //                 onRemoveFile={removeUploadedFile}
// //                 isUploading={isUploading}
// //                 isChatClosed={isChatClosed}
// //                 triggerFileInput={triggerFileInput}
// //                 fileInputRef={fileInputRef}
// //                 chatStatus={chatStatus}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const MemoizedChat = React.memo(PaymentRequestChat);
// // export default MemoizedChat;


// ////

// // import React, {
// //   useState,
// //   useRef,
// //   useEffect,
// //   useCallback,
// //   useMemo,
// // } from "react";
// // import { useLocation } from "react-router-dom";
// // import { Menu } from "lucide-react";
// // import { SideBar } from "../base-component/Sidebar.jsx";
// // import io from "socket.io-client";
// // import Cookies from "js-cookie";
// // import { ChatHeader } from "./sohailPayment/ChatHeader";
// // import { MessageList } from "./sohailPayment/MessageList";
// // import { ChatInput } from "./sohailPayment/ChatInput";

// // const SOCKET_URL = "https://apis.famocare.com";
// // const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
// // const DEFAULT_AVATAR =
// //   "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
// // const UPLOADS_BASE = "https://apis.famocare.com/uploads/";


// // export const ScrollToBottomIcon = ({ iconClassName = "#9E9E9E" }) => {
// //   return (
// //     <svg
// //       width="20"
// //       height="20"
// //       viewBox="0 0 20 20"
// //       fill="none"
// //       xmlns="http://www.w3.org/2000/svg"
// //     >
// //       <path
// //         d="M3 6L10 14L17 6"
// //         stroke={iconClassName}
// //         strokeWidth="3"
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //       />
// //     </svg>
// //   );
// // };





// // const buildImageUrl = (raw) => {
// //   if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
// //   const s = raw.trim();
// //   if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) {
// //     return DEFAULT_AVATAR;
// //   }
// //   if (
// //     s.startsWith("http://") ||
// //     s.startsWith("https://") ||
// //     s.startsWith("data:")
// //   ) {
// //     return s;
// //   }
// //   return UPLOADS_BASE + s;
// // };

// // const PaymentRequestChat = ({
// //   currentUserId,
// //   receiverId: propReceiverId,
// //   managerId: propManagerId,
// //   chatUserData: propChatUserData,
// // }) => {
// //   const location = useLocation();
// //   const passedState = location.state || {};

// //   // ==================== STATE ====================
// //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// //   const [messageInput, setMessageInput] = useState("");
// //   const [chatMessages, setChatMessages] = useState([]);
// //   const [uploadedFile, setUploadedFile] = useState(null);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [isChatClosed, setIsChatClosed] = useState(false);
// //   const [isTyping, setIsTyping] = useState(false);
// //   const [isOnline, setIsOnline] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [filteredMessages, setFilteredMessages] = useState([]);
// //   const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
// //   const [matchedIndexes, setMatchedIndexes] = useState([]);
// //   const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
// //   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
// //   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
// //   const [chatStatus, setChatStatus] = useState("in progress");
// //   const [managerData, setManagerData] = useState(null);

// //   // ==================== REFS ====================
// //   const fileInputRef = useRef(null);
// //   const messagesEndRef = useRef(null);
// //   const socketRef = useRef(null);
// //   const typingTimeoutRef = useRef(null);
// //   const scrollContainerRef = useRef(null);

// //   // ==================== IDs ====================
// //   const user = JSON.parse(Cookies.get("referralUser") || "{}");
// //   const finalUserId = currentUserId || user?.id;

// //   const receiverId =
// //     passedState.receiverId ||
// //     propReceiverId ||
// //     passedState.managerId ||
// //     passedState.userId;

// //   const managerId = passedState.managerId || propManagerId;

// //   const redeemId =
// //     passedState.redeemId ||
// //     passedState.id ||
// //     passedState.redeemItem?.id ||
// //     location.state?.redeemId ||
// //     location.state?.id;

// //   // Set initial chat status from navigation state
// //   useEffect(() => {
// //     const initialStatus = passedState.status || "in progress";
// //     setChatStatus(initialStatus);
// //   }, [passedState.status]);

// //   // ==================== MANAGER DATA ====================
// //   useEffect(() => {
// //     const data =
// //       passedState.managerData ||
// //       passedState.chatUserData?.manager ||
// //       propChatUserData?.manager ||
// //       propChatUserData;

// //     if (data?.name) {
// //       setManagerData(data);
// //     }
// //   }, [passedState, propChatUserData]);

// //   const chatUser = useMemo(
// //     () => ({
// //       name: managerData?.name || "Manager",
// //       avatar: buildImageUrl(managerData?.imageUrl),
// //       id: managerData?.id,
// //       lastSeen: managerData?.lastSeen,
// //     }),
// //     [managerData],
// //   );

// //   // ==================== FORMATTERS ====================
// //   const formatTime = useCallback((date) => {
// //     return new Date(date).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   }, []);

// //   const formatLastSeen = useCallback(() => {
// //     if (isOnline === null) return "Checking...";
// //     if (isOnline) return "Active now";

// //     if (managerData?.lastSeen) {
// //       const date = new Date(managerData.lastSeen);
// //       const now = new Date();
// //       const isToday = date.toDateString() === now.toDateString();
// //       const yesterday = new Date();
// //       yesterday.setDate(now.getDate() - 1);
// //       const isYesterday = date.toDateString() === yesterday.toDateString();
// //       const time = date.toLocaleTimeString([], {
// //         hour: "2-digit",
// //         minute: "2-digit",
// //       });

// //       if (isToday) return `Last seen today at ${time}`;
// //       if (isYesterday) return `Last seen yesterday at ${time}`;
// //       return `Last seen on ${date.toLocaleDateString()} at ${time}`;
// //     }

// //     return "Last seen recently";
// //   }, [isOnline, managerData]);

// //   const formatMessageDate = useCallback((dateKey) => {
// //     const date = new Date(dateKey);
// //     const today = new Date();
// //     const yesterday = new Date(today);
// //     yesterday.setDate(today.getDate() - 1);

// //     if (date.toDateString() === today.toDateString()) return "Today";
// //     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

// //     return date.toLocaleDateString("en-US", {
// //       weekday: "long",
// //       month: "long",
// //       day: "numeric",
// //     });
// //   }, []);

// //   const statusStyles = useMemo(() => {
// //     switch (chatStatus) {
// //       case "resolved":
// //         return {
// //           bgColor: "bg-green-100",
// //           textColor: "text-green-600",
// //           displayText: "RESOLVED",
// //         };
// //       case "unresolved":
// //         return {
// //           bgColor: "bg-red-100",
// //           textColor: "text-red-600",
// //           displayText: "UNRESOLVED",
// //         };
// //       default:
// //         return {
// //           bgColor: "bg-[#E0E0E0]",
// //           textColor: "text-[#3887FD]",
// //           displayText: "IN PROGRESS",
// //         };
// //     }
// //   }, [chatStatus]);

// //   // ==================== SCROLL HELPERS ====================
// //   const scrollToBottom = useCallback(() => {
// //     messagesEndRef.current?.scrollIntoView({
// //       behavior: "smooth",
// //       block: "end",
// //     });
// //   }, []);

// //   // ==================== SCROLL + BUTTON LOGIC ====================
// //   useEffect(() => {
// //     const container = scrollContainerRef.current;
// //     if (!container) return;

// //     const handleScroll = () => {
// //       const { scrollTop, scrollHeight, clientHeight } = container;
// //       const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
// //       const hasScroll = scrollHeight > clientHeight;

// //       if (hasScroll) {
// //         setShowScrollToBottom(distanceFromBottom > 100);
// //       } else {
// //         setShowScrollToBottom(chatMessages.length > 8);
// //       }
// //     };

// //     container.addEventListener("scroll", handleScroll, { passive: true });
// //     setTimeout(handleScroll, 200);

// //     return () => {
// //       container.removeEventListener("scroll", handleScroll);
// //     };
// //   }, [chatMessages]);

// //   // ==================== AUTO SCROLL ====================
// //   useEffect(() => {
// //     if (isLoadingHistory || chatMessages.length === 0) return;

// //     const container = scrollContainerRef.current;
// //     if (!container) return;

// //     const distanceFromBottom =
// //       container.scrollHeight - (container.scrollTop + container.clientHeight);
// //     const isNearBottom = distanceFromBottom < 80;

// //     if (!hasInitialScrollDone) {
// //       setTimeout(() => {
// //         scrollToBottom();
// //         setHasInitialScrollDone(true);
// //       }, 100);
// //       return;
// //     }

// //     if (isNearBottom) {
// //       setTimeout(() => {
// //         scrollToBottom();
// //       }, 100);
// //     }
// //   }, [chatMessages.length, isLoadingHistory, hasInitialScrollDone, scrollToBottom]);

// //   // Reset state when switching redeem requests
// //   useEffect(() => {
// //     setChatMessages([]);
// //     setFilteredMessages([]);
// //     setSearchQuery("");
// //     setHasInitialScrollDone(false);
// //     setIsLoadingHistory(true);
// //   }, [redeemId]);

// //   // ====================== SOCKET SETUP ======================
// //   useEffect(() => {
// //     if (!finalUserId || !receiverId || !redeemId) {
// //       console.warn("Missing required IDs for socket connection");
// //       return;
// //     }

// //     socketRef.current?.disconnect();

// //     const socket = io(SOCKET_URL, {
// //       auth: { userId: finalUserId },
// //       transports: ["websocket", "polling"],
// //       reconnection: true,
// //       reconnectionAttempts: 10,
// //       reconnectionDelay: 1000,
// //     });

// //     socketRef.current = socket;

// //     const roomPayload = { senderId: finalUserId, receiverId, redeemId };

// //     socket.emit("joinChat", roomPayload);
// //     socket.emit("fetchMessages", roomPayload);
// //     socket.emit("markAllMessagesAsRead", {
// //       senderId: receiverId,
// //       receiverId: finalUserId,
// //       redeemId,
// //       readerId: finalUserId,
// //     });
// //     socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });

// //     socket.on("allMessagesRead", (data) => {
// //       console.log("✅ Messages marked as read:", data);
// //     });

// //     socket.emit("userOnline", { userId: finalUserId, senderType: "user" });
// //     socket.emit("updateLastSeen", { userId: finalUserId, senderType: "user" });

// //     const statusInterval = setInterval(() => {
// //       socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
// //     }, 8000);

// //     socket.on("previousMessages", (messages) => {
// //       console.log("📥 previousMessages received:", messages?.length || 0);
// //       const formatted = (messages || []).map((msg) => ({
// //         id: msg.id,
// //         text: msg.messageType === "image" ? "" : msg.message || "",
// //         time: formatTime(msg.createdAt),
// //         createdAt: msg.createdAt,
// //         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
// //         messageType: msg.messageType || "text",
// //         imageUrl: msg.messageType === "image" ? msg.message : null,
// //       }));

// //       setChatMessages(formatted);
// //       setIsLoadingHistory(false);
// //     });

// //     socket.on("receiveMessage", (msg) => {
// //       const formatted = {
// //         id: msg.id,
// //         text: msg.messageType === "image" ? "" : msg.message || "",
// //         time: formatTime(msg.createdAt),
// //         createdAt: msg.createdAt,
// //         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
// //         messageType: msg.messageType || "text",
// //         imageUrl: msg.messageType === "image" ? msg.message : null,
// //       };

// //       setChatMessages((prev) => {
// //         if (prev.some((m) => m.id === formatted.id)) return prev;
// //         return [...prev, formatted];
// //       });
// //     });

// //     socket.on("userTyping", ({ senderId }) => {
// //       if (String(senderId) === String(receiverId)) setIsTyping(true);
// //     });

// //     socket.on("userStoppedTyping", ({ senderId }) => {
// //       if (String(senderId) === String(receiverId)) setIsTyping(false);
// //     });

// //     socket.on("userStatusChanged", (data) => {
// //       console.log("🔴 [DEBUG User Side] userStatusChanged:", data);
// //       if (String(data?.userId) === String(receiverId)) {
// //         const isNowOnline = data.status === "online";
// //         setIsOnline(isNowOnline);
// //         if (data.lastSeen) {
// //           setManagerData((prev) =>
// //             prev ? { ...prev, lastSeen: data.lastSeen } : prev,
// //           );
// //         }
// //         console.log(`🎯 Manager Status → ${isNowOnline ? "🟢 ONLINE" : "⚫ OFFLINE"}`);
// //       }
// //     });

// //     socket.on("connect", () => {
// //       console.log("✅ [User Side] Socket Connected");
// //       socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
// //     });

// //     socket.on("disconnect", (reason) =>
// //       console.log("❌ [User Side] Disconnected:", reason),
// //     );

// //     return () => {
// //       clearInterval(statusInterval);
// //       socket.disconnect();
// //     };
// //   }, [finalUserId, receiverId, redeemId, formatTime]);

// //   // ====================== SEARCH ======================
// //   useEffect(() => {
// //     if (!searchQuery.trim()) {
// //       setFilteredMessages(chatMessages);
// //       setMatchedIndexes([]);
// //       setCurrentMatchIndex(0);
// //       return;
// //     }

// //     const query = searchQuery.toLowerCase().trim();
// //     const indexes = [];
// //     const filtered = chatMessages.filter((msg, index) => {
// //       const match = (msg.text || "").toLowerCase().includes(query);
// //       if (match) indexes.push(index);
// //       return match;
// //     });

// //     setFilteredMessages(filtered);
// //     setMatchedIndexes(indexes);
// //     setCurrentMatchIndex(0);
// //   }, [searchQuery, chatMessages]);

// //   useEffect(() => {
// //     if (matchedIndexes.length === 0) return;
// //     const index = matchedIndexes[currentMatchIndex];
// //     const el = document.querySelector(`[data-msg-index="${index}"]`);
// //     if (el) {
// //       el.scrollIntoView({ behavior: "smooth", block: "center" });
// //     }
// //   }, [currentMatchIndex, matchedIndexes]);

// //   // ====================== HANDLERS ======================
// //   const uploadAndSendFile = useCallback(
// //     async (file, accompanyingText = "") => {
// //       if (!file || isUploading) return;

// //       setIsUploading(true);
// //       const formData = new FormData();
// //       formData.append("image", file);

// //       try {
// //         const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
// //         const result = await res.json();

// //         if (result.success && result.data?.imageUrl) {
// //           socketRef.current?.emit("sendMessage", {
// //             senderId: finalUserId,
// //             receiverId,
// //             redeemId,
// //             message: accompanyingText || result.data.imageUrl,
// //             senderType: "user",
// //             messageType: "image",
// //             managerId,
// //           });
// //         } else {
// //           alert("Failed to upload image. Please try again.");
// //         }
// //       } catch (error) {
// //         console.error("Upload error:", error);
// //         alert("Error uploading image");
// //       } finally {
// //         setIsUploading(false);
// //         setUploadedFile(null);
// //         if (fileInputRef.current) fileInputRef.current.value = "";
// //       }
// //     },
// //     [finalUserId, receiverId, redeemId, managerId, isUploading],
// //   );

// //   const handleSendMessage = useCallback(() => {
// //     if (isChatClosed || isUploading || (!messageInput.trim() && !uploadedFile)) {
// //       return;
// //     }

// //     if (uploadedFile) {
// //       uploadAndSendFile(uploadedFile, messageInput.trim());
// //     } else {
// //       socketRef.current?.emit("sendMessage", {
// //         senderId: finalUserId,
// //         receiverId,
// //         redeemId,
// //         message: messageInput.trim(),
// //         senderType: "user",
// //         messageType: "text",
// //         managerId,
// //       });
// //     }

// //     setMessageInput("");
// //   }, [
// //     messageInput, uploadedFile, isChatClosed, isUploading,
// //     finalUserId, receiverId, redeemId, managerId, uploadAndSendFile,
// //   ]);

// //   const handleFileUpload = useCallback(
// //     (e) => {
// //       if (isUploading) return;
// //       const file = e.target.files?.[0];
// //       if (file) {
// //         setUploadedFile(file);
// //         setMessageInput("");
// //       }
// //     },
// //     [isUploading],
// //   );

// //   const triggerFileInput = useCallback(() => {
// //     if (!isUploading) fileInputRef.current?.click();
// //   }, [isUploading]);

// //   const removeUploadedFile = useCallback(() => {
// //     setUploadedFile(null);
// //     if (fileInputRef.current) fileInputRef.current.value = "";
// //   }, []);

// //   const handleInputChange = useCallback(
// //     (e) => {
// //       if (isUploading || uploadedFile) {
// //         setMessageInput("");
// //         return;
// //       }

// //       const value = e.target.value;
// //       setMessageInput(value);

// //       if (socketRef.current) {
// //         socketRef.current.emit("typing", { senderId: finalUserId, receiverId, redeemId });

// //         if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

// //         typingTimeoutRef.current = setTimeout(() => {
// //           socketRef.current?.emit("stopTyping", {
// //             senderId: finalUserId,
// //             receiverId,
// //             redeemId,
// //           });
// //         }, 1800);
// //       }
// //     },
// //     [finalUserId, receiverId, redeemId, isUploading, uploadedFile],
// //   );

// //   useEffect(() => {
// //     return () => {
// //       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
// //     };
// //   }, []);

// //   // ====================== RENDER ======================
// //   return (
// //     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
// //       {/* Sidebar */}
// //       <div className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}>
// //         <SideBar
// //           isDrawer={isDrawerOpen}
// //           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
// //         />
// //       </div>

// //       {isDrawerOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
// //           onClick={() => setIsDrawerOpen(false)}
// //         />
// //       )}

// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
// //         {/* Mobile Purple Header */}
// //         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
// //               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
// //             >
// //               <Menu size={18} className="text-[#691188]" />
// //             </button>
// //             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
// //               Payment Request Chat
// //             </h1>
// //           </div>
// //           <img
// //             src={chatUser.avatar}
// //             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
// //             alt={chatUser.name}
// //             onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
// //           />
// //         </div>

// //         {/* Spacer for mobile header */}
// //         <div className="h-[60px] xl:hidden" />

// //         {/* Chat Container */}
// //         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">
// //           <div className="flex-1 flex flex-col lg:px-8 lg:mt-8 overflow-hidden">

// //             {/* Chat Header */}
// //             <div className="flex-shrink-0">
// //               <ChatHeader
// //                 chatUser={chatUser}
// //                 isChatClosed={isChatClosed}
// //                 searchQuery={searchQuery}
// //                 onSearchChange={setSearchQuery}
// //                 formatLastSeen={formatLastSeen}
// //                 chatStatus={chatStatus}
// //                 totalMatches={matchedIndexes.length}
// //                 currentMatchIndex={currentMatchIndex}
// //                 onNext={() =>
// //                   setCurrentMatchIndex((prev) =>
// //                     prev < matchedIndexes.length - 1 ? prev + 1 : prev,
// //                   )
// //                 }
// //                 onPrev={() =>
// //                   setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
// //                 }
// //                 isTyping={isTyping}
// //                 isOnline={isOnline}
// //               />
// //             </div>

// //             {/* Messages Area */}
// //             <div
// //               ref={scrollContainerRef}
// //               id="chat-scroll"
// //               className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
// //             >
// //               <MessageList
// //                 filteredMessages={filteredMessages}
// //                 searchQuery={searchQuery}
// //                 formatMessageDate={formatMessageDate}
// //                 isLoading={isLoadingHistory}
// //                 showScrollToBottom={showScrollToBottom}
// //                 onScrollToBottom={scrollToBottom}
// //               />
// //               <div ref={messagesEndRef} />
// //             </div>

// //             {/* ✅ Scroll to Bottom Button — inline SVG, no external file needed */}
// //             {showScrollToBottom && (
// //               <button
// //                 onClick={scrollToBottom}
// //                 className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
// //                   bg-[#F4F4F4] hover:bg-[#c6c9c9]
// //                   p-2 rounded-full
// //                   shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
// //                   hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
// //                   transition-all duration-300 ease-out
// //                   flex items-center justify-center border border-white/80
// //                   active:scale-95"
// //                 aria-label="Scroll to bottom"
// //               >
// //                 <ScrollToBottomIcon iconClassName="#555555" />
// //               </button>
// //             )}

// //             {/* Chat Input */}
// //             <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
// //               <ChatInput
// //                 messageInput={messageInput}
// //                 onMessageChange={handleInputChange}
// //                 onSendMessage={handleSendMessage}
// //                 uploadedFile={uploadedFile}
// //                 onFileUpload={handleFileUpload}
// //                 onRemoveFile={removeUploadedFile}
// //                 isUploading={isUploading}
// //                 isChatClosed={isChatClosed}
// //                 triggerFileInput={triggerFileInput}
// //                 fileInputRef={fileInputRef}
// //                 chatStatus={chatStatus}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const MemoizedChat = React.memo(PaymentRequestChat);
// // export default MemoizedChat;


// ////


// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// import { useLocation } from "react-router-dom";
// import { Menu } from "lucide-react";
// import { SideBar } from "../base-component/Sidebar.jsx";
// import io from "socket.io-client";
// import Cookies from "js-cookie";
// import { ChatHeader } from "./sohailPayment/ChatHeader";
// import { MessageList } from "./sohailPayment/MessageList";
// import { ChatInput } from "./sohailPayment/ChatInput";

// const SOCKET_URL = "https://apis.famocare.com";
// const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
// const DEFAULT_AVATAR =
//   "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
// const UPLOADS_BASE = "https://apis.famocare.com/uploads/";

// export const ScrollToBottomIcon = ({ iconClassName = "#9E9E9E" }) => {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M3 6L10 14L17 6"
//         stroke={iconClassName}
//         strokeWidth="3"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };

// const buildImageUrl = (raw) => {
//   if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
//   const s = raw.trim();
//   if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) {
//     return DEFAULT_AVATAR;
//   }
//   if (
//     s.startsWith("http://") ||
//     s.startsWith("https://") ||
//     s.startsWith("data:")
//   ) {
//     return s;
//   }
//   return UPLOADS_BASE + s;
// };

// const PaymentRequestChat = ({
//   currentUserId,
//   receiverId: propReceiverId,
//   managerId: propManagerId,
//   chatUserData: propChatUserData,
// }) => {
//   const location = useLocation();
//   const passedState = location.state || {};

//   // ==================== STATE ====================
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [messageInput, setMessageInput] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isChatClosed, setIsChatClosed] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isOnline, setIsOnline] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
//   const [matchedIndexes, setMatchedIndexes] = useState([]);
//   const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
//   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
//   const [chatStatus, setChatStatus] = useState("in progress");
//   const [managerData, setManagerData] = useState(null);

//   // ==================== REFS ====================
//   const fileInputRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);
//   const typingTimeoutRef = useRef(null);
//   const scrollContainerRef = useRef(null);

//   // ==================== IDs ====================
//   const user = JSON.parse(Cookies.get("referralUser") || "{}");
//   const finalUserId = currentUserId || user?.id;

//   const receiverId =
//     passedState.receiverId ||
//     propReceiverId ||
//     passedState.managerId ||
//     passedState.userId;

//   const managerId = passedState.managerId || propManagerId;

//   const redeemId =
//     passedState.redeemId ||
//     passedState.id ||
//     passedState.redeemItem?.id ||
//     location.state?.redeemId ||
//     location.state?.id;

//   useEffect(() => {
//     const initialStatus = passedState.status || "in progress";
//     setChatStatus(initialStatus);
//   }, [passedState.status]);

//   // ==================== MANAGER DATA ====================
//   useEffect(() => {
//     const data =
//       passedState.managerData ||
//       passedState.chatUserData?.manager ||
//       propChatUserData?.manager ||
//       propChatUserData;

//     if (data?.name) {
//       setManagerData(data);
//     }
//   }, [passedState, propChatUserData]);

//   const chatUser = useMemo(
//     () => ({
//       name: managerData?.name || "Manager",
//       avatar: buildImageUrl(managerData?.imageUrl),
//       id: managerData?.id,
//       lastSeen: managerData?.lastSeen,
//     }),
//     [managerData],
//   );

//   // ==================== FORMATTERS ====================
//   const formatTime = useCallback((date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   }, []);

//   const formatLastSeen = useCallback(() => {
//     if (isOnline === null) return "Checking...";
//     if (isOnline) return "Active now";

//     if (managerData?.lastSeen) {
//       const date = new Date(managerData.lastSeen);
//       const now = new Date();
//       const isToday = date.toDateString() === now.toDateString();
//       const yesterday = new Date();
//       yesterday.setDate(now.getDate() - 1);
//       const isYesterday = date.toDateString() === yesterday.toDateString();
//       const time = date.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });

//       if (isToday) return `Last seen today at ${time}`;
//       if (isYesterday) return `Last seen yesterday at ${time}`;
//       return `Last seen on ${date.toLocaleDateString()} at ${time}`;
//     }

//     return "Last seen recently";
//   }, [isOnline, managerData]);

//   const formatMessageDate = useCallback((dateKey) => {
//     const date = new Date(dateKey);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) return "Today";
//     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       month: "long",
//       day: "numeric",
//     });
//   }, []);

//   const statusStyles = useMemo(() => {
//     switch (chatStatus) {
//       case "resolved":
//         return {
//           bgColor: "bg-green-100",
//           textColor: "text-green-600",
//           displayText: "RESOLVED",
//         };
//       case "unresolved":
//         return {
//           bgColor: "bg-red-100",
//           textColor: "text-red-600",
//           displayText: "UNRESOLVED",
//         };
//       default:
//         return {
//           bgColor: "bg-[#E0E0E0]",
//           textColor: "text-[#3887FD]",
//           displayText: "IN PROGRESS",
//         };
//     }
//   }, [chatStatus]);

//   // ==================== SCROLL HELPERS ====================
//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//     });
//   }, []);

//   // ==================== SCROLL + BUTTON LOGIC ====================
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const { scrollTop, scrollHeight, clientHeight } = container;
//       const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
//       const hasScroll = scrollHeight > clientHeight;

//       if (hasScroll) {
//         setShowScrollToBottom(distanceFromBottom > 100);
//       } else {
//         setShowScrollToBottom(chatMessages.length > 8);
//       }
//     };

//     container.addEventListener("scroll", handleScroll, { passive: true });
//     setTimeout(handleScroll, 200);

//     return () => {
//       container.removeEventListener("scroll", handleScroll);
//     };
//   }, [chatMessages]);

//   // ==================== AUTO SCROLL ====================
//   useEffect(() => {
//     if (isLoadingHistory || chatMessages.length === 0) return;

//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const distanceFromBottom =
//       container.scrollHeight - (container.scrollTop + container.clientHeight);
//     const isNearBottom = distanceFromBottom < 80;

//     if (!hasInitialScrollDone) {
//       setTimeout(() => {
//         scrollToBottom();
//         setHasInitialScrollDone(true);
//       }, 100);
//       return;
//     }

//     if (isNearBottom) {
//       setTimeout(() => {
//         scrollToBottom();
//       }, 100);
//     }
//   }, [chatMessages.length, isLoadingHistory, hasInitialScrollDone, scrollToBottom]);

//   // Reset state when switching redeem requests
//   useEffect(() => {
//     setChatMessages([]);
//     setFilteredMessages([]);
//     setSearchQuery("");
//     setHasInitialScrollDone(false);
//     setIsLoadingHistory(true);
//   }, [redeemId]);

//   // ====================== SOCKET SETUP ======================
//   useEffect(() => {
//     if (!finalUserId || !receiverId || !redeemId) return;

//     socketRef.current?.disconnect();

//     const socket = io(SOCKET_URL, {
//       auth: { userId: finalUserId },
//       transports: ["websocket", "polling"],
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     });

//     socketRef.current = socket;

//     const roomPayload = { senderId: finalUserId, receiverId, redeemId };

//     socket.emit("joinChat", roomPayload);
//     socket.emit("fetchMessages", roomPayload);
//     socket.emit("markAllMessagesAsRead", {
//       senderId: receiverId,
//       receiverId: finalUserId,
//       redeemId,
//       readerId: finalUserId,
//     });
//     socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
//     socket.emit("userOnline", { userId: finalUserId, senderType: "user" });
//     socket.emit("updateLastSeen", { userId: finalUserId, senderType: "user" });

//     const statusInterval = setInterval(() => {
//       socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
//     }, 8000);

//     socket.on("previousMessages", (messages) => {
//       const formatted = (messages || []).map((msg) => ({
//         id: msg.id,
//         text: msg.messageType === "image" ? "" : msg.message || "",
//         time: formatTime(msg.createdAt),
//         createdAt: msg.createdAt,
//         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
//         messageType: msg.messageType || "text",
//         imageUrl: msg.messageType === "image" ? msg.message : null,
//       }));

//       setChatMessages(formatted);
//       setIsLoadingHistory(false);
//     });

//     socket.on("receiveMessage", (msg) => {
//       const formatted = {
//         id: msg.id,
//         text: msg.messageType === "image" ? "" : msg.message || "",
//         time: formatTime(msg.createdAt),
//         createdAt: msg.createdAt,
//         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
//         messageType: msg.messageType || "text",
//         imageUrl: msg.messageType === "image" ? msg.message : null,
//       };

//       setChatMessages((prev) => {
//         if (prev.some((m) => m.id === formatted.id)) return prev;
//         return [...prev, formatted];
//       });
//     });

//     socket.on("userTyping", ({ senderId }) => {
//       if (String(senderId) === String(receiverId)) setIsTyping(true);
//     });

//     socket.on("userStoppedTyping", ({ senderId }) => {
//       if (String(senderId) === String(receiverId)) setIsTyping(false);
//     });

//     socket.on("userStatusChanged", (data) => {
//       if (String(data?.userId) === String(receiverId)) {
//         const isNowOnline = data.status === "online";
//         setIsOnline(isNowOnline);
//         if (data.lastSeen) {
//           setManagerData((prev) =>
//             prev ? { ...prev, lastSeen: data.lastSeen } : prev,
//           );
//         }
//       }
//     });

//     socket.on("connect", () => {
//       socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
//     });

//     return () => {
//       clearInterval(statusInterval);
//       socket.disconnect();
//     };
//   }, [finalUserId, receiverId, redeemId, formatTime]);

//   // ====================== SEARCH ======================
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredMessages(chatMessages);
//       setMatchedIndexes([]);
//       setCurrentMatchIndex(0);
//       return;
//     }

//     const query = searchQuery.toLowerCase().trim();
//     const indexes = [];
//     const filtered = chatMessages.filter((msg, index) => {
//       const match = (msg.text || "").toLowerCase().includes(query);
//       if (match) indexes.push(index);
//       return match;
//     });

//     setFilteredMessages(filtered);
//     setMatchedIndexes(indexes);
//     setCurrentMatchIndex(0);
//   }, [searchQuery, chatMessages]);

//   useEffect(() => {
//     if (matchedIndexes.length === 0) return;
//     const index = matchedIndexes[currentMatchIndex];
//     const el = document.querySelector(`[data-msg-index="${index}"]`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [currentMatchIndex, matchedIndexes]);

//   // ====================== HANDLERS ======================
//   const uploadAndSendFile = useCallback(
//     async (file, accompanyingText = "") => {
//       if (!file || isUploading) return;

//       setIsUploading(true);
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
//         const result = await res.json();

//         if (result.success && result.data?.imageUrl) {
//           socketRef.current?.emit("sendMessage", {
//             senderId: finalUserId,
//             receiverId,
//             redeemId,
//             message: accompanyingText || result.data.imageUrl,
//             senderType: "user",
//             messageType: "image",
//             managerId,
//           });
//         } else {
//           alert("Failed to upload image. Please try again.");
//         }
//       } catch (error) {
//         alert("Error uploading image");
//       } finally {
//         setIsUploading(false);
//         setUploadedFile(null);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//     },
//     [finalUserId, receiverId, redeemId, managerId, isUploading],
//   );

//   const handleSendMessage = useCallback(() => {
//     if (isChatClosed || isUploading || (!messageInput.trim() && !uploadedFile)) {
//       return;
//     }

//     if (uploadedFile) {
//       uploadAndSendFile(uploadedFile, messageInput.trim());
//     } else {
//       socketRef.current?.emit("sendMessage", {
//         senderId: finalUserId,
//         receiverId,
//         redeemId,
//         message: messageInput.trim(),
//         senderType: "user",
//         messageType: "text",
//         managerId,
//       });
//     }

//     setMessageInput("");
//   }, [
//     messageInput, uploadedFile, isChatClosed, isUploading,
//     finalUserId, receiverId, redeemId, managerId, uploadAndSendFile,
//   ]);

//   const handleFileUpload = useCallback(
//     (e) => {
//       if (isUploading) return;
//       const file = e.target.files?.[0];
//       if (file) {
//         setUploadedFile(file);
//         setMessageInput("");
//       }
//     },
//     [isUploading],
//   );

//   const triggerFileInput = useCallback(() => {
//     if (!isUploading) fileInputRef.current?.click();
//   }, [isUploading]);

//   const removeUploadedFile = useCallback(() => {
//     setUploadedFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   }, []);

//   const handleInputChange = useCallback(
//     (e) => {
//       if (isUploading || uploadedFile) {
//         setMessageInput("");
//         return;
//       }

//       const value = e.target.value;
//       setMessageInput(value);

//       if (socketRef.current) {
//         socketRef.current.emit("typing", { senderId: finalUserId, receiverId, redeemId });

//         if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//         typingTimeoutRef.current = setTimeout(() => {
//           socketRef.current?.emit("stopTyping", {
//             senderId: finalUserId,
//             receiverId,
//             redeemId,
//           });
//         }, 1800);
//       }
//     },
//     [finalUserId, receiverId, redeemId, isUploading, uploadedFile],
//   );

//   useEffect(() => {
//     return () => {
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//     };
//   }, []);

//   // ====================== RENDER ======================
//   return (
//     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
//       {/* Sidebar */}
//       <div className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}>
//         <SideBar
//           isDrawer={isDrawerOpen}
//           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
//         />
//       </div>

//       {isDrawerOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
//           onClick={() => setIsDrawerOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
//         {/* Mobile Purple Header */}
//         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
//               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
//             >
//               <Menu size={18} className="text-[#691188]" />
//             </button>
//             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
//               Payment Request Chat
//             </h1>
//           </div>
//           <img
//             src={chatUser.avatar}
//             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
//             alt={chatUser.name}
//             onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
//           />
//         </div>

//         {/* Spacer for mobile header */}
//         <div className="h-[60px] xl:hidden" />

//         {/* Chat Container */}
//         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">
//           <div className="flex-1 flex flex-col lg:px-8 lg:mt-8 overflow-hidden">

//             {/* Chat Header */}
//             <div className="flex-shrink-0">
//               <ChatHeader
//                 chatUser={chatUser}
//                 isChatClosed={isChatClosed}
//                 searchQuery={searchQuery}
//                 onSearchChange={setSearchQuery}
//                 formatLastSeen={formatLastSeen}
//                 chatStatus={chatStatus}
//                 totalMatches={matchedIndexes.length}
//                 currentMatchIndex={currentMatchIndex}
//                 onNext={() =>
//                   setCurrentMatchIndex((prev) =>
//                     prev < matchedIndexes.length - 1 ? prev + 1 : prev,
//                   )
//                 }
//                 onPrev={() =>
//                   setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
//                 }
//                 isTyping={isTyping}
//                 isOnline={isOnline}
//               />
//             </div>

//             {/* Messages Area */}
//             <div
//               ref={scrollContainerRef}
//               id="chat-scroll"
//               className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
//             >
//               <MessageList
//                 filteredMessages={filteredMessages}
//                 searchQuery={searchQuery}
//                 formatMessageDate={formatMessageDate}
//                 isLoading={isLoadingHistory}
//                 showScrollToBottom={showScrollToBottom}
//                 onScrollToBottom={scrollToBottom}
//               />
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Scroll to Bottom Button */}
//             {showScrollToBottom && (
//               <button
//                 onClick={scrollToBottom}
//                 className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
//                   bg-[#F4F4F4] hover:bg-[#c6c9c9]
//                   p-2 rounded-full
//                   shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
//                   hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
//                   transition-all duration-300 ease-out
//                   flex items-center justify-center border border-white/80
//                   active:scale-95"
//                 aria-label="Scroll to bottom"
//               >
//                 <ScrollToBottomIcon iconClassName="#555555" />
//               </button>
//             )}

//             {/* Chat Input */}
//             <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
//               <ChatInput
//                 messageInput={messageInput}
//                 onMessageChange={handleInputChange}
//                 onSendMessage={handleSendMessage}
//                 uploadedFile={uploadedFile}
//                 onFileUpload={handleFileUpload}
//                 onRemoveFile={removeUploadedFile}
//                 isUploading={isUploading}
//                 isChatClosed={isChatClosed}
//                 triggerFileInput={triggerFileInput}
//                 fileInputRef={fileInputRef}
//                 chatStatus={chatStatus}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MemoizedChat = React.memo(PaymentRequestChat);
// export default MemoizedChat;



// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// import { useLocation } from "react-router-dom";
// import { Menu } from "lucide-react";
// import { SideBar } from "../base-component/Sidebar.jsx";
// import io from "socket.io-client";
// import Cookies from "js-cookie";
// import { ChatHeader } from "./sohailPayment/ChatHeader";
// import { MessageList } from "./sohailPayment/MessageList";
// import { ChatInput } from "./sohailPayment/ChatInput";

// const SOCKET_URL = "https://apis.famocare.com";
// const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
// const DEFAULT_AVATAR =
//   "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
// const UPLOADS_BASE = "https://apis.famocare.com/uploads/";

// const buildImageUrl = (raw) => {
//   if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
//   const s = raw.trim();
//   if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) {
//     return DEFAULT_AVATAR;
//   }
//   if (
//     s.startsWith("http://") ||
//     s.startsWith("https://") ||
//     s.startsWith("data:")
//   ) {
//     return s;
//   }
//   return UPLOADS_BASE + s;
// };

// const PaymentRequestChat = ({
//   currentUserId,
//   receiverId: propReceiverId,
//   managerId: propManagerId,
//   chatUserData: propChatUserData,
// }) => {
//   const location = useLocation();
//   const passedState = location.state || {};

//   // ==================== STATE ====================
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [messageInput, setMessageInput] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isChatClosed, setIsChatClosed] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isOnline, setIsOnline] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
//   const [matchedIndexes, setMatchedIndexes] = useState([]);
//   const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
//   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
//   const [chatStatus, setChatStatus] = useState("in progress");
//   const [managerData, setManagerData] = useState(null);

//   // ==================== REFS ====================
//   const fileInputRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);
//   const typingTimeoutRef = useRef(null);
//   const scrollContainerRef = useRef(null);

//   // ==================== IDs ====================
//   const user = JSON.parse(Cookies.get("referralUser") || "{}");
//   const finalUserId = currentUserId || user?.id;

//   const receiverId =
//     passedState.receiverId ||
//     propReceiverId ||
//     passedState.managerId ||
//     passedState.userId;

//   const managerId = passedState.managerId || propManagerId;

//   const redeemId =
//     passedState.redeemId ||
//     passedState.id ||
//     passedState.redeemItem?.id ||
//     location.state?.redeemId ||
//     location.state?.id;

//   // Set initial chat status from navigation state
//   useEffect(() => {
//     const initialStatus = passedState.status || "in progress";
//     setChatStatus(initialStatus);
//   }, [passedState.status]);

//   // ==================== MANAGER DATA ====================
//   useEffect(() => {
//     const data =
//       passedState.managerData ||
//       passedState.chatUserData?.manager ||
//       propChatUserData?.manager ||
//       propChatUserData;

//     if (data?.name) {
//       setManagerData(data);
//     }
//   }, [passedState, propChatUserData]);

//   const chatUser = useMemo(
//     () => ({
//       name: managerData?.name || "Manager",
//       avatar: buildImageUrl(managerData?.imageUrl),
//       id: managerData?.id,
//       lastSeen: managerData?.lastSeen,
//     }),
//     [managerData],
//   );

//   // ==================== FORMATTERS ====================
//   const formatTime = useCallback((date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   }, []);

// const formatLastSeen = useCallback(() => {
//   if (isOnline === null) return "Checking...";
//   if (isOnline) return "Active now";

//   if (managerData?.lastSeen) {
//     const date = new Date(managerData.lastSeen);
//     const now = new Date();

//     const isToday = date.toDateString() === now.toDateString();
//     const yesterday = new Date(now);
//     yesterday.setDate(yesterday.getDate() - 1);
//     const isYesterday = date.toDateString() === yesterday.toDateString();

//     // ✅ Force Capital AM/PM
//     let time = date.toLocaleTimeString([], {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });

//     // Convert am/pm to AM/PM
//     time = time.replace(/am$/i, "AM").replace(/pm$/i, "PM");

//     if (isToday) return `Last seen today at ${time}`;
//     if (isYesterday) return `Last seen yesterday at ${time}`;

//     return `Last seen on ${date.toLocaleDateString()} at ${time}`;
//   }

//   return "Last seen recently";
// }, [isOnline, managerData]);

//   const formatMessageDate = useCallback((dateKey) => {
//     const date = new Date(dateKey);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) return "Today";
//     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       month: "long",
//       day: "numeric",
//     });
//   }, []);

//   const statusStyles = useMemo(() => {
//     switch (chatStatus) {
//       case "resolved":
//         return {
//           bgColor: "bg-green-100",
//           textColor: "text-green-600",
//           displayText: "RESOLVED",
//         };
//       case "unresolved":
//         return {
//           bgColor: "bg-red-100",
//           textColor: "text-red-600",
//           displayText: "UNRESOLVED",
//         };
//       default:
//         return {
//           bgColor: "bg-[#E0E0E0]",
//           textColor: "text-[#3887FD]",
//           displayText: "IN PROGRESS",
//         };
//     }
//   }, [chatStatus]);

//   // ==================== SCROLL HELPERS ====================
//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//     });
//   }, []);

//   // ==================== SCROLL + BUTTON LOGIC (FIXED) ====================

//   // ✅ Handle scroll button visibility (like ChatGPT)
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const { scrollTop, scrollHeight, clientHeight } = container;

//       const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

//       // ✅ Show button only when user scrolls UP
//       const hasScroll = scrollHeight > clientHeight;

//       if (hasScroll) {
//         setShowScrollToBottom(distanceFromBottom > 100);
//       } else {
//         // ✅ fallback: show if many
//         setShowScrollToBottom(chatMessages.length > 8);
//       }
//     };

//     container.addEventListener("scroll", handleScroll, { passive: true });

//     // Initial check
//     setTimeout(handleScroll, 200);

//     return () => {
//       container.removeEventListener("scroll", handleScroll);
//     };
//   }, [chatMessages]);

//   // ==================== AUTO SCROLL (PROFESSIONAL) ====================
//   useEffect(() => {
//     if (isLoadingHistory || chatMessages.length === 0) return;

//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const distanceFromBottom =
//       container.scrollHeight - (container.scrollTop + container.clientHeight);

//     const isNearBottom = distanceFromBottom < 80;

//     // ✅ First time → always scroll
//     if (!hasInitialScrollDone) {
//       setTimeout(() => {
//         scrollToBottom();
//         setHasInitialScrollDone(true);
//       }, 100);
//       return;
//     }

//     // ✅ Only auto-scroll if already near bottom
//     if (isNearBottom) {
//       setTimeout(() => {
//         scrollToBottom();
//       }, 100);
//     }
//   }, [
//     chatMessages.length,
//     isLoadingHistory,
//     hasInitialScrollDone,
//     scrollToBottom,
//   ]);

//   // Reset state when switching between different redeem requests
//   useEffect(() => {
//     setChatMessages([]);
//     setFilteredMessages([]);
//     setSearchQuery("");
//     setHasInitialScrollDone(false);
//     setIsLoadingHistory(true);
//   }, [redeemId]);

//   // ====================== SOCKET SETUP ======================
//   useEffect(() => {
//     if (!finalUserId || !receiverId || !redeemId) {
//       console.warn("Missing required IDs for socket connection");
//       return;
//     }

//     socketRef.current?.disconnect();

//     const socket = io(SOCKET_URL, {
//       auth: { userId: finalUserId },
//       transports: ["websocket", "polling"],
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     });

//     socketRef.current = socket;

//     const roomPayload = {
//       senderId: finalUserId,
//       receiverId,
//       redeemId,
//     };

//     socket.emit("joinChat", roomPayload);
//     socket.emit("fetchMessages", roomPayload);
//     socket.emit("markAllMessagesAsRead", {
//   senderId: receiverId,
//   receiverId: finalUserId,
//   redeemId,
//   readerId: finalUserId,
// });
//     socket.emit("getUserStatus", {
//       userId: receiverId,
//       senderType: "manager",
//     });

//     socket.on("allMessagesRead", (data) => {
//   console.log("✅ Messages marked as read:", data);
// });

//     // Declare user online + update last seen
//     socket.emit("userOnline", { userId: finalUserId, senderType: "user" });
//     socket.emit("updateLastSeen", { userId: finalUserId, senderType: "user" });

//     // Periodic status check every 8 seconds (best practice)
//     const statusInterval = setInterval(() => {
//       socket.emit("getUserStatus", {
//         userId: receiverId,
//         senderType: "manager",
//       });
//     }, 8000);

//     socket.on("previousMessages", (messages) => {
//       console.log("📥 previousMessages received:", messages?.length || 0);
//       const formatted = (messages || []).map((msg) => ({
//         id: msg.id,
//         text: msg.messageType === "image" ? "" : msg.message || "",
//         time: formatTime(msg.createdAt),
//         createdAt: msg.createdAt,
//         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
//         messageType: msg.messageType || "text",
//         imageUrl: msg.messageType === "image" ? msg.message : null,
//       }));

//       setChatMessages(formatted);
//       setIsLoadingHistory(false);
//     });

//     socket.on("receiveMessage", (msg) => {
//       const formatted = {
//         id: msg.id,
//         text: msg.messageType === "image" ? "" : msg.message || "",
//         time: formatTime(msg.createdAt),
//         createdAt: msg.createdAt,
//         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
//         messageType: msg.messageType || "text",
//         imageUrl: msg.messageType === "image" ? msg.message : null,
//       };

//       setChatMessages((prev) => {
//         if (prev.some((m) => m.id === formatted.id)) return prev;
//         return [...prev, formatted];
//       });
//     });

//     socket.on("userTyping", ({ senderId }) => {
//       if (String(senderId) === String(receiverId)) setIsTyping(true);
//     });

//     socket.on("userStoppedTyping", ({ senderId }) => {
//       if (String(senderId) === String(receiverId)) setIsTyping(false);
//     });
// socket.on("chatStatusUpdated", (data) => {
//   console.log("🔥 USER RECEIVED STATUS:", data);

//   if (String(data?.redeemId) === String(redeemId)) {
//     setChatStatus(data.status);

//     // 🔥 Auto close chat if resolved
//     if (data.status === "resolved") {
//       setIsChatClosed(true);
//     }
//   }
// });
//     // ==================== IMPROVED STATUS LISTENER ====================
//     socket.on("userStatusChanged", (data) => {
//       console.log("🔴 [DEBUG User Side] userStatusChanged:", data);

//       if (String(data?.userId) === String(receiverId)) {
//         const isNowOnline = data.status === "online";
//         setIsOnline(isNowOnline);

//         if (data.lastSeen) {
//           setManagerData((prev) =>
//             prev ? { ...prev, lastSeen: data.lastSeen } : prev,
//           );
//         }

//         console.log(
//           `🎯 Manager Status → ${isNowOnline ? "🟢 ONLINE" : "⚫ OFFLINE"}`,
//         );
//       }
//     });

//     socket.on("connect", () => {
//       console.log("✅ [User Side] Socket Connected");

//       socket.emit("getUserStatus", {
//         userId: receiverId,
//         senderType: "manager",
//       });
//     });
//     socket.on("disconnect", (reason) =>
//       console.log("❌ [User Side] Disconnected:", reason),
//     );

//     return () => {
//       clearInterval(statusInterval);
//       socket.disconnect();
//     };
//   }, [finalUserId, receiverId, redeemId, formatTime]);

//   // ====================== SEARCH ======================
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredMessages(chatMessages);
//       setMatchedIndexes([]);
//       setCurrentMatchIndex(0);
//       return;
//     }

//     const query = searchQuery.toLowerCase().trim();
//     const indexes = [];
//     const filtered = chatMessages.filter((msg, index) => {
//       const match = (msg.text || "").toLowerCase().includes(query);
//       if (match) indexes.push(index);
//       return match;
//     });

//     setFilteredMessages(filtered);
//     setMatchedIndexes(indexes);
//     setCurrentMatchIndex(0);
//   }, [searchQuery, chatMessages]);

//   // Highlight navigation effect
//   useEffect(() => {
//     if (matchedIndexes.length === 0) return;
//     const index = matchedIndexes[currentMatchIndex];
//     const el = document.querySelector(`[data-msg-index="${index}"]`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [currentMatchIndex, matchedIndexes]);

//   // ====================== HANDLERS ======================
//   const uploadAndSendFile = useCallback(
//     async (file, accompanyingText = "") => {
//       if (!file || isUploading) return;

//       setIsUploading(true);
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const res = await fetch(UPLOAD_URL, {
//           method: "POST",
//           body: formData,
//         });
//         const result = await res.json();

//         if (result.success && result.data?.imageUrl) {
//           socketRef.current?.emit("sendMessage", {
//             senderId: finalUserId,
//             receiverId,
//             redeemId,
//             message: accompanyingText || result.data.imageUrl,
//             senderType: "user",
//             messageType: "image",
//             managerId,
//           });
//         } else {
//           alert("Failed to upload image. Please try again.");
//         }
//       } catch (error) {
//         console.error("Upload error:", error);
//         alert("Error uploading image");
//       } finally {
//         setIsUploading(false);
//         setUploadedFile(null);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//     },
//     [finalUserId, receiverId, redeemId, managerId, isUploading],
//   );

//   const handleSendMessage = useCallback(() => {
//     if (
//       isChatClosed ||
//       isUploading ||
//       (!messageInput.trim() && !uploadedFile)
//     ) {
//       return;
//     }

//     if (uploadedFile) {
//       uploadAndSendFile(uploadedFile, messageInput.trim());
//     } else {
//       socketRef.current?.emit("sendMessage", {
//         senderId: finalUserId,
//         receiverId,
//         redeemId,
//         message: messageInput.trim(),
//         senderType: "user",
//         messageType: "text",
//         managerId,
//       });
//     }

//     setMessageInput("");
//   }, [
//     messageInput,
//     uploadedFile,
//     isChatClosed,
//     isUploading,
//     finalUserId,
//     receiverId,
//     redeemId,
//     managerId,
//     uploadAndSendFile,
//   ]);

//   const handleFileUpload = useCallback(
//     (e) => {
//       if (isUploading) return;
//       const file = e.target.files?.[0];
//       if (file) {
//         setUploadedFile(file);
//         setMessageInput("");
//       }
//     },
//     [isUploading],
//   );

//   const triggerFileInput = useCallback(() => {
//     if (!isUploading) {
//       fileInputRef.current?.click();
//     }
//   }, [isUploading]);

//   const removeUploadedFile = useCallback(() => {
//     setUploadedFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   }, []);

//   const handleInputChange = useCallback(
//     (e) => {
//       if (isUploading || uploadedFile) {
//         setMessageInput("");
//         return;
//       }

//       const value = e.target.value;
//       setMessageInput(value);

//       if (socketRef.current) {
//         socketRef.current.emit("typing", {
//           senderId: finalUserId,
//           receiverId,
//           redeemId,
//         });

//         if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//         typingTimeoutRef.current = setTimeout(() => {
//           socketRef.current?.emit("stopTyping", {
//             senderId: finalUserId,
//             receiverId,
//             redeemId,
//           });
//         }, 1800);
//       }
//     },
//     [finalUserId, receiverId, redeemId, isUploading, uploadedFile],
//   );

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
//     };
//   }, []);

//   // ====================== RENDER ======================
//   return (
//     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
//       {/* Sidebar */}
//       <div
//         className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}
//       >
//         <SideBar
//           isDrawer={isDrawerOpen}
//           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
//         />
//       </div>

//       {isDrawerOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
//           onClick={() => setIsDrawerOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
//         {/* Mobile Purple Header */}
//         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
//               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
//             >
//               <Menu size={18} className="text-[#691188]" />
//             </button>
//             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
//               Payment Request Chat
//             </h1>
//           </div>
//           <img
//             src={chatUser.avatar}
//             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
//             alt={chatUser.name}
//             onError={(e) => {
//               e.target.src = DEFAULT_AVATAR;
//             }}
//           />
//         </div>

//         {/* Spacer for mobile header */}
//         <div className="h-[60px] xl:hidden" />

//         {/* Chat Container */}
//         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">
//           {" "}
//           <div className="h-[60px] w-full hidden xl:block bg-[#FFFFFF]" />
//           <div className="flex-1 flex flex-col lg:px-8 lg:mt-8 overflow-hidden">
//             {/* Chat Header */}
//             <div className="flex-shrink-0">
//               <ChatHeader
//                 chatUser={chatUser}
//                 isChatClosed={isChatClosed}
//                 searchQuery={searchQuery}
//                 onSearchChange={setSearchQuery}
//                 formatLastSeen={formatLastSeen}
//                 chatStatus={chatStatus}
//                 totalMatches={matchedIndexes.length}
//                 currentMatchIndex={currentMatchIndex}
//                 onNext={() =>
//                   setCurrentMatchIndex((prev) =>
//                     prev < matchedIndexes.length - 1 ? prev + 1 : prev,
//                   )
//                 }
//                 onPrev={() =>
//                   setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
//                 }
//                 isTyping={isTyping}
//                   isOnline={isOnline}   // ✅ ADD THIS LINE

//               />
//             </div>

//             {/* Messages Area */}
//             <div
//               ref={scrollContainerRef}
//               id="chat-scroll"
//               className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
//             >
//               <MessageList
//                 filteredMessages={filteredMessages}
//                 searchQuery={searchQuery}
//                 formatMessageDate={formatMessageDate}
//                 isLoading={isLoadingHistory}
//                 showScrollToBottom={showScrollToBottom}
//                 onScrollToBottom={scrollToBottom}
//               />
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Scroll to Bottom Button - Larger Bottom Shadow */}
//             {showScrollToBottom && (
//               <button
//                 onClick={scrollToBottom}
//                 className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
// bg-[#F4F4F4] hover:bg-[#c6c9c9] 
// p-2 rounded-full 
// shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
// hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
// transition-all duration-300 ease-out
// flex items-center justify-center border border-white/80
// active:scale-95
// opacity-100 translate-y-0"
//                 aria-label="Scroll to bottom"
//               >
//                 <img
//                   src="/scroll-icon.svg"
//                   alt="scroll down"
//                   className="w-5 h-5 object-contain "
//                 />
//               </button>
//             )}

//             {/* Chat Input */}
//             <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
//               <ChatInput
//                 messageInput={messageInput}
//                 onMessageChange={handleInputChange}
//                 onSendMessage={handleSendMessage}
//                 uploadedFile={uploadedFile}
//                 onFileUpload={handleFileUpload}
//                 onRemoveFile={removeUploadedFile}
//                 isUploading={isUploading}
//                 isChatClosed={isChatClosed}
//                 triggerFileInput={triggerFileInput}
//                 fileInputRef={fileInputRef}
//                 chatStatus={chatStatus}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );


// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// import { useLocation } from "react-router-dom";
// import { Menu } from "lucide-react";
// import { SideBar } from "../base-component/Sidebar.jsx";
// import io from "socket.io-client";
// import Cookies from "js-cookie";
// import { ChatHeader } from "./sohailPayment/ChatHeader";
// import { MessageList } from "./sohailPayment/MessageList";
// import { ChatInput } from "./sohailPayment/ChatInput";

// const SOCKET_URL = "https://apis.famocare.com";
// const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
// const DEFAULT_AVATAR =
//   "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
// const UPLOADS_BASE = "https://apis.famocare.com/uploads/";

// const buildImageUrl = (raw) => {
//   if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
//   const s = raw.trim();
//   if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) {
//     return DEFAULT_AVATAR;
//   }
//   if (
//     s.startsWith("http://") ||
//     s.startsWith("https://") ||
//     s.startsWith("data:")
//   ) {
//     return s;
//   }
//   return UPLOADS_BASE + s;
// };

// const PaymentRequestChat = ({
//   currentUserId,
//   receiverId: propReceiverId,
//   managerId: propManagerId,
//   chatUserData: propChatUserData,
// }) => {
//   const location = useLocation();
//   const passedState = location.state || {};

//   // ==================== STATE ====================
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [messageInput, setMessageInput] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isChatClosed, setIsChatClosed] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isOnline, setIsOnline] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
//   const [matchedIndexes, setMatchedIndexes] = useState([]);
//   const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
//   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
//   const [chatStatus, setChatStatus] = useState("in progress");
//   const [managerData, setManagerData] = useState(null);

//   // ==================== REFS ====================
//   const fileInputRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);
//   const typingTimeoutRef = useRef(null);
//   const scrollContainerRef = useRef(null);

//   // ==================== IDs ====================
//   const user = JSON.parse(Cookies.get("referralUser") || "{}");
//   const finalUserId = currentUserId || user?.id;

//   const receiverId =
//     passedState.receiverId ||
//     propReceiverId ||
//     passedState.managerId ||
//     passedState.userId;

//   const managerId = passedState.managerId || propManagerId;

//   const redeemId =
//     passedState.redeemId ||
//     passedState.id ||
//     passedState.redeemItem?.id ||
//     location.state?.redeemId ||
//     location.state?.id;

//   // Set initial chat status from navigation state
//   useEffect(() => {
//     const initialStatus = passedState.status || "in progress";
//     setChatStatus(initialStatus);
//   }, [passedState.status]);

//   // ==================== MANAGER DATA ====================
//   useEffect(() => {
//     const data =
//       passedState.managerData ||
//       passedState.chatUserData?.manager ||
//       propChatUserData?.manager ||
//       propChatUserData;

//     if (data?.name) {
//       setManagerData(data);
//     }
//   }, [passedState, propChatUserData]);

//   const chatUser = useMemo(
//     () => ({
//       name: managerData?.name || "Manager",
//       avatar: buildImageUrl(managerData?.imageUrl),
//       id: managerData?.id,
//       lastSeen: managerData?.lastSeen,
//     }),
//     [managerData],
//   );

//   // ==================== FORMATTERS ====================
//   const formatTime = useCallback((date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   }, []);

// const formatLastSeen = useCallback(() => {
//   if (isOnline === null) return "Checking...";
//   if (isOnline) return "Active now";

//   if (managerData?.lastSeen) {
//     const date = new Date(managerData.lastSeen);
//     const now = new Date();

//     const isToday = date.toDateString() === now.toDateString();
//     const yesterday = new Date(now);
//     yesterday.setDate(yesterday.getDate() - 1);
//     const isYesterday = date.toDateString() === yesterday.toDateString();

//     // ✅ Force Capital AM/PM
//     let time = date.toLocaleTimeString([], {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });

//     // Convert am/pm to AM/PM
//     time = time.replace(/am$/i, "AM").replace(/pm$/i, "PM");

//     if (isToday) return `Last seen today at ${time}`;
//     if (isYesterday) return `Last seen yesterday at ${time}`;

//     return `Last seen on ${date.toLocaleDateString()} at ${time}`;
//   }

//   return "Last seen recently";
// }, [isOnline, managerData]);

//   const formatMessageDate = useCallback((dateKey) => {
//     const date = new Date(dateKey);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) return "Today";
//     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       month: "long",
//       day: "numeric",
//     });
//   }, []);

//   const statusStyles = useMemo(() => {
//     switch (chatStatus) {
//       case "resolved":
//         return {
//           bgColor: "bg-green-100",
//           textColor: "text-green-600",
//           displayText: "RESOLVED",
//         };
//       case "unresolved":
//         return {
//           bgColor: "bg-red-100",
//           textColor: "text-red-600",
//           displayText: "UNRESOLVED",
//         };
//       default:
//         return {
//           bgColor: "bg-[#E0E0E0]",
//           textColor: "text-[#3887FD]",
//           displayText: "IN PROGRESS",
//         };
//     }
//   }, [chatStatus]);

//   // ==================== SCROLL HELPERS ====================
//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//     });
//   }, []);

//   // ==================== SCROLL + BUTTON LOGIC (FIXED) ====================

//   // ✅ Handle scroll button visibility (like ChatGPT)
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const { scrollTop, scrollHeight, clientHeight } = container;

//       const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

//       // ✅ Show button only when user scrolls UP
//       const hasScroll = scrollHeight > clientHeight;

//       if (hasScroll) {
//         setShowScrollToBottom(distanceFromBottom > 100);
//       } else {
//         // ✅ fallback: show if many
//         setShowScrollToBottom(chatMessages.length > 8);
//       }
//     };

//     container.addEventListener("scroll", handleScroll, { passive: true });

//     // Initial check
//     setTimeout(handleScroll, 200);

//     return () => {
//       container.removeEventListener("scroll", handleScroll);
//     };
//   }, [chatMessages]);

//   // ==================== AUTO SCROLL (PROFESSIONAL) ====================
//   useEffect(() => {
//     if (isLoadingHistory || chatMessages.length === 0) return;

//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const distanceFromBottom =
//       container.scrollHeight - (container.scrollTop + container.clientHeight);

//     const isNearBottom = distanceFromBottom < 80;

//     // ✅ First time → always scroll
//     if (!hasInitialScrollDone) {
//       setTimeout(() => {
//         scrollToBottom();
//         setHasInitialScrollDone(true);
//       }, 100);
//       return;
//     }

//     // ✅ Only auto-scroll if already near bottom
//     if (isNearBottom) {
//       setTimeout(() => {
//         scrollToBottom();
//       }, 100);
//     }
//   }, [
//     chatMessages.length,
//     isLoadingHistory,
//     hasInitialScrollDone,
//     scrollToBottom,
//   ]);

//   // Reset state when switching between different redeem requests
//   useEffect(() => {
//     setChatMessages([]);
//     setFilteredMessages([]);
//     setSearchQuery("");
//     setHasInitialScrollDone(false);
//     setIsLoadingHistory(true);
//   }, [redeemId]);

//   // ====================== SOCKET SETUP ======================
//   useEffect(() => {
//     if (!finalUserId || !receiverId || !redeemId) {
//       console.warn("Missing required IDs for socket connection");
//       return;
//     }

//     socketRef.current?.disconnect();

//     const socket = io(SOCKET_URL, {
//       auth: { userId: finalUserId },
//       transports: ["websocket", "polling"],
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     });

//     socketRef.current = socket;

//     const roomPayload = {
//       senderId: finalUserId,
//       receiverId,
//       redeemId,
//     };

//     socket.emit("joinChat", roomPayload);
//     socket.emit("fetchMessages", roomPayload);
//     socket.emit("markAllMessagesAsRead", {
//   senderId: receiverId,
//   receiverId: finalUserId,
//   redeemId,
//   readerId: finalUserId,
// });
//     socket.emit("getUserStatus", {
//       userId: receiverId,
//       senderType: "manager",
//     });

//     socket.on("allMessagesRead", (data) => {
//   console.log("✅ Messages marked as read:", data);
// });

//     // Declare user online + update last seen
//     socket.emit("userOnline", { userId: finalUserId, senderType: "user" });
//     socket.emit("updateLastSeen", { userId: finalUserId, senderType: "user" });

//     // Periodic status check every 8 seconds (best practice)
//     const statusInterval = setInterval(() => {
//       socket.emit("getUserStatus", {
//         userId: receiverId,
//         senderType: "manager",
//       });
//     }, 8000);

//     socket.on("previousMessages", (messages) => {
//       console.log("📥 previousMessages received:", messages?.length || 0);
//       const formatted = (messages || []).map((msg) => ({
//         id: msg.id,
//         text: msg.messageType === "image" ? "" : msg.message || "",
//         time: formatTime(msg.createdAt),
//         createdAt: msg.createdAt,
//         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
//         messageType: msg.messageType || "text",
//         imageUrl: msg.messageType === "image" ? msg.message : null,
//       }));

//       setChatMessages(formatted);
//       setIsLoadingHistory(false);
//     });

//     socket.on("receiveMessage", (msg) => {
//       const formatted = {
//         id: msg.id,
//         text: msg.messageType === "image" ? "" : msg.message || "",
//         time: formatTime(msg.createdAt),
//         createdAt: msg.createdAt,
//         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
//         messageType: msg.messageType || "text",
//         imageUrl: msg.messageType === "image" ? msg.message : null,
//       };

//       setChatMessages((prev) => {
//         if (prev.some((m) => m.id === formatted.id)) return prev;
//         return [...prev, formatted];
//       });
//     });

//     socket.on("userTyping", ({ senderId }) => {
//       if (String(senderId) === String(receiverId)) setIsTyping(true);
//     });

//     socket.on("userStoppedTyping", ({ senderId }) => {
//       if (String(senderId) === String(receiverId)) setIsTyping(false);
//     });
// socket.on("chatStatusUpdated", (data) => {
//   console.log("🔥 USER RECEIVED STATUS:", data);

//   if (String(data?.redeemId) === String(redeemId)) {
//     setChatStatus(data.status);

//     // 🔥 Auto close chat if resolved
//     if (data.status === "resolved") {
//       setIsChatClosed(true);
//     }
//   }
// });
//     // ==================== IMPROVED STATUS LISTENER ====================
//     socket.on("userStatusChanged", (data) => {
//       console.log("🔴 [DEBUG User Side] userStatusChanged:", data);

//       if (String(data?.userId) === String(receiverId)) {
//         const isNowOnline = data.status === "online";
//         setIsOnline(isNowOnline);

//         if (data.lastSeen) {
//           setManagerData((prev) =>
//             prev ? { ...prev, lastSeen: data.lastSeen } : prev,
//           );
//         }

//         console.log(
//           `🎯 Manager Status → ${isNowOnline ? "🟢 ONLINE" : "⚫ OFFLINE"}`,
//         );
//       }
//     });

//     socket.on("connect", () => {
//       console.log("✅ [User Side] Socket Connected");

//       socket.emit("getUserStatus", {
//         userId: receiverId,
//         senderType: "manager",
//       });
//     });
//     socket.on("disconnect", (reason) =>
//       console.log("❌ [User Side] Disconnected:", reason),
//     );

//     return () => {
//       clearInterval(statusInterval);
//       socket.disconnect();
//     };
//   }, [finalUserId, receiverId, redeemId, formatTime]);

//   // ====================== SEARCH ======================
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredMessages(chatMessages);
//       setMatchedIndexes([]);
//       setCurrentMatchIndex(0);
//       return;
//     }

//     const query = searchQuery.toLowerCase().trim();
//     const indexes = [];
//     const filtered = chatMessages.filter((msg, index) => {
//       const match = (msg.text || "").toLowerCase().includes(query);
//       if (match) indexes.push(index);
//       return match;
//     });

//     setFilteredMessages(filtered);
//     setMatchedIndexes(indexes);
//     setCurrentMatchIndex(0);
//   }, [searchQuery, chatMessages]);

//   // Highlight navigation effect
//   useEffect(() => {
//     if (matchedIndexes.length === 0) return;
//     const index = matchedIndexes[currentMatchIndex];
//     const el = document.querySelector(`[data-msg-index="${index}"]`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [currentMatchIndex, matchedIndexes]);

//   // ====================== HANDLERS ======================
//   const uploadAndSendFile = useCallback(
//     async (file, accompanyingText = "") => {
//       if (!file || isUploading) return;

//       setIsUploading(true);
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const res = await fetch(UPLOAD_URL, {
//           method: "POST",
//           body: formData,
//         });
//         const result = await res.json();

//         if (result.success && result.data?.imageUrl) {
//           socketRef.current?.emit("sendMessage", {
//             senderId: finalUserId,
//             receiverId,
//             redeemId,
//             message: accompanyingText || result.data.imageUrl,
//             senderType: "user",
//             messageType: "image",
//             managerId,
//           });
//         } else {
//           alert("Failed to upload image. Please try again.");
//         }
//       } catch (error) {
//         console.error("Upload error:", error);
//         alert("Error uploading image");
//       } finally {
//         setIsUploading(false);
//         setUploadedFile(null);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//     },
//     [finalUserId, receiverId, redeemId, managerId, isUploading],
//   );

//   const handleSendMessage = useCallback(() => {
//     if (
//       isChatClosed ||
//       isUploading ||
//       (!messageInput.trim() && !uploadedFile)
//     ) {
//       return;
//     }

//     if (uploadedFile) {
//       uploadAndSendFile(uploadedFile, messageInput.trim());
//     } else {
//       socketRef.current?.emit("sendMessage", {
//         senderId: finalUserId,
//         receiverId,
//         redeemId,
//         message: messageInput.trim(),
//         senderType: "user",
//         messageType: "text",
//         managerId,
//       });
//     }

//     setMessageInput("");
//   }, [
//     messageInput,
//     uploadedFile,
//     isChatClosed,
//     isUploading,
//     finalUserId,
//     receiverId,
//     redeemId,
//     managerId,
//     uploadAndSendFile,
//   ]);

//   const handleFileUpload = useCallback(
//     (e) => {
//       if (isUploading) return;
//       const file = e.target.files?.[0];
//       if (file) {
//         setUploadedFile(file);
//         setMessageInput("");
//       }
//     },
//     [isUploading],
//   );

//   const triggerFileInput = useCallback(() => {
//     if (!isUploading) {
//       fileInputRef.current?.click();
//     }
//   }, [isUploading]);

//   const removeUploadedFile = useCallback(() => {
//     setUploadedFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   }, []);

//   const handleInputChange = useCallback(
//     (e) => {
//       if (isUploading || uploadedFile) {
//         setMessageInput("");
//         return;
//       }

//       const value = e.target.value;
//       setMessageInput(value);

//       if (socketRef.current) {
//         socketRef.current.emit("typing", {
//           senderId: finalUserId,
//           receiverId,
//           redeemId,
//         });

//         if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//         typingTimeoutRef.current = setTimeout(() => {
//           socketRef.current?.emit("stopTyping", {
//             senderId: finalUserId,
//             receiverId,
//             redeemId,
//           });
//         }, 1800);
//       }
//     },
//     [finalUserId, receiverId, redeemId, isUploading, uploadedFile],
//   );

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
//     };
//   }, []);

// //   // ====================== RENDER ======================
// //   return (
// //     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
// //       {/* Sidebar */}
// //       <div
// //         className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}
// //       >
// //         <SideBar
// //           isDrawer={isDrawerOpen}
// //           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
// //         />
// //       </div>

// //       {isDrawerOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
// //           onClick={() => setIsDrawerOpen(false)}
// //         />
// //       )}

// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
// //         {/* Mobile Purple Header */}
// //         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
// //               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
// //             >
// //               <Menu size={18} className="text-[#691188]" />
// //             </button>
// //             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
// //               Payment Request Chat
// //             </h1>
// //           </div>
// //           <img
// //             src={chatUser.avatar}
// //             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
// //             alt={chatUser.name}
// //             onError={(e) => {
// //               e.target.src = DEFAULT_AVATAR;
// //             }}
// //           />
// //         </div>

// //         {/* Spacer for mobile header */}
// //         <div className="h-[60px] xl:hidden" />

// //         {/* Chat Container */}
// //         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">
// //           {" "}
// //           <div className="h-[60px] w-full hidden xl:block bg-[#FFFFFF]" />
// //           <div className="flex-1 flex flex-col lg:px-8 lg:mt-8 overflow-hidden">
// //             {/* Chat Header */}
// //             <div className="flex-shrink-0">
// //               <ChatHeader
// //                 chatUser={chatUser}
// //                 isChatClosed={isChatClosed}
// //                 searchQuery={searchQuery}
// //                 onSearchChange={setSearchQuery}
// //                 formatLastSeen={formatLastSeen}
// //                 chatStatus={chatStatus}
// //                 totalMatches={matchedIndexes.length}
// //                 currentMatchIndex={currentMatchIndex}
// //                 onNext={() =>
// //                   setCurrentMatchIndex((prev) =>
// //                     prev < matchedIndexes.length - 1 ? prev + 1 : prev,
// //                   )
// //                 }
// //                 onPrev={() =>
// //                   setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
// //                 }
// //                 isTyping={isTyping}
// //                   isOnline={isOnline}   // ✅ ADD THIS LINE

// //               />
// //             </div>

// //             {/* Messages Area */}
// //             <div
// //               ref={scrollContainerRef}
// //               id="chat-scroll"
// //               className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
// //             >
// //               <MessageList
// //                 filteredMessages={filteredMessages}
// //                 searchQuery={searchQuery}
// //                 formatMessageDate={formatMessageDate}
// //                 isLoading={isLoadingHistory}
// //                 showScrollToBottom={showScrollToBottom}
// //                 onScrollToBottom={scrollToBottom}
// //               />
// //               <div ref={messagesEndRef} />
// //             </div>

// //             {/* Scroll to Bottom Button - Larger Bottom Shadow */}
// //             {showScrollToBottom && (
// //               <button
// //                 onClick={scrollToBottom}
// //                 className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
// // bg-[#F4F4F4] hover:bg-[#c6c9c9] 
// // p-2 rounded-full 
// // shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
// // hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
// // transition-all duration-300 ease-out
// // flex items-center justify-center border border-white/80
// // active:scale-95
// // opacity-100 translate-y-0"
// //                 aria-label="Scroll to bottom"
// //               >
// //                 <img
// //                   src="/scroll-icon.svg"
// //                   alt="scroll down"
// //                   className="w-5 h-5 object-contain "
// //                 />
// //               </button>
// //             )}

// //             {/* Chat Input */}
// //             <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
// //               <ChatInput
// //                 messageInput={messageInput}
// //                 onMessageChange={handleInputChange}
// //                 onSendMessage={handleSendMessage}
// //                 uploadedFile={uploadedFile}
// //                 onFileUpload={handleFileUpload}
// //                 onRemoveFile={removeUploadedFile}
// //                 isUploading={isUploading}
// //                 isChatClosed={isChatClosed}
// //                 triggerFileInput={triggerFileInput}
// //                 fileInputRef={fileInputRef}
// //                 chatStatus={chatStatus}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// useEffect(() => {
//   if (chatStatus === "resolved") {
//     setIsChatClosed(true);
//   } else {
//     setIsChatClosed(false);
//   }
// }, [chatStatus]);

//   // ====================== RENDER ======================
//   return (
//     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
//       {/* Sidebar */}
//       <div
//         className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}
//       >
//         <SideBar
//           isDrawer={isDrawerOpen}
//           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
//         />
//       </div>

//       {isDrawerOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
//           onClick={() => setIsDrawerOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
//         {/* Mobile Purple Header */}
//         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
//               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
//             >
//               <Menu size={18} className="text-[#691188]" />
//             </button>
//             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
//               Payment Request Chat
//             </h1>
//           </div>
//           <img
//             src={chatUser.avatar}
//             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
//             alt={chatUser.name}
//             onError={(e) => {
//               e.target.src = DEFAULT_AVATAR;
//             }}
//           />
//         </div>

//         {/* Spacer for mobile header */}
//         <div className="h-[60px] xl:hidden" />

//         {/* Chat Container */}
//         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">
//           <div className="h-[60px] w-full hidden xl:block bg-[#FFFFFF]" />
          
//           {/* ✅ Only this div is wrapped with border + shadow */}
//           <div className="flex-1 flex flex-col lg:px-8 lg:mt-8 overflow-hidden">
//             <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              
//               {/* Chat Header */}
//               <div className="flex-shrink-0">
//                 <ChatHeader
//                   chatUser={chatUser}
//                   isChatClosed={isChatClosed}
//                   searchQuery={searchQuery}
//                   onSearchChange={setSearchQuery}
//                   formatLastSeen={formatLastSeen}
//                   chatStatus={chatStatus}
//                   totalMatches={matchedIndexes.length}
//                   currentMatchIndex={currentMatchIndex}
//                   onNext={() =>
//                     setCurrentMatchIndex((prev) =>
//                       prev < matchedIndexes.length - 1 ? prev + 1 : prev
//                     )
//                   }
//                   onPrev={() =>
//                     setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
//                   }
//                   isTyping={isTyping}
//                   isOnline={isOnline}
//                 />
//               </div>

//               {/* Messages Area */}
//               <div
//                 ref={scrollContainerRef}
//                 id="chat-scroll"
//                 className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
//               >
//                 <MessageList
//                   filteredMessages={filteredMessages}
//                   searchQuery={searchQuery}
//                   formatMessageDate={formatMessageDate}
//                   isLoading={isLoadingHistory}
//                   showScrollToBottom={showScrollToBottom}
//                   onScrollToBottom={scrollToBottom}
//                 />
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Scroll to Bottom Button */}
//               {showScrollToBottom && (
//                 <button
//                   onClick={scrollToBottom}
//                   className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
//                     bg-[#F4F4F4] hover:bg-[#c6c9c9] p-2 rounded-full 
//                     shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
//                     hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
//                     transition-all duration-300 ease-out
//                     flex items-center justify-center border border-white/80 active:scale-95"
//                   aria-label="Scroll to bottom"
//                 >
//                   <img src="/scroll-icon.svg" alt="scroll down" className="w-5 h-5 object-contain" />
//                 </button>
//               )}

//               {/* Chat Input */}
//               <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white">
//                 <ChatInput
//                   messageInput={messageInput}
//                   onMessageChange={handleInputChange}
//                   onSendMessage={handleSendMessage}
//                   uploadedFile={uploadedFile}
//                   onFileUpload={handleFileUpload}
//                   onRemoveFile={removeUploadedFile}
//                   isUploading={isUploading}
//                   isChatClosed={isChatClosed}
//                   triggerFileInput={triggerFileInput}
//                   fileInputRef={fileInputRef}
//                   chatStatus={chatStatus}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MemoizedChat = React.memo(PaymentRequestChat);
// export default MemoizedChat;


////


// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// import { useLocation } from "react-router-dom";
// import { Menu } from "lucide-react";
// import { SideBar } from "../base-component/Sidebar.jsx";
// import io from "socket.io-client";
// import Cookies from "js-cookie";
// import { ChatHeader } from "./sohailPayment/ChatHeader";
// import { MessageList } from "./sohailPayment/MessageList";
// import { ChatInput } from "./sohailPayment/ChatInput";

// const SOCKET_URL = "https://apis.famocare.com";
// const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
// const DEFAULT_AVATAR =
//   "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
// const UPLOADS_BASE = "https://apis.famocare.com/uploads/";

// // ==================== SCROLL TO BOTTOM ICON ====================
// export const ScrollToBottomIcon = ({ iconClassName = "#9E9E9E" }) => {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M3 6L10 14L17 6"
//         stroke={iconClassName}
//         strokeWidth="3"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };

// const buildImageUrl = (raw) => {
//   if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
//   const s = raw.trim();
//   if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) {
//     return DEFAULT_AVATAR;
//   }
//   if (
//     s.startsWith("http://") ||
//     s.startsWith("https://") ||
//     s.startsWith("data:")
//   ) {
//     return s;
//   }
//   return UPLOADS_BASE + s;
// };

// const PaymentRequestChat = ({
//   currentUserId,
//   receiverId: propReceiverId,
//   managerId: propManagerId,
//   chatUserData: propChatUserData,
// }) => {
//   const location = useLocation();
//   const passedState = location.state || {};

//   // ==================== STATE ====================
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [messageInput, setMessageInput] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isChatClosed, setIsChatClosed] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isOnline, setIsOnline] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
//   const [matchedIndexes, setMatchedIndexes] = useState([]);
//   const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
//   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(true);
//   const [chatStatus, setChatStatus] = useState("in progress");
//   const [managerData, setManagerData] = useState(null);

//   // ==================== REFS ====================
//   const fileInputRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);
//   const typingTimeoutRef = useRef(null);
//   const scrollContainerRef = useRef(null);

//   // ==================== IDs ====================
//   const user = JSON.parse(Cookies.get("referralUser") || "{}");
//   const finalUserId = currentUserId || user?.id;

//   const receiverId =
//     passedState.receiverId ||
//     propReceiverId ||
//     passedState.managerId ||
//     passedState.userId;

//   const managerId = passedState.managerId || propManagerId;

//   const redeemId =
//     passedState.redeemId ||
//     passedState.id ||
//     passedState.redeemItem?.id ||
//     location.state?.redeemId ||
//     location.state?.id;

//   // Set initial chat status from navigation state
//   useEffect(() => {
//     const initialStatus = passedState.status || "in progress";
//     setChatStatus(initialStatus);
//   }, [passedState.status]);

//   // Auto close chat when resolved
//   useEffect(() => {
//     if (chatStatus === "resolved") {
//       setIsChatClosed(true);
//     } else {
//       setIsChatClosed(false);
//     }
//   }, [chatStatus]);

//   // ==================== MANAGER DATA ====================
//   useEffect(() => {
//     const data =
//       passedState.managerData ||
//       passedState.chatUserData?.manager ||
//       propChatUserData?.manager ||
//       propChatUserData;

//     if (data?.name) {
//       setManagerData(data);
//     }
//   }, [passedState, propChatUserData]);

//   const chatUser = useMemo(
//     () => ({
//       name: managerData?.name || "Manager",
//       avatar: buildImageUrl(managerData?.imageUrl),
//       id: managerData?.id,
//       lastSeen: managerData?.lastSeen,
//     }),
//     [managerData],
//   );

//   // ==================== FORMATTERS ====================
//   const formatTime = useCallback((date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   }, []);

//   const formatLastSeen = useCallback(() => {
//     if (isOnline === null) return "Checking...";
//     if (isOnline) return "Active now";

//     if (managerData?.lastSeen) {
//       const date = new Date(managerData.lastSeen);
//       const now = new Date();

//       const isToday = date.toDateString() === now.toDateString();
//       const yesterday = new Date(now);
//       yesterday.setDate(yesterday.getDate() - 1);
//       const isYesterday = date.toDateString() === yesterday.toDateString();

//       let time = date.toLocaleTimeString([], {
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: true,
//       });

//       time = time.replace(/am$/i, "AM").replace(/pm$/i, "PM");

//       if (isToday) return `Last seen today at ${time}`;
//       if (isYesterday) return `Last seen yesterday at ${time}`;

//       return `Last seen on ${date.toLocaleDateString()} at ${time}`;
//     }

//     return "Last seen recently";
//   }, [isOnline, managerData]);

//   const formatMessageDate = useCallback((dateKey) => {
//     const date = new Date(dateKey);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) return "Today";
//     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       month: "long",
//       day: "numeric",
//     });
//   }, []);

//   const statusStyles = useMemo(() => {
//     switch (chatStatus) {
//       case "resolved":
//         return {
//           bgColor: "bg-green-100",
//           textColor: "text-green-600",
//           displayText: "RESOLVED",
//         };
//       case "unresolved":
//         return {
//           bgColor: "bg-red-100",
//           textColor: "text-red-600",
//           displayText: "UNRESOLVED",
//         };
//       default:
//         return {
//           bgColor: "bg-[#E0E0E0]",
//           textColor: "text-[#3887FD]",
//           displayText: "IN PROGRESS",
//         };
//     }
//   }, [chatStatus]);

//   // ==================== SCROLL HELPERS ====================
//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//     });
//   }, []);

//   // ==================== SCROLL + BUTTON LOGIC ====================
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const { scrollTop, scrollHeight, clientHeight } = container;
//       const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
//       const hasScroll = scrollHeight > clientHeight;

//       if (hasScroll) {
//         setShowScrollToBottom(distanceFromBottom > 100);
//       } else {
//         setShowScrollToBottom(chatMessages.length > 8);
//       }
//     };

//     container.addEventListener("scroll", handleScroll, { passive: true });
//     setTimeout(handleScroll, 200);

//     return () => {
//       container.removeEventListener("scroll", handleScroll);
//     };
//   }, [chatMessages]);

//   // ==================== AUTO SCROLL ====================
//   useEffect(() => {
//     if (isLoadingHistory || chatMessages.length === 0) return;

//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const distanceFromBottom =
//       container.scrollHeight - (container.scrollTop + container.clientHeight);
//     const isNearBottom = distanceFromBottom < 80;

//     if (!hasInitialScrollDone) {
//       setTimeout(() => {
//         scrollToBottom();
//         setHasInitialScrollDone(true);
//       }, 100);
//       return;
//     }

//     if (isNearBottom) {
//       setTimeout(() => {
//         scrollToBottom();
//       }, 100);
//     }
//   }, [chatMessages.length, isLoadingHistory, hasInitialScrollDone, scrollToBottom]);

//   // Reset state when switching redeem requests
//   useEffect(() => {
//     setChatMessages([]);
//     setFilteredMessages([]);
//     setSearchQuery("");
//     setHasInitialScrollDone(false);
//     setIsLoadingHistory(true);
//   }, [redeemId]);

//   // ====================== SOCKET SETUP ======================
//   useEffect(() => {
//     if (!finalUserId || !receiverId || !redeemId) return;

//     socketRef.current?.disconnect();

//     const socket = io(SOCKET_URL, {
//       auth: { userId: finalUserId },
//       transports: ["websocket", "polling"],
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     });

//     socketRef.current = socket;

//     const roomPayload = { senderId: finalUserId, receiverId, redeemId };

//     socket.emit("joinChat", roomPayload);
//     socket.emit("fetchMessages", roomPayload);
//     socket.emit("markAllMessagesAsRead", {
//       senderId: receiverId,
//       receiverId: finalUserId,
//       redeemId,
//       readerId: finalUserId,
//     });
//     socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
//     socket.emit("userOnline", { userId: finalUserId, senderType: "user" });
//     socket.emit("updateLastSeen", { userId: finalUserId, senderType: "user" });

//     const statusInterval = setInterval(() => {
//       socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
//     }, 8000);

//     socket.on("previousMessages", (messages) => {
//       const formatted = (messages || []).map((msg) => ({
//         id: msg.id,
//         text: msg.messageType === "image" ? "" : msg.message || "",
//         time: formatTime(msg.createdAt),
//         createdAt: msg.createdAt,
//         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
//         messageType: msg.messageType || "text",
//         imageUrl: msg.messageType === "image" ? msg.message : null,
//       }));

//       setChatMessages(formatted);
//       setIsLoadingHistory(false);
//     });

//     socket.on("receiveMessage", (msg) => {
//       const formatted = {
//         id: msg.id,
//         text: msg.messageType === "image" ? "" : msg.message || "",
//         time: formatTime(msg.createdAt),
//         createdAt: msg.createdAt,
//         sender: String(msg.senderId) === String(finalUserId) ? "me" : "other",
//         messageType: msg.messageType || "text",
//         imageUrl: msg.messageType === "image" ? msg.message : null,
//       };

//       setChatMessages((prev) => {
//         if (prev.some((m) => m.id === formatted.id)) return prev;
//         return [...prev, formatted];
//       });
//     });

//     socket.on("userTyping", ({ senderId }) => {
//       if (String(senderId) === String(receiverId)) setIsTyping(true);
//     });

//     socket.on("userStoppedTyping", ({ senderId }) => {
//       if (String(senderId) === String(receiverId)) setIsTyping(false);
//     });

//     socket.on("chatStatusUpdated", (data) => {
//       if (String(data?.redeemId) === String(redeemId)) {
//         setChatStatus(data.status);
//         if (data.status === "resolved") {
//           setIsChatClosed(true);
//         }
//       }
//     });

//     socket.on("userStatusChanged", (data) => {
//       if (String(data?.userId) === String(receiverId)) {
//         const isNowOnline = data.status === "online";
//         setIsOnline(isNowOnline);
//         if (data.lastSeen) {
//           setManagerData((prev) =>
//             prev ? { ...prev, lastSeen: data.lastSeen } : prev,
//           );
//         }
//       }
//     });

//     socket.on("connect", () => {
//       socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
//     });

//     return () => {
//       clearInterval(statusInterval);
//       socket.disconnect();
//     };
//   }, [finalUserId, receiverId, redeemId, formatTime]);

//   // ====================== SEARCH ======================
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredMessages(chatMessages);
//       setMatchedIndexes([]);
//       setCurrentMatchIndex(0);
//       return;
//     }

//     const query = searchQuery.toLowerCase().trim();
//     const indexes = [];
//     const filtered = chatMessages.filter((msg, index) => {
//       const match = (msg.text || "").toLowerCase().includes(query);
//       if (match) indexes.push(index);
//       return match;
//     });

//     setFilteredMessages(filtered);
//     setMatchedIndexes(indexes);
//     setCurrentMatchIndex(0);
//   }, [searchQuery, chatMessages]);

//   useEffect(() => {
//     if (matchedIndexes.length === 0) return;
//     const index = matchedIndexes[currentMatchIndex];
//     const el = document.querySelector(`[data-msg-index="${index}"]`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [currentMatchIndex, matchedIndexes]);

//   // ====================== HANDLERS ======================
//   const uploadAndSendFile = useCallback(
//     async (file, accompanyingText = "") => {
//       if (!file || isUploading) return;

//       setIsUploading(true);
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
//         const result = await res.json();

//         if (result.success && result.data?.imageUrl) {
//           socketRef.current?.emit("sendMessage", {
//             senderId: finalUserId,
//             receiverId,
//             redeemId,
//             message: accompanyingText || result.data.imageUrl,
//             senderType: "user",
//             messageType: "image",
//             managerId,
//           });
//         } else {
//           alert("Failed to upload image. Please try again.");
//         }
//       } catch (error) {
//         alert("Error uploading image");
//       } finally {
//         setIsUploading(false);
//         setUploadedFile(null);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//     },
//     [finalUserId, receiverId, redeemId, managerId, isUploading],
//   );

//   const handleSendMessage = useCallback(() => {
//     if (isChatClosed || isUploading || (!messageInput.trim() && !uploadedFile)) {
//       return;
//     }

//     if (uploadedFile) {
//       uploadAndSendFile(uploadedFile, messageInput.trim());
//     } else {
//       socketRef.current?.emit("sendMessage", {
//         senderId: finalUserId,
//         receiverId,
//         redeemId,
//         message: messageInput.trim(),
//         senderType: "user",
//         messageType: "text",
//         managerId,
//       });
//     }

//     setMessageInput("");
//   }, [
//     messageInput, uploadedFile, isChatClosed, isUploading,
//     finalUserId, receiverId, redeemId, managerId, uploadAndSendFile,
//   ]);

//   const handleFileUpload = useCallback(
//     (e) => {
//       if (isUploading) return;
//       const file = e.target.files?.[0];
//       if (file) {
//         setUploadedFile(file);
//         setMessageInput("");
//       }
//     },
//     [isUploading],
//   );

//   const triggerFileInput = useCallback(() => {
//     if (!isUploading) fileInputRef.current?.click();
//   }, [isUploading]);

//   const removeUploadedFile = useCallback(() => {
//     setUploadedFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   }, []);

//   const handleInputChange = useCallback(
//     (e) => {
//       if (isUploading || uploadedFile) {
//         setMessageInput("");
//         return;
//       }

//       const value = e.target.value;
//       setMessageInput(value);

//       if (socketRef.current) {
//         socketRef.current.emit("typing", { senderId: finalUserId, receiverId, redeemId });

//         if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//         typingTimeoutRef.current = setTimeout(() => {
//           socketRef.current?.emit("stopTyping", {
//             senderId: finalUserId,
//             receiverId,
//             redeemId,
//           });
//         }, 1800);
//       }
//     },
//     [finalUserId, receiverId, redeemId, isUploading, uploadedFile],
//   );

//   useEffect(() => {
//     return () => {
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//     };
//   }, []);

//   // ====================== RENDER ======================
//   return (
//     <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
//       {/* Sidebar */}
//       <div className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}>
//         <SideBar
//           isDrawer={isDrawerOpen}
//           handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
//         />
//       </div>

//       {isDrawerOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
//           onClick={() => setIsDrawerOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
//         {/* Mobile Purple Header */}
//         <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
//               className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
//             >
//               <Menu size={18} className="text-[#691188]" />
//             </button>
//             <h1 className="text-base sm:text-lg font-semibold text-white truncate">
//               Payment Request Chat
//             </h1>
//           </div>
//           <img
//             src={chatUser.avatar}
//             className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
//             alt={chatUser.name}
//             onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
//           />
//         </div>

//         {/* Spacer for mobile header */}
//         <div className="h-[60px] xl:hidden" />

//         {/* Chat Container */}
//         <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">

//           {/* ✅ Only on desktop — no white border on mobile */}
//           <div className="h-[60px] w-full hidden xl:block bg-[#F2F4F7]" />

//           <div className="flex-1 flex flex-col lg:px-8 lg:mb-8 overflow-hidden">
//             <div className="flex-1 flex flex-col bg-white lg:rounded-2xl lg:shadow-md lg:border lg:border-gray-200 overflow-hidden">

//               {/* Chat Header */}
//               <div className="flex-shrink-0">
//                 <ChatHeader
//                   chatUser={chatUser}
//                   isChatClosed={isChatClosed}
//                   searchQuery={searchQuery}
//                   onSearchChange={setSearchQuery}
//                   formatLastSeen={formatLastSeen}
//                   chatStatus={chatStatus}
//                   totalMatches={matchedIndexes.length}
//                   currentMatchIndex={currentMatchIndex}
//                   onNext={() =>
//                     setCurrentMatchIndex((prev) =>
//                       prev < matchedIndexes.length - 1 ? prev + 1 : prev,
//                     )
//                   }
//                   onPrev={() =>
//                     setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : prev))
//                   }
//                   isTyping={isTyping}
//                   isOnline={isOnline}
//                 />
//               </div>

//               {/* Messages Area */}
//               <div
//                 ref={scrollContainerRef}
//                 id="chat-scroll"
//                 className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
//               >
//                 <MessageList
//                   filteredMessages={filteredMessages}
//                   searchQuery={searchQuery}
//                   formatMessageDate={formatMessageDate}
//                   isLoading={isLoadingHistory}
//                   showScrollToBottom={showScrollToBottom}
//                   onScrollToBottom={scrollToBottom}
//                 />
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Scroll to Bottom Button */}
//               {showScrollToBottom && (
//                 <button
//                   onClick={scrollToBottom}
//                   className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
//                     bg-[#F4F4F4] hover:bg-[#c6c9c9]
//                     p-2 rounded-full
//                     shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
//                     hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
//                     transition-all duration-300 ease-out
//                     flex items-center justify-center border border-white/80
//                     active:scale-95"
//                   aria-label="Scroll to bottom"
//                 >
//                   <ScrollToBottomIcon iconClassName="#9E9E9E" />
//                 </button>
//               )}

//               {/* Chat Input */}
//               <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
//                 <ChatInput
//                   messageInput={messageInput}
//                   onMessageChange={handleInputChange}
//                   onSendMessage={handleSendMessage}
//                   uploadedFile={uploadedFile}
//                   onFileUpload={handleFileUpload}
//                   onRemoveFile={removeUploadedFile}
//                   isUploading={isUploading}
//                   isChatClosed={isChatClosed}
//                   triggerFileInput={triggerFileInput}
//                   fileInputRef={fileInputRef}
//                   chatStatus={chatStatus}
//                 />
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MemoizedChat = React.memo(PaymentRequestChat);
// export default MemoizedChat;

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { SideBar } from "../base-component/Sidebar.jsx";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { ChatHeader } from "./sohailPayment/ChatHeader";
import { MessageList } from "./sohailPayment/MessageList";
import { ChatInput } from "./sohailPayment/ChatInput";

const SOCKET_URL = "https://apis.famocare.com";
const UPLOAD_URL = "https://apis.famocare.com/api/upload/image";
const DEFAULT_AVATAR =
  "https://apis.famocare.com/uploads/1756725625885-191777918.jpeg";
const UPLOADS_BASE = "https://apis.famocare.com/uploads/";

export const ScrollToBottomIcon = ({ iconClassName = "#9E9E9E" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6L10 14L17 6" stroke={iconClassName} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const buildImageUrl = (raw) => {
  if (!raw || typeof raw !== "string") return DEFAULT_AVATAR;
  const s = raw.trim();
  if (!s || ["null", "undefined", "nan"].includes(s.toLowerCase())) return DEFAULT_AVATAR;
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:")) return s;
  return UPLOADS_BASE + s;
};

const PaymentRequestChat = ({
  currentUserId,
  receiverId: propReceiverId,
  managerId: propManagerId,
  chatUserData: propChatUserData,
}) => {
  const location = useLocation();
  const passedState = location.state || {};

  // ==================== STATE ====================
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isChatClosed, setIsChatClosed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  const [hasInitialScrollDone, setHasInitialScrollDone] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [chatStatus, setChatStatus] = useState("in progress");
  const [managerData, setManagerData] = useState(null);

  // ==================== REFS ====================
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // ==================== IDs ====================
  const user = JSON.parse(Cookies.get("referralUser") || "{}");
  const finalUserId = currentUserId || user?.id;
  const SESSION_KEY = `chat_state_${finalUserId}`;

  // ── Resolve state: navigation state → sessionStorage → props ──
  const resolvedState = useMemo(() => {
    const hasNavState =
      passedState?.redeemId ||
      passedState?.id ||
      passedState?.receiverId ||
      passedState?.managerId ||
      passedState?.userId;

    if (hasNavState) {
      const s = {
        receiverId:  passedState.receiverId || passedState.managerId || passedState.userId,
        managerId:   passedState.managerId,
        redeemId:    passedState.redeemId || passedState.id || passedState.redeemItem?.id,
        status:      passedState.status || "in progress",
        managerData: passedState.managerData || passedState.chatUserData?.manager || null,
      };
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (_) {}
      return s;
    }

    // refresh fallback
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}

    // props fallback
    return {
      receiverId:  propReceiverId,
      managerId:   propManagerId,
      redeemId:    null,
      status:      "in progress",
      managerData: propChatUserData?.manager || propChatUserData || null,
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const receiverId  = resolvedState.receiverId;
  const managerId   = resolvedState.managerId;
  const redeemId    = resolvedState.redeemId;

  // ── Seed state from resolvedState on mount ──
  useEffect(() => {
    const initialStatus = resolvedState.status || "in progress";
    setChatStatus(initialStatus);

    const data = resolvedState.managerData || propChatUserData?.manager || propChatUserData;
    if (data?.name) setManagerData(data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto close chat when resolved
  useEffect(() => {
    setIsChatClosed(chatStatus === "resolved");
  }, [chatStatus]);

  const chatUser = useMemo(
    () => ({
      name:     managerData?.name || "Manager",
      avatar:   buildImageUrl(managerData?.imageUrl),
      id:       managerData?.id,
      lastSeen: managerData?.lastSeen,
    }),
    [managerData],
  );

  // ==================== FORMATTERS ====================
  const formatTime = useCallback((date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

  const formatLastSeen = useCallback(() => {
    if (isOnline === null) return "Checking...";
    if (isOnline) return "Active now";

    if (managerData?.lastSeen) {
      const date = new Date(managerData.lastSeen);
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);

      let time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
      time = time.replace(/am$/i, "AM").replace(/pm$/i, "PM");

      if (date.toDateString() === now.toDateString()) return `Last seen today at ${time}`;
      if (date.toDateString() === yesterday.toDateString()) return `Last seen yesterday at ${time}`;
      return `Last seen on ${date.toLocaleDateString()} at ${time}`;
    }
    return "Last seen recently";
  }, [isOnline, managerData]);

  const formatMessageDate = useCallback((dateKey) => {
    const date = new Date(dateKey);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }, []);

  // ==================== SCROLL ====================
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      setShowScrollToBottom(
        scrollHeight > clientHeight ? distanceFromBottom > 100 : chatMessages.length > 8
      );
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 200);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [chatMessages]);

  useEffect(() => {
    if (isLoadingHistory || chatMessages.length === 0) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const distanceFromBottom = container.scrollHeight - (container.scrollTop + container.clientHeight);

    if (!hasInitialScrollDone) {
      setTimeout(() => { scrollToBottom(); setHasInitialScrollDone(true); }, 100);
      return;
    }
    if (distanceFromBottom < 80) setTimeout(scrollToBottom, 100);
  }, [chatMessages.length, isLoadingHistory, hasInitialScrollDone, scrollToBottom]);

  useEffect(() => {
    setChatMessages([]);
    setFilteredMessages([]);
    setSearchQuery("");
    setHasInitialScrollDone(false);
    setIsLoadingHistory(true);
  }, [redeemId]);

  // ====================== SOCKET ======================
  useEffect(() => {
    if (!finalUserId || !receiverId || !redeemId) return;

    socketRef.current?.disconnect();

    const socket = io(SOCKET_URL, {
      auth: { userId: finalUserId },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    const roomPayload = { senderId: finalUserId, receiverId, redeemId };

    socket.emit("joinChat", roomPayload);
    socket.emit("fetchMessages", roomPayload);
    socket.emit("markAllMessagesAsRead", {
      senderId: receiverId, receiverId: finalUserId, redeemId, readerId: finalUserId,
    });
    socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
    socket.emit("userOnline",    { userId: finalUserId, senderType: "user" });
    socket.emit("updateLastSeen",{ userId: finalUserId, senderType: "user" });

    const statusInterval = setInterval(() => {
      socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
    }, 8000);

    socket.on("previousMessages", (messages) => {
      const formatted = (messages || []).map((msg) => ({
        id:          msg.id,
        text:        msg.messageType === "image" ? "" : msg.message || "",
        time:        formatTime(msg.createdAt),
        createdAt:   msg.createdAt,
        sender:      String(msg.senderId) === String(finalUserId) ? "me" : "other",
        messageType: msg.messageType || "text",
        imageUrl:    msg.messageType === "image" ? msg.message : null,
      }));
      setChatMessages(formatted);
      setIsLoadingHistory(false);
    });

    socket.on("receiveMessage", (msg) => {
      const formatted = {
        id:          msg.id,
        text:        msg.messageType === "image" ? "" : msg.message || "",
        time:        formatTime(msg.createdAt),
        createdAt:   msg.createdAt,
        sender:      String(msg.senderId) === String(finalUserId) ? "me" : "other",
        messageType: msg.messageType || "text",
        imageUrl:    msg.messageType === "image" ? msg.message : null,
      };
      setChatMessages((prev) => prev.some((m) => m.id === formatted.id) ? prev : [...prev, formatted]);
    });

    socket.on("userTyping",        ({ senderId }) => { if (String(senderId) === String(receiverId)) setIsTyping(true); });
    socket.on("userStoppedTyping", ({ senderId }) => { if (String(senderId) === String(receiverId)) setIsTyping(false); });

    socket.on("chatStatusUpdated", (data) => {
      if (String(data?.redeemId) === String(redeemId)) {
        setChatStatus(data.status);
        if (data.status === "resolved") setIsChatClosed(true);
      }
    });

    socket.on("userStatusChanged", (data) => {
      if (String(data?.userId) === String(receiverId)) {
        setIsOnline(data.status === "online");
        if (data.lastSeen) setManagerData((prev) => prev ? { ...prev, lastSeen: data.lastSeen } : prev);
      }
    });

    socket.on("connect", () => {
      socket.emit("getUserStatus", { userId: receiverId, senderType: "manager" });
    });

    return () => { clearInterval(statusInterval); socket.disconnect(); };
  }, [finalUserId, receiverId, redeemId, formatTime]);

  // ====================== SEARCH ======================
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMessages(chatMessages);
      setMatchedIndexes([]);
      setCurrentMatchIndex(0);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const indexes = [];
    const filtered = chatMessages.filter((msg, index) => {
      const match = (msg.text || "").toLowerCase().includes(query);
      if (match) indexes.push(index);
      return match;
    });
    setFilteredMessages(filtered);
    setMatchedIndexes(indexes);
    setCurrentMatchIndex(0);
  }, [searchQuery, chatMessages]);

  useEffect(() => {
    if (matchedIndexes.length === 0) return;
    const el = document.querySelector(`[data-msg-index="${matchedIndexes[currentMatchIndex]}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentMatchIndex, matchedIndexes]);

  // ====================== HANDLERS ======================
  const uploadAndSendFile = useCallback(async (file, accompanyingText = "") => {
    if (!file || isUploading) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
      const result = await res.json();
      if (result.success && result.data?.imageUrl) {
        socketRef.current?.emit("sendMessage", {
          senderId: finalUserId, receiverId, redeemId,
          message: accompanyingText || result.data.imageUrl,
          senderType: "user", messageType: "image", managerId,
        });
      } else {
        alert("Failed to upload image. Please try again.");
      }
    } catch {
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
      setUploadedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [finalUserId, receiverId, redeemId, managerId, isUploading]);

  const handleSendMessage = useCallback(() => {
    if (isChatClosed || isUploading || (!messageInput.trim() && !uploadedFile)) return;
    if (uploadedFile) {
      uploadAndSendFile(uploadedFile, messageInput.trim());
    } else {
      socketRef.current?.emit("sendMessage", {
        senderId: finalUserId, receiverId, redeemId,
        message: messageInput.trim(),
        senderType: "user", messageType: "text", managerId,
      });
    }
    setMessageInput("");
  }, [messageInput, uploadedFile, isChatClosed, isUploading, finalUserId, receiverId, redeemId, managerId, uploadAndSendFile]);

  const handleFileUpload = useCallback((e) => {
    if (isUploading) return;
    const file = e.target.files?.[0];
    if (file) { setUploadedFile(file); setMessageInput(""); }
  }, [isUploading]);

  const triggerFileInput  = useCallback(() => { if (!isUploading) fileInputRef.current?.click(); }, [isUploading]);
  const removeUploadedFile = useCallback(() => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleInputChange = useCallback((e) => {
    if (isUploading || uploadedFile) { setMessageInput(""); return; }
    const value = e.target.value;
    setMessageInput(value);
    if (socketRef.current) {
      socketRef.current.emit("typing", { senderId: finalUserId, receiverId, redeemId });
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current?.emit("stopTyping", { senderId: finalUserId, receiverId, redeemId });
      }, 1800);
    }
  }, [finalUserId, receiverId, redeemId, isUploading, uploadedFile]);

  useEffect(() => () => { if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current); }, []);

  // ====================== RENDER ======================
  return (
    <div className="min-h-screen flex bg-[#F2F4F7] overflow-hidden">
      <div className={`${isDrawerOpen ? "block" : "hidden"} xl:block fixed xl:relative z-[70]`}>
        <SideBar isDrawer={isDrawerOpen} handleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} />
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden" onClick={() => setIsDrawerOpen(false)} />
      )}

      <div className="flex-1 flex flex-col xl:ml-[312px] w-full">
        <div className="xl:hidden fixed top-0 left-0 right-0 bg-[#691188] px-4 py-3 flex items-center justify-between z-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Menu size={18} className="text-[#691188]" />
            </button>
            <h1 className="text-base sm:text-lg font-semibold text-white truncate">Payment Request Chat</h1>
          </div>
          <img
            src={chatUser.avatar}
            className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 object-cover"
            alt={chatUser.name}
            onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
          />
        </div>

        <div className="h-[60px] xl:hidden" />

        <div className="flex-1 xl:mx-0 flex flex-col bg-[#F2F4F7] overflow-hidden relative">
          <div className="h-[60px] w-full hidden xl:block bg-[#F2F4F7]" />

          <div className="flex-1 flex flex-col lg:px-8 lg:mb-8 overflow-hidden">
            <div className="flex-1 flex flex-col bg-white lg:rounded-2xl lg:shadow-md lg:border lg:border-gray-200 overflow-hidden">

              <div className="flex-shrink-0">
                <ChatHeader
                  chatUser={chatUser}
                  isChatClosed={isChatClosed}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  formatLastSeen={formatLastSeen}
                  chatStatus={chatStatus}
                  totalMatches={matchedIndexes.length}
                  currentMatchIndex={currentMatchIndex}
                  onNext={() => setCurrentMatchIndex((prev) => prev < matchedIndexes.length - 1 ? prev + 1 : prev)}
                  onPrev={() => setCurrentMatchIndex((prev) => prev > 0 ? prev - 1 : prev)}
                  isTyping={isTyping}
                  isOnline={isOnline}
                />
              </div>

              <div
                ref={scrollContainerRef}
                id="chat-scroll"
                className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pt-4 pb-6 bg-[#FFFFFF] space-y-5"
              >
                <MessageList
                  filteredMessages={filteredMessages}
                  searchQuery={searchQuery}
                  formatMessageDate={formatMessageDate}
                  isLoading={isLoadingHistory}
                  showScrollToBottom={showScrollToBottom}
                  onScrollToBottom={scrollToBottom}
                />
                <div ref={messagesEndRef} />
              </div>

              {showScrollToBottom && (
                <button
                  onClick={scrollToBottom}
                  className="fixed bottom-[60px] md:bottom-[80px] right-6 sm:right-8 xl:right-12 z-[100]
                    bg-[#F4F4F4] hover:bg-[#c6c9c9] p-2 rounded-full
                    shadow-[0_8px_30px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)]
                    hover:shadow-[0_12px_45px_rgba(0,0,0,0.35),0_5px_15px_rgba(5,88,96,0.25)]
                    transition-all duration-300 ease-out
                    flex items-center justify-center border border-white/80 active:scale-95"
                  aria-label="Scroll to bottom"
                >
                  <ScrollToBottomIcon iconClassName="#9E9E9E" />
                </button>
              )}

              <div className="flex-shrink-0 border-t border-[#E0E0E0] bg-white z-20">
                <ChatInput
                  messageInput={messageInput}
                  onMessageChange={handleInputChange}
                  onSendMessage={handleSendMessage}
                  uploadedFile={uploadedFile}
                  onFileUpload={handleFileUpload}
                  onRemoveFile={removeUploadedFile}
                  isUploading={isUploading}
                  isChatClosed={isChatClosed}
                  triggerFileInput={triggerFileInput}
                  fileInputRef={fileInputRef}
                  chatStatus={chatStatus}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemoizedChat = React.memo(PaymentRequestChat);
export default MemoizedChat;