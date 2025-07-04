"use client";

import Image from "next/image";

const workItems = [
  {
    img: "/images/workimg1.jpg",
    title: "Designing",
    desc: "Skilled video editor with expertise in editing software.",
    link: "#",
  },
  {
    img: "/images/workimg2.jpg",
    title: "Website",
    desc: "Skilled video editor with expertise in editing software.",
    link: "#",
  },
  {
    img: "/images/workimg3.jpg",
    title: "Software",
    desc: "Skilled video editor with expertise in editing software.",
    link: "#",
  },
];

const PortfolioSection = () => {
  return (
    <section
      id="work"
      className="scroll-mt-10 min-h-[100vh] px-4 md:px-10 py-16 sm:py-20 md:py-24 lg:py-32 transition-colors duration-300"
    >
      {/* Section Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--portfolio-text-color)]">
          <span>Our </span>
          <span className="text-[var(--main-color)] border-b-4 border-[var(--main-color)]">
            Work
          </span>
        </h1>
        <p className="mt-5 text-lg max-w-xl mx-auto text-[var(--text-light)]">
          A little preview of what I’ve been building — more coming soon.
        </p>
      </div>

      {/* Work Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto px-2 sm:px-4">
        {workItems.map((item, idx) => (
          <div
            key={idx}
            className="relative h-[240px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-xl shadow-md group bg-[var(--portfolio-secondary-bg)]"
          >
            {/* Image */}
            <Image
              src={item.img}
              alt={item.title}
              width={400}
              height={350}
              loading="lazy"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-b from-[var(--black)]/60 to-[var(--main-color)] group-hover:h-full transition-all duration-500 ease-in-out overflow-hidden">
              <div className="flex flex-col items-center justify-start text-center h-full px-4 pt-2">
                <h3
                  className="text-lg sm:text-xl font-semibold "
                  style={{ color: "#f5eedd" }}
                >
                  {item.title}
                </h3>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-10 sm:mt-16 md:mt-20 flex flex-col items-center justify-center">
                  <p
                    className="text-sm sm:text-base  text-center max-w-xs"
                    style={{ color: "#f5eedd" }}
                  >
                    {item.desc}
                  </p>
                  <a
                    href={item.link}
                    className="mt-4 bg-transparent  w-[40px] h-[40px] rounded-full flex items-center justify-center text-xl border-2  hover:bg-[var(--blog-highlight)]  hover:border-[var(--portfolio-text-color)] transition duration-300"
                    style={{ color: "#f5eedd", borderColor: "#f5eedd" }}
                  >
                    <i className="bx bx-link" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="mt-12 text-center">
        <button
          href="#"
          className="inline-block border-2 border-[var(--portfolio-text-color)] hover:border-[var(--text-lightt)] text-[var(--portfolio-text-color)] bg-transparent px-6 py-2 rounded-full hover:bg-[var(--main-color)] hover:text-[var(--text-lightt)] transition font-semibold"
        >
          See more
        </button>
      </div>
    </section>
  );
};

export default PortfolioSection;
