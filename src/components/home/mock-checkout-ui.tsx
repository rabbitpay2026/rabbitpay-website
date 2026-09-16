"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  BadgePercent,
  ChevronDown,
  ChevronRight,
  Eye,
  LogOut,
  Mail,
  MapPin,
  MessageSquareText,
  Pencil,
  Phone,
  QrCode,
  TicketPercent,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import {
  CART_TOTAL,
  CODE_LENGTH,
  COUPON,
  DEMO_CODE,
  DEMO_CUSTOMER,
  DEMO_PHONE,
  PAYMENT_METHODS,
  PREPAID_OFF,
  RECENT_PHONE,
  RESEND_SECONDS,
  inr,
  prettyPhone,
  type PaymentId,
} from "@/components/home/mock-checkout-data";
import {
  BrandLoader,
  CARD,
  CardNetworks,
  CheckoutFooter,
  CheckoutHeader,
  CouponCard,
  HomeIndicator,
  IndiaFlag,
  OfferPill,
  OrderSummaryCard,
  PRESSABLE,
  SectionLabel,
  StatusBar,
  StepBanner,
  UpiApps,
  WhatsAppIcon,
} from "@/components/home/mock-checkout-parts";
import { cn } from "@/lib/utils";

type Stage = "phone" | "otp" | "verifying" | "checkout";

/** Demo pacing in ms, taken from the COD King hero checkout demo. */
const BEAT = {
  beforeCoupon: 1800,
  beforeTyping: 1000,
  typeDigit: 140,
  beforeSend: 1000,
  beforeCode: 1500,
  typeCode: 320,
  beforeVerify: 1000,
  verifying: 1000,
  // COD King's 4200ms delivery + payment read, split around the scroll.
  readDelivery: 2100,
  readPayments: 2100,
  afterChoice: 3200,
  idleResume: 20000,
} as const;

const EASE = [0.2, 0, 0, 1] as const;

const STAGE_LABEL: Record<Stage, string> = {
  phone: "entering a mobile number",
  otp: "verifying the one-time code",
  verifying: "verifying",
  checkout: "choosing a payment method",
};

const emptyCode = () => Array.from({ length: CODE_LENGTH }, () => "");

