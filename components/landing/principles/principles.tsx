import { PrinciplesProps } from "./types";

function Principles({ copy }: PrinciplesProps) {
  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="mx-auto max-w-[90rem] scroll-mt-16 px-4 py-28 sm:px-8 lg:grid lg:min-h-svh lg:grid-cols-12 lg:content-center lg:gap-8 lg:px-14 lg:py-32"
    >
      <h2
        id="principles-title"
        className="text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em] lg:sticky lg:top-32 lg:col-span-4 lg:self-start"
      >
        {copy.title}
      </h2>
      <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
        <ul className="flex flex-col gap-16 lg:gap-24">
          {copy.items.map((principle) => (
            <li key={principle.title} className="flex flex-col gap-4">
              <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
                {principle.title}
              </h3>
              <p className="max-w-[34rem] text-lg leading-relaxed text-muted-foreground">
                {principle.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-24 max-w-[40rem] text-xl leading-relaxed text-muted-foreground lg:mt-32">
          {copy.origin}
        </p>
      </div>
    </section>
  );
}

export default Principles;
