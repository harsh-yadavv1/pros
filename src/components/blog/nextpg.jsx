"use client";

import { useState, useEffect } from "react";

export default function BlogPagination({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  maxVisiblePages = 5,
}) {
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="flex flex-wrap justify-center gap-2">
        {/* ← Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-[var(--main-color)] hover:bg-[var(--main-color)]/10"
          }`}
        >
          ← Prev
        </button>

        {/* Page Numbers */}
        {visiblePages.map((page, i) =>
          page === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="px-3 py-2 text-gray-500 text-sm"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              onMouseEnter={() => setHovered(page)}
              onMouseLeave={() => setHovered(null)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                page === currentPage
                  ? "bg-[var(--main-color)] text-[var(--portfolio-bg-color)]"
                  : "text-[var(--portfolio-text-color)] hover:bg-[var(--main-color)]/10"
              } ${hovered === page ? "scale-105" : ""}`}
            >
              {page}
            </button>
          )
        )}

        {/* Next → */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-[var(--main-color)] hover:bg-[var(--main-color)]/10"
          }`}
        >
          Next →
        </button>
      </div>

      {/* Page Info */}
      <div className="text-xs text-[var(--portfolio-text-color)]/60 mt-2">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}
