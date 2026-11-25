import { Download } from "lucide-react";

export function SkillDownload({ slug }: { slug: string }) {
  return (
    <a
      href={`/skills/${slug}.zip`}
      download
      className="inline-flex items-center gap-1.5 rounded border px-3 py-1.5 transition-colors hover:bg-muted"
    >
      <Download className="size-3" aria-hidden />
      Download .zip
    </a>
  );
}
