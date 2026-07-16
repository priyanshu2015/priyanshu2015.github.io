"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // Before mount the theme is unknown, so the label would be a coin flip. Render
      // the button (no layout shift) but keep it out of the a11y tree until it's true.
      aria-hidden={!mounted}
      tabIndex={mounted ? 0 : -1}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="-m-2 rounded p-2 text-muted-foreground transition-colors hover:text-foreground"
    >
      {mounted && isDark ? (
        <Sun className="size-4" aria-hidden />
      ) : (
        <Moon className="size-4" aria-hidden />
      )}
    </button>
  );
}
