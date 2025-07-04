import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Android App",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "/category/android",
  },
  {
    name: "Free Courses",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    link: "/category/courses",
  },
  {
    name: "Pc Software",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "/category/software",
  },
  {
    name: "Job Updates",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    link: "/category/jobs",
  },
];

export default function CategoryCards() {
  return (
    <section className="bg-[var(--portfolio-bg-color)] py-12 px-6 text-[var(--portfolio-text-color)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--portfolio-text-color)]">
          Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              href={cat.link}
              key={cat.name}
              className="bg-[var(--portfolio-bg-color)] text-[var(--portfolio-text-color)] rounded-xl overflow-hidden text-center border border-[var(--portfolio-text-color)]/10 hover:border-[var(--main-color)]/40 hover:shadow-lg transition duration-300"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                width={300}
                height={200}
                className="w-full h-32 object-cover"
              />
              <div className="p-4 font-semibold text-[var(--portfolio-text-color)]">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
