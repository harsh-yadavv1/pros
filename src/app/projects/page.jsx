"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard from "@/components/projectsc/ProjectCard";
import ProjectFilterBar from "@/components/projectsc/ProjectFilterBar";
import allProjects from "@/data/projectList";
import NavBar from "@/components/portfolio/NavBar";
import BlogFooter from "@/components/blog/BlogFooter";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const PROJECTS_PER_PAGE = 8;

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const [currentPage, setCurrentPage] = useState(1);

  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/gi, "");

  const handleFilter = (search = "", category = "All") => {
    const filtered = allProjects.filter((project) => {
      const matchesCategory =
        category === "All" || project.category === category;
      const matchesSearch = normalize(project.title).includes(
        normalize(search)
      );
      return matchesCategory && matchesSearch;
    });

    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";
    handleFilter(search, category);
  }, [searchParams]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredProjects, currentPage]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const uniqueCategories = useMemo(
    () => ["All", ...new Set(allProjects.map((p) => p.category))],
    []
  );

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  return (
    <>
      <NavBar />
      <main className="flex-grow w-full mt-5">
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
         

          <ProjectFilterBar
            categories={uniqueCategories}
            onFilter={handleFilter}
          />

          {/* 💡 Project List */}
          {paginatedProjects.length === 0 ? (
            <p className="text-base text-center sm:text-left text-[var(--portfolio-text-color)]/60 mt-8">
              No projects found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
              {paginatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}

          {/* 📄 Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className="px-3 py-1 rounded-full text-2xl font-medium border border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <MdKeyboardDoubleArrowLeft />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Go to page ${page}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] ${
                      isActive
                        ? "bg-[var(--main-color)] text-[var(--text-lightt)] shadow-sm"
                        : "bg-[var(--text-lightt)] text-[var(--main-color)] border border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-[var(--text-lightt)]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className="px-3 py-1 rounded-full text-2xl font-medium border border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-[var(--text-lightt)] disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <MdKeyboardDoubleArrowRight />
              </button>
            </div>
          )}
        </section>
      </main>
      <BlogFooter />
    </>
  );
}
