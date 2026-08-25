import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * The React app routed every unknown path back to the landing page via a `*`
 * route. Silently serving the homepage under an arbitrary URL is bad for SEO
 * (duplicate content on infinite URLs), so unknown paths now return a real 404
 * that links back to the landing page.
 */
export default function NotFound() {
  return (
    <section className="relative pb-20 pt-28 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">404</p>
        <h1 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
          This page could not be found.
        </h1>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(25,107,245,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-0"
          >
            Back to RabbitPay
          </Link>
        </div>
      </div>
    </section>
  );
}
