#!/usr/bin/env node
/**
 * Renders the social cards: public/og.png for the homepage, public/og/*.png for the
 * Playbook and Resources pages, and public/og/blog/<slug>.png for every post that has
 * no `image` of its own.
 *
 * Why a script and not Next's app/opengraph-image.tsx convention: that convention emits
 * an *extensionless* file (out/opengraph-image). Next's own server sets the Content-Type
 * header for it, but GitHub Pages infers Content-Type from the file extension, so the
 * card would be served as application/octet-stream and every social scraper would
 * reject it. Writing a real .png into public/ sidesteps that entirely.
 *
 * Posts with a frontmatter `image` keep using it; the card is only the fallback.
 *
 * Runs automatically before each build (see the "prebuild" script). Committing the
 * output is fine; it's regenerated whenever name or description changes.
 */
import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "@vercel/og";
import matter from "gray-matter";

// resume.ts is TypeScript, and this script is plain node — read the two fields we need
// rather than pulling in a TS loader for a build step this small.
const resumeSrc = fs.readFileSync(
  path.join(process.cwd(), "src", "data", "resume.ts"),
  "utf8"
);

function field(name) {
  const match = resumeSrc.match(new RegExp(`\\n  ${name}:\\s*\\n?\\s*"([^"]+)"`));
  if (!match) throw new Error(`generate-og: could not read "${name}" from resume.ts`);
  return match[1];
}

const name = field("name");
const description = field("description");

/** One 1200x630 card: a small label, the title, a line of supporting text, and the URL. */
function card({ label, title, subtitle }) {
  return new ImageResponse(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        },
        children: [
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column" },
              children: [
                label
                  ? {
                      type: "div",
                      props: {
                        style: { fontSize: 24, color: "#666666", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28 },
                        children: label,
                      },
                    }
                  : null,
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: title.length > 48 ? 60 : 72,
                      fontWeight: 600,
                      color: "#0a0a0a",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      maxWidth: 1040,
                    },
                    children: title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { fontSize: 30, color: "#666666", marginTop: 28, maxWidth: 980, lineHeight: 1.4 },
                    children: subtitle,
                  },
                },
              ].filter(Boolean),
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #e5e5e5",
                paddingTop: 32,
                fontSize: 24,
                color: "#666666",
              },
              children: [
                { type: "div", props: { children: name } },
                { type: "div", props: { children: "priyanshu2015.github.io" } },
              ],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630 }
  );
}

async function write(relPath, opts) {
  const buffer = Buffer.from(await card(opts).arrayBuffer());
  const out = path.join(process.cwd(), "public", relPath);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buffer);
  return buffer.length;
}

// Supporting text runs long in frontmatter; keep the card to two lines or so.
function clip(text, max = 150) {
  const t = String(text ?? "").replace(/\s+/g, " ").trim();
  // Prefer whole sentences: as many as fit, so the card never stops mid-thought.
  const sentences = t.match(/[^.!?]+[.!?]+/g) ?? [t];
  let out = "";
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  if (out.trim()) return out.trim();
  return t.length > max ? `${t.slice(0, max - 1).replace(/\s+\S*$/, "")}…` : t;
}

let count = 0;
await write("og.png", { title: name, subtitle: description });
count++;
await write("og/playbook.png", {
  label: "AI Playbook",
  title: "Claude skills, MCP connectors and tools I actually use",
  subtitle: "Step-by-step workflows for video editing, coding, frontend, research and markets.",
});
await write("og/resources.png", {
  label: "Resources",
  title: "Talks, courses and reading I recommend",
  subtitle: "For AI engineering, serving models and building backend systems. Updated regularly.",
});
count += 2;

const postsDir = path.join(process.cwd(), "content", "posts");
for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))) {
  const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
  if (data.image || data.draft === true) continue;
  await write(`og/blog/${file.replace(/\.mdx$/, "")}.png`, {
    label: "Writing",
    title: String(data.title),
    subtitle: clip(data.description),
  });
  count++;
}

console.log(`Wrote ${count} social cards to public/`);
