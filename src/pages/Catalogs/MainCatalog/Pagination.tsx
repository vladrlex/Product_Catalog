import React from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageNumbers: number[];
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageNumbers,
}) => {
  return (
    <div className="products-catalog__pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {pageNumbers.map(page => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};
