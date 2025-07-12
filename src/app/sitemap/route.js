// src/app/sitemap.xml/route.js
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = await getAllPosts();

  const siteUrl = "https://www.heyharsh.com";

  const urls = posts.map((post) => {
    const lastMod = post.date
      ? new Date(post.date).toISOString()
      : new Date().toISOString(); // fallback

    return `<url>
  <loc>${siteUrl}/${post.slug}</loc>
  <lastmod>${lastMod}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
