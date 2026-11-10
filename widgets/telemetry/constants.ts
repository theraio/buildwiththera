import { ErrorStatusCode } from "./types";
import type { HttpStatusRule } from "./types";

/** Severity level for `captureMessage` when the caller doesn't specify one. */
export const DEFAULT_CAPTURE_MESSAGE_LEVEL = "info";

/**
 * Closed vocabulary of Sentry tag/error-name categories for this app. Empty
 * for now — spar is a component library with no established error domains
 * yet. Add entries here as real categories emerge (e.g. per `widgets/<name>`
 * module), then reference them via `TELEMETRY_TAGS.<KEY>` instead of a raw
 * string.
 */
export const TELEMETRY_TAGS = {} as const;

/**
 * Keyword-based rules used by `getErrorStatusCode` to classify errors by
 * their name or message. Rules are evaluated in order; the first match wins.
 */
export const HTTP_STATUS_RULES: HttpStatusRule[] = [
  {
    status: ErrorStatusCode.UNAUTHORIZED,
    matchers: ["UNAUTHORIZED", "AUTHENTICATION", "TOKEN", "CREDENTIALS"],
  },
  {
    status: ErrorStatusCode.FORBIDDEN,
    matchers: ["FORBIDDEN", "ACCESS DENIED", "PERMISSION"],
  },
  {
    status: ErrorStatusCode.NOT_FOUND,
    matchers: ["NOT FOUND", "DOES NOT EXIST", "404"],
  },
  {
    status: ErrorStatusCode.BAD_REQUEST,
    matchers: ["VALIDATION", "BAD REQUEST"],
  },
  {
    status: ErrorStatusCode.BAD_REQUEST,
    matchers: ["INVALID", "MISSING", "REQUIRED", "MALFORMED", "UNSUPPORTED"],
  },
  {
    status: ErrorStatusCode.BAD_GATEWAY,
    matchers: ["FETCH", "NETWORK", "TIMEOUT", "CONNECTION"],
  },
  {
    status: ErrorStatusCode.SERVICE_UNAVAILABLE,
    matchers: ["SERVICE UNAVAILABLE", "TEMPORARILY UNAVAILABLE"],
  },
  {
    status: ErrorStatusCode.INTERNAL_SERVER_ERROR,
    matchers: ["TYPEERROR", "REFERENCEERROR", "RANGEERROR", "SYNTAXERROR"],
  },
];
