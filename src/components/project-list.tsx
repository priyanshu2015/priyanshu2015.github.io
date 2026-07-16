import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";

export function ProjectList() {
  return (
    <ol className="flex flex-col gap-9">
      {DATA.projects.map((project) => (
        <li key={project.title}>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-medium">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-1 hover:text-link"
                >
                  {project.title}
                  <ArrowUpRight
                    className="size-3 shrink-0 self-center text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              ) : (
                project.title
              )}
            </h3>
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
              {project.dates}
            </span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {project.technologies.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-[11px] text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
