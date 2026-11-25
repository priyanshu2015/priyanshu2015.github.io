import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSkills, getSkill, summarize } from "@/lib/skills";
import { SkillDownload } from "@/components/skill-download";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/json-ld";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSkills().map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const skill = getSkill((await params).slug);

  if (!skill) return { title: "Not found" };

  const url = `/research/skills/${skill.slug}/`;
  const title = `${skill.title} skill`;
  const description = summarize(skill.description);
  const image = { url: "/og/research.png", width: 1200, height: 630, alt: "Financial research" };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** SKILL.md is plain Markdown, not MDX: "<" and "{" must stay literal text. */
function Markdown({ source }: { source: string }) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{ mdxOptions: { format: "md", remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}

export default async function SkillPage({ params }: { params: Promise<Params> }) {
  const skill = getSkill((await params).slug);

  if (!skill) notFound();

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbJsonLd([
              { name: "Financial research", path: "/research/" },
              { name: skill.title, path: `/research/skills/${skill.slug}/` },
            ])
          ),
        }}
      />

      <Link
        href="/research"
        className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3" aria-hidden />
        Financial research
      </Link>

      <header className="mb-10">
        <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{skill.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{skill.description}</p>
        <div className="mt-5 font-mono text-xs">
          <SkillDownload slug={skill.slug} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          For Claude Code, unzip it into <code className="font-mono text-xs">~/.claude/skills/</code>. In the
          Claude app, upload the zip under skills in settings. For learning only, not investment advice.
        </p>
      </header>

      {skill.intro ? <Markdown source={skill.intro} /> : null}

      <h2 className="mb-4 text-lg font-semibold tracking-tight">How it works</h2>
      {/* Native <details>: collapsed text is still in the HTML for search and AI crawlers. */}
      <ol className="ml-3 border-l">
        {skill.steps.map((step, i) => (
          <li key={step.title} className="relative pb-4 pl-7 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-3 top-2 flex size-6 items-center justify-center rounded-full border bg-background font-mono text-[11px]"
            >
              {i + 1}
            </span>
            <details className="group rounded-md border" open={i === 0}>
              <summary className="cursor-pointer p-3 text-sm font-medium">{step.title}</summary>
              <div className="border-t p-3">
                <Markdown source={step.body} />
              </div>
            </details>
          </li>
        ))}
      </ol>
    </article>
  );
}
