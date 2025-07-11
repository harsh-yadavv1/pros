// src/app/[slug]/page.jsx
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogNavbar from "@/components/blog/BlogNavbar";
import BlogFooter from "@/components/blog/BlogFooter";
import ShareButton from "@/components/blog/ShareButton";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogClientWrapper from "@/components/blog/BlogClientWrapper";

// ✅ Static paths for blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// ✅ Dynamic metadata for SEO + Open Graph + Twitter
export async function generateMetadata(props) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Harsh's Blog",
      description: "This post could not be found.",
    };
  }

  return {
    title: `${post.title} | Harsh's Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

// ✅ Blog Post Page
export default async function BlogPostPage(props) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <BlogLayout>
      <BlogClientWrapper />

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-[var(--portfolio-bg-color)] border-b border-[var(--portfolio-text-color)]/10">
        <BlogNavbar />
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-10 pt-[72px] md:pt-[80px] scroll-mt-[80px]">
        {/* Breadcrumb with ARIA */}
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-[var(--portfolio-text-color)]/60 mb-6"
        >
          <a href="/" className="text-[var(--main-color)] hover:underline">
            Home
          </a>
          &gt;
          <a href="/blog" className="text-[var(--main-color)] hover:underline">
            Blog
          </a>
          &gt;
          <span className="text-[var(--portfolio-text-color)]/80">
            {post.title}
          </span>
        </nav>

        {/* Article content */}
        <article>
          {/* Title */}
          <h1 className="text-3xl font-bold text-[var(--portfolio-text-color)] mb-4">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 text-sm text-[var(--portfolio-text-color)]/60 border-b border-[var(--portfolio-text-color)]/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[var(--main-color)] text-[var(--portfolio-bg-color)] text-xs font-semibold flex items-center justify-center">
                H
              </div>
              <span>Admin</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>{post.formattedDate}</span>
            <span className="hidden sm:inline">•</span>
            <span>{post.readingTime || "3 min read"}</span>
            <div className="w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0">
              <ShareButton title={post.title} />
            </div>
          </div>

          {/* Badge */}
          {post.badge && (
            <div className="inline-block text-xs text-[var(--portfolio-text-color)]/70 bg-[var(--portfolio-text-color)]/10 px-3 py-1 rounded-full mb-6">
              {post.badge}
            </div>
          )}

          {/* Cover Image */}
          {post.image && (
            <div className="w-full mb-8">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={500} // Just a hint — Next.js adjusts it responsively
                className="rounded-md w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Post Body (sanitized HTML content) */}
          <div
            className="space-y-4 text-[var(--portfolio-text-color)] 
            [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4 
            [&_p]:text-base [&_p]:text-[var(--portfolio-text-color)]/80 
            [&_code]:bg-[var(--portfolio-text-color)]/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded 
            [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--portfolio-text-color)]/20 
            [&_blockquote]:pl-4 [&_blockquote]:text-[var(--portfolio-text-color)]/60"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>
      {/* ✅ Related Posts (outside article for layout consistency) */}
      <RelatedPosts posts={relatedPosts} />
      {/* Footer */}
      <footer className="mt-auto">
        <BlogFooter />
      </footer>
    </BlogLayout>
  );
}
