// // import { TableHeading } from "../../../base-component/ui/table-heading";

// // export const FreeUsersTableHeadings = ({ headings, handleSort, sortValue }) => {
// //   return (
// //     <div className="grid grid-cols-3 gap-x-4 px-4 py-3">
// //       {headings.map((heading, index) => (
// //         <TableHeading
// //           key={heading.value}
// //           title={heading.label}
// //           value={heading.value}
// //           isFirst={index === 0}
// //           isAligned={true}
// //           handleSort={handleSort}
// //           currentSort={sortValue}
// //         />
// //       ))}
// //     </div>
// //   );
// // };




import { TableHeading } from "../../../base-component/ui/table-heading";

export const FreeUsersTableHeadings = ({ headings, handleSort, sortValue }) => {
  return (
    <div className="grid gap-x-4 px-4 py-3" style={{ gridTemplateColumns: `repeat(${headings.length}, 10fr)` }}>
      {headings.map((heading, index) => (
        <TableHeading
          key={heading.value}
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

