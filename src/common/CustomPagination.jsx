// Pagination.js

import React from 'react';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-center mt-4">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="mx-2 p-2 bg-gray-200 text-gray-800 rounded-full"
    >
      Previous
    </button>

    {pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => onPageChange(pageNumber)}
        style={{paddingInline:"13px",paddingBlock:"6px"}}
        className={`mx-2  ${
          pageNumber === currentPage ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-800'
        } rounded-full `}
      >
        {pageNumber}
      </button>
    ))}

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
