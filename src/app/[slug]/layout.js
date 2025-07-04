// src/app/[slug]/layout.js

import "../../styles/globals.css";
import "../../styles/portfolio.css";
import { ThemeProvider } from "next-themes";

// ✅ DO NOT declare <html> or <body> in nested layout
// Let /app/layout.js handle that once globally

export const metadata = {
  title: "Blog Post | Harsh",
  description:
    "Read detailed blog posts by Harsh on development, tutorials, and insights.",
  openGraph: {
    title: "Blog Post | Harsh",
    description: "Explore in-depth tech articles and updates by Harsh.",
    type: "article",
  },
};

export default function BlogPostLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className="blog-theme flex flex-col min-h-screen font-sans"
        data-section="blog"
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
