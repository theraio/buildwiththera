export interface Spark {
  x: number;
  y: number;
  /** Velocity in px/s. */
  vx: number;
  vy: number;
  /** Seconds left, and the seconds it started with. */
  life: number;
  maxLife: number;
  /** Stroke width at birth, in px. */
  size: number;
  /** Peak opacity: 1 for sparks, lower for resting embers. */
  alpha: number;
  /** Vertical pull in px/s²; negative floats up. */
  gravity: number;
}
