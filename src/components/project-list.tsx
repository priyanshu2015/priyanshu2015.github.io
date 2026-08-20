import { ArrowUpRight } from "lucide-react";
import { DATA, type Project } from "@/data/resume";

/**
 * DATA is declared `as const`, which makes `projects` a tuple of differently-shaped
 * literal types rather than a list of Projects: entries without `image` or `href` simply
 * have no such property, and reading one collapses the element type to `never`.
 *
 * The array is already checked against Project[] by `satisfies` in resume.ts, so this
 * restates the type the data was verified against rather than asserting something new.
 */
const projects: readonly Project[] = DATA.projects;

export function ProjectList() {
  return (
    <ol className="flex flex-col gap-9">
      {projects.map((project) => {
        const image = project.image;
        const href = project.href ?? project.links[0]?.href;

        return (
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

          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {image ? (
            // object-top: the dashboard is a tall screenshot, and everything worth
            // seeing (the look-through charts) is at the top. Cropping in CSS beats
            // shipping a second cropped copy of the file.
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block overflow-hidden rounded-md border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full object-cover object-top transition-opacity hover:opacity-90"
              />
            </a>
          ) : null}

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
        );
      })}
    </ol>
  );
}
