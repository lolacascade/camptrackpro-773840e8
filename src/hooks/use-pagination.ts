
import { useState } from 'react';

interface UsePaginationProps {
  itemsPerPage?: number;
  defaultPage?: number;
}

export function usePagination({ itemsPerPage = 25, defaultPage = 1 }: UsePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    itemsPerPage,
    handlePageChange,
    resetPagination
  };
}
