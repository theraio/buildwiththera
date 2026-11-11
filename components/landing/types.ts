export type Locale = "en" | "es";

export type ServiceKey = "sd" | "ai" | "ux" | "ps" | "dv";

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
    faq: string;
    workWithMe: string;
    /** Link to the other language version. */
    switchHref: string;
    switchShort: string;
    switchLabel: string;
  };
  hero: {
    title: string[];
    lead: string;
    /** How much work is taken on at once; shown beside a status dot. */
    availability: string;
    primary: string;
    secondary: string;
  };
  seasons: {
    label: string;
    /** `meta` is the concrete promise of each season: its time and what you get. */
    items: { name: string; title: string; meta: string; body: string }[];
  };
  services: {
    title: string;
    lead: string;
    /** `hint` follows the cursor over a service: picking it starts a project. */
    items: { key: ServiceKey; name: string; body: string; hint: string }[];
  };
  principles: {
    title: string;
    name: string;
    role: string;
    /** Who is behind the work: experience, and why it serves the reader. */
    bio: string;
    items: { title: string; body: string }[];
    origin: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    title: string;
    body: string;
    cta: string;
    /** Label beside the brand on the project screen. */
    kicker: string;
    close: string;
    back: string;
    need: { title: string; unsure: string };
    budget: { title: string; hint: string; options: string[] };
    details: {
      title: string;
      name: string;
      email: string;
      message: string;
      /** Example answers shown inside the empty fields. */
      placeholders: { name: string; email: string; message: string };
      submit: string;
      sending: string;
    };
    sent: { title: string; body: string; close: string };
    invalid: string;
    error: string;
    location: string;
    rights: string;
  };
}
