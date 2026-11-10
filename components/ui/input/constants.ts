import { cva } from "class-variance-authority";

// Heights track buttonVariants' `size` scale (sm: h-9, default: h-10, lg: h-12)
// so an Input and a Button of the matching size line up in the same row.
export const inputVariants = cva(
  [
    "flex w-full items-center gap-2", // layout
    "rounded-md border border-input bg-transparent", // shape
    "text-foreground transition-colors", // text
    "hover:border-primary focus-within:border-primary", // hover & focus state
    "has-[input:disabled]:pointer-events-none has-[input:disabled]:opacity-50", // disabled state
    "has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:focus-within:outline-2 has-[input[aria-invalid=true]]:focus-within:outline-offset-2 has-[input[aria-invalid=true]]:focus-within:outline-destructive", // invalid state
  ],
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-10 px-4 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
