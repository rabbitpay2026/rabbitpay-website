import { SITE_NAME } from "@/data/site";

export const PRIVACY_EFFECTIVE_DATE = "7 October 2026";

export const PRIVACY_OPERATOR = "Notifik Technologies LLP";

export type PrivacyBlock = { kind: "paragraph"; text: string } | { kind: "list"; items: string[] };

export type PrivacySection = {
  id: string;
  heading: string;
  blocks: PrivacyBlock[];
};

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    blocks: [
      {
        kind: "paragraph",
        text: `${SITE_NAME} is a one-click checkout for Shopify stores run by Indian direct-to-consumer brands. It is operated by ${PRIVACY_OPERATOR}, the team behind COD King. In this policy, "${SITE_NAME}", "we" and "us" mean ${PRIVACY_OPERATOR}.`,
      },
      {
        kind: "paragraph",
        text: "This policy explains what personal information we collect, why we collect it, who we share it with and the choices you have.",
      },
    ],
  },
  {
    id: "scope",
    heading: "Who this policy covers",
    blocks: [
      {
        kind: "list",
        items: [
          "Visitors to rabbitpay.ai.",
          `Merchants and their teams who enquire about ${SITE_NAME}, including through forms on this website and lead forms on Facebook and Instagram ads.`,
          "Agencies and other partners who apply to work with us.",
          `Shoppers who buy from a store that uses the ${SITE_NAME} checkout.`,
        ],
      },
    ],
  },
  {
    id: "information-we-collect",
    heading: "Information we collect",
    blocks: [
      {
        kind: "paragraph",
        text: "Information you give us when you enquire, book a demo or fill in a form on this website or on one of our Facebook or Instagram ads:",
      },
      {
        kind: "list",
        items: [
          "Your name, email address and mobile number.",
          "Your store address (URL).",
          "Business details you choose to share, such as monthly order volume, monthly sales and the checkout you use today.",
          "Anything you write to us by email, phone, WhatsApp or in a form message.",
        ],
      },
      {
        kind: "paragraph",
        text: "Information you give us when you apply to be a partner: your name, email address, mobile number, company, website, the type of partnership and your message.",
      },
      {
        kind: "paragraph",
        text: "Information collected automatically when you use this website:",
      },
      {
        kind: "list",
        items: [
          "Pages viewed, links and buttons clicked, and how you arrived at the site.",
          "Device, browser and approximate location derived from your IP address.",
          "Recordings of how a session on this website was used, such as clicks, scrolling and navigation.",
        ],
      },
      {
        kind: "paragraph",
        text: `Information processed when a shopper uses the ${SITE_NAME} checkout on a merchant's store: the mobile number used for one-time-code verification, name, delivery address, email address and the details of the order. A shopper who has verified a mobile number may see saved details prefilled at checkout and can edit them before placing the order.`,
      },
    ],
  },
  {
    id: "how-we-use-information",
    heading: "How we use information",
    blocks: [
      {
        kind: "list",
        items: [
          `To reply to enquiries, share pricing and arrange a demo of ${SITE_NAME}.`,
          "To contact you by phone, WhatsApp, SMS or email about your enquiry or your account.",
          `To set up, run and support the ${SITE_NAME} checkout for merchants.`,
          "To verify shoppers, prefill their details and complete their orders on a merchant's store.",
          "To review partner applications.",
          "To understand how this website is used and to improve it.",
          "To measure our advertising and to show, or stop showing, our ads to the right people.",
          "To prevent fraud and misuse, and to meet legal obligations.",
        ],
      },
    ],
  },
  {
    id: "shoppers",
    heading: "Shoppers on a merchant's store",
    blocks: [
      {
        kind: "paragraph",
        text: `When you check out on a store that uses ${SITE_NAME}, we process your information to provide the checkout for that merchant. The merchant decides what it does with your order information under its own privacy policy, and you should read that policy for how the merchant uses your data.`,
      },
      {
        kind: "paragraph",
        text: "Payments are processed by the payment gateway the merchant has chosen. Card and bank details are handled by that gateway.",
      },
    ],
  },
  {
    id: "sharing",
    heading: "Who we share information with",
    blocks: [
      {
        kind: "paragraph",
        text: "We do not sell personal information. We share it only with:",
      },
      {
        kind: "list",
        items: [
          "Service providers that help us run the website and the product, such as hosting, email delivery and website analytics providers.",
          "Advertising platforms such as Meta. We may share contact details in hashed form so that our ads can be shown to, or withheld from, the right people, and we receive the details you submit on lead forms on those platforms.",
          "The merchant whose store a shopper is buying from, and the payment and logistics services that merchant uses to complete the order.",
          "Shopify and the payment partners a merchant connects, as needed to run that merchant's checkout.",
          "Authorities, where the law requires it, or where it is needed to protect our rights, our merchants or their shoppers.",
        ],
      },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and analytics",
    blocks: [
      {
        kind: "paragraph",
        text: "This website uses cookies and similar technologies for analytics. We use Plausible, PostHog and Google Analytics to understand how the site is used. You can block or delete cookies in your browser settings, and the site will still work.",
      },
    ],
  },
  {
    id: "retention",
    heading: "How long we keep information",
    blocks: [
      {
        kind: "paragraph",
        text: "We keep personal information for as long as it is needed for the purposes described in this policy, or for as long as the law requires. When it is no longer needed, we delete it or make it anonymous.",
      },
    ],
  },
  {
    id: "security",
    heading: "Security",
    blocks: [
      {
        kind: "paragraph",
        text: `${SITE_NAME} follows industry-standard security practices to protect customer and transaction data. No system is completely secure, so we cannot guarantee absolute security.`,
      },
    ],
  },
  {
    id: "your-choices",
    heading: "Your choices and rights",
    blocks: [
      {
        kind: "list",
        items: [
          "Ask for a copy of the personal information we hold about you.",
          "Ask us to correct or update it.",
          "Ask us to delete it.",
          "Withdraw consent you have given us.",
          "Stop marketing messages at any time by replying to the message or writing to us.",
        ],
      },
      {
        kind: "paragraph",
        text: "To use any of these, contact us using the details below. We may need to confirm your identity before we act on a request.",
      },
    ],
  },
  {
    id: "children",
    heading: "Children",
    blocks: [
      {
        kind: "paragraph",
        text: `${SITE_NAME} is a product for businesses. This website is not directed at anyone under 18, and we do not knowingly collect their personal information through it.`,
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    blocks: [
      {
        kind: "paragraph",
        text: "We may update this policy from time to time. The date at the top of this page shows when it was last changed.",
      },
    ],
  },
];
