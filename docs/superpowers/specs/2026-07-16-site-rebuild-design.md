# priyanshu2015.github.io — v2 rebuild

**Date:** 2026-07-16
**Branch:** `v2`
**Status:** Approved design, ready for implementation planning

## Problem

The current site is a single 44KB hand-written `index.html` (Bootstrap-era, particles.js,
dark/purple). Its content is frozen at 2022: it calls Priyanshu a "Product Developer",
lists Brine as "work in progress", and claims 5K YouTube subscribers. Since then he has
been a founding engineer at TanX, founded Prysm Finance, moved to Germany, and started an
MSc at Göttingen. None of that is on the site.

Meanwhile a second codebase (`personal-website`, Next 12 Pages Router) holds newer content
and 8 substantial technical blog posts, but is itself partly stale. Two sites competing for
the same identity split SEO and double maintenance.

## Goals

1. One canonical site at `priyanshu2015.github.io`, replacing both the old `index.html` and
   `personal-website`.
2. Minimal, crisp, white, with a "code/tech" feel earned through typography rather than
   costume. Knowledge over ornament.
3. Structured to become writing-first as the blog grows, without looking empty today.
4. Scalable and maintainable from GitHub, with documentation aimed at the author.
5. SEO-friendly and cleanly readable by AI agents/crawlers.
6. Presents Priyanshu as a person with credibility — **not** as a job seeker.

## Non-goals

- Selling anything. No services block, no Topmate booking, no BuyMeACoffee, no YouTube
  subscribe CTA.
- A skills/tech-stack badge wall.
- Preserving the old visual design in any form.
- A CMS or any runtime backend.

## Reference points

- <https://manassaloi.com/> and <https://rnikhil.com/> — single narrow column, no hero,
  nav as plain text links, writing as bare `title — date` rows.
- Magic UI portfolio template (`magicuidesign-portfolio-5ef12e4`) — everything on one
  `max-w-2xl` page, driven by a single typed data file.
- Magic UI blog template (`magicuidesign-blog-template-bc0cb81`) — reference only; its
  fumadocs infrastructure is not used.

## Architecture

### Stack

- Next.js 16, App Router, TypeScript, Tailwind v4.
- `output: 'export'` → static HTML in `out/`. No server, no ISR, no route handlers.
- No `basePath`: a `<user>.github.io` repo serves from root.
- `images.unoptimized: true` (required by static export).
- Deployed by GitHub Actions (`actions/deploy-pages`) on push to `main`. Build output is
  never committed.

### Content pipeline

MDX in `content/posts/*.mdx`, read at build time via `gray-matter` +
`next-mdx-remote/rsc`. Syntax highlighting by `rehype-pretty-code` (Shiki) — runs at build
time, so code blocks ship zero client JS.

