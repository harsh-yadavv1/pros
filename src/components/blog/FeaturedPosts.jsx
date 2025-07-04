"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeaturedPosts({ posts }) {
  if (!posts || posts.length < 3) {
    return null;
  }

  const [first, second, third] = posts.slice(0, 3);

  return (
    <section className="w-full px-4 py-10 bg-[var(--portfolio-bg-color)]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 🌟 First Featured Post (Large) */}
        <Link
          href={`/${first.slug}`}
          className="relative block h-[400px] rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition"
        >
          <Image
            src={first.image || "/fallback.jpg"}
            alt={first.title}
            fill
            className="object-cover w-full h-full"
            loading="eager"
            priority
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition duration-300" />

          <div className="absolute bottom-6 left-6 z-10 max-w-[90%] text-[var(--portfolio-text-color)]">
            <span className="text-xs px-3 py-1 rounded-full font-semibold bg-[var(--accent-color)]">
              {first.category || "Featured"}
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold mt-3 leading-snug"
              style={{ color: "#f5eedd" }}
            >
              {first.title}
            </h2>
            <p className="text-sm opacity-90 mt-1 text-white line-clamp-2">
              {first.description}
            </p>
            <div className="text-xs mt-2 opacity-80 text-white">
              👁️ {first.views?.toLocaleString() || 0} ·{" "}
              {new Date(first.date).toDateString()}
            </div>
          </div>
        </Link>

        {/* 🌟 Second + Third Featured Posts */}
        <div className="grid md:grid-cols-2 gap-6">
          {[second, third].map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="relative rounded-xl overflow-hidden group h-[250px] md:h-[280px] shadow-md hover:shadow-lg transition"
            >
              <Image
                src={post.image || "/fallback.jpg"}
                alt={post.title}
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition duration-300" />
              <div className="absolute bottom-4 left-4 z-10 max-w-[90%] text-[var(--portfolio-text-color)]">
                <span className="bg-[var(--accent-color)] text-xs px-2 py-1 rounded-full font-semibold">
                  {post.category || "General"}
                </span>
                <h3
                  className="text-lg font-semibold mt-2"
                  style={{ color: "#f5eedd" }}
                >
                  {post.title}
                </h3>
                <div className="text-xs mt-1 opacity-80 text-white">
                  👁️ {post.views?.toLocaleString() || 0} ·{" "}
                  {new Date(post.date).toDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
