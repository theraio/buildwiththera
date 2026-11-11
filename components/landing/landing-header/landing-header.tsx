"use client";

import {
  LIME_BUTTON,
  START_PROJECT_HREF,
} from "~/components/landing/constants";
import { Button } from "~/components/ui";
import Image from "next/image";
import { LandingHeaderProps } from "./types";
import Link from "next/link";
import { cn } from "~/utils/cn";
import { useEffect, useState } from "react";
import {
  onSectionLinkClick,
  onStartProjectClick,
} from "~/components/landing/utils";

const FOCUS_RING =
  "rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary";

function LandingHeader({ copy }: LandingHeaderProps) {
  const links = [
    { href: "#process", label: copy.process },
    { href: "#services", label: copy.services },
    { href: "#faq", label: copy.faq },
  ];

  const [hidden, setHidden] = useState(false);

  // Slides away while reading down the page, comes back on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Ignore jitter; near the top it always shows.
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 64);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 px-3 pt-3 sm:px-6">
      <a
        href="#main"
        className="pointer-events-auto absolute top-3 left-4 z-40 -translate-y-20 rounded-full bg-success-500 px-4 py-2 text-sm font-semibold text-gray-900 outline-none focus-visible:translate-y-0 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {copy.skipLink}
      </a>
      {/* A pane of glass over the roots: it shrinks away on the way down and
            grows back on the way up; keyboard focus keeps it in view. */}
      <div
        className={cn(
          "pointer-events-auto mx-auto flex h-14 w-fit max-w-full origin-top items-center gap-6 rounded-2xl border border-foreground/10 bg-background/55 pr-2 pl-5 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06),0_16px_40px_-16px_rgb(0_0_0/0.7)] backdrop-blur-xl backdrop-saturate-150 transition-[translate,scale,opacity,filter] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none sm:pl-6 lg:gap-14",
          hidden &&
            "not-focus-within:pointer-events-none not-focus-within:-translate-y-3 not-focus-within:scale-[0.82] not-focus-within:opacity-0 not-focus-within:blur-sm",
        )}
      >
        <Link
          href={copy.switchHref === "/" ? "/es" : "/"}
          className={cn("shrink-0", FOCUS_RING)}
        >
          {/* Primary logo without "LLC": the brandbook drops it below 32px height. */}
          <Image
            src="/brand/thera-horizontal-white.svg"
            alt="thera"
            width={87}
            height={26}
            priority
          />
        </Link>
        <nav
          aria-label={copy.label}
          className="flex items-center gap-5 lg:gap-9"
        >
          <ul className="hidden items-center gap-9 text-sm text-muted-foreground md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={onSectionLinkClick}
                  className={cn(
                    "transition-colors hover:text-foreground",
                    FOCUS_RING,
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href={copy.switchHref}
            aria-label={copy.switchLabel}
            className={cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              FOCUS_RING,
            )}
          >
            {copy.switchShort}
          </Link>
          <Button asChild size="sm" className={cn("px-4", LIME_BUTTON)}>
            <a href={START_PROJECT_HREF} onClick={onStartProjectClick}>
              {copy.workWithMe}
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default LandingHeader;
