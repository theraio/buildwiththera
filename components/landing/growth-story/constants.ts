/** Timeline seconds at which the hero starts to clear. */
export const HERO_OUT_AT = 0.4;

/** When the first season arrives, and the spacing between seasons. */
export const FIRST_SEASON_AT = 1;
export const SEASON_SPACING = 2.2;

/** How long a season stays before the next replaces it. */
export const SEASON_HOLD = 1.5;

/** Timeline seconds after the last season arrives before the pin releases. */
export const TAIL_HOLD = 1.4;

/** Pinned scroll distance, in viewport heights. */
export const PIN_LENGTH = 5;

/** ScrollTrigger id of the pinned story, so anchors can target a season. */
export const STORY_TRIGGER_ID = "growth-story";

/** Share of the pinned scroll at which the first season is fully in view. */
export const PROCESS_SCROLL_FRACTION =
  (FIRST_SEASON_AT + 0.8) /
  // The last of the four seasons arrives at index 3.
  (FIRST_SEASON_AT + 3 * SEASON_SPACING + 0.8 + TAIL_HOLD);
