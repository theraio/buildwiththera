import { Moon } from "lucide-react";
import { IconProps } from "./icon-props";

function MoonIcon({
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  return (
    <Moon
      aria-hidden={ariaHidden ?? !ariaLabel}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export default MoonIcon;
