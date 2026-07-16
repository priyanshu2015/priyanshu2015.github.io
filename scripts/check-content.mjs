#!/usr/bin/env node
/**
 * Content invariants, checked before the build.
 *
 * The failure mode this guards against is content that builds fine but is quietly
 * broken in production: a post with no title, a date that parses to Invalid Date, an
 * image that 404s, two posts fighting over one URL. The build itself won't catch any
 * of those.
 *
 * Run by `npm run verify` and by CI on every push.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");
const PUBLIC_DIR = path.join(ROOT, "public");

const errors = [];
const warnings = [];
const seenSlugs = new Map();
const seenDescriptions = new Map();

function frontmatterOf(raw, file) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) {
    errors.push(`${file}: no frontmatter block`);
    return null;
  }
  const fm = {};
  let key = null;
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) {
      key = kv[1];
      fm[key] = kv[2];
    } else if (key && line.trim()) {
      // continuation of a `key: |` block
      fm[key] = `${fm[key] ?? ""} ${line.trim()}`.trim();
    }
  }
  return fm;
}

if (!fs.existsSync(POSTS_DIR)) {
  console.error(`No posts directory at ${POSTS_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

if (files.length === 0) {
  warnings.push("content/posts is empty — the site will build with no writing.");
}

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");

  // Slug hygiene: the filename becomes the URL.
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    errors.push(`${file}: filename must be kebab-case (lowercase, hyphens only)`);
  }
  if (seenSlugs.has(slug)) {
    errors.push(`${file}: duplicate slug, collides with ${seenSlugs.get(slug)}`);
  }
  seenSlugs.set(slug, file);

  const fm = frontmatterOf(raw, file);
  if (!fm) continue;

  if (!fm.title) errors.push(`${file}: frontmatter missing "title"`);
  if (!fm.description) {
    warnings.push(`${file}: no "description". It is used by SEO, RSS, and cards`);
  } else {
    // Three of the eight migrated posts shipped with django-sso's description,
    // copy-pasted in the original source. The description feeds the meta tag, the
    // social card, RSS, JSON-LD, and llms.txt, so a wrong one misdescribes the post
    // everywhere at once, and nothing about the page looks broken. Catch the repeat.
    const key = fm.description.trim().toLowerCase();
    if (seenDescriptions.has(key)) {
      errors.push(
        `${file}: description is identical to ${seenDescriptions.get(key)} — likely a copy-paste`
      );
    }
    seenDescriptions.set(key, file);
  }

  if (!fm.date) {
    errors.push(`${file}: frontmatter missing "date"`);
  } else if (Number.isNaN(new Date(fm.date).getTime())) {
    errors.push(`${file}: "date" is not parseable (${fm.date})`);
  }

  // Every referenced local image must exist on disk, or it 404s in production.
  const body = raw.slice(raw.indexOf("\n---\n") + 5);
  const refs = [...body.matchAll(/!\[([^\]]*)\]\((\/[^)]+)\)/g)];
  for (const [, alt, src] of refs) {
    if (!fs.existsSync(path.join(PUBLIC_DIR, src))) {
      errors.push(`${file}: image not found in public/ → ${src}`);
    }
    if (!alt.trim() || alt.trim() === "IMAGE_ALT") {
      errors.push(`${file}: image has no meaningful alt text → ${src}`);
    }
  }

  if (fm.image && !fs.existsSync(path.join(PUBLIC_DIR, fm.image))) {
    errors.push(`${file}: frontmatter "image" not found in public/ → ${fm.image}`);
  }
}

for (const w of warnings) console.warn(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);

if (errors.length > 0) {
  console.error(`\n${errors.length} content error(s). Build blocked.`);
  process.exit(1);
}

console.log(
  `Content OK — ${files.length} post(s), ${warnings.length} warning(s).`
);
