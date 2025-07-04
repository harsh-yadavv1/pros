// src/app/blogs/page.js
import { Suspense } from "react";
import BlogsPage from "./BlogsClient";

export default function BlogsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogsPage />
    </Suspense>
  );
}
