// src/app/blog/page.jsx

import { Suspense } from "react";
import BlogHomeClient from "./BlogHomeClient";

export const metadata = {
  title: "Blog | Harsh",
  description: "Explore blog posts, tutorials, and insights by Harsh.",
  openGraph: {
    title: "Blog | Harsh",
    description:
      "Read high-quality web development tutorials and tech insights.",
    url: "https://heyharsh.vercel.app/blog",
    siteName: "Harsh's Blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Harsh",
    description: "Explore blog posts, tutorials, and insights by Harsh.",
    creator: "@heyharsh",
  },
};

export default function BlogHomeWrapper() {
  return (
    <Suspense
      fallback={
        <div className="text-center text-sm py-20">Loading Blog...</div>
      }
    >
      <BlogHomeClient />
    </Suspense>
  );
}
