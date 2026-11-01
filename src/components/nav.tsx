"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/playbook", label: "AI Playbook" },
  { href: "/blog", label: "Writing" },
  { href: "/resources", label: "Resources" },
  // Absolute, not a bare "#contact": from a blog post there is no contact section on
  // the page, so the link has to take you home first and then to the anchor.
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="mb-10 flex items-start justify-between gap-4 font-mono text-[13px] sm:mb-14 sm:items-center sm:text-sm"
    >
      {/* Wraps onto a second row on narrow phones instead of running off the screen */}
      <ul className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">
        {links.map((link) => {
          // Anchor links never claim the current-page state: you're still on whatever
          // page you were on, and marking Contact as current would be a lie.
          const isAnchor = link.href.includes("#");
          const active = isAnchor
            ? false
            : link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <ThemeToggle />
    </nav>
  );
}
