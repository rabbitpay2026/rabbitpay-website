import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES } from "@/data/pages";
import { SITE_URL } from "@/data/site";

/**
 * `/sitemap.xml`.
 *
 * Driven by the page registry in `data/pages.ts` — the single source of truth
 * that also feeds llms.txt, every route's metadata and the structured data. A
 * new public page appears here the moment it is registered there, and a removed
 * one disappears.
 *
 * The registry holds only real, public, indexable routes: no API routes, no
 * dynamic segments, no `mailto:`/external links from the footer, and no `/blog`
 * (which does not exist yet and renders as "Coming soon" in the nav).
 *
 * Intentionally URL-only:
 *  - `lastModified` would have to be the build timestamp, which would claim
 *    every page changed on every deploy. Google treats a lastmod it cannot
 *    corroborate as noise and starts ignoring the signal, so no date beats a
 *    wrong one. Add real per-page dates here if content ever gets timestamps.
 *  - `changeFrequency` and `priority` are ignored by Google and Bing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
  }));
}
