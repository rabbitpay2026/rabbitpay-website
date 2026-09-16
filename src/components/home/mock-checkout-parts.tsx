"use client";

import { ChevronLeft, ChevronRight, Package, TicketPercent } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { RABBITPAY_ICON, RABBITPAY_LOGO } from "@/data/site";
import { cn } from "@/lib/utils";
import { COUPON, inr } from "@/components/home/mock-checkout-data";

export const CARD =
  "rounded-[14px] border border-[#E6EAF0] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]";

export const PRESSABLE =
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";

export function StatusBar() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[42px] shrink-0 items-end justify-between bg-white px-5 pb-[11px] text-[10px] font-semibold text-ink"
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-px">
          {[3, 5, 7, 9].map((height) => (
            <span key={height} style={{ height }} className="w-[3px] rounded-full bg-current" />
          ))}
        </span>
        <span className="ml-0.5 h-2.5 w-5 rounded-[3px] border border-ink/60 p-px">
          <span className="block h-full w-2/3 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

export function HomeIndicator() {
  return (
    <div aria-hidden="true" className="grid h-[30px] shrink-0 place-items-center bg-[#F4F6FA]">
      <span className="h-[4px] w-[122px] rounded-full bg-ink/85" />
    </div>
  );
}

export function CheckoutHeader({
  total,
  original,
  onBack,
}: {
  total: number;
  original?: number;
  onBack: () => void;
}) {
  return (
    <div className="relative flex h-[50px] shrink-0 items-center justify-between bg-white px-[12px]">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className={cn(
          "relative z-10 grid h-[28px] w-[28px] place-items-center rounded-full text-ink/80 hover:bg-black/[0.04]",
          PRESSABLE,
        )}
      >
        <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2} />
      </button>

      <span className="pointer-events-none absolute inset-0 flex items-center justify-center gap-[8px]">
        <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-brand-deep text-center text-[6.5px] font-bold leading-[1.05] text-white shadow-[0_0_0_3px_#EEF2F8]">
          YOUR
          <br />
          LOGO
        </span>
        <span className="text-[14px] font-medium text-ink">Your Store</span>
      </span>

      <span className="relative z-10 flex flex-col items-end leading-none">
        <span className="text-[14px] font-semibold tabular-nums text-ink">{inr(total)}</span>
        {original ? (
          <span className="mt-[3px] text-[10.5px] tabular-nums text-ink/40 line-through">
            {inr(original)}
          </span>
        ) : null}
      </span>
    </div>
  );
}

export function StepBanner() {
  return (
    <div className="relative flex h-[24px] shrink-0 items-center justify-center overflow-hidden bg-[linear-gradient(90deg,#0D4CB3,#196BF5_50%,#0D4CB3)] text-[10.5px] font-medium text-white">
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[70px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] motion-reduce:hidden"
        initial={{ x: -80 }}
        animate={{ x: 470 }}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.2 }}
      />
      <span className="relative">Please complete this step before continuing.</span>
    </div>
  );
}

export function OfferPill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[3px] rounded-full bg-brand-soft px-[7px] py-[3px] text-[9.5px] font-semibold leading-none text-brand-deep",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function OrderSummaryCard({ saved }: { saved: number }) {
  return (
    <div className={cn(CARD, "flex min-h-[46px] items-center justify-between px-[12px] py-[9px]")}>
      <div>
        <p className="flex items-center gap-[6px] text-[12.5px] font-medium leading-none text-ink">
          <Package className="h-[14px] w-[14px]" strokeWidth={1.8} />
          Order summary
        </p>
        {saved > 0 ? (
          <OfferPill className="mt-[6px]">You saved {inr(saved)}</OfferPill>
        ) : null}
      </div>
      <span className="flex items-center gap-[3px] text-[12.5px] text-ink/60">
        1 item
        <ChevronRight className="h-[14px] w-[14px] text-ink/70" strokeWidth={2} />
      </span>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-[7px] mt-[12px] px-[2px] text-[11.5px] font-medium leading-none text-ink/55">
      {children}
    </p>
  );
}

