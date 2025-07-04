"use client";
import { useState, useEffect } from "react";

const words = [
  "Software Developer",
  "Web Developer",
  "UI / UX Designer",
  "Content Creator",
  "Tech Explorer",
];

export default function Typewriter() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const TYPING_SPEED = 160;
  const DELETING_SPEED = 80;
  const PAUSE_BEFORE_DELETE = 1500;
  const PAUSE_AFTER_DELETE = 500;

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && text !== currentWord) {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1));
      }, TYPING_SPEED);
    } else if (isDeleting && text !== "") {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length - 1));
      }, DELETING_SPEED);
    } else if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_BEFORE_DELETE);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, PAUSE_AFTER_DELETE);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  return (
    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mt-4 text-center text-[var(--portfolio-text-color)]">
      I'm a{" "}
      <span className="text-[var(--main-color)] border-r-2 border-[var(--main-color)] pr-1 animate-blink">
        {text}
      </span>
    </h3>
  );
}
