"use client";

import { EASE_OUT, gsap, prefersReducedMotion } from "~/utils/gsap";

import { FaqProps } from "./types";
import { MouseEvent } from "react";

const isOpening = (details: HTMLDetailsElement) =>
  details.open && details.dataset.closing === undefined;

/** Eases an answer open from nothing. */
function openAnswer(details: HTMLDetailsElement) {
  const answer = details.lastElementChild as HTMLElement;
  gsap.killTweensOf(answer);
  delete details.dataset.closing;
  details.open = true;
  gsap.fromTo(
    answer,
    { height: 0, opacity: 0 },
    {
      height: "auto",
      opacity: 1,
      duration: prefersReducedMotion() ? 0 : 0.55,
      ease: EASE_OUT,
      clearProps: "height,opacity",
    },
  );
}

/** Folds an answer away, closing it once the fold ends. */
function closeAnswer(details: HTMLDetailsElement) {
  const answer = details.lastElementChild as HTMLElement;
  gsap.killTweensOf(answer);
  // Marked first, so the icon turns back while the answer folds away.
  details.dataset.closing = "";
  gsap.to(answer, {
    height: 0,
    opacity: 0,
    duration: prefersReducedMotion() ? 0 : 0.4,
    ease: "power2.inOut",
    onComplete: () => {
      details.open = false;
      delete details.dataset.closing;
      gsap.set(answer, { clearProps: "height,opacity" });
    },
  });
}

/** One answer open at a time: opening a question folds the open one away. */
function toggle(event: MouseEvent<HTMLElement>) {
  event.preventDefault();
  const details = event.currentTarget.parentElement as HTMLDetailsElement;
  if (isOpening(details)) {
    closeAnswer(details);
    return;
  }
  details.parentElement
    ?.querySelectorAll<HTMLDetailsElement>("details[open]")
    .forEach((other) => {
      if (other !== details && isOpening(other)) closeAnswer(other);
    });
  openAnswer(details);
}

function Faq({ copy }: FaqProps) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="mx-auto max-w-[90rem] scroll-mt-16 px-4 py-28 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-14 lg:py-32"
    >
      <h2
        id="faq-title"
        className="text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em] lg:sticky lg:top-32 lg:col-span-4 lg:self-start"
      >
        {copy.title}
      </h2>
      <div className="mt-16 border-t border-border lg:col-span-8 lg:col-start-5 lg:mt-0">
        {copy.items.map((item, index) => (
          // The first answer greets the reader already open.
          <details
            key={item.question}
            open={index === 0}
            className="group border-b border-border"
          >
            <summary
              onClick={toggle}
              className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-xl font-semibold tracking-[-0.015em] outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-primary lg:text-2xl [&::-webkit-details-marker]:hidden"
            >
              {item.question}
              {/* An outlined plus that turns into a cross while lime floods
                  its circle from the centre, in step with the answer opening. */}
              <span
                aria-hidden="true"
                className="relative grid size-9 shrink-0 place-items-center rounded-full border border-current text-muted-foreground transition-colors duration-500 group-[[open]:not([data-closing])]:border-success-500 group-[[open]:not([data-closing])]:text-gray-900 motion-reduce:transition-none"
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-success-500 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-[[open]:not([data-closing])]:scale-100 motion-reduce:transition-none" />
                <span className="relative size-3.5 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-[[open]:not([data-closing])]:rotate-45 motion-reduce:transition-none">
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
                </span>
              </span>
            </summary>
            <div className="overflow-hidden">
              <p className="max-w-[46rem] pb-8 text-lg leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default Faq;
