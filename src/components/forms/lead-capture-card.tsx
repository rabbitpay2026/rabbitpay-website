"use client";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SUPPORT_EMAIL } from "@/data/site";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/leads";
import {
  MAX_MONTHLY_GMV_LENGTH,
  MAX_STORE_URL_LENGTH,
  isValidEmail,
  isValidPhone,
  isValidStoreUrl,
  type LeadSource,
} from "@/lib/leads-schema";
import { cn } from "@/lib/utils";

/**
 * Inline lead-capture card. Captures email + phone only — no name, no company,
 * no message. It is NOT a modal. The "Request a Demo" and "Start Free" CTAs
 * elsewhere on the site scroll to this card rather than submitting anything.
 *
 * Markup, styling, copy and layout are unchanged from the React original; the
 * only additions are the explicit form states the flow needs.
 *
 * States: idle -> submitting -> success | error (error returns to idle so the
 * merchant can retry with their input intact).
 */
type FormState = "idle" | "submitting" | "success";

export function LeadCaptureCard({
  source = "hero_inline",
  testPrefix = "hero-lead",
  showHeading = true,
  submitLabel = "Start Free",
  className,
}: {
  source?: LeadSource;
  testPrefix?: string;
  showHeading?: boolean;
  /**
   * Submit button text. The homepage's closing section passes "Book a Demo",
   * because there the form is the demo request and the team follows up; the
   * default is left alone for /contact, which is a callback request.
   */
  submitLabel?: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [monthlyGmv, setMonthlyGmv] = useState("");
  const [state, setState] = useState<FormState>("idle");

  const busy = state === "submitting";

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Guard against double-submit from a fast second click or Enter key.
    if (busy || state === "success") return;

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(phone)) {
      toast.error("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!isValidStoreUrl(storeUrl)) {
      toast.error("Please enter your store URL (for example, mystore.com).");
      return;
    }
    /*
      Monthly GMV is deliberately absent from this list. It is optional, so the
      only way it can be wrong is by being too long — and `maxLength` on the
      input already makes that untypeable. The server still re-checks it; what
      it must never do is block a merchant who simply left it blank.
    */

    setState("submitting");
    const trimmedGmv = monthlyGmv.trim();
    const result = await submitLead({
      email: email.trim(),
      phone: phone.trim(),
      storeUrl: storeUrl.trim(),
      source,
      // Omitted rather than sent as "" so "not provided" travels as one thing.
      ...(trimmedGmv ? { monthlyGmv: trimmedGmv } : {}),
    });

    if (!result.ok) {
      setState("idle"); // back to idle so the merchant can retry
      toast.error(result.message, {
        description: `You can also email us at ${SUPPORT_EMAIL}.`,
      });
      return;
    }

    /*
      Fired here, after /api/leads has accepted the lead — not in the submit
      handler's first line. A submit that fails validation or that the API
      rejects is not a conversion, and counting it as one would make this event
      useless as a conversion in GA4. The early returns above leave without
      reporting anything, which is correct: the merchant is still on the form.

      `source` distinguishes the three places this same form appears
      (hero_inline, demo_cta, contact_page), so one event name still answers
      "which form did this come from".
    */
    trackEvent(ANALYTICS_EVENTS.DEMO_FORM_SUBMIT, { source });
    setEmail("");
    setPhone("");
    setStoreUrl("");
    setMonthlyGmv("");
    setState("success");
    toast.success("Thanks! Your details are on the way to the RabbitPay team.");
  };

  return (
    <div
      data-testid={`${testPrefix}-capture`}
      data-state={state}
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

      {state === "success" ? (
        <div
          data-testid={`${testPrefix}-success`}
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-center gap-3 rounded-xl border border-brand/15 bg-brand/5 px-4 py-3.5",
            showHeading ? "mt-4" : "",
          )}
        >
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-brand text-white shadow-[0_10px_24px_rgba(25,107,245,0.24)]">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold text-ink dark:text-white">
            Thank you! Our team will contact you within 12–24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          {showHeading ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Apply now and our team will contact you within 12–24 hours.
            </p>
          ) : null}

          <div
            className={cn(
              "flex flex-col gap-3.5 sm:flex-row sm:gap-4",
              showHeading ? "mt-4" : "",
            )}
          >
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              disabled={busy}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              aria-label="Email address"
              data-testid={`${testPrefix}-email`}
              className="h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-70 dark:bg-neutral-950/60 dark:text-white"
            />
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              disabled={busy}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter mobile number"
              aria-label="Mobile number"
              data-testid={`${testPrefix}-phone`}
              className="h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-70 dark:bg-neutral-950/60 dark:text-white"
            />
          </div>

          {/*
            Store URL + Monthly GMV, in a second row that repeats the first
            row's classes exactly — same heights, same gaps, same two-up split
            on desktop — so the card keeps its existing rhythm and nothing
            above it moves.
          */}
          <div className="mt-3.5 flex flex-col gap-3.5 sm:mt-4 sm:flex-row sm:gap-4">
            {/*
              `type="text"`, not `type="url"`. A url input makes the browser
              demand a scheme, so a merchant typing "mystore.com" would be
              stopped by a native bubble before our own, more forgiving check
              ever ran. `inputMode="url"` still gets the right mobile keyboard.
            */}
            <input
              type="text"
              inputMode="url"
              autoComplete="url"
              required
              maxLength={MAX_STORE_URL_LENGTH}
              disabled={busy}
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder="Enter store URL"
              aria-label="Store URL"
              data-testid={`${testPrefix}-store-url`}
              className="h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-70 dark:bg-neutral-950/60 dark:text-white"
            />
            <input
              type="text"
              inputMode="text"
              autoComplete="off"
              maxLength={MAX_MONTHLY_GMV_LENGTH}
              disabled={busy}
              value={monthlyGmv}
              onChange={(e) => setMonthlyGmv(e.target.value)}
              placeholder="Monthly GMV (optional)"
              aria-label="Monthly GMV (optional)"
              data-testid={`${testPrefix}-monthly-gmv`}
              className="h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-70 dark:bg-neutral-950/60 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            aria-busy={busy}
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
                {submitLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
