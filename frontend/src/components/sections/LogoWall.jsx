"use client";
import { Marquee } from "@/components/magic-ui/marquee";

/**
 * SOCIAL PROOF — Logo Wall
 * Uses: Magic UI Marquee (grayscale typographic wordmarks, pause on hover).
 * Brand names courtesy of the user (Indian D2C).
 */
const BRANDS = [
  { name: "Qwerty Cases", url: "https://qwertycases.com/" },
  { name: "Rabbit Rain", url: "https://rabbitrain.com/" },
  { name: "Perlex", url: "https://perlex.shop/" },
  { name: "Airy Store", url: "https://www.airystore.in/" },
  { name: "Sundara", url: "#" },
  { name: "Kavach", url: "#" },
  { name: "Lume & Co.", url: "#" },
  { name: "Moonleaf", url: "#" },
  { name: "Otto Roasters", url: "#" },
  { name: "Vayu Wear", url: "#" },
];

export function LogoWall() {
  return (
    <section
      data-testid="logo-wall"
      className="relative border-y border-border bg-background py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Trusted by fast-growing Indian D2C brands
        </p>
        <div className="mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Marquee pauseOnHover className="[--duration:38s] [--gap:3rem]">
            {BRANDS.map((b) => (
              <a
                key={b.name}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap font-mono text-xl sm:text-2xl font-semibold tracking-tight text-ink/40 dark:text-white/40 transition-colors hover:text-brand"
                data-testid={`brand-${b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                {b.name}
              </a>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
