import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { CodeBlock } from "@/components/mdx/code-block";

/**
 * How MDX elements render.
 *
 * Most of the styling is Tailwind Typography on the wrapper; this file only handles
 * what prose classes can't: link routing, image loading, and the copy button.
 */
export const mdxComponents: MDXComponents = {
  pre: (props) => <CodeBlock {...props} />,

  a: ({ href, children, ...props }) => {
    const url = String(href ?? "");
    const isInternal = url.startsWith("/") || url.startsWith("#");

    if (isInternal) {
      return (
        <Link href={url} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },

  img: ({ src, alt, ...props }) => (
    // Plain <img>: next/image needs explicit dimensions, which MDX authors don't have,
    // and its optimiser is disabled under static export anyway.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={String(src ?? "")}
      alt={alt ?? ""}
      loading="lazy"
      decoding="async"
      {...props}
    />
  ),
};
