import { ButtonProps } from "./types";
import { Slot } from "@radix-ui/react-slot";
import { buttonVariants } from "./constants";
import { cn } from "~/utils/cn";

function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export default Button;
