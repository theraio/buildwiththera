import { VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { badgeVariants } from "./constants";

export interface BadgeProps
  extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}
