import type { ComponentProps } from "react";
import type { DayPicker } from "react-day-picker";
import type { ButtonProps } from "~/components/ui/button";

export type CalendarProps = ComponentProps<typeof DayPicker> & {
  buttonVariant?: ButtonProps["variant"];
};
