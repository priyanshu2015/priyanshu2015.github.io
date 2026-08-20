import { DATA } from "@/data/resume";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="mt-24 flex items-center justify-between border-t pt-8 font-mono text-xs text-muted-foreground">
      <p>
        © {new Date().getFullYear()} {DATA.name}
      </p>
      <div className="flex items-center gap-4">
        <a href="/rss.xml" className="transition-colors hover:text-foreground">
          RSS
        </a>
        <SocialLinks />
      </div>
    </footer>
  );
}
