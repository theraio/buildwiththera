import { describe, expect, it } from "vitest";
import { appRouter } from "./root";

describe("health.ping", () => {
  it("responds ok without requiring auth", async () => {
    const caller = appRouter.createCaller({ authToken: undefined });

    const result = await caller.health.ping();

    expect(result.status).toBe("ok");
    expect(typeof result.timestamp).toBe("string");
  });
});

describe("me.get", () => {
  it("rejects with UNAUTHORIZED when no auth token is present", async () => {
    const caller = appRouter.createCaller({ authToken: undefined });

    await expect(caller.me.get()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });

  it("resolves when an auth token is present", async () => {
    const caller = appRouter.createCaller({ authToken: "some-token" });

    const result = await caller.me.get();

    expect(result).toEqual({ authenticated: true });
  });
});
