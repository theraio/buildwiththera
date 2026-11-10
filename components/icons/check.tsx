import { Check } from "lucide-react";
import { IconProps } from "./icon-props";

function CheckIcon({
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <Check
      aria-hidden={ariaHidden ?? !ariaLabel}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export default CheckIcon;
