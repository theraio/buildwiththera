"use client";

import { ComboboxOption, ComboboxOptionGroup, ComboboxProps } from "./types";

import { ChevronDownIcon } from "~/components/icons";
import ComboboxCore from "./combobox-core";
import { cn } from "~/utils/cn";
import { comboboxTriggerVariants } from "./constants";
import { useState } from "react";

function Combobox(props: ComboboxProps) {
  const {
    options,
    placeholder = "Select an option",
    searchPlaceholder = "Search...",
    emptyMessage = "No results found.",
    disabled = false,
    open,
    onOpenChange,
    className,
    contentClassName,
    side,
    align = "start",
    sideOffset,
    "data-testid": dataTestId,
  } = props;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpenControlled = open !== undefined;
  const internalOpen = isOpenControlled ? open : uncontrolledOpen;

  function handleOpenChange(next: boolean) {
    if (!isOpenControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  function isGroupedOptions(
    options: ComboboxOption[] | ComboboxOptionGroup[],
  ): options is ComboboxOptionGroup[] {
    return options.length > 0 && "options" in options[0];
  }

  const groups: ComboboxOptionGroup[] = isGroupedOptions(options)
    ? options
    : [{ label: "", options }];

  const selectedValues = props.multiple
    ? props.value
    : props.value
      ? [props.value]
      : [];

  function handleSelect(optionValue: string) {
    if (props.multiple) {
      const next = selectedValues.includes(optionValue)
        ? selectedValues.filter((selected) => selected !== optionValue)
        : [...selectedValues, optionValue];
      props.onValueChange(next);
      return;
    }

    props.onValueChange(optionValue === props.value ? null : optionValue);
    handleOpenChange(false);
  }

  const allOptions = groups.flatMap((group) => group.options);
  const displayValue = selectedValues.length
    ? allOptions
        .filter((option) => selectedValues.includes(option.value))
        .map((option) => option.label)
        .join(", ")
    : placeholder;

  return (
    <ComboboxCore open={internalOpen} onOpenChange={handleOpenChange}>
      <ComboboxCore.Trigger
        type="button"
        role="combobox"
        aria-expanded={internalOpen}
        disabled={disabled}
        className={cn(comboboxTriggerVariants({ disabled }), className)}
        data-testid={dataTestId}
      >
        <span className="truncate">{displayValue}</span>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-foreground" />
      </ComboboxCore.Trigger>
      <ComboboxCore.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={contentClassName}
      >
        <ComboboxCore.Command>
          <ComboboxCore.Input placeholder={searchPlaceholder} />
          <ComboboxCore.List>
            <ComboboxCore.Empty>{emptyMessage}</ComboboxCore.Empty>
            {groups.map((group, index) => (
              <div key={group.label || "default"}>
                {index > 0 && group.label ? <ComboboxCore.Separator /> : null}
                <ComboboxCore.Group value={group.label || "default"}>
                  {group.label ? (
                    <ComboboxCore.Label>{group.label}</ComboboxCore.Label>
                  ) : null}
                  {group.options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);

                    return (
                      <ComboboxCore.Item
                        key={option.value}
                        value={option.value}
                        keywords={[option.label]}
                        disabled={option.disabled}
                        data-checked={isSelected}
                        onSelect={handleSelect}
                      >
                        <ComboboxCore.ItemIndicator
                          className={cn(
                            isSelected ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <span className="truncate">{option.label}</span>
                      </ComboboxCore.Item>
                    );
                  })}
                </ComboboxCore.Group>
              </div>
            ))}
          </ComboboxCore.List>
        </ComboboxCore.Command>
      </ComboboxCore.Content>
    </ComboboxCore>
  );
}

export default Combobox;
