import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center gap-1", // layout & alignment
    "whitespace-nowrap text-xs font-medium", // text
    "rounded-full border border-transparent px-2.5 py-0.5", // shape
    "transition-colors", // motion
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", // focus state
    "[&>svg]:pointer-events-none [&>svg]:size-3", // icon children
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground [a&]:hover:bg-primary/70",
        destructive:
          "bg-destructive/90 text-destructive-foreground [a&]:hover:bg-destructive",
        outline:
          "border-foreground/30 bg-transparent text-foreground [a&]:hover:border-primary [a&]:hover:bg-primary/10 [a&]:hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/70",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);
