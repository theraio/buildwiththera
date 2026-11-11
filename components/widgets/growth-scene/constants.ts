/** Vertical field of view; with CAMERA_DISTANCE, one world unit = one viewport height at z = 0. */
export const CAMERA_FOV = 35;
export const CAMERA_DISTANCE =
  1 / (2 * Math.tan(((CAMERA_FOV / 2) * Math.PI) / 180));

/** Growth before any scroll, once the intro ends: the roots reach in from off frame. */
export const GROWTH_AT_TOP = 1.6;

/** Growth per viewport scrolled; growth is measured in depth, so 1 keeps pace. */
export const GROWTH_PER_VIEWPORT = 1;

/** Distance between generated path points, in world units. */
export const PATH_STEP = 0.025;

/** Length of the growth tip, in growth units: a long whip that thins to a thread, not a spike. */
export const TIP_LENGTH = 0.9;
export const GLOW_LENGTH = 0.35;

/** Depth range: centre roots sit far back in the fog, edge roots up close. */
export const Z_CENTER = -1.4;
export const Z_EDGE = 0.25;

/**
 * Primary roots: where they enter (x as a fraction of half width), initial
 * heading (radians off straight down, positive turns right), lane (fraction
 * of half width), radius, and lead: how far ahead of the others it has grown,
 * in growth units. Roots with a lead grow a little slower, so the rest catch up
 * and the page fills in as it scrolls.
 */
// Some tips show in the hero, others already run off the bottom; no lane runs down the left column, where most of the copy sits.
export const PRIMARY_ROOTS = [
  { x: -1.3, heading: 0.5, lane: -1.22, radius: 0.024, lead: 1.4 },
  { x: -1.15, heading: 0.3, lane: -1.05, radius: 0.016, lead: 0.4 },
  { x: -0.2, heading: 0.3, lane: 0.05, radius: 0.035, lead: 0 },
  { x: 0.2, heading: -0.1, lane: 0.25, radius: 0.015, lead: -0.2 },
  { x: 0.35, heading: 0.1, lane: 0.42, radius: 0.022, lead: -0.5 },
  { x: 1.3, heading: -0.6, lane: 0.75, radius: 0.022, lead: 0.7 },
  { x: 1.1, heading: -0.2, lane: 0.92, radius: 0.018, lead: 1 },
  { x: 0.95, heading: 0.2, lane: 1.08, radius: 0.03, lead: 0.3 },
] as const;

/** Growth slows by this fraction per unit of lead. */
export const LEAD_SLOWDOWN = 0.1;

/**
 * Height every primary root starts at, in world units. The first screen spans
 * y 0.5 to -0.5 at z = 0, but the deepest roots see a taller frame (about
 * ±0.95), so they must start above that to never show a beginning.
 */
export const ENTRY_HEIGHT = 1.3;

/** CSS custom properties the scene reads its colors from (DESIGN.md tokens). */
export const COLOR_TOKENS = {
  ground: "--color-background",
  tip: "--color-service-ps",
  glows: ["--color-blue-500", "--color-violet-500", "--color-service-ps"],
} as const;

/** Window event fired once the roots are on screen (or can't be), so a loading screen can lift. */
export const SCENE_READY_EVENT = "thera:scene-ready";
