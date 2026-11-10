import type { ReactNode } from "react";
import type { ComboboxCoreContentProps } from "./combobox-core";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxOptionGroup {
  label: string;
  options: ComboboxOption[];
}

interface ComboboxSharedProps {
  options: ComboboxOption[] | ComboboxOptionGroup[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: ReactNode;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  side?: ComboboxCoreContentProps["side"];
  align?: ComboboxCoreContentProps["align"];
  sideOffset?: number;
  "data-testid"?: string;
}

interface ComboboxSingleProps extends ComboboxSharedProps {
  multiple?: false;
  value: string | null;
  onValueChange: (value: string | null) => void;
}

interface ComboboxMultipleProps extends ComboboxSharedProps {
  multiple: true;
  value: string[];
  onValueChange: (value: string[]) => void;
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps;
