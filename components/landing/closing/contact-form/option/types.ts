export interface OptionProps {
  /** Number or letter shown before the label. */
  marker: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}
