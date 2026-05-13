



// import { useEffect, useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import { Header } from "../base-component/Header";
// import { SideBar } from "../base-component/Sidebar";
// import { MobileHeader } from "../base-component/mobile-header";
// import { useLocation } from "react-router-dom";
// import { getPageTitles } from "../utils/function";
// import { useSelector } from "react-redux";
// import { sideBar } from "../utils/static";
// import Cookies from "js-cookie";

// const resolveImage = (userObj) => {
//   if (!userObj) return null;
//   const url =
//     userObj.imageUrl ||
//     userObj.image ||
//     userObj.picture ||
//     userObj.avatar ||
//     userObj.profilePic ||
//     userObj.profile_picture ||
//     "";
//   if (
//     url &&
//     typeof url === "string" &&
//     url.trim() !== "" &&
//     url.trim() !== "null" &&
//     url.trim() !== "undefined"
//   ) {
//     return url.trim();
//   }
//   return null;
// };

// const getUserFromCookie = () => {
//   try {
//     const stored = Cookies.get("referralUser");
//     if (stored) return JSON.parse(stored);
//   } catch (e) {}
//   return null;
// };

// const getUserFromLocalStorage = () => {
//   try {
//     const stored = localStorage.getItem("user");
//     if (stored) return JSON.parse(stored);
//   } catch (e) {}
//   return null;
// };

// const getMobileTitle = (pathname, search) => {
//   const urlStatus = new URLSearchParams(search).get("status");
//   for (const item of sideBar) {
//     if (item.inner) {
//       for (const child of item.inner) {
//         if (child.pathname === pathname && child.query === urlStatus) {
//           return child.title;
//         }
//       }
//     } else {
//       if (item.pathname && pathname.startsWith(item.pathname)) {
//         return item.title;
//       }
//     }
//   }
//   return "";
// };

// export const Layout = ({ children }) => {
//   const location = useLocation();
//   const { user } = useSelector((state) => state.auth);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isDrawer, setIsDrawer]           = useState(false);
//   const [isAboveMlg, setIsAboveMlg]       = useState(
//     window.matchMedia("(min-width:1280px)").matches
//   );
//   const [openTitle, setOpenTitle] = useState("");

//   useEffect(() => {
//     const urlStatus = new URLSearchParams(location.search).get("status");
//     const matched = sideBar.find(
//       (item) =>
//         (!item.inner && item.pathname && location.pathname.startsWith(item.pathname)) ||
//         item.inner?.some(
//           (it) =>
//             it.pathname &&
//             location.pathname.startsWith(it.pathname) &&
//             (!it.query || urlStatus === it.query)
//         )
//     );
//     if (matched) setOpenTitle(matched.title);
//   }, [location.pathname, location.search]);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(min-width:1280px)");
//     const handleMediaChange = (event) => setIsAboveMlg(event.matches);
//     mediaQuery.addEventListener("change", handleMediaChange);
//     return () => mediaQuery.removeEventListener("change", handleMediaChange);
//   }, []);

//   useEffect(() => {
//     if (!isAboveMlg) {
//       setIsSidebarOpen(false);
//       setIsDrawer(false);
//     } else {
//       setIsSidebarOpen(true);
//     }
//   }, [isAboveMlg]);

//   const handleToggle = (item) => {
//     if (!item.inner) {
//       setOpenTitle(item.title);
//       return;
//     }
//     setOpenTitle((prev) => (prev === item.title ? "" : item.title));
//   };

//   const handleDrawer = () => setIsDrawer((prev) => !prev);
//   const handleClose  = (e) => { e.stopPropagation(); setIsDrawer(false); };
//   const closeDrawer  = () => setIsDrawer(false);

//   const flatUser = useMemo(() => {
//     if (!user) return null;
//     return user?.user && typeof user.user === "object" ? user.user : user;
//   }, [user]);

//   const currentUser = useMemo(() => {
//     const localUser  = getUserFromLocalStorage();
//     const cookieUser = getUserFromCookie();

//     const merged = {
//       ...cookieUser,
//       ...localUser,
//       ...flatUser,
//     };

//     const imageUrl =
//       flatUser?.imageUrl   || flatUser?.image   || flatUser?.picture   || flatUser?.avatar ||
//       localUser?.imageUrl  || localUser?.image  || localUser?.picture  || localUser?.avatar ||
//       cookieUser?.imageUrl || cookieUser?.image || cookieUser?.picture || cookieUser?.avatar ||
//       null;

