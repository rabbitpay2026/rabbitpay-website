import { CheckCircle2, Clock, ShieldCheck, Zap } from "lucide-react";
import type { MetricItem } from "@/types";

/** Homepage "Merchant impact" stat cards. Values mirror the React implementation. */
export const METRICS: MetricItem[] = [
  { value: 35, prefix: "+", suffix: "%", label: "Conversion Uplift", Icon: Zap },
  { value: 28, prefix: "-", suffix: "%", label: "Return-to-Origin", Icon: ShieldCheck },
  { value: 3, prefix: "<", suffix: "s", label: "Checkout Time", Icon: Clock },
  { value: 92, suffix: "%", label: "Address Prefill Rate", Icon: CheckCircle2 },
];
