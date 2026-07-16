"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * A code block with a copy button.
 *
 * The <pre> itself is still Shiki's build-time output — this only wraps it and reads
 * the rendered text back out of the DOM on click. That's deliberate: passing the raw
 * source down as a prop would ship every snippet to the browser twice, once as
 * highlighted markup and once as a plain string, on a page where the code is most of
 * the payload.
 */
export function CodeBlock({ children, ...props }: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied (insecure origin, permissions policy).
      // Staying silent is fine — the code is right there to select by hand.
    }
  }

  return (
    <div className="group relative">
      <pre ref={ref} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-2 top-2 rounded-md border bg-background/80 p-2 text-muted-foreground opacity-0 backdrop-blur-sm transition-all hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? (
          <Check className="size-3.5 text-green-600 dark:text-green-400" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
