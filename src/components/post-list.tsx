import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/posts";

/**
 * The writing list.
 *
 * The most important component on the site, because this is where the site is heading.
 * A row is a title and a date and nothing else — no excerpt, no thumbnail, no card, no
 * "read more". The titles are the interface; anything else added here would be noise
 * between the reader and the thing they came for.
 */
export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-base text-muted-foreground">
        Nothing published yet. Something's in progress.
      </p>
    );
  }

  return (
    <ul className="flex flex-col">
      {posts.map((post) => (
        <li key={post.slug} className="border-b last:border-b-0">
          <Link
            href={`/blog/${post.slug}`}
            className="group flex items-baseline justify-between gap-4 py-3"
          >
            <span className="text-base transition-colors group-hover:text-link">
              {post.title}
            </span>
            <time
              dateTime={post.date}
              className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground"
            >
              {formatDate(post.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
