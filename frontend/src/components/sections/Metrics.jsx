"use client";
import { NumberTicker } from "@/components/magic-ui/number-ticker";
import { TextAnimate } from "@/components/magic-ui/text-animate";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { DotPattern } from "@/components/magic-ui/dot-pattern";

/**
 * METRICS BAND
 * Uses: Number Ticker + Text Animate.
 */
export function Metrics() {
  return (
    <section
      data-testid="metrics"
      className="relative overflow-hidden bg-[#0B0817] py-20 text-white md:py-24"
    >
      <DotPattern glow className="opacity-30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.35),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.28),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/60">
            The outcome
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05]">
            <TextAnimate
              text="Numbers that move a business, not a vanity slide."
              className="block"
            />
          </h2>
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <Metric
            value={35}
            prefix="+"
            suffix="%"
            label="Conversion uplift"
            body="Average lift in checkout completion after switching to RabbitPay 1-Click."
          />
          <Metric
            value={28}
            prefix="−"
            suffix="%"
            label="RTO reduction"
            body="Lower return-to-origin from COD verification and network-wide address scoring."
          />
          <Metric
            value={2.4}
            decimalPlaces={1}
            suffix="s"
            label="Median checkout time"
            body="From cart to payment success — measured across returning shoppers."
          />
        </div>
        <p className="mt-8 text-xs text-white/50">
          * Illustrative benchmarks aggregated from pilot merchants across categories.
        </p>
      </div>
    </section>
  );
}

function Metric({ value, prefix, suffix, decimalPlaces, label, body }) {
  return (
    <div className="border-t border-white/10 pt-6 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
      <div className="text-5xl sm:text-6xl font-semibold tracking-tighter">
        <NumberTicker
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimalPlaces={decimalPlaces}
        />
      </div>
      <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
        {label}
      </div>
      <p className="mt-3 max-w-xs text-sm text-white/70 leading-relaxed">{body}</p>
    </div>
  );
}
