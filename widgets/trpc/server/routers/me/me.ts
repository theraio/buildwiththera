import { protectedProcedure, router } from "~/widgets/trpc/server/trpc";
import { meGetOutputSchema } from "./schema";

export const meRouter = router({
  get: protectedProcedure.output(meGetOutputSchema).query(() => ({
    authenticated: true as const,
  })),
});
