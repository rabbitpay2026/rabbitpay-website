"use client";
import { Toaster } from "sonner";
import { ScrollProgress } from "@/components/magic-ui/scroll-progress";
import { LeadFormProvider } from "@/context/LeadFormContext";
import { LeadFormModal } from "@/components/LeadFormModal";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { LogoWall } from "@/components/sections/LogoWall";
import { ValueProps } from "@/components/sections/ValueProps";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { CustomerSupport } from "@/components/sections/CustomerSupport";
import { Testimonials } from "@/components/sections/Testimonials";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Footer } from "@/components/sections/Footer";

/**
 * RabbitPay — single-page marketing landing page.
 *
 * Flow: a clean, product-led landing experience. Every CTA (header "Start Free",
 * pricing, enterprise, sticky mobile bar, and the "Give Me a Demo" section above
 * the footer) opens the global lead-capture modal — no inline form on the page,
 * no Calendly, no redirect.
 *
 * Order: Header → Hero → Metrics → Logo Wall → Value Props → How It Works →
 *        Features → Pricing → Integrations/Support → Testimonials → Demo CTA → Footer.
 * Section anchor IDs: #top, #product, #pricing, #integrations, #support.
 */
export default function LandingPage() {
  return (
    <LeadFormProvider>
      <div className="relative min-h-screen bg-background text-foreground antialiased">
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <Metrics />
          <LogoWall />
          <ValueProps />
          <HowItWorks />
          <Features />
          <Pricing />
          <CustomerSupport />
          <Testimonials />
          <DemoCTA />
        </main>
        <Footer />
        <LeadFormModal />
        <StickyMobileCTA />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            className: "rounded-xl border-border shadow-lg font-sans",
          }}
        />
      </div>
    </LeadFormProvider>
  );
}
