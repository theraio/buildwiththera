import { cva } from "class-variance-authority";

// Avatar sizes aren't confirmed in DESIGN.md yet; extrapolated from
// buttonVariants' `size` height scale (sm: h-9, default: h-10, lg: h-12).
export const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "size-9",
        default: "size-10",
        lg: "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
