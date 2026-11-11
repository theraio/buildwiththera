import { LandingCopy, Locale } from "~/components/landing/types";

export interface ClosingProps {
  copy: LandingCopy["contact"];
  services: LandingCopy["services"]["items"];
  locale: Locale;
}
