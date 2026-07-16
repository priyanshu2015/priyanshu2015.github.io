import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Reads blog posts off the filesystem at build time.
 *
 * There is no index to maintain: content/posts/*.mdx *is* the index. Drop a file in,
 * and the homepage, /blog, the RSS feed, the sitemap, and llms.txt all pick it up.
 *
 * Server-only. Everything here runs during `next build` and never reaches the browser.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO 8601. Sortable and safe for <time datetime>. */
  date: string;
  image?: string;
  tags: string[];
  draft: boolean;
};

export type Post = PostMeta & {
  content: string;
};

function parseFile(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  if (!data.title) throw new Error(`${filename}: frontmatter is missing "title"`);
  if (!data.date) throw new Error(`${filename}: frontmatter is missing "date"`);

  const date = new Date(data.date);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${filename}: "date" is not a valid date (${data.date})`);
  }

  return {
    slug,
    title: String(data.title).trim(),
    // The `description: |` block style in the migrated posts yields a trailing newline.
    description: String(data.description ?? "").trim(),
    date: date.toISOString(),
    image: data.image ? String(data.image) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    content,
  };
}

/** All published posts, newest first. Drafts are excluded from every consumer. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseFile)
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** The homepage shows a handful; /blog shows everything. */
export function getRecentPosts(count = 4): Post[] {
  return getAllPosts().slice(0, count);
}

/** "4 Jun 2024" — short, unambiguous across locales, no ordinal suffixes. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Rough read time. Prose only; code blocks are skimmed, not read word by word. */
export function readingTime(content: string): number {
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const words = withoutCode.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
