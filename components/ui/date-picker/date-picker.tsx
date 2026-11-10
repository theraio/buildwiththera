"use client";

import { CalendarIcon, XIcon } from "~/components/icons";
import { DEFAULT_DATE_FORMAT, formatDate } from "~/utils/date";
import { useId, useState } from "react";

import { Calendar } from "~/components/ui/calendar";
import { DatePickerProps } from "./types";
import { PopoverCore } from "~/components/ui/popover";
import { cn } from "~/utils/cn";
import { datePickerTriggerVariants } from "./constants";

function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  disabled = false,
  open,
  onOpenChange,
  dateFormat = DEFAULT_DATE_FORMAT,
  defaultMonth,
  captionLayout = "label",
  className,
  contentClassName,
  side,
  align,
  "aria-invalid": ariaInvalid,
  "data-testid": dataTestId,
}: DatePickerProps) {
  const contentId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState<Date | undefined>(
    defaultValue,
  );
  // Decided once at mount: whether `value` is undefined on a later render
  // (e.g. after clearing) must not flip the component back to uncontrolled,
  // or it would fall back to stale internal state instead of staying blank.
  const [isValueControlled] = useState(() => value !== undefined);
  const selectedDate = isValueControlled ? value : uncontrolledValue;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [isOpenControlled] = useState(() => open !== undefined);
  const internalOpen = isOpenControlled ? open : uncontrolledOpen;

  function handleOpenChange(next: boolean) {
    if (!isOpenControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  function handleSelect(date: Date | undefined) {
    if (!isValueControlled) setUncontrolledValue(date);
    onValueChange?.(date);
    handleOpenChange(false);
  }

  const showClear = !disabled && selectedDate !== undefined;

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
            data-empty={!selectedDate}
            data-slot="date-picker-trigger"
            aria-invalid={ariaInvalid}
            data-testid={dataTestId}
            className={cn(
              datePickerTriggerVariants({ disabled, clearable: showClear }),
              className,
            )}
          >
            <CalendarIcon className="size-4 shrink-0" />
            {selectedDate ? (
              formatDate(selectedDate, dateFormat)
            ) : (
              <span>{placeholder}</span>
            )}
          </button>
        </PopoverCore.Trigger>
        {showClear ? (
          <button
            type="button"
            aria-label="Clear date"
            onClick={() => handleSelect(undefined)}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
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
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          defaultMonth={defaultMonth ?? selectedDate}
          captionLayout={captionLayout}
        />
      </PopoverCore.Content>
    </PopoverCore>
  );
}

export default DatePicker;
