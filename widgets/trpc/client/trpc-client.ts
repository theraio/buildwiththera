"use client";

import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "~/widgets/trpc/server/root";

export const trpc = createTRPCReact<AppRouter>();

/**
 * Builds the browser-side tRPC client. `credentials: "include"` ensures
 * the auth cookie rides along automatically — no manual header handling
 * needed client-side.
 *
 * @returns A tRPC client bound to `/api/trpc`.
 */
export function createTrpcClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
        transformer: superjson,
        fetch: (input, init) =>
          fetch(input, { ...init, credentials: "include" }),
      }),
    ],
  });
}
