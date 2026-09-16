import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

/**
 * `/robots.txt`.
 *
 * The whole site is public marketing content, so every crawler — search engines
 * and AI agents alike — is allowed everywhere. Only `/api/` is disallowed: it is
 * the lead-capture endpoint (`app/api/leads/route.ts`), which is POST-only and
 * has nothing to index.
 *
 * `Disallow` is a crawl directive, not an access control. The endpoint stays
 * reachable; this just keeps it out of crawl budget and search results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}
