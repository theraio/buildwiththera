import { Calendar } from "lucide-react";
import { IconProps } from "./icon-props";

function CalendarIcon({
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <Calendar
      aria-hidden={ariaHidden ?? !ariaLabel}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export default CalendarIcon;
