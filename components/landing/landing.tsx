import { Closing } from "./closing";
import { Faq } from "./faq";
// Imported from its own folder: the widget barrel also exports the eager scene, which would pull three.js into the first bundle.
import { LazyGrowthScene } from "~/components/widgets/growth-scene/lazy-growth-scene";
import { GrowthStory } from "./growth-story";
import { LANDING_COPY, LOADER_SEEN_KEY } from "./constants";
import { LandingHeader } from "./landing-header";
import { LandingProps } from "./types";
import { LoadingScreen } from "./loading-screen";
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
      {/* Runs before the loading screen is parsed, so a repeat visit never sees it. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem(${JSON.stringify(LOADER_SEEN_KEY)})!==null)document.documentElement.dataset.loaderSeen=""}catch(e){}`,
        }}
      />
      <LoadingScreen label={copy.loading} />
      {/* Roots grow through the whole page, behind every section. */}
      {/* Dimmer on small screens, where the copy runs across the whole width. */}
      <LazyGrowthScene className="pointer-events-none fixed inset-0 -z-10 max-lg:opacity-60" />
      <LandingHeader copy={copy.nav} />
      <main id="main" className="w-full flex-1">
        <GrowthStory hero={copy.hero} seasons={copy.seasons} />
        <ServicesShowcase copy={copy.services} />
        <Principles copy={copy.principles} />
        <Faq copy={copy.faq} />
        <Closing
          copy={copy.contact}
          services={copy.services.items}
          locale={locale}
        />
      </main>
    </div>
  );
}

export default Landing;
