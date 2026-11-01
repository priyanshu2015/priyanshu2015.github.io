import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { RESOURCES, RESOURCES_UPDATED, thumbnailFor } from "@/data/resources";
import { breadcrumbJsonLd, collectionJsonLd, serializeJsonLd } from "@/lib/json-ld";

const description =
  "Talks, courses, books, papers, and blogs I recommend for AI engineering, serving models, and building backend systems.";

const seoTitle = "Best resources to learn AI engineering, LLMs and system design";
const seoDescription =
  "Hand-picked talks, courses, books, papers and blogs for learning LLMs, AI engineering, model serving and backend system design. Kept up to date.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: { canonical: "/resources/" },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: "/resources/",
    type: "website",
    images: [{ url: "/og/resources.png", width: 1200, height: 630, alt: "Resources" }],
  },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: ["/og/resources.png"] },
};

const items = RESOURCES.flatMap((g) =>
  g.items.map((r) => ({ name: r.by ? `${r.title} (${r.by})` : r.title, url: r.href, description: r.note }))
);

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            collectionJsonLd({ name: seoTitle, description: seoDescription, path: "/resources/", items })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Resources", path: "/resources/" }])),
        }}
      />
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Resources</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          I keep adding to this list as things change. Last updated{" "}
          <time dateTime={RESOURCES_UPDATED}>
            {new Date(RESOURCES_UPDATED).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}
          </time>
          .
        </p>
        <nav aria-label="Resource groups" className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
          {RESOURCES.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="rounded border px-2 py-1 text-muted-foreground transition-colors hover:text-foreground">
              {g.title}
            </a>
          ))}
        </nav>
      </header>

      <div className="space-y-12">
        {RESOURCES.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-8">
            <h2 id={`${g.id}-h`} className="text-lg font-semibold tracking-tight">{g.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{g.blurb}</p>
            <ul className="mt-4 divide-y rounded-lg border">
              {g.items.map((r) => {
                const thumb = thumbnailFor(r);
                return (
                  <li key={r.href} className="flex gap-4 p-4">
                    {thumb ? (
                      <a href={r.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden className="shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumb}
                          alt=""
                          width={128}
                          height={72}
                          loading="lazy"
                          className="aspect-video w-28 rounded border object-cover sm:w-32"
                        />
                      </a>
                    ) : null}
                    <div className="min-w-0">
                      <a href={r.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-sm font-medium">
                        {r.title}
                        <ArrowUpRight className="size-3 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden />
                      </a>
                      {r.by ? <span className="block font-mono text-xs text-muted-foreground sm:ml-2 sm:inline">{r.by}</span> : null}
                      <p className="mt-1 text-sm text-muted-foreground">{r.note}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
