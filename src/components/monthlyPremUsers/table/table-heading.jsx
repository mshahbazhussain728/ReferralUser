






// import { TableHeading } from "../../../base-component/ui/table-heading";

// export const MonthlyPremUserTableHeadings = ({ headings, handleSort, sortValue }) => {
//   return (
//     <div className="py-2.5 px-4 grid grid-cols-[2fr_1fr_1.2fr_1.2fr_0.8fr_0.6fr] items-center mb-3 gap-x-4">
//       {headings?.map((heading, index) => (
//         <TableHeading
//           key={index}
//           title={heading.label}
//           value={heading.value}
//           isFirst={index === 0}
//           isAligned={true}
//           handleSort={handleSort}
//           currentSort={sortValue}
//         />
//       ))}
//     </div>
//   );
// };





import { TableHeading } from "../../../base-component/ui/table-heading";

export const MonthlyPremUserTableHeadings = ({ headings, handleSort, sortValue }) => {
  return (
    <div className="py-2.5 px-4 grid grid-cols-[minmax(180px,_3fr)_minmax(150px,_2fr)_minmax(150px,_2fr)_minmax(150px,_2fr)_minmax(120px,_2fr)_minmax(100px,_1fr)] items-center mb-3 gap-x-4">
      {headings?.map((heading, index) => (
        <TableHeading
          key={index}
          title={heading.label}
          value={heading.value}
          isFirst={index === 0}
          isAligned={true}
          handleSort={handleSort}
          currentSort={sortValue}
        />
      ))}
    </div>
  );
};




