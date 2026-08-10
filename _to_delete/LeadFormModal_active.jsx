"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLeadForm, RABBITPAY_WHITE_LOGO } from "@/context/LeadFormContext";
import { trackEvent } from "@/lib/analytics";

const API = process.env.REACT_APP_BACKEND_URL || "";

export function LeadFormModal() {
  const { open, setOpen, prefill, closeLeadForm } = useLeadForm();
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const reset = () => {
    setForm({ name: "", email: "", phone: "" });
    setSubmitted(false);
  };

  const handleClose = () => {
    reset();
    closeLeadForm();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (busy) return;

    if (!form.name.trim()) {
      toast.error("Full Name is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const cleanPhone = form.phone.replace(/[\s-()]/g, "");
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(cleanPhone)) {
      toast.error("Please enter a valid phone number (10-15 digits).");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(`${API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          source: prefill?.source || "landing_page",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      trackEvent("lead_submit", {
        source: prefill?.source || "landing_page",
      });
      toast.success("Thank you! Our team will contact you shortly.", {
        duration: 5000,
      });
      setSubmitted(true);
    } catch (error) {
      toast.error("Something went wrong.", {
        description: "We couldn't submit your request just now. Please email hello@rabbitpay.in.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
        } else {
          setOpen(true);
        }
      }}
    >
      <DialogContent
        data-testid="lead-form-modal"
        className="overflow-hidden gap-0 p-0 sm:max-w-[460px]"
      >
        <div className="relative bg-gradient-to-br from-brand-deep via-brand to-accent px-6 pb-8 pt-6 text-white">
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/80 backdrop-blur transition-colors hover:bg-white/20 hover:text-white"
          >
            <span className="text-lg leading-none">x</span>
          </button>
          <div className="flex items-center gap-3">
            <img
              src={RABBITPAY_WHITE_LOGO}
              alt="RabbitPay"
              className="h-10 w-10 rounded-xl ring-1 ring-white/20"
            />
            <div className="text-left">
              <DialogHeader>
                <DialogTitle className="text-left text-lg font-semibold tracking-tight text-white">
                  Request a Demo
                </DialogTitle>
                <DialogDescription className="text-left text-sm text-white/75">
                  Tell us the best way to reach you and we will send a personalized walkthrough.
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="grid gap-5 px-6 py-6">
            <div className="rounded-2xl border border-brand/15 bg-brand/5 px-4 py-5 text-center">
              <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-lg font-semibold text-ink dark:text-white">
                Thank you! Our team will contact you shortly.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-deep"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4 px-6 py-6" data-testid="lead-form">
            <div className="space-y-1.5">
              <Label htmlFor="lf-name" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Full Name *
              </Label>
              <Input
                id="lf-name"
                data-testid="lead-form-name"
                placeholder="Ananya Sharma"
                value={form.name}
                onChange={update("name")}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lf-email" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Email Address *
              </Label>
              <Input
                id="lf-email"
                type="email"
                data-testid="lead-form-email"
                placeholder="ananya@yourbrand.com"
                value={form.email}
                onChange={update("email")}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lf-phone" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Phone Number *
              </Label>
              <Input
                id="lf-phone"
                type="tel"
                data-testid="lead-form-phone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={update("phone")}
                required
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                data-testid="lead-form-submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep disabled:opacity-70"
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
