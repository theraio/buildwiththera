"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import {
  SheetCoreCloseProps,
  SheetCoreContentProps,
  SheetCoreDescriptionProps,
  SheetCoreProps,
  SheetCoreTitleProps,
} from "./types";
import { useEffect, useState } from "react";

import { EXIT_TRANSITION_DURATION_MS } from "./constants";
import { cn } from "~/utils/cn";
import { createNamespaceComponent } from "~/utils/create-namespace-component";

function SheetCore({ children, ...props }: SheetCoreProps) {
  return (
    <DialogPrimitive.Root data-slot="sheet" {...props}>
      {children}
    </DialogPrimitive.Root>
  );
}

// Radix's Presence only auto-delays unmount for CSS @keyframes (it reads
// `animationName`), not plain `transition`s like the ones below — without
// `forceMount` + the EXIT_TRANSITION_DURATION_MS delay, Content/Overlay would
// vanish the instant `open` goes false, before the exit transition ever
// paints a frame.
function SheetCoreContent({
  className,
  children,
  open,
  ...props
}: SheetCoreContentProps) {
  // Radix's Root always renders this component — only Overlay/Content's own
  // internal Presence toggles their DOM output — so this component never
  // remounts between opens. Driving `isVisible` off the `open` prop (instead
  // of a mount-only effect) is what makes the transition replay every time,
  // not just the first.
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(!!open);
  const [renderedOpen, setRenderedOpen] = useState(open);

  if (open !== renderedOpen) {
    setRenderedOpen(open);
    if (open) {
      setShouldRender(true);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (open || !shouldRender) return;
    const timeout = setTimeout(
      () => setShouldRender(false),
      EXIT_TRANSITION_DURATION_MS,
    );
    return () => clearTimeout(timeout);
  }, [open, shouldRender]);

  if (!shouldRender) return null;

  return (
    <DialogPrimitive.Portal forceMount>
      <DialogPrimitive.Overlay
        forceMount
        data-slot="sheet-overlay"
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ease-out",
          isVisible ? "opacity-100" : "opacity-0",
        )}
      />
      <DialogPrimitive.Content
        forceMount
        data-slot="sheet-content"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col gap-4 border-l border-border bg-card p-6 shadow-xl outline-none transition-[transform,max-width] duration-300 ease-out",
          isVisible ? "translate-x-0" : "translate-x-full",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function SheetCoreTitle({ className, ...props }: SheetCoreTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn(className)}
      {...props}
    />
  );
}

function SheetCoreDescription({
  className,
  ...props
}: SheetCoreDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn(className)}
      {...props}
    />
  );
}

function SheetCoreClose({ className, ...props }: SheetCoreCloseProps) {
  return (
    <DialogPrimitive.Close
      data-slot="sheet-close"
      className={cn(className)}
      {...props}
    />
  );
}

export default createNamespaceComponent(SheetCore, {
  Content: SheetCoreContent,
  Title: SheetCoreTitle,
  Description: SheetCoreDescription,
  Close: SheetCoreClose,
});
