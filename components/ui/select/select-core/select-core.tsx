"use client";

import * as SelectPrimitive from "@radix-ui/react-select";

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "~/components/icons";
import {
  SelectCoreContentProps,
  SelectCoreGroupProps,
  SelectCoreIconProps,
  SelectCoreItemProps,
  SelectCoreLabelProps,
  SelectCoreProps,
  SelectCoreScrollDownButtonProps,
  SelectCoreScrollUpButtonProps,
  SelectCoreSeparatorProps,
  SelectCoreTriggerProps,
  SelectCoreValueProps,
} from "./types";

import { cn } from "~/utils/cn";
import { createNamespaceComponent } from "~/utils/create-namespace-component";

function SelectCore(props: SelectCoreProps) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectCoreTrigger({ className, ...props }: SelectCoreTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function SelectCoreIcon({
  className,
  children,
  ...props
}: SelectCoreIconProps) {
  return (
    <SelectPrimitive.Icon
      data-slot="select-icon"
      className={cn("shrink-0 text-foreground", className)}
      {...props}
    >
      {children ?? <ChevronDownIcon className="size-4" />}
    </SelectPrimitive.Icon>
  );
}

function SelectCoreValue({ className, ...props }: SelectCoreValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("line-clamp-1", className)}
      {...props}
    />
  );
}

function SelectCoreContent({
  className,
  align = "start",
  sideOffset = 4,
  position = "popper",
  children,
  ...props
}: SelectCoreContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        position={position}
        className={cn(
          "z-50 max-h-(--radix-select-content-available-height) overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-card shadow-xl outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          position === "popper" && "w-(--radix-select-trigger-width)",
          className,
        )}
        {...props}
      >
        <SelectCoreScrollUpButton />
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
        <SelectCoreScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectCoreGroup({ className, ...props }: SelectCoreGroupProps) {
  return (
    <SelectPrimitive.Group
      className={cn("overflow-hidden p-1 text-foreground", className)}
      {...props}
    />
  );
}

function SelectCoreLabel({ className, ...props }: SelectCoreLabelProps) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function SelectCoreItem({
  className,
  children,
  ...props
}: SelectCoreItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm text-foreground outline-none select-none",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-primary" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

function SelectCoreSeparator({
  className,
  ...props
}: SelectCoreSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function SelectCoreScrollUpButton({
  className,
  ...props
}: SelectCoreScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectCoreScrollDownButton({
  className,
  ...props
}: SelectCoreScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export default createNamespaceComponent(SelectCore, {
  Trigger: SelectCoreTrigger,
  Icon: SelectCoreIcon,
  Value: SelectCoreValue,
  Content: SelectCoreContent,
  Group: SelectCoreGroup,
  Label: SelectCoreLabel,
  Item: SelectCoreItem,
  Separator: SelectCoreSeparator,
  ScrollUpButton: SelectCoreScrollUpButton,
  ScrollDownButton: SelectCoreScrollDownButton,
});
