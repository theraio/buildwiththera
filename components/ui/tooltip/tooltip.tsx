"use client";

import { useState } from "react";
import TooltipCore from "./tooltip-core";
import { TooltipProps } from "./types";

function Tooltip({
  content,
  children,
  disabled = false,
  open,
  onOpenChange,
  delayDuration,
  className,
  contentClassName,
  side,
  align,
  sideOffset,
  "data-testid": dataTestId,
}: TooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpenControlled = open !== undefined;
  const internalOpen = isOpenControlled ? open : uncontrolledOpen;

  function handleOpenChange(next: boolean) {
    if (!isOpenControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  if (disabled) return children;

  return (
    <TooltipCore.Provider delayDuration={delayDuration}>
      <TooltipCore open={internalOpen} onOpenChange={handleOpenChange}>
        <TooltipCore.Trigger
          asChild
          className={className}
          data-testid={dataTestId}
        >
          {children}
        </TooltipCore.Trigger>
        <TooltipCore.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={contentClassName}
        >
          {content}
        </TooltipCore.Content>
      </TooltipCore>
    </TooltipCore.Provider>
  );
}

export default Tooltip;
