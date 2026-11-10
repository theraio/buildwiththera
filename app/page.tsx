import { LANDING_COPY, Landing } from "~/components/landing";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: LANDING_COPY.en.meta.title,
  description: LANDING_COPY.en.meta.description,
  alternates: { languages: { es: "/es" } },
  openGraph: {
    title: LANDING_COPY.en.meta.title,
    description: LANDING_COPY.en.meta.description,
    siteName: "Thera",
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return <Landing locale="en" />;
}
