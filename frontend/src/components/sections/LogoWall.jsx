"use client";
import { Marquee } from "@/components/magic-ui/marquee";

/**
 * SOCIAL PROOF — Logo Wall
 * Real RabbitPay client logos rendered as grayscale images inside a Magic UI Marquee.
 */
const CLIENTS = [
  {
    name: "Qwerty Cases",
    url: "https://www.qwertycases.com/",
    logo:
      "https://www.qwertycases.com/cdn/shop/files/Qwerty_Cases-01_51860609-3d39-41dc-af67-989219e2af07.png?v=1753348676&width=300",
  },
  {
    name: "Perlex",
    url: "https://perlex.shop/",
    logo: "https://perlex.shop/cdn/shop/files/logoo.webp?v=1761931049",
  },
  {
    name: "Airy Store",
    url: "https://www.airystore.in/",
    logo:
      "https://www.airystore.in/cdn/shop/files/logo1.png?v=1770641802&width=330",
  },
  {
    name: "Rabbit Rain",
    url: "https://www.rabbitrain.com/",
    logo:
      "https://www.rabbitrain.com/cdn/shop/files/Rabbit_Rain_4.png?v=1752223707&width=500",
  },
];

export function LogoWall() {
  return (
    <section
      data-testid="logo-wall"
      className="relative border-y border-border bg-background py-10 md:py-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Trusted by fast-growing Indian D2C brands
        </p>
        <div className="mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Marquee
            pauseOnHover
            className="[--duration:34s] [--gap:4rem]"
            repeat={6}
          >
            {CLIENTS.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.name}
                data-testid={`brand-${c.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`}
                className="group flex h-14 shrink-0 items-center justify-center px-2"
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  loading="lazy"
                  className="h-10 sm:h-12 w-auto max-w-[160px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0"
                />
              </a>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
