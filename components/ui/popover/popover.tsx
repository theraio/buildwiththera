"use client";

import { useState } from "react";
import PopoverCore from "./popover-core";
import { PopoverProps } from "./types";

function Popover({
  trigger,
  children,
  open,
  onOpenChange,
  modal,
  className,
  contentClassName,
  contentId,
  side,
  align,
  sideOffset,
  "data-testid": dataTestId,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpenControlled = open !== undefined;
  const internalOpen = isOpenControlled ? open : uncontrolledOpen;

  function handleOpenChange(next: boolean) {
    if (!isOpenControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  return (
    <PopoverCore
      open={internalOpen}
      onOpenChange={handleOpenChange}
      modal={modal}
    >
      <PopoverCore.Trigger
        asChild
        className={className}
        data-testid={dataTestId}
      >
        {trigger}
      </PopoverCore.Trigger>
      <PopoverCore.Content
        id={contentId}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={contentClassName}
      >
        {children}
      </PopoverCore.Content>
    </PopoverCore>
  );
}

export default Popover;
