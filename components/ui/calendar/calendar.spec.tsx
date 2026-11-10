import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Calendar from "./calendar";

const JANUARY_2026 = new Date(2026, 0, 1);

function ControlledCalendar() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      defaultMonth={JANUARY_2026}
    />
  );
}

describe("Calendar", () => {
  it("renders the days of the given month", () => {
    render(
      <Calendar
        mode="single"
        defaultMonth={JANUARY_2026}
        selected={undefined}
      />,
    );

    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(screen.getByRole("gridcell", { name: "15" })).toBeInTheDocument();
  });

  it("matches its snapshot", () => {
    const { container } = render(
      <Calendar
        mode="single"
        defaultMonth={JANUARY_2026}
        selected={undefined}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("navigates to the next month", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        mode="single"
        defaultMonth={JANUARY_2026}
        selected={undefined}
      />,
    );

    await user.click(screen.getByRole("button", { name: /next month/i }));

    expect(screen.getByText("February 2026")).toBeInTheDocument();
  });

  it("navigates to the previous month", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        mode="single"
        defaultMonth={JANUARY_2026}
        selected={undefined}
      />,
    );

    await user.click(screen.getByRole("button", { name: /previous month/i }));

    expect(screen.getByText("December 2025")).toBeInTheDocument();
  });

  it("selects a day when clicked", async () => {
    const user = userEvent.setup();
    render(<ControlledCalendar />);

    await user.click(screen.getByRole("button", { name: /15th/ }));

    expect(screen.getByRole("button", { name: /15th/ })).toHaveAttribute(
      "data-selected-single",
      "true",
    );
  });
});
