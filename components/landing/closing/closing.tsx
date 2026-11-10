import { BOOK_CALL_HREF } from "~/components/landing/constants";
import { Button } from "~/components/ui";
import { ClosingProps } from "./types";
import Image from "next/image";

function Closing({ copy }: ClosingProps) {
  return (
    // The close and the footer share one full screen.
    <div className="flex min-h-svh flex-col">
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="mx-auto flex w-full max-w-[90rem] flex-1 scroll-mt-16 flex-col items-center justify-center px-4 pt-28 pb-16 text-center sm:px-8 lg:px-14"
      >
        {/* The seed again, waiting on the horizon the page opened with. */}
        <div
          aria-hidden="true"
          className="relative mb-16 h-px w-full max-w-[40rem] bg-linear-to-r from-transparent via-border to-transparent"
        >
          <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-service-ps shadow-[0_0_28px_8px_var(--color-service-ps)]" />
        </div>
        <h2
          id="contact-title"
          className="max-w-[14ch] text-[clamp(3rem,7.6vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance"
        >
          {copy.title}
        </h2>
        <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground">
          {copy.body}
        </p>
        <Button asChild size="lg" className="mt-10 px-10 font-semibold">
          <a href={BOOK_CALL_HREF}>{copy.cta}</a>
        </Button>
      </section>
      <footer className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-4 px-4 pt-16 pb-10 text-center sm:px-8 lg:px-14">
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
