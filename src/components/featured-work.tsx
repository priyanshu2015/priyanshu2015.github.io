import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";
import { VideoFacade } from "@/components/video-facade";

/**
 * Lead card: what I'm building now.
 *
 * Only what Prysm does for investors and the public numbers. How it's built stays
 * private: it's a company, not an open-source project.
 */
export function FeaturedWork() {
  const f = DATA.featured;

  return (
    <div className="rounded-lg border p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <a
          href={f.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-lg font-semibold tracking-tight"
        >
          {f.name}
          <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden />
        </a>
        <span className="font-mono text-xs text-muted-foreground">
          {f.role} · {f.since} – now
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.pitch}</p>
      <p className="mt-3 text-sm">
        {f.clients.text}{" "}
        <a
          href={`mailto:${f.clients.email}`}
          className="text-link underline-offset-4 hover:underline"
        >
          {f.clients.email}
        </a>
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-y-4 sm:grid-cols-4">
        {f.metrics.map((m) => (
          <div key={m.label} className="flex flex-col-reverse">
            <dt className="mt-0.5 text-xs text-muted-foreground">{m.label}</dt>
            <dd className="font-mono text-lg tabular-nums">{m.value}</dd>
          </div>
        ))}
      </dl>

      <dl className="mt-6 space-y-2 border-t pt-5">
        {f.journey.map((j) => (
          <div key={j.id} className="grid gap-x-4 sm:grid-cols-[6.5rem_1fr]">
            <dt className="font-mono text-xs leading-6">{j.label}</dt>
            <dd className="text-sm leading-relaxed text-muted-foreground">{j.body}</dd>
          </div>
        ))}
      </dl>

      <VideoFacade url={f.video} title="Prysm demo" />
    </div>
  );
}
