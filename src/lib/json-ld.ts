import { ALL_FAQS } from "@/data/faq";
import { getPage, isPublicRoute, type PublicRoute } from "@/data/pages";
import {
  RABBITPAY_LOGO,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE_HREF,
} from "@/data/site";
import type { JsonLdDocument, JsonLdNode } from "@/types";

/** A reference to a node defined elsewhere in the graph, by `@id` alone. */
type JsonLdRef = { "@id": string };

/**
 * Schema.org structured data for the whole site.
 *
 * Every value here is read from the same modules the pages render — the page
 * registry (`data/pages.ts`), the brand constants (`data/site.ts`) and the FAQ
 * (`data/faq.ts`) — so the markup cannot describe something the site does not
 * actually say, and cannot drift when the copy changes.
 *
 * Two documents are emitted, and they do not overlap:
 *
 *   Root layout   `buildSiteJsonLd()`  → Organization + WebSite + the product
 *   Each page     `buildPageJsonLd()`  → WebPage (+ BreadcrumbList, + FAQPage)
 *
 * Everything is linked by `@id` rather than repeated, which is what lets a
 * crawler resolve all of it to one organization, one website and one product:
 *
 *   https://rabbitpay.ai/#organization      the company
 *   https://rabbitpay.ai/#website           the site
 *   https://rabbitpay.ai/#checkout          RabbitPay Checkout, the product
 *   https://rabbitpay.ai/<path>#webpage     one page
 *   https://rabbitpay.ai/<path>#breadcrumb  that page's trail
 *
 * Rendered with `<JsonLd>` (`components/seo/json-ld.tsx`).
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const SOFTWARE_ID = `${SITE_URL}/#checkout`;

/** Phone in the E.164 form Schema.org expects, derived from the `tel:` href. */
const SUPPORT_PHONE_E164 = SUPPORT_PHONE_HREF.replace("tel:", "");

/** Absolute URL for a public route. */
const absolute = (path: string) => new URL(path, SITE_URL).toString();

/**
 * The rendered `<title>` for a route — the root layout's template appends the
 * site name to every route except "/", which supplies its own full title.
 * Reproduced here so a WebPage's `name` matches the page's actual title tag.
 */
function pageTitle(path: PublicRoute): string {
  const page = getPage(path);
  return path === "/" ? page.title : `${page.title} | ${SITE_NAME}`;
}

/**
 * Organization — the company, emitted once for the whole site.
 *
 * Limited to facts the website itself publishes: the name, canonical URL, the
 * production logo, the site description, the homepage headline as the slogan,
 * and the support contact details and hours printed in the footer and on the
 * support page.
 *
 * `sameAs` is deliberately absent. The repository was searched for social and
 * company profile URLs (Instagram, LinkedIn, X, Facebook, YouTube, GitHub) and
 * there are none anywhere on the site — asserting handles we cannot verify
 * would be worse than omitting the property. Add the array here once official
 * profile URLs exist.
 *
 * Also deliberately absent, because the site does not state them: `legalName`,
 * `address`, `foundingDate`, `founder`, `numberOfEmployees`, `vatID`/`taxID`
 * and `aggregateRating`. The pricing section used to carry a "Rated 4.9/5 by
 * 100+ merchants" line, which was never marked up here — Google requires
 * aggregate ratings to come from genuinely collected, inspectable reviews, and
 * self-asserted ratings in structured data are a manual-action risk. That line
 * has since been removed from the page as well, for the same lack of evidence.
 */
function organizationNode(): JsonLdNode {
  const home = getPage("/");
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    // The product name the site itself uses throughout the FAQ and the product
    // page ("RabbitPay Checkout"). Google's Organization documentation asks for
    // the same name/alternateName the site name uses, and a second real name
    // gives a crawler one more string that resolves to this entity rather than
    // to one of the unrelated services also called "RabbitPay".
    alternateName: "RabbitPay Checkout",
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: RABBITPAY_LOGO,
      contentUrl: RABBITPAY_LOGO,
      caption: SITE_NAME,
    },
    description: home.description,
    slogan: "1-Click Checkout, built in India.",
    email: SUPPORT_EMAIL,
    telephone: SUPPORT_PHONE_E164,
    areaServed: { "@type": "Country", name: "India" },
    // The subjects the site actually covers — this is what lets an AI system
    // place RabbitPay in the right category rather than guessing from copy.
    knowsAbout: [
      "One-click checkout for Shopify",
      "UPI payments",
      "Cash on delivery verification",
      "Return to origin (RTO) reduction",
      "Checkout address prefill",
      "Part payment and split payment",
      "Payment gateway integration",
      "Direct-to-consumer ecommerce in India",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: SUPPORT_PHONE_E164,
        email: SUPPORT_EMAIL,
        areaServed: "IN",
        availableLanguage: "en",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      },
    ],
  };
}

/**
 * WebSite — the site as an entity, published by the Organization above.
 *
 * No `potentialAction`/`SearchAction`: rabbitpay.ai has no site search, and
 * declaring a search endpoint that does not exist is a broken promise to a
 * crawler rather than an optimisation.
 */
