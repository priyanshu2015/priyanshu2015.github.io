import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Reads the downloadable skills off the filesystem at build time.
 *
 * content/skills/<slug>/SKILL.md *is* the skill: the page, its step-by-step view and
 * the zip (scripts/pack-skills.mjs) all come from that folder, so dropping in a new
 * one is the whole job.
 */

const SKILLS_DIR = path.join(process.cwd(), "content", "skills");

export type Skill = {
  slug: string;
  title: string;
  description: string;
  /** Text between the title and the first section, if any. */
  intro: string;
  /** One per "## " section of SKILL.md, in order. */
  steps: { title: string; body: string }[];
};

function parse(slug: string): Skill {
  const file = path.join(SKILLS_DIR, slug, "SKILL.md");
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (!data.description) throw new Error(`${slug}/SKILL.md: frontmatter is missing "description"`);

  // Only split on headings outside code fences, so a "## " inside an example stays put.
  const sections: string[][] = [[]];
  let fenced = false;
  for (const line of content.split("\n")) {
    if (line.startsWith("```")) fenced = !fenced;
    if (!fenced && line.startsWith("## ")) sections.push([]);
    sections[sections.length - 1].push(line);
  }

  const [head, ...rest] = sections.map((lines) => lines.join("\n").trim());
  const title = head.match(/^# (.+)$/m)?.[1] ?? slug;

  return {
    slug,
    title,
    description: String(data.description).trim(),
    intro: head.replace(/^# .+$/m, "").trim(),
    steps: rest.map((section) => {
      const [heading, ...body] = section.split("\n");
      return { title: heading.slice(3).trim(), body: body.join("\n").trim() };
    }),
  };
}

export function getAllSkills(): Skill[] {
  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => parse(d.name))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getSkill(slug: string): Skill | undefined {
  return getAllSkills().find((s) => s.slug === slug);
}

/** Whole sentences up to `max`, else cut at a word. For cards and search snippets. */
export function summarize(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/[\s,]+\S*$/, "")}…`;
}
