import { ThumbsDown } from "lucide-react";
import { IconProps } from "./icon-props";

function ThumbsDownIcon({
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <ThumbsDown
      aria-hidden={ariaHidden ?? !ariaLabel}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export default ThumbsDownIcon;
