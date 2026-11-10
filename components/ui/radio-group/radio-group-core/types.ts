import type { ComponentPropsWithRef } from "react";
import type * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export type RadioGroupCoreProps = ComponentPropsWithRef<
  typeof RadioGroupPrimitive.Root
>;

export type RadioGroupCoreItemProps = ComponentPropsWithRef<
  typeof RadioGroupPrimitive.Item
>;
