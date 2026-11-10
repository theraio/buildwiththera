import { FetcherError, fetcher } from "./fetcher";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AUTH_TOKEN_STORAGE_KEY } from "./constants";
import { setStorageItem } from "~/utils/local-storage";

function mockFetchResponse(
  body: unknown,
  init: { status?: number; contentType?: string } = {},
) {
  const { status = 200, contentType = "application/json" } = init;
  const payload =
    contentType === "application/json" ? JSON.stringify(body) : String(body);

  return vi.fn().mockResolvedValue(
    new Response(payload, {
      status,
      headers: { "Content-Type": contentType },
    }),
  );
}

describe("fetcher", () => {
  const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = "https://api.example.com";
    window.localStorage.clear();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
    vi.unstubAllGlobals();
  });

  it("attaches the auth header when a token exists and withAuth isn't false", async () => {
    setStorageItem(AUTH_TOKEN_STORAGE_KEY, "my-token");
    const fetchMock = mockFetchResponse({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await fetcher("/me");

    const [, init] = fetchMock.mock.calls[0];
    expect((init.headers as Headers).get("Authorization")).toBe(
      "Bearer my-token",
    );
  });

  it("omits the auth header when no token is stored", async () => {
    const fetchMock = mockFetchResponse({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await fetcher("/me");

    const [, init] = fetchMock.mock.calls[0];
    expect((init.headers as Headers).get("Authorization")).toBeNull();
  });

  it("omits the auth header when withAuth is false, even with a token stored", async () => {
    setStorageItem(AUTH_TOKEN_STORAGE_KEY, "my-token");
    const fetchMock = mockFetchResponse({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await fetcher("/public", { withAuth: false });

    const [, init] = fetchMock.mock.calls[0];
    expect((init.headers as Headers).get("Authorization")).toBeNull();
  });

  it("passes method, body, and custom headers through unchanged, same as native fetch", async () => {
    const fetchMock = mockFetchResponse({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await fetcher("/create", {
      method: "POST",
      body: JSON.stringify({ name: "Ada" }),
      headers: { "Content-Type": "application/json" },
    });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ name: "Ada" }));
    expect((init.headers as Headers).get("Content-Type")).toBe(
      "application/json",
    );
  });

  it("throws FetcherError with the parsed body on a non-2xx JSON response", async () => {
    const fetchMock = mockFetchResponse({ message: "nope" }, { status: 400 });
    vi.stubGlobal("fetch", fetchMock);

    const error = (await fetcher("/bad").catch((e) => e)) as FetcherError;

    expect(error).toBeInstanceOf(FetcherError);
    expect(error.status).toBe(400);
    expect(error.body).toEqual({ message: "nope" });
  });

  it("throws FetcherError with the raw text body on a non-JSON error response", async () => {
    const fetchMock = mockFetchResponse("<html>Bad Gateway</html>", {
      status: 502,
      contentType: "text/html",
    });
    vi.stubGlobal("fetch", fetchMock);

    const error = (await fetcher("/bad").catch((e) => e)) as FetcherError;

    expect(error).toBeInstanceOf(FetcherError);
    expect(error.body).toBe("<html>Bad Gateway</html>");
  });

  it("prefixes a relative path with NEXT_PUBLIC_APP_URL", async () => {
    const fetchMock = mockFetchResponse({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await fetcher("/me");

    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.example.com/me");
  });

  it("leaves an absolute URL untouched", async () => {
    const fetchMock = mockFetchResponse({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await fetcher("https://other.example.com/me");

    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe("https://other.example.com/me");
  });
});
