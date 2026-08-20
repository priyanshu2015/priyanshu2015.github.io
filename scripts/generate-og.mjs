#!/usr/bin/env node
/**
 * Renders the homepage social card to public/og.png.
 *
 * Why a script and not Next's app/opengraph-image.tsx convention: that convention emits
 * an *extensionless* file (out/opengraph-image). Next's own server sets the Content-Type
 * header for it, but GitHub Pages infers Content-Type from the file extension, so the
 * card would be served as application/octet-stream and every social scraper would
 * reject it. Writing a real .png into public/ sidesteps that entirely.
 *
 * Blog posts don't need this — they use their own thumbnail via frontmatter `image`.
 *
 * Runs automatically before each build (see the "prebuild" script). Committing the
 * output is fine; it's regenerated whenever name or description changes.
 */
import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "@vercel/og";

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

const image = new ImageResponse(
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
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 72,
                    fontWeight: 600,
                    color: "#0a0a0a",
                    letterSpacing: "-0.03em",
                  },
                  children: name,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 32,
                    color: "#666666",
                    marginTop: 24,
                    maxWidth: 900,
                    lineHeight: 1.4,
                  },
                  children: description,
                },
              },
            ],
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
              { type: "div", props: { children: "priyanshu2015.github.io" } },
              { type: "div", props: { children: "github.com/priyanshu2015" } },
            ],
          },
        },
      ],
    },
  },
  { width: 1200, height: 630 }
);

const buffer = Buffer.from(await image.arrayBuffer());
const out = path.join(process.cwd(), "public", "og.png");
fs.writeFileSync(out, buffer);

console.log(`Wrote public/og.png (${(buffer.length / 1024).toFixed(1)} KB)`);
