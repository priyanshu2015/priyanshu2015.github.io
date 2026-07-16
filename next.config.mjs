/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into out/. GitHub Pages serves files, not a Node server,
  // so there is no SSR, no ISR, and no route handlers at runtime.
  output: "export",

  // next/image's optimizer needs a server. Without this the export fails.
  images: { unoptimized: true },

  // Emit foo/index.html rather than foo.html so Pages resolves /blog/slug cleanly.
  trailingSlash: true,

  reactStrictMode: true,

  // Note: no headers() here. Next's headers() is a no-op under output: "export" —
  // static hosts send their own headers. Keeping it would imply security headers
  // that are not actually applied.
};

export default nextConfig;
