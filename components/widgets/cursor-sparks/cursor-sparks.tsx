"use client";

import {
  EMBER_INTERVAL,
  GRAVITY,
  MAX_SPARKS,
  SPARK_SPACING,
} from "./constants";
import { useEffect, useRef } from "react";

import { Spark } from "./types";
import { prefersReducedMotion } from "~/utils/gsap";

/**
 * Lime sparks that trail the mouse across the whole site. A resting
 * cursor keeps only a faint ember, rising now and then.
 */
function CursorSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    // Mouse and trackpad only: touch has no cursor to trail.
    if (
      !canvas ||
      !context ||
      prefersReducedMotion() ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const color =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-success-500")
        .trim() || "#9bd301";
    const sparks: Spark[] = [];
    let previous: { x: number; y: number } | null = null;
    // Where an ember may rise: null once the cursor leaves the window.
    let resting: { x: number; y: number } | null = null;
    let movedAt = 0;
    let travel = 0;
    let frame = 0;
    let last = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "lighter";
      context.strokeStyle = color;
      context.lineCap = "round";
      const drag = Math.exp(-delta * 3);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.life -= delta;
        if (spark.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        spark.vx *= drag;
        spark.vy = spark.vy * drag + spark.gravity * delta;
        spark.x += spark.vx * delta;
        spark.y += spark.vy * delta;
        // A short streak along its path, thinning and fading as it dies.
        const fade = spark.life / spark.maxLife;
        context.globalAlpha = fade * spark.alpha;
        context.lineWidth = spark.size * fade;
        context.beginPath();
        context.moveTo(spark.x, spark.y);
        context.lineTo(spark.x - spark.vx * 0.05, spark.y - spark.vy * 0.05);
        context.stroke();
      }
      frame = sparks.length ? requestAnimationFrame(draw) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const point = { x: event.clientX, y: event.clientY };
      const from = previous ?? point;
      previous = point;
      resting = point;
      movedAt = performance.now();

      const dx = point.x - from.x;
      const dy = point.y - from.y;
      travel += Math.hypot(dx, dy);
      while (travel >= SPARK_SPACING && sparks.length < MAX_SPARKS) {
        travel -= SPARK_SPACING;
        const angle = Math.random() * Math.PI * 2;
        const speed = 30 + Math.random() * 90;
        const life = 0.45 + Math.random() * 0.5;
        sparks.push({
          x: point.x,
          y: point.y,
          // Thrown outward, carrying a little of the cursor's own motion.
          vx: Math.cos(angle) * speed + dx * 3,
          vy: Math.sin(angle) * speed + dy * 3,
          life,
          maxLife: life,
          size: 1.5 + Math.random() * 1.5,
          alpha: 1,
          gravity: GRAVITY,
        });
      }
      // No backlog when the cap is hit.
      travel = Math.min(travel, SPARK_SPACING);
      play();
    };

    const play = () => {
      if (frame || !sparks.length) return;
      last = performance.now();
      frame = requestAnimationFrame(draw);
    };

    // At rest, a single dim ember drifts up from the cursor every so often.
    const ember = window.setInterval(() => {
      if (!resting || document.hidden) return;
      if (performance.now() - movedAt < EMBER_INTERVAL) return;
      const life = 0.9 + Math.random() * 0.6;
      sparks.push({
        x: resting.x + (Math.random() - 0.5) * 6,
        y: resting.y,
        vx: (Math.random() - 0.5) * 16,
        vy: -(14 + Math.random() * 16),
        life,
        maxLife: life,
        size: 1 + Math.random() * 0.8,
        alpha: 0.45,
        gravity: -10,
      });
      play();
    }, EMBER_INTERVAL);
    const onLeave = () => {
      resting = null;
      previous = null;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(ember);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] size-full"
    />
  );
}

export default CursorSparks;
