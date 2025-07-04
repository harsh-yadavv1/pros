// src\components\portfolio\NavBar.jsx
"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerShadow, setHeaderShadow] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", href: "#home", scroll: true },
    { label: "Blog", href: "/blog", scroll: false },
    { label: "About", href: "#about", scroll: true },
    { label: "Services", href: "#services", scroll: true },
    { label: "Work", href: "#work", scroll: true },
    { label: "Contact", href: "#contact", scroll: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setHeaderShadow(window.scrollY > 0);
      setMenuOpen(false);

      const scrollPosition = window.scrollY + 100;
      const scrollSections = navItems.filter((item) => item.scroll);

      for (const item of scrollSections) {
        const section = item.href.replace("#", "");
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[999] flex items-center justify-between transition-all duration-300 ${
        headerShadow
          ? "shadow-lg backdrop-blur-md bg-[var(--portfolio-bg-color)]"
          : "bg-[var(--portfolio-bg-color)]"
      } text-[var(--portfolio-text-color)]`}
    >
      <div className="w-full flex items-center justify-between px-3 md:px-6 py-[6px] md:py-2">
        <a
          href="#home"
          className="font-extrabold leading-none cursor-pointer transition-transform duration-300 
          text-[1.3rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem]"
        >
          <span style={{ color: "var(--main-color)" }}>Portfolio.</span>
        </a>

        <div className="flex items-center h-full gap-3 md:gap-5">
          <ThemeToggle />

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

          <nav
            className={`absolute md:static top-full left-0 text-center w-full md:w-auto bg-[var(--portfolio-bg-color)] md:bg-transparent backdrop-blur-md md:backdrop-blur-none md:flex items-center transition-all duration-300 ease-in-out border-t border-[var(--main-color)]/20 md:border-none ${
              menuOpen ? "block shadow-lg" : "hidden md:flex"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center py-2 md:py-0">
              {navItems.map((item, index) => {
                const isActive =
                  item.scroll && activeSection === item.href.replace("#", "");

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{ color: "var(--main-color)" }}
                    onClick={() => setMenuOpen(false)}
                    className={`relative text-[1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.2rem] font-medium 
                      text-[var(--portfolio-text-color)] py-3 px-4 md:px-3 ${
                        index !== 0 ? "md:ml-2" : ""
                      } group transition-all duration-300 overflow-hidden ${
                      isActive ? "scale-105" : ""
                    }`}
                  >
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {item.label}
                    </span>

                    <div
                      className={`absolute bottom-1 left-1/2 h-0.5 bg-[var(--main-color)] transition-all duration-300 rounded-full ${
                        isActive
                          ? "w-3/4 -translate-x-1/2"
                          : "w-0 group-hover:w-3/4 -translate-x-1/2"
                      }`}
                    />

                    {isActive && (
                      <div className="absolute -top-1 left-1/2 w-1 h-1 bg-[var(--main-color)] rounded-full -translate-x-1/2 animate-pulse" />
                    )}

                    <div className="absolute inset-0 bg-[var(--main-color)] rounded-lg blur opacity-0 transition-opacity duration-300 -z-10" />
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
