# Editing the site

Everything the site says lives in two places:

- **`src/data/resume.ts`** — the homepage: bio, numbers, work, projects, education
- **`content/posts/*.mdx`** — the blog, one file per post

You shouldn't need to open anything in `src/components/` to change content. If you find
yourself editing a component to change words, something has gone wrong — the words should
be coming from one of the two places above.

After any change:

```bash
npm run verify    # typecheck + content check + build
```

If that passes, push to `main`. The site redeploys itself in a couple of minutes.

---

## Add a blog post

1. Create `content/posts/my-post-title.mdx`. **The filename becomes the URL**, so
   `my-post-title.mdx` → `/blog/my-post-title`. Lowercase with hyphens, always.

2. Start with frontmatter:

```mdx
---
title: What I learned about connection pooling
description: |
  A short summary. Shows up in search results, the RSS feed, and social cards.
date: 2026-07-20T00:00:00.000Z
image: /images/blogs/my-post-title/thumbnail.png
tags: ["PostgreSQL", "Performance"]
draft: false
---

Your post starts here. Markdown, plus JSX if you want it.
```

3. Write. That's it — the homepage, `/blog`, the RSS feed, the sitemap, and `llms.txt`
   all pick it up automatically. There's no list to add it to.

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Also the `<h1>` and the social card |
| `description` | no, but do it | Used by search engines, RSS, and cards |
| `date` | yes | ISO 8601. Sorts the post; must parse as a real date |
| `image` | no | The social card. Falls back to the site card if absent |
| `tags` | no | Shown under the title |
| `draft` | no | `true` hides it from the site entirely. Defaults to `false` |

### Images in posts

Put them in `public/images/blogs/<slug>/`, reference them from the root:

```mdx
![A dashboard showing connection pool saturation](/images/blogs/my-post-title/pool.png)
```

**Always write real alt text describing what the image shows.** `npm run check:content`
fails the build if alt text is missing, and it's checked because the original posts all
shipped with `IMAGE_ALT` as their alt text — which is worse than nothing for anyone using
a screen reader.

Images aren't optimised at build time (static export can't), so resize before committing.
Aim under ~200KB.

### Write a draft

Set `draft: true`. It stays out of the site — no page, no feed, no sitemap — until you
flip it to `false`.

---

## Update the homepage

All in `src/data/resume.ts`. It's typed, so if you get a field wrong, `npm run verify`
tells you exactly where.

### Add a job

Add an object to the top of the `work` array (newest first):

```ts
{
  company: "Company Name",
  href: "https://company.com",        // optional
  logoUrl: "/images/work/company.png", // optional
  title: "What you did there",
  start: "Jan 2027",
  end: "Present",                      // "Present" marks it as current
  description: "What you actually built. Specifics beat adjectives.",
  video: "https://youtube.com/watch?v=...", // optional, renders click-to-load
},
```

`end: "Present"` isn't only a label — it also drives the `worksFor` field in the
structured data that search engines and LLMs read.

### Change the bio

- `description` — the one line under your name. Also the site's meta description and the
  social card subtitle. Keep it to one line.
- `summary` — the About paragraph. Plain prose, no markdown.

### Change the numbers

The `stats` array. Four of them fit the grid neatly.

```ts
{ value: "10K+", label: "YouTube subscribers" },
```

Keep these honest and current. A stale number is worse than no number.

### Add a project

An object in `projects`, newest first. `links` and `technologies` can be empty arrays.

---

## Things that will fail the build

This is deliberate — better a red CI run than a broken page.

| What | Why |
|---|---|
| Post with no `title` or `date` | Can't render or sort it |
| `date` that isn't a real date | Would show "Invalid Date" |
| Filename that isn't kebab-case | It's the URL |
| Two posts with the same slug | They'd fight over one URL |
| Image referenced but not in `public/` | 404 in production |
| Image with missing or `IMAGE_ALT` alt text | Inaccessible |
| Missing field in `resume.ts` | Typecheck catches it |

Run `npm run verify` before pushing and you'll see all of it locally first.

---

## Regenerate the social card

If you change your name or `description`, regenerate the card:

```bash
npm run og
```

This happens automatically on every build too — the manual command is just for when you
want to look at `public/og.png` before pushing.
