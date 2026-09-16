"use client";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { DEMO_SECTION_ID } from "@/data/anchors";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

/**
 * The demo request CTA — "Request a Demo" in the navbar and FAQ page, "Start
 * Free" beneath the pricing table and in the sticky mobile bar.
 *
 * Takes the visitor to the existing lead form: scrolls to it when the current
 * page has one, otherwise opens the homepage's demo section.
 */
export type DemoIntent = "start_free" | "demo";

const INTENT_EVENT = {
  start_free: ANALYTICS_EVENTS.START_FREE_CLICK,
  demo: ANALYTICS_EVENTS.DEMO_CLICK,
} as const;

export function BookDemoButton({
  location,
  intent,
  className,
  children,
  testId,
  tabIndex,
  onNavigate,
}: {
  /** Analytics label for where the click came from. */
  location: string;
  /** Decides the click event's name: `demo_click` or `start_free_click`. */
  intent: DemoIntent;
  className?: string;
  children: ReactNode;
  testId?: string;
  tabIndex?: number;
  /** Runs before navigating — used by the mobile menu to close itself. */
  onNavigate?: () => void;
}) {
  const router = useRouter();

  return (
    <a
      href={`/#${DEMO_SECTION_ID}`}
      data-testid={testId}
      tabIndex={tabIndex}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onNavigate?.();
        trackEvent(INTENT_EVENT[intent], { location });
        const section = document.getElementById(DEMO_SECTION_ID);
        if (section) {
          (section.querySelector("form") ?? section).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          return;
        }
        router.push(`/#${DEMO_SECTION_ID}`);
      }}
    >
      {children}
    </a>
  );
}
