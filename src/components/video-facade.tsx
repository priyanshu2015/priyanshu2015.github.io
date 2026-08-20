"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * A YouTube player that costs nothing until someone actually wants it.
 *
 * A normal <iframe> embed pulls roughly a megabyte of Google JS and sets tracking
 * cookies on every page load, for a video most visitors never play. This renders the
 * poster image and only injects the iframe on click — at which point the visitor has
 * asked for it, so the cost is one they chose.
 *
 * youtube-nocookie.com means even the played video doesn't set advertising cookies.
 */
export function VideoFacade({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const id = extractVideoId(url);

  if (!id) return null;

  return (
    <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-md border bg-muted">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          {/* Plain <img>: next/image's optimiser is off under static export, so it
              would add markup and no benefit. */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-opacity group-hover:opacity-90"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/70 backdrop-blur-sm transition-transform group-hover:scale-105">
              <Play className="ml-0.5 size-5 fill-white text-white" aria-hidden />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}
