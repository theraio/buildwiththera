import {
  CAMERA_DISTANCE,
  ENTRY_HEIGHT,
  LEAD_SLOWDOWN,
  PATH_STEP,
  PRIMARY_ROOTS,
  Z_CENTER,
  Z_EDGE,
} from "./constants";
import { RootPath, RootSystemOptions, Vec3 } from "./types";

/**
 * Small deterministic PRNG (mulberry32), so the roots are identical on every
 * load and in tests.
 *
 * @param seed - Integer seed.
 * @returns A function yielding floats in [0, 1).
 */
export function createRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Signed shortest turn from angle `a` to angle `b`. */
function turn(a: number, b: number): number {
  return Math.atan2(Math.sin(b - a), Math.cos(b - a));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

interface Walk {
  x: number;
  y: number;
  /** Heading in radians; -PI/2 is straight down. */
  angle: number;
  length: number;
  radius: number;
  birth: number;
  /** Birth gained per unit of depth; above 1 grows slower than the scroll. */
  rate: number;
  level: number;
  /** Branches deep in a branch; caps how far the crowded end can nest. */
  generation: number;
  /** 0 for roots; 1+ for the fan of forks a root ends in. */
  fork: number;
  /** Target x the root drifts toward (primaries only). */
  lane?: number;
  zOffset: number;
}

/**
 * Grows the root system the page scrolls through: five primary roots reach
 * in from well above the first screen, each at its own stage of growth, then
 * descend the whole page in lanes, throwing off branches and rootlets that crowd in
 * toward the end of the page. Every root ends in a fan of ever finer forks.
 * Roots near the centre sit far back (behind the copy, in the fog); roots
 * near the edges come close and bleed off the frame.
 *
 * @param options - Viewport half width and page depth, in world units.
 * @returns Root paths in world space; parents precede their children.
 */
export function createRootSystem({
  halfWidth,
  depth,
  seed = 11,
}: RootSystemOptions): RootPath[] {
  const random = createRandom(seed);
  // Narrow screens get slimmer roots, so they frame the copy rather than fill it.
  const thickness = Math.min(1, Math.max(0.45, halfWidth / 0.8));
  const between = (min: number, max: number) => min + random() * (max - min);
  // End forks draw from their own stream, so adding them never reshapes the roots.
  const endRandom = createRandom(seed + 1);
  const endBetween = (min: number, max: number) =>
    min + endRandom() * (max - min);
  const roots: RootPath[] = [];
  const forks: RootPath[] = [];
  const queue: Walk[] = PRIMARY_ROOTS.map((root) => ({
    x: root.x * halfWidth,
    y: ENTRY_HEIGHT,
    angle: -Math.PI / 2 + root.heading,
    length: (depth + ENTRY_HEIGHT + 0.2) * 1.45,
    radius: root.radius * thickness,
    birth: -root.lead,
    rate: 1 + Math.max(0, root.lead) * LEAD_SLOWDOWN,
    level: 0,
    generation: 0,
    fork: 0,
    lane: root.lane * halfWidth,
    zOffset: 0,
  }));

  while (queue.length) {
    const walk = queue.shift()!;
    const points: Vec3[] = [];
    const radii: number[] = [];
    const births: number[] = [];
    const steps = Math.max(2, Math.round(walk.length / PATH_STEP));
    const walkRandom = walk.fork ? endRandom : random;
    const phase = walkRandom() * Math.PI * 2;
    // Where this root splits into its end fan: spread over its last stretch.
    const forkAt: number[] = [];
    if (walk.fork < 2 && (walk.fork > 0 || walk.level < 2)) {
      const fan = Math.min(0.9, walk.length * 0.45);
      const count = walk.fork === 0 ? 3 : 2;
      for (let k = 0; k < count; k++) {
        const t = (0.8 * (k + endBetween(0.25, 0.75))) / count;
        forkAt.push(walk.length - fan * (1 - t));
      }
    }
    let forkSide = endRandom() < 0.5 ? -1 : 1;
    let { x, y, angle } = walk;
    let spin = 0;
    let birth = walk.birth;
    let nextBranch = walk.level === 0 ? between(0.8, 1.4) : between(0.18, 0.4);

    for (let i = 0; i <= steps; i++) {
      const s = i * PATH_STEP;
      const u = Math.min(1.3, Math.abs(x) / halfWidth);
      const z =
        Z_CENTER + (Z_EDGE - Z_CENTER) * smoothstep(0.1, 0.9, u) + walk.zOffset;
      // 0 through most of the page, 1 at the bottom: the system fills in at the end.
      const crowd = smoothstep(0.62, 0.92, -y / depth);
      // Scale x so the root keeps its screen position whatever its depth.
      points.push([x * ((CAMERA_DISTANCE - z) / CAMERA_DISTANCE), y, z]);
      const progress = s / walk.length;
      // Thick where it enters, thinning slowly, then a long fine taper.
      radii.push(
        walk.radius *
          (0.45 + 0.55 * (1 - progress)) *
          Math.min(
            1,
            (walk.length - s) / Math.min(0.8, walk.length * 0.6) + 0.02,
          ),
      );
      births.push(birth);

      if (forkAt.length && s >= forkAt[0]) {
        forkAt.shift();
        forkSide = -forkSide;
        // Splits close to the root's own heading, so the end fans downward.
        queue.push({
          x,
          y,
          angle: angle + forkSide * endBetween(0.25, 0.6),
          length: Math.max(0.12, (walk.length - s) * endBetween(0.7, 1.1)),
          radius: Math.max(0.004, radii[i] * endBetween(0.6, 0.8)),
          birth,
          rate: walk.rate,
          level: Math.min(2, walk.level + 1),
          generation: walk.generation + 1,
          fork: walk.fork + 1,
          zOffset: walk.zOffset + endBetween(-0.03, 0.03),
        });
      }

      if (!walk.fork && walk.level < 2 && s >= nextBranch && progress < 0.96) {
        // Mostly outward, away from the copy, until the end of the page fills in.
        const outward = x < 0 ? -1 : 1;
        const side = random() < 0.75 - 0.3 * crowd ? outward : -outward;
        // In the crowded end, branches fork into more branches, not just rootlets.
        const level =
          walk.level === 1 && walk.generation < 3 && random() < crowd * 0.6
            ? 1
            : walk.level + 1;
        queue.push({
          x,
          y,
          angle: angle + side * between(0.4, 0.9),
          length:
            level === 1
              ? between(0.6, 1.6) * (1 + 1.5 * crowd)
              : between(0.15, 0.4) * (1 + crowd),
          radius: Math.max(
            0.004,
            radii[i] * (level === 1 ? between(0.35, 0.65) : between(0.25, 0.4)),
          ),
          birth,
          rate: walk.rate,
          level,
          generation: walk.generation + 1,
          fork: 0,
          zOffset: walk.zOffset + between(-0.08, 0.08),
        });
        nextBranch +=
          (level === 1 ? between(1.4, 2.6) : between(0.18, 0.4)) *
          (1 - 0.8 * crowd);
      }

      // Smooth wander, a pull downward, and for primaries a weaving lane.
      spin = spin * 0.9 + (walkRandom() - 0.5) * 0.035;
      angle += spin;
      let target = -Math.PI / 2;
      if (walk.lane !== undefined) {
        const lane = walk.lane + Math.sin(y * 0.8 + phase) * 0.18 * halfWidth;
        target = Math.atan2(-1, (lane - x) * 2.2);
      }
      // Spread sideways first (under the soil line), then turn down.
      const pull =
        walk.level === 0 ? 0.012 + 0.05 * smoothstep(0, 0.9, s) : 0.012;
      angle += turn(angle, target) * pull;
      x += Math.cos(angle) * PATH_STEP;
      y += Math.sin(angle) * PATH_STEP;
      // Birth counts depth, so the growth front keeps pace with the scroll;
      // sideways runs still take a little time to grow.
      birth +=
        Math.max(Math.abs(Math.sin(angle)), 0.35) * PATH_STEP * walk.rate;
      if (walk.level > 0 && y < -depth - 0.3) break;
    }

    (walk.fork ? forks : roots).push({
      points,
      radii,
      births,
      level: walk.level,
    });
  }

  // Forks last, so every root keeps its index (and its bark lumps) as before.
  return [...roots, ...forks];
}

/**
 * Clamps `(value - start) / (end - start)` into [0, 1].
 *
 * @param value - Current progress.
 * @param start - Progress where the ramp begins.
 * @param end - Progress where the ramp completes.
 * @returns Local ramp progress in [0, 1].
 */
export function ramp(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return Math.min(1, Math.max(0, (value - start) / (end - start)));
}
