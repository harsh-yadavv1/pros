"use client";
import { useState } from "react";
import Image from "next/image";

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

export default function ProjectCard({ project, highlight: keyword = "" }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col h-full w-full bg-[var(--portfolio-bg-color)] border border-[var(--portfolio-text-color)]/10 rounded-2xl overflow-hidden shadow-sm transition-all">
      {/* 🖼️ Image */}
      {project.image && (
        <div className="relative w-full h-50 sm:h-50 md:h-50 lg:h-50 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow">
            {project.category}
          </div>
        </div>
      )}

      {/* 📄 Content */}
      <div className="flex flex-col flex-grow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--main-color)] mb-3">
          {highlight(project.title, keyword)}
        </h2>

        <div className="relative overflow-hidden">
          <p
            className={`text-sm text-[var(--portfolio-text-color)]/80 mb-4 ${
              isExpanded ? "" : "line-clamp-3"
            }`}
          >
            {highlight(project.description, keyword)}
          </p>
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[var(--portfolio-bg-color)] to-transparent pointer-events-none" />
          )}
        </div>

        {/* 🔽 Expand + 🔗 Preview */}
        <div className="flex items-center justify-between w-full mt-auto">
          {/* Expand Toggle */}
          <button
            className="text-[var(--main-color)] hover:text-[var(--accent-color)] text-xl"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <i className={`bx ${isExpanded ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
          </button>

          {/* Preview Button */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-3 py-1 rounded-full border border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white transition-colors"
            >
              Preview
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
