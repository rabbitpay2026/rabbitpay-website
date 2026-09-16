import { BlurFade } from "@/components/magic-ui/blur-fade";
import { NumberTicker } from "@/components/magic-ui/number-ticker";
import { Card, CardContent } from "@/components/ui/card";
import { METRICS_ID } from "@/data/anchors";
import { METRICS } from "@/data/metrics";

/** "Merchant impact" stat band. Ported from the React `sections/Metrics.jsx`. */
export function Metrics() {
  return (
    <section
      id={METRICS_ID}
      data-testid="metrics"
      className="relative border-y border-border bg-[linear-gradient(180deg,rgba(232,241,254,0.9),rgba(255,255,255,0.94))] py-12 dark:bg-neutral-950/60 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <BlurFade>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Merchant impact
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tighter text-ink dark:text-white sm:text-3xl">
              RabbitPay improves the business, not just the checkout.
            </h2>
          </BlurFade>
          <BlurFade delay={0.1}>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-right sm:text-base">
              These are the signals merchants care about first: more conversion, less RTO, faster
              checkout completion, and more addresses prefilled before the shopper even notices.
            </p>
          </BlurFade>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {METRICS.map((item, index) => (
            <BlurFade key={item.label} delay={index * 0.08}>
              <Card className="group relative h-full overflow-hidden border border-white/70 bg-white/75 shadow-[0_20px_60px_rgba(25,107,245,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_26px_70px_rgba(25,107,245,0.16)] dark:border-white/10 dark:bg-white/5">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-70" />
                <CardContent className="relative flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-brand/15 bg-brand/10 text-brand shadow-sm">
                      <item.Icon className="h-5 w-5 text-brand" />
                    </span>
                    <span className="rounded-full border border-brand/15 bg-brand/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                      Live
                    </span>
                  </div>
                  <div className="mt-2 text-5xl font-semibold tracking-tighter text-ink dark:text-white">
                    <NumberTicker value={item.value} prefix={item.prefix} suffix={item.suffix} />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-brand/10">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brand to-brand-accent transition-all duration-500 group-hover:w-full" />
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
