"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogNavbar from "@/components/blog/BlogNavbar";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogCard from "@/components/blog/BlogCard";
import BlogFilterBar from "@/components/blog/BlogFilterBar";
import BlogPagination from "@/components/blog/nextpg";

const POSTS_PER_PAGE = 9;

export default function BlogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [hydrated, setHydrated] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const currentPage = Number(searchParams.get("page") || 1);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    async function loadPosts() {
      const posts = await getAllPosts();
      const valid = posts.filter(
        (post) => post && post.slug && post.title && post.image
      );
      setAllPosts(valid);
    }
    loadPosts();
  }, []);

  useEffect(() => {
    const filtered = allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.tags?.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      const matchesCategory = category === "All" || post.category === category;

      return matchesSearch && matchesCategory;
    });

    setFilteredPosts(filtered);
  }, [allPosts, search, category]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`/blogs?${params.toString()}`);
  };

  const handleFilter = (searchText, selectedCategory) => {
    const params = new URLSearchParams();
    if (searchText) params.set("search", searchText);
    if (selectedCategory && selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }
    params.set("page", "1");
    router.push(`/blogs?${params.toString()}`);
  };

  if (!hydrated) return null;

  return (
    <BlogLayout>
      <header className="sticky top-0 z-50 bg-[var(--portfolio-bg-color)] shadow-md">
        <BlogNavbar />
      </header>

      <BlogFilterBar
        className="max-w-7xl"
        categories={[...new Set(allPosts.map((p) => p.category))]}
        onFilter={handleFilter}
      />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-semibold mb-6 text-[var(--main-color)]">
            All Blog Posts
          </h2>

          {paginatedPosts.length === 0 ? (
            <p className="text-[var(--portfolio-text-color)]/60">
              No posts found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} highlight={search} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </main>

      <footer className="mt-auto">
        <BlogFooter />
      </footer>
    </BlogLayout>
  );
}
