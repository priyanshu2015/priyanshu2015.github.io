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

`end: "Present"` isn't only a label. It also drives the `worksFor` field in the
structured data that search engines and LLMs read.

**Don't describe how a live product is built.** For anything still running (Prysm), write
what it does for the person using it, not the internals: no framework names, no pipeline
architecture, no latency or performance tricks. "A voice assistant that answers in 11
languages" is a capability. "Streaming speech to text to LLM to speech, buffered ten words
at a time" is a recipe, and this page is indexed by everyone, competitors included.

A resume is handed to one company. This page is public and permanent, so the bar is
different. Capabilities, scale, and outcomes are fair game; implementation is not.

**Add press coverage to a job** with `links`. Someone else vouching for you beats another
adjective, so this is worth doing whenever it exists:

```ts
links: [
  {
    label: "tanX hits $1B quarterly trading volume",
    href: "https://...",
    source: "GlobeNewswire",   // the masthead is the credential; it leads
  },
],
```

Don't add scraped article thumbnails. The Forbes piece's own preview image is a photo of
Brine's founders, and putting a picture of three other people on your page implies they're
you or your team.

### Change the bio

- `description` — the one line under your name. Also the site's meta description and the
  social card subtitle. Keep it to one line.
- `summary` — the About paragraph. Plain prose, no markdown.

### Change the numbers

The `stats` array. Four of them fit the grid neatly.

```ts
{ value: "10K+", label: "YouTube subscribers" },
{ value: "Top 1%", label: "On Topmate", href: "https://topmate.io/..." },  // href optional
```

An `href` turns the label into a link so the claim can be checked, which is the whole
reason the number is on the page. Add one wherever the proof is public.

Keep these honest and current. A stale number is worse than no number.

### Add a project

An object in `projects`, newest first. `links` and `technologies` can be empty arrays.

**Open with the problem, not the stack.** "You own four funds, so you are diversified.
Except three of them hold the same five large-caps" earns a read; "a portfolio analysis
tool built with Python" doesn't. A question works well for research write-ups.

**`image` is optional and should stay that way.** Set it only where a real artifact
exists:

```ts
image: {
  src: "/images/projects/portfolio-xray.jpg",
  alt: "The Portfolio X-Ray dashboard showing sector, market-cap and geographic look-through",
},
```

The research write-ups have nothing to screenshot, and generating a picture to fill the
gap would be decoration pretending to be evidence, which is the opposite of what the
section is for. A project with no `image` just renders as text, which is fine.

Resize screenshots before committing (aim under ~200KB; images aren't optimised at build
time). The image is cropped to 16:9 from the top in CSS, so put the good part up there.

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

This happens automatically on every build too. The manual command is just for when you
want to look at `public/og.png` before pushing.

## Regenerate the favicon

```bash
npm run icons
```

Writes `favicon.ico`, `favicon-32x32.png`, `apple-icon-180x180.png`, and
`android-icon-192x192.png`: a white "PG" in Geist Mono on near-black, the same typeface
the site uses for dates and labels. Output is committed, so you only need this if the mark
changes. Unlike the social card, it does **not** run on every build, because it never
changes on its own.
