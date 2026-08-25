"use client";
import { useRouter } from "next/navigation";
import { DEMO_SECTION_ID } from "@/data/anchors";
import { trackEvent } from "@/lib/analytics";

/**
 * "Talk to Sales" — ported from the React Pricing section, where it smooth-scrolled
 * to the `#demo-section` lead-capture block on the same (single) page.
 *
 * Now that Pricing also renders on its own route, the same intent is preserved:
 * scroll to the demo section if this page has one, otherwise navigate to the
 * homepage's demo section. The button still never opens a new page for itself.
 */
export function TalkToSalesButton({
  location,
  className,
  testId,
  children,
}: {
  location: string;
  className?: string;
  testId?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <a
      href={`#${DEMO_SECTION_ID}`}
      data-testid={testId}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        trackEvent("cta_click", { location, label: "Talk to Sales" });
        const target = document.getElementById(DEMO_SECTION_ID);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
        router.push(`/#${DEMO_SECTION_ID}`);
      }}
    >
      {children}
    </a>
  );
}
