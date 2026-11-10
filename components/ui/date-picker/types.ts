import type { CalendarProps } from "~/components/ui/calendar";
import type { PopoverProps } from "~/components/ui/popover";

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  dateFormat?: string;
  defaultMonth?: Date;
  captionLayout?: CalendarProps["captionLayout"];
  className?: string;
  contentClassName?: string;
  side?: PopoverProps["side"];
  align?: PopoverProps["align"];
  "aria-invalid"?: boolean;
  "data-testid"?: string;
}
