import type { MetadataRoute } from "next";
import { ROUTES } from "@/data/navigation";
import { SITE_URL } from "@/data/site";

/** Every route the site serves, driven by the same list the nav config exports. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
