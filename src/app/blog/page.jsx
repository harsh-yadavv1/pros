// src/app/blog/page.jsx
import { Suspense } from "react";
import BlogHomeClient from "./BlogHomeClient";

export default function BlogHomeWrapper() {
  return (
    <Suspense fallback={<div>Loading Blog...</div>}>
      <BlogHomeClient />
    </Suspense>
  );
}
