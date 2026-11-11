"use client";

import { EASE_OUT, SplitText, gsap, prefersReducedMotion } from "~/utils/gsap";
import {
  LIME_BUTTON,
  REVEAL_EVENT,
  START_PROJECT_HREF,
} from "~/components/landing/constants";
import {
  onSectionLinkClick,
  onStartProjectClick,
} from "~/components/landing/utils";
import { useLayoutEffect, useRef } from "react";

import { Button } from "~/components/ui";
import { GrowthStoryProps } from "./types";

function GrowthStory({ hero, seasons }: GrowthStoryProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const context = gsap.context(() => {
      const title = SplitText.create("[data-hero-title]", {
        type: "lines",
        mask: "lines",
      });
      // The masks are one tight line tall and would crop descenders (g, y):
      // pad them below, pulled back so the leading stays the same.
      gsap.set(title.masks, { paddingBottom: "0.2em", marginBottom: "-0.2em" });
      // About 1.1s: lines rise 80ms apart, then lead and actions follow
      // from the moment the last line is half way up.
      const intro = gsap
        .timeline({ defaults: { ease: EASE_OUT }, paused: true })
        .from(title.lines, {
          yPercent: 125,
          duration: 0.7,
          stagger: 0.08,
          // Once settled, drop the masks so nothing can clip the title.
          onComplete: () => title.revert(),
        })
        .from(
          "[data-hero-rest]",
          { autoAlpha: 0, y: 12, duration: 0.52, stagger: 0.06 },
          "-=0.35",
        );
      // Plays as the loading screen lifts, not hidden behind it.
      if (document.documentElement.dataset.revealed !== undefined) intro.play();
      else
        window.addEventListener(REVEAL_EVENT, () => intro.play(), {
          once: true,
        });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section
        aria-labelledby="hero-title"
        className="flex min-h-svh flex-col items-center justify-center gap-8 px-4 py-24 text-center sm:px-8"
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
          className="max-w-152 text-lg leading-relaxed text-muted-foreground"
        >
          {hero.lead}
        </p>
        <div
          data-hero-rest
          className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button asChild size="lg" className={LIME_BUTTON}>
            <a href={START_PROJECT_HREF} onClick={onStartProjectClick}>
              {hero.primary}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a href="#process" onClick={onSectionLinkClick}>
              {hero.secondary}
            </a>
          </Button>
        </div>
        <p
          data-hero-rest
          className="flex items-center gap-2.5 text-sm text-muted-foreground"
        >
          {/* Status light: a person on the other side, with limited room. */}
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-service-ps shadow-[0_0_10px_2px_var(--color-service-ps)]"
          />
          {hero.availability}
        </p>
      </section>

      {/* Same layout as Principles: a sticky title, the seasons alongside. */}
      <section
        id="process"
        aria-labelledby="process-title"
        className="mx-auto max-w-360 scroll-mt-16 px-4 py-28 sm:px-8 lg:grid lg:min-h-svh lg:grid-cols-12 lg:content-center lg:gap-8 lg:px-14 lg:py-32"
      >
        <h2
          id="process-title"
          className="text-[clamp(2.25rem,4.6vw,4.5rem)] leading-none font-semibold tracking-[-0.035em] lg:sticky lg:top-32 lg:col-span-4 lg:self-start"
        >
          {seasons.label}
        </h2>
        <ol className="mt-16 flex flex-col gap-16 lg:col-span-8 lg:col-start-5 lg:mt-0 lg:gap-24">
          {seasons.items.map((season, index) => (
            <li key={season.name} className="flex flex-col gap-4">
              <p className="flex gap-3 text-sm text-muted-foreground">
                <span className="tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground">{season.name}</span>
              </p>
              <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
                <span className="sr-only">{season.name}: </span>
                {season.title}
              </h3>
              <p className="text-sm text-foreground">{season.meta}</p>
              <p className="max-w-184 text-lg leading-relaxed text-muted-foreground">
                {season.body}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default GrowthStory;
