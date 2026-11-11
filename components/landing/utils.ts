import { START_PROJECT_EVENT } from "./constants";
import { ServiceKey } from "./types";
import { prefersReducedMotion } from "~/utils/gsap";

import { MouseEvent } from "react";

/** Height of the fixed header, kept clear when scrolling to a section. */
const HEADER_OFFSET = 64;

/**
 * Smoothly scrolls to an in-page section, clear of the fixed header.
 *
 * @param hash - The link's hash, e.g. `#services`.
 * @returns `true` when the target exists and scrolling started.
 */
export function scrollToSection(hash: string): boolean {
  const target = document.querySelector(hash);
  if (!target) return false;
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
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

/**
 * Opens the project screen instead of following the link (which, without
 * JavaScript, still lands on the closing section).
 *
 * @param event - The link's click event.
 * @param service - A service to start from, skipping the first question.
 */
export function onStartProjectClick(
  event: MouseEvent<HTMLAnchorElement>,
  service?: ServiceKey,
) {
  event.preventDefault();
  window.dispatchEvent(
    new CustomEvent(START_PROJECT_EVENT, { detail: service }),
  );
}
