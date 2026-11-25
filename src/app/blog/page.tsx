import type { Metadata } from "next";
import { getWritingPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import { blogJsonLd, breadcrumbJsonLd, serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on backend systems, distributed architecture, message brokers, and the things that break in production.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing",
    description:
      "Notes on backend systems, distributed architecture, message brokers, and the things that break in production.",
    url: "/blog",
    type: "website",
    images: [{ url: "/og/blog.png", width: 1200, height: 630, alt: "Writing" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/blog.png"] },
};

export default function BlogPage() {
  const posts = getWritingPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogJsonLd(posts)) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Writing", path: "/blog/" }])),
        }}
      />

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Mostly about backend systems and how they behave under load: message
          brokers, task queues, WebSockets, and the edge cases that only show up in
          production.
        </p>
      </header>

      <PostList posts={posts} />
    </>
  );
}
