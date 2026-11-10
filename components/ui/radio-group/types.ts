import type { ReactNode } from "react";

export interface RadioGroupItem {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  items: RadioGroupItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  itemClassName?: string;
  "data-testid"?: string;
}
