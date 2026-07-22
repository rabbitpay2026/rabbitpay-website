"use client";
import { Toaster } from "sonner";
import { ScrollProgress } from "@/components/magic-ui/scroll-progress";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { LeadCapture } from "@/components/sections/LeadCapture";
import { LogoWall } from "@/components/sections/LogoWall";
import { ValueProps } from "@/components/sections/ValueProps";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { CustomerSupport } from "@/components/sections/CustomerSupport";
import { Footer } from "@/components/sections/Footer";

/**
 * RabbitPay — single-page marketing landing page.
 *
 * Conversion flow: Hero → Metrics → inline Lead Capture form. All CTAs
 * smooth-scroll to the inline form; there is no modal, popup, Calendly, or
 * page redirect anywhere on the site.
 *
 * Section anchor IDs: #top, #product, #pricing, #integrations, #lead-capture.
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Metrics />
        <LeadCapture />
        <LogoWall />
        <ValueProps />
        <HowItWorks />
        <Features />
        <Pricing />
        <Testimonials />
        <CustomerSupport />
      </main>
      <Footer />
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
  );
}
