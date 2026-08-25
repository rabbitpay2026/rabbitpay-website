import type { ReactNode } from "react";
import { BorderBeam } from "@/components/magic-ui/border-beam";
import { MagicCard } from "@/components/magic-ui/magic-card";

/**
 * A single support channel tile (call / WhatsApp / email / hours).
 * Ported from the ContactCard defined inside the React `sections/CustomerSupport.jsx`,
 * extracted here because `/support` and `/contact` both render it.
 */
export function ContactCard({
  icon,
  label,
  value,
  href,
  accent,
  testId,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  accent?: boolean;
  testId?: string;
}) {
  const isExternal = Boolean(href?.startsWith("http"));
  const Comp = href ? "a" : "div";

  return (
    <Comp
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      data-testid={testId}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
    >
      <MagicCard className="rounded-2xl border-0 bg-transparent">
        <div className="relative flex items-start gap-4 p-1">
          <span
            className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-border ${
              accent ? "bg-brand text-white" : "bg-background text-brand"
            }`}
          >
            {icon}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 break-words text-base font-semibold text-ink dark:text-white">
              {value}
            </p>
          </div>
        </div>
        {accent ? (
          <BorderBeam size={140} duration={9} colorFrom="#196BF5" colorTo="#4A8CFA" />
        ) : null}
      </MagicCard>
    </Comp>
  );
}
