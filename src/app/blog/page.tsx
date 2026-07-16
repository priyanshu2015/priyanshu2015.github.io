import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import { blogJsonLd, serializeJsonLd } from "@/lib/json-ld";

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
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogJsonLd(posts)) }}
      />

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Mostly about backend systems and how they behave under load — message
          brokers, task queues, WebSockets, and the edge cases that only show up in
          production.
        </p>
      </header>

      <PostList posts={posts} />
    </>
  );
}
