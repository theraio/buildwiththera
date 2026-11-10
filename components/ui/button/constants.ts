import { cva } from "class-variance-authority";

// Values track DESIGN.md's confirmed `button-primary` spec (rounded.md,
// px-8 py-3 default / h-12 text-base lg). `sm` and `icon` aren't confirmed
// there yet, so they're extrapolated from the same 4px spacing unit.
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2", // layout & alignment
    "whitespace-nowrap text-sm font-medium", // text
    "rounded-md", // shape
    "transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(.2,.8,.2,1)]", // motion
    "motion-safe:hover:-translate-y-px motion-safe:active:translate-y-px motion-safe:active:scale-[.985] motion-safe:active:duration-[90ms]", // hover step, press
    "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary", // focus state
    "disabled:pointer-events-none disabled:opacity-50", // disabled state
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // icon children
    "cursor-auto hover:cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/86",
        destructive:
          "bg-destructive/90 text-destructive-foreground hover:bg-destructive",
        outline:
          "border border-foreground/30 bg-transparent text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "bg-transparent text-primary hover:bg-primary/10",
        link: "h-auto bg-transparent p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-8 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
      },
    },
    compoundVariants: [
      // `link` stays `h-auto` — it hugs the text like an inline link rather
      // than taking on a fixed button height, regardless of `size`.
      { variant: "link", class: "h-auto" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);
