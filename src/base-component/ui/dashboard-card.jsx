// // // import arrowRightIcon from "../../assets/pngs/arrow-right-icon.png";

// // // export const DashboardCard = ({ points, title, icon, bgColor, link }) => {
// // //   const bottomBgColorMap = {
// // //     "#17A2B7": "bg-[#1392A4]",
// // //     "#F3B700": "bg-[#D9A403]",
// // //     "#0F9D58": "bg-[#048345]",
// // //     "#055860": "bg-[#034E55]",
// // //     "#F31A1A": "bg-[#D91616]",
// // //     "#9AA000": "bg-[#878C01]",
// // //   };

// // //   return (
// // //     <div className="h-full flex flex-col">
// // //       <div
// // //         className={`px-[15px] md:px-[25px] py-5 md:py-[30px] flex flex-col rounded-t-[10px] md:h-[180px]`}
// // //         style={{ backgroundColor: bgColor }}
// // //       >
// // //         <div className="flex items-start gap-x-[15px]">
// // //           <div className="bg-white rounded-full w-[56px] h-[56px] md:h-[70px] md:w-[70px] flex items-center justify-center">
// // //             {icon}
// // //           </div>
// // //           <div className="flex flex-col gap-y-2 flex-1">
// // //             <span className="text-[26px] md:text-[30px] font-bold text-white select-none">
// // //               {points}
// // //             </span>
// // //             <span className="text-base md:text-lg font-bold text-white line-clamp-2 overflow-hidden select-none">
// // //               {title}
// // //             </span>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div
// // //         className={`${
// // //           bottomBgColorMap[bgColor] || "bg-red-500"
// // //         } rounded-b-[10px]`}
// // //       >
// // //         <div className="flex items-center justify-center gap-x-1 py-[7px]">
// // //           <span className="text-base font-semibold text-white">More Info</span>
// // //           <img src={arrowRightIcon} alt="icon" className="h-[18px] w-[18px]" />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };




// // import { useNavigate } from "react-router-dom";
// // import arrowRightIcon from "../../assets/pngs/arrow-right-icon.png";

// // export const DashboardCard = ({ points, title, icon, bgColor, link }) => {
// //   const navigate = useNavigate();

// //   const bottomBgColorMap = {
// //     "#17A2B7": "bg-[#1392A4]",
// //     "#F3B700": "bg-[#D9A403]",
// //     "#0F9D58": "bg-[#048345]",
// //     "#055860": "bg-[#034E55]",
// //     "#F31A1A": "bg-[#D91616]",
// //     "#9AA000": "bg-[#878C01]",
// //   };

// //   const handleMoreInfo = () => {
// //     if (!link) {
// //       console.warn("⚠️ No link provided for:", title);
// //       return;
// //     }
// //     navigate(link);
// //   };

// //   return (
// //     <div className="h-full flex flex-col">
// //       <div
// //         className="px-[15px] md:px-[25px] py-5 md:py-[30px] flex flex-col rounded-t-[10px] md:h-[180px]"
// //         style={{ backgroundColor: bgColor }}
// //       >
// //         <div className="flex items-start gap-x-[15px]">
// //           <div className="bg-white rounded-full w-[56px] h-[56px] md:h-[70px] md:w-[70px] flex items-center justify-center">
// //             {icon}
// //           </div>
// //           <div className="flex flex-col gap-y-2 flex-1">
// //             <span className="text-[26px] md:text-[30px] font-bold text-white select-none">
// //               {points}
// //             </span>
// //             <span className="text-base md:text-lg font-bold text-white line-clamp-2 overflow-hidden select-none">
// //               {title}
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ✅ More Info Button with Click */}
// //       <div
// //         className={`${
// //           bottomBgColorMap[bgColor] || "bg-red-500"
// //         } rounded-b-[10px] cursor-pointer hover:opacity-90 transition-opacity duration-200`}
// //         onClick={handleMoreInfo}
// //       >
// //         <div className="flex items-center justify-center gap-x-1 py-[7px]">
// //           <span className="text-base font-semibold text-white">More Info</span>
// //           <img src={arrowRightIcon} alt="icon" className="h-[18px] w-[18px]" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };




// import { useNavigate } from "react-router-dom";
// import arrowRightIcon from "../../assets/pngs/arrow-right-icon.png";

// export const DashboardCard = ({ points, title, icon, bgColor, link }) => {
//   const navigate = useNavigate();

//   const bottomBgColorMap = {
//     "#17A2B7": "bg-[#1392A4]",
//     "#F3B700": "bg-[#D9A403]",
//     "#0F9D58": "bg-[#048345]",
//     "#055860": "bg-[#034E55]",
//     "#F31A1A": "bg-[#D91616]",
//     "#9AA000": "bg-[#878C01]",
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* Top colored section — flex-1 makes it fill all space when no More Info bar */}
//       <div
//         className={`px-[15px] md:px-[25px] py-5 md:py-[30px] flex flex-col flex-1 ${
//           link ? "rounded-t-[10px]" : "rounded-[10px]"
//         }`}
//         style={{ backgroundColor: bgColor }}
//       >
//         <div className="flex items-start gap-x-[15px]">
//           {/* <div className="bg-white rounded-full w-[56px] h-[56px] md:h-[70px] md:w-[70px] flex items-center justify-center">
//             {icon}
//           </div> */}
//           <div className="bg-white rounded-full w-[56px] h-[56px] md:h-[70px] md:w-[70px] flex items-center justify-center shrink-0">
//   {icon}
// </div>
//           <div className="flex flex-col gap-y-2 flex-1">
//             <span className="text-[26px] md:text-[30px] font-bold text-white select-none">
//               {points}
//             </span>
//             {/* <span className="text-base md:text-lg font-bold text-white line-clamp-2 overflow-hidden select-none">
//               {title}
//             </span> */}

