import type { TELEMETRY_TAGS } from "./constants";

/**
 * A known telemetry tag/error-name category, or any other string while
 * `TELEMETRY_TAGS` is still empty.
 */
export type TelemetryTag =
  (typeof TELEMETRY_TAGS)[keyof typeof TELEMETRY_TAGS] | (string & {});

/**
 * Structured location descriptor for `captureException`. All four fields
 * are combined into the Sentry event message as
 * `[module] -> [component] -> [func] -> error: <message>`.
 */
export type ErrorToTrace = {
  /** Top-level domain or library (e.g. `"DatePicker"`). */
  module: string;
  /** File or component where the error occurred (e.g. `"date-picker.tsx"`). */
  component: string;
  /** Function or handler name (e.g. `"handleSelect"`). */
  func: string;
  /** Optional human-readable description of what went wrong. */
  message?: string;
};

/** Options accepted by `captureException` for grouping/tagging Sentry events. */
export interface CaptureExceptionOptions {
  /** Category used to retitle/group the Sentry issue instead of the generic "Error" name. */
  errorName?: TelemetryTag;
  /** Sentry tags attached to the event, for filtering in the Sentry dashboard. */
  tags?: Record<string, string | number | boolean>;
  /** Arbitrary key/value pairs attached as `extra` on the Sentry event. */
  context?: Record<string, unknown>;
}

/** HTTP status codes used to classify errors via `getErrorStatusCode`. */
export enum ErrorStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

/** A keyword-matching rule used by `getErrorStatusCode` (see `HTTP_STATUS_RULES`). */
export type HttpStatusRule = {
  status: ErrorStatusCode;
  matchers: string[];
};
