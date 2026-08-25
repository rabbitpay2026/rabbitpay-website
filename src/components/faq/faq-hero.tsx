import { ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { ALL_FAQS, FAQ_CATEGORIES } from "@/data/faq";
import { RESOURCES_LABEL } from "@/data/navigation";

/**
 * FAQ page header: breadcrumb context, the page <h1>, the supporting line the
 * site already uses for its FAQ section, and a small brand-blue icon tile.
 *
 * The counts are derived from the data, so they can never disagree with what is
 * rendered below. No marketing claims are made here.
 */
export function FaqHero() {
  return (
    <section className="relative border-b border-border bg-[linear-gradient(180deg,rgba(232,241,254,0.55),rgba(255,255,255,0))] pb-10 pt-28 md:pb-12 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <li>{RESOURCES_LABEL}</li>
            <li aria-hidden="true" className="flex items-center">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <span className="text-brand" aria-current="page">
                FAQ
              </span>
            </li>
          </ol>
        </nav>

        <div className="mt-6 flex items-start gap-4">
          <span className="hidden h-12 w-12 flex-shrink-0 place-items-center rounded-2xl border border-brand/15 bg-brand/10 text-brand shadow-sm sm:grid">
            <HelpCircle className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
              Frequently asked questions
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Find answers about setup, pricing, integrations, payments, and support.
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {ALL_FAQS.length} questions across {FAQ_CATEGORIES.length} topics
          <span aria-hidden="true"> · </span>
          <Link href="/contact" className="text-brand transition-colors hover:text-brand-deep">
            Still stuck? Talk to us
          </Link>
        </p>
      </div>
    </section>
  );
}
