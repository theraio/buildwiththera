import { cva } from "class-variance-authority";

export const dateRangePickerTriggerVariants = cva(
  [
    "flex h-11 w-[300px] items-center justify-start gap-2",
    "rounded-md border border-input bg-transparent px-4 py-2.5",
    "text-sm font-normal text-foreground transition-colors",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive",
  ],
  {
    variants: {
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "hover:border-primary",
      },
      clearable: {
        true: "pr-9",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
      clearable: false,
    },
  },
);
