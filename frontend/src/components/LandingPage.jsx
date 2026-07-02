"use client";
import { Toaster } from "sonner";
import { ScrollProgress } from "@/components/magic-ui/scroll-progress";
import { LeadFormProvider } from "@/context/LeadFormContext";
import { LeadFormModal } from "@/components/LeadFormModal";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { LogoWall } from "@/components/sections/LogoWall";
import { ValueProps } from "@/components/sections/ValueProps";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Metrics } from "@/components/sections/Metrics";
import { Testimonials } from "@/components/sections/Testimonials";
import { CustomerSupport } from "@/components/sections/CustomerSupport";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

/**
 * RabbitPay — single-page marketing landing page.
 * All animation/effects/buttons/animated-text/backgrounds are Magic UI components.
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
          <LogoWall />
          <ValueProps />
          <HowItWorks />
          <Features />
          <Pricing />
          <Metrics />
          <Testimonials />
          <CustomerSupport />
          <FinalCTA />
        </main>
        <Footer />
        <LeadFormModal />
        <StickyMobileCTA />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            className:
              "rounded-xl border-border shadow-lg font-sans",
          }}
        />
      </div>
    </LeadFormProvider>
  );
}
