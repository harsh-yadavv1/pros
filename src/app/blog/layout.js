// src/app/blog/layout.js

import "../../styles/globals.css";
import "../../styles/portfolio.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Blog | Harsh",
  description: "Read articles and tutorials by Harsh",
};

export default function BlogLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className="portfolio-theme blog-theme antialiased flex flex-col min-h-screen font-sans"
        data-section="blog"
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
