"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { RadioGroupCoreItemProps, RadioGroupCoreProps } from "./types";

import { CircleIcon } from "~/components/icons";
import { cn } from "~/utils/cn";
import { createNamespaceComponent } from "~/utils/create-namespace-component";

function RadioGroupCore({ className, ...props }: RadioGroupCoreProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(className)}
      {...props}
    />
  );
}

function RadioGroupCoreItem({ className, ...props }: RadioGroupCoreItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "size-4 shrink-0 rounded-full border border-input bg-transparent transition-colors", // layout & shape
        "hover:border-primary", // hover state
        "data-[state=checked]:border-primary", // checked state
        "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", // focus state
        "disabled:cursor-not-allowed disabled:opacity-50", // disabled state
        "aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive", // invalid state
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <CircleIcon className="size-2 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export default createNamespaceComponent(RadioGroupCore, {
  Item: RadioGroupCoreItem,
});
