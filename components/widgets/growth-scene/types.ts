export interface GrowthSceneProps {
  className?: string;
}

export type Vec3 = [number, number, number];

export interface RootPath {
  /** Points along the root, PATH_STEP apart, in world space. */
  points: Vec3[];
  /** Radius at each point. */
  radii: number[];
  /** Growth (≈ depth below the seed) at which each point has grown in. */
  births: number[];
  /** 0 = primary root, 1 = branch, 2 = rootlet. */
  level: number;
}

export interface RootSystemOptions {
  /** Half the viewport width in world units (aspect / 2). */
  halfWidth: number;
  /** How far down the page the roots must reach, in world units. */
  depth: number;
  seed?: number;
}
