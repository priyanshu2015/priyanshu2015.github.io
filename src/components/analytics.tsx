import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * The ID is read at build time from NEXT_PUBLIC_GA_ID (a GitHub Actions secret in the
 * deploy workflow, .env.local locally). Without it, nothing is rendered: no script, no
 * request, so local dev and forks don't pollute the real numbers.
 *
 * afterInteractive keeps it off the critical path; the page renders and is readable
 * (and crawlable) before any analytics code loads.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
