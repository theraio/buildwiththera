"use client";

import {
  LIME_BUTTON,
  START_PROJECT_HREF,
} from "~/components/landing/constants";

import { Button } from "~/components/ui";
import { ClosingProps } from "./types";
import { ContactForm } from "./contact-form";
import Image from "next/image";
import { cn } from "~/utils/cn";
import { onStartProjectClick } from "~/components/landing/utils";

function Closing({ copy, services, locale }: ClosingProps) {
  return (
    // The close and the footer share one full screen.
    <div className="flex min-h-svh flex-col">
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="mx-auto flex w-full max-w-360 flex-1 scroll-mt-16 flex-col items-center justify-center px-4 pt-28 pb-16 text-center sm:px-8 lg:px-14"
      >
        {/* The seed again, waiting on the horizon the page opened with. */}
        <div
          aria-hidden="true"
          className="relative mb-16 h-px w-full max-w-160 bg-linear-to-r from-transparent via-border to-transparent"
        >
          <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-service-ps shadow-[0_0_28px_8px_var(--color-service-ps)]" />
        </div>
        <h2
          id="contact-title"
          className="max-w-[14ch] text-[clamp(3rem,7.6vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance"
        >
          {copy.title}
        </h2>
        <p className="mt-8 max-w-136 text-lg leading-relaxed text-muted-foreground">
          {copy.body}
        </p>
        <Button asChild size="lg" className={cn("mt-10 px-10", LIME_BUTTON)}>
          <a href={START_PROJECT_HREF} onClick={onStartProjectClick}>
            {copy.cta}
          </a>
        </Button>
        <ContactForm copy={copy} services={services} locale={locale} />
      </section>
      <footer className="mx-auto flex w-full max-w-360 flex-col items-center gap-4 px-4 pt-16 pb-10 text-center sm:px-8 lg:px-14">
        <Image
          src="/brand/thera-horizontal-white.svg"
          alt="thera"
          width={80}
          height={24}
        />
        <p className="text-sm text-muted-foreground">
          {copy.location} · © {new Date().getFullYear()} {copy.rights}
        </p>
      </footer>
    </div>
  );
}

export default Closing;
