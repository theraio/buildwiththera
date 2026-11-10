import { publicProcedure, router } from "~/widgets/trpc/server/trpc";
import { healthPingOutputSchema } from "./schema";

export const healthRouter = router({
  ping: publicProcedure.output(healthPingOutputSchema).query(() => ({
    status: "ok" as const,
    timestamp: new Date().toISOString(),
  })),
});
