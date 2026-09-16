import Link from "next/link";
import { COD_KING_ICON, RABBITPAY_ICON, RABBITPAY_LOGO, RABBITPAY_WHITE_LOGO } from "@/data/site";

/**
 * RabbitPay logo lockup, linking to `/`.
 *
 * `variant="header"` reproduces the header behaviour exactly: an icon-only badge
 * below `sm`, and the full wordmark plus the "Powered by COD King" byline from
 * `sm` up. `variant="footer"` is the smaller wordmark-only lockup.
 *
 * Plain <img> is intentional: these are remote SVG/PNG brand marks sized purely
 * by CSS height, where next/image adds a layout wrapper and no optimisation
 * benefit (SVGs are passed through unoptimised anyway).
 */
export function BrandLockup({ variant = "header" }: { variant?: "header" | "footer" }) {
  const logoHeight = variant === "header" ? "h-10" : "h-8";

  return (
    <Link
      href="/"
      data-testid={variant === "header" ? "header-logo" : "footer-logo"}
      className={
        variant === "header"
          ? "inline-flex items-center"
          : "inline-flex flex-col items-start gap-0.5"
      }
    >
      {variant === "header" ? (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background shadow-sm sm:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={RABBITPAY_ICON} alt="RabbitPay" className="h-6 w-6" />
        </span>
      ) : null}

      <span
        className={
          variant === "header"
            ? "hidden flex-col items-start gap-0.5 sm:flex"
            : "flex flex-col items-start gap-0.5"
        }
      >
        <span className="inline-flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={RABBITPAY_LOGO}
            alt="RabbitPay"
            className={`${logoHeight} w-auto dark:hidden`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={RABBITPAY_WHITE_LOGO}
            alt="RabbitPay"
            className={`hidden ${logoHeight} w-auto dark:block`}
          />
        </span>
        <span className="inline-flex items-center gap-1 pl-0.5 text-[11px] font-medium leading-none text-[#6B7280]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={COD_KING_ICON}
            alt=""
            aria-hidden="true"
            className="h-3 w-3 rounded-[3px] object-contain"
          />
          Powered by COD King
        </span>
      </span>
    </Link>
  );
}
