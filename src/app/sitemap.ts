import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { getAllPosts } from "@/lib/posts";
import { getAllSkills } from "@/lib/skills";

// Required for output: "export" — emits a static sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date ?? new Date().toISOString();

  // Trailing slashes throughout: next.config sets trailingSlash: true, so the canonical
  // URL of every page ends in "/". A sitemap entry without one points at a URL that
  // then declares a different canonical, which is a self-inflicted SEO muddle.
  return [
    {
      url: `${DATA.url}/`,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${DATA.url}/playbook/`,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${DATA.url}/resources/`,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${DATA.url}/research/`,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getAllSkills().map((skill) => ({
      url: `${DATA.url}/research/skills/${skill.slug}/`,
      lastModified: latest,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${DATA.url}/blog/`,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${DATA.url}/privacy/`,
      lastModified: latest,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...posts.map((post) => ({
      url: `${DATA.url}/blog/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