Deliberately **not** fumadocs (assumes a docs-site shell we don't want) and **not**
content-collections. Both are heavier than 8 posts justify. We borrow Magic UI's components
and visual restraint, not its infrastructure.

### Routes

| Route | Contents |
|---|---|
| `/` | hero → about → experience → education → projects → recent writing (4) → contact |
| `/blog` | all posts, `title` + `date` rows |
| `/blog/[slug]` | a post |
| `/rss.xml`, `/sitemap.xml`, `/robots.txt`, `/llms.txt` | generated |

Single column, `max-w-2xl` (672px), sections stacked. No other routes.

### Data model

`src/data/resume.ts` — one typed `const` object driving every section:

```ts
export const DATA = {
  name, initials, url, location,
  description,   // one-liner under the name
  summary,       // About paragraph (markdown)
  avatarUrl,
  stats:      [{ value, label }],
  contact:    { email, social: { GitHub, LinkedIn } },
  work:       [{ company, href, logoUrl, title, start, end, description, video? }],
  education:  [{ school, href, logoUrl, degree, start, end }],
  projects:   [{ title, href, dates, description, technologies, links }],
} as const
```

Adding a job is one object in an array. TypeScript catches a missing field at build time,
and the build runs in CI, so a malformed edit fails the deploy rather than shipping.

Post frontmatter matches the existing files exactly (`title`, `description`, `date`), plus
`draft` and `tags`. Drop a file in `content/posts/`, push, it's live. Sorting, the
homepage's recent-4, `/blog`, RSS, and the sitemap all derive from the filesystem — no
index to hand-maintain.

## Visual design

**Type.** Geist Sans for prose, Geist Mono for machine-ish text — dates, section labels,
tags, post metadata, nav. Both self-hosted via the `geist` npm package; no external font
request. The mono/sans split *is* the tech feel — no terminal green, no fake shell prompts,
no monospace-everything.

**Color.** White `#fff` background, near-black `#0a0a0a` text, `#666` metadata, hairline
`#e5e5e5` borders. A plain blue for links — the only accent, and it means exactly one
thing: this is a link. The old site's purple (`#7218e5`) is dropped.

**Theme.** Light by default, with a dark toggle via `next-themes`. Requires
`suppressHydrationWarning` on `<html>` under static export. Both palettes are
first-class — dark is not an afterthought, since the technical posts are long reads.

**Density.** Generous vertical rhythm between sections, tight within them. Section headings
are `text-xl`. The name is the only large type on the page.

**Restraint list.** No shadows (hairline borders instead — the template's `shadow-lg ring-4`
avatar becomes a plain bordered circle). No gradients, particles, glassmorphism, or
card-in-card. `BlurFade` on section entry only, ~40ms stagger, honoring
`prefers-reduced-motion`.

**Writing list** — the most important component, since the site trends here. A bare row:
title in sans, date in mono, right-aligned, tabular figures, hairline rule between.

**From the template:** the `resume.ts` pattern, section rhythm, `BlurFade`, timeline,
project card, badge.
**Dropped from the template:** skills grid (and its ~60 SVG logo files), hackathons
section, dock, flickering grid, Twitter/YouTube social links.

## Content

Source of truth is the July 2026 resume, which supersedes `personal-website` everywhere the
two conflict.

**Hero.** Name + a one-line description of what he does. **No "currently at X" line** — no
current-primary-role claim of any kind. This serves the "person, not job seeker" goal and
avoids disclosing an unsettled situation.

**About.** Short paragraph: builds backend systems, LLM agent systems, exchange
infrastructure; teaches. Ends with one short personal line (travel — 5+ countries;
badminton, gym, yoga). No resume-speak; specifically not the resume's "seeking to apply this
depth to industrial challenges in the European ecosystem."

**Germany / Göttingen — present but never leading.** Per the author, this is not to be
highlighted "for now". `location: "Göttingen, Germany"` stays in `resume.ts` and the MSc
stays in Education, but **nothing in the hero or About mentions Germany, Göttingen, the
move, or student status**, and no flags or country imagery appear anywhere. It is a quiet
row in Education, not part of the site's headline identity.

**Stats.** Four, as plain text — no links, no logos:

- 10K+ YouTube subscribers
- 10K+ people mentored
- 5/5 GFG instructor rating
- Top 1% on Topmate

Topmate is named but **not linked** — the ranking is credibility, a booking link would be
selling.

**Experience** (most recent first):

| Org | Role | Dates |
|---|---|---|
| Prysm Finance | Founder & Lead Engineer | Dec 2024 – Present |
| TanX (prev. Brine Finance) | Senior Product Engineer & Founding Team Member | Nov 2022 – Jan 2024 |
| GeeksForGeeks | Course Instructor (Part-Time) — 8-week Python/backend architecture course, 5/5 | Oct 2023 – Dec 2023 |
| Krypto | Product Engineer, First-Tech Hire | Aug 2021 – Oct 2022 |

YouTube is **not** a timeline entry — it appears only as the 10K+ subscribers stat, since
its start date isn't sourced and a dateless row in a dated timeline reads as a gap.

Where `personal-website` and the resume disagree on dates (TanX Oct vs. Nov 2022; Krypto
Sep vs. Oct 2022), the resume wins — it is newer.

Two entries in `personal-website` are **cut, confirmed by the author**: **Tech Advisor**
(Feb 2024 – Present), which is advisory work and reads as selling, and **Co-Founder,
Health-Food Tech Startup** (Oct 2022 – Jan 2024), which the current resume omits. Do not
reintroduce either.

Prysm is **Present**, not the resume's "March 2026" — per the author, it continues partially
on the backend. Prysm's entry carries the founder video
(<https://www.youtube.com/watch?v=51rkzlrJjfA>) as a click-to-load facade: thumbnail + play
button, iframe injected only on click. A raw embed would pull ~1MB of Google JS and tracking
into every page load for a video most visitors won't play.

**Education.**

- Georg-August-Universität Göttingen — MSc Computer Science, Applied System Engineering,
  minor Business Information Systems. Apr 2024 – Present.
- Vellore Institute of Technology — B.Tech Information Technology. Jul 2018 – May 2022.

**Projects** — from the resume, replacing the 2020–22 college-era set entirely (Hybrid
Cloud, Cyber Bully Detection, LetsStockify, OWASP Attacks, EduTracker are all dropped as
they undersell current work):

- **Portfolio X-Ray** (2026) — <https://github.com/priyanshu2015/portfolio-xray>. Open-source
  (MIT) look-through tool that rebuilds an Indian mutual fund/ETF portfolio from its
  underlying stocks to expose true sector, market-cap, and geographic exposure. Zerodha
  (Kite) supported, broker-agnostic by design. HTML + Python, no build step. Leads the
  section: it is the newest, is public code anyone can read, and ties to the investing
  thread that runs through Prysm.
- LoRA and Efficient LLM Serving for Financial Expert Agents (research seminar, 2025)
- AI Trust & Citizen Participation in Digital Public Services (IS seminar, N=143, 2025)
- LetsProgressify (2024)
- PPC Techniques Implementation (2024)

**Contact.** Formspree form (`@formspree/react` is already used in `personal-website`, so an
account likely exists — a form ID is needed) sending to `priyanshuguptacontact@gmail.com`.
Social links: GitHub and LinkedIn only.

**Excluded from the public site:** phone number, date of birth, IELTS score, and grades
(2.3, 8.89). The site is public and is not a job application.

### Blog migration

All 8 MDX files copy over near-verbatim from `personal-website/mdxfiles/`:
`rabbitmq`, `celery`, `django_sso`, `dockerizing_django`, `google_auth_dj_react`,
`django_design_patterns`, `notification_types`, `scaling_websocket_server` (2,134 lines
total, dated 2024). Their images move from `personal-website/public/images/blogs/<slug>/`
to this repo's `public/images/blogs/<slug>/`, so in-post image paths are unchanged.

Slugs are normalized from `snake_case` to `kebab-case` (e.g. `django_sso` →
`/blog/django-sso`).

## SEO and AI-agent readability

Static export does the heavy lifting: every page is real HTML with real text, readable
without executing JS.

- **Metadata API** — per-page title/description, canonical URLs, Open Graph + Twitter cards.
- **OG images** generated at build time (template's `opengraph-image.tsx` pattern), so each
  post gets a card bearing its own title.
- **JSON-LD** — `Person` on `/` (name, `sameAs` → GitHub/LinkedIn, `alumniOf`);
  `BlogPosting` per post (headline, datePublished, author). This makes him a resolvable
  entity rather than loose text.
- **`sitemap.xml` + `robots.txt`** via Next file conventions, generated from the filesystem.
- **RSS** at `/rss.xml`.
- **`/llms.txt`** — plain-markdown summary + post index at a predictable URL.
- Semantic HTML, one `<h1>` per page, `<time datetime>`, alt text.

**Caveat:** `llms.txt` is a convention, not a standard; adoption is uneven and no major
crawler guarantees it. It is cheap to generate and worth having, but the JSON-LD and clean
static HTML are what actually carry this goal.

## Testing

The risk here is a broken deploy or silently-dropped content, not complex logic. Testing is
proportionate:

- **Build is the primary gate.** `tsc --noEmit` + `next build` in CI. A malformed
  `resume.ts` or bad frontmatter fails the build, not production.
- **Content invariants** — a small script asserting every post has required frontmatter, a
  unique kebab-case slug, and that every referenced image exists on disk.
- **Link check** — all 8 migrated posts render and their images resolve. Run once at
  migration.
- **Lighthouse** on `/` and one post: targets ≥95 across performance, a11y, SEO.
- **Manual pass** — both themes, mobile + desktop, `prefers-reduced-motion`, keyboard
  navigation, and one real Formspree submission.

## Documentation

- `README.md` — local dev, deploy, project layout.
- `CONTENT.md` — plain-English "how do I add a post / add a job / change my bio", written
  for the author six months from now.

## Rollout

Build on `v2`, replacing `index.html` entirely. Merge to `main` when approved; the Actions
workflow publishes from `main`. `personal-website` is retired afterward.

## Open items

Neither blocks starting implementation:

1. **Formspree form ID** — needed before the contact form works end-to-end. Form is built
   against an env var meanwhile.
2. **Company/school logos** — Prysm, TanX, Krypto, GFG, Göttingen, VIT. Some exist in
   `personal-website/public/images/`; Göttingen is new. The timeline renders a neutral
   bordered circle when `logoUrl` is absent, so missing logos degrade gracefully.
