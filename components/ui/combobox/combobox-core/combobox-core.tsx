"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";

import {
  ComboboxCoreCommandProps,
  ComboboxCoreContentProps,
  ComboboxCoreEmptyProps,
  ComboboxCoreGroupProps,
  ComboboxCoreInputProps,
  ComboboxCoreItemIndicatorProps,
  ComboboxCoreItemProps,
  ComboboxCoreLabelProps,
  ComboboxCoreListProps,
  ComboboxCoreProps,
  ComboboxCoreSeparatorProps,
  ComboboxCoreTriggerProps,
} from "./types";

import { CheckIcon } from "~/components/icons";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "~/utils/cn";
import { createNamespaceComponent } from "~/utils/create-namespace-component";

function ComboboxCore({ children, ...props }: ComboboxCoreProps) {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
}

function ComboboxCoreTrigger({
  className,
  children,
  ...props
}: ComboboxCoreTriggerProps) {
  return (
    <PopoverPrimitive.Trigger className={cn(className)} {...props}>
      {children}
    </PopoverPrimitive.Trigger>
  );
}

function ComboboxCoreContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: ComboboxCoreContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-(--radix-popover-trigger-width) overflow-hidden rounded-xl border border-border bg-card shadow-xl outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function ComboboxCoreCommand({
  className,
  ...props
}: ComboboxCoreCommandProps) {
  return (
    <CommandPrimitive
      className={cn("flex w-full flex-col overflow-hidden", className)}
      {...props}
    />
  );
}

function ComboboxCoreInput({ className, ...props }: ComboboxCoreInputProps) {
  return (
    <CommandPrimitive.Input
      className={cn(
        "flex h-11 w-full border-b border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxCoreList({ className, ...props }: ComboboxCoreListProps) {
  return (
    <CommandPrimitive.List
      className={cn(
        "max-h-64 overflow-x-hidden overflow-y-auto p-1",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxCoreEmpty({ className, ...props }: ComboboxCoreEmptyProps) {
  return (
    <CommandPrimitive.Empty
      className={cn("py-6 text-center text-sm text-foreground", className)}
      {...props}
    />
  );
}

function ComboboxCoreGroup({ className, ...props }: ComboboxCoreGroupProps) {
  return (
    <CommandPrimitive.Group
      className={cn("overflow-hidden p-1 text-foreground", className)}
      {...props}
    />
  );
}

function ComboboxCoreLabel({ className, ...props }: ComboboxCoreLabelProps) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxCoreItem({ className, ...props }: ComboboxCoreItemProps) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none select-none",
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

// cmdk's own `data-selected`/`aria-selected` track its keyboard/pointer
// highlight (see ComboboxCoreItem above) and are overwritten internally on
// every render, so they can't double as "this is the chosen value" — the
// smart `Combobox` component uses `data-checked` on the item for that instead.
function ComboboxCoreItemIndicator({
  className,
  ...props
}: ComboboxCoreItemIndicatorProps) {
  return (
    <CheckIcon
      className={cn("h-4 w-4 shrink-0 text-primary", className)}
      {...props}
    />
  );
}

function ComboboxCoreSeparator({
  className,
  ...props
}: ComboboxCoreSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export default createNamespaceComponent(ComboboxCore, {
  Trigger: ComboboxCoreTrigger,
  Content: ComboboxCoreContent,
  Command: ComboboxCoreCommand,
  Input: ComboboxCoreInput,
  List: ComboboxCoreList,
  Empty: ComboboxCoreEmpty,
  Group: ComboboxCoreGroup,
  Label: ComboboxCoreLabel,
  Item: ComboboxCoreItem,
  ItemIndicator: ComboboxCoreItemIndicator,
  Separator: ComboboxCoreSeparator,
});
