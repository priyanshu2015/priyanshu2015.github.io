"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PLAYBOOK, type PlaybookItem } from "@/data/playbook";

/**
 * The playbook.
 *
 * `compact` is the homepage teaser. The full view is one collapsible block per use case,
 * each step a single row: what the step is, and the tools that do it, linked. Tool
 * descriptions live in the hover title rather than as paragraphs, so the page scans in
 * seconds instead of scrolling forever.
 */
export function PlaybookGrid({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {PLAYBOOK.map((cat) => (
          <Link
            key={cat.id}
            href={`/playbook/#${cat.id}`}
            className="rounded-lg border p-4 transition-colors hover:bg-muted"
          >
            <h3 className="text-sm font-medium">{cat.title}</h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {cat.steps.length} steps · {cat.items.length} tools
            </p>
          </Link>
        ))}
      </div>
    );
  }

  return <FullPlaybook />;
}

function FullPlaybook() {
  // Native <details>: every step and link is in the static HTML, so search engines and
  // AI agents read the whole playbook, and it opens and closes with no JavaScript.
  // State here only mirrors the open sections so "Expand all" and #hash links work.
  const [open, setOpen] = useState<Set<string>>(() => new Set([PLAYBOOK[0].id]));

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (PLAYBOOK.some((c) => c.id === id)) {
      setOpen(new Set([id]));
      document.getElementById(id)?.scrollIntoView();
    }
  }, []);

  const setOne = (id: string, isOpen: boolean) =>
    setOpen((prev) => {
      if (prev.has(id) === isOpen) return prev;
      const next = new Set(prev);
      if (isOpen) next.add(id);
      else next.delete(id);
      return next;
    });

  const allOpen = open.size === PLAYBOOK.length;

  return (
    <>
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(PLAYBOOK.map((c) => c.id)))}
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <div className="divide-y border-y">
        {PLAYBOOK.map((cat) => {
          const byName = new Map(cat.items.map((i) => [i.name, i]));

          return (
            <details
              key={cat.id}
              id={cat.id}
              open={open.has(cat.id)}
              onToggle={(e) => setOne(cat.id, e.currentTarget.open)}
              className="group scroll-mt-8"
            >
              <summary className="flex cursor-pointer list-none items-baseline gap-2 py-4 [&::-webkit-details-marker]:hidden">
                <ChevronRight
                  className="size-3.5 shrink-0 self-center text-muted-foreground transition-transform group-open:rotate-90"
                  aria-hidden
                />
                <h2 className="font-medium">{cat.title}</h2>
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  {cat.items.length} tools
                </span>
              </summary>

              <div className="mb-6 pl-5.5">
                <p className="mb-4 text-sm text-muted-foreground">{cat.blurb}</p>
                <ol className="space-y-3.5">
                  {cat.steps.map((step, i) => (
                    <li key={step.title} className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[13rem_1fr]">
                      <span>
                        <span className="mr-2 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                        {step.title}
                        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{step.what}</span>
                      </span>
                      <span className="text-muted-foreground">
                        {step.options.map((name, j) => (
                          <span key={name}>
                            {j > 0 ? " · " : ""}
                            <Tool name={name} item={byName.get(name)} />
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          );
        })}
      </div>
    </>
  );
}

function Tool({ name, item }: { name: string; item?: PlaybookItem }) {
  if (!item?.href) return <span title={item?.use}>{name}</span>;
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      title={item.use}
      className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {name}
    </a>
  );
}
