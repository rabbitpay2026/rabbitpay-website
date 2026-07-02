"use client";
import {
  UserRoundCheck,
  ShieldCheck,
  Smartphone,
  MessageSquareText,
} from "lucide-react";
import { MagicCard } from "@/components/magic-ui/magic-card";
import { AnimatedCircularProgress } from "@/components/magic-ui/animated-circular-progress";
import { Globe } from "@/components/magic-ui/globe";
import { BlurFade } from "@/components/magic-ui/blur-fade";

const INDIA_CITIES = [
  { x: 285, y: 155, label: "Delhi" },
  { x: 275, y: 205, label: "Jaipur" },
  { x: 260, y: 235, label: "Ahmedabad" },
  { x: 275, y: 275, label: "Mumbai" },
  { x: 300, y: 305, label: "Bengaluru" },
  { x: 335, y: 275, label: "Kolkata" },
  { x: 315, y: 315, label: "Chennai" },
];

/**
 * FEATURE DEEP-DIVE
 * Uses: Magic Card, Animated Circular Progress, Globe.
 */
export function Features() {
  return (
    <section
      data-testid="features"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand">
            The RabbitPay stack
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] text-ink dark:text-white">
            Everything you need to convert an Indian shopper.
          </h2>
        </BlurFade>

        {/* Row 1 — Prefilled addresses */}
        <FeatureRow
          reverse={false}
          eyebrow="Saved shoppers"
          title="Prefilled address & saved shopper network."
          body="Millions of Indian shoppers are already on RabbitPay's network. When one lands on your store, we prefill their name, phone, and address — with one tap."
          bullets={[
            "Address, phone & email — prefilled on load",
            "Cross-store recognition (with consent)",
            "Regional pincode intelligence for tier-2 & tier-3",
          ]}
          visual={<PrefillVisual />}
          icon={<UserRoundCheck className="h-5 w-5" />}
        />

        {/* Row 2 — RTO control */}
        <FeatureRow
          reverse={true}
          eyebrow="RTO control"
          title="COD verification that actually reduces returns."
          body="An OTP + intent check on every COD order, backed by a network-wide address risk score. Merchants routinely see 25–35% fewer RTO orders."
          bullets={[
            "OTP verification on 100% of COD orders",
            "Address risk scoring using network history",
            "Auto-flag high-risk orders for review",
          ]}
          visual={
            <div className="flex items-center justify-center">
              <AnimatedCircularProgress value={28} label="RTO reduced" />
            </div>
          }
          icon={<ShieldCheck className="h-5 w-5" />}
        />

        {/* Row 3 — UPI first */}
        <FeatureRow
          reverse={false}
          eyebrow="UPI-first"
          title="UPI intent + QR, native at checkout."
          body="One-tap UPI intent on mobile, QR on desktop. No redirects, no bounced sessions. Because Indian shoppers pay with UPI first — RabbitPay makes sure that is the smoothest path."
          bullets={[
            "GPay, PhonePe, Paytm, BHIM intents",
            "Fast-fallback to cards & netbanking",
            "Recurring UPI for subscription brands",
          ]}
          visual={<UpiVisual />}
          icon={<Smartphone className="h-5 w-5" />}
        />

        {/* Row 4 — Notifications + Globe */}
        <FeatureRow
          reverse={true}
          eyebrow="Pan-India"
          title="SMS OTP + WhatsApp utility — everywhere in India."
          body="Reach shoppers where they are. RabbitPay ships transactional SMS and WhatsApp utility templates out of the box, with delivery telemetry from tier-1 to tier-3."
          bullets={[
            "Transactional SMS with DLT-compliant templates",
            "WhatsApp utility for OTP, shipping & refunds",
            "Delivery insights across 19,000+ pincodes",
          ]}
          visual={
            <div className="text-brand">
              <Globe cities={INDIA_CITIES} />
            </div>
          }
          icon={<MessageSquareText className="h-5 w-5" />}
        />
      </div>
    </section>
  );
}

function FeatureRow({ reverse, eyebrow, title, body, bullets, visual, icon }) {
  return (
    <div className="mt-20 md:mt-28 grid items-center gap-10 lg:grid-cols-12">
      <BlurFade
        className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}
      >
        <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-brand">
          {icon}
        </span>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.22em] text-brand">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-ink dark:text-white">
          {title}
        </h3>
        <p className="mt-4 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
          {body}
        </p>
        <ul className="mt-6 space-y-2.5">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 text-sm text-ink/80 dark:text-white/80"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
              {b}
            </li>
          ))}
        </ul>
      </BlurFade>
      <BlurFade
        delay={0.15}
        className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}
      >
        <MagicCard className="rounded-3xl border-border bg-card p-6 sm:p-10">
          {visual}
        </MagicCard>
      </BlurFade>
    </div>
  );
}

/* -- Illustrative visuals used inside feature rows -- */

function PrefillVisual() {
  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <FieldRow label="Name" value="Ananya Sharma" fill={92} />
      <FieldRow label="Phone" value="+91 98•••••420" fill={98} />
      <FieldRow label="Address" value="A-14, HSR Layout, Bengaluru" fill={88} />
      <FieldRow label="Pincode" value="560102" fill={100} />
      <div className="mt-3 flex items-center justify-between rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm">
        <span className="font-medium text-brand">Address prefilled</span>
        <span className="font-mono text-xs text-muted-foreground">3 fields · 220ms</span>
      </div>
    </div>
  );
}

function FieldRow({ label, value, fill }) {
  return (
    <div className="rounded-xl border border-border bg-background/70 dark:bg-white/[0.02] p-3">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="text-success">Auto-filled</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-ink dark:text-white">{value}</p>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-brand transition-all duration-1000"
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  );
}

function UpiVisual() {
  const apps = [
    { name: "GPay", bg: "bg-white", accent: "text-[#4285F4]" },
    { name: "PhonePe", bg: "bg-[#5F259F]/10", accent: "text-[#5F259F]" },
    { name: "Paytm", bg: "bg-[#00BAF2]/10", accent: "text-[#00BAF2]" },
    { name: "BHIM", bg: "bg-[#0D6EFD]/10", accent: "text-[#0D6EFD]" },
    { name: "Amazon Pay", bg: "bg-[#FF9900]/10", accent: "text-[#FF9900]" },
    { name: "CRED", bg: "bg-black/10 dark:bg-white/10", accent: "text-ink dark:text-white" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {apps.map((a) => (
        <div
          key={a.name}
          className={`flex items-center justify-center rounded-xl border border-border ${a.bg} py-4 text-sm font-semibold ${a.accent}`}
        >
          {a.name}
        </div>
      ))}
    </div>
  );
}
