import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Settling ease for every Thera entrance, close to cubic-bezier(.22,1,.36,1). */
export const EASE_OUT = "power4.out";

/**
 * Reports whether the visitor asked the OS to reduce motion.
 *
 * @returns `true` when `prefers-reduced-motion: reduce` matches (or when
 *   `matchMedia` is unavailable).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, SplitText };
