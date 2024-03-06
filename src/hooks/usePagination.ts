import { useMemo, useState } from "react";

export default function usePagination<T>({
  data = [],
  pageSize = 10,
}: {
  data: T[];
  pageSize: number;
}): {
  items: T[];
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  hasPreviusPage: boolean;
  hasNextPage: boolean;
  setPage: (page: number) => void;
} {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.ceil(data.length / pageSize);

  const handleNextPage = () => {
    if (currentPage >= totalPage) return;
    setCurrentPage(currentPage + 1);
  };

  const handleSetPage = (page: number) => {
    if (page > totalPage || page < 1)
      throw new Error(`invalid page ${page}, range (1 -  ${totalPage})`);
    
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage - 1);
  };

  const items: T[] = useMemo(() => {
    const start = pageSize * currentPage - pageSize;
    const end = pageSize * currentPage;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);

  const hasPreviusPage = currentPage > 1;
  const hasNextPage = currentPage < totalPage;

  return {
    items: items,
    currentPage: currentPage,
    totalPages: totalPage,
    handleNextPage,
    handlePreviousPage,
    setPage: handleSetPage,
    hasPreviusPage,
    hasNextPage,
  };
}
