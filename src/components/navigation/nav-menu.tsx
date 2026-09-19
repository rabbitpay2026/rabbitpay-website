"use client";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { NavMenuItem, ResourceLink } from "@/types";

/** "Partner With Us" → "partner-with-us" — for stable test ids. */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Desktop navbar dropdown — Features and Resources.
 *
 * Deliberately hand-rolled rather than pulling in another Radix package: it is a
 * disclosure button plus a list of links, and the project only ships
 * `@radix-ui/react-accordion` today. Behaviour implemented here:
 *
 *  - opens on click (matching the rest of the header's click-driven controls)
 *  - closes on outside click, on Escape, on focus leaving it, and after navigating
 *  - roving focus with ArrowUp/ArrowDown, Home/End across every row, the
 *    overview row included; Escape returns focus to the trigger
 *  - `aria-expanded` / `aria-controls` / `aria-haspopup="menu"` on the trigger,
 *    `role="menu"` on the panel, `role="group"` per labelled section and
 *    `role="menuitem"` on each link
 *  - respects prefers-reduced-motion through the shared animation utilities
 *
 * The panel is opaque. It used to be `bg-background/95` with a backdrop blur,
 * but it renders inside the header, which has a backdrop filter of its own —
 * that makes the header the panel's backdrop root, so the blur never reached
 * the page and the hero headline showed through the menu.
 *
 * Disabled items (no `href`) render as non-focusable rows with a "Coming soon"
 * pill, so the menu never offers a destination that does not exist.
 */
export function NavMenu({ menu, isActive }: { menu: NavMenuItem; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const slug = slugify(menu.label);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  // Every focusable row, in DOM order — the overview first, then each section.
  // Read at key-press time, so nothing needs registering during render.
  const rows = () =>
    Array.from(panelRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);

  const focusItem = (index: number) => {
    const items = rows();
    if (items.length === 0) return;
    const next = ((index % items.length) + items.length) % items.length;
    items[next]?.focus();
  };

  const currentIndex = () => rows().findIndex((el) => el === document.activeElement);

  const onPanelKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(currentIndex() + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItem(currentIndex() - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(0);
        break;
      case "End":
        event.preventDefault();
        focusItem(rows().length - 1);
        break;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(0));
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const close = () => setOpen(false);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        data-testid={`nav-${slug}-trigger`}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
        /* `gap-0.5 pr-2` rather than the links' `px-3`: the chevron carries
           its own visual space, and the extra ~20px the wider trigger needed
           pushed "Partner With Us", "View Demo Store" and "Book a Demo" onto
           two lines from `xl` up. Measured in the browser at 1280–1600px. */
        className={cn(
          "inline-flex items-center gap-0.5 whitespace-nowrap rounded-full py-2 pl-3 pr-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
          isActive || open ? "text-brand" : "text-ink/70 hover:text-brand dark:text-white/70",
        )}
      >
        {menu.label}
        <ChevronDown
          aria-hidden="true"
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          role="menu"
          aria-label={menu.label}
          data-testid={`nav-${slug}-menu`}
          onKeyDown={onPanelKeyDown}
          className={cn(
            "absolute top-full z-50 mt-2 max-h-[calc(100vh-6rem)] max-w-[calc(100vw-2rem)] origin-top animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 overflow-y-auto rounded-2xl border border-border bg-background p-2 shadow-[0_24px_60px_rgba(15,23,42,0.12)] duration-200",
            menu.align === "start" ? "left-0" : "left-1/2 -translate-x-1/2",
            menu.columns ? "w-[340px] lg:w-[600px]" : "w-[336px]",
          )}
        >
          {menu.overview ? (
            <OverviewRow
              item={menu.overview}
              onNavigate={close}
              testId={`${slug}-${slugify(menu.overview.label)}`}
            />
          ) : null}

          <div className={cn(menu.columns && "lg:grid lg:grid-cols-2 lg:gap-1")}>
            {menu.sections.map((section, index) => (
              <MenuSection
                key={section.title ?? index}
                title={section.title}
                className={cn(menu.overview || index > 0 ? "mt-1.5" : undefined, menu.columns && "lg:mt-1.5")}
              >
                {section.items.map((item) => (
                  <MenuRow
                    key={item.label}
                    item={item}
                    onNavigate={close}
                    testId={`${slug}-${slugify(item.label)}`}
                  />
                ))}
              </MenuSection>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * A titled group of rows. The title labels the group for assistive technology
 * as well as visually, so a screen reader announces "Checkout features, group"
 * before the rows in it.
 */
export function MenuSection({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const titleId = useId();
  if (!title) return <div className={className}>{children}</div>;
  return (
    <div role="group" aria-labelledby={titleId} className={className}>
      <p
        id={titleId}
        className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        {title}
      </p>
      {children}
    </div>
  );
}

/**
 * The overview entry ("All Features"): a tinted, full-width row with a trailing
 * arrow, so it reads as "see everything" rather than as one more feature.
 */
export function OverviewRow({
  item,
  onNavigate,
  testId,
}: {
  item: ResourceLink;
  onNavigate?: () => void;
  testId?: string;
}) {
  if (!item.href) return null;
  return (
    <Link
      role="menuitem"
      href={item.href}
      onClick={onNavigate}
      data-testid={testId}
      className="group flex w-full items-center gap-3 rounded-xl border border-brand/15 bg-brand/[0.06] px-3 py-3 text-left transition-colors hover:border-brand/30 hover:bg-brand/10 focus-visible:border-brand/40 focus-visible:bg-brand/10 focus-visible:outline-none"
    >
      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-brand text-white">
        <item.Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink dark:text-white">{item.label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </span>
      </span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 flex-shrink-0 text-brand transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/**
 * One row in a dropdown. Shared by the desktop dropdown and the mobile menu so
 * the icon, title and description are defined in exactly one place.
 */
export function MenuRow({
  item,
  onNavigate,
  testId,
}: {
  item: ResourceLink;
  onNavigate?: () => void;
  testId?: string;
}) {
  const body = (
    <>
      <span
        className={cn(
          "mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl border transition-colors",
          item.href
            ? "border-brand/15 bg-brand/10 text-brand"
            : "border-border bg-muted text-muted-foreground",
        )}
      >
        <item.Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              "text-sm font-semibold",
              item.href ? "text-ink dark:text-white" : "text-muted-foreground",
            )}
          >
            {item.label}
          </span>
          {item.external ? (
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
            />
          ) : null}
          {item.comingSoon ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Coming soon
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </span>
      </span>
    </>
  );

  const rowClass =
    "group flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors";
  const linkClass = cn(
    rowClass,
    "hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
  );

  if (!item.href) {
    return (
      <div
        aria-disabled="true"
        data-testid={testId}
        className={cn(rowClass, "cursor-default opacity-70")}
      >
        {body}
      </div>
    );
  }

  // `proxied` is an internal destination this app does not render — same tab,
  // no `rel`, but a document load rather than a client-side transition. See
  // `NavLink.proxied`.
  if (item.external || item.proxied) {
    return (
      <a
          role="menuitem"
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        onClick={onNavigate}
        data-testid={testId}
        className={linkClass}
      >
        {body}
      </a>
    );
  }

  return (
    <Link
      role="menuitem"
      href={item.href}
      onClick={onNavigate}
      data-testid={testId}
      className={linkClass}
    >
      {body}
    </Link>
  );
}
