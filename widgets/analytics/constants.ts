/** PostHog Cloud (US region) ingest host, used when no custom host is configured. */
export const DEFAULT_POSTHOG_HOST = "https://us.i.posthog.com";

/**
 * Closed vocabulary of product-analytics event names for this app. Empty for
 * now — spar has no established event taxonomy yet. Add entries here as real
 * events emerge, then reference them via `ANALYTICS_EVENTS.<KEY>` instead of
 * a raw string.
 */
export const ANALYTICS_EVENTS = {} as const;
