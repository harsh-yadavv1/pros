// src/components/common/SocialIcons.jsx
"use client";

const socialLinks = [
  { href: "https://github.com/harsh-yadav-url", icon: "bxl-github" },
  {
    href: "https://www.linkedin.com/in/harsh-yadav-url",
    icon: "bxl-linkedin-square",
  },
  {
    href: "https://www.instagram.com/harsh_yadav.dev?igsh=MXRoZ3I3ZHMwYzV3aA==",
    icon: "bxl-instagram",
  },
  { href: "https://youtube.com/@harshyadav.codecraft", icon: "bxl-youtube" },
];

export default function SocialIcons() {
  return (
    <div className="flex justify-center md:justify-start items-center gap-3 mt-1 flex-wrap">
      {socialLinks.map((social, i) => (
        <a href={social.href} target="_blank" key={i} rel="noopener noreferrer">
          <i
            className={`bx ${social.icon} text-[var(--portfolio-text-color)] hover:text-[var(--portfolio-bg-color)] text-[22px] p-[10px] rounded bg-[var(--accent-color)] hover:bg-[var(--main-color)] transition-all`}
          />
        </a>
      ))}

      {/* Twitter X */}
      <a
        href="https://twitter.com/harshyadav067"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-[42px] h-[42px] bg-[var(--accent-color)] hover:bg-[var(--main-color)] rounded flex items-center justify-center p-[10px] transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
          className="text-[var(--portfolio-text-color)] group-hover:text-[var(--portfolio-bg-color)] transition-colors duration-300"
        >
          <path d="M13.68 10.62 20.24 3h-1.55L13 9.62 8.45 3H3.19l6.88 10.01L3.19 21h1.55l6.01-6.99 4.8 6.99h5.24l-7.13-10.38Zm-2.13 2.47-.7-1-5.54-7.93H7.7l4.47 6.4.7 1 5.82 8.32H16.3z"></path>
        </svg>
      </a>

      {/* Threads */}
      <a
        href="https://www.threads.net/@harsh_yadav.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-[42px] h-[42px] bg-[var(--accent-color)] hover:bg-[var(--main-color)] rounded flex items-center justify-center p-[10px] transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
          className="text-[var(--portfolio-text-color)] group-hover:text-[var(--portfolio-bg-color)] transition-colors duration-300"
        >
          <path d="M16.39 11.27c-.09-.04-.17-.08-.26-.12-.15-2.84-1.71-4.47-4.32-4.49h-.04c-1.56 0-2.86.67-3.66 1.88l1.44.98c.6-.91 1.53-1.1 2.22-1.1h.02c.86 0 1.51.26 1.93.74.31.35.51.84.61 1.46-.76-.13-1.59-.17-2.47-.12-2.48.14-4.08 1.59-3.97 3.6.05 1.02.56 1.9 1.43 2.47.73.48 1.68.72 2.66.67 1.3-.07 2.32-.57 3.03-1.47.54-.69.88-1.58 1.03-2.7.62.37 1.08.86 1.33 1.45.43 1 .46 2.65-.89 4-1.18 1.18-2.6 1.69-4.74 1.7-2.38-.02-4.17-.78-5.34-2.26-1.09-1.39-1.66-3.4-1.68-5.97.02-2.57.59-4.58 1.68-5.97 1.17-1.49 2.97-2.25 5.34-2.26 2.39.02 4.22.78 5.43 2.28.59.73 1.04 1.65 1.34 2.73l1.68-.45c-.36-1.32-.92-2.46-1.69-3.4-1.56-1.91-3.83-2.89-6.76-2.91h-.01c-2.92.02-5.17 1-6.68 2.92C3.71 6.64 3.01 9.02 2.99 12c.02 3 .72 5.37 2.06 7.08C6.56 21 8.81 21.98 11.73 22h.01c2.6-.02 4.43-.7 5.94-2.21 1.98-1.97 1.92-4.45 1.26-5.97-.47-1.09-1.36-1.97-2.58-2.56Zm-4.49 4.22c-1.09.06-2.22-.43-2.27-1.47-.04-.78.55-1.64 2.34-1.74.2-.01.41-.02.6-.02.65 0 1.26.06 1.81.18-.21 2.57-1.41 2.99-2.48 3.05" />
        </svg>
      </a>
    </div>
  );
}
