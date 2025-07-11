// tailwind.config.mjs
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        cream: "var(--cream)",
        peach: "var(--peach)",
        coffee: "var(--coffee)",
        skin: "var(--skin)",
        white: "var(--white)",
        black: "var(--black)",
      },
    },
  },
  plugins: [typography],
};
