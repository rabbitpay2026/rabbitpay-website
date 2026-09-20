import { HERO_HIGHLIGHTS } from "@/data/hero-highlights";
import { cn } from "@/lib/utils";
import type { HeroHighlight } from "@/types";

/**
 * The six capability callouts around the hero's checkout demo.
 *
 * Two layouts, one card, one data source, and only ever one of them in the
 * accessibility tree — the other is `display: none`, so nothing is read or
 * tabbed twice.
 *
 *   `floating`  ≥1440px. Three callouts down each side of the phone, each with
 *               a connector line and arrowhead pointing at the device, in the
 *               treatment the two original hero chips used.
 *   `grid`      below 1440px. The same six as a plain responsive grid under the
 *               hero row: two columns on a phone, three from `sm`, six from
 *               `lg`.
 *
 * Everything is positioned against the phone's own wrapper — the `calc(100% +
 * 20px)` offsets resolve against that element, not the page — so the cards and
 * their arrows track the device rather than a guessed page offset. Each card
 * sits 20px outside the wrapper and the phone sits 20px inside it
 * (`lg:mx-5`), so the run from card to device is 40px on both sides and every
 * 36px arrow stops the same 4px short of the glass.
 *
 * Why 1440px, measured rather than guessed. The hero container is capped at
 * `max-w-6xl` (1152px) — text column 615px, phone track 425px — so from 1152px
 * up the composition is fixed and only the gutter outside the container grows.
 * A right-hand callout lives in that gutter, and 1440px is the first width
 * where it fits without being clipped: the phone's right edge lands at 1236px,
 * leaving 168px of card plus its arrow and a 36px margin. Below that the phone
 * would have to shrink to make room, and shrinking it takes away the vertical
 * space the left-hand stack needs, so all six drop to the grid instead.
 */

/**
 * Where each callout sits at ≥1440px, by index into `HERO_HIGHLIGHTS`, and
 * which way its arrow points.
 *
 * Right (1, 4, 5 — UPI, Shopify, fewer steps) always has clear gutter for the
 * phone's whole height: 10 / 45 / 80%.
 *
 * Left (0 autofill, 3 verified COD, 2 one-click) is ordered top to bottom and
 * staggered against the right column. What each one has to clear is the hero's
 * own text, measured at 1440px with the card at x679-847:
 *
 *   above the eyebrow   y164-219   free at every width  -> autofill at 0%
 *   beside the headline y259-368   blocked (headline reaches x791)
 *   beside the desc     y385-470   blocked (paragraph reaches x710)
 *   beside the badges   y504-542   blocked (badge row reaches x714)
 *   below the badges    y542-763   free (lockup x578, CTAs x593) -> the other two
 *
 * So below 1600px the lower two sit at 66% and 88%, in the only clear band
 * there is. From 1600px the phone slides into the right-hand gutter (80px, then
 * 145px at 1800px — see `hero.tsx`), which moves the cards clear of the
 * description and lets verified COD rise to 50% and one-click to 82%: the
 * arrangement the design calls for, evenly stepped against the right column.
 */
const FLOATING = [
  // Address autofill — level with the top of the device, in the band above the
  // eyebrow where the text column is empty at every width.
  { side: "left", position: "right-[calc(100%_+_20px)] top-[0%]" },
  { side: "right", position: "left-[calc(100%_+_20px)] top-[10%]" },
  // One-click checkout — lowest on the left, level with the payment rows.
  { side: "left", position: "right-[calc(100%_+_20px)] top-[88%] min-[1600px]:top-[82%]" },
  // Verified COD — middle. It can only sit beside the description once the
  // device has moved far enough right to clear it, hence the two positions.
  { side: "left", position: "right-[calc(100%_+_20px)] top-[66%] min-[1600px]:top-[50%]" },
  { side: "right", position: "left-[calc(100%_+_20px)] top-[45%]" },
  { side: "right", position: "left-[calc(100%_+_20px)] top-[80%]" },
] as const;

export function HeroHighlights({ variant }: { variant: "floating" | "grid" }) {
  if (variant === "floating") {
    return (
      <div
        data-testid="hero-highlights-floating"
        /* `pointer-events-none` so a callout can never intercept a click meant
           for the interactive checkout demo behind it. */
        className="pointer-events-none absolute inset-0 z-30 hidden min-[1440px]:block"
      >
        {HERO_HIGHLIGHTS.map((item, index) => (
          <HighlightCard
            key={item.title}
            item={item}
            connector={FLOATING[index].side}
            compact
            className={cn(
              "absolute w-[168px]",
              FLOATING[index].position,
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      data-testid="hero-highlights-grid"
      className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 min-[1440px]:hidden"
    >
      {HERO_HIGHLIGHTS.map((item) => (
        <HighlightCard key={item.title} item={item} className="h-full" />
      ))}
    </div>
  );
}

/**
 * One callout: an icon and title on the first line, and — in the grid only —
 * the supporting label across the full card width below it.
 *
 * The floating callouts are `compact`: icon and title, nothing else, matching
 * the reference and halving the card height from ~70px to ~44px. That is not
 * cosmetic. The left-hand column has ~225px of clear height beside the phone,
 * which fits three 44px cards with 45px of air between them but only crushes
 * three 70px ones together. The labels stay on the grid, where the cards are
 * wide enough to carry them.
 *
 * Opaque white with the border and radius the rest of the hero uses. No
 * backdrop blur, so it stays sharp over the grid and the glow.
 *
 * One width, 168px, at every floating size. It used to widen to 190px at
 * 1600px, which is exactly where the phone starts sliding right — the two
 * together pushed the right-hand column 6px past the viewport edge.
 */
function HighlightCard({
  item,
  connector,
  compact,
  className,
}: {
  item: HeroHighlight;
  /** Which edge the arrow leaves from — omitted in the grid, where there is nothing to point at. */
  connector?: "left" | "right";
  /** Floating callouts drop the label: icon and title only, as in the reference. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-white px-3 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:bg-neutral-900",
        className,
      )}
    >
      <span className="flex items-center gap-2">
        <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
          <item.Icon className="h-3.5 w-3.5" />
        </span>
        <span className="text-[12.5px] font-semibold leading-tight text-ink dark:text-white">
          {item.title}
        </span>
      </span>
      {compact ? null : (
        <span className="mt-1.5 block text-[11px] leading-snug text-muted-foreground">
          {item.label}
        </span>
      )}
      {connector ? <Connector side={connector} /> : null}
    </div>
  );
}

/**
 * The line and arrowhead between a callout and the phone — the same hairline
 * and CSS triangle the hero's two original chips used, kept at the brand blue
 * so the connection reads without competing with the card.
 *
 * 36px long from the card's inner edge. The phone sits 20px inside its wrapper,
 * and the cards sit 20px outside it, so the head stops 4px short of the device
 * on both sides: pointing at it, never drawn over it. It leaves from the card's
 * vertical centre, outside the card, so it crosses no text or icon.
 */
function Connector({ side }: { side: "left" | "right" }) {
  const pointsRight = side === "left";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-1/2 h-[7px] w-9 -translate-y-1/2",
        pointsRight ? "left-full" : "right-full",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-brand/40",
          pointsRight ? "left-0 right-[6px]" : "left-[6px] right-0",
        )}
      />
      <span
        className={cn(
          "absolute top-1/2 h-0 w-0 -translate-y-1/2 border-y-[3.5px] border-y-transparent",
          pointsRight
            ? "right-0 border-l-[6px] border-l-brand/70"
            : "left-0 border-r-[6px] border-r-brand/70",
        )}
      />
    </span>
  );
}
