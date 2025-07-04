import Image from "next/image";
import Link from "next/link";

/**
 * Highlights matched keyword in a given text.
 * @param {string} text - The text to highlight.
 * @param {string} keyword - The keyword to highlight.
 * @returns JSX with <mark> tags around matches.
 */
function highlight(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark
        key={i}
        className="bg-[var(--accent-color)] text-[var(--portfolio-text-color)] px-1 rounded"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function BlogCard({ post, highlight: keyword = "" }) {
  return (
    <Link href={`/${post.slug}`}>
      <div className="flex flex-col h-full bg-[var(--portfolio-bg-color)] border border-[var(--portfolio-text-color)]/10 rounded-lg overflow-hidden hover:shadow-lg transition">
        {/* 🖼️ Image */}
        {post.image && (
          <div className="relative w-full h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* ⏱️ Reading Time Badge */}
            <div className="absolute bottom-2 right-2 bg-[var(--main-color)] text-[var(--text-lightt)] text-xs font-medium px-2 py-1 rounded">
              {post.readingTime}
            </div>
          </div>
        )}

        {/* 📄 Content */}
        <div className="flex flex-col flex-grow p-5">
          <h2 className="text-xl font-semibold text-[var(--main-color)] mb-2 line-clamp-2">
            {highlight(post.title, keyword)}
          </h2>
          <p className="text-sm text-[var(--portfolio-text-color)]/70 mb-3 line-clamp-3">
            {highlight(post.description, keyword)}
          </p>

          {/* 📆 Date + Read More */}
          <div className="flex justify-between items-center text-[var(--main-color)] text-xs mb-1">
            <span>{post.date}</span>
            <span>Read More →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
