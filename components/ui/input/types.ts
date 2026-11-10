import type { ComponentPropsWithRef, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { inputVariants } from "./constants";

export interface InputProps
  // The native `size` HTML attribute (visible width in characters) is
  // shadowed by the `size` height variant below, matching `ButtonProps`.
  extends
    Omit<ComponentPropsWithRef<"input">, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
