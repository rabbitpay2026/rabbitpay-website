"use client";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const API = process.env.REACT_APP_BACKEND_URL || "";

/**
 * Small inline lead-capture card (Breeze / Fastrr style). Captures email + phone
 * only — no name, no company, no message — and posts to the FastAPI /api/leads
 * endpoint, which emails the demo request. It is NOT a modal or popup: on success
 * it swaps in an inline "Thank you" message.
 *
 * "Give me a Demo" (lead capture) is deliberately separate from "Start Free"
 * (Calendly). This component never opens Calendly.
 */
export function LeadCaptureCard({
  source = "hero_inline",
  testPrefix = "hero-lead",
  showHeading = true,
  className,
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (busy) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(cleanPhone)) {
      toast.error("Please enter a valid mobile number (10-15 digits).");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(`${API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          source,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      // The backend reports whether the notification email actually went out.
      const data = await response.json().catch(() => ({}));
      const emailSent = Boolean(data.email_sent);

      trackEvent("lead_submit", { source, email_sent: emailSent });
      setEmail("");
      setPhone("");
      setDone(true);

      if (emailSent) {
        toast.success("Demo request emailed to the RabbitPay team.");
      } else {
        toast.warning("Request received, but the notification email was NOT sent.", {
          description:
            "Email delivery isn't configured — set EMERGENT_EMAIL_KEY on the backend.",
          duration: 9000,
        });
      }
    } catch {
      toast.error("Couldn't submit just now.", {
        description: "Please try again or email hello@rabbitpay.in.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      data-testid={`${testPrefix}-capture`}
      className={cn(
        "w-full max-w-xl rounded-2xl border border-border bg-white/95 p-5 text-left shadow-[0_24px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/85",
        className,
      )}
    >
      {showHeading ? (
        <p className="text-sm font-semibold text-ink dark:text-white">
          Want to see RabbitPay in action?
        </p>
      ) : null}

      {done ? (
        <div
          data-testid={`${testPrefix}-success`}
          className={cn(
            "flex items-center gap-3 rounded-xl border border-brand/15 bg-brand/5 px-4 py-3.5",
            showHeading ? "mt-4" : "",
          )}
        >
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-brand text-white shadow-[0_10px_24px_rgba(25,107,245,0.24)]">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold text-ink dark:text-white">
            Thank you! Our team will contact you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          {showHeading ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Drop your details and our team will reach out.
            </p>
          ) : null}

          <div className={cn("flex flex-col gap-3.5 sm:flex-row sm:gap-4", showHeading ? "mt-4" : "")}>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              aria-label="Email address"
              data-testid={`${testPrefix}-email`}
              className="h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20 dark:bg-neutral-950/60 dark:text-white"
            />
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter mobile number"
              aria-label="Mobile number"
              data-testid={`${testPrefix}-phone`}
              className="h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20 dark:bg-neutral-950/60 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            data-testid={`${testPrefix}-submit`}
            className="group mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(25,107,245,0.24)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_18px_34px_rgba(25,107,245,0.32)] active:translate-y-0 disabled:opacity-70 sm:w-auto"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Give me a Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
