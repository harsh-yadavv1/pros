"use client";

import { useState, useEffect } from "react";
import NavBar from "../components/portfolio/NavBar";
import HeroSection from "../components/portfolio/HeroSection";
import AboutSection from "../components/portfolio/AboutSection";
import ServicesSection from "../components/portfolio/ServicesSection";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import ContactSection from "../components/portfolio/ContactSection";
import AiChat from "../components/AiChat"; // ✅ AI chat component

export default function HomeClient() {
  const [showChat, setShowChat] = useState(false);

  // 🛡️ Prevent background scroll when chat is open
  useEffect(() => {
    if (showChat) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [showChat]);

  return (
    <>
      {/* ⬇️ NavBar with lower z-index */}
      <div className="relative z-30">
        <NavBar />
      </div>

      {/* ⬇️ Page Content */}
      <main className="transition-colors duration-300">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>

      {/* ⬇️ Footer */}
      <footer className="text-center text-[var(--white)] bg-[var(--black)] text-sm py-4 transition-colors duration-300">
        © {new Date().getFullYear()} All rights reserved.
      </footer>

      {/* ⬇️ Floating AI Chat Toggle Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] 
                     bg-[var(--main-color)] text-white rounded-full w-13 h-13 sm:w-14 sm:h-14 
                     flex items-center justify-center shadow-lg hover:bg-[var(--accent-color)] 
                     transition duration-300 ease-in-out"
          aria-label="Toggle AI Chat"
        >
          <img
            src="/harshai.png"
            alt="HarshAI"
            className="w-full object-cover"
          />
        </button>
      )}

      {/* ⬇️ AI Chat Popup */}
      {showChat && (
        <div
          className="fixed bottom-0 right-3 sm:bottom-24 sm:right-6 
                     z-[9999] w-[95vw] sm:w-[360px] max-w-full"
        >
          <AiChat onClose={() => setShowChat(false)} />
        </div>
      )}
    </>
  );
}
