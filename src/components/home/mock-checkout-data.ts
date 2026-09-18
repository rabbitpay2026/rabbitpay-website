import { Banknote, CreditCard, Landmark, Smartphone, Wallet, type LucideIcon } from "lucide-react";

/** Logical width the checkout screen is laid out at before it is scaled to the device glass. */
export const SCREEN_WIDTH = 390;

/** Demo-only values. Nothing typed into the mock is sent or stored. */
export const DEMO_PHONE = "9876543210";
export const RECENT_PHONE = "9123456780";
export const DEMO_CODE = "4729";
export const CODE_LENGTH = 4;
export const RESEND_SECONDS = 45;

export const CART_TOTAL = 1499;
export const COUPON = { code: "RABBIT150", saving: 150 } as const;
export const PREPAID_OFF = 100;

export const DEMO_CUSTOMER = {
  name: "Demo Customer",
  tag: "Home",
  address: "221 Demo Street, Sample Nagar, Bengaluru, Karnataka 560001, India",
  email: "demo@example.com",
} as const;

export type PaymentId = "upi" | "card" | "wallet" | "netbanking" | "cod";

export const PAYMENT_METHODS: readonly {
  id: PaymentId;
  title: string;
  icon: LucideIcon;
  prepaid: boolean;
}[] = [
  { id: "upi", title: "Pay via UPI", icon: Smartphone, prepaid: true },
  { id: "card", title: "Pay via Debit/Credit cards", icon: CreditCard, prepaid: true },
  { id: "wallet", title: "Pay via Wallets", icon: Wallet, prepaid: true },
  { id: "netbanking", title: "Pay via NetBanking", icon: Landmark, prepaid: true },
  { id: "cod", title: "Cash on Delivery", icon: Banknote, prepaid: false },
];

const inrFormat = new Intl.NumberFormat("en-IN");

export function inr(amount: number) {
  return `₹${inrFormat.format(amount)}`;
}

export function prettyPhone(digits: string) {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}
