import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";
import type { DateRange } from "react-day-picker";
import { DATE_FORMATS } from "~/utils/date";
import DateRangePicker from "./date-range-picker";

function DateRangePickerDemo() {
  const [value, setValue] = useState<DateRange | undefined>(undefined);

  return <DateRangePicker value={value} onValueChange={setValue} />;
}

function DateRangePickerWithDropdownNavDemo() {
  const [value, setValue] = useState<DateRange | undefined>(undefined);

  return (
    <DateRangePicker
      value={value}
      onValueChange={setValue}
      captionLayout="dropdown"
    />
  );
}

function DateRangePickerWithSelectionDemo() {
  const [value, setValue] = useState<DateRange | undefined>({
    from: new Date(2026, 5, 10),
    to: new Date(2026, 5, 20),
  });

  return <DateRangePicker value={value} onValueChange={setValue} />;
}

const meta = {
  title: "UI/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'A date-range picker composed from `Popover` and `Calendar` in `mode="range"`, matching shadcn\'s range-picker pattern. Two clicks select a range (the first sets the start, the second completes it and closes the calendar). Clicking a date while a complete range is already selected starts a brand new range (via `resetOnSelect`) rather than adjusting the existing one. Formats the selected range with `date-fns` — pass a raw pattern or one of the `DATE_FORMATS` presets from `~/utils/date` via `dateFormat`. Supports both controlled (`value`/`onValueChange`) and uncontrolled (`defaultValue`) usage. Shows a clear (×) button once a range is selected.',
      },
    },
  },
  args: {
    onValueChange: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DateRangePickerDemo />,
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: {
      from: new Date(2026, 5, 10),
      to: new Date(2026, 5, 20),
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { "aria-invalid": true },
};

/** `captionLayout="dropdown"` lets people jump to a far-off month or year via `<select>`s instead of clicking prev/next repeatedly. */
export const WithDropdownNav: Story = {
  render: () => <DateRangePickerWithDropdownNavDemo />,
};

/** `dateFormat` accepts any `date-fns` pattern, including the named `DATE_FORMATS` presets. */
export const WithCustomFormat: Story = {
  args: {
    defaultValue: {
      from: new Date(2026, 5, 10),
      to: new Date(2026, 5, 20),
    },
    dateFormat: DATE_FORMATS.SHORT,
  },
};

/** Interaction test: opening the trigger reveals a two-month calendar. */
export const OpensOnClick: Story = {
  render: () => <DateRangePickerDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));

    await expect(screen.getAllByRole("grid")).toHaveLength(2);
  },
};

/** Interaction test: the first click sets the range start and keeps the calendar open; the second click completes the range and closes it. */
export const SelectingARangeClosesTheCalendar: Story = {
  render: () => <DateRangePickerDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));
    await userEvent.click(
      screen
        .getAllByRole("gridcell", { name: "10" })[0]
        .querySelector("button")!,
    );

    await expect(screen.getAllByRole("grid")).toHaveLength(2);

    await userEvent.click(
      screen
        .getAllByRole("gridcell", { name: "20" })[0]
        .querySelector("button")!,
    );

    await expect(canvas.getByRole("combobox")).not.toHaveTextContent(
      "Pick a date range",
    );
    // Radix Popover keeps the (two-month) content mounted while its exit
    // animation plays, so wait rather than asserting immediately.
    await waitFor(() =>
      expect(screen.queryByRole("grid")).not.toBeInTheDocument(),
    );
  },
};

/** Interaction test: with a complete range already selected, clicking a date inside it starts a fresh range instead of just moving an endpoint. */
export const RepickingAfterACompleteRange: Story = {
  render: () => <DateRangePickerWithSelectionDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));
    await userEvent.click(screen.getAllByRole("button", { name: /15th/ })[0]);

    // Still mid-selection: the calendar stays open and only one endpoint is set.
    await expect(screen.getAllByRole("grid")).toHaveLength(2);

    await userEvent.click(screen.getAllByRole("button", { name: /25th/ })[0]);

    await expect(canvas.getByRole("combobox")).toHaveTextContent(
      "Jun 15, 2026 - Jun 25, 2026",
    );
  },
};

/** Interaction test: clicking the clear button resets the trigger to its placeholder. */
export const ClearingTheSelection: Story = {
  render: () => <DateRangePickerWithSelectionDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("button", { name: /clear date range/i }),
    );

    await expect(canvas.getByRole("combobox")).toHaveTextContent(
      "Pick a date range",
    );
  },
};
