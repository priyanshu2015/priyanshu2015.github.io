import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everything is public and meant to be read — including by AI crawlers.
      // There is no disallow list because there is nothing here to hide.
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${DATA.url}/sitemap.xml`,
    host: DATA.url,
  };
}
