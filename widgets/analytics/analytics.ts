import posthog from "posthog-js";
import { DEFAULT_POSTHOG_HOST } from "./constants";
import type { AnalyticsEvent, AnalyticsProperties } from "./types";

/**
 * Initializes PostHog for the browser. No-ops when `NEXT_PUBLIC_POSTHOG_KEY`
 * isn't set, so this is safe to call in every environment, including local
 * dev without a key configured. Must run client-side only — call from
 * `instrumentation-client.ts`, never from the server/edge instrumentation
 * entry point.
 *
 * @returns void
 */
export function initAnalytics(): void {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || DEFAULT_POSTHOG_HOST,
    capture_pageview: "history_change",
    person_profiles: "identified_only",
  });
}

/**
 * Reports a product-analytics event to PostHog.
 *
 * @param event - The event name — see {@link AnalyticsEvent}.
 * @param properties - Optional key/value pairs attached to the event.
 * @returns void
 */
export function captureEvent(
  event: AnalyticsEvent,
  properties?: AnalyticsProperties,
): void {
  posthog.capture(event, properties);
}

/**
 * Associates subsequent events with a known user identity.
 *
 * @param id - The user's stable identifier (e.g. a database id).
 * @param properties - Optional user properties to set alongside the identity.
 * @returns void
 */
export function identifyUser(
  id: string,
  properties?: AnalyticsProperties,
): void {
  posthog.identify(id, properties);
}

/**
 * Clears the current user identity, so subsequent events are no longer
 * associated with them. Call on logout.
 *
 * @returns void
 */
export function resetAnalytics(): void {
  posthog.reset();
}
