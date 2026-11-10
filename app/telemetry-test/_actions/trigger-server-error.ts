"use server";

import { captureException } from "~/widgets/telemetry";

/**
 * Server action that simulates a server-side failure and reports it through
 * `widgets/telemetry`, so the Next.js server runtime path can be verified
 * end-to-end from the telemetry test page.
 *
 * @returns The Sentry event id for the simulated failure.
 */
export async function triggerServerError(): Promise<{ eventId: string }> {
  try {
    throw new Error("Simulated server-side failure");
  } catch (error) {
    const eventId = captureException(
      {
        module: "TelemetryTest",
        component: "trigger-server-error.ts",
        func: "triggerServerError",
        message: error instanceof Error ? error.message : String(error),
      },
      {
        errorName: "TelemetryTestServerError",
        tags: { source: "telemetry-test-page" },
      },
    );

    return { eventId };
  }
}
