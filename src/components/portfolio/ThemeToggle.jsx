"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div
      className="relative w-[40px] h-[16px] rounded-full flex items-center p-[2px] cursor-pointer darkmode-toggle"
      style={{
        backgroundColor: isDark
          ? "var(--portfolio-text-color)"
          : "var(--portfolio-text-color)",
        border: "1px solid var(--main-color)",
        transition: "all 0.3s ease",
      }}
      onClick={toggleTheme}
    >
      <i
        className="bx bxs-moon moon-icon text-[13px]"
        style={{
          color: "var(--portfolio-bg-color)",
          opacity: isDark ? 0 : 1,
        }}
      />
      <i
        className="bx bx-sun sun-icon text-[14px]"
        style={{
          color: "var(--portfolio-bg-color)",
          opacity: isDark ? 1 : 0,
        }}
      />
    </div>
  );
};

export default ThemeToggle;
