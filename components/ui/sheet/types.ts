import type { ReactNode } from "react";

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  /** Rendered beside the title, before the close button — e.g. an avatar. */
  headerEnd?: ReactNode;
  children: ReactNode;
  className?: string;
  contentId?: string;
  "data-testid"?: string;
}
