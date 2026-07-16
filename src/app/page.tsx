import Link from "next/link";
import { DATA } from "@/data/resume";
import { getRecentPosts } from "@/lib/posts";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";
import { EducationList } from "@/components/education-list";
import { ProjectList } from "@/components/project-list";
import { PostList } from "@/components/post-list";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { personJsonLd, serializeJsonLd } from "@/lib/json-ld";

export default function Home() {
  const posts = getRecentPosts(4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }}
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

      <Section id="about" title="About">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {DATA.summary}
        </p>
      </Section>

      <Section id="numbers" title="Numbers">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {DATA.stats.map((stat) => (
            // column-reverse puts the value on top visually while keeping the DOM in
            // dt-then-dd order, so a screen reader reads "YouTube subscribers, 10K+"
            // once rather than announcing the label twice.
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="font-mono text-xl tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="work" title="Work">
        <Timeline />
      </Section>

      <Section id="projects" title="Projects">
        <ProjectList />
      </Section>

      <Section id="education" title="Education">
        <EducationList />
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

      <Section id="contact" title="Contact">
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          If you're working on something interesting, or you want to argue with
          something I've written, I'd like to hear about it.
        </p>
        <ContactForm />
      </Section>
    </>
  );
}
