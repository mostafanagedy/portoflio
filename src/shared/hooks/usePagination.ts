import { useMemo, useState } from 'react';

interface UsePaginationOptions<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

export function usePagination<T>({
  data,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const clampedPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedData = useMemo(() => {
    const start = (clampedPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, clampedPage, itemsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    currentPage: clampedPage,
    totalPages,
    paginatedData,
    itemsPerPage,
    goToPage,
    nextPage,
    prevPage,
    hasNext: clampedPage < totalPages,
    hasPrev: clampedPage > 1,
  };
}
