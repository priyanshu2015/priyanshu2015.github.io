import type { Metadata } from "next";
import { PlaybookGrid } from "@/components/playbook-grid";
import { PLAYBOOK } from "@/data/playbook";
import { breadcrumbJsonLd, collectionJsonLd, serializeJsonLd } from "@/lib/json-ld";

const description =
  "Skills, connectors and tools I actually use with Claude, step by step. Hover over a tool to see what it does.";

// Search-facing copy: says what the page is in the words people search with.
const seoTitle = "AI Playbook: Claude skills and MCP tools";
const seoDescription =
  "Step-by-step workflows with the Claude Code skills, MCP connectors and open-source tools I use for video, coding, frontend, research and markets.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: { canonical: "/playbook/" },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: "/playbook/",
    type: "website",
    images: [{ url: "/og/playbook.png", width: 1200, height: 630, alt: "AI Playbook" }],
  },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: ["/og/playbook.png"] },
};

const items = PLAYBOOK.flatMap((cat) =>
  cat.items.map((item) => ({ name: item.name, url: item.href, description: `${cat.title}: ${item.use}` }))
);

export default function PlaybookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            collectionJsonLd({ name: seoTitle, description: seoDescription, path: "/playbook/", items })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbJsonLd([{ name: "AI Playbook", path: "/playbook/" }])),
        }}
      />
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">AI Playbook</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Using something I should add? Tell me on{" "}
          <a href="https://discord.gg/aqDGTQ9dFW" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground">
            Discord
          </a>
          .
        </p>
      </header>
      <PlaybookGrid />
    </>
  );
}
