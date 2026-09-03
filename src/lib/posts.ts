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

// Parsed once per build, then reused. Without this, every getPostBySlug call re-reads
// and re-parses the whole directory — and each post page calls it twice (generateMetadata,
// then the page) on top of generateStaticParams, the sitemap, the feed, and llms.txt.
//
// Production only, deliberately: in `next dev` the server process is long-lived, so a
// cache here would mean a newly added post doesn't show up until you restart — which is
// exactly the workflow CONTENT.md tells you to use. During a build the files can't
// change underneath us, so caching is safe there.
let cache: Post[] | undefined;
const shouldCache = process.env.NODE_ENV === "production";

/** All published posts, newest first. Drafts are excluded from every consumer. */
export function getAllPosts(): Post[] {
  if (shouldCache && cache) return cache;
  if (!fs.existsSync(POSTS_DIR)) return [];

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseFile)
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (shouldCache) cache = posts;

  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/**
 * The homepage shows a handful; /blog shows everything.
 *
 * The posts the homepage leads with, in this order — hand-picked rather than
 * newest-first, because "what I want to be read" and "what I published last" are
 * not the same list. Unknown or drafted slugs are skipped; if none resolve, the
 * homepage falls back to the most recent posts.
 */
const FEATURED_SLUGS = [
  "celery",
  "scaling-websocket-server",
  "django-design-patterns",
  "rabbitmq",
];

export function getFeaturedPosts(count = 4): Post[] {
  const all = getAllPosts();
  const featured = FEATURED_SLUGS.map((slug) =>
    all.find((p) => p.slug === slug)
  ).filter((p): p is Post => p !== undefined);

  return featured.length > 0 ? featured.slice(0, count) : all.slice(0, count);
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
