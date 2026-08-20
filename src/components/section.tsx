import { cn } from "@/lib/utils";

/**
 * A titled block on the homepage.
 *
 * The heading is deliberately small and mono. On this page the name is the only thing
 * that gets to be large — section headings are labels for scanning, not billboards.
 */
export function Section({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("mt-16", className)}>
      <h2
        id={`${id}-heading`}
        className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
