"use client";

import { EASE_OUT, gsap, prefersReducedMotion, SplitText } from "~/utils/gsap";
import {
  FIRST_SEASON_AT,
  HERO_OUT_AT,
  PIN_LENGTH,
  SEASON_HOLD,
  SEASON_SPACING,
  STORY_TRIGGER_ID,
  TAIL_HOLD,
} from "./constants";
import { useLayoutEffect, useRef, useState } from "react";

import { BOOK_CALL_HREF } from "~/components/landing/constants";
import { Button } from "~/components/ui";
import { GrowthStoryProps } from "./types";
import { cn } from "~/utils/cn";
import { onSectionLinkClick } from "~/components/landing/utils";

function GrowthStory({ hero, seasons }: GrowthStoryProps) {
  const rootRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLSpanElement>(null);
  const [activeSeason, setActiveSeason] = useState(-1);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = prefersReducedMotion();
    const lift = reducedMotion ? 0 : 32;
    const media = gsap.matchMedia(root);

    // Without this (no JS, or a viewport neither query matches) the hero and
    // seasons simply stack as normal sections over the scene.
    media.add(
      { desktop: "(min-width: 1024px)", mobile: "(max-width: 1023.98px)" },
      () => {
        root.dataset.enhanced = "";

        if (!reducedMotion) {
          const title = SplitText.create("[data-hero-title]", {
            type: "lines",
            mask: "lines",
          });
          // About 1.1s: lines rise 80ms apart, then lead and actions follow
          // from the moment the last line is half way up.
          gsap
            .timeline({ defaults: { ease: EASE_OUT } })
            .from(title.lines, { yPercent: 105, duration: 0.7, stagger: 0.08 })
            .from(
              "[data-hero-rest]",
              { autoAlpha: 0, y: 12, duration: 0.52, stagger: 0.06 },
              "-=0.35",
            );
        }

        const panels = gsap.utils.toArray<HTMLElement>("[data-season]");
        const lastAt = FIRST_SEASON_AT + (panels.length - 1) * SEASON_SPACING;
        const growthEnd = lastAt + 0.8;

        // One pinned timeline is the whole story: the hero clears and each
        // season replaces the last while the roots grow behind them.
        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            id: STORY_TRIGGER_ID,
            trigger: root,
            start: "top top",
            end: () => `+=${window.innerHeight * PIN_LENGTH}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const time = timeline.time();
              const growth = gsap.utils.clamp(
                0,
                1,
                (time - FIRST_SEASON_AT) / (growthEnd - FIRST_SEASON_AT),
              );
              progressLineRef.current?.style.setProperty(
                "transform",
                `scaleX(${growth})`,
              );
              // Seasons swap at `at`, the instant between one fading out and the next in.
              const season =
                time < FIRST_SEASON_AT
                  ? -1
                  : Math.min(
                      panels.length - 1,
                      Math.floor((time - FIRST_SEASON_AT) / SEASON_SPACING),
                    );
              setActiveSeason(season);
            },
          },
        });

        timeline
          .to(
            "[data-hero]",
            { autoAlpha: 0, y: -lift, duration: 1 },
            HERO_OUT_AT,
          )
          .fromTo(
            "[data-story-scrim]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.8 },
            HERO_OUT_AT + 0.4,
          )
          .fromTo(
            "[data-season-index]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6 },
            HERO_OUT_AT + 0.6,
          );

        panels.forEach((panel, index) => {
          const at = FIRST_SEASON_AT + index * SEASON_SPACING;
          timeline.fromTo(
            panel,
            // Opacity, not autoAlpha: hidden seasons stay readable to screen readers.
            { opacity: 0, y: lift },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            at,
          );
          if (index < panels.length - 1) {
            timeline.to(
              panel,
              { opacity: 0, y: -lift, duration: 0.7, ease: "power2.in" },
              at + SEASON_HOLD,
            );
          }
        });
        // Hold on Harvest before the pin releases.
        timeline.set({}, {}, growthEnd + TAIL_HOLD);

        return () => {
          delete root.dataset.enhanced;
          setActiveSeason(-1);
        };
      },
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-title"
      className="group/story relative isolate data-enhanced:h-svh data-enhanced:overflow-hidden"
    >
      {/* Keeps season copy legible over the roots on phones. */}
      <div
        data-story-scrim
        aria-hidden="true"
        className="pointer-events-none invisible absolute inset-x-0 bottom-0 -z-10 hidden h-3/5 bg-linear-to-t from-background via-background/85 to-transparent group-data-enhanced/story:block lg:group-data-enhanced/story:hidden"
      />

      <div
        data-hero
        className="relative flex min-h-svh flex-col items-center justify-center gap-8 px-4 pt-24 pb-[30svh] text-center sm:px-8 group-data-enhanced/story:absolute group-data-enhanced/story:inset-0"
      >
        <h1
          id="hero-title"
          data-hero-title
          className="max-w-[16ch] text-[clamp(2.75rem,6.6vw,6rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-balance"
        >
          {hero.title.join(" ")}
        </h1>
        <p
          data-hero-rest
          className="max-w-[38rem] text-lg leading-relaxed text-muted-foreground"
        >
          {hero.lead}
        </p>
        <div
          data-hero-rest
          className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button asChild size="lg" className="font-semibold">
            <a href={BOOK_CALL_HREF} onClick={onSectionLinkClick}>
              {hero.primary}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#process" onClick={onSectionLinkClick}>
              {hero.secondary}
            </a>
          </Button>
        </div>
      </div>

      <div
        id="process"
        className="relative group-data-enhanced/story:absolute group-data-enhanced/story:inset-0"
      >
        <h2 className="sr-only">{seasons.label}</h2>
        {seasons.items.map((season) => (
          <article
            key={season.name}
            data-season
            className="mx-auto flex max-w-[90rem] flex-col gap-5 px-4 py-20 sm:px-8 lg:px-14 group-data-enhanced/story:absolute group-data-enhanced/story:opacity-0 group-data-enhanced/story:inset-0 group-data-enhanced/story:justify-end group-data-enhanced/story:pb-40 lg:group-data-enhanced/story:justify-center lg:group-data-enhanced/story:pb-0"
          >
            {/* The season name shows on the index below; here it's for screen readers. */}
            <h3 className="max-w-[14ch] text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em] text-balance">
              <span className="sr-only">{season.name}: </span>
              {season.title}
            </h3>
            <p className="max-w-[32rem] text-lg leading-relaxed text-muted-foreground">
              {season.body}
            </p>
          </article>
        ))}
      </div>

      <div
        data-season-index
        aria-hidden="true"
        className="invisible absolute inset-x-4 bottom-8 hidden sm:inset-x-8 group-data-enhanced/story:block lg:right-auto lg:left-14 lg:w-[28rem] lg:bottom-12"
      >
        <ol className="grid grid-cols-4 text-sm">
          {seasons.items.map((season, index) => (
            <li
              key={season.name}
              className={cn(
                "transition-colors duration-500",
                index === activeSeason
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {season.name}
            </li>
          ))}
        </ol>
        <div className="relative mt-3 h-px bg-border">
          <span
            ref={progressLineRef}
            className="absolute inset-0 origin-left scale-x-0 bg-foreground"
          />
        </div>
      </div>
    </section>
  );
}

export default GrowthStory;
