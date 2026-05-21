






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





// import { TableHeading } from "../../../base-component/ui/table-heading";

// export const MonthlyPremUserTableHeadings = ({ headings, handleSort, sortValue }) => {
//   return (
//     <div className="py-2.5 px-4 grid grid-cols-[minmax(180px,_3fr)_minmax(150px,_2fr)_minmax(150px,_2fr)_minmax(150px,_2fr)_minmax(120px,_2fr)_minmax(100px,_1fr)] items-center mb-3 gap-x-4">
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




////uu


// import { TableHeading } from "../../../base-component/ui/table-heading";

// export const MonthlyPremUserTableHeadings = ({ headings, handleSort, sortValue }) => {
//   return (
//     <div className="py-2.5 px-4 whitespace-nowrap grid grid-cols-[minmax(170px,_3fr)_minmax(160px,_2fr)_minmax(160px,_2fr)_minmax(160px,_2fr)_minmax(80px,_2fr)_minmax(0px,_1fr)] items-center mb-3 gap-x-6">
//       {headings?.map((heading, index) => (
//         <TableHeading
//           key={index}
//           title={heading.label}
//           value={heading.value}
//           isFirst={index === 0 || index === 1 || index === 2 || index === 3}
//           isAligned={true}
//           handleSort={handleSort}
//           currentSort={sortValue}
//         />
//       ))}
//     </div>
//   );
// };


/////uu1



import { TableHeading } from "../../../base-component/ui/table-heading";

export const MonthlyPremUserTableHeadings = ({ headings, handleSort, sortValue }) => {
  return (
    // <div className="py-2.5 px-4 whitespace-nowrap grid grid-cols-[minmax(170px,_3fr)_minmax(160px,_2fr)_minmax(160px,_2fr)_minmax(160px,_2fr)_minmax(80px,_2fr)_minmax(10px,_1fr)] items-center mb-3 gap-x-6">
      
  <div className="py-2.5 px-4 whitespace-nowrap grid grid-cols-[minmax(140px,_3fr)_minmax(160px,_2fr)_minmax(160px,_2fr)_minmax(160px,_2fr)_minmax(80px,_2fr)_minmax(80px,_1fr)] items-center mb-3 gap-x-6">  
    
    
    {headings?.map((heading, index) => (
        <TableHeading
          key={index}
          title={heading.label}
          value={heading.value}
          isFirst={index === 0 || index === 1 || index === 2 || index === 3}
          isAligned={true}
          handleSort={handleSort}
          currentSort={sortValue}
        />
      ))}
    </div>
  );
};