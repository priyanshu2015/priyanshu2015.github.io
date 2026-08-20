import { Github, Linkedin, Youtube } from "lucide-react";
import { DATA } from "@/data/resume";

const icons = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
} as const;

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-3">
      {DATA.contact.social.map((social) => {
        const Icon = icons[social.icon as keyof typeof icons];
        if (!Icon) return null;

        return (
          <li key={social.name}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              // The icon carries no text, so the link needs its own accessible name.
              aria-label={social.name}
              className="-m-1 block rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-4" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
