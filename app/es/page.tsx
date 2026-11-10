import { LANDING_COPY, Landing } from "~/components/landing";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: LANDING_COPY.es.meta.title,
  description: LANDING_COPY.es.meta.description,
  alternates: { languages: { en: "/" } },
  openGraph: {
    title: LANDING_COPY.es.meta.title,
    description: LANDING_COPY.es.meta.description,
    siteName: "Thera",
    locale: "es_AR",
    type: "website",
  },
};

export default function HomeEs() {
  return <Landing locale="es" />;
}
