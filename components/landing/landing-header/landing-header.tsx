"use client";

import { BOOK_CALL_HREF } from "~/components/landing/constants";
import { Button } from "~/components/ui";
import Image from "next/image";
import { LandingHeaderProps } from "./types";
import Link from "next/link";
import { cn } from "~/utils/cn";
import { onSectionLinkClick } from "~/components/landing/utils";

const FOCUS_RING =
  "rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary";

function LandingHeader({ copy }: LandingHeaderProps) {
  const links = [
    { href: "#process", label: copy.process },
    { href: "#services", label: copy.services },
    { href: "#principles", label: copy.principles },
  ];

  return (
    // Same at every scroll position: the ink ground matches the hero beneath it.
    <header className="fixed inset-x-0 top-0 z-30 bg-background">
      <a
        href="#main"
        className="absolute top-3 left-4 z-40 -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground outline-none focus-visible:translate-y-0 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {copy.skipLink}
      </a>
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-8 lg:px-14">
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
          className="flex items-center gap-6 lg:gap-9"
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
          <Button asChild size="sm" className="font-semibold">
            <a href={BOOK_CALL_HREF} onClick={onSectionLinkClick}>
              {copy.bookCall}
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default LandingHeader;