//    <span className="text-base md:text-lg font-bold text-white truncate select-none ml-[-10px]">
//   {title}
// </span>
//           </div>
//         </div>
//       </div>

//       {/* More Info bar — only shown when link is provided */}
//       {link && (
//         <div
//           className={`${
//             bottomBgColorMap[bgColor] || "bg-red-500"
//           } rounded-b-[10px] cursor-pointer hover:opacity-90 transition-opacity duration-200`}
//           onClick={() => navigate(link)}
//         >
//           <div className="flex items-center justify-center gap-x-1 py-[7px]">
//             <span className="text-base font-semibold text-white">More Info</span>
//             <img src={arrowRightIcon} alt="icon" className="h-[18px] w-[18px]" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



// import { useNavigate } from "react-router-dom";
// import arrowRightIcon from "../../assets/pngs/arrow-right-icon.png";

// export const DashboardCard = ({ points, title, icon, bgColor, link }) => {
//   const navigate = useNavigate();

//   const bottomBgColorMap = {
//     "#17A2B7": "bg-[#1392A4]",
//     "#F3B700": "bg-[#D9A403]",
//     "#0F9D58": "bg-[#048345]",
//     "#055860": "bg-[#034E55]",
//     "#F31A1A": "bg-[#D91616]",
//     "#9AA000": "bg-[#878C01]",
//   };

//   return (
//     <div className="h-full flex flex-col">
//       <div
//         className={`px-[15px] md:px-[20px] py-5 md:py-[25px] flex flex-col flex-1 ${
//           link ? "rounded-t-[10px]" : "rounded-[10px]"
//         }`}
//         style={{ backgroundColor: bgColor }}
//       >
//         <div className="flex items-center gap-x-[12px]">
//           {/* Icon — shrink-0 keeps circle shape */}
//           <div className="bg-white rounded-full w-[50px] h-[50px] md:h-[60px] md:w-[60px] flex items-center justify-center shrink-0">
//             {icon}
//           </div>

//           {/* Points + Title */}
//           <div className="flex flex-col min-w-0">
//             <span className="text-[22px] md:text-[26px] font-bold text-white leading-tight select-none">
//               {points}
//             </span>
//             {/* <span className="text-xs md:text-sm font-bold text-white leading-snug select-none break-words">
//               {title}
//             </span> */}
//    <span className="font-bold text-white select-none whitespace-nowrap" style={{ fontFamily: "DM Sans", fontSize: "14px", lineHeight: "100%", letterSpacing: "0%" }}>
//   {title}
// </span> 
//           </div>
//         </div>
//       </div>

//       {link && (
//         <div
//           className={`${
//             bottomBgColorMap[bgColor] || "bg-red-500"
//           } rounded-b-[10px] cursor-pointer hover:opacity-90 transition-opacity duration-200`}
//           onClick={() => navigate(link)}
//         >
//           <div className="flex items-center justify-center gap-x-1 py-[7px]">
//             <span className="text-base font-semibold text-white">More Info</span>
//             <img src={arrowRightIcon} alt="icon" className="h-[18px] w-[18px]" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


/////




import { useNavigate } from "react-router-dom";
import arrowRightIcon from "../../assets/pngs/arrow-right-icon.png";

export const DashboardCard = ({ points, title, icon, bgColor, link }) => {
  const navigate = useNavigate();

  const bottomBgColorMap = {
    "#17A2B7": "bg-[#1392A4]",
    "#F3B700": "bg-[#D9A403]",
    "#0F9D58": "bg-[#048345]",
    "#055860": "bg-[#034E55]",
    "#F31A1A": "bg-[#D91616]",
    "#9AA000": "bg-[#878C01]",
  };

  return (
    <div className="h-full flex flex-col">
      <div
        className={`px-[12px] md:px-[20px] py-5 md:py-[25px] flex flex-col flex-1 ${
          link ? "rounded-t-[10px]" : "rounded-[10px]"
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex items-center gap-x-[8px] md:gap-x-[12px]">

          {/* Icon — slightly smaller on mobile */}
          <div className="bg-white rounded-full w-[42px] h-[42px] md:h-[60px] md:w-[60px] flex items-center justify-center shrink-0">
            {icon}
          </div>

          {/* Points + Title */}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[20px] md:text-[26px] font-bold text-white leading-tight select-none">
              {points}
            </span>
            <span
              className="font-bold text-white select-none"
              style={{
                fontFamily: "DM Sans",
                fontSize: "clamp(9.5px, 2.8vw, 14px)",
                lineHeight: "1.3",
                whiteSpace: "nowrap",
                overflow: "visible",
              }}
            >
              {title}
            </span>
          </div>

        </div>
      </div>

      {link && (
        <div
          className={`${
            bottomBgColorMap[bgColor] || "bg-red-500"
          } rounded-b-[10px] cursor-pointer hover:opacity-90 transition-opacity duration-200`}
          onClick={() => navigate(link)}
        >
          <div className="flex items-center justify-center gap-x-1 py-[7px]">
            <span className="text-base font-semibold text-white">More Info</span>
            <img src={arrowRightIcon} alt="icon" className="h-[18px] w-[18px]" />
          </div>
        </div>
      )}
    </div>
  );
};