"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import {
  DialogCoreCloseProps,
  DialogCoreContentProps,
  DialogCoreDescriptionProps,
  DialogCoreProps,
  DialogCoreTitleProps,
} from "./types";

import { cn } from "~/utils/cn";
import { createNamespaceComponent } from "~/utils/create-namespace-component";

function DialogCore({ children, ...props }: DialogCoreProps) {
  return (
    <DialogPrimitive.Root data-slot="dialog" {...props}>
      {children}
    </DialogPrimitive.Root>
  );
}

function DialogCoreContent({
  className,
  children,
  overlay = true,
  ...props
}: DialogCoreContentProps) {
  return (
    <DialogPrimitive.Portal>
      {overlay && (
        <DialogPrimitive.Overlay
          data-slot="dialog-overlay"
          className="fixed inset-0 z-50 bg-black/40 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
      )}
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-xl outline-none",
          "data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DialogCoreTitle({ className, ...props }: DialogCoreTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(className)}
      {...props}
    />
  );
}

function DialogCoreDescription({
  className,
  ...props
}: DialogCoreDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(className)}
      {...props}
    />
  );
}

function DialogCoreClose({ className, ...props }: DialogCoreCloseProps) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={cn(className)}
      {...props}
    />
  );
}

export default createNamespaceComponent(DialogCore, {
  Content: DialogCoreContent,
  Title: DialogCoreTitle,
  Description: DialogCoreDescription,
  Close: DialogCoreClose,
});
