"use client";

import { CSSProperties, useLayoutEffect, useRef } from "react";
import { PENTAGON_VERTICES, SERVICE_VERTEX } from "./constants";
import {
  SERVICE_COLOR,
  SERVICE_INITIALS,
} from "~/components/landing/services-showcase/constants";
import { gsap, prefersReducedMotion } from "~/utils/gsap";

import { ServiceEmblemProps } from "./types";
import { cn } from "~/utils/cn";

const EDGES = PENTAGON_VERTICES.map((from, index) => ({
  from,
  to: PENTAGON_VERTICES[(index + 1) % PENTAGON_VERTICES.length],
}));

function ServiceEmblem({ service, className }: ServiceEmblemProps) {
  const initialsRef = useRef<SVGTextElement>(null);
  const isFirstRender = useRef(true);
  const active = SERVICE_VERTEX[service];
  const glowAt = PENTAGON_VERTICES[active];

  // The mark stands still; only the initials swap when the service changes.
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      initialsRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
    );
    return () => {
      tween.kill();
    };
  }, [service]);

  return (
    <div
      aria-hidden="true"
      style={{ "--service": SERVICE_COLOR[service] } as CSSProperties}
      className={cn("relative aspect-square", className)}
    >
      {/* The lit node travels round the pentagon: transform only, eased like an indicator. */}
      <span
        className="absolute top-0 left-0 size-[34%] rounded-full bg-(--service) opacity-55 blur-3xl transition-[transform,background-color] duration-500 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
        style={{
          transform: `translate(calc(${glowAt.x / 4} * 100% / 34 - 50%), calc(${glowAt.y / 4} * 100% / 34 - 50%))`,
        }}
      />
      <svg
        viewBox="0 0 400 400"
        className="relative size-full overflow-visible"
      >
        {EDGES.map(({ from, to }, index) => (
          <line
            key={index}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            strokeWidth={16}
            strokeLinecap="round"
            className="stroke-foreground"
          />
        ))}
        {PENTAGON_VERTICES.map((vertex, index) => (
          <circle
            key={index}
            cx={vertex.x}
            cy={vertex.y}
            r={26}
            className={cn(
              "origin-center transition-[fill,scale] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] [transform-box:fill-box] motion-reduce:transition-none",
              index === active
                ? "scale-[1.18] fill-(--service)"
                : "fill-foreground",
            )}
          />
        ))}
        <text
          ref={initialsRef}
          x={200}
          y={214}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-[88px] font-semibold tracking-[-0.02em]"
        >
          {SERVICE_INITIALS[service]}
        </text>
      </svg>
    </div>
  );
}

export default ServiceEmblem;
