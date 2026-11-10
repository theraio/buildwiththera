import { describe, expect, it } from "vitest";
import { createRootSystem, ramp } from "./utils";
import { CAMERA_DISTANCE, PRIMARY_ROOTS } from "./constants";

const options = { halfWidth: 0.8, depth: 10 };

describe("createRootSystem", () => {
  it("is deterministic for a given seed", () => {
    expect(createRootSystem(options)).toEqual(createRootSystem(options));
  });

  it("starts every primary root off the first screen and reaches the bottom of the page", () => {
    const primaries = createRootSystem(options).filter((r) => r.level === 0);
    expect(primaries).toHaveLength(PRIMARY_ROOTS.length);
    primaries.forEach((root, i) => {
      const [, y, z] = root.points[0];
      // Top of the frame at the root's depth.
      expect(y).toBeGreaterThan(
        (0.5 * (CAMERA_DISTANCE - z)) / CAMERA_DISTANCE,
      );
      expect(root.births[0]).toBe(-PRIMARY_ROOTS[i].lead);
      expect(Math.min(...root.points.map((p) => p[1]))).toBeLessThan(-9);
    });
  });

  it("grows roots with a lead slower, so the others catch up", () => {
    const primaries = createRootSystem(options).filter((r) => r.level === 0);
    const lead = PRIMARY_ROOTS.findIndex((r) => r.lead === 1.4);
    const none = PRIMARY_ROOTS.findIndex((r) => r.lead === 0);
    const gained = (root: (typeof primaries)[number]) =>
      root.births[root.births.length - 1] - root.births[0];
    expect(gained(primaries[lead])).toBeGreaterThan(gained(primaries[none]));
  });

  it("crowds more roots into the end of the page than the middle", () => {
    const starts = createRootSystem(options)
      .filter((r) => r.level > 0)
      .map((r) => r.points[0][1]);
    const middle = starts.filter((y) => y < -3 && y >= -6).length;
    const end = starts.filter((y) => y < -7).length;
    expect(end).toBeGreaterThan(middle);
  });

  it("grows each root forward from where it branched, thinner than its parent", () => {
    const roots = createRootSystem(options);
    expect(roots.some((r) => r.level === 2)).toBe(true);
    for (const root of roots) {
      expect(root.points).toHaveLength(root.radii.length);
      for (let i = 1; i < root.births.length; i++) {
        expect(root.births[i]).toBeGreaterThan(root.births[i - 1]);
      }
      expect(Math.max(...root.radii)).toBeLessThanOrEqual(0.05);
    }
  });
});

describe("createRootSystem end forks", () => {
  it("splits the end of every primary root into a fan of finer forks", () => {
    const roots = createRootSystem(options);
    for (const root of roots.filter((r) => r.level === 0)) {
      const fan = root.points.slice(-37);
      const forks = roots.filter(
        (r) => r !== root && fan.some((p) => p[1] === r.points[0][1]),
      );
      expect(forks.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("ramp", () => {
  it("clamps into [0, 1]", () => {
    expect(ramp(-1, 0, 1)).toBe(0);
    expect(ramp(0.5, 0, 1)).toBe(0.5);
    expect(ramp(2, 0, 1)).toBe(1);
  });
});
