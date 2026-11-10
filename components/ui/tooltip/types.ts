import type { ReactNode } from "react";
import type { TooltipCoreContentProps } from "./tooltip-core";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  className?: string;
  contentClassName?: string;
  side?: TooltipCoreContentProps["side"];
  align?: TooltipCoreContentProps["align"];
  sideOffset?: number;
  "data-testid"?: string;
}
