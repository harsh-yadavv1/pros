// src/app/blogs/page.js
import { Suspense } from "react";
import BlogsClient from "./BlogsClient";

export default function BlogsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogsClient />
    </Suspense>
  );
}
