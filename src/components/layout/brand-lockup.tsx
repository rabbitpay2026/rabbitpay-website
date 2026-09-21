import Link from "next/link";
import {
  COD_KING_ICON,
  COD_KING_URL,
  RABBITPAY_ICON,
  RABBITPAY_LOGO,
  RABBITPAY_WHITE_LOGO,
} from "@/data/site";

/**
 * RabbitPay logo lockup, linking to `/`.
 *
 * `variant="header"` is the RabbitPay mark alone: an icon-only badge below `sm`
 * and the full wordmark from `sm` up. `variant="footer"` keeps the smaller
 * wordmark with the "Powered by COD King" byline beneath it.
 *
 * The byline is a sibling of the RabbitPay link rather than a child, because it
 * is itself a link to COD King and an anchor cannot be nested inside another.
 *
 * Plain <img> is intentional: these are remote SVG/PNG brand marks sized purely
 * by CSS height, where next/image adds a layout wrapper and no optimisation
 * benefit (SVGs are passed through unoptimised anyway).
 */
export function BrandLockup({ variant = "header" }: { variant?: "header" | "footer" }) {
  const logoHeight = variant === "header" ? "h-10" : "h-8";

  const wordmark = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={RABBITPAY_LOGO} alt="RabbitPay" className={`${logoHeight} w-auto dark:hidden`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={RABBITPAY_WHITE_LOGO}
        alt="RabbitPay"
        className={`hidden ${logoHeight} w-auto dark:block`}
      />
    </>
  );

  if (variant === "header") {
    return (
      <Link href="/" data-testid="header-logo" className="inline-flex items-center">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background shadow-sm sm:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={RABBITPAY_ICON} alt="RabbitPay" className="h-6 w-6" />
        </span>
        <span className="hidden items-center sm:inline-flex">{wordmark}</span>
      </Link>
    );
  }

  return (
    <span className="inline-flex flex-col items-start gap-0.5">
      <Link href="/" data-testid="footer-logo" className="inline-flex items-center">
        {wordmark}
      </Link>
      <a
        href={COD_KING_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="footer-cod-king"
        className="inline-flex items-center gap-1 rounded pl-0.5 text-[11px] font-medium leading-none text-[#6B7280] transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={COD_KING_ICON}
          alt=""
          aria-hidden="true"
          className="h-3 w-3 rounded-[3px] object-contain"
        />
        Powered by COD King
      </a>
    </span>
  );
}
