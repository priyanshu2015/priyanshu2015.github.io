import { DATA } from "@/data/resume";
import { getAllPosts } from "@/lib/posts";

// A route handler can't run on GitHub Pages, but force-static makes Next execute it
// once at build time and write the result to out/rss.xml as a plain file.
export const dynamic = "force-static";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const updated = posts[0]?.date ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = `${DATA.url}/blog/${post.slug}/`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
${post.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(DATA.name)}</title>
    <link>${DATA.url}</link>
    <description>${escapeXml(DATA.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
    <atom:link href="${DATA.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
