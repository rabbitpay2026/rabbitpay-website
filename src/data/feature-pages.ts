import {
  Banknote,
  Blocks,
  LayoutGrid,
  MapPin,
  MousePointerClick,
  Palette,
  ShieldCheck,
  Smartphone,
  SplitSquareHorizontal,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { NavMenuSection, ResourceLink } from "@/types";

/**
 * The Features section — one list that the header dropdown, the footer column,
 * the `/features` catalogue and every page's "related features" block read.
 *
 * Scope rule: every entry is a capability this site already publishes (the FAQ
 * in `data/faq.ts`, `data/features.ts`, `data/integrations.ts`, the homepage
 * sections) or that RabbitPay's own documentation describes in a way that
 * agrees with it. Nothing is added because a competing checkout offers it.
 */

export type FeatureDestination = {
  /** Route path — also the key other modules use to refer to the page. */
  href:
    | "/features/one-click-checkout"
    | "/features/address-autofill"
    | "/features/upi-checkout"
    | "/solutions/checkout-conversion"
    | "/integrations";
  label: string;
  /** One line for the dropdown row. */
  description: string;
  Icon: LucideIcon;
};

export const ALL_FEATURES_LINK: ResourceLink & { href: "/features" } = {
  label: "All Features",
  description: "Everything the RabbitPay checkout does, in one place.",
  href: "/features",
  Icon: LayoutGrid,
};

export const ONE_CLICK_CHECKOUT: FeatureDestination = {
  href: "/features/one-click-checkout",
  label: "One-Click Checkout",
  description: "Mobile number, one-time code, then pay.",
  Icon: MousePointerClick,
};

export const ADDRESS_AUTOFILL: FeatureDestination = {
  href: "/features/address-autofill",
  label: "Address Autofill",
  description: "Saved details come back prefilled and editable.",
  Icon: MapPin,
};

export const UPI_CHECKOUT: FeatureDestination = {
  href: "/features/upi-checkout",
  label: "UPI Checkout",
  description: "UPI first, with other methods alongside.",
  Icon: Smartphone,
};

export const CHECKOUT_CONVERSION: FeatureDestination = {
  href: "/solutions/checkout-conversion",
  label: "Improve Checkout Conversion",
  description: "Where shoppers drop off, and what addresses it.",
  Icon: TrendingUp,
};

export const INTEGRATIONS: FeatureDestination = {
  href: "/integrations",
  label: "Integrations",
  description: "Shopify, payment gateways, Meta and Google.",
  Icon: Blocks,
};

/** Every page in the section, in the order the footer and related links use. */
export const FEATURE_DESTINATIONS: FeatureDestination[] = [
  ONE_CLICK_CHECKOUT,
  ADDRESS_AUTOFILL,
  UPI_CHECKOUT,
  CHECKOUT_CONVERSION,
  INTEGRATIONS,
];

/** The Features dropdown: individual features, then the solution and setup pages. */
export const FEATURES_MENU_SECTIONS: NavMenuSection[] = [
  { title: "Checkout features", items: [ONE_CLICK_CHECKOUT, ADDRESS_AUTOFILL, UPI_CHECKOUT] },
  { title: "Solutions & setup", items: [CHECKOUT_CONVERSION, INTEGRATIONS] },
];

/* ------------------------------ /features cards ----------------------------- */

export type FeatureCard = {
  name: string;
  /** What it is, in one or two plain sentences. */
  description: string;
  /** What the shopper or merchant gets from it. */
  benefit: string;
  Icon: LucideIcon;
  href: string;
  /** Link text. Says where it goes when that is not a dedicated page. */
  linkLabel: string;
};

export type FeatureGroup = {
  id: string;
  title: string;
  intro: string;
  cards: FeatureCard[];
};

/**
 * The catalogue on `/features`. One card per capability — no capability
 * appears twice.
 *
 * Capabilities with a dedicated page link to it. The rest are answered in a
 * specific FAQ category, and the link text says so rather than implying a
 * feature page exists: brand customisation, part payment, verified COD and the
 * COD convenience fee.
 */
export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "checkout-experience",
    title: "Checkout experience",
    intro: "What the shopper sees between the Buy button and the order confirmation.",
    cards: [
      {
        // source: FAQ `what-is-rabbitpay-checkout`, the homepage walkthrough steps.
        name: ONE_CLICK_CHECKOUT.label,
        description:
          "The shopper enters a mobile number, confirms it with a one-time code, and reaches a single screen with their details, order summary and payment options.",
        benefit: "Fewer steps than a multi-page form, especially on mobile.",
        Icon: ONE_CLICK_CHECKOUT.Icon,
        href: ONE_CLICK_CHECKOUT.href,
        linkLabel: "Explore one-click checkout",
      },
      {
        // source: FAQ `address-prefill`, `data/features.ts` prefill bullets.
        name: ADDRESS_AUTOFILL.label,
        description:
          "Once the number is verified, the shopper's saved name, address, phone and email come back already filled in.",
        benefit: "Less typing and fewer address errors — every field stays editable.",
        Icon: ADDRESS_AUTOFILL.Icon,
        href: ADDRESS_AUTOFILL.href,
        linkLabel: "Explore address autofill",
      },
      {
        // source: FAQ `brand-customization`.
        name: "Brand customisation",
        description: "The checkout carries your logo, colours and styling.",
        benefit: "Shoppers stay inside a checkout that looks like your store.",
        Icon: Palette,
        href: "/faq#checkout",
        linkLabel: "Read about it in the FAQ",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    intro: "How shoppers pay, and how that money reaches you.",
    cards: [
      {
        // source: FAQ `what-payment-methods`, `data/integrations.ts` UPI_APPS.
        name: UPI_CHECKOUT.label,
        description:
          "UPI takes the first position in the payment step, with cards, netbanking, wallets and cash on delivery alongside it.",
        benefit: "Shoppers pay with the UPI apps already on their phone.",
        Icon: UPI_CHECKOUT.Icon,
        href: UPI_CHECKOUT.href,
        linkLabel: "Explore UPI checkout",
      },
      {
        // source: FAQ `part-payment`.
        name: "Part payment",
        description:
          "Collect part of the order value online and the rest in cash when the order is delivered.",
        benefit: "Adds commitment to a COD order without taking COD away.",
        Icon: SplitSquareHorizontal,
        href: "/faq#payments",
        linkLabel: "Read about it in the FAQ",
      },
      {
        // source: FAQ `existing-payment-gateway`, `multiple-payment-gateways`, `settlements`.
        name: "Your existing gateway",
        description:
          "RabbitPay works with the payment gateway you already use, and supports running more than one.",
        benefit: "No gateway switch, and settlements carry on as they are.",
        Icon: Wallet,
        href: INTEGRATIONS.href,
        linkLabel: "See supported integrations",
      },
    ],
  },
  {
    id: "cash-on-delivery",
    title: "Cash on delivery",
    intro: "Keep COD for the shoppers who want it, with checks around it.",
    cards: [
      {
        // source: FAQ `verified-cod-how`, RISK_CARDS in `data/features.ts`.
        name: "Verified COD",
        description:
          "Pending COD orders are screened before dispatch and risk checks run before fulfilment.",
        benefit: "Aims to cut fake orders and return-to-origin (RTO) costs.",
        Icon: ShieldCheck,
        href: "/faq#checkout",
        linkLabel: "Read how it works in the FAQ",
      },
      {
        // source: FAQ `cod-transaction-fee`.
        name: "COD convenience fee",
        description:
          "Add your own fee to cash-on-delivery orders to encourage shoppers to pay online.",
        benefit: "Your fee, set by you — separate from RabbitPay's pricing.",
        Icon: Banknote,
        href: "/faq#pricing",
        linkLabel: "Read about it in the FAQ",
      },
    ],
  },
];