//     const name =
//       merged?.name && merged.name !== "Apple User" && merged.name.trim() !== ""
//         ? merged.name.trim()
//         : "";

//     return { ...merged, name, imageUrl };
//   }, [flatUser]);

//   const profileImage = useMemo(() => resolveImage(currentUser), [currentUser]);
//   const userName     = useMemo(() => currentUser?.name  || "", [currentUser]);
//   const userEmail    = useMemo(() => currentUser?.email || "", [currentUser]);

//   const { pageTitle }   = getPageTitles(location);
//   const mobilePageTitle = getMobileTitle(location.pathname, location.search);

//   return (
//     <div className="bg-[#fafbfd] min-h-screen h-full overflow-y-auto relative">

//       <div
//         className={`fixed top-0 left-0 h-full hidden maxSize:block ${
//           isSidebarOpen && isAboveMlg ? "block" : "hidden"
//         }`}
//       >
//         <SideBar
//           isDrawer={false}
//           handleDrawer={handleDrawer}
//           openTitle={openTitle}
//           onToggle={handleToggle}
//         />
//       </div>

//       <div className="hidden md:block">
//         <Header
//           handleDrawer={handleDrawer}
//           pageTitle={pageTitle}
//           profile={profileImage}
//           name={userName}
//           email={userEmail}
//           isSidebarOpen={isSidebarOpen}
//         />
//       </div>

//       <div className="md:hidden">
//         <MobileHeader
//           handleDrawer={handleDrawer}
//           pageTitle={mobilePageTitle}
//           profile={profileImage}
//           name={userName}
//           email={userEmail}
//         />
//       </div>

//       {isDrawer && (
//         <div
//           className="fixed top-0 z-[999] w-screen h-screen bg-[#1E1E1E] bg-opacity-40"
//           onClick={handleClose}
//         >
//           <motion.div
//             initial={{ x: "-100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "-100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="w-[312px] h-full bg-white"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <SideBar
//               isDrawer={true}
//               handleDrawer={closeDrawer}
//               openTitle={openTitle}
//               onToggle={handleToggle}
//             />
//           </motion.div>
//         </div>
//       )}

//       <div
//         className={`px-[18px] md:px-[30px] ${
//           isSidebarOpen && isAboveMlg ? "ml-[312px]" : "ml-0"
//         }`}
//       >
//         {children}
//       </div>

//     </div>
//   );
// };


/////


import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "../base-component/Header";
import { SideBar } from "../base-component/Sidebar";
import { MobileHeader } from "../base-component/mobile-header";
import { useLocation } from "react-router-dom";
import { getPageTitles } from "../utils/function";
import { useSelector } from "react-redux";
import { sideBar } from "../utils/static";
import Cookies from "js-cookie";

const resolveImage = (userObj) => {
  if (!userObj) return null;
  const url =
    userObj.imageUrl ||
    userObj.image    ||
    userObj.picture  ||
    userObj.avatar   ||
    userObj.profilePic ||
    userObj.profile_picture ||
    "";
  if (
    url &&
    typeof url === "string" &&
    url.trim() !== ""        &&
    url.trim() !== "null"    &&
    url.trim() !== "undefined"
  ) {
    return url.trim();
  }
  return null;
};

const getUserFromCookie = () => {
  try {
    const stored = Cookies.get("referralUser");
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return null;
};

const getUserFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem("user");
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return null;
};

const getMobileTitle = (pathname, search) => {
  const urlStatus = new URLSearchParams(search).get("status");
  for (const item of sideBar) {
    if (item.inner) {
      for (const child of item.inner) {
        if (child.pathname === pathname && child.query === urlStatus) {
          return child.title;
        }
      }
    } else {
      if (item.pathname && pathname.startsWith(item.pathname)) {
        return item.title;
      }
    }
  }
  return "";
};

