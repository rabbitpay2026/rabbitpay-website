import { Marquee } from "@/components/magic-ui/marquee";
import { CLIENTS } from "@/data/clients";

/** Client logo marquee. Ported from the React `sections/LogoWall.jsx`. */
export function LogoWall() {
  return (
    <section
      data-testid="logo-wall"
      className="relative overflow-hidden border-b border-border bg-white py-10 dark:bg-neutral-950 md:py-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Trusted by D2C brands
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tighter text-ink dark:text-white">
              Built for brands that care about conversion.
            </h2>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">
            RabbitPay fits naturally into premium D2C funnels, whether the goal is higher
            conversion, lower RTO, or a more polished checkout experience.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(248,251,255,0.95),rgba(255,255,255,0.72))] px-4 py-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:bg-white/5">
          <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <Marquee pauseOnHover className="[--duration:34s] [--gap:4rem]" repeat={6}>
              {CLIENTS.map((client) => (
                <a
                  key={client.name}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={client.name}
                  data-testid={`brand-${client.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="group flex h-16 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-white px-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md dark:bg-neutral-900/80"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    className="h-10 w-auto max-w-[160px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0"
                  />
                </a>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
