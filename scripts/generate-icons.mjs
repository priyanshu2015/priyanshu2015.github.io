#!/usr/bin/env node
/**
 * Renders the favicon set into public/.
 *
 * The old mark was a red-gradient "PG" left over from the 2022 site. On a page whose
 * entire palette is white, near-black, and one blue, it was the loudest thing in the
 * browser tab and belonged to a design that no longer exists.
 *
 * This one is the same monogram set in Geist Mono, the face the site already uses for
 * every date and label. That makes the tab icon part of the identity rather than a
 * sticker on top of it.
 *
 * Run with `npm run icons`. Output is committed; regenerate only if the mark changes.
 */
import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "@vercel/og";

const OUT = path.join(process.cwd(), "public");

const font = fs.readFileSync(
  path.join(
    process.cwd(),
    "node_modules/geist/dist/fonts/geist-mono/GeistMono-SemiBold.ttf"
  )
);

/**
 * @param {number} size
 * @param {boolean} rounded  Rounded square for touch icons; full-bleed for favicons,
 *                           where the browser's own tab chrome already frames it.
 */
async function render(size, rounded) {
  const image = new ImageResponse(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: rounded ? `${size * 0.22}px` : 0,
          fontFamily: "Geist Mono",
        },
        children: {
          type: "div",
          props: {
            style: {
              color: "#ffffff",
              fontSize: size * 0.44,
              fontWeight: 600,
              letterSpacing: `-${size * 0.02}px`,
            },
            children: "PG",
          },
        },
      },
    },
    {
      width: size,
      height: size,
      fonts: [{ name: "Geist Mono", data: font, weight: 600, style: "normal" }],
    }
  );

  return Buffer.from(await image.arrayBuffer());
}

/**
 * Wrap a PNG in an ICO container.
 *
 * ICO has allowed a raw PNG payload since Windows Vista, so this is a 22-byte header
 * plus the PNG bytes. Saves pulling in an image library to write one small file.
 */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(1, 4); // one image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12); // offset to payload

  return Buffer.concat([header, entry, png]);
}

const targets = [
  { file: "favicon-32x32.png", size: 32, rounded: false },
  { file: "apple-icon-180x180.png", size: 180, rounded: true },
  { file: "android-icon-192x192.png", size: 192, rounded: true },
];

for (const { file, size, rounded } of targets) {
  const png = await render(size, rounded);
  fs.writeFileSync(path.join(OUT, file), png);
  console.log(`Wrote public/${file} (${(png.length / 1024).toFixed(1)} KB)`);
}

const ico = pngToIco(await render(32, false), 32);
fs.writeFileSync(path.join(OUT, "favicon.ico"), ico);
console.log(`Wrote public/favicon.ico (${(ico.length / 1024).toFixed(1)} KB)`);
