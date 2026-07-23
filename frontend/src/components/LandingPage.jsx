"use client";
import { Toaster } from "sonner";
import { ScrollProgress } from "@/components/magic-ui/scroll-progress";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { LogoWall } from "@/components/sections/LogoWall";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { CustomerSupport } from "@/components/sections/CustomerSupport";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Footer } from "@/components/sections/Footer";

/**
 * RabbitPay landing page.
 *
 * Order: Header -> Hero -> Metrics -> Logo Wall -> Pricing -> Features ->
 * Support -> Demo CTA -> Footer.
 *
 * Two separate conversion paths, no modal:
 *  - "Start Free"     -> Calendly popup (scheduling).
 *  - "Give me a Demo" -> inline lead-capture card (email + phone).
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Metrics />
        <LogoWall />
        <Pricing />
        <Features />
        <CustomerSupport />
        <DemoCTA />
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
