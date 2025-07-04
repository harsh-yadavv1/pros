"use client";
import { useEffect, useRef } from "react";
import SocialIcons from "@/components/portfolio/SocialIcons";

export default function BlogFooter() {
  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    const particles = document.querySelectorAll(".particle");

    const handleSubmit = (e) => {
      e.preventDefault();
      const email = form.querySelector(".newsletter-input").value;
      if (email) {
        alert("Thank you for subscribing! We'll keep you updated.");
        form.reset();
      }
    };

    form.addEventListener("submit", handleSubmit);

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      particles.forEach((p, i) => {
        const speed = 0.5 + i * 0.1;
        p.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return (
    <footer className="relative custom-footer bg-[var(--portfolio-bg-color)] text-[var(--portfolio-text-color)] overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* Brand */}
        <div className="flex flex-col items-start w-full">
          <div className="text-2xl font-bold mb-4 text-[var(--main-color)]">
            Harsh's Blog
          </div>
          <p className="text-[var(--portfolio-text-color)]/70 mb-4 text-sm">
            Discover insightful articles, expert opinions, and stories that
            inspire and inform.
          </p>
          <div className="mt-2">
            <SocialIcons />
          </div>
        </div>

        {/* Categories */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4 text-[var(--portfolio-text-color)] border-b border-[var(--main-color)] inline-block pb-1">
            Categories
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "Technology",
              "Lifestyle",
              "Travel",
              "Food & Cooking",
              "Health & Wellness",
              "Business",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4 text-[var(--portfolio-text-color)] border-b border-[var(--main-color)] inline-block pb-1">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "About Us",
              "Write for Us",
              "Advertise",
              "Media Kit",
              "Contact",
              "FAQ",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4 text-[var(--portfolio-text-color)] border-b border-[var(--main-color)] inline-block pb-1">
            Legal
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "DMCA",
              "Disclaimer",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-[var(--accent-color)] transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4 text-[var(--portfolio-text-color)] border-b border-[var(--main-color)] inline-block pb-1">
            Newsletter
          </h3>
          <p className="text-[var(--portfolio-text-color)]/70 mb-3 text-sm">
            Subscribe to get the latest articles and updates delivered to your
            inbox.
          </p>
          <form ref={formRef} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="newsletter-input p-2 px-3 bg-[var(--text-lightt)] text-[var(--portfolio-text-color)] border border-[var(--main-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] transition-colors duration-300"
            />
            <button
              type="submit"
              className="newsletter-btn py-2 px-4 bg-[var(--main-color)] text-[var(--text-lightt)] rounded-md font-medium hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="relative z-10 text-center text-sm text-[var(--portfolio-text-color)]/60 border-t border-[var(--portfolio-text-color)]/20 py-6 px-4">
        &copy; 2025 Harsh's Blog . All rights reserved.
      </div>
    </footer>
  );
}
