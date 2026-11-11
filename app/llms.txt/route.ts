import { FOUNDER, SITE_URL } from "~/app/_constants/site";

import { LANDING_COPY } from "~/components/landing";

// Built once at build time from the same copy the page renders, so it never drifts.
export const dynamic = "force-static";

/**
 * llms.txt (https://llmstxt.org): a plain Markdown brief of the studio for
 * AI assistants, in English with a pointer to the Spanish page.
 */
export function GET() {
  const { meta, hero, seasons, services, principles, faq } = LANDING_COPY.en;
  const body = [
    `# Thera`,
    "",
    `> ${meta.description}`,
    "",
    `${hero.lead} ${hero.availability}.`,
    "",
    `- Website (English): ${SITE_URL}/`,
    `- Website (Spanish): ${SITE_URL}/es`,
    `- Founder: ${FOUNDER.name}, ${FOUNDER.jobTitle}`,
    "",
    `## ${services.title}`,
    "",
    ...services.items.map(
      (service) => `- **${service.name}**: ${service.body}`,
    ),
    "",
    `## ${seasons.label}`,
    "",
    ...seasons.items.map(
      (season) =>
        `- **${season.name} — ${season.title}** (${season.meta}): ${season.body}`,
    ),
    "",
    `## About ${FOUNDER.name}`,
    "",
    principles.bio,
    "",
    ...principles.items.map((item) => `- **${item.title}** ${item.body}`),
    "",
    `## ${faq.title}`,
    "",
    ...faq.items.flatMap((item) => [
      `### ${item.question}`,
      "",
      item.answer,
      "",
    ]),
    `## Contact`,
    "",
    `Start a project from ${SITE_URL}/ (“Work with me”). Replies within 24 hours.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
