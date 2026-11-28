import type { Metadata } from "next";
import Link from "next/link";
import { getResearchPosts } from "@/lib/posts";
import { getAllSkills } from "@/lib/skills";
import { PostList } from "@/components/post-list";
import { SkillDownload } from "@/components/skill-download";
import { breadcrumbJsonLd, collectionJsonLd, serializeJsonLd } from "@/lib/json-ld";

const description =
  "How I research stocks and think about money: articles, and AI skills you can download and use.";

const seoTitle = "Financial research and stock analysis";
const image = { url: "/og/research.png", width: 1200, height: 630, alt: "Financial research" };

export const metadata: Metadata = {
  title: seoTitle,
  description,
  alternates: { canonical: "/research/" },
  openGraph: { title: seoTitle, description, url: "/research/", type: "website", images: [image] },
  twitter: { card: "summary_large_image", title: seoTitle, description, images: [image.url] },
};

export default function ResearchPage() {
  const posts = getResearchPosts();
  const skills = getAllSkills();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            collectionJsonLd({
              name: seoTitle,
              description,
              path: "/research/",
              items: skills.map((s) => ({ name: s.title, description: s.description })),
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Financial research", path: "/research/" }])),
        }}
      />

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Financial research</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          For learning only. Nothing here is investment advice.
        </p>
      </header>

      <section aria-labelledby="skills-h" className="mb-12">
        <h2 id="skills-h" className="text-lg font-semibold tracking-tight">Skills</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {skills.map((skill) => (
            <li key={skill.slug} className="rounded-lg border p-4">
              <h3 className="font-medium">
                <Link href={`/research/skills/${skill.slug}/`} className="hover:text-link">
                  {skill.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-xs">
                <SkillDownload slug={skill.slug} />
                <Link
                  href={`/research/skills/${skill.slug}/`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  See how it works →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="articles-h">
        <h2 id="articles-h" className="mb-2 text-lg font-semibold tracking-tight">Articles</h2>
        <PostList posts={posts} />
      </section>
    </>
  );
}
