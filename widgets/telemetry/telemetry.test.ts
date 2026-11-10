import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as Sentry from "@sentry/nextjs";
import {
  captureException,
  captureMessage,
  getErrorStatusCode,
  initTelemetry,
} from "./telemetry";

vi.mock("@sentry/nextjs", () => ({
  init: vi.fn(),
  captureException: vi.fn(() => "event-id"),
  captureMessage: vi.fn(() => "event-id"),
  captureRequestError: vi.fn(),
}));

describe("initTelemetry", () => {
  const originalDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = originalDsn;
  });

  it("initializes Sentry with the configured DSN", () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = "https://example.ingest.sentry.io/1";

    initTelemetry();

    expect(Sentry.init).toHaveBeenCalledWith(
      expect.objectContaining({ dsn: "https://example.ingest.sentry.io/1" }),
    );
  });

  it("does not initialize Sentry when no DSN is configured", () => {
    delete process.env.NEXT_PUBLIC_SENTRY_DSN;

    initTelemetry();

    expect(Sentry.init).not.toHaveBeenCalled();
  });
});

describe("captureException", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("formats the structured location into the Sentry event message", () => {
    captureException({
      module: "DatePicker",
      component: "date-picker.tsx",
      func: "handleSelect",
      message: "invalid date range",
    });

    const [reportedError] = vi.mocked(Sentry.captureException).mock.calls[0];
    expect((reportedError as Error).message).toBe(
      "[DatePicker] -> [date-picker.tsx] -> [handleSelect] -> error: invalid date range",
    );
    expect((reportedError as Error).name).toBe("Error");
  });

  it("omits the error suffix when no message is given", () => {
    captureException({
      module: "DatePicker",
      component: "date-picker.tsx",
      func: "handleSelect",
    });

    const [reportedError] = vi.mocked(Sentry.captureException).mock.calls[0];
    expect((reportedError as Error).message).toBe(
      "[DatePicker] -> [date-picker.tsx] -> [handleSelect]",
    );
  });

  it("groups the issue under errorName instead of the generic Error type", () => {
    captureException(
      {
        module: "DatePicker",
        component: "date-picker.tsx",
        func: "handleSelect",
      },
      { errorName: "InvalidDateRange" },
    );

    const [reportedError] = vi.mocked(Sentry.captureException).mock.calls[0];
    expect((reportedError as Error).name).toBe("InvalidDateRange");
  });

  it("attaches tags when provided", () => {
    captureException(
      {
        module: "DatePicker",
        component: "date-picker.tsx",
        func: "handleSelect",
      },
      { tags: { team: "design-system" } },
    );

    const [, captureContext] = vi.mocked(Sentry.captureException).mock.calls[0];
    expect(captureContext).toMatchObject({ tags: { team: "design-system" } });
  });

  it("merges extra context with the exception location", () => {
    captureException(
      {
        module: "DatePicker",
        component: "date-picker.tsx",
        func: "handleSelect",
      },
      { context: { userId: "123" } },
    );

    const [, captureContext] = vi.mocked(Sentry.captureException).mock.calls[0];
    expect(captureContext).toMatchObject({
      extra: { url: expect.any(String), userId: "123" },
    });
  });
});

describe("captureMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("defaults the severity level to info", () => {
    captureMessage("hello");

    expect(Sentry.captureMessage).toHaveBeenCalledWith("hello", "info");
  });

  it("reports the message with the given severity level", () => {
    captureMessage("hello", "warning");

    expect(Sentry.captureMessage).toHaveBeenCalledWith("hello", "warning");
  });
});

describe("getErrorStatusCode", () => {
  it("classifies an auth-related error as 401", () => {
    expect(getErrorStatusCode(new Error("Invalid authentication token"))).toBe(
      401,
    );
  });

  it("classifies a not-found error as 404", () => {
    expect(getErrorStatusCode(new Error("Resource does not exist"))).toBe(404);
  });

  it("returns 0 when no rule matches", () => {
    expect(getErrorStatusCode(new Error("something unexpected happened"))).toBe(
      0,
    );
  });
});
