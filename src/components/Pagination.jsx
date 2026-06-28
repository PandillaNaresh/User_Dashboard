import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination footer component.
 * Displays page indices, total entry counts, and handles page size bounds selection.
 */
const Pagination = ({
  currentPage,
  totalEntries,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));

  // Determine starting and ending row counts
  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);

  // Generate range of page numbers to render
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-footer">
      {/* 1. Page Size Boundaries Selection */}
      <div className="pagination-size-selector">
        <span>Show</span>
        <select
          className="select-dropdown"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          aria-label="Records per page"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>entries</span>
      </div>

      {/* 2. Text Summary Info */}
      <div className="pagination-info">
        Showing {startEntry} to {endEntry} of {totalEntries} entries
      </div>

      {/* 3. Next / Prev Buttons Controls */}
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Previous Page"
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            className={`pagination-btn ${currentPage === num ? 'active' : ''}`}
            onClick={() => onPageChange(num)}
            aria-label={`Go to page ${num}`}
          >
            {num}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Next Page"
          aria-label="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
