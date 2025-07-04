import "../../styles/globals.css";
import "../../styles/portfolio.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Blog | Harsh",
  description: "Read insightful articles and tutorials by Harsh.",
  openGraph: {
    title: "Blog | Harsh",
    description: "Explore development tutorials, tech tips, and guides.",
    type: "website",
    locale: "en_US",
    url: "https://heyharsh.vercel.app/blog",
    siteName: "Harsh's Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Harsh",
    description: "Explore development tutorials, tech tips, and guides.",
    creator: "@heyharsh",
  },
};

export default function BlogLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className="blog-theme flex flex-col min-h-screen font-sans"
        data-section="blog"
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
