"use client";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";
import { PARTNER_TYPE_OPTIONS } from "@/data/partners";
import { SUPPORT_EMAIL } from "@/data/site";
import { submitPartnerApplication } from "@/lib/partners";
import {
  MAX_COMPANY_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_FULL_NAME_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_STORE_URL_LENGTH,
  PARTNER_MESSAGES,
  isPartnerType,
  isValidEmail,
  isValidFullName,
  isValidPartnerPhone,
  isValidWebsiteUrl,
  type PartnerApplicationField,
  type PartnerApplicationInput,
} from "@/lib/partners-schema";
import { cn } from "@/lib/utils";

/**
 * The partner application form. States: idle -> submitting -> success | error.
 * An error returns to idle with every entered value intact, so the applicant
 * can correct one field and retry. Success is shown only after the API confirms
 * the application email was accepted.
 */
type FormState = "idle" | "submitting" | "success";

type Values = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  websiteUrl: string;
  partnerType: string;
  message: string;
};

const EMPTY: Values = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  websiteUrl: "",
  partnerType: "",
  message: "",
};

const FIELD_CLASS =
  "w-full rounded-xl border border-border bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-70 dark:bg-neutral-950/60 dark:text-white";
const INPUT_CLASS = `h-11 ${FIELD_CLASS}`;
const INVALID_CLASS = "border-destructive focus:border-destructive focus:ring-destructive/20";

function validate(values: Values): Partial<Record<PartnerApplicationField, string>> {
  const errors: Partial<Record<PartnerApplicationField, string>> = {};
  if (!isValidFullName(values.fullName)) errors.fullName = PARTNER_MESSAGES.fullName;
  if (!isValidEmail(values.email)) errors.email = PARTNER_MESSAGES.email;
  if (!isValidPartnerPhone(values.phone)) errors.phone = PARTNER_MESSAGES.phone;
  if (!isValidWebsiteUrl(values.websiteUrl)) errors.websiteUrl = PARTNER_MESSAGES.websiteUrl;
  if (!isPartnerType(values.partnerType)) errors.partnerType = PARTNER_MESSAGES.partnerType;
  if (values.message.trim().length > MAX_MESSAGE_LENGTH) errors.message = PARTNER_MESSAGES.message;
  return errors;
}

