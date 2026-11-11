import type { MetadataRoute } from "next";
import { SITE_URL } from "~/app/_constants/site";

/** Everything public is crawlable, AI crawlers included; dev-only pages and the API are not. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/analytics-test", "/telemetry-test"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
