import { FaqSection } from "@/components/faq/faq-section";
import { DemoCTA } from "@/components/home/demo-cta";
import { Hero } from "@/components/home/hero";
import { LogoWall } from "@/components/home/logo-wall";
import { Metrics } from "@/components/home/metrics";
import { PoweredBy } from "@/components/home/powered-by";
import { Features } from "@/components/product/features";
import { Pricing } from "@/components/pricing/pricing";
import { JsonLd } from "@/components/seo/json-ld";
import { CustomerSupport } from "@/components/support/customer-support";
import { HOMEPAGE_FAQS } from "@/data/faq";
import { buildPageJsonLd } from "@/lib/json-ld";

/**
 * RabbitPay landing page — the complete marketing page, in the same section
 * order the React `LandingPage.jsx` rendered:
 *
 *   Hero -> Metrics -> Logo Wall -> Pricing -> Features (+ Integrations) ->
 *   Support -> Demo CTA -> FAQ -> Powered By
 *
 * Header, Footer, ScrollProgress, StickyMobileCTA and Toaster live in the root
 * layout so every route gets them.
 *
 * Two separate conversion paths, no modal:
 *  - "Book a Demo" / "Start Free" -> Calendly popup (scheduling).
 *  - The inline lead-capture card -> email + phone to the lead endpoint.
 */
export default function HomePage() {
  return (
    <>
      {/*
        The homepage's own WebPage node. The Organization and WebSite entities
        it points at are emitted once in the root layout, and the FAQPage schema
        belongs to /faq — the six-question preview below is a subset of that
        page and is deliberately not marked up a second time here.
      */}
      <JsonLd data={buildPageJsonLd("/")} />

      <Hero />
      <Metrics />
      <LogoWall />
      <Pricing />
      <Features />
      <CustomerSupport />
      <DemoCTA />
      <FaqSection items={HOMEPAGE_FAQS} showAllLink />
      <PoweredBy />
    </>
  );
}
