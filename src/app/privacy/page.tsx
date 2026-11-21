import type { Metadata } from "next";
import { DATA } from "@/data/resume";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/json-ld";

const description =
  "What this site collects: analytics, the contact form, and nothing else. No ads, no selling data.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy/" },
  openGraph: { title: "Privacy", description, url: "/privacy/", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: DATA.name }] },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Privacy", path: "/privacy/" }])),
        }}
      />
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Short version: I count visits and read the messages you send me. That&apos;s it.
        </p>
      </header>

      <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Analytics</h2>
          <p className="mt-2">
            I use Google Analytics to see which pages get read. It sets cookies and records things like
            your approximate location, device and the pages you open. I use it to decide what to write
            next, nothing else.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Contact form</h2>
          <p className="mt-2">
            If you send a message, I get your name, email and what you wrote. The form is handled by
            Formspree, which passes it to my inbox. I use it only to reply to you, and I don&apos;t add
            you to any list.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Hosting and embeds</h2>
          <p className="mt-2">
            The site is hosted on GitHub Pages, which keeps its own server logs. Videos load from
            YouTube only when you press play, and YouTube has its own policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Your data</h2>
          <p className="mt-2">
            I don&apos;t sell or share your data. To have a message deleted, or if you have a question
            about any of this, email{" "}
            <a
              href={`mailto:${DATA.contact.email}`}
              className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground"
            >
              {DATA.contact.email}
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
