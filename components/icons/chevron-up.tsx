import { ChevronUp } from "lucide-react";
import { IconProps } from "./icon-props";

function ChevronUpIcon({
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <ChevronUp
      aria-hidden={ariaHidden ?? !ariaLabel}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export default ChevronUpIcon;
