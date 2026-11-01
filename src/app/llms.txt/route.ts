import { DATA } from "@/data/resume";
import { getAllPosts, formatDate } from "@/lib/posts";
import { PLAYBOOK } from "@/data/playbook";
import { RESOURCES } from "@/data/resources";

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
      `### ${job.company} (${job.title}, ${job.start} to ${job.end})\n\n${job.description}`
  )
  .join("\n\n")}

## Education

${DATA.education
  .map((edu) => `- ${edu.school}: ${edu.degree}`)
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
            `- [${post.title}](${DATA.url}/blog/${post.slug}/) (${formatDate(
              post.date
            )}). ${post.description}`
        )
        .join("\n")
    : "No posts published yet."
}

## Now: ${DATA.featured.name}

${DATA.featured.href}

${DATA.featured.pitch}

${DATA.featured.clients.text} Contact: ${DATA.featured.clients.email}

## AI Playbook

The Claude skills, MCP connectors and tools I use, by use case. Full page: ${DATA.url}/playbook/

${PLAYBOOK.map(
  (cat) =>
    `### ${cat.title}\n\n${cat.blurb}\n\n${cat.steps
      .map((step, i) => `${i + 1}. ${step.title}: ${step.what} (${step.options.join(", ")})`)
      .join("\n")}\n\n${cat.items
      .map((item) => `- ${item.name}${item.href ? ` (${item.href})` : ""}: ${item.use}`)
      .join("\n")}`
).join("\n\n")}

## Resources

Talks, courses and reading I recommend. Full page: ${DATA.url}/resources/

${RESOURCES.map(
  (g) =>
    `### ${g.title}\n\n${g.items
      .map((r) => `- [${r.title}](${r.href})${r.by ? ` by ${r.by}` : ""}: ${r.note}`)
      .join("\n")}`
).join("\n\n")}

## Feeds

- RSS: ${DATA.url}/rss.xml
- Sitemap: ${DATA.url}/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
