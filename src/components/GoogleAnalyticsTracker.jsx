// src/components/GoogleAnalyticsTracker.jsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageview } from "@/lib/gtag";

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      pageview(pathname);
    }
  }, [pathname]);

  return null;
}
