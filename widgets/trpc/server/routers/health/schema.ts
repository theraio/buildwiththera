import { z } from "zod";

export const healthPingOutputSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.string(),
});
