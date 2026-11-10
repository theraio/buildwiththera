"use client";

import RadioGroupCore from "./radio-group-core";
import { RadioGroupProps } from "./types";
import { cn } from "~/utils/cn";

function RadioGroup({
  items,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  name,
  orientation = "vertical",
  className,
  itemClassName,
  "data-testid": dataTestId,
}: RadioGroupProps) {
  return (
    <RadioGroupCore
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      orientation={orientation}
      className={cn(
        "flex gap-3",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
      data-testid={dataTestId}
    >
      {items.map((item) => {
        const itemId = `${name ?? "radio-group"}-${item.value}`;
        const descriptionId = item.description
          ? `${itemId}-description`
          : undefined;
        const isItemDisabled = disabled || item.disabled;

        return (
          <div
            key={item.value}
            data-slot="radio-group-option"
            className={cn("flex items-start gap-2", itemClassName)}
          >
            <RadioGroupCore.Item
              id={itemId}
              value={item.value}
              disabled={isItemDisabled}
              aria-describedby={descriptionId}
              className="mt-0.5"
            />
            <div className="flex flex-col gap-0.5">
              <label
                htmlFor={itemId}
                className={cn(
                  "text-sm font-medium text-foreground",
                  isItemDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer",
                )}
              >
                {item.label}
              </label>
              {item.description ? (
                <p
                  id={descriptionId}
                  className="text-xs font-normal text-foreground"
                >
                  {item.description}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </RadioGroupCore>
  );
}

export default RadioGroup;