export const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawer,      setIsDrawer]      = useState(false);
  const [isAboveMlg,    setIsAboveMlg]    = useState(
    window.matchMedia("(min-width:1280px)").matches
  );
  const [openTitle, setOpenTitle] = useState("");

  useEffect(() => {
    const urlStatus = new URLSearchParams(location.search).get("status");
    const matched = sideBar.find(
      (item) =>
        (!item.inner && item.pathname && location.pathname.startsWith(item.pathname)) ||
        item.inner?.some(
          (it) =>
            it.pathname &&
            location.pathname.startsWith(it.pathname) &&
            (!it.query || urlStatus === it.query)
        )
    );
    if (matched) setOpenTitle(matched.title);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width:1280px)");
    const handleMediaChange = (event) => setIsAboveMlg(event.matches);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isAboveMlg) {
      setIsSidebarOpen(false);
      setIsDrawer(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isAboveMlg]);

  const handleToggle = (item) => {
    if (!item.inner) {
      setOpenTitle(item.title);
      return;
    }
    setOpenTitle((prev) => (prev === item.title ? "" : item.title));
  };

  const handleDrawer = () => setIsDrawer((prev) => !prev);
  const handleClose  = (e) => { e.stopPropagation(); setIsDrawer(false); };
  const closeDrawer  = () => setIsDrawer(false);

  const flatUser = useMemo(() => {
    if (!user) return null;
    return user?.user && typeof user.user === "object" ? user.user : user;
  }, [user]);

  // ✅ FIXED — Redux (flatUser) always takes priority for instant update
  const currentUser = useMemo(() => {
    const localUser  = getUserFromLocalStorage();
    const cookieUser = getUserFromCookie();

    // ✅ Priority order: Redux → localStorage → Cookie
    const imageUrl =
      flatUser?.imageUrl   || flatUser?.image   || flatUser?.picture  || flatUser?.avatar  ||
      localUser?.imageUrl  || localUser?.image  || localUser?.picture || localUser?.avatar ||
      cookieUser?.imageUrl || cookieUser?.image || cookieUser?.picture|| cookieUser?.avatar||
      null;

    // ✅ Priority order for name: Redux → localStorage → Cookie
    const name =
      flatUser?.name && flatUser.name !== "Apple User" && flatUser.name.trim() !== ""
        ? flatUser.name.trim()
        : localUser?.name && localUser.name !== "Apple User" && localUser.name.trim() !== ""
        ? localUser.name.trim()
        : cookieUser?.name && cookieUser.name !== "Apple User" && cookieUser.name.trim() !== ""
        ? cookieUser.name.trim()
        : "";

    return {
      ...cookieUser,
      ...localUser,
      ...flatUser,   // ✅ Redux always wins on conflicts
      name,
      imageUrl,
    };
  }, [flatUser]); // ✅ Only depends on flatUser — Redux updates trigger instantly

  // ✅ Preload image as soon as URL is available — no delay
  useEffect(() => {
    const url = currentUser?.imageUrl;
    if (!url) return;
    const img    = new Image();
    img.src      = url;
  }, [currentUser?.imageUrl]);

  const profileImage = useMemo(() => resolveImage(currentUser), [currentUser]);
  const userName     = useMemo(() => currentUser?.name  || "", [currentUser]);
  const userEmail    = useMemo(() => currentUser?.email || "", [currentUser]);

  const { pageTitle }   = getPageTitles(location);
  const mobilePageTitle = getMobileTitle(location.pathname, location.search);

  return (
    <div className="bg-[#fafbfd] min-h-screen h-full overflow-y-auto relative">

      <div
        className={`fixed top-0 left-0 h-full hidden maxSize:block ${
          isSidebarOpen && isAboveMlg ? "block" : "hidden"
        }`}
      >
        <SideBar
          isDrawer={false}
          handleDrawer={handleDrawer}
          openTitle={openTitle}
          onToggle={handleToggle}
        />
      </div>

      <div className="hidden md:block">
        <Header
          handleDrawer={handleDrawer}
          pageTitle={pageTitle}
          profile={profileImage}
          name={userName}
          email={userEmail}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      <div className="md:hidden">
        <MobileHeader
          handleDrawer={handleDrawer}
          pageTitle={mobilePageTitle}
          profile={profileImage}
          name={userName}
          email={userEmail}
        />
      </div>

      {isDrawer && (
        <div
          className="fixed top-0 z-[999] w-screen h-screen bg-[#1E1E1E] bg-opacity-40"
          onClick={handleClose}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[312px] h-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <SideBar
              isDrawer={true}
              handleDrawer={closeDrawer}
              openTitle={openTitle}
              onToggle={handleToggle}
            />
          </motion.div>
        </div>
      )}

      <div
        className={`px-[18px] md:px-[30px] ${
          isSidebarOpen && isAboveMlg ? "ml-[312px]" : "ml-0"
        }`}
      >
        {children}
      </div>

    </div>
  );
};