import { BadgeProps } from "./types";
import { Slot } from "@radix-ui/react-slot";
import { badgeVariants } from "./constants";
import { cn } from "~/utils/cn";

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export default Badge;
