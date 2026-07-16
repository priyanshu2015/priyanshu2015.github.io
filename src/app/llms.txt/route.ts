import { DATA } from "@/data/resume";
import { getAllPosts, formatDate } from "@/lib/posts";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-markdown summary of this site for LLMs and AI agents.
 *
 * Worth being honest about what this is: a convention, not a standard. Adoption is
 * uneven and no major crawler guarantees it. It costs nothing to generate from data we
 * already have, so it's here — but the JSON-LD and the plain static HTML are what
 * actually do the work of being machine-readable.
 */
export function GET() {
  const posts = getAllPosts();

  const body = `# ${DATA.name}

> ${DATA.description}

${DATA.summary}

## Facts

- Name: ${DATA.name}
- Website: ${DATA.url}
- Location: ${DATA.location}
- Contact: ${DATA.contact.email}
${DATA.contact.social.map((s) => `- ${s.name}: ${s.url}`).join("\n")}

## Work

${DATA.work
  .map(
    (job) =>
      `### ${job.company} — ${job.title} (${job.start} – ${job.end})\n\n${job.description}`
  )
  .join("\n\n")}

## Education

${DATA.education
  .map((edu) => `- ${edu.school} — ${edu.degree} (${edu.start} – ${edu.end})`)
  .join("\n")}

## Projects

${DATA.projects
  .map(
    (p) =>
      `### ${p.title} (${p.dates})${p.href ? `\n\n${p.href}` : ""}\n\n${p.description}\n\nTech: ${p.technologies.join(", ")}`
  )
  .join("\n\n")}

## Writing

${
  posts.length > 0
    ? posts
        .map(
          (post) =>
            `- [${post.title}](${DATA.url}/blog/${post.slug}/) — ${formatDate(
              post.date
            )}. ${post.description}`
        )
        .join("\n")
    : "No posts published yet."
}

## Feeds

- RSS: ${DATA.url}/rss.xml
- Sitemap: ${DATA.url}/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
