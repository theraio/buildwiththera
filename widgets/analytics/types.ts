import type { ANALYTICS_EVENTS } from "./constants";

/**
 * A known product-analytics event name, or any other string while
 * `ANALYTICS_EVENTS` is still empty.
 */
export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS] | (string & {});

/** Arbitrary key/value pairs attached to an event or an identified user. */
export type AnalyticsProperties = Record<string, unknown>;
