import type { ReactElement, ReactNode } from "react";

import type { PopoverCoreContentProps } from "./popover-core";

export interface PopoverProps {
  trigger: ReactElement;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  className?: string;
  contentClassName?: string;
  contentId?: string;
  side?: PopoverCoreContentProps["side"];
  align?: PopoverCoreContentProps["align"];
  sideOffset?: number;
  "data-testid"?: string;
}
