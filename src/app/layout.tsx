import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { RouteAnalytics } from "@/components/analytics/route-analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { ScrollProgress } from "@/components/magic-ui/scroll-progress";
import { Toaster } from "@/components/ui/toaster";
import { RABBITPAY_ICON, SITE_NAME, SITE_URL } from "@/data/site";
import { fontVariables } from "@/lib/fonts";
import { OG_IMAGE } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RabbitPay - 1-Click Checkout for Shopify & D2C, made in India",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "RabbitPay helps Shopify and D2C brands ship a faster, blue-branded one-click checkout with UPI-first payments, verified COD, and address prefill.",
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
    title: "RabbitPay - 1-Click Checkout, built in India",
    description:
      "Higher conversions. Lower RTO. A checkout your Indian shoppers actually finish - with prefilled addresses, UPI-first payments, and verified COD.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "RabbitPay - 1-Click Checkout, built in India",
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
