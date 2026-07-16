import { DATA } from "@/data/resume";
import type { PostMeta } from "@/lib/posts";

/**
 * Schema.org structured data.
 *
 * This is the piece that makes Priyanshu a *resolvable entity* to search engines and
 * LLMs rather than a page of loose text: `sameAs` ties this site to the GitHub and
 * LinkedIn profiles, so the three are understood as one person.
 */

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
      "Backend Engineering",
      "Distributed Systems",
      "LLM Agents",
      "Retrieval-Augmented Generation",
      "Python",
      "Django",
      "Message Brokers",
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
    ...(post.image ? { image: `${DATA.url}${post.image}` } : {}),
    ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
  };
}

export function blogJsonLd(posts: PostMeta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Writing — ${DATA.name}`,
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
