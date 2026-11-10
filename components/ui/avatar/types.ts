import type { ComponentPropsWithRef, ReactNode } from "react";

import type { AvatarCoreImageProps } from "./avatar-core";
import type { VariantProps } from "class-variance-authority";
import { avatarVariants } from "./constants";

export interface AvatarProps
  extends
    Omit<ComponentPropsWithRef<"span">, "children">,
    VariantProps<typeof avatarVariants> {
  /** Image source. Omit to always show `fallback`. */
  src?: AvatarCoreImageProps["src"];
  alt?: string;
  /** Shown while the image is loading/missing/broken — e.g. initials. */
  fallback: ReactNode;
  /** Extra classes for the fallback itself, e.g. a per-identity fill color. */
  fallbackClassName?: string;
}
