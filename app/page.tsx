import {
  landingMetadata,
  landingStructuredData,
} from "~/app/_utils/landing-seo";

import { Landing } from "~/components/landing";
import type { Metadata } from "next";

export const metadata: Metadata = landingMetadata("en");

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD from our own copy; `<` is escaped so no string can close the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(landingStructuredData("en")).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <Landing locale="en" />
    </>
  );
}
