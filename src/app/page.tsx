import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";
import { getFeaturedPosts } from "@/lib/posts";
import { Section } from "@/components/section";
import { StatsLine } from "@/components/stats";
import { FeaturedWork } from "@/components/featured-work";
import { PlaybookGrid } from "@/components/playbook-grid";
import { Timeline } from "@/components/timeline";
import { EducationList } from "@/components/education-list";
import { ProjectList } from "@/components/project-list";
import { PostList } from "@/components/post-list";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { personJsonLd, serializeJsonLd, websiteJsonLd } from "@/lib/json-ld";

const LEARN = [
  { label: "Resource hub", note: "Books, talks and courses I recommend. I keep adding to it.", href: "/resources", internal: true },
  { label: "YouTube", note: "Longer videos on engineering, and my courses.", href: "https://www.youtube.com/@priyanshuguptaofficial", internal: false },
];

/**
 * Order is deliberate: what I'm building now, how I think, what I've written, then the
 * record. Prysm leads as an interactive card; under Experience it's one line, because
 * the story has already been told.
 */
export default function Home() {
  const posts = getFeaturedPosts(4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd()) }}
      />

      <section id="hero" className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {DATA.name}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {DATA.description}
            </p>
            <div className="mt-2">
              <StatsLine />
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DATA.avatarUrl}
            alt=""
            width={80}
            height={80}
            className="hidden size-20 shrink-0 rounded-full border object-cover sm:block"
          />
        </div>
        <div className="mt-1">
          <SocialLinks />
        </div>
      </section>

      <Section id="now" title="Now">
        <FeaturedWork />
      </Section>

      <Section id="about" title="About">
        <p className="text-base leading-relaxed text-muted-foreground">
          {DATA.summary}
        </p>
      </Section>

      <Section id="work" title="Experience">
        <Timeline />
      </Section>

      <Section id="writing" title="Writing">
        <PostList posts={posts} />
        {posts.length > 0 ? (
          <Link
            href="/blog"
            className="mt-5 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            All writing →
          </Link>
        ) : null}
      </Section>

      <Section id="playbook" title="AI Playbook">
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          Skills, connectors and tools I actually use with Claude, by use case.
        </p>
        <PlaybookGrid compact />
        <Link
          href="/playbook"
          className="mt-5 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Full playbook →
        </Link>
      </Section>

      <Section id="projects" title="Projects">
        <ProjectList />
      </Section>

      <Section id="learn" title="Learn with me">
        <ul className="grid gap-3 sm:grid-cols-2">
          {LEARN.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="group block h-full rounded-md border p-3 transition-colors hover:bg-muted"
              >
                <span className="inline-flex items-center gap-1 font-mono text-xs">
                  {l.label}
                  <ArrowUpRight className="size-3 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{l.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" title="Education">
        <EducationList />
      </Section>

      <Section id="contact" title="Contact">
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          Building something with data or AI, or want to discuss something I wrote? Reach out.
        </p>
        <ContactForm />
      </Section>

    </>
  );
}
