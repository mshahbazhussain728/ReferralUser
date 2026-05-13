// import { LinkButton } from "./button/link-icon";

// export const PointCard = ({ linkText, text, points, onClick }) => {
//   return (
//     <div className="p-[15px] rounded-[12px] bg-white shadow-md flex items-center justify-between">
//       <div className="flex flex-col gap-y-[10px]">
//         <span className="text-sm font-semibold">{text}</span>
//         <div className="flex items-center gap-x-1">
//           <span className="text-xs font-medium text-[#848484]">Points:</span>
//           <span className="text-xs font-medium text-primary">{points}</span>
//         </div>
//       </div>
//       <LinkButton text={linkText} onClick={onClick} />
//     </div>
//   );
// };





import { LinkButton } from "./button/link-icon";

export const PointCard = ({ linkText, text, points, onClick }) => {
  return (
    <div className="p-[15px] rounded-[12px] bg-white shadow-md flex items-center justify-between">
      <div className="flex flex-col gap-y-[10px]">
        <span className="text-sm font-semibold">{text}</span>
        <div className="flex items-center gap-x-1">
          <span className="text-xs font-medium text-[#848484]">Points:</span>
          <span className="text-xs font-medium text-primary">{points}</span>
        </div>
      </div>
      {linkText && <LinkButton text={linkText} onClick={onClick} />}
    </div>
  );
};