import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import posthog from "posthog-js";
import {
  captureEvent,
  identifyUser,
  initAnalytics,
  resetAnalytics,
} from "./analytics";

vi.mock("posthog-js", () => ({
  default: {
    init: vi.fn(),
    capture: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
  },
}));

describe("initAnalytics", () => {
  const originalKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const originalHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = originalKey;
    process.env.NEXT_PUBLIC_POSTHOG_HOST = originalHost;
  });

  it("initializes PostHog with the configured key", () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = "phc_test_key";
    delete process.env.NEXT_PUBLIC_POSTHOG_HOST;

    initAnalytics();

    expect(posthog.init).toHaveBeenCalledWith(
      "phc_test_key",
      expect.objectContaining({ api_host: "https://us.i.posthog.com" }),
    );
  });

  it("uses a custom host when configured", () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = "phc_test_key";
    process.env.NEXT_PUBLIC_POSTHOG_HOST = "https://analytics.example.com";

    initAnalytics();

    expect(posthog.init).toHaveBeenCalledWith(
      "phc_test_key",
      expect.objectContaining({ api_host: "https://analytics.example.com" }),
    );
  });

  it("does not initialize PostHog when no key is configured", () => {
    delete process.env.NEXT_PUBLIC_POSTHOG_KEY;

    initAnalytics();

    expect(posthog.init).not.toHaveBeenCalled();
  });
});

describe("captureEvent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("delegates to posthog.capture with the event and properties", () => {
    captureEvent("signup_completed", { plan: "pro" });

    expect(posthog.capture).toHaveBeenCalledWith("signup_completed", {
      plan: "pro",
    });
  });
});

describe("identifyUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("delegates to posthog.identify with the id and properties", () => {
    identifyUser("user-123", { plan: "pro" });

    expect(posthog.identify).toHaveBeenCalledWith("user-123", {
      plan: "pro",
    });
  });
});

describe("resetAnalytics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("delegates to posthog.reset", () => {
    resetAnalytics();

    expect(posthog.reset).toHaveBeenCalled();
  });
});
