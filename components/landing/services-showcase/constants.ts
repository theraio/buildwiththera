import { ServiceKey } from "~/components/landing/types";

/** Each service's color token, for `--service`-driven styles. */
export const SERVICE_COLOR: Record<ServiceKey, string> = {
  sd: "var(--color-service-sd)",
  ai: "var(--color-service-ai)",
  ux: "var(--color-service-ux)",
  ps: "var(--color-service-ps)",
  dv: "var(--color-service-dv)",
};
