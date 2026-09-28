import { FaqSection } from "@/components/faq/faq-section";
import {
  CodVerificationNote,
  EasierWayToPaySection,
  LessTypingSection,
} from "@/components/home/checkout-features";
import { CheckoutWalkthrough } from "@/components/home/checkout-walkthrough";
import { DemoCTA } from "@/components/home/demo-cta";
import { Hero } from "@/components/home/hero";
import { LogoWall } from "@/components/home/logo-wall";
import { PoweredBy } from "@/components/home/powered-by";
import { HomePricingSection } from "@/components/home/pricing-section";
import { ShopifySetup } from "@/components/home/shopify-setup";
import { AgencyPartnersSection } from "@/components/partners/agency-partners-section";
import { JsonLd } from "@/components/seo/json-ld";
import { CustomerSupport } from "@/components/support/customer-support";
import { HOMEPAGE_FAQS } from "@/data/faq";
import { buildPageJsonLd } from "@/lib/json-ld";

/**
 * RabbitPay landing page.
 *
 * The six sections the content plan calls for, in order, with the supporting
 * sections around them:
 *
 *   Hero -> Logo Wall ->
 *   1. Less typing at checkout
 *   2. An easier way to pay      (+ the brief COD verification note)
 *   3. See how RabbitPay checkout works
 *   4. Built for your Shopify store   (setup facts + integrations strip)
 *   5. Pricing that fits your store (points to /pricing)
 *   6. Ready to improve your checkout (the lead form)
 *   -> Support -> Agency Partners -> FAQ -> Powered By
 *
 * Header, Footer, ScrollProgress, StickyMobileCTA and Toaster live in the root
 * layout so every route gets them.
 *
 * One conversion path, no modal: the lead-capture card in section 6 posts to
 * the lead endpoint, and every "Book a Demo" CTA scrolls to it.
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
      <LogoWall />

      <LessTypingSection />
      <EasierWayToPaySection />
      <CodVerificationNote />

      <CheckoutWalkthrough />
      <ShopifySetup />

      <HomePricingSection />

      <DemoCTA />

      <CustomerSupport />
      <AgencyPartnersSection />
      <FaqSection items={HOMEPAGE_FAQS} showAllLink />
      <PoweredBy />
    </>
  );
}
