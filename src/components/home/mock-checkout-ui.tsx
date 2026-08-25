import { CheckCircle2, Sparkles } from "lucide-react";
import { RABBITPAY_ICON } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The fake checkout screen rendered inside the hero's iPhone frame.
 * Ported verbatim from the React `sections/Hero.jsx`; static, so it stays a
 * Server Component.
 */
export function MockCheckoutUI() {
  return (
    <div className="flex h-full w-full flex-col bg-[#FAFAFF] pt-14 dark:bg-neutral-900">
      <div className="flex items-center justify-between border-b border-black/5 px-5 pb-3 dark:border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={RABBITPAY_ICON} alt="RabbitPay" className="h-4 w-4" />
          </span>
          <span className="text-[11px] font-semibold text-ink dark:text-white">RabbitPay</span>
        </div>
        <span className="text-[10px] text-black/50 dark:text-white/50">Secure</span>
      </div>

      <div className="flex-1 overflow-hidden px-5 py-4">
        <div className="relative rounded-lg border-2 border-brand/40 bg-brand/5 p-3">
          <div className="absolute -top-2 left-3 rounded-full bg-brand px-2 py-[2px] text-[9px] font-bold uppercase tracking-widest text-white">
            Prefilled
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-brand">
              Deliver to
            </span>
            <span className="text-[10px] font-semibold text-brand">Change</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-ink dark:text-white">
            Avijeet Dey - +91 62955 29286
          </p>
          <p className="text-[10px] leading-tight text-black/60 dark:text-white/60">
            56A Savithri Nilayam, Bengaluru - 560035
          </p>
        </div>

        <div className="mt-3 rounded-lg border border-black/5 bg-white p-3 dark:border-white/10 dark:bg-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-ink dark:text-white">
              Male Vintage Watch
            </span>
            <span className="text-[11px] font-semibold text-ink dark:text-white">Rs 1,089</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[11px] text-black/60 dark:text-white/60">Shipping</span>
            <span className="text-[11px] font-medium text-brand-accent">FREE</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-black/5 pt-2 dark:border-white/10">
            <span className="text-[11px] font-semibold text-ink dark:text-white">Total</span>
            <span className="text-sm font-bold text-ink dark:text-white">Rs 1,089</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
              Payment method
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-1.5 py-[2px] text-[8px] font-semibold text-brand dark:text-brand-accent">
              <Sparkles className="h-2.5 w-2.5" />
              Save 8% on prepaid
            </span>
          </div>
          <div className="mt-2 space-y-1.5">
            <PayRow name="UPI - GPay / PhonePe" selected />
            <PayRow name="Cards / NetBanking" />
            <PayRow name="Cash on Delivery - verified" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand/10 px-3 py-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-white">
            <CheckCircle2 className="h-3 w-3" />
          </span>
          <span className="text-[11px] font-medium text-brand">
            Payment successful - Rs 1,001.88
          </span>
        </div>

        <button
          disabled
          className="mt-3 w-full rounded-lg bg-brand py-3 text-[12px] font-semibold text-white shadow-[0_18px_40px_rgba(25,107,245,0.24)]"
        >
          Pay Rs 1,001.88 via UPI
        </button>
      </div>
    </div>
  );
}

function PayRow({ name, selected }: { name: string; selected?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md border px-2.5 py-2 text-[11px]",
        selected
          ? "border-brand/40 bg-brand/5"
          : "border-black/5 bg-white dark:border-white/10 dark:bg-neutral-800",
      )}
    >
      <span className="font-medium text-ink dark:text-white">{name}</span>
      <span
        className={cn(
          "grid h-3.5 w-3.5 place-items-center rounded-full border",
          selected ? "border-brand bg-brand" : "border-black/20 dark:border-white/20",
        )}
      >
        {selected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
      </span>
    </div>
  );
}
