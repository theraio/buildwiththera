import { createContext } from "./context";
import { appRouter } from "./root";

/**
 * Builds a direct, in-process tRPC caller for Server Components — no HTTP
 * round-trip. Reuses the same `createContext()` the HTTP route handler
 * uses, so `protectedProcedure` behaves identically either way.
 *
 * @returns A caller exposing every procedure as a plain async function.
 */
export async function createServerCaller() {
  const ctx = await createContext();
  return appRouter.createCaller(ctx);
}
