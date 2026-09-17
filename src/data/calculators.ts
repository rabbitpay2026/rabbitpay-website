/**
 * The five calculators: their route, labels, headings and the short explanation
 * rendered beneath each one.
 *
 * Copy only — the maths lives in `lib/calculators/formulas.ts`, and every
 * formula written out here describes exactly what that module computes. No
 * benchmark, typical margin or "good ROAS" figure appears anywhere: the page
 * only ever reports what the merchant's own numbers produce.
 */

export type CalculatorId = "profit-margin" | "roi" | "roas" | "high-profit" | "revenue";

/** The id GA4 and Plausible receive. snake_case, like every other event name. */
export type CalculatorAnalyticsId =
  | "profit_margin"
  | "roi"
  | "roas"
  | "high_profit"
  | "revenue";

export type CalculatorContent = {
  id: CalculatorId;
  /** This calculator's own page. */
  href: string;
  analyticsId: CalculatorAnalyticsId;
  /** Short name, used in the switcher and the hub. */
  label: string;
  /** One line under the label. */
  hint: string;
  /** Page heading. */
  title: string;
  summary: string;
  explainer: {
    whatIs: string;
    steps: string[];
    formulas: { result: string; expression: string }[];
    whyItMatters: string;
    note?: { title: string; body: string };
  };
};

