import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import DatePicker from "./date-picker";

const JUNE_15_2026 = new Date(2026, 5, 15);

function ControlledDatePicker(props: {
  onValueChange?: (date: Date | undefined) => void;
}) {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <DatePicker
      value={value}
      onValueChange={(date) => {
        setValue(date);
        props.onValueChange?.(date);
      }}
    />
  );
}

describe("DatePicker", () => {
  it("renders the placeholder when no date is selected", () => {
    render(<DatePicker />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Pick a date");
  });

  it("matches its snapshot", () => {
    const { container } = render(<DatePicker />);

    expect(container).toMatchSnapshot();
  });

  it("opens the calendar when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<DatePicker defaultValue={JUNE_15_2026} />);

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByText("June 2026")).toBeInTheDocument();
  });

  it("selects a date, closes the calendar, and updates the trigger label", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<ControlledDatePicker onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("button", { name: /15th/ }));

    expect(onValueChange).toHaveBeenCalledWith(expect.any(Date));
    expect(
      screen.queryByText("15", { selector: "button" }),
    ).not.toBeInTheDocument();
  });

  it("pre-selects the date passed via defaultValue", () => {
    render(<DatePicker defaultValue={JUNE_15_2026} />);

    expect(screen.getByRole("combobox")).not.toHaveTextContent("Pick a date");
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled />);

    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeDisabled();

    await user.click(trigger);

    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("formats the selected date with a custom dateFormat", () => {
    render(<DatePicker defaultValue={JUNE_15_2026} dateFormat="MM/dd/yyyy" />);

    expect(screen.getByRole("combobox")).toHaveTextContent("06/15/2026");
  });

  it("does not render a clear button when no date is selected", () => {
    render(<DatePicker />);

    expect(
      screen.queryByRole("button", { name: /clear date/i }),
    ).not.toBeInTheDocument();
  });

  it("clears the selected date when the clear button is clicked", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DatePicker defaultValue={JUNE_15_2026} onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("button", { name: /clear date/i }));

    expect(onValueChange).toHaveBeenCalledWith(undefined);
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick a date");
  });

  it("does not render a clear button when disabled", () => {
    render(<DatePicker disabled defaultValue={JUNE_15_2026} />);

    expect(
      screen.queryByRole("button", { name: /clear date/i }),
    ).not.toBeInTheDocument();
  });

  it("clears back to blank in a fully controlled picker that started with no value", async () => {
    const user = userEvent.setup();
    render(<ControlledDatePicker />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("button", { name: /15th/ }));
    expect(screen.getByRole("combobox")).not.toHaveTextContent("Pick a date");

    await user.click(screen.getByRole("button", { name: /clear date/i }));

    expect(screen.getByRole("combobox")).toHaveTextContent("Pick a date");
  });
});
