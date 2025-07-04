"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogNavbar from "@/components/blog/BlogNavbar";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogCard from "@/components/blog/BlogCard";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import CategoryCards from "@/components/blog/CategoryCards";
import BlogFilterBar from "@/components/blog/BlogFilterBar";

const POSTS_PER_PAGE = 9;

export default function BlogHomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";

  // Load all posts once
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

  // Filter posts based on search and category
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
    setVisibleCount(POSTS_PER_PAGE); // reset on filter
  }, [allPosts, search, category]);

  // Slice visible posts for pagination
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  // 🔥 Smart FeaturedPosts logic
  const topFromCategory = [...filteredPosts]
    .filter((p) => typeof p.views === "number")
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  let featuredPosts = topFromCategory;

  if (topFromCategory.length < 3) {
    const topGlobal = [...allPosts]
      .filter((p) => typeof p.views === "number")
      .filter((p) => !topFromCategory.some((fp) => fp.slug === p.slug))
      .sort((a, b) => b.views - a.views)
      .slice(0, 3 - topFromCategory.length);

    featuredPosts = [...topFromCategory, ...topGlobal];
  }

  // Handle filter changes from BlogFilterBar
  const handleFilter = (searchText, selectedCategory) => {
    const params = new URLSearchParams();
    if (searchText) params.set("search", searchText);
    if (selectedCategory && selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }
    router.push(`/blog?${params.toString()}`);
  };

  // Load more button logic
  const handleLoadMore = () => {
    if (visibleCount < 18) {
      setVisibleCount((prev) => prev + POSTS_PER_PAGE);
    } else {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category && category !== "All") params.set("category", category);
      params.set("page", "3");
      router.push(`/blogs?${params.toString()}`);
    }
  };

  return (
    <BlogLayout>
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-[var(--portfolio-bg-color)] shadow-md">
        <BlogNavbar />
      </header>

      <main className="flex-grow">
        {/* Filter Bar */}
        <div className="mt-[88px] md:mt-[96px] scroll-mt-[96px]">
          <BlogFilterBar
            categories={[...new Set(allPosts.map((p) => p.category))]}
            onFilter={handleFilter}
          />
        </div>

        {/* Top Section */}
        <section id="top">
          <FeaturedPosts posts={featuredPosts} />
          <CategoryCards />
        </section>

        {/* Latest Posts Section */}
        <section
          id="latest-posts"
          className="max-w-7xl mx-auto px-4 py-12 scroll-mt-[96px]"
        >
          <h2 className="text-3xl font-semibold mb-6 text-[var(--main-color)]">
            Latest Posts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {visiblePosts.map((post) => (
              <BlogCard key={post.slug} post={post} highlight={search} />
            ))}
          </div>

          {visibleCount < filteredPosts.length && (
            <div className="mt-10 px-4">
              <button
                onClick={handleLoadMore}
                className="w-full px-6 py-3 rounded-full border bg-[var(--portfolio-bg-color)] text-[var(--main-color)] font-semibold transition 
                hover:bg-[var(--main-color)] hover:text-[var(--portfolio-bg-color)] 
                active:bg-[var(--main-color)] active:text-[var(--portfolio-bg-color)] 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-color)]"
              >
                {visibleCount < 18 ? "Load More ➞" : "View All Posts ➞"}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <BlogFooter />
      </footer>
    </BlogLayout>
  );
}
