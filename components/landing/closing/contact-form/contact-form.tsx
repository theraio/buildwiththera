"use client";

import { Button, Input } from "~/components/ui";
import { ContactFormProps, Need } from "./types";
import { EASE_OUT, gsap, prefersReducedMotion } from "~/utils/gsap";
import {
  LIME_BUTTON,
  START_PROJECT_EVENT,
} from "~/components/landing/constants";
import { NEEDS, PLACEHOLDER, STEP_COUNT } from "./constants";
import {
  useActionState,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { DialogCore } from "~/components/ui/dialog";
import { Option } from "./option";
import { cn } from "~/utils/cn";
import { inputVariants } from "~/components/ui/input";
import { sendInquiry } from "./actions";

const pad = (value: number) => String(value).padStart(2, "0");

function ContactForm({ copy, services, locale }: ContactFormProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<Need | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [state, submit, pending] = useActionState(sendInquiry, "idle");
  const stepRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sent = state === "sent";
  // Whether this opening of the screen has already settled its first step.
  const openedRef = useRef(false);

  // Every "Start a project" opens this screen; a service row skips to the budget.
  useEffect(() => {
    const start = (event: Event) => {
      const service = (event as CustomEvent<Need | undefined>).detail;
      if (service) {
        setNeed(service);
        setStep(1);
      }
      setOpen(true);
    };
    window.addEventListener(START_PROJECT_EVENT, start);
    return () => window.removeEventListener(START_PROJECT_EVENT, start);
  }, []);

  // The screen and each new step take focus and settle in.
  useLayoutEffect(() => {
    if (!open) {
      openedRef.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    if (prefersReducedMotion() || !stepRef.current) return;
    // On opening, the step waits for the curtain to be mostly up.
    const timeline = gsap.timeline({
      defaults: { ease: EASE_OUT },
      delay: openedRef.current ? 0 : 0.45,
    });
    openedRef.current = true;
    if (sent) {
      // The lime ring draws itself, the check follows, then the words rise.
      timeline
        .from("[data-sent-ring]", { strokeDashoffset: 1, duration: 0.8 })
        .from(
          "[data-sent-check]",
          { strokeDashoffset: 1, duration: 0.45 },
          "-=0.2",
        )
        .from(
          "[data-sent-mark]",
          { scale: 0.85, duration: 1.1, ease: "elastic.out(1, 0.6)" },
          0,
        );
    }
    timeline.from(
      sent
        ? stepRef.current.querySelectorAll("[data-sent-copy]")
        : stepRef.current.children,
      { opacity: 0, y: 16, duration: 0.6, stagger: 0.06 },
      sent ? 0.5 : 0,
    );
    return () => {
      timeline.revert();
    };
  }, [open, step, sent]);

  const needs = NEEDS.map((key) => ({
    key,
    label:
      services.find((service) => service.key === key)?.name ?? copy.need.unsure,
  }));
  const heading =
    "text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.035em] outline-none text-balance";
  const toolButton =
    "flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs font-semibold tracking-wide uppercase transition-colors outline-none hover:bg-secondary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-primary";

  return (
    <DialogCore open={open} onOpenChange={setOpen}>
      <DialogCore.Content
        lang={locale}
        aria-describedby={undefined}
        // The screen covers the page itself; a dimmed backdrop only shows
        // as a black band while it sweeps in.
        overlay={false}
        // The step heading takes focus instead of the first option.
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          headingRef.current?.focus({ preventScroll: true });
        }}
        // Portalled out of the landing, so it restates the brand's dark ground.
        className="dark top-0 left-0 h-dvh max-w-none translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-none border-0 bg-background p-0 text-foreground shadow-none data-[state=closed]:animate-[curtain-out_550ms_cubic-bezier(.76,0,.24,1)_forwards] data-[state=open]:animate-[curtain-in_750ms_cubic-bezier(.76,0,.24,1)] motion-reduce:animate-none lg:grid lg:grid-cols-12"
      >
        <DialogCore.Title className="sr-only">{copy.cta}</DialogCore.Title>
        {/* The step count, large, as the screen's only ornament. */}
        <aside
          aria-hidden="true"
          className={cn(
            "flex flex-col justify-between gap-8 bg-card px-4 py-6 sm:px-8 lg:col-span-4 lg:items-center lg:px-10 lg:py-10 lg:text-center xl:col-span-3",
            sent && "hidden",
          )}
        >
          <p className="text-sm text-muted-foreground">
            thera / <span className="text-foreground">{copy.kicker}</span>
          </p>
          <div>
            <p className="text-[clamp(4rem,9vw,8rem)] leading-[0.85] font-semibold tracking-[-0.06em] text-service-ps tabular-nums">
              {pad(step + 1)}
            </p>
            <p className="mt-6 max-w-[18rem] leading-relaxed text-muted-foreground max-lg:hidden lg:mx-auto">
              {copy.body}
            </p>
          </div>
          <p className="text-sm text-muted-foreground tabular-nums max-lg:hidden">
            {pad(step + 1)} / {pad(STEP_COUNT)}
          </p>
        </aside>

        <div
          className={cn(
            "flex min-h-full flex-col px-4 pt-4 pb-16 sm:px-8 sm:pt-6 lg:col-span-8 lg:pt-8 lg:pr-10 lg:pl-28 xl:col-span-9",
            sent && "lg:col-span-12 xl:col-span-12",
          )}
        >
          {/* Back where it can go back, close always: one toolbar row. */}
          <div className="flex items-center justify-between gap-4">
            {step > 0 && !sent ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className={toolButton}
              >
                <span aria-hidden="true">←</span> {copy.back}
              </button>
            ) : (
              <span />
            )}
            <DialogCore.Close className={toolButton}>
              {copy.close} <span aria-hidden="true">×</span>
            </DialogCore.Close>
          </div>
          <div
            ref={stepRef}
            className={
              sent
                ? "my-auto flex flex-col items-center py-16 text-center"
                : "mt-10 lg:mt-16 lg:pr-18"
            }
          >
            {sent ? (
              <>
                <svg
                  data-sent-mark
                  aria-hidden="true"
                  viewBox="0 0 96 96"
                  className="size-24 text-success-500 drop-shadow-[0_0_24px_var(--color-success-500)]"
                >
                  <circle
                    data-sent-ring
                    cx="48"
                    cy="48"
                    r="44"
                    pathLength={1}
                    strokeDasharray="1"
                    className="fill-none stroke-current"
                    strokeWidth="3"
                  />
                  <path
                    data-sent-check
                    d="M30 49 L43 62 L67 36"
                    pathLength={1}
                    strokeDasharray="1"
                    className="fill-none stroke-current"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  data-sent-copy
                  className={cn(heading, "mt-10")}
                >
                  {copy.sent.title}
                </h2>
                <p
                  data-sent-copy
                  className="mt-4 max-w-120 text-lg leading-relaxed text-muted-foreground"
                >
                  {copy.sent.body}
                </p>
                <div data-sent-copy className="mt-10">
                  <DialogCore.Close asChild>
                    <Button size="lg" className={cn("px-10", LIME_BUTTON)}>
                      {copy.sent.close}
                    </Button>
                  </DialogCore.Close>
                </div>
              </>
            ) : step === 0 ? (
              <>
                <h2 ref={headingRef} tabIndex={-1} className={heading}>
                  {copy.need.title}
                </h2>
                <ul className="mt-8 border-t border-border">
                  {needs.map((option, index) => (
                    <Option
                      key={option.key}
                      marker={pad(index + 1)}
                      label={option.label}
                      selected={need === option.key}
                      onSelect={() => {
                        setNeed(option.key);
                        setStep(1);
                      }}
                    />
                  ))}
                </ul>
              </>
            ) : step === 1 ? (
              <>
                <h2 ref={headingRef} tabIndex={-1} className={heading}>
                  {copy.budget.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  {copy.budget.hint}
                </p>
                <ul className="mt-8 border-t border-border">
                  {copy.budget.options.map((option, index) => (
                    <Option
                      key={option}
                      marker={String.fromCharCode(65 + index)}
                      label={option}
                      selected={budget === index}
                      onSelect={() => {
                        setBudget(index);
                        setStep(2);
                      }}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h2 ref={headingRef} tabIndex={-1} className={heading}>
                  {copy.details.title}
                </h2>
                <form action={submit} className="mt-8 flex flex-col gap-6">
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="need" value={need ?? ""} />
                  <input type="hidden" name="budget" value={budget ?? ""} />
                  {/* Honeypot for bots; people never see or reach it. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                      {copy.details.name}
                      <Input
                        name="name"
                        size="lg"
                        required
                        maxLength={120}
                        autoComplete="name"
                        placeholder={copy.details.placeholders.name}
                        className={PLACEHOLDER}
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                      {copy.details.email}
                      <Input
                        name="email"
                        type="email"
                        size="lg"
                        required
                        maxLength={200}
                        autoComplete="email"
                        placeholder={copy.details.placeholders.email}
                        className={PLACEHOLDER}
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                    {copy.details.message}
                    <textarea
                      name="message"
                      required
                      rows={4}
                      maxLength={4000}
                      placeholder={copy.details.placeholders.message}
                      className={cn(
                        inputVariants({ size: "lg" }),
                        "h-auto resize-y py-3 outline-none placeholder:text-muted-foreground/70",
                      )}
                    />
                  </label>
                  {(state === "invalid" || state === "error") && (
                    <p role="alert" className="text-sm text-destructive">
                      {state === "invalid" ? copy.invalid : copy.error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={pending}
                    className={cn("self-end px-10", LIME_BUTTON)}
                  >
                    {pending ? copy.details.sending : copy.details.submit}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </DialogCore.Content>
    </DialogCore>
  );
}

export default ContactForm;
