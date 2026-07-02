"use client";
import { useRef } from "react";
import {
  ShoppingBag,
  Zap,
  IndianRupee,
  CheckCircle2,
  QrCode,
  Landmark,
  Wallet,
} from "lucide-react";
import { AnimatedBeam, BeamNode } from "@/components/magic-ui/animated-beam";
import { BlurFade } from "@/components/magic-ui/blur-fade";

/**
 * HOW IT WORKS
 * Uses: Animated Beam connecting Store → RabbitPay → Payment rails → Confirmed.
 */
export function HowItWorks() {
  const containerRef = useRef(null);
  const storeRef = useRef(null);
  const rabbitRef = useRef(null);
  const upiRef = useRef(null);
  const cardRef = useRef(null);
  const codRef = useRef(null);
  const doneRef = useRef(null);

  return (
    <section
      data-testid="how-it-works"
      className="relative border-t border-border bg-secondary/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand">
            How it works
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] text-ink dark:text-white">
            From &ldquo;Add to cart&rdquo; to &ldquo;Order placed&rdquo; — in three seconds.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            RabbitPay sits between your Shopify store and every Indian payment method — orchestrating a checkout that feels instant.
          </p>
        </BlurFade>

        <BlurFade delay={0.15}>
          <div
            ref={containerRef}
            className="relative mt-14 flex min-h-[380px] items-center justify-between overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 sm:px-12"
          >
            {/* Column 1: Store */}
            <div className="flex flex-col items-center gap-3">
              <BeamNode ref={storeRef} className="bg-white text-ink dark:bg-neutral-900 dark:text-white">
                <ShoppingBag className="h-6 w-6" />
              </BeamNode>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Your Store
              </span>
            </div>

            {/* Column 2: RabbitPay */}
            <div className="flex flex-col items-center gap-3">
              <BeamNode
                ref={rabbitRef}
                className="border-brand/40 bg-brand text-white shadow-lg shadow-brand/30"
              >
                <Zap className="h-6 w-6" />
              </BeamNode>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                RabbitPay 1-Click
              </span>
            </div>

            {/* Column 3: Payment rails (stacked) */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <BeamNode ref={upiRef} className="!size-12 bg-white text-ink dark:bg-neutral-900 dark:text-white">
                  <QrCode className="h-5 w-5" />
                </BeamNode>
                <span className="text-sm font-medium text-ink dark:text-white">UPI</span>
              </div>
              <div className="flex items-center gap-3">
                <BeamNode ref={cardRef} className="!size-12 bg-white text-ink dark:bg-neutral-900 dark:text-white">
                  <Landmark className="h-5 w-5" />
                </BeamNode>
                <span className="text-sm font-medium text-ink dark:text-white">Cards</span>
              </div>
              <div className="flex items-center gap-3">
                <BeamNode ref={codRef} className="!size-12 bg-white text-ink dark:bg-neutral-900 dark:text-white">
                  <Wallet className="h-5 w-5" />
                </BeamNode>
                <span className="text-sm font-medium text-ink dark:text-white">Verified COD</span>
              </div>
            </div>

            {/* Column 4: Confirmed */}
            <div className="flex flex-col items-center gap-3">
              <BeamNode
                ref={doneRef}
                className="border-success/40 bg-success text-white shadow-lg shadow-success/30"
              >
                <CheckCircle2 className="h-6 w-6" />
              </BeamNode>
              <span className="text-xs font-semibold uppercase tracking-widest text-success">
                Order confirmed
              </span>
            </div>

            {/* Beams */}
            <AnimatedBeam containerRef={containerRef} fromRef={storeRef} toRef={rabbitRef} />
            <AnimatedBeam containerRef={containerRef} fromRef={rabbitRef} toRef={upiRef} curvature={-40} />
            <AnimatedBeam containerRef={containerRef} fromRef={rabbitRef} toRef={cardRef} />
            <AnimatedBeam containerRef={containerRef} fromRef={rabbitRef} toRef={codRef} curvature={40} />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={upiRef}
              toRef={doneRef}
              curvature={-40}
              gradientStartColor="#22D3EE"
              gradientStopColor="#16A34A"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={cardRef}
              toRef={doneRef}
              gradientStartColor="#22D3EE"
              gradientStopColor="#16A34A"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={codRef}
              toRef={doneRef}
              curvature={40}
              gradientStartColor="#22D3EE"
              gradientStopColor="#16A34A"
            />
          </div>
        </BlurFade>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Step
            no="01"
            title="Install in minutes"
            body="Add the RabbitPay app to Shopify. No dev work required."
          />
          <Step
            no="02"
            title="Ship 1-Click checkout"
            body="Address prefill, UPI, cards, verified COD — all live instantly."
          />
          <Step
            no="03"
            title="Watch conversions climb"
            body="Track uplift, RTO, and revenue impact in your merchant dashboard."
          />
        </div>
      </div>
    </section>
  );
}

function Step({ no, title, body }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <span className="text-xs font-mono font-semibold text-brand">{no}</span>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink dark:text-white">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
