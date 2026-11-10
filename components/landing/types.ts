export type Locale = "en" | "es";

export type ServiceKey = "sd" | "ux" | "ps" | "dv" | "qa";

export interface LandingProps {
  locale: Locale;
}

export interface LandingCopy {
  meta: { title: string; description: string };
  nav: {
    label: string;
    skipLink: string;
    services: string;
    process: string;
    principles: string;
    bookCall: string;
    /** Link to the other language version. */
    switchHref: string;
    switchShort: string;
    switchLabel: string;
  };
  hero: { title: string[]; lead: string; primary: string; secondary: string };
  seasons: {
    label: string;
    items: { name: string; title: string; body: string }[];
  };
  services: {
    title: string;
    lead: string;
    items: { key: ServiceKey; name: string; body: string }[];
  };
  principles: {
    title: string;
    items: { title: string; body: string }[];
    origin: string;
  };
  closing: {
    title: string;
    body: string;
    cta: string;
    location: string;
    rights: string;
  };
}
