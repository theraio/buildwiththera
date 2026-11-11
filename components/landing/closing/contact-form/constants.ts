/** What a visitor can pick in the first step: a service, or not knowing yet. */
export const NEEDS = ["sd", "ai", "ux", "ps", "dv", "unsure"] as const;

/** The form's three steps: need, budget, details. */
export const STEP_COUNT = 3;

/** The shared Input paints placeholders like values; here they read as hints. */
export const PLACEHOLDER = "[&_input]:placeholder:text-muted-foreground/70";
