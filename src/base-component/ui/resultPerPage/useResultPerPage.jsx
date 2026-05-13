import { useState, useMemo } from "react";

// Custom hook for pagination logic
const useResultPerPage = (
  totalItems,
  initialRowsPerPage = 75,
  initialPage = 1
) => {
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate total pages based on total items and rows per page
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / rowsPerPage);
  }, [totalItems, rowsPerPage]);

  // Ensure current page is within valid range
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  } else if (currentPage < 1 && totalPages > 0) {
    setCurrentPage(1);
  }

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    // Reset to first page when rows per page changes
    setCurrentPage(1);
  };

  // Calculate the start and end index of items for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);

  return {
    currentPage,
    totalPages,
    rowsPerPage,
    startIndex,
    endIndex,
    handlePageChange,
    handleRowsPerPageChange,
  };
};

export default useResultPerPage;
