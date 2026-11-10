"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import {
  TooltipCoreContentProps,
  TooltipCoreProps,
  TooltipCoreProviderProps,
  TooltipCoreTriggerProps,
} from "./types";

import { cn } from "~/utils/cn";
import { createNamespaceComponent } from "~/utils/create-namespace-component";

function TooltipCore({ children, ...props }: TooltipCoreProps) {
  return (
    <TooltipPrimitive.Root data-slot="tooltip" {...props}>
      {children}
    </TooltipPrimitive.Root>
  );
}

function TooltipCoreProvider({
  delayDuration = 0,
  ...props
}: TooltipCoreProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function TooltipCoreTrigger({ className, ...props }: TooltipCoreTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function TooltipCoreContent({
  className,
  sideOffset = 4,
  ...props
}: TooltipCoreContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-fit max-w-xs rounded-xl bg-foreground px-3 py-1.5 text-xs text-background text-balance shadow-xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}

export default createNamespaceComponent(TooltipCore, {
  Provider: TooltipCoreProvider,
  Trigger: TooltipCoreTrigger,
  Content: TooltipCoreContent,
});
