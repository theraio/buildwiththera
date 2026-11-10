import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import type { DateRange } from "react-day-picker";
import Calendar from "./calendar";

function SingleCalendarDemo() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return <Calendar mode="single" selected={selected} onSelect={setSelected} />;
}

function RangeCalendarDemo() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
    />
  );
}

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A date field component that lets users select a single date, multiple dates, or a date range. Built on `react-day-picker` — navigation, keyboard support, and selection logic come from the primitive itself. Pairs with `Popover` to build a `DatePicker`.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SingleCalendarDemo />,
};

export const Range: Story = {
  render: () => <RangeCalendarDemo />,
};

export const PastDatesDisabled: Story = {
  args: {
    mode: "single",
    disabled: { before: new Date() },
  },
};

/** `captionLayout="dropdown"` swaps the prev/next-only caption for month and year `<select>`s, making it easy to jump far away from the current month (e.g. picking a birth year). */
export const WithDropdownNav: Story = {
  render: () => (
    <Calendar mode="single" selected={undefined} captionLayout="dropdown" />
  ),
};

/** Interaction test: clicking the next-month button advances the caption label. */
export const NavigatesToNextMonth: Story = {
  render: () => <SingleCalendarDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const caption = canvas.getAllByText(/\d{4}/)[0];
    const initialLabel = caption.textContent;

    await userEvent.click(canvas.getByRole("button", { name: /next month/i }));

    await expect(canvas.getAllByText(/\d{4}/)[0].textContent).not.toBe(
      initialLabel,
    );
  },
};
