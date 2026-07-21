"use client";
import { Star } from "lucide-react";
import { Marquee } from "@/components/magic-ui/marquee";
import { MagicCard } from "@/components/magic-ui/magic-card";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { cn } from "@/lib/utils";

const REVIEWS = [
  {
    quote:
      "We moved to RabbitPay in a weekend. Prepaid share went up 22% in the first month - the UPI-first flow is a game-changer.",
    name: "Ananya Sharma",
    role: "Founder, Qwerty Cases",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzAxNTUzN3ww&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "The COD verification alone paid for itself. Returns dropped from 32% to 21% in two months - no re-platforming needed.",
    name: "Rohan Iyer",
    role: "CEO, Rabbit Rain",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzAxNTUzN3ww&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "Our ops team finally has a checkout that behaves. Address prefill + risk scoring means fewer support tickets and cleaner ledgers.",
    name: "Priya Menon",
    role: "Head of Ops, Perlex",
    avatar:
      "https://images.unsplash.com/photo-1699899657680-421c2c2d5064?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzAxNTUzN3ww&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "Support that feels like a partner, not a portal. RabbitPay picks up in minutes - literally rare for a payments company.",
    name: "Karan Verma",
    role: "Founder, Airy Store",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzAxNTUzN3ww&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "We saved 60 hours of dev in the first quarter. The Shopify install is the smoothest we've ever done.",
    name: "Meera Nair",
    role: "CTO, Sundara",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzAxNTUzN3ww&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "For a tier-2 heavy business like ours, the pincode intelligence is priceless. Fewer failed COD, more happy customers.",
    name: "Aditya Rao",
    role: "Founder, Kavach",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MzAxNTUzN3ww&ixlib=rb-4.1.0&q=85",
  },
];

/**
 * TESTIMONIALS
 */
export function Testimonials() {
  const row1 = REVIEWS.slice(0, 3);
  const row2 = REVIEWS.slice(3, 6);

  return (
    <section
      data-testid="testimonials"
      className="relative border-t border-border py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand">
            Loved by founders
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
            Real merchants. Real numbers. Real reviews.
          </h2>
        </BlurFade>
      </div>

      <div className="relative mt-14 flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Marquee pauseOnHover className="[--duration:60s] [--gap:1.25rem]">
          {row1.map((r, i) => (
            <ReviewCard key={`row1-${i}`} review={r} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:70s] [--gap:1.25rem]">
          {row2.map((r, i) => (
            <ReviewCard key={`row2-${i}`} review={r} tone="alt" />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function ReviewCard({ review, tone }) {
  return (
    <MagicCard
      className={cn(
        "w-[340px] flex-shrink-0 rounded-2xl border border-border bg-card p-6 shadow-sm sm:w-[380px]",
        tone === "alt" && "bg-secondary/50",
      )}
    >
      <div className="flex items-center gap-1 text-brand">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-brand text-brand" />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink dark:text-white sm:text-[15px]">
        "{review.quote}"
      </p>
      <div className="mt-6 flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          loading="lazy"
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover ring-1 ring-border"
        />
        <div>
          <p className="text-sm font-semibold text-ink dark:text-white">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.role}</p>
        </div>
      </div>
    </MagicCard>
  );
}
