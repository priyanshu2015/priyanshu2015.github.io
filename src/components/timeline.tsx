import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";
import { VideoFacade } from "@/components/video-facade";

/**
 * The work history.
 *
 * Dates sit in a mono column on the right, tabular, so they line up as a column you can
 * read down. That alignment is the point: it's the difference between a list of jobs
 * and a timeline you can scan.
 */
export function Timeline() {
  return (
    <ol className="flex flex-col gap-10">
      {DATA.work.map((job) => (
        <li key={`${job.company}-${job.start}`}>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-medium">
              {job.href ? (
                <a
                  href={job.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 hover:text-link"
                >
                  {job.company}
                  <ArrowUpRight
                    className="size-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              ) : (
                job.company
              )}
            </h3>
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
              {job.start} – {job.end}
            </span>
          </div>

          <p className="mt-1 font-mono text-xs text-muted-foreground">{job.title}</p>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {job.description}
          </p>

          {job.links && job.links.length > 0 ? <PressLinks links={job.links} /> : null}

          {job.video ? (
            <VideoFacade url={job.video} title={`${job.company} founder demo`} />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/**
 * Third-party coverage.
 *
 * The publication's name is the credential here, so it leads. Deliberately no scraped
 * article thumbnails: the Forbes piece's preview image is a photo of Brine's founders,
 * and putting a picture of three other people on this page would imply it's him or his
 * team. A masthead someone recognises does more for trust than a stock photo, and it
 * doesn't rot when the publication reshuffles its CDN.
 */
function PressLinks({
  links,
}: {
  links: readonly { label: string; href: string; source: string }[];
}) {
  return (
    <ul className="mt-4 flex flex-col gap-px overflow-hidden rounded-md border">
      {links.map((link) => (
        <li key={link.href} className="border-b last:border-b-0">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 px-3 py-2.5 transition-colors hover:bg-muted"
          >
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {link.source}
              </span>
              <span className="truncate text-xs transition-colors group-hover:text-link">
                {link.label}
              </span>
            </span>
            <ArrowUpRight
              className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-link"
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
