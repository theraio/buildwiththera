"use client";

import { SplitText, gsap, prefersReducedMotion } from "~/utils/gsap";
import { LOADER_SEEN_KEY, REVEAL_EVENT } from "~/components/landing/constants";
import { MAX_VISIBLE, MIN_VISIBLE } from "./constants";
import { useLayoutEffect, useRef } from "react";

import { LoadingScreenProps } from "./types";
import { SCENE_READY_EVENT } from "~/components/widgets/growth-scene/constants";

/** Tells the hero it may animate in, now or for anyone who asks later. */
function reveal() {
  document.documentElement.dataset.revealed = "";
  window.dispatchEvent(new Event(REVEAL_EVENT));
}

/**
 * Ink screen that holds the page until the roots have drawn their first
 * frame: the line's letters come into focus one by one, a lime band fills in
 * behind them, then the screen sweeps away to the right.
 */
function LoadingScreen({ label }: LoadingScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Read from the attribute the inline script set before hydration: the
    // storage itself is written below, so a re-run must not consult it.
    const seen = document.documentElement.dataset.loaderSeen !== undefined;
    try {
      sessionStorage.setItem(LOADER_SEEN_KEY, "");
    } catch {
      // Storage blocked: it just plays again next time.
    }
    if (seen || prefersReducedMotion()) {
      root.hidden = true;
      reveal();
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";
    const context = gsap.context(() => {
      const text = SplitText.create("[data-loader-text]", { type: "chars" });
      const intro = gsap
        .timeline()
        .from(text.chars, {
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.5,
          stagger: 0.035,
          ease: "power2.out",
        })
        .to("[data-loader-band]", {
          scaleX: 1,
          duration: 0.55,
          ease: "power3.inOut",
        })
        .to(
          text.chars,
          { color: "var(--color-gray-900)", duration: 0.2 },
          "<0.25",
        );

      let left = false;
      const leave = () => {
        if (left) return;
        left = true;
        window.clearTimeout(cap);
        gsap
          .timeline({ delay: Math.max(0, MIN_VISIBLE / 1000 - intro.time()) })
          .call(reveal)
          .to(root, {
            clipPath: "inset(0 0 0 100%)",
            duration: 0.8,
            ease: "power4.inOut",
          })
          .call(() => {
            root.hidden = true;
            html.style.overflow = "";
          });
      };
      const cap = window.setTimeout(leave, MAX_VISIBLE);
      window.addEventListener(SCENE_READY_EVENT, leave, { once: true });
    }, root);

    return () => {
      context.revert();
      html.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-loader
      aria-hidden="true"
      // Painted by the server so the page never flashes before it; CSS lifts
      // it on its own after a few seconds if JavaScript never arrives.
      className="fixed inset-0 z-[70] grid animate-[loader-failsafe_0s_linear_5s_forwards] place-items-center bg-background [clip-path:inset(0_0_0_0)] motion-reduce:hidden"
    >
      <p className="relative px-3 py-1.5 text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
        <span
          data-loader-band
          className="absolute inset-0 origin-left scale-x-0 bg-success-500"
        />
        <span data-loader-text className="relative">
          {label}
        </span>
      </p>
    </div>
  );
}

export default LoadingScreen;
