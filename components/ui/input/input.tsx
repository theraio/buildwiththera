import { InputProps } from "./types";
import { cn } from "~/utils/cn";
import { inputVariants } from "./constants";

function Input({
  className,
  type,
  size,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  return (
    <div
      data-slot="input-wrapper"
      className={cn(inputVariants({ size, className }))}
    >
      {leftIcon && (
        <span className="flex shrink-0 items-center text-foreground [&>svg:not([class*='size-'])]:size-4">
          {leftIcon}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "min-w-0 flex-1 bg-transparent placeholder:text-foreground outline-none", // layout & text
          "[&[type=file]]:text-foreground", // file input: "no file chosen" label reads like a placeholder
          "file:mr-2 file:cursor-pointer file:rounded-sm file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-sm file:font-medium file:text-foreground", // file input: choose-file button
          "disabled:cursor-not-allowed", // disabled state
        )}
        {...props}
      />
      {rightIcon && (
        <span className="flex shrink-0 items-center text-foreground [&>svg:not([class*='size-'])]:size-4">
          {rightIcon}
        </span>
      )}
    </div>
  );
}

export default Input;
