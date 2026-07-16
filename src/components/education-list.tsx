import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";

export function EducationList() {
  return (
    <ol className="flex flex-col gap-5">
      {DATA.education.map((edu) => (
        <li key={edu.school} className="flex items-baseline justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-medium">
              {edu.href ? (
                <a
                  href={edu.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 hover:text-link"
                >
                  {edu.school}
                  <ArrowUpRight
                    className="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              ) : (
                edu.school
              )}
            </h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{edu.degree}</p>
          </div>
          <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
            {edu.start} – {edu.end}
          </span>
        </li>
      ))}
    </ol>
  );
}
