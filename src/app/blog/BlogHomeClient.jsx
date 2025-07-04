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

export default function BlogHomeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";

  // 🔁 Fetch all posts on mount
  useEffect(() => {
    (async () => {
      const posts = await getAllPosts();
      const valid = posts.filter(
        (post) => post && post.slug && post.title && post.image
      );
      setAllPosts(valid);
    })();
  }, []);

  // 🔍 Filter posts based on search/category
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
    setVisibleCount(POSTS_PER_PAGE);
  }, [allPosts, search, category]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  // 🌟 Featured logic
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

  // 🎯 Filter handler
  const handleFilter = (searchText, selectedCategory) => {
    const params = new URLSearchParams();
    if (searchText) params.set("search", searchText);
    if (selectedCategory && selectedCategory !== "All")
      params.set("category", selectedCategory);
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  // ➕ Load more handler
  const handleLoadMore = () => {
    if (visibleCount < 18) {
      setVisibleCount((prev) => prev + POSTS_PER_PAGE);
    } else {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category && category !== "All") params.set("category", category);
      params.set("page", "3");
      router.push(`/blogs?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <BlogLayout>
      <header className="sticky top-0 z-50 bg-[var(--portfolio-bg-color)] shadow-md">
        <BlogNavbar />
      </header>

      <main className="flex-grow">
        <div className="mt-[88px] md:mt-[96px] scroll-mt-[96px]">
          <BlogFilterBar
            categories={[...new Set(allPosts.map((p) => p.category))]}
            onFilter={handleFilter}
          />
        </div>

        <section id="top">
          <FeaturedPosts posts={featuredPosts} />
          <CategoryCards />
        </section>

        <section
          id="latest-posts"
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-[var(--main-color)]">
            Latest Posts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePosts.map((post) => (
              <BlogCard key={post.slug} post={post} highlight={search} />
            ))}
          </div>

          {visibleCount < filteredPosts.length && (
            <div className="mt-10 px-4 sm:px-0">
              <button
                onClick={handleLoadMore}
                className="w-full max-w-sm mx-auto block px-6 py-3 rounded-full border 
                  bg-[var(--portfolio-bg-color)] text-[var(--main-color)] font-semibold transition 
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

      <footer className="mt-auto">
        <BlogFooter />
      </footer>
    </BlogLayout>
  );
}
