import { Avatar } from "~/components/ui";
import { PORTRAIT_SRC } from "./constants";
import { PrinciplesProps } from "./types";

function Principles({ copy }: PrinciplesProps) {
  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="mx-auto max-w-360 scroll-mt-16 px-4 py-28 sm:px-8 lg:grid lg:min-h-svh lg:grid-cols-12 lg:content-center lg:gap-8 lg:px-14 lg:py-32"
    >
      <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
        <h2
          id="principles-title"
          className="text-[clamp(2.25rem,4.6vw,4.5rem)] leading-none font-semibold tracking-[-0.035em]"
        >
          {copy.title}
        </h2>
        <div className="mt-8 flex items-center gap-4">
          <Avatar
            src={PORTRAIT_SRC}
            alt=""
            fallback="MS"
            fallbackClassName="bg-secondary text-sm font-semibold"
            className="size-14 ring-1 ring-border"
          />
          <p className="flex flex-col gap-1">
            <span className="text-lg font-semibold">{copy.name}</span>
            <span className="text-sm text-muted-foreground">{copy.role}</span>
          </p>
        </div>
        <p className="mt-6 max-w-104 leading-relaxed text-muted-foreground">
          {copy.bio}
        </p>
      </div>
      <div className="mt-16 lg:col-span-8 lg:col-start-5 lg:mt-0">
        <ul className="flex flex-col gap-16 lg:gap-24">
          {copy.items.map((principle) => (
            <li key={principle.title} className="flex flex-col gap-4">
              <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
                {principle.title}
              </h3>
              <p className="max-w-184 text-lg leading-relaxed text-muted-foreground">
                {principle.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-24 max-w-208 text-xl leading-relaxed text-muted-foreground lg:mt-32">
          {copy.origin}
        </p>
      </div>
    </section>
  );
}

export default Principles;
