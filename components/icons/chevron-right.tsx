import { ChevronRight } from "lucide-react";
import { IconProps } from "./icon-props";

function ChevronRightIcon({
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <ChevronRight
      aria-hidden={ariaHidden ?? !ariaLabel}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export default ChevronRightIcon;
