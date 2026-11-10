import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import type { DateRange } from "react-day-picker";
import DateRangePicker from "./date-range-picker";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

const JUNE_1_2026 = new Date(2026, 5, 1);
const JUNE_10_2026 = new Date(2026, 5, 10);
const JUNE_20_2026 = new Date(2026, 5, 20);

function ControlledDateRangePicker(props: {
  onValueChange?: (range: DateRange | undefined) => void;
}) {
  const [value, setValue] = useState<DateRange | undefined>(undefined);

  return (
    <DateRangePicker
      value={value}
      defaultMonth={JUNE_1_2026}
      numberOfMonths={1}
      onValueChange={(range) => {
        setValue(range);
        props.onValueChange?.(range);
      }}
    />
  );
}

describe("DateRangePicker", () => {
  it("renders the placeholder when no range is selected", () => {
    render(<DateRangePicker />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Pick a date range");
  });

  it("matches its snapshot", () => {
    const { container } = render(<DateRangePicker />);

    expect(container).toMatchSnapshot();
  });

  it("opens the calendar when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <DateRangePicker
        defaultValue={{ from: JUNE_1_2026, to: undefined }}
        numberOfMonths={1}
      />,
    );

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByText("June 2026")).toBeInTheDocument();
  });

  it("selects a range across two clicks, closes the calendar, and updates the trigger label", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<ControlledDateRangePicker onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("button", { name: /10th/ }));

    expect(onValueChange).toHaveBeenLastCalledWith({
      from: JUNE_10_2026,
      to: undefined,
    });
    expect(screen.getByText("June 2026")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /20th/ }));

    expect(onValueChange).toHaveBeenLastCalledWith({
      from: JUNE_10_2026,
      to: JUNE_20_2026,
    });
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("pre-selects the range passed via defaultValue", () => {
    render(
      <DateRangePicker
        defaultValue={{ from: JUNE_10_2026, to: JUNE_20_2026 }}
      />,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("Jun 10, 2026");
    expect(trigger).toHaveTextContent("Jun 20, 2026");
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker disabled />);

    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeDisabled();

    await user.click(trigger);

    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("formats the selected range with a custom dateFormat", () => {
    render(
      <DateRangePicker
        defaultValue={{ from: JUNE_10_2026, to: JUNE_20_2026 }}
        dateFormat="MM/dd/yyyy"
      />,
    );

    expect(screen.getByRole("combobox")).toHaveTextContent(
      "06/10/2026 - 06/20/2026",
    );
  });

  it("does not render a clear button when no range is selected", () => {
    render(<DateRangePicker />);

    expect(
      screen.queryByRole("button", { name: /clear date range/i }),
    ).not.toBeInTheDocument();
  });

  it("clears the selected range when the clear button is clicked", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DateRangePicker
        defaultValue={{ from: JUNE_10_2026, to: JUNE_20_2026 }}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /clear date range/i }));

    expect(onValueChange).toHaveBeenCalledWith(undefined);
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick a date range");
  });

  it("does not render a clear button when disabled", () => {
    render(
      <DateRangePicker
        disabled
        defaultValue={{ from: JUNE_10_2026, to: JUNE_20_2026 }}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /clear date range/i }),
    ).not.toBeInTheDocument();
  });

  it("starts a brand new range instead of adjusting the existing one when a complete range is already selected", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DateRangePicker
        defaultValue={{ from: JUNE_10_2026, to: JUNE_20_2026 }}
        defaultMonth={JUNE_1_2026}
        numberOfMonths={1}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    // Click a date inside the existing range: under plain react-day-picker
    // range logic this would just move `to` and close immediately; with
    // `resetOnSelect` it should instead start a fresh range.
    await user.click(screen.getByRole("button", { name: /15th/ }));

    expect(onValueChange).toHaveBeenLastCalledWith({
      from: new Date(2026, 5, 15),
      to: undefined,
    });
    expect(screen.getByText("June 2026")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /25th/ }));

    expect(onValueChange).toHaveBeenLastCalledWith({
      from: new Date(2026, 5, 15),
      to: new Date(2026, 5, 25),
    });
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("clears back to blank in a fully controlled picker that started with no value", async () => {
    const user = userEvent.setup();
    render(<ControlledDateRangePicker />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("button", { name: /10th/ }));
    await user.click(screen.getByRole("button", { name: /20th/ }));
    expect(screen.getByRole("combobox")).not.toHaveTextContent(
      "Pick a date range",
    );

    await user.click(screen.getByRole("button", { name: /clear date range/i }));

    expect(screen.getByRole("combobox")).toHaveTextContent("Pick a date range");
  });
});
