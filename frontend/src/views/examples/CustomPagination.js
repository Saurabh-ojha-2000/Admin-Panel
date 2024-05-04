import React from "react";

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxPagesToShow = 5; // Maximum number of pages to show before ellipsis

  const getPageNumbers = () => {
    const pages = [];

    // If total pages are less than or equal to maxPagesToShow, show all pages
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If current page is near the beginning, show first maxPagesToShow pages
      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
        // If current page is near the end, show last maxPagesToShow pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around the current page
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - Math.floor(maxPagesToShow / 2); i <= currentPage + Math.floor(maxPagesToShow / 2); i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };``

  return (
    <div className="pagination">
      <nav aria-label="...">
        <ul className="pagination pagination-lg justify-content-center">

          {/* previous */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)}><span aria-hidden="true">&laquo;</span> Prev</button>
          </li>

          {/* all pages */}
          {getPageNumbers().map((page, index) => (
            <li key={index} className={`page-item ${page === '...' ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}

          {/* next  */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next <span aria-hidden="true">&raquo;</span></button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomPagination;
