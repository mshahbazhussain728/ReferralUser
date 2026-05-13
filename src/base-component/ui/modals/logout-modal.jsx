// // import React from "react";
// // import { BaseModal } from "./base-modal";
// // import { useDispatch } from "react-redux";
// // import { logout } from "../../../utils/auth";
// // import { useNavigate } from "react-router-dom";
// // import { BaseButton } from "../button/base-button";
// // import logoutIcon from "../../../assets/svgs/logout.svg";
// // import { logoutUser } from "../../../api/slices/authSlice/auth";

// // export const LogoutModal = ({ onClose }) => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const handleLogout = async () => {
// //     await dispatch(logoutUser());
// //     logout();
// //     onClose();
// //     navigate("/");
// //   };

// //   return (
// //     <BaseModal
// //       onClose={onClose}
// //       containerClassName="w-full max-w-[341px] md:max-w-[689px] min-h-fit"
// //     >
// //       <div className="p-6 md:px-[111px] md:py-[75px] flex flex-col items-center">
// //         <div className="bg-[#ebebeb] p-[15px] md:p-[25px] rounded-[20px] md:rounded-[31px]">
// //           <img src={logoutIcon} alt="icon" />
// //         </div>
// //         <p className="text-xl md:text-[36px] font-semibold mt-[21px] mb-[18px]">
// //           Logout Account
// //         </p>
// //         <p className="text-[14px] md:text-[26px] font-medium text-[#525451] text-center mb-[50px]">
// //           Are you absolutely certain you wish to proceed with logging out?
// //         </p>

// //         <BaseButton
// //           text="Yes, Logout"
// //           onClick={handleLogout}
// //           containerClassName="px-5 md:py-[18px] md:px-[66px] text-[16px] md:text-[26px] font-extrabold rounded-[10px] text-white"
// //         />
// //       </div>
// //     </BaseModal>
// //   );
// // };




// import React, { useState } from "react";
// import { BaseModal } from "./base-modal";
// import { useDispatch } from "react-redux";
// import { logout } from "../../../utils/auth";
// import { useNavigate } from "react-router-dom";
// import { BaseButton } from "../button/base-button";
// import logoutIcon from "../../../assets/svgs/logout.svg";
// import { logoutUser } from "../../../api/slices/authSlice/auth";

// export const LogoutModal = ({ onClose }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loggedOut, setLoggedOut] = useState(false);

//   const handleLogout = async () => {
//     await dispatch(logoutUser());
//     logout();
//     setLoggedOut(true);

//     // ✅ Show success message for 1.5 seconds then navigate
//     setTimeout(() => {
//       onClose();
//       navigate("/");
//     }, 1500);
//   };

//   return (
//     <BaseModal
//       onClose={onClose}
//       containerClassName="w-full max-w-[341px] md:max-w-[689px] min-h-fit"
//     >
//       <div className="p-6 md:px-[111px] md:py-[75px] flex flex-col items-center">

//         {loggedOut ? (
//           // ✅ Success message shown after logout
//           <div className="flex flex-col items-center gap-4 py-6">
//             <div className="w-[60px] h-[60px] rounded-full bg-[#d9f3e1] flex items-center justify-center">
//               <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M5 13l4 4L19 7"
//                   stroke="#05B035"
//                   strokeWidth="2.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//             <p className="text-xl md:text-[28px] font-semibold text-[#05B035]">
//               Logged out successfully
//             </p>
//           </div>
//         ) : (
//           // ✅ Default logout confirmation
//           <>
//             <div className="bg-[#ebebeb] p-[15px] md:p-[25px] rounded-[20px] md:rounded-[31px]">
//               <img src={logoutIcon} alt="icon" />
//             </div>
//             <p className="text-xl md:text-[36px] font-semibold mt-[21px] mb-[18px]">
//               Logout Account
//             </p>
//             <p className="text-[14px] md:text-[26px] font-medium text-[#525451] text-center mb-[50px]">
//               Are you absolutely certain you wish to proceed with logging out?
//             </p>

//             <BaseButton
//               text="Yes, Logout"
//               onClick={handleLogout}
//               containerClassName="px-5 md:py-[18px] md:px-[66px] text-[16px] md:text-[26px] font-extrabold rounded-[10px] text-white"
//             />
//           </>
//         )}

//       </div>
//     </BaseModal>
//   );
// };


/////


import React, { useState } from "react";
import { BaseModal } from "./base-modal";
import { useDispatch } from "react-redux";
import { logout } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../button/base-button";
import logoutIcon from "../../../assets/svgs/logout.svg";
import { logoutUser } from "../../../api/slices/authSlice/auth";

export const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedOut, setLoggedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ← ADDED

  const handleLogout = async () => {
    if (isLoading || loggedOut) return; // ← ADDED: prevent multiple clicks
    setIsLoading(true); // ← ADDED

    try {
      await dispatch(logoutUser());
      logout();
      setLoggedOut(true);

      setTimeout(() => {
        onClose();
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Logout error:", err);
      setIsLoading(false); // ← ADDED: re-enable only if logout fails
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="w-full max-w-[341px] md:max-w-[689px] min-h-fit"
    >
      <div className="p-6 md:px-[111px] md:py-[75px] flex flex-col items-center">

        {loggedOut ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-[60px] h-[60px] rounded-full bg-[#d9f3e1] flex items-center justify-center">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#05B035"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-xl md:text-[28px] font-semibold text-[#05B035]">
              Logged out successfully
            </p>
          </div>
        ) : (
          <>
            <div className="bg-[#ebebeb] p-[15px] md:p-[25px] rounded-[20px] md:rounded-[31px]">
              <img src={logoutIcon} alt="icon" />
            </div>
            <p className="text-xl md:text-[36px] font-semibold mt-[21px] mb-[18px]">
              Logout Account
            </p>
            <p className="text-[14px] md:text-[26px] font-medium text-[#525451] text-center mb-[50px]">
              Are you absolutely certain you wish to proceed with logging out?
            </p>

            <BaseButton
              text={isLoading ? "Logging out..." : "Yes, Logout"} // ← CHANGED
              onClick={handleLogout}
              disabled={isLoading}                                  // ← ADDED
              containerClassName="px-5 md:py-[18px] md:px-[66px] text-[16px] md:text-[26px] font-extrabold rounded-[10px] text-white"
            />
          </>
        )}

      </div>
    </BaseModal>
  );
};