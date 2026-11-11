import { OPTION_CLASS } from "./constants";
import { OptionProps } from "./types";
import { cn } from "~/utils/cn";

/** One choice row: the same rising band of light as the service rows. */
function Option({ marker, label, selected, onSelect }: OptionProps) {
  return (
    <li className="border-b border-border">
      <button
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
        className={OPTION_CLASS}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
        />
        <span className="w-6 text-sm text-muted-foreground tabular-nums transition-colors duration-500 group-hover:text-background/60 group-focus-visible:text-background/60">
          {marker}
        </span>
        <span
          className={cn(
            "text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] font-semibold tracking-[-0.03em] transition-[translate,color] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-3 group-hover:text-background group-focus-visible:translate-x-3 group-focus-visible:text-background motion-reduce:transition-none",
            !selected && "text-foreground/80",
          )}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className="ml-auto text-muted-foreground transition-colors duration-500 group-hover:text-background group-focus-visible:text-background"
        >
          {selected ? "●" : "↗"}
        </span>
      </button>
    </li>
  );
}

export default Option;
