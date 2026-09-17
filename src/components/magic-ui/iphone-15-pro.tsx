import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Screen height per unit of screen width, derived from the 433:789 device and its 2.9% bezel. */
const SCREEN_ASPECT = 1.873;

/**
 * iPhone device frame, geometry matched to the COD King landing-page mockup.
 * Width comes from the parent; the screen is laid out at `screenWidth` px and
 * scaled to the glass (see `.screen-fit` in globals.css).
 */
export function IPhone15Pro({
  children,
  className,
  screenWidth = 390,
}: {
  children?: ReactNode;
  className?: string;
  screenWidth?: number;
}) {
  return (
    <div className={cn("relative aspect-[433/789] w-full", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-x-[-9%] bottom-[-1.5%] h-[6%] rounded-[50%] bg-ink/[0.16] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-[12%] bottom-[-0.5%] h-[3%] rounded-[50%] bg-ink/[0.22] blur-lg"
      />

      {/* Rail */}
      <div
        className="absolute inset-0 rounded-[15.5%/8.5%] p-[1.7%]"
        style={{
          backgroundImage:
            "conic-gradient(from 132deg at 50% 50%, #f3f5f9 0deg, #bfc6d3 42deg, #878f9c 92deg, #b1b8c5 128deg, #eef1f6 168deg, #d2d8e2 210deg, #9199a5 262deg, #c7cdd8 306deg, #f3f5f9 360deg)",
          boxShadow:
            "0 2px 4px rgba(15,23,42,0.2), 0 20px 34px -14px rgba(15,23,42,0.34), 0 54px 90px -34px rgba(15,23,42,0.42), 0 90px 120px -60px rgba(25,107,245,0.35)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[0.6%] rounded-[15%/8.27%] opacity-70"
          style={{
            backgroundImage:
              "conic-gradient(from 300deg at 50% 50%, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.85) 40deg, rgba(255,255,255,0) 100deg, rgba(255,255,255,0) 220deg, rgba(255,255,255,0.6) 258deg, rgba(255,255,255,0) 320deg)",
          }}
        />

        {/* Inner wall */}
        <div className="relative h-full w-full rounded-[14.1%/7.84%] bg-[#0b1120] p-[1.2%]">
          {/* Glass */}
          <div className="relative h-full w-full overflow-hidden rounded-[13%/7.18%] bg-white [container-type:inline-size]">
            <div
              className="screen-fit"
              style={
                {
                  "--screen-w": `${screenWidth}px`,
                  "--screen-h": `${Math.round(screenWidth * SCREEN_ASPECT)}px`,
                } as CSSProperties
              }
            >
              {children}
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[1.57%] h-[3.59%] w-[29%] -translate-x-1/2 rounded-full bg-[#0b1120]"
            >
              <span className="absolute right-[14%] top-1/2 h-[26%] w-[26%] -translate-y-1/2 rounded-full bg-[#1c2436]" />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(112deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 16%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 66%, rgba(255,255,255,0.1) 82%, rgba(255,255,255,0.03) 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(38% 22% at 12% 4%, rgba(255,255,255,0.55), transparent 70%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[13%/7.18%] shadow-[inset_0_0_2px_rgba(15,23,42,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* Antenna bands */}
      <span
        aria-hidden="true"
        className="absolute -left-[0.2%] top-[9.5%] h-[0.56%] w-[2.4%] rounded-full bg-[#6b7280]/70"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[0.2%] bottom-[9.5%] h-[0.56%] w-[2.4%] rounded-full bg-[#6b7280]/70"
      />

      {/* Side buttons */}
      <div
        aria-hidden="true"
        className="absolute -left-[0.9%] top-[18.45%] h-[4.02%] w-[1.1%] rounded-l-[2px] bg-gradient-to-r from-[#7d8491] via-[#c7cdd8] to-[#a0a7b3]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-[0.9%] top-[26.27%] h-[7.6%] w-[1.1%] rounded-l-[2px] bg-gradient-to-r from-[#7d8491] via-[#c7cdd8] to-[#a0a7b3]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-[0.9%] top-[36.33%] h-[7.6%] w-[1.1%] rounded-l-[2px] bg-gradient-to-r from-[#7d8491] via-[#c7cdd8] to-[#a0a7b3]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-[0.9%] top-[27.95%] h-[11.74%] w-[1.1%] rounded-r-[2px] bg-gradient-to-l from-[#7d8491] via-[#c7cdd8] to-[#a0a7b3]"
      />
    </div>
  );
}
