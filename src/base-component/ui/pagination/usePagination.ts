import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

const PAGE_LIMIT = 5;
export const dots = "•••";

export const usePagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage: defaultPage,
  isPageInParam,
}) => {
  const [currentPage, setCurrentPage] = useState(defaultPage || 1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const handlePageClick = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        if (isPageInParam !== false) {
          searchParams.set("page", page);
          setSearchParams(searchParams);
          navigate(`?${searchParams.toString()}`, { replace: true });
        }

        setCurrentPage(page);
        onPageChange(page);
      }
    },
    [
      totalPages,
      onPageChange,
      navigate,
      searchParams,
      setSearchParams,
      isPageInParam,
    ]
  );

  const handlePrevClick = () => {
    handlePageClick(currentPage - 1);
  };

  const handleNextClick = () => {
    handlePageClick(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(defaultPage);
  }, [defaultPage]);

  const startPage = Math.max(2, currentPage - Math.floor(PAGE_LIMIT / 2));
  const endPage = Math.min(totalPages - 1, startPage + PAGE_LIMIT - 1);

  const pagesToShow = [
    1,
    ...Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    ),
    totalPages,
  ];

  const uniquePagesToShow = [...new Set(pagesToShow)];

  return {
    currentPage,
    isFirst,
    isLast: totalPages < currentPage ? true : isLast,
    pagesToShow: totalPages > 0 ? uniquePagesToShow : [],
    dots,
    handlePrevClick,
    handleNextClick,
    handlePageClick,
  };
};
