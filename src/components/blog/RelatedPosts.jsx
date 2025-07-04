"use client";

import Image from "next/image";
import Link from "next/link";

export default function RelatedPosts({ posts }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-[var(--portfolio-bg-color)] text-[var(--portfolio-text-color)] transition-colors duration-300">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--main-color)]/80 px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-[var(--portfolio-bg-color)]"></div>
          <span className="text-sm font-medium text-[var(--portfolio-bg-color)]">
            Continue Reading
          </span>
        </div>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--portfolio-text-color)] sm:text-4xl">
          Related Posts
        </h2>
        <p className="mt-2 text-[var(--portfolio-text-color)]/70">
          Discover more content you might find interesting
        </p>
      </div>

      {/* Scrollable container */}
      <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:overflow-x-auto lg:gap-8">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="relative flex-shrink-0 w-full sm:w-auto lg:w-80 bg-[var(--portfolio-bg-color)] border border-[var(--portfolio-text-color)]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:ring-1 hover:ring-[var(--main-color)]/20 transition-all"
          >
            <Link href={`/${post.slug}`} className="absolute inset-0 z-10" />
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={500}
                height={280}
                className="object-cover w-full h-44 sm:h-52"
              />
            )}
            <div className="p-4">
              <div className="mb-2 text-xs text-[var(--main-color)] font-medium uppercase tracking-wide">
                {post.category || "Article"}
              </div>
              <h3 className="text-lg font-semibold text-[var(--portfolio-text-color)] line-clamp-2">
                {post.title}
              </h3>
              <div className="mt-2 text-sm text-[var(--portfolio-text-color)]/60 flex justify-between items-center">
                <time>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                {post.readingTime && <span>{post.readingTime}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="mt-12 text-center">
        <Link
          href="/blogs"
          className="inline-block px-6 py-3 rounded-full border bg-[var(--portfolio-bg-color)] text-[var(--main-color)] font-semibold transition hover:bg-[var(--main-color)] hover:text-[var(--portfolio-bg-color)] focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
        >
          Explore More Posts
        </Link>
      </div>
    </section>
  );
}
