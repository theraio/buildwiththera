import { AUTH_TOKEN_STORAGE_KEY } from "./constants";
import type { FetcherOptions } from "./types";
import { getStorageItem } from "~/utils/local-storage";

const ABSOLUTE_URL_PATTERN = /^https?:\/\//;

/**
 * An HTTP error thrown by {@link fetcher} for any non-2xx response.
 *
 * @param message - A human-readable summary of the failed request.
 * @param status - The response's HTTP status code.
 * @param statusText - The response's HTTP status text.
 * @param body - The parsed JSON body, or raw text for a non-JSON response.
 */
export class FetcherError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = "FetcherError";
  }
}

/**
 * Centralized, authenticated `fetch` wrapper. Accepts the exact same
 * options as native `fetch` (`RequestInit`) plus `withAuth`. Prefixes a
 * relative `path` with `NEXT_PUBLIC_APP_URL`, attaches a bearer token read
 * from `lib/local-storage` unless `withAuth` is `false` (silently omitted
 * when no token is stored, e.g. before login or when called server-side,
 * since `localStorage` isn't reachable there), and parses JSON responses.
 * Throws {@link FetcherError} on any non-2xx response.
 *
 * @param path - A relative path (prefixed with `NEXT_PUBLIC_APP_URL`) or an absolute URL.
 * @param options - The same options native `fetch` accepts, plus `withAuth` — see {@link FetcherOptions}.
 * @returns The parsed JSON response body, or the raw text for a non-JSON response.
 */
export async function fetcher<TResponse = unknown>(
  path: string,
  options: FetcherOptions = {},
): Promise<TResponse> {
  const { withAuth = true, headers, ...init } = options;

  const url = ABSOLUTE_URL_PATTERN.test(path)
    ? path
    : `${process.env.NEXT_PUBLIC_APP_URL ?? ""}${path}`;

  const requestHeaders = new Headers(headers);

  if (withAuth) {
    const token = getStorageItem<string | null>(AUTH_TOKEN_STORAGE_KEY, null);
    if (token) requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, { ...init, headers: requestHeaders });

  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new FetcherError(
      `Request to ${url} failed with ${response.status}`,
      response.status,
      response.statusText,
      body,
    );
  }

  return body as TResponse;
}
