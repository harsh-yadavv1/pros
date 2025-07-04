"use client";

import NavBar from "../components/portfolio/NavBar";
import HeroSection from "../components/portfolio/HeroSection";
import AboutSection from "../components/portfolio/AboutSection";
import ServicesSection from "../components/portfolio/ServicesSection";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import ContactSection from "../components/portfolio/ContactSection";

export default function HomeClient() {
  return (
    <>
      <NavBar />

      <main className="transition-colors duration-300">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>

      <footer className="text-center text-[var(--white)] bg-[var(--black)] text-sm py-4 transition-colors duration-300">
        © {new Date().getFullYear()} All rights reserved.
      </footer>
    </>
  );
}
