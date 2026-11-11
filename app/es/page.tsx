import {
  landingMetadata,
  landingStructuredData,
} from "~/app/_utils/landing-seo";

import { Landing } from "~/components/landing";
import type { Metadata } from "next";

export const metadata: Metadata = landingMetadata("es");

export default function HomeEs() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD from our own copy; `<` is escaped so no string can close the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(landingStructuredData("es")).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <Landing locale="es" />
    </>
  );
}
