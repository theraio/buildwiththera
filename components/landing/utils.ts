import {
  PROCESS_SCROLL_FRACTION,
  STORY_TRIGGER_ID,
} from "~/components/landing/growth-story/constants";
import { prefersReducedMotion, ScrollTrigger } from "~/utils/gsap";

import { MouseEvent } from "react";

/** Height of the fixed header, kept clear when scrolling to a section. */
const HEADER_OFFSET = 64;

/**
 * Smoothly scrolls to an in-page section. `#process` lives inside the pinned
 * story, so it resolves to the scroll position where the first season shows
 * rather than to the element's (pinned) box.
 *
 * @param hash - The link's hash, e.g. `#services`.
 * @returns `true` when the target exists and scrolling started.
 */
export function scrollToSection(hash: string): boolean {
  let top: number | undefined;
  const story = ScrollTrigger.getById(STORY_TRIGGER_ID);
  if (hash === "#process" && story) {
    top = story.start + (story.end - story.start) * PROCESS_SCROLL_FRACTION;
  } else {
    const target = document.querySelector(hash);
    if (target) {
      top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    }
  }
  if (top === undefined) return false;
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
  return true;
}

/**
 * Click handler for in-page links: scrolls smoothly via `scrollToSection`
 * and cancels the native jump when it could.
 *
 * @param event - The anchor's click event.
 */
export function onSectionLinkClick(event: MouseEvent<HTMLAnchorElement>) {
  const { hash } = event.currentTarget;
  if (hash && scrollToSection(hash)) event.preventDefault();
}
