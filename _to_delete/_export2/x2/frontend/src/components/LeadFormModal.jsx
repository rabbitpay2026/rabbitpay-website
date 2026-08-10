"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useLeadForm,
  RABBITPAY_WHITE_LOGO,
} from "@/context/LeadFormContext";
import { trackEvent } from "@/lib/analytics";

const API = process.env.REACT_APP_BACKEND_URL || "";

/**
 * Global lead-capture / Demo Request modal.
 * - Displays Full Name, Email, and Phone Number fields.
 * - Validates all fields on submission.
 * - Submits to the backend leads API.
 * - Triggers success toast upon successful demo request.
 */
export function LeadFormModal() {
  const { open, setOpen, prefill, closeLeadForm } = useLeadForm();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    brand: "Demo Request",
    phone: "",
    monthly_orders: "",
    message: "",
  });

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const reset = () =>
    setForm({
      name: "",
      email: "",
      brand: "Demo Request",
      phone: "",
      monthly_orders: "",
      message: "",
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;

    // Field Validations
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
      const res = await fetch(`${API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: prefill?.source || "landing_page",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      trackEvent("lead_submit", {
        source: prefill?.source || "landing_page",
        brand: form.brand,
      });
      toast.success("Thank you! Our team will contact you shortly.", {
        duration: 5000,
      });
      reset();
      closeLeadForm();
      if (data?.id) console.info("lead:", data.id);
    } catch (err) {
      toast.error("Something went wrong.", {
        description:
          "We couldn't submit your request just now. Please email hello@rabbitpay.in.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-testid="lead-form-modal"
        className="p-0 sm:max-w-[480px] overflow-hidden gap-0"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-brand-deep via-brand to-accent px-6 pt-6 pb-8 text-white">
          <button
            onClick={closeLeadForm}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/80 backdrop-blur transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src={RABBITPAY_WHITE_LOGO}
              alt="RabbitPay"
              className="h-10 w-10 rounded-xl ring-1 ring-white/20"
            />
            <div>
              <DialogHeader className="text-left">
                <DialogTitle className="text-white text-lg font-semibold tracking-tight">
                  Request a Demo
                </DialogTitle>
                <DialogDescription className="text-white/70 text-sm">
                  Let us know how to contact you, and we'll show you RabbitPay in action.
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid gap-4 px-6 py-6"
          data-testid="lead-form"
        >
          {/* Full Name */}
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

          {/* Email Address */}
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

          {/* Phone Number */}
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

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-border mt-2">
            <button
              type="button"
              onClick={closeLeadForm}
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
                  Sending…
                </>
              ) : (
                <>
                  Submit
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
