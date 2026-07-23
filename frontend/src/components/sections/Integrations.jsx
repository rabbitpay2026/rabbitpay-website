"use client";
import { BlurFade } from "@/components/magic-ui/blur-fade";

/**
 * Minimal integrations strip: badge, one heading, one line of subtext, and a
 * clean logo grid. No cards, borders, shadows, or hover badges.
 *
 * Logos are self-hosted in `public/logos/` so there are no external requests.
 */
const PAYMENT_PARTNERS = [
  { name: "Razorpay", file: "wm-razorpay.svg" },
  { name: "PhonePe", file: "wm-phonepe.svg" },
  { name: "PayU", file: "wm-payu.svg" },
  { name: "Paytm", file: "wm-paytm.svg" },
  { name: "Cashfree", file: "wm-cashfree-new.jpg" },
  { name: "Juspay", file: "wm-juspay.svg" },
  // Decentro publishes no wordmark lockup — pair the brand mark with the name.
  { name: "Decentro", file: "partner-decentro.png", withText: true },
];

const MARKETING_PARTNERS = [
  { name: "Meta", file: "wm-meta.svg" },
  // Google Ads only ships a portrait icon (250x313), so at wordmark height it
  // renders far narrower than the others — `mark` gives it extra height.
  { name: "Google Ads", file: "wm-googleads.svg", mark: true },
  { name: "Google Analytics", file: "wm-ganalytics.png" },
];

function LogoRow({ partners }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
      {partners.map((partner) => (
        <span
          key={partner.name}
          className="flex h-8 items-center justify-center gap-2.5 rounded-xl px-3 py-1.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_28px_rgba(17,24,39,0.10)] sm:h-10"
        >
          <img
            src={`${process.env.PUBLIC_URL}/logos/${partner.file}`}
            alt={`${partner.name} logo`}
            loading="lazy"
            className={
              partner.mark
                ? "h-12 w-auto object-contain sm:h-14"
                : partner.withText
                  ? "h-full w-auto object-contain"
                  : "h-full w-auto max-w-[170px] object-contain"
            }
          />
          {partner.withText ? (
            <span className="text-xl font-semibold tracking-tight text-[#111827] sm:text-2xl">
              {partner.name}
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export function Integrations() {
  return (
    <section
      id="integrations"
      data-testid="integrations"
      className="relative py-14 md:py-16"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <BlurFade>
          <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            Integrations
          </span>

          <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-semibold leading-[1.15] tracking-tighter text-ink dark:text-white sm:text-3xl">
            Seamlessly connect with India's leading payment and infrastructure partners.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            RabbitPay integrates with the platforms modern D2C brands already use, making onboarding
            and checkout operations effortless.
          </p>
        </BlurFade>

        <BlurFade delay={0.12}>
          <div className="mt-11">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
              Payment partners
            </p>
            <div className="mt-6">
              <LogoRow partners={PAYMENT_PARTNERS} />
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
              Marketing &amp; analytics partners
            </p>
            <div className="mt-6">
              <LogoRow partners={MARKETING_PARTNERS} />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
