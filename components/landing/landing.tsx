import { Closing } from "./closing";
import { GrowthScene } from "~/components/widgets/growth-scene";
import { GrowthStory } from "./growth-story";
import { LANDING_COPY } from "./constants";
import { LandingHeader } from "./landing-header";
import { LandingProps } from "./types";
import { Principles } from "./principles";
import { ServicesShowcase } from "./services-showcase";

function Landing({ locale }: LandingProps) {
  const copy = LANDING_COPY[locale];

  return (
    // Always the brand's negative treatment, whatever the visitor's theme.
    <div
      lang={locale}
      data-surface="landing"
      className="dark isolate flex min-h-full flex-1 flex-col bg-background text-foreground"
    >
      {/* Roots grow through the whole page, behind every section. */}
      {/* Dimmer on small screens, where the copy runs across the whole width. */}
      <GrowthScene className="pointer-events-none fixed inset-0 -z-10 max-lg:opacity-60" />
      <LandingHeader copy={copy.nav} />
      <main id="main" className="w-full flex-1">
        <GrowthStory hero={copy.hero} seasons={copy.seasons} />
        <ServicesShowcase copy={copy.services} />
        <Principles copy={copy.principles} />
        <Closing copy={copy.closing} />
      </main>
    </div>
  );
}

export default Landing;
