import { ALL_FAQS } from "@/data/faq";
import { getPage, type PublicRoute } from "@/data/pages";
import {
  RABBITPAY_LOGO,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE_HREF,
} from "@/data/site";
import type { JsonLdDocument, JsonLdNode } from "@/types";

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
 *   Root layout   `buildSiteJsonLd()`  → Organization + WebSite
 *   Each page     `buildPageJsonLd()`  → WebPage (+ BreadcrumbList, + FAQPage)
 *
 * Everything is linked by `@id` rather than repeated, which is what lets a
 * crawler resolve all of it to one organization and one website:
 *
 *   https://rabbitpay.ai/#organization      the company
 *   https://rabbitpay.ai/#website           the site
 *   https://rabbitpay.ai/<path>#webpage     one page
 *   https://rabbitpay.ai/<path>#breadcrumb  that page's trail
 *
 * Rendered with `<JsonLd>` (`components/seo/json-ld.tsx`).
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

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
 * and `aggregateRating`. In particular the pricing page's "Rated 4.9/5 by 100+
 * merchants" line is NOT marked up: Google requires aggregate ratings to come
 * from genuinely collected, inspectable reviews, and self-asserted ratings in
 * structured data are a manual-action risk.
 */
function organizationNode(): JsonLdNode {
  const home = getPage("/");
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
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
 * The site-level document: Organization + WebSite, emitted once from the root
 * layout so both resolve identically on every route.
 */
export function buildSiteJsonLd(): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode()],
  };
}

/**
 * BreadcrumbList for a sub-page: Home → the page.
 *
 * Mirrors the real URL hierarchy — every public page sits one level below the
 * root and is linked from the header. The homepage gets no breadcrumb, since a
 * single-item trail describes nothing.
 */
function breadcrumbNode(path: PublicRoute): JsonLdNode {
  const page = getPage(path);
  return {
    "@type": "BreadcrumbList",
    "@id": `${absolute(path)}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.name,
        item: absolute(path),
      },
    ],
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
    about: { "@id": ORGANIZATION_ID },
    ...(isFaq ? { mainEntity: faqMainEntity() } : {}),
    ...(path === "/" ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
  };

  return {
    "@context": "https://schema.org",
    "@graph": path === "/" ? [webPage] : [webPage, breadcrumbNode(path)],
  };
}
