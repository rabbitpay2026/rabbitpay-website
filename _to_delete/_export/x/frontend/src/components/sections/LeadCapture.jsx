"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Mail, Phone, ArrowRight, Check } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { trackEvent, LEAD_FORM_ID } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const API = process.env.REACT_APP_BACKEND_URL || "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9]{10,15}$/;

/**
 * HOMEPAGE INLINE LEAD CAPTURE
 * The single, primary conversion component for the site. Sits directly below
 * the Metrics band. Collects email + mobile number and posts to the existing
 * /api/leads backend (which stores the lead and emails the sales inbox).
 *
 * - No modal, no popup, no redirect — everything happens on this page.
 * - Blue-bordered, rounded, premium SaaS styling (Breeze-inspired inline form).
 * - Inline validation, success state with an animated checkmark.
 */
export function LeadCapture() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({ email: "", phone: "" });

  const validate = () => {
    const next = { email: "", phone: "" };
    if (!EMAIL_RE.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    if (!PHONE_RE.test(cleanPhone)) {
      next.phone = "Enter a valid mobile number (10–15 digits).";
    }
    setErrors(next);
    return !next.email && !next.phone;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!validate()) return;

    setBusy(true);
    try {
      const res = await fetch(`${API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "N/A",
          email: email.trim(),
          phone: phone.replace(/[\s\-()]/g, ""),
          source: "homepage_inline_form",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      trackEvent("lead_submit", { source: "homepage_inline_form" });
      // Success state
      setEmail("");
      setPhone("");
      setErrors({ email: "", phone: "" });
      setDone(true);
      if (data?.id) console.info("lead:", data.id);
    } catch (err) {
      toast.error("Something went wrong.", {
        description:
          "We couldn't submit your details just now. Please try again or email hello@rabbitpay.in.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id={LEAD_FORM_ID}
      data-testid="lead-capture"
      className="relative scroll-mt-24 py-16 md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(900px_360px_at_50%_-10%,rgba(25,107,245,0.12),transparent_60%)]"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <BlurFade>
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
            Want to see RabbitPay in action?
          </h2>
        </BlurFade>
        <BlurFade delay={0.12}>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Get a personalized walkthrough of RabbitPay's 1-Click Checkout
            experience and discover how leading D2C brands increase conversions
            and reduce RTO.
          </p>
        </BlurFade>

        <BlurFade delay={0.22}>
          <div className="mx-auto mt-8 max-w-2xl">
            {done ? (
              <SuccessState reduce={reduce} onReset={() => setDone(false)} />
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                data-testid="lead-capture-form"
                className="rounded-2xl border border-border bg-background/70 p-4 shadow-[0_10px_40px_-12px_rgba(25,107,245,0.18)] backdrop-blur-xl sm:p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start">
                  {/* Email */}
                  <Field
                    id="lc-email"
                    icon={<Mail className="h-4 w-4" />}
                    error={errors.email}
                    className="md:flex-1"
                  >
                    <input
                      id="lc-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      data-testid="lead-capture-email"
                      placeholder="Enter email address"
                      aria-label="Email address"
                      aria-invalid={!!errors.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={busy}
                      className="peer w-full bg-transparent pl-10 pr-3 text-sm text-ink outline-none placeholder:text-muted-foreground dark:text-white"
                    />
                  </Field>

                  {/* Phone */}
                  <Field
                    id="lc-phone"
                    icon={<Phone className="h-4 w-4" />}
                    error={errors.phone}
                    className="md:flex-1"
                  >
                    <input
                      id="lc-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      data-testid="lead-capture-phone"
                      placeholder="Enter mobile number"
                      aria-label="Mobile number"
                      aria-invalid={!!errors.phone}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={busy}
                      className="peer w-full bg-transparent pl-10 pr-3 text-sm text-ink outline-none placeholder:text-muted-foreground dark:text-white"
                    />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={busy}
                    data-testid="lead-capture-submit"
                    className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-deep hover:shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 md:px-7"
                  >
                    {busy ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Start Free
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-3 text-left text-xs text-muted-foreground md:text-center">
                  No credit card required. We'll reach out within one business day.
                </p>
              </form>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

/** A rounded, blue-focus input shell with a leading icon + inline error. */
function Field({ id, icon, error, className, children }) {
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative flex h-12 items-center rounded-xl border bg-background transition-colors",
          "focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/30",
          error ? "border-destructive" : "border-input",
        )}
      >
        <span className="pointer-events-none absolute left-3 text-muted-foreground">
          {icon}
        </span>
        {children}
      </div>
      {error ? (
        <p
          role="alert"
          className="mt-1.5 text-left text-xs font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Post-submission confirmation with an animated checkmark. */
function SuccessState({ reduce, onReset }) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="lead-capture-success"
      className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-brand/30 bg-brand-soft/60 px-6 py-8 dark:bg-brand/10"
    >
      <motion.span
        initial={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-[0_12px_28px_rgba(25,107,245,0.35)]"
      >
        <motion.span
          initial={reduce ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <Check className="h-7 w-7" strokeWidth={3} />
        </motion.span>
      </motion.span>
      <p className="mt-4 text-lg font-semibold tracking-tight text-ink dark:text-white">
        Thank you! Our team will contact you shortly.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-sm font-medium text-brand underline-offset-4 hover:underline"
      >
        Submit another
      </button>
    </div>
  );
}
