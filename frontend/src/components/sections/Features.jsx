"use client";
import { Fragment } from "react";
import { UserRoundCheck, ShieldCheck, Smartphone, ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { MagicCard } from "@/components/magic-ui/magic-card";
import { Integrations } from "@/components/sections/Integrations";

const FEATURES = [
  {
    eyebrow: "Prefilled checkout",
    title: "Ship a checkout that feels already known.",
    body:
      "RabbitPay pre-fills the shopper's details so the first screen feels fast, familiar, and frictionless.",
    bullets: [
      "Address, phone, and email can appear prefilled",
      "Cleaner first step on mobile",
      "Designed to reduce drop-offs before payment",
    ],
    icon: <UserRoundCheck className="h-5 w-5" />,
    visual: <PrefillVisual />,
  },
  {
    eyebrow: "RTO control",
    title: "Verified COD and risk-aware order capture.",
    body:
      "Keep the easy COD path, but add the guardrails that reduce fake orders and unnecessary return-to-origin costs.",
    bullets: [
      "Verified COD flows",
      "Smarter risk checks before fulfillment",
      "Less leakage between checkout and delivery",
    ],
    icon: <ShieldCheck className="h-5 w-5" />,
    visual: <RiskVisual />,
  },
  {
    eyebrow: "UPI-first",
    title: "A payment experience Indian shoppers actually use.",
    body:
      "UPI gets the premium treatment, with cards and netbanking available as smooth fallbacks when shoppers need them.",
    bullets: [
      "UPI-first ordering experience",
      "Fast fallback to other payment methods",
      "Built for mobile-heavy Indian traffic",
    ],
    icon: <Smartphone className="h-5 w-5" />,
    visual: <UpiVisual />,
  },
];

export function Features() {
  return (
    <section id="product" data-testid="features" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Product highlights
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tighter leading-[1.05] text-ink dark:text-white sm:text-4xl md:text-5xl">
            Everything needed to make the checkout feel premium, fast, and trustworthy.
          </h2>
        </BlurFade>

        <div className="mt-12 space-y-6">
          {FEATURES.map((feature, index) => (
            <Fragment key={feature.eyebrow}>
              {/* Integrations strip sits immediately above the UPI-first feature. */}
              {feature.eyebrow === "UPI-first" ? <Integrations /> : null}
              <FeatureRow feature={feature} reverse={index % 2 === 1} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ feature, reverse }) {
  return (
    <div className="grid items-center gap-6 lg:grid-cols-12">
      <BlurFade className={reverse ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"}>
        <span className="inline-grid h-11 w-11 place-items-center rounded-2xl border border-border bg-background text-brand shadow-sm">
          {feature.icon}
        </span>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
          {feature.eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight leading-[1.08] text-ink dark:text-white sm:text-3xl">
          {feature.title}
        </h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          {feature.body}
        </p>
        <ul className="mt-6 space-y-3">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm text-ink/80 dark:text-white/80">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
              {bullet}
            </li>
          ))}
        </ul>
      </BlurFade>
      <BlurFade delay={0.12} className={reverse ? "lg:order-1 lg:col-span-6" : "lg:col-span-6"}>
        <MagicCard className="rounded-[28px] border-border bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:bg-white/5 sm:p-8">
          {feature.visual}
        </MagicCard>
      </BlurFade>
    </div>
  );
}

function PrefillVisual() {
  return (
    <div className="mx-auto max-w-md space-y-3">
      <FieldRow label="Name" value="Ananya Sharma" fill={92} />
      <FieldRow label="Phone" value="+91 98••••••420" fill={98} />
      <FieldRow label="Address" value="A-14, HSR Layout, Bengaluru" fill={88} />
      <FieldRow label="Pincode" value="560102" fill={100} />
      <div className="mt-3 flex items-center justify-between rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm">
        <span className="font-medium text-brand">Address prefilled</span>
        <span className="font-mono text-xs text-muted-foreground">3 fields - 220 ms</span>
      </div>
    </div>
  );
}

function RiskVisual() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[
        ["Verified COD", "Pending orders screened before dispatch"],
        ["Lower RTO", "Risk signals help reduce bad-fit orders"],
        ["Intent check", "Customers confirm details with less friction"],
        ["Ops-ready", "Clean handoff into fulfillment"],
      ].map(([title, text]) => (
        <div key={title} className="rounded-2xl border border-border bg-white p-4 shadow-sm dark:bg-neutral-900/70">
          <p className="text-sm font-semibold text-ink dark:text-white">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  );
}

/** Small brand-coloured badge with a white monogram. */
function AppBadge({ bg, children }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg text-[11px] font-bold leading-none text-white shadow-sm"
      style={{ backgroundColor: bg }}
    >
      {children}
    </span>
  );
}

/**
 * Official brand mark (single-path SVG in public/logos), tinted with the brand's
 * own hex via a CSS mask. Self-hosted, so there are no external image requests.
 */
function BrandMark({ file, color, label }) {
  const src = `${process.env.PUBLIC_URL}/logos/${file}`;
  return (
    <span
      role="img"
      aria-label={label}
      className="h-5 w-5 flex-shrink-0"
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

const UPI_APPS = [
  { name: "GPay", icon: <BrandMark file="googlepay.svg" color="#4285F4" label="Google Pay" /> },
  { name: "PhonePe", icon: <BrandMark file="phonepe.svg" color="#5F259F" label="PhonePe" /> },
  { name: "Paytm", icon: <BrandMark file="paytm.svg" color="#20336B" label="Paytm" /> },
  // No official open-source mark available for BHIM / CRED — brand-coloured badge.
  { name: "BHIM", icon: <AppBadge bg="#F26522">B</AppBadge> },
  { name: "Amazon Pay", icon: <BrandMark file="amazonpay.svg" color="#FF9900" label="Amazon Pay" /> },
  { name: "CRED", icon: <AppBadge bg="#0B0B0B">C</AppBadge> },
];

function UpiVisual() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {UPI_APPS.map((app) => (
        <div
          key={app.name}
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background px-2.5 py-3.5 text-[13px] font-semibold text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-md dark:bg-neutral-900/70 dark:text-white"
        >
          {app.icon}
          <span className="whitespace-nowrap">{app.name}</span>
        </div>
      ))}
    </div>
  );
}

function FieldRow({ label, value, fill }) {
  return (
    <div className="rounded-2xl border border-border bg-background/75 p-4 dark:bg-white/[0.03]">
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