export const CALCULATORS: CalculatorContent[] = [
  {
    id: "profit-margin",
    href: "/calculator/profit-margin",
    analyticsId: "profit_margin",
    label: "Profit Margin",
    hint: "Net profit after all costs",
    title: "Profit margin calculator",
    summary:
      "See what's left of your revenue after product cost, ads, shipping, payment fees and everything else.",
    explainer: {
      whatIs:
        "It works out your net profit and net profit margin: the share of revenue you keep after every cost you enter, not just the cost of the product. Use it for one order, one product or a whole month — as long as every number covers the same orders.",
      steps: [
        "Add product cost, advertising, shipping and fulfilment, payment fees and other costs to get total costs.",
        "Subtract total costs from revenue to get net profit.",
        "Divide net profit by revenue and multiply by 100 to get net profit margin.",
      ],
      formulas: [
        {
          result: "Total costs",
          expression: "Product cost + Advertising + Shipping + Payment fees + Other costs",
        },
        { result: "Net profit", expression: "Revenue − Total costs" },
        { result: "Net profit margin", expression: "(Net profit ÷ Revenue) × 100" },
        { result: "Gross profit", expression: "Revenue − Product cost" },
      ],
      whyItMatters:
        "A product can show a healthy gross margin while ad spend, shipping and payment fees quietly take most of it. Net margin tells you whether your orders actually make money, and how much room you have to spend on growth.",
      note: {
        title: "Gross profit vs net profit",
        body: "Gross profit subtracts only product cost (COGS). Net profit subtracts every cost you enter. Both are shown so you can see where the margin goes.",
      },
    },
  },
  {
    id: "roi",
    href: "/calculator/roi",
    analyticsId: "roi",
    label: "ROI",
    hint: "Return on investment",
    title: "ROI calculator",
    summary:
      "Measure what a campaign, an inventory buy or a new tool returned once its full cost is taken out.",
    explainer: {
      whatIs:
        "Return on investment compares the net return from money you spent with what you spent. It works for any spend you can put a number on — a sale campaign, an influencer collaboration, a stock purchase or a new app for your store.",
      steps: [
        "Add the investment and any additional costs to get total investment.",
        "Subtract total investment from the revenue it generated to get net return.",
        "Divide net return by total investment and multiply by 100.",
      ],
      formulas: [
        { result: "Total investment", expression: "Investment + Additional costs" },
        { result: "Net return", expression: "Revenue − Total investment" },
        { result: "ROI", expression: "(Net return ÷ Total investment) × 100" },
      ],
      whyItMatters:
        "ROI puts very different kinds of spend on one scale, so a festive-sale campaign and a new product launch can be compared directly. A negative ROI means the spend returned less than it cost.",
      note: {
        title: "ROI is not ROAS",
        body: "ROI subtracts costs and tells you whether spending made money. ROAS only divides revenue by ad spend, so a campaign can show a strong ROAS and still lose money once product, shipping and fees are counted.",
      },
    },
  },
  {
    id: "roas",
    href: "/calculator/roas",
    analyticsId: "roas",
    label: "ROAS",
    hint: "Return on ad spend",
    title: "ROAS calculator",
    summary:
      "See how much revenue each rupee of ad spend brought in, and the ROAS your margins need to break even.",
    explainer: {
      whatIs:
        "Return on ad spend divides the revenue attributed to your ads by what you spent on them. Use the attributed revenue from Meta, Google or your analytics for the same campaigns and dates as the spend.",
      steps: [
        "Divide attributed revenue by ad spend to get ROAS — the revenue each ₹1 of ads brought in.",
        "Optionally, enter your margin before ad spend: the percentage of revenue left after product, shipping and payment fees.",
        "Break-even ROAS is 100 divided by that margin. Below it, the ads cost more than the orders they bring in earn.",
      ],
      formulas: [
        { result: "ROAS", expression: "Attributed revenue ÷ Ad spend" },
        { result: "Break-even ROAS", expression: "100 ÷ Margin before ad spend (%)" },
        {
          result: "Profit after ad spend",
          expression: "Attributed revenue × Margin (%) ÷ 100 − Ad spend",
        },
      ],
      whyItMatters:
        "ROAS is quick to read and easy to compare across campaigns, but on its own it says nothing about profit. Your break-even ROAS turns it into a decision: scale what sits clearly above it, and fix or pause what sits below.",
      note: {
        title: "ROAS measures revenue, not profit",
        body: "A 3× ROAS means ₹3 of revenue for every ₹1 of ads. Whether that is profitable depends on your margins — which is what break-even ROAS here, and the ROI calculator, account for.",
      },
    },
  },
  {
    id: "high-profit",
    href: "/calculator/high-profit",
    analyticsId: "high_profit",
    label: "High Profit",
    hint: "Price & ad cost for a target",
    title: "High profit calculator",
    summary:
      "Set the margin you want per order and see the selling price and maximum ad cost that get you there.",
    explainer: {
      whatIs:
        "It works backwards from a target margin. Enter your costs per order and the margin you want, and it shows what each order earns today, the selling price that would reach the target, and how much you can spend on ads per order before you fall short.",
      steps: [
        "Add product, shipping, advertising and other costs per order. The payment fee is a percentage of the selling price, so it rises and falls with the price.",
        "Required price divides those costs by what remains of each rupee after the fee and the target margin.",
        "Maximum ad cost is what the current price leaves after the target margin, the payment fee and every non-ad cost.",
      ],
      formulas: [
        { result: "Payment fee", expression: "Selling price × Fee (%) ÷ 100" },
        {
          result: "Profit per order",
          expression: "Selling price − (Product + Shipping + Ads + Other + Payment fee)",
        },
        {
          result: "Break-even price",
          expression: "(Product + Shipping + Ads + Other) ÷ (1 − Fee %)",
        },
        {
          result: "Required price",
          expression: "(Product + Shipping + Ads + Other) ÷ (1 − Fee % − Target margin %)",
        },
        {
          result: "Max ad cost per order",
          expression: "Selling price × (1 − Fee % − Target margin %) − (Product + Shipping + Other)",
        },
      ],
      whyItMatters:
        "Most margin problems come down to two levers: what you charge and what it costs to win the order. Seeing both limits for your own numbers helps when you set a price, plan a discount or decide how far to push cost per purchase on a campaign.",
    },
  },
  {
    id: "revenue",
    href: "/calculator/revenue",
    analyticsId: "revenue",
    label: "Revenue",
    hint: "Orders & revenue estimate",
    title: "Revenue calculator",
    summary:
      "Estimate orders and revenue from your store's sessions, conversion rate and average order value.",
    explainer: {
      whatIs:
        "It turns your store's three core funnel numbers into an estimate of monthly and annual revenue, and shows what a growth rate you choose would add. Take sessions and conversion rate from Shopify analytics for the same month.",
      steps: [
        "Multiply monthly sessions by conversion rate to estimate orders.",
        "Multiply orders by average order value for monthly revenue, and by 12 for annual revenue.",
        "If you enter a growth rate, it is applied to monthly revenue to show a projection next to today's estimate.",
      ],
      formulas: [
        { result: "Orders", expression: "Sessions × Conversion rate (%) ÷ 100" },
        { result: "Monthly revenue", expression: "Orders × Average order value" },
        { result: "Annual revenue", expression: "Monthly revenue × 12" },
        {
          result: "Projected monthly revenue",
          expression: "Monthly revenue × (1 + Growth rate (%) ÷ 100)",
        },
      ],
      whyItMatters:
        "Revenue moves with traffic, conversion rate and order value. Changing one input at a time shows which lever matters most for your store — for example, what a small lift in conversion rate is worth at the traffic you already have.",
      note: {
        title: "These are estimates",
        body: "Annual figures assume the month you enter repeats twelve times. Real revenue varies with seasonality, returns, RTO and cancellations.",
      },
    },
  },
];

/** Lookup by id, so a page module can read its own entry. */
export const CALCULATOR_BY_ID = Object.fromEntries(
  CALCULATORS.map((calculator) => [calculator.id, calculator]),
) as Record<CalculatorId, CalculatorContent>;

export function getCalculator(id: CalculatorId): CalculatorContent {
  return CALCULATOR_BY_ID[id];
}
