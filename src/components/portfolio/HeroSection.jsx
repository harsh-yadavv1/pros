"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Typewriter from "./Typewriter";

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center px-4 pt-12 sm:pt-20 pb-16 transition-colors duration-300"
    >
      {/* Profile Image */}
      <div className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] aspect-square mt-12 rounded-full overflow-hidden bg-[var(--main-color)] hover:drop-shadow-[0_0_15px_var(--main-color)] transition-all duration-300">
        <Image
          src="/images/cirlogo.png"
          alt="Profile"
          width={300}
          height={300}
          className="w-full h-full object-cover object-[40px_3%] rounded-full"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center text-center mt-6 max-w-4xl w-full px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[var(--portfolio-text-color)]">
          It&apos;s <span className="text-[var(--main-color)]">Harsh</span>
        </h1>

        <Typewriter />

        <p className="mt-3 mb-4 text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-3xl leading-relaxed text-[var(--text-light)]">
          To solve problems in a creative and effective manner in a challenging
          position. <br /> I enjoy creative problem solving and working on
          multiple projects.
        </p>

        {isMounted && (
          <p className="text-sm text-[var(--text-light)]">
            Page loaded at: {new Date().toLocaleString()}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
          <a
            href="mailto:hyadav067@hotmail.com"
            className="inline-flex items-center justify-center 
              rounded-md bg-[var(--main-color)] 
              font-semibold text-sm sm:text-base md:text-base 
              px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 
              shadow transition-transform duration-300 transform 
              hover:scale-105 hover:shadow-lg will-change-transform"
            style={{ color: "var(--accent-color)" }}
          >
            Hire Me
          </a>

          <a
            href="https://drive.google.com/file/d/1LeWdWKhzTTwpIUtuUGd_Say92bfmPhKr/view?usp=sharing"
            className="cv-button will-change-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
