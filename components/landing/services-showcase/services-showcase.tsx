"use client";

import { CSSProperties, PointerEvent } from "react";

import { SERVICE_COLOR } from "./constants";
import { START_PROJECT_HREF } from "~/components/landing/constants";
import { ServicesShowcaseProps } from "./types";
import { onStartProjectClick } from "~/components/landing/utils";

/** Keeps the row's cursor label under the pointer. */
function followPointer(event: PointerEvent<HTMLAnchorElement>) {
  const { left, top } = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - top}px`);
}

function ServicesShowcase({ copy }: ServicesShowcaseProps) {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto flex max-w-360 scroll-mt-16 flex-col justify-center lg:min-h-svh px-4 py-28 sm:px-8 lg:px-14 lg:py-32"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <h2
          id="services-title"
          className="text-[clamp(2.25rem,4.6vw,4.5rem)] leading-none font-semibold tracking-[-0.035em] text-balance lg:col-span-7"
        >
          {copy.title}
        </h2>
        <p className="max-w-120 text-lg leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9 lg:self-end">
          {copy.lead}
        </p>
      </div>

      <ul className="mt-16 border-t border-border lg:mt-20">
        {copy.items.map((service, index) => (
          <li key={service.key} className="border-b border-border">
            <a
              href={START_PROJECT_HREF}
              onClick={(event) => onStartProjectClick(event, service.key)}
              onPointerMove={followPointer}
              style={
                { "--service": SERVICE_COLOR[service.key] } as CSSProperties
              }
              className="group relative isolate grid grid-cols-[2rem_1fr] items-baseline gap-x-4 gap-y-3 sm:gap-x-6 overflow-hidden px-2 py-8 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid focus-visible:outline-primary lg:grid-cols-12 lg:gap-x-8 lg:px-6 lg:py-10"
            >
              {/* The ink inverts: a band of light rises behind the row. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
              />
              <span className="text-sm text-muted-foreground tabular-nums transition-colors duration-500 group-hover:text-background/60 group-focus-visible:text-background/60 lg:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex items-center gap-4 text-[clamp(2rem,4.4vw,4rem)] leading-[1.05] font-semibold tracking-[-0.035em] transition-[translate,color] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-4 group-hover:text-background group-focus-visible:translate-x-4 group-focus-visible:text-background motion-reduce:transition-none lg:col-span-7">
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full bg-(--service) shadow-[0_0_16px_3px_var(--service)]"
                />
                {service.name}
              </span>
              <span className="col-start-2 max-w-xl text-base leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-background/70 group-focus-visible:text-background/70 lg:col-span-4 lg:col-start-9">
                {service.body}
              </span>
              <span
                aria-hidden="true"
                style={{ transform: "translate(var(--x), var(--y))" }}
                className="pointer-events-none absolute top-0 left-0 ml-4 -mt-4 hidden scale-75 rounded-full bg-(--service) px-3 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap text-background uppercase opacity-0 transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100 pointer-fine:block"
              >
                {service.hint} ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ServicesShowcase;
