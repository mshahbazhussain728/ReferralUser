// import { TableHeading } from "../../../base-component/ui/table-heading";

// export const CouponHistoryTableHeadings = ({
//   headings,
//   handleSort,
//   sortValue,
//   isRedeem,
// }) => {
//   return (
//     <div className="py-2.5 px-10  grid grid-cols-[minmax(170px,_3fr)_minmax(170px,_3fr)_minmax(170px,_3fr)_minmax(170px,_170px)] items-center mb-3">
//       {headings?.map((heading, index) => (
//         <TableHeading
//           key={heading.value}
//           title={heading.label}
//           value={heading.value}
//           isFirst={index === 0}
//           isAligned={true}
//           handleSort={handleSort}
//           currentSort={sortValue}
//           isRedeem={isRedeem}
//         />
//       ))}
//     </div>
//   );
// };




import { TableHeading } from "../../../base-component/ui/table-heading";

export const CouponHistoryTableHeadings = ({
  headings,
  handleSort,
  sortValue,
  isRedeem,
}) => {
  return (
    <div className="py-2.5 px-10 grid grid-cols-[minmax(120px,_2fr)_minmax(150px,_3fr)_minmax(150px,_3fr)_minmax(150px,_3fr)_minmax(100px,_1fr)_minmax(120px,_2fr)] items-center mb-3">
      {headings?.map((heading, index) => (
        <TableHeading
          key={heading.value}
          title={heading.label}
          value={heading.value}
          isFirst={index === 0}
          isAligned={true}
          handleSort={handleSort}
          currentSort={sortValue}
          isRedeem={isRedeem}
        />
      ))}
    </div>
  );
};