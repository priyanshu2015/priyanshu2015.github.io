import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, formatDate, readingTime } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { blogPostingJsonLd } from "@/lib/json-ld";
import { DATA } from "@/data/resume";

type Params = { slug: string };

/** Tells the static export which /blog/* pages to emit. */
export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Not found" };

  const url = `/blog/${post.slug}`;

  // Posts carry their own thumbnail, which already reads as a title card. Posts without
  // one fall back to the site card rather than showing nothing.
  const image = post.image ?? "/og.png";

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [DATA.name],
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

// Shiki highlights at build time and emits both themes, which globals.css swaps
// between. No highlighter reaches the browser.
const prettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
} as const;

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd(post)),
        }}
      />

      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3" aria-hidden />
        Writing
      </Link>

      <header className="mb-10">
        <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{readingTime(post.content)} min read</span>
          {post.tags.length > 0 ? (
            <>
              <span aria-hidden>·</span>
              <span>{post.tags.join(", ")}</span>
            </>
          ) : null}
        </div>
        {post.description ? (
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        ) : null}
      </header>

      <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:font-normal prose-a:underline-offset-2 prose-img:rounded-md prose-img:border">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypePrettyCode, prettyCodeOptions],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
