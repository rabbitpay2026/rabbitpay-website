import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { RouteAnalytics } from "@/components/analytics/route-analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { ScrollProgress } from "@/components/magic-ui/scroll-progress";
import { JsonLd } from "@/components/seo/json-ld";
import { Toaster } from "@/components/ui/toaster";
import { getPage } from "@/data/pages";
import { RABBITPAY_ICON, SITE_NAME, SITE_URL } from "@/data/site";
import { fontVariables } from "@/lib/fonts";
import { buildSiteJsonLd } from "@/lib/json-ld";
import { OG_IMAGE } from "@/lib/seo";
import "./globals.css";

/**
 * Site-wide metadata and the homepage's own tags.
 *
 * Title, description and Open Graph copy come from the "/" entry in
 * `data/pages.ts`, the same registry the sitemap, llms.txt and the structured
 * data read, so the homepage cannot describe itself two different ways.
 *
 * The card image is the generated PNG from `app/opengraph-image.tsx`, shared
 * with every route through `OG_IMAGE` in `lib/seo.ts`.
 */
const home = getPage("/");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: home.description,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: RABBITPAY_ICON, type: "image/svg+xml" }],
    apple: [{ url: RABBITPAY_ICON }],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
    title: home.ogTitle ?? home.title,
    description:
      "Higher conversions. Lower RTO. A checkout your Indian shoppers actually finish - with prefilled addresses, UPI-first payments, and verified COD.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: home.ogTitle ?? home.title,
    description:
      "Higher conversions. Lower RTO. A checkout your Indian shoppers actually finish.",
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="relative min-h-screen bg-background text-foreground antialiased">
        {/*
          Organization + WebSite, emitted once for the whole site so every route
          resolves to the same two entities. Page-level schema references them
          by `@id` rather than repeating them.
        */}
        <JsonLd data={buildSiteJsonLd()} />

        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
        <Toaster />
        <AnalyticsScripts />
        <Suspense fallback={null}>
          <RouteAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
