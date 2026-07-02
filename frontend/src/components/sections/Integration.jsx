"use client";
import { CheckCircle2 } from "lucide-react";
import {
  Terminal,
  TerminalLine,
  TerminalOutput,
} from "@/components/magic-ui/terminal";
import { ScriptCopyButton } from "@/components/magic-ui/script-copy-button";
import { BlurFade } from "@/components/magic-ui/blur-fade";

/**
 * INTEGRATION / DEVELOPER
 * Uses: Terminal + Script Copy Button.
 */
export function Integration() {
  return (
    <section
      id="integrations"
      data-testid="integration"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <BlurFade>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand">
              Add to your store in minutes
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] text-ink dark:text-white">
              Shopify one-click install.
              <br className="hidden sm:block" />
              Zero code required.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Install the RabbitPay app, verify your Shopify store, and go live with a
              1-Click checkout. Devs, if you prefer scripting — a single command wires
              up the storefront.
            </p>

            <div className="mt-8 space-y-3">
              <ScriptCopyButton command="npx @rabbitpay/shopify install --store your-shop.myshopify.com" />
              <ScriptCopyButton command="rabbitpay verify --live" />
            </div>

            <ul className="mt-8 space-y-3">
              {[
                "Certified Shopify Plus partner",
                "Works with Prestige, Dawn, and custom themes",
                "PCI-DSS Level 1 · SOC 2 in progress",
                "Sandbox + live keys · full test suite",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-ink/80 dark:text-white/80"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </BlurFade>

          <BlurFade delay={0.15}>
            <Terminal title="rabbitpay ~ ./install.sh">
              <TerminalLine>
                <span className="text-white">npx @rabbitpay/shopify install</span>
              </TerminalLine>
              <TerminalOutput className="mt-1">
                <span className="text-emerald-300">✓</span> Detected shop{" "}
                <span className="text-white">acme-atelier.myshopify.com</span>
              </TerminalOutput>
              <TerminalOutput>
                <span className="text-emerald-300">✓</span> Injecting RabbitPay 1-Click checkout
              </TerminalOutput>
              <TerminalOutput>
                <span className="text-emerald-300">✓</span> Configuring UPI · Cards · Verified COD
              </TerminalOutput>
              <TerminalOutput>
                <span className="text-emerald-300">✓</span> Enabling address prefill (network)
              </TerminalOutput>
              <TerminalOutput>
                <span className="text-emerald-300">✓</span> Registering WhatsApp Utility templates
              </TerminalOutput>
              <TerminalLine className="mt-4">
                <span className="text-white">rabbitpay verify --live</span>
              </TerminalLine>
              <TerminalOutput className="mt-1">
                <span className="text-white">→ webhooks:</span>{" "}
                <span className="text-emerald-300">healthy</span>
              </TerminalOutput>
              <TerminalOutput>
                <span className="text-white">→ merchant account:</span>{" "}
                <span className="text-emerald-300">verified</span>
              </TerminalOutput>
              <TerminalOutput>
                <span className="text-white">→ payout schedule:</span>{" "}
                <span className="text-emerald-300">T+1</span>
              </TerminalOutput>
              <TerminalLine className="mt-4">
                <span className="text-white">rabbitpay ship</span>
                <span className="ml-2 inline-block h-4 w-2 -mb-1 bg-emerald-300 animate-blink" />
              </TerminalLine>
              <TerminalOutput className="mt-3 text-emerald-300">
                🎉 Live in 4m 12s. Checkout is up.
              </TerminalOutput>
            </Terminal>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