/** Interactive, fully local RabbitPay checkout demo. No network calls, nothing is stored. */
export function MockCheckoutUI() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const paymentsRef = useRef<HTMLDivElement>(null);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
  const inView = useInView(rootRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion() ?? false;

  const [stage, setStage] = useState<Stage>("phone");
  const [digits, setDigits] = useState("");
  const [fieldActive, setFieldActive] = useState(false);
  const [historyCleared, setHistoryCleared] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [code, setCode] = useState<string[]>(emptyCode);
  const [codeTouched, setCodeTouched] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [method, setMethod] = useState<PaymentId | null>(null);
  const [qrRequested, setQrRequested] = useState(false);
  const [scrolledToPayments, setScrolledToPayments] = useState(false);
  // `auto` drives the demo until the visitor interacts; it resumes after BEAT.idleResume.
  const [auto, setAuto] = useState(true);
  const [touches, setTouches] = useState(0);

  const driving = auto && inView && !reduceMotion;
  const saved = couponApplied ? COUPON.saving : 0;
  const total = CART_TOTAL - saved;
  const prepaidTotal = total - PREPAID_OFF;
  const sheetOpen = stage === "otp" || stage === "verifying";
  const phoneComplete = digits.length === DEMO_PHONE.length;
  // While the demo drives, the typed state holds until Send instead of collapsing on the last digit.
  const phoneTyping = stage === "phone" && (!phoneComplete || driving) && (fieldActive || digits.length > 0);
  const showRecent = phoneTyping && !historyCleared;
  const phoneFocused = phoneTyping;
  const activeBox = stage === "otp" ? code.findIndex((digit) => digit === "") : -1;

  const restart = useCallback(() => {
    setStage("phone");
    setDigits("");
    setFieldActive(false);
    setHistoryCleared(false);
    setCouponApplied(false);
    setCode(emptyCode());
    setCodeTouched(false);
    setSeconds(RESEND_SECONDS);
    setMethod(null);
    setQrRequested(false);
    setScrolledToPayments(false);
  }, []);

  const takeOver = useCallback(() => {
    setAuto(false);
    setTouches((count) => count + 1);
  }, []);

  const sendCode = useCallback(() => {
    if (digits.length !== DEMO_PHONE.length) setDigits(DEMO_PHONE);
    setFieldActive(false);
    setCode(emptyCode());
    setCodeTouched(false);
    setSeconds(RESEND_SECONDS);
    setStage("otp");
  }, [digits]);

  useEffect(() => {
    if (!driving || stage !== "phone") return;

    let delay: number;
    let step: () => void;
    if (!couponApplied) {
      delay = BEAT.beforeCoupon;
      step = () => setCouponApplied(true);
    } else if (!phoneComplete) {
      delay = digits.length === 0 ? BEAT.beforeTyping : BEAT.typeDigit;
      step = () => setDigits(DEMO_PHONE.slice(0, digits.length + 1));
    } else {
      delay = BEAT.beforeSend;
      step = sendCode;
    }

    const id = window.setTimeout(step, delay);
    return () => window.clearTimeout(id);
  }, [couponApplied, digits, driving, phoneComplete, sendCode, stage]);

  useEffect(() => {
    if (stage !== "otp" || seconds <= 0 || !inView) return;
    const id = window.setTimeout(() => setSeconds((left) => left - 1), 1000);
    return () => window.clearTimeout(id);
  }, [inView, seconds, stage]);

  // Simulated OTP autofill: runs unless the visitor starts typing the code themselves.
  useEffect(() => {
    if (stage !== "otp") return;

    const next = code.findIndex((digit) => digit === "");
    if (next === -1) {
      const id = window.setTimeout(() => setStage("verifying"), BEAT.beforeVerify);
      return () => window.clearTimeout(id);
    }
    if (codeTouched || !inView) return;

    const id = window.setTimeout(
      () =>
        setCode((current) =>
          reduceMotion
            ? DEMO_CODE.split("")
            : current.map((digit, index) => (index === next ? DEMO_CODE[index] : digit)),
        ),
      next === 0 ? BEAT.beforeCode : BEAT.typeCode,
    );
    return () => window.clearTimeout(id);
  }, [code, codeTouched, inView, reduceMotion, stage]);

  useEffect(() => {
    if (stage !== "verifying") return;
    const id = window.setTimeout(() => setStage("checkout"), BEAT.verifying);
    return () => window.clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (!driving || stage !== "checkout") return;

    let id: number;
    if (!scrolledToPayments) {
      id = window.setTimeout(() => {
        const top = (paymentsRef.current?.offsetTop ?? 0) - 10;
        scrollRef.current?.scrollTo({ top, behavior: "smooth" });
        setScrolledToPayments(true);
      }, BEAT.readDelivery);
    } else if (!method) {
      id = window.setTimeout(() => setMethod("upi"), BEAT.readPayments);
    } else {
      id = window.setTimeout(restart, BEAT.afterChoice);
    }
    return () => window.clearTimeout(id);
  }, [driving, method, restart, scrolledToPayments, stage]);

  useEffect(() => {
    if (auto || reduceMotion || !inView) return;
    const id = window.setTimeout(() => {
      restart();
      setAuto(true);
    }, BEAT.idleResume);
    return () => window.clearTimeout(id);
  }, [auto, inView, reduceMotion, restart, touches]);

  const goBack = () => {
    if (stage === "otp") setStage("phone");
    else if (stage === "checkout") restart();
  };

  // The number field only ever holds one of the two demo numbers, so no visitor data is entered.
  const onPhoneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      setFieldActive(true);
      setDigits((current) => {
        if (current.length >= DEMO_PHONE.length) return current;
        const source =
          RECENT_PHONE.startsWith(current) && !DEMO_PHONE.startsWith(current)
            ? RECENT_PHONE
            : DEMO_PHONE;
        return source.slice(0, current.length + 1);
      });
    } else if (event.key === "Backspace") {
      event.preventDefault();
      setDigits((current) => current.slice(0, -1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      sendCode();
    }
  };

  const writeCodeDigit = (index: number, value: string) => {
    setCode((current) => current.map((digit, i) => (i === index ? value : digit)));
  };

  const onCodeChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "").slice(-1);
    setCodeTouched(true);
    writeCodeDigit(index, value);
    if (value) codeRefs.current[index + 1]?.focus();
  };

  const onCodeKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      event.preventDefault();
      setCodeTouched(true);
      writeCodeDigit(index - 1, "");
      codeRefs.current[index - 1]?.focus();
    }
  };

  const resend = () => {
    setCode(emptyCode());
    setCodeTouched(false);
    setSeconds(RESEND_SECONDS);
  };

  const fade = reduceMotion ? { duration: 0 } : { duration: 0.38, ease: EASE };

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={`RabbitPay checkout demo — ${STAGE_LABEL[stage]}`}
      onClickCapture={takeOver}
      onKeyDownCapture={takeOver}
      className="flex h-full w-full flex-col bg-[#F4F6FA] font-sans text-ink antialiased"
    >
      <StatusBar />
      <CheckoutHeader
        total={total}
        original={couponApplied ? CART_TOTAL : undefined}
        onBack={goBack}
      />
      <StepBanner />

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          {stage === "checkout" ? (
            <motion.div
              key="checkout"
              ref={scrollRef}
              onWheel={takeOver}
              onTouchStart={takeOver}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={fade}
              className="absolute inset-0 overflow-y-auto px-[10px] pt-[10px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <OrderSummaryCard saved={saved} />

              <SectionLabel>Offers &amp; Rewards</SectionLabel>
              {couponApplied ? (
                <div className={cn(CARD, "flex items-center gap-[10px] px-[12px] py-[9px]")}>
                  <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[8px] bg-brand-soft text-brand">
                    <TicketPercent className="h-[14px] w-[14px]" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-semibold leading-none text-ink">
                      {COUPON.code} applied
                    </span>
                    <span className="mt-[4px] block text-[10.5px] leading-none text-brand-deep">
                      You saved {inr(COUPON.saving)}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setCouponApplied(false)}
                    className={cn("rounded-[6px] px-[4px] text-[11px] font-semibold text-brand", PRESSABLE)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className={cn(CARD, "flex h-[42px] items-center gap-[10px] px-[12px]")}>
                  <TicketPercent className="h-[15px] w-[15px] text-ink/40" strokeWidth={1.8} />
                  <span className="flex-1 text-[11.5px] text-ink/40">Enter coupon code</span>
                  <button
                    type="button"
                    onClick={() => setCouponApplied(true)}
                    className={cn("rounded-[6px] px-[4px] text-[11px] font-semibold text-brand", PRESSABLE)}
                  >
                    Apply {COUPON.code}
                  </button>
                </div>
              )}

              <div className={cn(CARD, "mt-[10px] px-[12px] pb-[10px] pt-[11px]")}>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-[6px] text-[12.5px] font-semibold leading-none text-ink">
                    <MapPin className="h-[14px] w-[14px]" strokeWidth={1.8} />
                    Delivery
                  </p>
                  <span className="flex h-[24px] items-center gap-[2px] rounded-full border border-[#E1E6EE] bg-white pl-[10px] pr-[6px] text-[11px] font-medium text-ink">
                    Edit
                    <ChevronRight className="h-[12px] w-[12px]" strokeWidth={2} />
                  </span>
                </div>
                <div className="mt-[9px] flex items-center gap-[7px]">
                  <p className="text-[13px] font-semibold leading-none text-ink">{DEMO_CUSTOMER.name}</p>
                  <span className="rounded-full border border-brand/25 bg-brand-soft px-[7px] py-[3px] text-[9.5px] font-medium leading-none text-brand-deep">
                    {DEMO_CUSTOMER.tag}
                  </span>
                </div>
                <div className="mt-[9px] rounded-[10px] bg-[#F5F7FA] px-[10px] py-[9px]">
                  <p className="text-[10.5px] leading-[1.55] text-ink/55">{DEMO_CUSTOMER.address}</p>
                  <div className="mt-[6px] flex flex-wrap items-center gap-x-[12px] gap-y-[4px] text-[10.5px] leading-none text-ink/60">
                    <span className="flex items-center gap-[5px] tabular-nums">
                      <Phone className="h-[11px] w-[11px]" strokeWidth={1.8} />
                      {prettyPhone(digits || DEMO_PHONE)}
                    </span>
                    <span className="flex items-center gap-[5px]">
                      <Mail className="h-[11px] w-[11px]" strokeWidth={1.8} />
                      {DEMO_CUSTOMER.email}
                    </span>
                  </div>
                </div>
                <span aria-hidden="true" className="mt-[10px] block h-px bg-[#EEF1F5]" />
                <div className="mt-[9px] flex items-center gap-[8px] text-[11px] leading-none">
                  <span className="shrink-0 font-medium text-ink">Shipping Method</span>
                  <span className="min-w-0 flex-1 truncate text-ink/50">Standard Delivery (3-5 days)</span>
                  <span className="shrink-0 font-semibold text-brand">Free</span>
                </div>
              </div>

              <div ref={paymentsRef} className="mt-[16px] flex items-center gap-[10px] px-[2px]">
                <span className="h-px flex-1 bg-ink/10" />
                <span className="text-[10.5px] font-medium uppercase leading-none tracking-[0.12em] text-ink/40">
                  Payment methods
                </span>
                <span className="h-px flex-1 bg-ink/10" />
              </div>

              <div className="mt-[10px] rounded-[18px] bg-brand px-[5px] pb-[5px] shadow-[0_10px_24px_-14px_rgba(25,107,245,0.7)]">
                <p className="py-[6px] text-center text-[10.5px] font-semibold leading-none text-white">
                  Most people use this!
                </p>
                <div className="rounded-[14px] bg-white px-[12px] pb-[14px] pt-[11px]">
                  <div className="flex items-start gap-[10px]">
                    <QrCode className="mt-[1px] h-[18px] w-[18px] shrink-0 text-ink/60" strokeWidth={1.7} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold leading-none text-ink">Pay via UPI</p>
                      <p className="mt-[5px] text-[10.5px] leading-none text-ink/50">Scan &amp; pay instantly</p>
                    </div>
                    <div className="flex flex-col items-end gap-[6px]">
                      <span className="text-[13px] font-semibold leading-none tabular-nums text-ink">
                        {inr(prepaidTotal)}
                      </span>
                      <OfferPill>
                        <BadgePercent className="h-[10px] w-[10px]" strokeWidth={2} />
                        Flat {inr(PREPAID_OFF)} Off
                      </OfferPill>
                    </div>
                  </div>
                  <div className="mt-[12px] flex items-center gap-[12px]">
                    <div className="relative h-[80px] w-[80px] shrink-0">
                      <DemoQr />
                      <button
                        type="button"
                        onClick={() => setQrRequested(true)}
                        className={cn(
                          "absolute -bottom-[8px] left-1/2 flex h-[24px] -translate-x-1/2 items-center gap-[4px] whitespace-nowrap rounded-full border border-[#E1E6EE] bg-white px-[9px] text-[10.5px] font-semibold text-ink shadow-[0_2px_6px_rgba(15,23,42,0.12)]",
                          PRESSABLE,
                        )}
                      >
                        <Eye className="h-[12px] w-[12px]" strokeWidth={2} />
                        Show QR
                      </button>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10.5px] leading-[1.45] text-ink/60">
                        {qrRequested
                          ? "Demo checkout: no payment code is generated."
                          : "Tap Show QR to generate your payment code"}
                      </p>
                      <div className="mt-[8px]">
                        <UpiApps />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[10px] space-y-[8px]">
                {PAYMENT_METHODS.map(({ id, title, icon: Icon, prepaid }) => {
                  const selected = method === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMethod(id)}
                      aria-pressed={selected}
                      className={cn(
                        CARD,
                        "flex w-full items-center gap-[10px] px-[12px] py-[11px] text-left",
                        PRESSABLE,
                        selected
                          ? "border-brand bg-[#F5F9FF] ring-1 ring-brand/30"
                          : "hover:border-[#D5DCE6]",
                      )}
                    >
                      <Icon
                        className={cn("h-[18px] w-[18px] shrink-0", selected ? "text-brand" : "text-ink/55")}
                        strokeWidth={1.7}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-[6px] gap-y-[3px] text-[12.5px] font-medium leading-tight text-ink">
                          {title}
                          {id === "upi" ? <UpiApps /> : null}
                          {id === "card" ? <CardNetworks /> : null}
                        </span>
                        {prepaid ? (
                          <OfferPill className="mt-[5px]">
                            <BadgePercent className="h-[10px] w-[10px]" strokeWidth={2} />
                            Flat {inr(PREPAID_OFF)} Off
                          </OfferPill>
                        ) : null}
                      </span>
                      <span className="text-[12.5px] font-semibold tabular-nums text-ink">
                        {inr(prepaid ? prepaidTotal : total)}
                      </span>
                      <ChevronRight
                        className={cn("h-[14px] w-[14px] shrink-0", selected ? "text-brand" : "text-ink/35")}
                        strokeWidth={2}
                      />
                    </button>
                  );
                })}
              </div>
              {method ? (
                <p className="mt-[8px] text-center text-[10px] leading-none text-ink/45">
                  Demo checkout: no payment is initiated.
                </p>
              ) : null}

              <div className={cn(CARD, "mt-[10px] flex items-center justify-between px-[12px] py-[9px]")}>
                <div>
                  <p className="text-[10px] leading-none text-ink/50">Logged in with</p>
                  <p className="mt-[4px] text-[12px] leading-none tabular-nums text-ink">
                    +91{digits || DEMO_PHONE}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={restart}
                  className={cn(
                    "flex h-[28px] items-center gap-[5px] rounded-[8px] border border-[#D5DCE6] bg-white px-[9px] text-[11px] font-medium text-ink hover:bg-black/[0.02]",
                    PRESSABLE,
                  )}
                >
                  <LogOut className="h-[12px] w-[12px]" strokeWidth={2} />
                  Logout
                </button>
              </div>

              <CheckoutFooter />
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fade}
              className={cn(
                "absolute inset-0 overflow-y-auto px-[10px] pt-[10px] transition-[filter] duration-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                sheetOpen && "pointer-events-none blur-[3px]",
              )}
              inert={sheetOpen}
            >
              <OrderSummaryCard saved={saved} />

              <SectionLabel>Offers &amp; Rewards</SectionLabel>
              <CouponCard applied={couponApplied} onToggle={() => setCouponApplied((applied) => !applied)} />

              <div className={cn(CARD, "mt-[10px] px-[12px] pb-[14px] pt-[12px]")}>
                <p className="flex items-center gap-[6px] text-[10.5px] font-semibold uppercase leading-none tracking-[0.06em] text-ink/40">
                  <Phone className="h-[12px] w-[12px]" strokeWidth={1.8} />
                  Enter mobile
                </p>

                <div
                  className={cn(
                    "mt-[9px] flex h-[44px] items-center rounded-[11px] border bg-white px-[11px] transition-[border-color,box-shadow] duration-200",
                    phoneFocused ? "border-brand shadow-[0_0_0_3px_rgba(25,107,245,0.12)]" : "border-[#E1E6EE]",
                  )}
                >
                  <span className="flex shrink-0 items-center gap-[6px]">
                    <IndiaFlag />
                    <span className="text-[14px] font-medium leading-none text-ink">+91</span>
                    <ChevronDown className="h-[13px] w-[13px] text-ink/45" strokeWidth={2} />
                  </span>
                  <span aria-hidden="true" className="mx-[10px] h-[24px] w-px shrink-0 bg-black/[0.09]" />
                  <span className="relative min-w-0 flex-1 text-[16px]">
                    <input
                      readOnly
                      value={digits}
                      onClick={() => setFieldActive(true)}
                      onKeyDown={onPhoneKeyDown}
                      type="tel"
                      inputMode="none"
                      autoComplete="off"
                      aria-label="Mobile number (demo)"
                      placeholder="Phone"
                      className="w-full cursor-text bg-transparent text-[16px] font-medium leading-none tabular-nums text-ink outline-none placeholder:font-normal placeholder:text-ink/35"
                    />
                    {phoneFocused ? (
                      <span
                        aria-hidden="true"
                        style={{ left: `${digits.length}ch` }}
                        className="pointer-events-none absolute top-1/2 h-[18px] w-[1.5px] -translate-y-1/2 animate-blink bg-ink/80"
                      />
                    ) : null}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {showRecent ? (
                    <motion.div
                      key="recent"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={fade}
                      className="overflow-hidden"
                    >
                      <div className="mt-[10px] rounded-[11px] border border-[#E6EAF0] bg-[#F7F9FC] px-[11px] pb-[10px] pt-[11px]">
                        <p className="text-[11.5px] font-medium leading-none text-ink">Recently used numbers</p>
                        <button
                          type="button"
                          onClick={() => {
                            setDigits(RECENT_PHONE);
                            setFieldActive(false);
                          }}
                          className={cn(
                            "mt-[9px] flex h-[36px] w-full items-center gap-[5px] rounded-[9px] border border-[#E1E6EE] bg-white px-[10px] text-[12.5px] tabular-nums text-ink hover:border-brand/40",
                            PRESSABLE,
                          )}
                        >
                          <span className="font-semibold">+91</span>
                          {RECENT_PHONE}
                        </button>
                        <button
                          type="button"
                          onClick={() => setHistoryCleared(true)}
                          className={cn(
                            "mt-[9px] rounded-[4px] text-[10.5px] leading-none text-ink/50 underline underline-offset-2",
                            PRESSABLE,
                          )}
                        >
                          Clear history
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={sendCode}
                  className={cn(
                    "mt-[12px] flex h-[42px] w-full items-center justify-center gap-[8px] rounded-[10px] bg-brand text-[13px] font-semibold text-white shadow-[0_8px_18px_-10px_rgba(25,107,245,0.8)] hover:bg-brand-deep",
                    PRESSABLE,
                  )}
                >
                  <WhatsAppIcon className="h-[17px] w-[17px]" />
                  Send Code to WhatsApp
                </button>
              </div>

              <CheckoutFooter />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {sheetOpen ? (
            <motion.div
              key="scrim"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fade}
              className="absolute inset-0 bg-ink/10"
            />
          ) : null}
          {sheetOpen ? (
            <motion.div
              key="sheet"
              initial={{ y: reduceMotion ? 0 : "100%", opacity: reduceMotion ? 0 : 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: reduceMotion ? 0 : "100%", opacity: reduceMotion ? 0 : 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.42, ease: EASE }}
              className="absolute inset-x-0 bottom-0 top-[64px] flex flex-col rounded-t-[24px] bg-[#F4F6FA] shadow-[0_-12px_30px_-14px_rgba(15,23,42,0.35)]"
            >
              <div className="relative min-h-0 flex-1">
                <AnimatePresence initial={false} mode="wait">
                  {stage === "otp" ? (
                    <motion.div
                      key="otp"
                      exit={{ opacity: 0 }}
                      transition={fade}
                      className="flex h-full flex-col items-center px-[20px] pt-[24px] text-center"
                    >
                      <LockGlyph />
                      <p className="mt-[12px] text-[17px] font-semibold leading-none text-ink">
                        Verify Mobile Number
                      </p>
                      <p className="mt-[8px] text-[10.5px] leading-none text-ink/45">
                        For a secure and faster checkout
                      </p>
                      <p className="mt-[18px] flex items-center justify-center gap-[6px] text-[11.5px] leading-none text-ink/70">
                        Enter the code sent to
                        <span className="font-medium tabular-nums text-ink underline underline-offset-2">
                          +91{digits}
                        </span>
                        <button
                          type="button"
                          onClick={() => setStage("phone")}
                          className={cn(
                            "flex items-center gap-[3px] rounded-[5px] bg-brand-soft px-[5px] py-[3px] text-[11px] font-medium leading-none text-brand",
                            PRESSABLE,
                          )}
                        >
                          Edit
                          <Pencil className="h-[10px] w-[10px]" strokeWidth={2} />
                        </button>
                      </p>

                      <div className="mt-[18px] flex gap-[10px]">
                        {code.map((digit, index) => (
                          <span key={index} className="relative">
                            <input
                              ref={(node) => {
                                codeRefs.current[index] = node;
                              }}
                              value={digit}
                              onChange={onCodeChange(index)}
                              onKeyDown={onCodeKeyDown(index)}
                              onFocus={(event) => event.target.select()}
                              type="text"
                              inputMode="numeric"
                              autoComplete="off"
                              maxLength={1}
                              aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
                              className={cn(
                                "h-[48px] w-[46px] rounded-[10px] border text-center text-[18px] font-semibold tabular-nums text-ink outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(25,107,245,0.15)]",
                                digit ? "border-ink/25 bg-brand-soft" : "border-[#D5DCE6] bg-white",
                                index === activeBox &&
                                  !codeTouched &&
                                  "border-brand shadow-[0_0_0_3px_rgba(25,107,245,0.15)]",
                              )}
                            />
                            {index === activeBox && !codeTouched ? (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 top-1/2 h-[20px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 animate-blink bg-ink/80"
                              />
                            ) : null}
                          </span>
                        ))}
                      </div>

                      <p className="mt-[18px] text-[10.5px] leading-none text-ink/45">
                        Didn&apos;t receive the code?{" "}
                        {seconds > 0 ? (
                          <span className="font-medium tabular-nums text-ink/75">
                            Retry in 00:{String(seconds).padStart(2, "0")}
                          </span>
                        ) : (
                          <span className="font-medium text-brand">Resend below</span>
                        )}
                      </p>
                      <div className="mt-[12px] flex items-center gap-[8px] text-[10.5px] leading-none text-ink/45">
                        Re-send via:
                        {(
                          [
                            ["SMS", <MessageSquareText key="sms" className="h-[11px] w-[11px]" strokeWidth={1.8} />],
                            ["WhatsApp", <WhatsAppIcon key="wa" className="h-[11px] w-[11px]" />],
                          ] as const
                        ).map(([label, icon]) => (
                          <button
                            key={label}
                            type="button"
                            disabled={seconds > 0}
                            onClick={resend}
                            className={cn(
                              "flex h-[22px] items-center gap-[4px] rounded-[5px] border border-[#D5DCE6] bg-white px-[6px] text-[10.5px] text-ink/70 disabled:opacity-60",
                              PRESSABLE,
                            )}
                          >
                            {label}
                            {icon}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="verifying"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={fade}
                      className="flex h-full items-center justify-center pb-[24px]"
                    >
                      <BrandLoader label="Verifying your number..." />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <CheckoutFooter />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <HomeIndicator />
    </div>
  );
}

function LockGlyph() {
  const gradientId = useId();
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-[52px] w-[52px]">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A8CFA" />
          <stop offset="1" stopColor="#0D4CB3" />
        </linearGradient>
      </defs>
      <path
        d="M15 21v-6a9 9 0 0 1 18 0v6"
        fill="none"
        stroke="#0D4CB3"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="9" y="20" width="30" height="24" rx="5" fill={`url(#${gradientId})`} />
      <circle cx="24" cy="30" r="3.2" fill="#fff" />
      <rect x="22.6" y="31" width="2.8" height="7" rx="1.4" fill="#fff" />
    </svg>
  );
}

/** Blurred placeholder in the shape of a QR code; intentionally not a scannable code. */
function DemoQr() {
  const size = 11;
  const inFinder = (row: number, col: number) =>
    (row < 3 && col < 3) || (row < 3 && col >= size - 3) || (row >= size - 3 && col < 3);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="h-full w-full rounded-[8px] bg-white p-[6px] opacity-70 blur-[2.5px] ring-1 ring-[#E6EAF0]"
      shapeRendering="crispEdges"
    >
      {Array.from({ length: size * size }, (_, i) => {
        const row = Math.floor(i / size);
        const col = i % size;
        const on = inFinder(row, col) ? row % 2 === 0 || col % 2 === 0 : (row * 7 + col * 13) % 3 === 0;
        return on ? <rect key={i} x={col} y={row} width={1} height={1} fill="#0F172A" /> : null;
      })}
    </svg>
  );
}
