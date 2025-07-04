import Image from "next/image";
import SocialIcons from "@/components/portfolio/SocialIcons";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full min-h-[700px] px-4 py-20 flex items-center justify-center transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-12 lg:gap-100  max-w-6xl w-full">
        {/* Left: Title + Image */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--portfolio-text-color)]">
            <span>About </span>
            <span className="text-[var(--main-color)] border-b-4 border-[var(--main-color)]">
              Me
            </span>
          </h1>

          <h2 className="text-2xl font-medium mt-2 text-[var(--text-light)]">
            Introduction
          </h2>

          <div className="w-[150px] h-[150px] mt-4">
            <Image
              src="/images/about.png"
              alt="About"
              width={150}
              height={150}
              className="rounded-full object-cover object-center bg-[var(--main-color)] w-full h-full"
            />
          </div>
        </div>

        {/* Right: Text + Social Icons */}
        <div className="text-center md:text-left text-[var(--portfolio-text-color)] max-w-xl">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl pb-3 leading-relaxed">
            I&apos;m a <strong>tech enthusiast</strong> currently pursuing my
            MCA.
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl pb-6 leading-relaxed">
            I love solving problems and being creative with technology.
          </p>

          <SocialIcons />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
