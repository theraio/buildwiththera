import type { ComponentPropsWithRef } from "react";
import type * as PopoverPrimitive from "@radix-ui/react-popover";

export type PopoverCoreProps = ComponentPropsWithRef<
  typeof PopoverPrimitive.Root
>;

export type PopoverCoreTriggerProps = ComponentPropsWithRef<
  typeof PopoverPrimitive.Trigger
>;

export type PopoverCoreAnchorProps = ComponentPropsWithRef<
  typeof PopoverPrimitive.Anchor
>;

export type PopoverCoreContentProps = ComponentPropsWithRef<
  typeof PopoverPrimitive.Content
>;
