"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Writing" },
  // Absolute, not a bare "#contact": from a blog post there is no contact section on
  // the page, so the link has to take you home first and then to the anchor.
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="mb-14 flex items-center justify-between font-mono text-sm"
    >
      <ul className="flex items-center gap-5">
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
                  "transition-colors hover:text-foreground",
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
