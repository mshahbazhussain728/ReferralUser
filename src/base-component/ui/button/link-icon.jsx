// import { useState } from "react";
// import { combineClasses } from "../../../utils/utility";

// export const LinkButton = ({
//   text,
//   onClick,
//   icon: Icon,
//   containerClassName,
//   size,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const containerClasses = combineClasses(
//     "py-2 px-4 bg-primary rounded-[4px] text-white text-xs font-semibold hover:bg-white border border-primary hover:text-primary transition-all w-fit h-fit flex items-center gap-x-[5px] md:gap-x-2 whitespace-nowrap",
//     containerClassName
//   );

//   return (
//     <button
//       onClick={onClick}
//       className={containerClasses}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {Icon && (
//         <div className="hidden md:block">
//           <Icon iconClassName={isHovered ? "#691188" : "#fff"} size={size} />
//         </div>
//       )}
//       {text}
//     </button>
//   );
// };




// import { useState } from "react";
// import { combineClasses } from "../../../utils/utility";

// export const LinkButton = ({
//   text,
//   onClick,
//   icon: Icon,
//   containerClassName,
//   size,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const containerClasses = combineClasses(
//     "py-2 px-4 bg-primary rounded-[4px] text-white text-xs font-semibold hover:bg-white border border-primary hover:text-primary transition-all w-fit h-fit flex items-center gap-x-[5px] md:gap-x-2 whitespace-nowrap",
//     containerClassName
//   );

//   return (
//     <button
//       onClick={onClick}
//       className={containerClasses}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {Icon && (
//         <Icon iconClassName={isHovered ? "#691188" : "#fff"} size={size} />
//       )}
//       {text}
//     </button>
//   );
// };



import { useState } from "react";
import { combineClasses } from "../../../utils/utility";

export const LinkButton = ({
  text,
  onClick,
  icon: Icon,
  containerClassName,
  size,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerClasses = combineClasses(
    "py-2 px-4 bg-primary rounded-[4px] text-white text-xs font-semibold hover:bg-white border border-primary hover:text-primary transition-all w-fit h-fit flex items-center gap-x-[5px] md:gap-x-2 whitespace-nowrap",
    containerClassName
  );

  return (
    <button
      onClick={onClick}
      className={containerClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
      }}
    >
      {Icon && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon iconClassName={isHovered ? "#691188" : "#fff"} size={size} />
        </span>
      )}
      <span style={{ display: "inline-block", lineHeight: "1" }}>{text}</span>
    </button>
  );
};