export function CouponCard({ applied, onToggle }: { applied: boolean; onToggle: () => void }) {
  return (
    <div className={cn(CARD, "px-[12px] pb-[9px] pt-[11px]")}>
      <div className="flex items-center gap-[10px]">
        <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[8px] bg-[#F1F4F9] text-ink/60">
          <TicketPercent className="h-[14px] w-[14px]" strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold leading-none tracking-[0.02em] text-ink">
            {COUPON.code}
          </p>
          <OfferPill className="mt-[6px]">Save {inr(COUPON.saving)}</OfferPill>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={applied}
          className={cn(
            "h-[32px] min-w-[68px] rounded-[9px] px-[12px] text-[12px] font-semibold",
            PRESSABLE,
            applied
              ? "border border-brand/30 bg-brand-soft text-brand-deep"
              : "bg-brand text-white hover:bg-brand-deep",
          )}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
      <span aria-hidden="true" className="mt-[10px] block h-px bg-[#EEF1F5]" />
      <p className="mt-[8px] text-[10.5px] leading-none text-ink/55">View all coupons (2) ›</p>
    </div>
  );
}

export function IndiaFlag() {
  return (
    <span
      aria-hidden="true"
      className="flex h-[14px] w-[21px] shrink-0 flex-col overflow-hidden rounded-[2px] shadow-[0_0_0_0.5px_rgba(15,23,42,0.15)]"
    >
      <span className="flex-1 bg-[#FF9933]" />
      <span className="grid flex-1 place-items-center bg-white">
        <span className="h-[3.5px] w-[3.5px] rounded-full border-[0.75px] border-[#000080]" />
      </span>
      <span className="flex-1 bg-[#138808]" />
    </span>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" strokeWidth={1.9} />
      <path
        transform="translate(7.2 7.2) scale(0.4)"
        strokeWidth={4.6}
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </svg>
  );
}

export function CheckoutFooter() {
  return (
    <div className="flex flex-col items-center pb-[14px] pt-[18px]">
      <span className="text-[7.5px] font-medium uppercase leading-none tracking-[0.18em] text-ink/40">
        Powered by
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={RABBITPAY_LOGO} alt="RabbitPay" className="mt-[4px] h-[22px] w-auto" />
      <span className="mt-[8px] flex items-center text-[9px] leading-none text-ink/45">
        T&amp;C
        <span aria-hidden="true" className="mx-[8px] h-[10px] w-px bg-ink/15" />
        Privacy Policy
      </span>
    </div>
  );
}

export function BrandLoader({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-[16px]" role="status">
      <span className="relative grid h-[58px] w-[58px] place-items-center">
        <span aria-hidden="true" className="absolute inset-0 rounded-full border-[3px] border-brand/10" />
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-brand [animation-duration:0.9s] motion-reduce:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={RABBITPAY_ICON} alt="" className="h-[34px] w-[34px] rounded-[9px]" />
      </span>
      <span className="text-[12px] font-medium leading-none text-ink/60">{label}</span>
    </div>
  );
}

export function UpiApps() {
  return (
    <span aria-hidden="true" className="flex items-center gap-[4px]">
      {["wm-googlepay.svg", "wm-phonepe.svg", "wm-paytm.svg"].map((file) => (
        <span
          key={file}
          className="flex h-[16px] items-center rounded-full border border-[#E6EAF0] bg-white px-[5px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/logos/${file}`} alt="" className="h-[8px] w-auto" />
        </span>
      ))}
    </span>
  );
}

export function CardNetworks() {
  return (
    <span aria-hidden="true" className="flex items-center gap-[4px]">
      <span className="flex h-[16px] items-center rounded-[4px] border border-[#E6EAF0] bg-white px-[4px] text-[8px] font-extrabold italic leading-none text-[#1A1F71]">
        VISA
      </span>
      <span className="flex h-[16px] items-center rounded-[4px] border border-[#E6EAF0] bg-white px-[4px]">
        <span className="h-[9px] w-[9px] rounded-full bg-[#EB001B]" />
        <span className="-ml-[4px] h-[9px] w-[9px] rounded-full bg-[#F79E1B]/90" />
      </span>
      <span className="flex h-[16px] items-center rounded-[4px] border border-[#E6EAF0] bg-white px-[4px] text-[7.5px] font-bold italic leading-none text-[#0F4C81]">
        RuPay
      </span>
    </span>
  );
}
