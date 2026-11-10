"use client";

import { useLayoutEffect, useRef } from "react";

import { Button } from "~/components/ui/button";
import { THEME_OPTIONS } from "./constants";
import { cn } from "~/utils/cn";
import gsap from "gsap";
import { useMounted } from "~/hooks/use-mounted";
import { useTheme } from "next-themes";

// TH-01: lets an operator pick light/dark/system explicitly, on top of
// next-themes' own `prefers-color-scheme` tracking for "system".
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const hasPositioned = useRef(false);

  const activeIndex = THEME_OPTIONS.findIndex(
    (option) => option.value === theme,
  );

  useLayoutEffect(() => {
    if (!mounted || activeIndex === -1) return;

    const indicator = indicatorRef.current;

    // `ThemeProvider`'s `disableTransitionOnChange` briefly applies
    // `transition: none !important` to every element on each theme
    // switch — exactly when this indicator needs to move — which would
    // cancel a CSS transition mid-flight. GSAP animates by writing
    // inline styles on its own ticker instead of relying on the CSS
    // `transition` property, so it isn't affected.
    const applyPosition = (animate: boolean) => {
      const button = buttonRefs.current[activeIndex];
      if (!indicator || !button) return;

      const rect = {
        left: button.offsetLeft,
        top: button.offsetTop,
        width: button.offsetWidth,
        height: button.offsetHeight,
      };

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!animate || !hasPositioned.current || prefersReducedMotion) {
        gsap.set(indicator, rect);
        hasPositioned.current = true;
      } else {
        gsap.to(indicator, { ...rect, duration: 0.3, ease: "power2.out" });
      }
    };

    applyPosition(true);

    const handleResize = () => applyPosition(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, activeIndex]);

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="relative inline-flex items-center gap-1 rounded-full border border-border bg-card p-1"
    >
      {mounted && (
        <span
          ref={indicatorRef}
          aria-hidden
          data-testid="theme-toggle-indicator"
          className="absolute z-0 rounded-full bg-primary"
        />
      )}

      {THEME_OPTIONS.map(({ value, label, Icon }, index) => {
        const active = mounted && theme === value;

        return (
          <Button
            key={value}
            ref={(node) => {
              buttonRefs.current[index] = node;
            }}
            type="button"
            variant="ghost"
            size="icon"
            role="radio"
            aria-checked={active}
            aria-label={label}
            className={cn(
              "relative z-10 rounded-full",
              active ? "text-primary-foreground" : "",
            )}
            onClick={() => setTheme(value)}
          >
            <Icon aria-hidden />
          </Button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
