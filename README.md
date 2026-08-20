# priyanshu2015.github.io

My personal site and blog. Next.js, exported to static HTML, served by GitHub Pages.

**Live:** <https://priyanshu2015.github.io>

If you want to change what the site *says*, you probably want [CONTENT.md](./CONTENT.md)
instead — it covers adding a post, adding a job, and editing the bio, without touching
any components.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build → static HTML in `out/` |
| `npm start` | Serve the built `out/` locally, exactly as Pages will |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check:content` | Validate post frontmatter, slugs, and images |
| `npm run og` | Regenerate `public/og.png` (the social card) |
| `npm run verify` | typecheck + content check + build. **Run this before pushing.** |

## How it works

Next.js runs with `output: "export"`, so `npm run build` produces a folder of plain HTML
files. There is no server in production — GitHub Pages just serves files. This is why
every page is real HTML with real text in it, which is what makes the site fast, indexable,
and readable by AI agents without running JavaScript.

Consequences worth knowing about, because they'll bite otherwise:

- **No server-side anything at runtime.** No API routes, no SSR, no ISR, no middleware.
- **`headers()` in `next.config.mjs` does nothing.** Static hosts send their own headers.
  Don't add it and assume it works.
- **`next/image` optimisation is off** (`images.unoptimized: true`). Optimise images
  before committing them.
- **Route handlers must set `export const dynamic = "force-static"`** so they're rendered
  once at build time and written to a file. `rss.xml` and `llms.txt` both do this.

## Layout

```
content/posts/*.mdx        The blog. One file per post. This is the index — there is no
                           list to maintain anywhere else.
src/data/resume.ts         Everything the site says about me. One typed object.
src/app/                   Routes. page.tsx (home), blog/, blog/[slug]/
src/components/            UI. Nothing here holds content.
src/lib/posts.ts           Reads content/posts at build time
src/lib/json-ld.ts         Schema.org structured data
scripts/check-content.mjs  Content invariants, run in CI
scripts/generate-og.mjs    Renders public/og.png
public/images/blogs/<slug> Post images. Note: these dirs are snake_case, matching the
                           original image paths from the old site.
```

## Deployment

Push to `main`. The workflow in `.github/workflows/deploy.yml` typechecks, validates
content, builds, and publishes to Pages. Build output is never committed.

A failing typecheck or a broken post fails the build, so a bad edit doesn't reach
production — it stops in CI.

**One-time setup:** in the repo's Settings → Pages, set Source to **GitHub Actions**.

## Contact form

The form posts to [Formspree](https://formspree.io), because a static site has no server
to receive it.

Set `NEXT_PUBLIC_FORMSPREE_ID` to your form ID (the bit after `/f/` in the Formspree
endpoint):

- **Locally:** put `NEXT_PUBLIC_FORMSPREE_ID=xxxxxxxx` in `.env.local`
- **In CI:** add a repository secret named `FORMSPREE_ID` (Settings → Secrets and
  variables → Actions)

Without it, the form degrades to a plain email link rather than silently dropping
messages.

## SEO and machine readability

- Static HTML — readable without executing JS
- Per-page metadata, canonical URLs, OpenGraph and Twitter cards
- JSON-LD: `Person` on the homepage, `BlogPosting` on each post
- `/sitemap.xml`, `/robots.txt`, `/rss.xml`
- `/llms.txt` — a plain-markdown summary for AI agents. Worth knowing this is a
  convention rather than a standard; the JSON-LD and clean HTML do the real work.

## Design

White, minimal, text-first. Geist Sans for prose, Geist Mono for anything machine-ish
(dates, labels, metadata). One blue, used only for links. No shadows, no gradients.

The constraint that keeps it coherent: **if you're adding a colour, don't.**
