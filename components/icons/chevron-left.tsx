import { ChevronLeft } from "lucide-react";
import { IconProps } from "./icon-props";

function ChevronLeftIcon({
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <ChevronLeft
      aria-hidden={ariaHidden ?? !ariaLabel}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export default ChevronLeftIcon;
