"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProjectFilterBar({ categories = [], onFilter }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const uniqueCategories = useMemo(() => {
    const cleaned = new Set(categories.filter((c) => c !== "All"));
    return ["All", ...Array.from(cleaned)];
  }, [categories]);

  const updateURL = useCallback(
    (search, category) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category && category !== "All") params.set("category", category);
      router.replace(`?${params.toString()}`);
    },
    [router]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilter?.(search, activeCategory);
      updateURL(search, activeCategory);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, activeCategory]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 ">
      <div className="relative flex items-center border border-[var(--portfolio-text-color)]/20 rounded-lg bg-[var(--portfolio-bg-color)] shadow-sm focus-within:border-[var(--main-color)] transition">

        {/* Category Dropdown inside input (left) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 pl-4 pr-2 py-4 text-base text-[var(--portfolio-text-color)] hover:text-[var(--main-color)] focus:outline-none"
          >
            <i className="bx bx-category text-[var(--main-color)] text-lg"></i>
            <span className="whitespace-nowrap">{activeCategory}</span>
            <i
              className={`bx bx-chevron-down text-lg transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            ></i>
          </button>

          {dropdownOpen && (
            <ul className="absolute w-3xs left-0 z-15 mt-2 bg-[var(--text-lightt)] rounded-lg shadow-lg border border-[var(--portfolio-text-color)]/20 max-h-70 overflow-auto">
              {uniqueCategories.map((category) => (
                <li
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setDropdownOpen(false);
                  }}
                  className={`px-4 py-2 text-base cursor-pointer hover:bg-[var(--main-color)] hover:text-[var(--text-lightt)] transition ${
                    category === activeCategory
                      ? "bg-[var(--main-color)] text-[var(--text-lightt)]"
                      : "text-[var(--portfolio-text-color)]"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Icon */}
        <i className="bx bx-search text-2xl text-[var(--main-color)] px-3 pointer-events-none"></i>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-4 pr-10 text-base bg-transparent text-[var(--portfolio-text-color)] placeholder:text-[var(--portfolio-text-color)]/50 focus:outline-none"
        />

        {/* Clear Button */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 text-[var(--portfolio-text-color)]/50 hover:text-[var(--main-color)] text-xl"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
