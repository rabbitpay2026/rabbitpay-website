/**
 * The site-wide announcement bar shown above the header navigation.
 *
 * One announcement at a time. Set `ANNOUNCEMENT` to `null` to remove the bar —
 * and the spacer that keeps page content clear of it — from every route.
 */
export type Announcement = {
  /** Full message, from the `sm` breakpoint up. */
  message: string;
  /** Message on narrow phones, where the full one would truncate. */
  shortMessage: string;
  cta: string;
  href: string;
  /** Route trees where the bar would only point at what the visitor is already in. */
  hiddenOn: string[];
};

export const ANNOUNCEMENT: Announcement | null = {
  message: "Work out your store's profit margin, ROI and ROAS with your own numbers.",
  shortMessage: "Profit, ROI & ROAS calculator",
  cta: "Try Calculator",
  href: "/calculator",
  hiddenOn: ["/calculator"],
};

/** The announcement to show on `pathname`, or `null` for none. */
export function getAnnouncement(pathname: string): Announcement | null {
  if (!ANNOUNCEMENT) return null;
  const inside = ANNOUNCEMENT.hiddenOn.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  return inside ? null : ANNOUNCEMENT;
}
