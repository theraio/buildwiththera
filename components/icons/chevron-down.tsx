import { ChevronDown } from "lucide-react";
import { IconProps } from "./icon-props";

function ChevronDownIcon({
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <ChevronDown
      aria-hidden={ariaHidden ?? !ariaLabel}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export default ChevronDownIcon;
