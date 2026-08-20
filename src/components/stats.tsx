import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";

/**
 * The four numbers.
 *
 * column-reverse puts the value on top visually while keeping the DOM in dt-then-dd
 * order, so a screen reader reads "YouTube subscribers, 10K+" once rather than
 * announcing the label twice.
 *
 * A stat with an href becomes a link, so the claim can be checked rather than taken on
 * faith. That's the whole reason the number is on the page.
 */
export function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
      {DATA.stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse">
          <dt className="mt-1 text-xs text-muted-foreground">
            {stat.href ? (
              <a
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-0.5 transition-colors hover:text-foreground"
              >
                {stat.label}
                <ArrowUpRight
                  className="size-2.5 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </a>
            ) : (
              stat.label
            )}
          </dt>
          <dd className="font-mono text-xl tabular-nums">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
