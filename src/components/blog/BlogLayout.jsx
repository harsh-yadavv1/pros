"use client";

export default function BlogLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--portfolio-bg-color)] text-[var(--portfolio-text-color)] font-sans">
      {children}
    </div>
  );
}
