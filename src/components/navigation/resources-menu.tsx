"use client";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { RESOURCES_LABEL, RESOURCES_NAV } from "@/data/navigation";
import { cn } from "@/lib/utils";
import type { ResourceLink } from "@/types";

/**
 * Desktop "Resources" dropdown.
 *
 * Deliberately hand-rolled rather than pulling in another Radix package: it is a
 * single disclosure button plus a list of links, and the project only ships
 * `@radix-ui/react-accordion` today. Behaviour implemented here:
 *
 *  - opens on click (matching the rest of the header's click-driven controls)
 *  - closes on outside click, on Escape, and after navigating
 *  - roving focus with ArrowUp/ArrowDown, Home/End; Escape returns focus to the
 *    trigger, Tab out closes the menu
 *  - `aria-expanded` / `aria-controls` / `aria-haspopup="menu"` on the trigger,
 *    `role="menu"` + `role="menuitem"` on the panel
 *  - respects prefers-reduced-motion through the shared animation utilities
 *
 * Disabled items (no `href`) render as non-focusable rows with a "Coming soon"
 * pill, so the menu never offers a destination that does not exist.
 */
export function ResourcesMenu({ isActive }: { isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const enabled = RESOURCES_NAV.filter((item) => item.href);

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

  const focusItem = (index: number) => {
    const count = enabled.length;
    if (count === 0) return;
    const next = ((index % count) + count) % count;
    itemRefs.current[next]?.focus();
  };

  const currentIndex = () =>
    itemRefs.current.findIndex((el) => el === document.activeElement);

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
        focusItem(enabled.length - 1);
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

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        data-testid="nav-resources-trigger"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors",
          isActive || open ? "text-brand" : "text-ink/70 hover:text-brand dark:text-white/70",
        )}
      >
        {RESOURCES_LABEL}
        <ChevronDown
          aria-hidden="true"
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={RESOURCES_LABEL}
          data-testid="nav-resources-menu"
          onKeyDown={onPanelKeyDown}
          className="absolute left-1/2 top-full z-50 mt-2 w-[336px] -translate-x-1/2 origin-top animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 duration-200 rounded-2xl border border-border bg-background/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl"
        >
          {RESOURCES_NAV.map((item) => (
            <ResourceRow
              key={item.label}
              item={item}
              onNavigate={() => setOpen(false)}
              registerRef={(el) => {
                if (!item.href) return;
                itemRefs.current[enabled.indexOf(item)] = el;
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * One row in the Resources menu. Shared by the desktop dropdown and the mobile
 * menu so the icon, title and description are defined in exactly one place.
 */
export function ResourceRow({
  item,
  onNavigate,
  registerRef,
}: {
  item: ResourceLink;
  onNavigate?: () => void;
  registerRef?: (el: HTMLAnchorElement | null) => void;
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

  if (!item.href) {
    return (
      <div
        aria-disabled="true"
        data-testid={`resource-${item.label.toLowerCase()}`}
        className={cn(rowClass, "cursor-default opacity-70")}
      >
        {body}
      </div>
    );
  }

  if (item.external) {
    return (
      <a
        ref={registerRef}
        role="menuitem"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        data-testid={`resource-${item.label.toLowerCase()}`}
        className={cn(rowClass, "hover:bg-secondary focus-visible:bg-secondary")}
      >
        {body}
      </a>
    );
  }

  return (
    <Link
      ref={registerRef}
      role="menuitem"
      href={item.href}
      onClick={onNavigate}
      data-testid={`resource-${item.label.toLowerCase()}`}
      className={cn(rowClass, "hover:bg-secondary focus-visible:bg-secondary")}
    >
      {body}
    </Link>
  );
}
