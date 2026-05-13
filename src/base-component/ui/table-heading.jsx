// import { SortIcon } from "../../assets/svgs/components/sort-icon";

// export const TableHeading = ({
//   title,
//   value,
//   isFirst,
//   isAligned,
//   handleSort,
//   currentSort,
//   isRedeem,
// }) => {
//   const isClickable = title !== "Status" || (isRedeem && title === "Status");

//   const handleSortClicked = () => {
//     if (isClickable && handleSort) {
//       handleSort(value);
//     }
//   };

//   return (
//     <div
//       className={`flex items-start gap-x-1.5 ${
//         isAligned ? (isFirst ? "justify-start" : "justify-center") : ""
//       }`}
//     >
//       <span
//         onClick={handleSortClicked}
//         className={` ${
//           isClickable ? "cursor-pointer" : "cursor-default"
//         } text-base font-medium ${
//           currentSort === value ? "text-primary" : "text-gray-500"
//         }`}
//       >
//         {title}
//       </span>
//       <SortIcon />
//     </div>
//   );
// };





// import { SortIcon } from "../../assets/svgs/components/sort-icon";

// export const TableHeading = ({
//   title,
//   value,
//   isFirst,
//   isAligned,
//   handleSort,
//   currentSort,
//   isRedeem,

// }) => {
//   const handleSortClicked = () => {
//     if (handleSort) {
//       handleSort(value);
//     }
//   };

//   return (
//     <div
//       className={`flex items-start gap-x-1.5 ${
//         isAligned ? (isFirst ? "justify-start" : "justify-center") : ""
//       }`}
//     >
//       <span
//         onClick={handleSortClicked}
//         className={`cursor-pointer text-base font-medium ${
//           currentSort === value ? "text-primary" : "text-gray-500"
//         }`}
//       >
//         {title}
//       </span>
//       <SortIcon />
//     </div>
//   );
// };




////////




import { SortIcon } from "../../assets/svgs/components/sort-icon";

export const TableHeading = ({
  title,
  value,
  isFirst,
  isAligned,
  handleSort,
  currentSort,
  isRedeem,

}) => {
  const handleSortClicked = () => {
    if (handleSort) {
      handleSort(value);
    }
  };

  return (
    <div
      className={`flex items-start gap-x-1.5 ${
        isAligned ? (isFirst ? "justify-start" : "justify-center") : ""
      }`}
    >
      <span
        onClick={handleSortClicked}
        className={`cursor-pointer text-base font-medium ${
          currentSort === value ? "text-primary" : "text-gray-500"
        }`}
      >
        {title}
      </span>
      <SortIcon />
    </div>
  );
};