import React from "react";
import useResultPerPage from "./useResultPerPage";

const ResultPerPage = ({ totalItems, data }) => {
  const {
    currentPage,
    totalPages,
    rowsPerPage,
    startIndex,
    endIndex,
    handlePageChange,
    handleRowsPerPageChange,
  } = useResultPerPage(totalItems);

  const rowsPerPageOptions = [15, 25, 50, 75, 100];

  const currentItems = data?.slice(startIndex, endIndex);

  return (
    <div>
      <div>
        {currentItems?.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>

      <div className="flex items-center gap-x-[10px] mt-[10px]">
        <div>
          <label>Rows per page</label>
          <select
            value={rowsPerPage}
            onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
            style={{ marginLeft: "5px" }}
          >
            {rowsPerPageOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default ResultPerPage;
