"use client";

import * as Tabs from "@radix-ui/react-tabs";

import { CSSProperties, useState } from "react";

import { SERVICE_COLOR } from "./constants";
import { ServiceEmblem } from "./service-emblem";
import { ServiceKey } from "~/components/landing/types";
import { ServicesShowcaseProps } from "./types";

function ServicesShowcase({ copy }: ServicesShowcaseProps) {
  const [active, setActive] = useState<ServiceKey>(copy.items[0].key);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto flex min-h-svh max-w-[90rem] scroll-mt-16 flex-col justify-center px-4 py-28 sm:px-8 lg:px-14 lg:py-32"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <h2
          id="services-title"
          className="text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em] text-balance lg:col-span-7"
        >
          {copy.title}
        </h2>
        <p className="max-w-[30rem] text-lg leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9 lg:self-end">
          {copy.lead}
        </p>
      </div>

      <Tabs.Root
        value={active}
        onValueChange={(value) => setActive(value as ServiceKey)}
        orientation="vertical"
        className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8"
      >
        <Tabs.List
          aria-label={copy.title}
          className="-mx-4 flex [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 lg:col-span-5 lg:mx-0 lg:-ml-6 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {copy.items.map((service) => (
            <Tabs.Trigger
              key={service.key}
              value={service.key}
              style={
                { "--service": SERVICE_COLOR[service.key] } as CSSProperties
              }
              className="group flex shrink-0 items-start gap-4 rounded-2xl px-4 py-3 text-left text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(.2,.8,.2,1)] outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-primary data-[state=active]:bg-secondary data-[state=active]:text-foreground lg:px-6 lg:py-5"
            >
              <span
                aria-hidden="true"
                className="mt-2 size-3 shrink-0 rounded-full bg-(--service) opacity-60 transition-[opacity,box-shadow] duration-300 group-data-[state=active]:opacity-100 group-data-[state=active]:shadow-[0_0_20px_3px_var(--service)]"
              />
              <span className="flex flex-col gap-1.5">
                <span className="text-base font-semibold whitespace-nowrap lg:text-2xl lg:tracking-[-0.02em] lg:whitespace-normal">
                  {service.name}
                </span>
                <span className="hidden max-w-[24rem] text-sm leading-relaxed text-muted-foreground lg:block">
                  {service.body}
                </span>
              </span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* One mark for every discipline: only its lit node and initials change. */}
        <div className="grid min-h-[30rem] overflow-hidden rounded-2xl border border-border bg-card lg:col-span-7 xl:grid-cols-2">
          <div className="relative flex items-center justify-center overflow-hidden bg-background/40 p-10 xl:order-2 xl:p-12">
            {/* Contour rings: the same soil the hero's seed is planted in. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="absolute inset-0 size-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {[60, 110, 165, 225, 290].map((radius) => (
                <circle
                  key={radius}
                  cx={200}
                  cy={212}
                  r={radius}
                  className="fill-none stroke-border"
                  strokeWidth={1}
                />
              ))}
            </svg>
            <ServiceEmblem service={active} className="w-full max-w-[17rem]" />
          </div>
          {copy.items.map((service) => (
            <Tabs.Content
              key={service.key}
              value={service.key}
              className="flex animate-[panel-in_200ms_cubic-bezier(.2,.8,.2,1)] flex-col gap-5 p-8 outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-primary motion-reduce:animate-none lg:p-10"
            >
              <h3 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
                {service.name}
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {service.body}
              </p>
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </section>
  );
}

export default ServicesShowcase;
