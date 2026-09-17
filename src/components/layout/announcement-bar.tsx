"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAnnouncement, type Announcement } from "@/data/announcement";
import { cn } from "@/lib/utils";

/** Height of the bar, shared by the bar and its spacer so the two cannot disagree. */
const HEIGHT_CLASS = "h-9";

/**
 * A soft brand-blue strip above the header navigation. Rendered by the header,
 * inside its fixed container, and folded away once the page scrolls so it only
 * costs vertical space at the top of the page.
 *
 * The whole bar is one link: a single tab stop, and a tap target the full width
 * of the screen on mobile. `inert` takes it out of the tab order while folded.
 */
export function AnnouncementBar({
  announcement,
  collapsed,
}: {
  announcement: Announcement;
  collapsed: boolean;
}) {
  return (
    <div
      data-testid="announcement-bar"
      inert={collapsed}
      className={cn(
        "overflow-hidden border-b border-brand/10 bg-brand-soft transition-[max-height] duration-300 ease-out motion-reduce:transition-none",
        collapsed ? "max-h-0" : "max-h-9",
      )}
    >
      <Link
        href={announcement.href}
        data-testid="announcement-link"
        className={cn(
          "group flex items-center justify-center gap-2.5 px-4 text-xs font-medium text-ink/80 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/40 sm:text-[13px]",
          HEIGHT_CLASS,
        )}
      >
        <span className="hidden rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand ring-1 ring-inset ring-brand/15 sm:inline">
          New
        </span>
        <span className="min-w-0 truncate">
          <span className="sm:hidden">{announcement.shortMessage}</span>
          <span className="hidden sm:inline">{announcement.message}</span>
        </span>
        <span className="inline-flex flex-shrink-0 items-center gap-1 font-semibold text-brand-deep underline-offset-4 group-hover:underline">
          {announcement.cta}
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </div>
  );
}

/**
 * Pushes the page down by the bar's height on every route that shows it.
 *
 * The header is fixed, so each page already clears it with its own top padding.
 * Rendered in the page flow just before the header, this keeps all of those
 * paddings correct without touching them, and disappears with the bar on the
 * routes that hide it.
 */
export function AnnouncementSpacer() {
  const pathname = usePathname();
  return getAnnouncement(pathname) ? (
    <div aria-hidden="true" data-testid="announcement-spacer" className={HEIGHT_CLASS} />
  ) : null;
}
