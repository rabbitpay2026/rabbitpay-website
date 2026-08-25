import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/data/site";

/**
 * Shared metadata helpers. Every route exports its own title/description through
 * `pageMetadata()`, so no two routes ship the same tags.
 *
 * The React site's OG copy is preserved verbatim for the homepage; the dedicated
 * routes describe their own content. `og:url` moved from rabbitpay.in to the
 * canonical rabbitpay.ai.
 */

export const OG_IMAGE = {
  url: "/og-image.svg",
  width: 1200,
  height: 630,
  alt: "RabbitPay - 1-Click Checkout, built in India",
};

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
}): Metadata {
  const canonical = path === "/" ? "/" : path;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      url: new URL(canonical, SITE_URL).toString(),
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [OG_IMAGE.url],
    },
  };
}
