# How to use the tRPC integration

All tRPC usage in this repo is centralized in [`widgets/trpc`](../widgets/trpc). It has its own cookie-based auth (`AUTH_COOKIE_NAME`), independent of `utils/fetcher`'s localStorage-based auth — see [Why a cookie instead of localStorage here](#why-a-cookie-instead-of-localstorage-here) below for why the two are deliberately kept separate.

**No real login flow exists yet.** `protectedProcedure` only checks that the `spar_auth_token` cookie is present — there's no session/user lookup behind it. Build real auth against this pattern once a project needs it; don't treat `me.get` as a real "current user" endpoint.

## Calling a procedure from a Client Component

```tsx
"use client";

import { trpc } from "~/widgets/trpc/client";

export default function HealthCheck() {
  const { data, isLoading } = trpc.health.ping.useQuery();

  if (isLoading) return <p>Loading…</p>;
  return <p>Status: {data?.status}</p>;
}
```

`trpc.<router>.<procedure>.useQuery()`/`.useMutation()` only work inside the `TrpcProvider` mounted in `app/layout.tsx` — every route already has it. For an imperative (non-hook) call — inside an event handler or effect — use `trpc.useUtils().client`, e.g. `await trpc.useUtils().client.health.ping.query()`.

## Calling a procedure from a Server Component

No HTTP round-trip — a direct, in-process call:

```tsx
import { createServerCaller } from "~/widgets/trpc";

export default async function HealthStatus() {
  const trpc = await createServerCaller();
  const { status } = await trpc.health.ping();

  return <p>Status: {status}</p>;
}
```

This reuses the same `createContext()` the HTTP route uses, so a `protectedProcedure` behaves identically whether called from a Server Component or over HTTP from the browser.

## Adding a new router

Each router gets its own co-located folder under `widgets/trpc/server/routers/`, following this repo's standard per-unit `index.ts` barrel pattern (same as `utils/<name>/`):

1. Create `widgets/trpc/server/routers/<name>/schema.ts` — the zod schema(s).
2. Create `widgets/trpc/server/routers/<name>/<name>.ts`, using `publicProcedure` or `protectedProcedure` from `~/widgets/trpc/server/trpc`.
3. Create `widgets/trpc/server/routers/<name>/index.ts`, re-exporting the router and every schema it uses (e.g. `health`'s barrel exports `healthRouter` and `healthPingOutputSchema`):

   ```ts
   export { <name>Router } from "./<name>";
   export { <name>SomeActionOutputSchema } from "./schema";
   ```

4. Re-export it from `widgets/trpc/server/routers/index.ts` alongside the existing routers.
5. Register it in `widgets/trpc/server/root.ts`:

   ```ts
   import { router } from "./trpc";
   import { healthRouter, meRouter, <name>Router } from "./routers";

   export const appRouter = router({
     health: healthRouter,
     me: meRouter,
     <name>: <name>Router,
   });
   ```

6. Add a behavior test in `widgets/trpc/server/root.spec.ts` calling `appRouter.createCaller(...)` directly — no HTTP mocking needed.

## Why a cookie instead of localStorage here

`utils/fetcher` reads its bearer token from `localStorage`, which only exists in the browser. tRPC needs to work from Server Components too, where there's no `localStorage` at all. A cookie solves this for both: the browser sends it automatically on every request (client-side calls, via `credentials: "include"` in `widgets/trpc/client/trpc-client.ts`), and the server reads it directly via `next/headers` (Server Components, the `/api/trpc` route handler) — no token has to be manually passed around.
