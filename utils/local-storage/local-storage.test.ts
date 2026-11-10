import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "./local-storage";

describe("getStorageItem", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    window.localStorage.clear();
  });

  it("returns the parsed value when present", () => {
    window.localStorage.setItem("count", JSON.stringify(5));

    expect(getStorageItem("count", 0)).toBe(5);
  });

  it("returns the fallback when the key is absent", () => {
    expect(getStorageItem("missing", "default")).toBe("default");
  });

  it("returns the fallback when the stored value isn't valid JSON", () => {
    window.localStorage.setItem("broken", "{not json");

    expect(getStorageItem("broken", "default")).toBe("default");
  });

  it("returns the fallback when window is unavailable (SSR)", () => {
    vi.stubGlobal("window", undefined);

    expect(getStorageItem("count", "fallback")).toBe("fallback");
  });
});

describe("setStorageItem", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    window.localStorage.clear();
  });

  it("stores a JSON-serialized value", () => {
    setStorageItem("user", { name: "Ada" });

    expect(window.localStorage.getItem("user")).toBe(
      JSON.stringify({ name: "Ada" }),
    );
  });

  it("does not throw when the underlying setItem throws", () => {
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });

    expect(() => setStorageItem("user", { name: "Ada" })).not.toThrow();

    spy.mockRestore();
  });
});

describe("removeStorageItem", () => {
  it("removes the key", () => {
    window.localStorage.setItem("temp", "1");

    removeStorageItem("temp");

    expect(window.localStorage.getItem("temp")).toBeNull();
  });
});
