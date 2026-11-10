"use client";

import { CalendarIcon, XIcon } from "~/components/icons";
import { DEFAULT_DATE_RANGE_FORMAT, formatDateRange } from "~/utils/date";
import { useId, useState } from "react";

import { Calendar } from "~/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { DateRangePickerProps } from "./types";
import { PopoverCore } from "~/components/ui/popover";
import { cn } from "~/utils/cn";
import { dateRangePickerTriggerVariants } from "./constants";

function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  disabled = false,
  open,
  onOpenChange,
  dateFormat = DEFAULT_DATE_RANGE_FORMAT,
  defaultMonth,
  numberOfMonths = 2,
  captionLayout = "label",
  className,
  contentClassName,
  side,
  align,
  "aria-invalid": ariaInvalid,
  "data-testid": dataTestId,
}: DateRangePickerProps) {
  const contentId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState<
    DateRange | undefined
  >(defaultValue);
  // Decided once at mount: whether `value` is undefined on a later render
  // (e.g. after clearing) must not flip the component back to uncontrolled,
  // or it would fall back to stale internal state instead of staying blank.
  const [isValueControlled] = useState(() => value !== undefined);
  const selectedRange = isValueControlled ? value : uncontrolledValue;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [isOpenControlled] = useState(() => open !== undefined);
  const internalOpen = isOpenControlled ? open : uncontrolledOpen;

  function handleOpenChange(next: boolean) {
    if (!isOpenControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  function handleSelect(range: DateRange | undefined) {
    if (!isValueControlled) setUncontrolledValue(range);
    onValueChange?.(range);
    if (range?.from && range?.to) handleOpenChange(false);
  }

  const label = formatDateRange(selectedRange, dateFormat);
  const showClear = !disabled && label !== undefined;

  return (
    <PopoverCore open={internalOpen} onOpenChange={handleOpenChange}>
      <div className="relative inline-flex">
        <PopoverCore.Trigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={internalOpen}
            aria-controls={contentId}
            disabled={disabled}
            data-empty={!label}
            data-slot="date-range-picker-trigger"
            aria-invalid={ariaInvalid}
            data-testid={dataTestId}
            className={cn(
              dateRangePickerTriggerVariants({
                disabled,
                clearable: showClear,
              }),
              className,
            )}
          >
            <CalendarIcon className="size-4 shrink-0" />
            {label ?? <span>{placeholder}</span>}
          </button>
        </PopoverCore.Trigger>
        {showClear ? (
          <button
            type="button"
            aria-label="Clear date range"
            onClick={() => handleSelect(undefined)}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <XIcon className="size-4" />
          </button>
        ) : null}
      </div>
      <PopoverCore.Content
        id={contentId}
        side={side}
        align={align}
        className={cn("w-auto p-0", contentClassName)}
      >
        <Calendar
          mode="range"
          min={1}
          resetOnSelect
          selected={selectedRange}
          onSelect={handleSelect}
          defaultMonth={defaultMonth ?? selectedRange?.from}
          numberOfMonths={numberOfMonths}
          captionLayout={captionLayout}
        />
      </PopoverCore.Content>
    </PopoverCore>
  );
}

export default DateRangePicker;
