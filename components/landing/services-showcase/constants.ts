import { ServiceKey } from "~/components/landing/types";

/** Service initials as set inside the pentagon in the brandbook's service marks. */
export const SERVICE_INITIALS: Record<ServiceKey, string> = {
  sd: "SD",
  ux: "UX",
  ps: "PS",
  dv: "DV",
  qa: "QA",
};

/** Each service's color token, for `--service`-driven styles. */
export const SERVICE_COLOR: Record<ServiceKey, string> = {
  sd: "var(--color-service-sd)",
  ux: "var(--color-service-ux)",
  ps: "var(--color-service-ps)",
  dv: "var(--color-service-dv)",
  qa: "var(--color-service-qa)",
};
