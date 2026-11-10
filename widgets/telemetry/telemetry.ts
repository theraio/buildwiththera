import * as Sentry from "@sentry/nextjs";
import type { SeverityLevel } from "@sentry/nextjs";
import { DEFAULT_CAPTURE_MESSAGE_LEVEL, HTTP_STATUS_RULES } from "./constants";
import type { CaptureExceptionOptions, ErrorToTrace } from "./types";
import { ErrorStatusCode } from "./types";

/**
 * An `Error` subclass that carries a custom `name`, used to group errors
 * under a meaningful category in Sentry instead of the generic "Error" type.
 */
class CustomException extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
  }
}

/**
 * Builds the `[module] -> [component] -> [func] -> error: <message>` event
 * message for an {@link ErrorToTrace} descriptor, and wraps it in a
 * {@link CustomException} when `errorName` is given so Sentry groups it under
 * that name instead of the generic "Error" type.
 *
 * @param error - Structured location info for the error.
 * @param errorName - When provided, used as the Sentry issue title/grouping key.
 * @returns A `CustomException` (when named) or a standard `Error`.
 */
function getErrorToTrace(error: ErrorToTrace, errorName?: string): Error {
  const { module, component, func, message } = error;
  const location = `[${module}] -> [${component}] -> [${func}]`;
  const eventMessage = message ? `${location} -> error: ${message}` : location;

  return errorName
    ? new CustomException(eventMessage, errorName)
    : new Error(eventMessage);
}

/**
 * Returns the current URL in browser contexts, or `"Server Error"` on the
 * server. Attached as `extra.url` on every Sentry event so issues can be
 * traced back to a route.
 *
 * @returns The current URL, or `"Server Error"` when called outside a browser.
 */
function getExceptionLocation(): string {
  return typeof window !== "undefined" ? window.location.href : "Server Error";
}

/**
 * Initializes Sentry for the current Next.js runtime (client, server, or
 * edge — `@sentry/nextjs` resolves the matching build via its own
 * conditional package exports). No-ops when `NEXT_PUBLIC_SENTRY_DSN` isn't
 * set, so this is safe to call in every environment, including local dev
 * without a DSN configured.
 *
 * @returns void
 */
export function initTelemetry(): void {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    debug: process.env.NODE_ENV !== "development",
  });
}

/**
 * Reports a structured exception to Sentry.
 *
 * @param error - Structured location descriptor — see {@link ErrorToTrace}.
 * @param options - Optional error name (retitles/groups the Sentry issue),
 * tags (filterable in the Sentry dashboard), and extra context data.
 * @returns The Sentry event id.
 */
export function captureException(
  error: ErrorToTrace,
  options?: CaptureExceptionOptions,
): string {
  const { errorName, tags, context } = options ?? {};
  const reportedError = getErrorToTrace(error, errorName);

  return Sentry.captureException(reportedError, {
    tags,
    extra: { url: getExceptionLocation(), ...context },
  });
}

/**
 * Reports a message to Sentry.
 *
 * @param message - The message to report.
 * @param level - Severity level for the message.
 * @returns The Sentry event id.
 */
export function captureMessage(
  message: string,
  level: SeverityLevel = DEFAULT_CAPTURE_MESSAGE_LEVEL,
): string {
  return Sentry.captureMessage(message, level);
}

/**
 * Forwards unhandled Next.js server request errors (uncaught render/route
 * errors Next.js itself catches) to Sentry. Wire to `instrumentation.ts`'s
 * `onRequestError` export.
 */
export const captureRequestError = Sentry.captureRequestError;

/**
 * Infers an HTTP status code from an error's name and message by matching
 * against {@link HTTP_STATUS_RULES}.
 *
 * @param error - The error to classify.
 * @returns A numeric HTTP status code, or `0` if no rule matched.
 */
export function getErrorStatusCode(error: Error): ErrorStatusCode | 0 {
  const errorName = (error.name || "").toUpperCase();
  const errorMessage = (error.message || "").toUpperCase();

  for (const rule of HTTP_STATUS_RULES) {
    for (const matcher of rule.matchers) {
      if (errorName.includes(matcher) || errorMessage.includes(matcher)) {
        return rule.status;
      }
    }
  }

  return 0;
}
