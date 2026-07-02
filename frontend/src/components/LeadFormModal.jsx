"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLeadForm, RABBITPAY_LOGO } from "@/context/LeadFormContext";

const API = process.env.REACT_APP_BACKEND_URL;

const MONTHLY_ORDER_BUCKETS = [
  "0 – 500",
  "500 – 5,000",
  "5,000 – 20,000",
  "20,000 – 50,000",
  "50,000+",
];

/**
 * Global lead-capture modal.
 * - shadcn Dialog + Input + Textarea + Select
 * - POSTs to `${REACT_APP_BACKEND_URL}/api/leads` (Resend email sent server-side)
 * - Sonner toast on success/error
 */
export function LeadFormModal() {
  const { open, setOpen, prefill, closeLeadForm } = useLeadForm();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    brand: "",
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
      brand: "",
      phone: "",
      monthly_orders: "",
      message: "",
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!form.name || !form.email || !form.brand) {
      toast.error("Please share your name, work email and brand.");
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
      toast.success("Thanks — we'll be in touch shortly.", {
        description:
          "A RabbitPay specialist will reach out within 1 business day.",
        duration: 5000,
      });
      reset();
      closeLeadForm();
      // Optionally log id for debugging
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
        className="p-0 sm:max-w-[560px] overflow-hidden gap-0"
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
              src={RABBITPAY_LOGO}
              alt="RabbitPay"
              className="h-10 w-10 rounded-xl ring-1 ring-white/20"
            />
            <div>
              <DialogHeader className="text-left">
                <DialogTitle className="text-white text-lg font-semibold tracking-tight">
                  Start with RabbitPay
                </DialogTitle>
                <DialogDescription className="text-white/70 text-sm">
                  Tell us about your brand — a specialist will reach out within
                  1 business day.
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid gap-4 px-6 py-6 sm:grid-cols-2"
          data-testid="lead-form"
        >
          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="lf-name" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Your name *
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
          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="lf-email" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Work email *
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
          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="lf-brand" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Brand / Company *
            </Label>
            <Input
              id="lf-brand"
              data-testid="lead-form-brand"
              placeholder="Sundara"
              value={form.brand}
              onChange={update("brand")}
              required
            />
          </div>
          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="lf-phone" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Phone (optional)
            </Label>
            <Input
              id="lf-phone"
              data-testid="lead-form-phone"
              placeholder="+91 98•••••420"
              value={form.phone}
              onChange={update("phone")}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Monthly orders
            </Label>
            <Select
              value={form.monthly_orders}
              onValueChange={update("monthly_orders")}
            >
              <SelectTrigger data-testid="lead-form-orders">
                <SelectValue placeholder="Choose a range" />
              </SelectTrigger>
              <SelectContent>
                {MONTHLY_ORDER_BUCKETS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="lf-msg" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Anything to share?
            </Label>
            <Textarea
              id="lf-msg"
              data-testid="lead-form-message"
              placeholder="Tell us about your checkout, current RTO, categories, etc."
              rows={3}
              value={form.message}
              onChange={update("message")}
            />
          </div>

          <div className="sm:col-span-2 flex flex-col-reverse items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              By submitting you agree to be contacted by RabbitPay.
            </p>
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
                  <Sparkles className="h-4 w-4" />
                  Get started
                  <Send className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
