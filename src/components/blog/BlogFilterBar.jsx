"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function BlogFilterBar({ categories = [], onFilter }) {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

  const defaultCategories = [
    "Tech",
    "Design",
    "Tutorial",
    "Startup",
    "AI",
    "DevOps",
    "JavaScript",
    "React",
    "Open Source",
    "Career",
    "Security",
    "Cloud",
    "Tools",
    "Next.js",
  ];

  const rawCategories = [...new Set([...defaultCategories, ...categories])];
  const sortedCategories = [
    "All",
    ...rawCategories.sort((a, b) => a.length - b.length),
  ];

  useEffect(() => {
    if (search !== initialSearch || activeCategory !== initialCategory) {
      onFilter?.(search, activeCategory);
    }
  }, [search, activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setIsMobileCategoriesOpen(false);
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  const clearSearch = () => setSearch("");

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 pt-0 mt-[88px] md:mt-[96px] scroll-mt-[96px] w-full">
      {/* Search Bar */}
      <div className="space-y-0 md:space-y-8 w-full">
        <div className="w-full relative group">
          <div
            className={`w-full relative flex items-center transition-all duration-300 ${
              isSearchFocused ? "transform scale-[1.02]" : ""
            }`}
          >
            <div className="absolute left-4 z-10">
              <svg
                className={`h-5 w-5 transition-colors duration-200 ${
                  isSearchFocused
                    ? "text-[var(--main-color)]"
                    : "text-[var(--portfolio-text-color)]/50"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search posts, topics, ideas..."
              value={search}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full rounded-2xl border-2 bg-[var(--portfolio-bg-color)] pl-12 pr-12 py-4 text-base text-[var(--portfolio-text-color)] placeholder:text-[var(--portfolio-text-color)]/50 transition-all duration-300 focus:outline-none ${
                isSearchFocused
                  ? "border-[var(--main-color)] shadow-lg shadow-[var(--main-color)]/20"
                  : "border-[var(--portfolio-text-color)]/20 hover:border-[var(--main-color)]/50"
              }`}
            />

            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 z-10 rounded-full p-1 text-[var(--portfolio-text-color)]/50 hover:text-[var(--main-color)] hover:bg-[var(--main-color)]/10 transition-all duration-200"
                aria-label="Clear search"
              >
                <i className="bx bx-x text-[20px]"></i>
              </button>
            )}
          </div>

          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--main-color)]/20 via-[var(--accent-color)]/20 to-[var(--accent-color)]/20 opacity-0 transition-opacity duration-300 -z-10 blur-xl ${
              isSearchFocused ? "opacity-100" : ""
            }`}
          />
        </div>

        <div className="hidden md:flex items-baseline gap-2 pl-1">
          <h3 className="text-2xl font-semibold text-[var(--portfolio-text-color)]">
            Categories
          </h3>
        </div>

        <div className="hidden md:flex flex-wrap gap-3">
          {sortedCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-[var(--main-color)] text-[var(--text-lightt)] shadow-lg shadow-[var(--main-color)]/30"
                    : "bg-[var(--portfolio-bg-color)] text-[var(--portfolio-text-color)]/80 border-2 border-[var(--portfolio-text-color)]/20 hover:border-[var(--main-color)]/50 hover:text-[var(--main-color)] hover:shadow-md"
                }`}
              >
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button
          onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
          className="w-14 h-14 rounded-full bg-[var(--main-color)] text-[var(--portfolio-bg-color)] shadow-lg shadow-[var(--main-color)]/40 flex items-center justify-center transition-all hover:scale-105"
          aria-label="Toggle Categories"
        >
          {isMobileCategoriesOpen ? (
            <i className="bx bx-x text-3xl leading-none"></i>
          ) : (
            <svg
              className="w-8 h-8 text-[var(--text-lightt)]"
              fill="currentColor"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="scale(1) translate(0,0)">
                <path d="M409.88 153.89H223.71c-38.56 0-69.82 31.27-69.82 69.84v186.17c0 38.54 31.26 69.79 69.82 69.79h186.17c38.56 0 69.82-31.25 69.82-69.79V223.73c0-38.57-31.26-69.84-69.82-69.84zM433.15 383.29c0 27.54-22.33 49.89-49.87 49.89H250.31c-27.54 0-49.87-22.34-49.87-49.89V250.32c0-27.54 22.33-49.88 49.87-49.88h132.97c27.54 0 49.87 22.34 49.87 49.88v132.97z" />
                <path d="M782.23 153.89H596.06c-38.56 0-69.82 31.27-69.82 69.84v186.17c0 38.54 31.26 69.79 69.82 69.79h186.17c38.56 0 69.82-31.25 69.82-69.79V223.73c0-38.57-31.26-69.84-69.82-69.84zM805.5 383.29c0 27.54-22.33 49.89-49.87 49.89H622.65c-27.53 0-49.86-22.34-49.86-49.89V250.32c0-27.54 22.33-49.88 49.86-49.88h132.98c27.54 0 49.87 22.34 49.87 49.88v132.97z" />
                <path d="M409.88 526.27H223.71c-38.56 0-69.82 31.25-69.82 69.82v186.15c0 38.57 31.26 69.82 69.82 69.82h186.17c38.56 0 69.82-31.25 69.82-69.82V596.08c0-38.57-31.26-69.82-69.82-69.82zM433.15 755.64c0 27.54-22.33 49.86-49.87 49.86H250.31c-27.54 0-49.87-22.32-49.87-49.86V622.67c0-27.54 22.33-49.86 49.87-49.86h132.97c27.54 0 49.87 22.32 49.87 49.86v132.97z" />
                <path d="M689.14 526.27c-89.97 0-162.9 72.93-162.9 162.88s72.93 162.9 162.9 162.9 162.9-72.93 162.9-162.9-72.93-162.88-162.9-162.88zM689.14 805.5c-64.27 0-116.36-52.09-116.36-116.36s52.09-116.34 116.36-116.34 116.36 52.09 116.36 116.34-52.09 116.36-116.36 116.36z" />
                <path d="M823.31 789.14l68.4 68.38c9.44 9.43 9.44 24.75 0 34.18-9.44 9.45-24.75 9.45-34.2 0l-68.38-68.38c-9.44-9.43-9.44-24.75 0-34.18 9.45-9.45 24.75-9.45 34.2 0z" />
              </g>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Categories Panel */}
      {isMobileCategoriesOpen && (
        <div className="fixed inset-0 bg-[var(--portfolio-bg-color)] z-30 flex flex-col items-center px-6 py-20 overflow-y-auto md:hidden">
          <h2 className="text-xl font-semibold text-[var(--portfolio-text-color)] mb-6">
            Categories
          </h2>
          <div className="w-full flex flex-col items-center gap-3">
            {sortedCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full rounded-full px-6 py-4 text-base text-center font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[var(--main-color)] to-[var(--accent-color)] text-white shadow-md"
                      : "bg-[var(--portfolio-bg-color)] text-[var(--portfolio-text-color)]/80 border border-[var(--portfolio-text-color)]/20 hover:border-[var(--main-color)] hover:text-[var(--main-color)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Decorative Blur Effects */}
      <div className="absolute left-0 top-0 h-32 w-32 bg-gradient-to-br from-[var(--accent-color)]/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 bottom-0 h-40 w-40 bg-gradient-to-tl from-[var(--main-color)]/10 to-transparent rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
