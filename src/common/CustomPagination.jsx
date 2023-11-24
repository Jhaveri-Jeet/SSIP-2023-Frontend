// Pagination.js
// Pagination.js

import React, { useState, useEffect } from 'react';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;
  const [firstVisiblePage, setFirstVisiblePage] = useState(1);

  useEffect(() => {
    if (currentPage > firstVisiblePage + maxVisiblePages - 1) {
      setFirstVisiblePage(currentPage - maxVisiblePages + 1);
    } else if (currentPage < firstVisiblePage) {
      setFirstVisiblePage(currentPage);
    }
  }, [currentPage, firstVisiblePage]);

  const renderPageButtons = () => {
    const lastVisiblePage = Math.min(totalPages, firstVisiblePage + maxVisiblePages - 1);

    let pagesToRender = Array.from(
      { length: lastVisiblePage - firstVisiblePage + 1 },
      (_, index) => firstVisiblePage + index
    );

    if (totalPages > maxVisiblePages) {
      if (lastVisiblePage < totalPages) {
        // Add an ellipsis and the last page number
        pagesToRender = [
          ...pagesToRender,
          <span key="ellipsisEnd" className="mx-2">...</span>,
          totalPages,
        ];
      }
    }

    return pagesToRender.map((pageNumber) => renderPageButton(pageNumber));
  };

  const renderPageButton = (pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => onPageChange(pageNumber)}
      style={{ paddingInline: "13px", paddingBlock: "6px" }}
      className={`mx-2  ${
        pageNumber === currentPage ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-800'
      } rounded-full `}
    >
      {pageNumber}
    </button>
  );

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-2 p-2 bg-gray-200 text-gray-800 rounded-full"
      >
        Previous
      </button>

      {renderPageButtons()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-2 p-2 bg-gray-200 text-gray-800 rounded-full"
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
