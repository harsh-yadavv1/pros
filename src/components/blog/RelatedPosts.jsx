"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function RelatedPosts({ posts }) {
  return (
    <section
      className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-[var(--portfolio-text-color)]"
      aria-labelledby="related-heading"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--main-color)]/80">
          <span className="h-2 w-2 rounded-full bg-[var(--portfolio-bg-color)]" />
          <span className="text-sm font-medium text-[var(--portfolio-bg-color)]">
            Continue Reading
          </span>
        </div>
        <h2
          id="related-heading"
          className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight"
        >
          Related Posts
        </h2>
        <p className="mt-2 text-[var(--portfolio-text-color)]/70">
          Discover more content you might find interesting
        </p>
      </div>

      {/* Grid of Posts - No Scroll */}
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Related posts grid"
      >
        {posts.map(({ slug, image, title, category, date, readingTime }) => (
          <Link
            key={slug}
            href={`/${slug}`}
            className="group w-full rounded-2xl overflow-hidden border border-[var(--portfolio-text-color)]/10 shadow-sm transition-all hover:shadow-lg hover:ring-1 hover:ring-[var(--main-color)]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-color)]"
          >
            {image && (
              <Image
                src={image}
                alt={title}
                width={500}
                height={280}
                loading="lazy"
                className="object-cover w-full h-44 sm:h-52"
              />
            )}
            <div className="p-4">
              <div className="mb-1 text-xs font-medium uppercase text-[var(--main-color)]">
                {category || "Article"}
              </div>
              <h3 className="text-lg font-semibold leading-snug line-clamp-2 group-hover:underline">
                {title}
              </h3>
              <div className="mt-2 text-sm text-[var(--portfolio-text-color)]/60 flex justify-between items-center">
                <time>
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                {readingTime && <span>{readingTime}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="mt-12 text-center">
        <Link href="/blogs" className="explore-btn">
          Explore More Posts <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}
