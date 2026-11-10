"use client";

import { SelectOption, SelectOptionGroup, SelectProps } from "./types";

import SelectCore from "./select-core";
import { cn } from "~/utils/cn";
import { selectTriggerVariants } from "./constants";
import { useState } from "react";

function isGroupedOptions(
  options: SelectOption[] | SelectOptionGroup[],
): options is SelectOptionGroup[] {
  return options.length > 0 && "options" in options[0];
}

function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  disabled = false,
  name,
  open,
  onOpenChange,
  className,
  contentClassName,
  "aria-invalid": ariaInvalid,
  "data-testid": dataTestId,
}: SelectProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpenControlled = open !== undefined;
  const internalOpen = isOpenControlled ? open : uncontrolledOpen;

  function handleOpenChange(next: boolean) {
    if (!isOpenControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? "",
  );
  const isValueControlled = value !== undefined;
  const internalValue = isValueControlled ? value : uncontrolledValue;

  function handleValueChange(next: string) {
    if (!isValueControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  }

  const groups: SelectOptionGroup[] = isGroupedOptions(options)
    ? options
    : [{ label: "", options }];

  return (
    <SelectCore
      value={internalValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      name={name}
      open={internalOpen}
      onOpenChange={handleOpenChange}
    >
      <SelectCore.Trigger
        className={cn(selectTriggerVariants({ disabled }), className)}
        aria-invalid={ariaInvalid}
        data-testid={dataTestId}
      >
        <SelectCore.Value placeholder={placeholder} />
        <SelectCore.Icon />
      </SelectCore.Trigger>
      <SelectCore.Content className={contentClassName}>
        {groups.map((group, index) => (
          <div key={group.label || "default"}>
            {index > 0 && group.label ? <SelectCore.Separator /> : null}
            <SelectCore.Group>
              {group.label ? (
                <SelectCore.Label>{group.label}</SelectCore.Label>
              ) : null}
              {group.options.map((option) => (
                <SelectCore.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectCore.Item>
              ))}
            </SelectCore.Group>
          </div>
        ))}
      </SelectCore.Content>
    </SelectCore>
  );
}

export default Select;
