"use client";

const services = [
  {
    icon: "bxs-file-html",
    title: "Website Designer",
    desc: "Skilled in HTML, CSS, JS",
  },
  {
    icon: "bxl-windows",
    title: "Computer Applications",
    desc: "Developer with strong problem-solving",
  },
  {
    icon: "bxs-data",
    title: "MySQL",
    desc: "DB design & optimization expert",
  },
  {
    icon: "bxl-java",
    title: "Java Developer",
    desc: "Experienced with Java and Spring",
  },
  {
    icon: "bxs-videos",
    title: "Video Editing",
    desc: "Craft compelling visual stories",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="w-full min-h-[100vh] flex items-center justify-center px-6 sm:px-10 pt-24 sm:pt-0 my-10 sm:my-0  transition-colors duration-300"
    >
      <div className="w-full max-w-6xl">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--portfolio-text-color)]">
            <span>Our </span>
            <span className="text-[var(--main-color)] border-b-4 border-[var(--main-color)]">
              Services
            </span>
          </h1>
          <p className="mt-5 text-lg max-w-xl mx-auto text-[var(--text-light)]">
            What I can offer you as a developer
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-[var(--text-lightt)] rounded-lg shadow-md hover:shadow-xl transition-all p-6 text-center hover:scale-[1.02] h-full"
            >
              <i
                className={`bx ${service.icon} text-4xl text-[var(--main-color)] mb-4`}
              />
              <h2 className="text-xl font-semibold mb-2 text-[var(--portfolio-text-color)]">
                {service.title}
              </h2>
              <p className="text-sm text-[var(--text-light)]">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
