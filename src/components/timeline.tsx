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

          {job.video ? (
            <VideoFacade url={job.video} title={`${job.company} — founder demo`} />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
