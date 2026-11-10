import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({ transformer: superjson });

/** Builds a tRPC router from a map of procedures/sub-routers. */
export const router = t.router;

/** A procedure with no auth requirement. */
export const publicProcedure = t.procedure;

/**
 * A procedure that requires `ctx.authToken` to be present — rejects with
 * `UNAUTHORIZED` otherwise. This only checks presence, never validity: the
 * token's value is never verified (no signature check, no session lookup),
 * so this is NOT real authentication — anyone can set the cookie to any
 * value and pass. Replace this with a real check before shipping anything
 * that needs actual security.
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.authToken) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({ ctx: { ...ctx, authToken: ctx.authToken } });
});
