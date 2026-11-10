import type { ComponentPropsWithRef } from "react";
import type * as TooltipPrimitive from "@radix-ui/react-tooltip";

export type TooltipCoreProviderProps = ComponentPropsWithRef<
  typeof TooltipPrimitive.Provider
>;

export type TooltipCoreProps = ComponentPropsWithRef<
  typeof TooltipPrimitive.Root
>;

export type TooltipCoreTriggerProps = ComponentPropsWithRef<
  typeof TooltipPrimitive.Trigger
>;

export type TooltipCoreContentProps = ComponentPropsWithRef<
  typeof TooltipPrimitive.Content
>;
