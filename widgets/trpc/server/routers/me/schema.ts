import { z } from "zod";

export const meGetOutputSchema = z.object({
  authenticated: z.literal(true),
});
