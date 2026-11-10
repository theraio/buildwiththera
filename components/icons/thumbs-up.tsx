import { ThumbsUp } from "lucide-react";
import { IconProps } from "./icon-props";

function ThumbsUpIcon({
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <ThumbsUp
      aria-hidden={ariaHidden ?? !ariaLabel}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export default ThumbsUpIcon;
