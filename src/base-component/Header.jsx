

// import { HambugerIcon } from "../assets/svgs/components/hamburger-icon";

// const isPrivateRelayEmail = (email) =>
//   email && email.includes("privaterelay.appleid.com");

// const isRealName = (name) =>
//   name &&
//   name !== "User" &&
//   name !== "Apple User" &&
//   name.trim().length > 0 &&
//   /^[a-zA-Z\s.'-]+$/.test(name.trim());

// const getNameFromEmail = (email) => {
//   if (!email || isPrivateRelayEmail(email)) return null;
//   const prefix  = email.split("@")[0];
//   const letters = prefix.replace(/[^a-zA-Z]/g, " ").trim();
//   const first   = letters.split(/\s+/)[0];
//   if (!first) return null;
//   return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
// };

// const getDisplayName = (name, email) => {
//   // 1. Use real name if valid
//   if (isRealName(name)) {
//     const first = name.trim().split(/\s+/)[0];
//     return first.charAt(0).toUpperCase() + first.slice(1);
//   }
//   // 2. Try email prefix (only if not private relay)
//   const fromEmail = getNameFromEmail(email);
//   if (fromEmail) return fromEmail;
//   // 3. Fallback
//   return "User";
// };

// const getInitial = (displayName) => {
//   if (!displayName || displayName === "User") return "?";
//   return displayName.charAt(0).toUpperCase();
// };

// const isValidImage = (url) =>
//   url &&
//   typeof url === "string" &&
//   url.trim() !== "" &&
//   url.trim() !== "null" &&
//   url.trim() !== "undefined";

// export const Header = ({
//   handleDrawer,
//   pageTitle,
//   profile,
//   name,
//   email,
//   isSidebarOpen,
// }) => {
//   const displayName   = getDisplayName(name, email);
//   const initial       = getInitial(displayName);
//   const hasValidImage = isValidImage(profile);

//   return (
//     <div
//       className={`${
//         isSidebarOpen && "ml-[312px]"
//       } flex items-center justify-between mb-[33px] px-[30px] pt-[31px]`}
//     >
//       {/* Left Side */}
//       <div className="flex items-center gap-x-5 maxSize:gap-x-0">
//         <HambugerIcon onClick={handleDrawer} />
//         <span className="text-[40px] font-bold">{pageTitle}</span>
//       </div>

//       {/* Right Side */}
//       <div className="flex items-center gap-x-4">

//         {hasValidImage ? (
//           <>
//             <img
//               src={profile.trim()}
//               alt="profile"
//               className="h-[58px] w-[58px] rounded-full object-cover"
//               referrerPolicy="no-referrer"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.style.display = "none";
//                 e.target.nextSibling.style.display = "flex";
//               }}
//             />
//             <div
//               className="h-[58px] w-[58px] rounded-full bg-[#237D93] items-center justify-center text-white text-[22px] font-bold flex-shrink-0"
//               style={{ display: "none" }}
//             >
//               {initial}
//             </div>
//           </>
//         ) : (
//           <div className="h-[58px] w-[58px] rounded-full bg-[#237D93] flex items-center justify-center text-white text-[22px] font-bold flex-shrink-0">
//             {initial}
//           </div>
//         )}

//         <span className="text-[22px] font-semibold">
//           {displayName}
//         </span>

//       </div>
//     </div>
//   );
// };





import { HambugerIcon } from "../assets/svgs/components/hamburger-icon";

const isRealName = (name) =>
  name &&
  name !== "User" &&
  name !== "Apple User" &&
  name.trim().length > 0 &&
  /^[a-zA-Z\s.'-]+$/.test(name.trim());

const getDisplayName = (name, email) => {
  // 1. Use real name if valid
  if (isRealName(name)) {
    const first = name.trim().split(/\s+/)[0];
    return first.charAt(0).toUpperCase() + first.slice(1);
  }

  // 2. Check email prefix for a usable name
  if (email && email.includes("@")) {
    const prefix = email.split("@")[0];
    const words = prefix
      .split(/[^a-zA-Z]+/)
      .filter((w) => w.length >= 4);
    if (words.length > 0) {
      const first = words[0];
      return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
    }
    // No name-like words → show full prefix as-is
    return prefix;
  }

  // 3. Fallback
  return "User";
};

const getInitial = (name, email) => {
  if (isRealName(name)) return name.trim().charAt(0).toUpperCase();
  if (email && email.trim().length > 0) return email.trim().charAt(0).toUpperCase();
  return "?";
};

const isValidImage = (url) =>
  url &&
  typeof url === "string" &&
  url.trim() !== "" &&
  url.trim() !== "null" &&
  url.trim() !== "undefined";

export const Header = ({
  handleDrawer,
  pageTitle,
  profile,
  name,
  email,
  isSidebarOpen,
}) => {
  const displayName   = getDisplayName(name, email);
  const initial       = getInitial(name, email);
  const hasValidImage = isValidImage(profile);

  return (
    <div
      className={`${
        isSidebarOpen && "ml-[312px]"
      } flex items-center justify-between mb-[33px] px-[30px] pt-[31px]`}
    >
      {/* Left Side */}
      <div className="flex items-center gap-x-5 maxSize:gap-x-0">
        <HambugerIcon onClick={handleDrawer} />
        <span className="text-[40px] font-bold">{pageTitle}</span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-x-4">
        {hasValidImage ? (
          <>
            <img
              src={profile.trim()}
              alt="profile"
              className="h-[58px] w-[58px] rounded-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="h-[58px] w-[58px] rounded-full bg-[#237D93] items-center justify-center text-white text-[22px] font-bold flex-shrink-0"
              style={{ display: "none" }}
            >
              {initial}
            </div>
          </>
        ) : (
          <div className="h-[58px] w-[58px] rounded-full bg-[#237D93] flex items-center justify-center text-white text-[22px] font-bold flex-shrink-0">
            {initial}
          </div>
        )}

        <span className="text-[22px] font-semibold">
          {displayName}
        </span>
      </div>
    </div>
  );
};