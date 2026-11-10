import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 30 * 1000 },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * Returns the shared `QueryClient`: a fresh instance per request on the
 * server (avoids leaking state across requests), a module-level singleton
 * in the browser (avoids re-creating it on every render).
 *
 * @returns The `QueryClient` to use for this render.
 */
export function getQueryClient(): QueryClient {
  if (isServer) return makeQueryClient();

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
