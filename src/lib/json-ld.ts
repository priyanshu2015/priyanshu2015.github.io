import { DATA } from "@/data/resume";
import type { PostMeta } from "@/lib/posts";

/**
 * Schema.org structured data.
 *
 * This is the piece that makes Priyanshu a *resolvable entity* to search engines and
 * LLMs rather than a page of loose text: `sameAs` ties this site to the GitHub and
 * LinkedIn profiles, so the three are understood as one person.
 */

/**
 * Serialise structured data for embedding in a <script> tag.
 *
 * JSON.stringify does NOT escape "<", so a post titled `Hello </script><img
 * onerror=alert(1)>` would close the script element early and inject markup into every
 * page that renders it. The content is self-authored, which makes this unlikely rather
 * than impossible — and "unlikely" is not a security boundary. Escaping the three
 * characters that can break out of a script context costs nothing.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATA.name,
    url: DATA.url,
    image: `${DATA.url}${DATA.avatarUrl}`,
    description: DATA.description,
    email: `mailto:${DATA.contact.email}`,
    jobTitle: DATA.work[0]?.title,
    worksFor: DATA.work
      .filter((job) => job.end === "Present")
      .map((job) => ({
        "@type": "Organization",
        name: job.company,
        ...(job.href ? { url: job.href } : {}),
      })),
    alumniOf: DATA.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
      ...(edu.href ? { url: edu.href } : {}),
    })),
    knowsAbout: [
      "Data Infrastructure",
      "AI Agents",
      "Retrieval-Augmented Generation",
      "Claude Code",
      "Model Context Protocol",
      "Financial Technology",
      "Backend Engineering",
      "Distributed Systems",
      "Python",
      "Django",
    ],
    sameAs: DATA.contact.social.map((s) => s.url),
  };
}

export function blogPostingJsonLd(post: PostMeta) {
  // Trailing slash to match the page's own canonical (trailingSlash: true).
  const url = `${DATA.url}/blog/${post.slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: DATA.name,
      url: DATA.url,
    },
    publisher: {
      "@type": "Person",
      name: DATA.name,
      url: DATA.url,
    },
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${DATA.url}${postImage(post)}`,
    inLanguage: "en",
    ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
  };
}

/** A post's own thumbnail, or the card scripts/generate-og.mjs renders for it. */
export function postImage(post: Pick<PostMeta, "slug" | "image">): string {
  return post.image ?? `/og/blog/${post.slug}.png`;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: DATA.name,
    url: `${DATA.url}/`,
    description: DATA.description,
    inLanguage: "en",
    author: { "@type": "Person", name: DATA.name, url: DATA.url },
  };
}

/** Breadcrumbs, from the home page down. `path` is site-relative with a trailing slash. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${DATA.url}${crumb.path}`,
    })),
  };
}

/** A page that is a curated list of links, like the Playbook or Resources. */
export function collectionJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: { name: string; url?: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${DATA.url}${path}`,
    inLanguage: "en",
    author: { "@type": "Person", name: DATA.name, url: DATA.url },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        ...(item.url ? { url: item.url } : {}),
        ...(item.description ? { description: item.description } : {}),
      })),
    },
  };
}

export function blogJsonLd(posts: PostMeta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Writing | ${DATA.name}`,
    url: `${DATA.url}/blog/`,
    author: { "@type": "Person", name: DATA.name, url: DATA.url },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      url: `${DATA.url}/blog/${post.slug}/`,
    })),
  };
}
