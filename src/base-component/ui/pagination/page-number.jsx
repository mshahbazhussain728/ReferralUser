import { getButtonClass } from "../../../utils/utility";
import { PaginationItem } from "./pagination-item";

export const PageNumber = ({ currentPage, pageNumber, handlePageClick }) => {
  return (
    <PaginationItem
      key={pageNumber}
      icon={pageNumber}
      handlePageClick={() => handlePageClick(pageNumber)}
      className={getButtonClass(
        currentPage === pageNumber,
        "bg-primary text-white",
        "hover:bg-gray-200"
      )}
    />
  );
};
