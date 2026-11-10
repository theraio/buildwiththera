import type { ComponentPropsWithRef } from "react";
import type * as AvatarPrimitive from "@radix-ui/react-avatar";

export type AvatarCoreProps = ComponentPropsWithRef<
  typeof AvatarPrimitive.Root
>;

export type AvatarCoreImageProps = ComponentPropsWithRef<
  typeof AvatarPrimitive.Image
>;

export type AvatarCoreFallbackProps = ComponentPropsWithRef<
  typeof AvatarPrimitive.Fallback
>;
