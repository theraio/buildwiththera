import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";
import type * as PopoverPrimitive from "@radix-ui/react-popover";
import type { Command as CommandPrimitive } from "cmdk";
import type { IconProps } from "~/components/icons";

export type ComboboxCoreProps = ComponentPropsWithRef<
  typeof PopoverPrimitive.Root
>;

export type ComboboxCoreTriggerProps = ComponentPropsWithRef<
  typeof PopoverPrimitive.Trigger
>;

export type ComboboxCoreContentProps = ComponentPropsWithRef<
  typeof PopoverPrimitive.Content
>;

export type ComboboxCoreCommandProps = ComponentPropsWithRef<
  typeof CommandPrimitive
>;

export type ComboboxCoreInputProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Input
>;

export type ComboboxCoreListProps = ComponentPropsWithRef<
  typeof CommandPrimitive.List
>;

export type ComboboxCoreEmptyProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Empty
>;

export type ComboboxCoreGroupProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Group
>;

export type ComboboxCoreLabelProps = ComponentPropsWithoutRef<"div">;

export type ComboboxCoreItemProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Item
>;

export type ComboboxCoreItemIndicatorProps = IconProps;

export type ComboboxCoreSeparatorProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Separator
>;