function websiteNode(): JsonLdNode {
  const home = getPage("/");
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: home.description,
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/**
 * SoftwareApplication — RabbitPay Checkout, the thing the company sells.
 *
 * This exists for one reason: "RabbitPay" is an ambiguous string. Several
 * unrelated services share the name — a US transit fare app, a Thai wallet, a
 * crypto processor — so an Organization node alone leaves a crawler to infer
 * the category from marketing copy. Typing the product explicitly states which
 * kind of thing this is: business software, in the ecommerce checkout
 * subcategory, running on Shopify, sold in India.
 *
 * Every property is something the site puts on screen. `featureList` is the
 * three product pillars from `data/features.ts` plus the two capabilities the
 * FAQ documents; `description` is the /product page's own meta description.
 *
 * Deliberately absent: `offers` and `aggregateRating`. RabbitPay's published
 * price is a percentage of order value (1% prepaid, 0.3% COD), which an `Offer`
 * cannot express honestly, and there is no rating to mark up — the site
 * publishes no reviews, and the one self-asserted rating line it used to carry
 * has been removed. Marking either up would be a rich-result violation, not an
 * optimisation.
 * Without them Google will not show a software rich result, which is fine: the
 * node is here to identify the entity, not to win a snippet.
 */
function softwareApplicationNode(): JsonLdNode {
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: "RabbitPay Checkout",
    url: absolute("/product"),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Ecommerce checkout",
    operatingSystem: "Web",
    description: getPage("/product").description,
    inLanguage: "en-IN",
    areaServed: { "@type": "Country", name: "India" },
    provider: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    featureList: [
      "One-click checkout for Shopify stores",
      "Address, phone and email prefill",
      "UPI-first payments with card and netbanking fallback",
      "Verified cash on delivery with pre-dispatch risk checks",
      "Part payment / split payment",
      "Merchant-set COD convenience fee",
      "Brand-customisable checkout",
      "Works with the merchant's existing payment gateway",
    ],
  };
}

/**
 * The site-level document: Organization + WebSite + the product, emitted once
 * from the root layout so all three resolve identically on every route.
 */
export function buildSiteJsonLd(): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode(), softwareApplicationNode()],
  };
}

/**
 * BreadcrumbList for a sub-page: Home → the page, with the parent section in
 * between where the URL has one (each calculator sits under /calculator).
 *
 * Mirrors the real URL hierarchy. The homepage gets no breadcrumb, since a
 * single-item trail describes nothing.
 */
function breadcrumbNode(path: PublicRoute): JsonLdNode {
  const parent = path.slice(0, path.lastIndexOf("/"));
  const trail = [
    { name: "Home", item: `${SITE_URL}/` },
    ...(parent && isPublicRoute(parent)
      ? [{ name: getPage(parent).name, item: absolute(parent) }]
      : []),
    { name: getPage(path).name, item: absolute(path) },
  ];

  return {
    "@type": "BreadcrumbList",
    "@id": `${absolute(path)}#breadcrumb`,
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: step.item,
    })),
  };
}

/**
 * The FAQ's questions and answers, mapped straight off `ALL_FAQS` — the same
 * array `/faq` renders. Adding, editing or removing a question in `data/faq.ts`
 * updates the page and this markup together; there is no second hand-maintained
 * copy that could fall out of sync, and no question exists here that a visitor
 * cannot see on the page.
 *
 * `faq.link` is not included: it is navigation rendered beside the answer, not
 * part of the answer text.
 *
 * Note this only makes the Q&A machine-readable. Whether Google shows an FAQ
 * rich result is entirely Google's decision — those are currently limited to a
 * small set of sites, and markup guarantees nothing.
 */
function faqMainEntity() {
  return ALL_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));
}

/**
 * What a page is *about*, by reference rather than by repeating the entity.
 *
 * Most pages are about the company. The two that describe the product itself
 * point at the SoftwareApplication node instead, and `/what-is-rabbitpay` — the
 * page that answers the entity question directly — is about both. This is what
 * lets a crawler see which URL to treat as the definition of each entity rather
 * than inferring it from the copy.
 */
function pageSubject(path: PublicRoute): JsonLdRef | JsonLdRef[] {
  if (path === "/what-is-rabbitpay") {
    return [{ "@id": ORGANIZATION_ID }, { "@id": SOFTWARE_ID }];
  }
  if (path === "/product") return { "@id": SOFTWARE_ID };
  return { "@id": ORGANIZATION_ID };
}

/**
 * The per-page document: a WebPage node, plus a BreadcrumbList on sub-pages.
 *
 * `/faq` gets the same single node typed as both WebPage and FAQPage rather
 * than a second, separate FAQPage entity — one page is one thing, and emitting
 * two page entities for one URL is exactly the duplicate-schema problem this
 * avoids.
 */
export function buildPageJsonLd(path: PublicRoute): JsonLdDocument {
  const page = getPage(path);
  const url = absolute(path);
  const isFaq = path === "/faq";

  const webPage: JsonLdNode = {
    "@type": isFaq ? ["WebPage", "FAQPage"] : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: pageTitle(path),
    description: page.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: pageSubject(path),
    ...(isFaq ? { mainEntity: faqMainEntity() } : {}),
    ...(path === "/" ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
  };

  return {
    "@context": "https://schema.org",
    "@graph": path === "/" ? [webPage] : [webPage, breadcrumbNode(path)],
  };
}
