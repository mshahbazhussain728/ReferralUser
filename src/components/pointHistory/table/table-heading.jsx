import { TableHeading } from "../../../base-component/ui/table-heading";

export const PointHistoryTableHeadings = ({
  headings,
  handleSort,
  sortValue,
}) => {
  return (
    <div className="py-2.5 px-4 grid grid-cols-[minmax(200px,_4fr)_minmax(170px,_3fr)_minmax(170px,_3fr)_minmax(170px,_3fr)] items-center mb-3">

      {headings?.map((heading, index) => (
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
