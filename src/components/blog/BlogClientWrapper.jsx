// src/components/blog/BlogClientWrapper.jsx
"use client";

import { useLayoutEffect } from "react";

export default function BlogClientWrapper() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const previous = html.getAttribute("data-section");

    // Set blog theme
    html.setAttribute("data-section", "blog");

    return () => {
      // Restore previous section if needed
      if (previous) {
        html.setAttribute("data-section", previous);
      } else {
        html.removeAttribute("data-section");
      }
    };
  }, []);

  return null;
}
