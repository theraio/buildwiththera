import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, userEvent, within } from "storybook/test";
import { DATE_FORMATS } from "~/utils/date";
import DatePicker from "./date-picker";

function DatePickerDemo() {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return <DatePicker value={value} onValueChange={setValue} />;
}

function DatePickerWithDropdownNavDemo() {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <DatePicker
      value={value}
      onValueChange={setValue}
      captionLayout="dropdown"
    />
  );
}

const meta = {
  title: "UI/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A single-date picker composed from `Popover` and `Calendar`, matching shadcn's date-picker pattern. Formats the selected date with `date-fns` — pass a raw pattern or one of the `DATE_FORMATS` presets from `~/utils/date` via `dateFormat`. Supports both controlled (`value`/`onValueChange`) and uncontrolled (`defaultValue`) usage. Shows a clear (×) button once a date is selected.",
      },
    },
  },
  args: {
    onValueChange: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DatePickerDemo />,
};

export const WithDefaultValue: Story = {
  args: { defaultValue: new Date(2026, 5, 15) },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { "aria-invalid": true },
};

/** `captionLayout="dropdown"` lets people jump to a far-off month or year via `<select>`s instead of clicking prev/next repeatedly. */
export const WithDropdownNav: Story = {
  render: () => <DatePickerWithDropdownNavDemo />,
};

/** `dateFormat` accepts any `date-fns` pattern, including the named `DATE_FORMATS` presets. */
export const WithCustomFormat: Story = {
  args: {
    defaultValue: new Date(2026, 5, 15),
    dateFormat: DATE_FORMATS.SHORT,
  },
};

/** Interaction test: opening the trigger reveals the calendar. */
export const OpensOnClick: Story = {
  render: () => <DatePickerDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));

    await expect(screen.getByRole("grid")).toBeInTheDocument();
  },
};

/** Interaction test: picking a day closes the calendar and updates the trigger label. */
export const SelectingADateClosesTheCalendar: Story = {
  render: () => <DatePickerDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));
    await userEvent.click(screen.getByRole("button", { name: /15th/ }));

    await expect(canvas.getByRole("combobox")).not.toHaveTextContent(
      "Pick a date",
    );
    await expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  },
};

/** Interaction test: clicking the clear button resets the trigger to its placeholder. */
export const ClearingTheSelection: Story = {
  args: { defaultValue: new Date(2026, 5, 15) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /clear date/i }));

    await expect(canvas.getByRole("combobox")).toHaveTextContent("Pick a date");
  },
};
