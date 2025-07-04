"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/portfolio/ThemeToggle";

export default function BlogNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Portfolio", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
        hasScrolled
          ? "shadow-lg backdrop-blur-md bg-[var(--portfolio-bg-color)]"
          : "bg-[var(--portfolio-bg-color)]"
      } text-[var(--portfolio-text-color)]`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-[6px] md:py-2">
        {/* Logo */}
        <Link
          href="/blog"
          className="font-extrabold leading-none cursor-pointer transition-transform duration-300 text-[1.3rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem]"
        >
          <span style={{ color: "var(--main-color)" }}>Harsh's Blog</span>
        </Link>

        <div className="flex items-center h-full gap-3 md:gap-5">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[2rem] text-[var(--main-color)] md:hidden mt-[1px] group"
            aria-label="Toggle Menu"
          >
            <i
              className={`transition-transform duration-300 ${
                menuOpen ? "bx bx-x " : "bx bx-menu group-hover:scale-110"
              }`}
            />
          </button>

          {/* Navigation */}
          <nav
            className={`absolute md:static top-full left-0 text-center w-full md:w-auto bg-[var(--portfolio-bg-color)] md:bg-transparent backdrop-blur-md md:backdrop-blur-none md:flex items-center transition-all duration-300 ease-in-out border-t border-[var(--main-color)]/20 md:border-none ${
              menuOpen ? "block shadow-lg min-h-[150px]" : "hidden md:flex"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center py-4 md:py-0">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`relative text-[1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.2rem] font-medium text-[var(--portfolio-text-color)] py-3 px-4 md:px-3 ${
                      index !== 0 ? "md:ml-2" : ""
                    } group transition-all duration-300 overflow-hidden ${
                      isActive ? "scale-105" : ""
                    }`}
                  >
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {item.label}
                    </span>

                    {/* Underline */}
                    <div
                      className={`absolute bottom-1 left-1/2 h-0.5 bg-[var(--main-color)] transition-all duration-300 rounded-full ${
                        isActive
                          ? "w-3/4 -translate-x-1/2"
                          : "w-0 group-hover:w-3/4 -translate-x-1/2"
                      }`}
                    />

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[var(--main-color)] rounded-lg blur opacity-0 transition-opacity duration-300 -z-10" />
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
