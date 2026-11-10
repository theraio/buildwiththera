import Image from "next/image";

const paletteSwatches = [
  { token: "primary", cssVar: "--color-primary" },
  { token: "error-500", cssVar: "--color-error-500" },
  { token: "warning-500", cssVar: "--color-warning-500" },
  { token: "success-500", cssVar: "--color-success-500" },
  { token: "blue-500", cssVar: "--color-blue-500" },
  { token: "violet-500", cssVar: "--color-violet-500" },
];

const pillars = [
  {
    title: "Design system included",
    body: "A themed component library (`components/ui`) with Storybook, snapshot tests, and confirmed design tokens — not a blank Next.js starter.",
  },
  {
    title: "Observability built in",
    body: "Sentry error tracking and PostHog analytics are wired up as `widgets/`, ready to go the moment you add a key.",
  },
  {
    title: "Type-safe data fetching",
    body: "A centralized `fetcher` (`lib/fetcher`) for REST calls and a tRPC integration (`widgets/trpc`) with zod-validated schemas, ready for both Server and Client Components.",
  },
  {
    title: "Opinionated conventions",
    body: "File naming, folder structure, and testing conventions are documented in `FOUNDATIONS.md` so every contributor builds the same way.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-10">
        {/* Primary logo without "LLC" — the brandbook drops LLC below 32px height. Logo files have no token, so the swap uses dark: */}
        <div className="flex items-center">
          <Image
            src="/brand/thera-horizontal.svg"
            alt="thera"
            width={93}
            height={28}
            priority
            className="dark:hidden"
          />
          <Image
            src="/brand/thera-horizontal-white.svg"
            alt="thera"
            width={93}
            height={28}
            priority
            className="hidden dark:block"
          />
        </div>
        <a
          href="#"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          View on GitHub
        </a>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 py-20 sm:px-10">
        <section className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Next.js Boilerplate
          </span>
          <h1 className="font-sans text-4xl font-bold tracking-tight sm:text-6xl">
            A strong technical base for agentic development
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Spar is a starting point, not a template to fill in — a design
            system, observability, and conventions already in place so you can
            start building the actual product.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              Get started
            </a>
            <a
              href="#"
              className="rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Read the conventions
            </a>
          </div>
        </section>

        <section className="mt-24 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-border bg-card p-6 text-foreground"
            >
              <h2 className="font-sans text-sm font-semibold">
                {pillar.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {pillar.body}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 flex flex-col items-center gap-3">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Design system palette
          </span>
          <div className="flex gap-3">
            {paletteSwatches.map((swatch) => (
              <div
                key={swatch.token}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className="h-8 w-8 rounded-full border border-border"
                  style={{ backgroundColor: `var(${swatch.cssVar})` }}
                />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {swatch.token}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground sm:px-10">
        <span suppressHydrationWarning>© {new Date().getFullYear()}</span> Spar.
        A strong technical base for agentic development.
      </footer>
    </div>
  );
}
