import type { ComponentPropsWithRef } from "react";
import type * as SelectPrimitive from "@radix-ui/react-select";

export type SelectCoreProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Root
>;

export type SelectCoreTriggerProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Trigger
>;

export type SelectCoreIconProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Icon
>;

export type SelectCoreValueProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Value
>;

export type SelectCoreContentProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Content
>;

export type SelectCoreGroupProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Group
>;

export type SelectCoreLabelProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Label
>;

export type SelectCoreItemProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Item
>;

export type SelectCoreSeparatorProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Separator
>;

export type SelectCoreScrollUpButtonProps = ComponentPropsWithRef<
  typeof SelectPrimitive.ScrollUpButton
>;

export type SelectCoreScrollDownButtonProps = ComponentPropsWithRef<
  typeof SelectPrimitive.ScrollDownButton
>;
