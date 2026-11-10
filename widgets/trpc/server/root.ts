import { router } from "./trpc";
import { healthRouter, meRouter } from "./routers";

export const appRouter = router({
  health: healthRouter,
  me: meRouter,
});

export type AppRouter = typeof appRouter;
