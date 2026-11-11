import { LandingCopy, Locale } from "~/components/landing/types";

import { NEEDS } from "./constants";

export type Need = (typeof NEEDS)[number];

/** Outcome of the last submission; `idle` until the visitor sends. */
export type InquiryState = "idle" | "sent" | "invalid" | "error";

export interface ContactFormProps {
  copy: LandingCopy["contact"];
  services: LandingCopy["services"]["items"];
  locale: Locale;
}
