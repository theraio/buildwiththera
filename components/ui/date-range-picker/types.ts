import type { CalendarProps, PopoverProps } from "~/components/ui";

import type { DateRange } from "react-day-picker";

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  dateFormat?: string;
  defaultMonth?: Date;
  numberOfMonths?: number;
  captionLayout?: CalendarProps["captionLayout"];
  className?: string;
  contentClassName?: string;
  side?: PopoverProps["side"];
  align?: PopoverProps["align"];
  "aria-invalid"?: boolean;
  "data-testid"?: string;
}