export function PartnerForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<PartnerApplicationField, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [state, setState] = useState<FormState>("idle");
  // Guards against a second submit landing before React has re-rendered.
  const inFlight = useRef(false);

  const busy = state === "submitting";

  const set = (field: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!(field in current)) return current;
      const next = { ...current };
      delete next[field as PartnerApplicationField];
      return next;
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current || busy || state === "success") return;

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setFormError("Please correct the highlighted fields and try again.");
      return;
    }

    inFlight.current = true;
    setErrors({});
    setFormError(null);
    setState("submitting");

    const payload: PartnerApplicationInput = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      websiteUrl: values.websiteUrl.trim(),
      partnerType: values.partnerType as PartnerApplicationInput["partnerType"],
      ...(values.company.trim() ? { company: values.company.trim() } : {}),
      ...(values.message.trim() ? { message: values.message.trim() } : {}),
    };

    const result = await submitPartnerApplication(payload);
    inFlight.current = false;

    if (!result.ok) {
      // Values are left untouched, so nothing typed is lost.
      setState("idle");
      if (result.field) setErrors({ [result.field]: result.message });
      setFormError(result.message);
      return;
    }

    setValues(EMPTY);
    setState("success");
  };

  if (state === "success") {
    return (
      <div
        data-testid="partner-form-success"
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-brand/20 bg-brand/5 p-6 sm:p-8"
      >
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-ink dark:text-white">
          Application received
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Thanks — your application has been emailed to the RabbitPay partnerships team, and
          we&apos;ll be in touch within 12-24 hours. If anything is urgent, email us at{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-medium text-brand underline underline-offset-4"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      data-testid="partner-form"
      data-state={state}
      className="rounded-2xl border border-border bg-card p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8"
    >
      {formError ? (
        <div
          role="alert"
          data-testid="partner-form-error"
          className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-sm text-destructive">{formError}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="partner-full-name"
          label="Full name"
          required
          error={errors.fullName}
          value={values.fullName}
          onChange={set("fullName")}
          disabled={busy}
          autoComplete="name"
          maxLength={MAX_FULL_NAME_LENGTH}
          placeholder="Asha Rao"
        />
        <Field
          id="partner-email"
          label="Work email"
          required
          type="email"
          inputMode="email"
          error={errors.email}
          value={values.email}
          onChange={set("email")}
          disabled={busy}
          autoComplete="email"
          maxLength={MAX_EMAIL_LENGTH}
          placeholder="you@company.com"
        />
        <Field
          id="partner-phone"
          label="Phone number"
          required
          type="tel"
          inputMode="tel"
          error={errors.phone}
          value={values.phone}
          onChange={set("phone")}
          disabled={busy}
          autoComplete="tel"
          maxLength={MAX_PHONE_LENGTH}
          placeholder="98765 43210"
          hint="10-digit Indian mobile number."
        />
        <Field
          id="partner-company"
          label="Company or organisation"
          optional
          error={errors.company}
          value={values.company}
          onChange={set("company")}
          disabled={busy}
          autoComplete="organization"
          maxLength={MAX_COMPANY_LENGTH}
          placeholder="Company name"
        />
        {/*
          `type="text"`, not `type="url"`: a url input demands a scheme, so
          "mystore.com" would be stopped by a native bubble before our own, more
          forgiving check runs. `inputMode="url"` still gets the right keyboard.
        */}
        <Field
          id="partner-website"
          label="Website or store URL"
          required
          inputMode="url"
          error={errors.websiteUrl}
          value={values.websiteUrl}
          onChange={set("websiteUrl")}
          disabled={busy}
          autoComplete="url"
          maxLength={MAX_STORE_URL_LENGTH}
          placeholder="agency.com"
        />

        <div>
          <Label htmlFor="partner-type" required>
            Partner type
          </Label>
          <select
            id="partner-type"
            name="partnerType"
            required
            disabled={busy}
            value={values.partnerType}
            onChange={(event) => set("partnerType")(event.target.value)}
            aria-invalid={errors.partnerType ? true : undefined}
            aria-describedby={errors.partnerType ? "partner-type-message" : undefined}
            data-testid="partner-type"
            className={cn(INPUT_CLASS, "mt-2", errors.partnerType && INVALID_CLASS)}
          >
            <option value="">Select a partner type</option>
            {PARTNER_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldMessage id="partner-type-message" error={errors.partnerType} />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="partner-message" optional>
          How would you like to work with us?
        </Label>
        <textarea
          id="partner-message"
          name="message"
          rows={4}
          disabled={busy}
          value={values.message}
          onChange={(event) => set("message")(event.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Tell us about the merchants you work with, or anything else we should know."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "partner-message-message" : undefined}
          data-testid="partner-message"
          className={cn(FIELD_CLASS, "mt-2 py-3 leading-relaxed", errors.message && INVALID_CLASS)}
        />
        <FieldMessage id="partner-message-message" error={errors.message} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          data-testid="partner-submit"
          className="inline-flex h-11 flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting...
            </>
          ) : (
            <>
              Submit application
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-xs text-muted-foreground">
          We use these details only to review your application and get back to you.
        </p>
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  required,
  optional,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-ink dark:text-white">
      {children}
      {required ? (
        <span className="ml-1 text-brand" aria-hidden="true">
          *
        </span>
      ) : null}
      {optional ? <span className="ml-1 text-muted-foreground">(optional)</span> : null}
    </label>
  );
}

function FieldMessage({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error) {
    return (
      <p id={id} className="mt-1.5 text-xs text-destructive">
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={id} className="mt-1.5 text-xs text-muted-foreground">
        {hint}
      </p>
    );
  }
  return null;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  optional,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "type">) {
  const messageId = `${id}-message`;
  return (
    <div>
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      <input
        {...rest}
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        data-testid={id}
        className={cn(INPUT_CLASS, "mt-2", error && INVALID_CLASS)}
      />
      <FieldMessage id={messageId} error={error} hint={hint} />
    </div>
  );
}
