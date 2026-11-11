import type { MetadataRoute } from "next";
import { SITE_URL } from "~/app/_constants/site";

/** Both languages of the landing, each pointing at the other as an alternate. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${SITE_URL}/`, es: `${SITE_URL}/es` };
  return [
    {
      url: languages.en,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: languages.es,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
