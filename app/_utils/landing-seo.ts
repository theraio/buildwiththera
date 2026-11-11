import { FOUNDER, SITE_NAME, SITE_URL } from "~/app/_constants/site";
import { LANDING_COPY, Locale } from "~/components/landing";

import type { Metadata } from "next";

const PATHS: Record<Locale, string> = { en: "/", es: "/es" };
const OG_LOCALES: Record<Locale, string> = { en: "en_US", es: "es_AR" };

/**
 * Page metadata for one language of the landing: canonical, hreflang
 * alternates (with English as x-default) and social cards.
 *
 * @param locale - The page's language.
 * @returns Metadata for that page; the social image comes from its
 *   `opengraph-image` file.
 */
export function landingMetadata(locale: Locale): Metadata {
  const { title, description } = LANDING_COPY[locale].meta;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: PATHS[locale],
      languages: { en: PATHS.en, es: PATHS.es, "x-default": PATHS.en },
    },
    openGraph: {
      title,
      description,
      url: PATHS[locale],
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      alternateLocale: OG_LOCALES[locale === "en" ? "es" : "en"],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * schema.org graph for the landing: the studio, its founder, the services it
 * offers and the FAQ, so search engines and AI assistants read the page as
 * structured facts.
 *
 * @param locale - The page's language.
 * @returns A JSON-LD object for a `<script type="application/ld+json">`.
 */
export function landingStructuredData(locale: Locale) {
  const copy = LANDING_COPY[locale];
  const url = new URL(PATHS[locale], SITE_URL).href;
  const studio = `${SITE_URL}/#studio`;
  const founder = `${SITE_URL}/#founder`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": studio,
        name: SITE_NAME,
        legalName: "thera LLC",
        url: SITE_URL,
        logo: `${SITE_URL}/icon-512.png`,
        image: `${SITE_URL}/icon-512.png`,
        description: copy.meta.description,
        founder: { "@id": founder },
        areaServed: "Worldwide",
        knowsLanguage: ["en", "es"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: copy.services.title,
          itemListElement: copy.services.items.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.body,
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": founder,
        name: FOUNDER.name,
        jobTitle: FOUNDER.jobTitle,
        image: new URL(FOUNDER.image, SITE_URL).href,
        description: copy.principles.bio,
        sameAs: [FOUNDER.linkedin],
        worksFor: { "@id": studio },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: copy.meta.title,
        description: copy.meta.description,
        inLanguage: locale,
        about: { "@id": studio },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
