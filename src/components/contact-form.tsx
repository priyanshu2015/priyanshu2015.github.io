"use client";

import { useState } from "react";
import { DATA } from "@/data/resume";

/**
 * Contact form, posted to Formspree.
 *
 * GitHub Pages is static, so there is no server here to receive a POST. Formspree
 * takes the submission and emails it on.
 *
 * Deliberately a plain fetch rather than @formspree/react: the SDK is a dependency and
 * a lock-in for what is one POST to one URL. If Formspree ever goes away, this becomes
 * a different endpoint on one line.
 *
 * Set NEXT_PUBLIC_FORMSPREE_ID (see README). Without it the form degrades to a mailto
 * link rather than silently swallowing messages — a contact form that quietly fails is
 * worse than no contact form.
 */

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  if (!formId) {
    return (
      <p className="text-sm text-muted-foreground">
        The quickest way to reach me is{" "}
        <a href={`mailto:${DATA.contact.email}`} className="text-link hover:underline">
          {DATA.contact.email}
        </a>
        .
      </p>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const body = await response.json().catch(() => null);
      setError(
        body?.errors?.[0]?.message ??
          "That didn't send. Try again, or email me directly."
      );
      setStatus("error");
    } catch {
      setError("That didn't send — check your connection, or email me directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-muted-foreground" role="status">
        Message sent. I'll get back to you.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono text-xs text-muted-foreground">
          Your email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          className="rounded-md border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-xs text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="resize-y rounded-md border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring"
          placeholder="What's on your mind?"
        />
      </div>

      {/* Honeypot: bots fill hidden fields, people don't. Formspree drops these. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status === "error" ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-md border px-4 py-2 font-mono text-xs transition-colors hover:bg-muted disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
