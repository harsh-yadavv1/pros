import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// ✅ Get all posts using index.json and fetch
export async function getAllPosts() {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL
      : window.location.origin;

  try {
    const indexRes = await fetch(`${baseUrl}/posts/index.json`);
    const slugs = await indexRes.json();

    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const res = await fetch(`${baseUrl}/posts/${slug}.md`);
        if (!res.ok) return null;

        const raw = await res.text();
        const { data } = matter(raw);

        return {
          slug,
          title: data.title || "Untitled Post",
          date: data.date || null,
          description: data.description || "",
          image: data.image || null,
          author: data.author || "Unknown",
          category: data.category || "General",
          views: data.views || 0,
          readingTime: data.readingTime || "3 min read",
          tags: data.tags || [],
        };
      })
    );

    return posts.filter(Boolean);
  } catch (err) {
    return [];
  }
}

// ✅ Get full content of a single post
export async function getPostBySlug(slug) {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL
      : window.location.origin;

  try {
    const res = await fetch(`${baseUrl}/posts/${slug}.md`);
    if (!res.ok) throw new Error("Post not found");

    const raw = await res.text();
    const { data, content } = matter(raw);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      contentHtml,
      ...data,
    };
  } catch (err) {
    return null;
  }
}
