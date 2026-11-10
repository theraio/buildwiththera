import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import RadioGroup from "./radio-group";
import { RadioGroupItem } from "./types";

const PLANS: RadioGroupItem[] = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise", disabled: true },
];

function ControlledRadioGroup(props: {
  onValueChange?: (value: string) => void;
}) {
  const [value, setValue] = useState<string>("");

  return (
    <RadioGroup
      items={PLANS}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        props.onValueChange?.(next);
      }}
    />
  );
}

describe("RadioGroup", () => {
  it("renders a radio for every item", () => {
    render(<RadioGroup items={PLANS} />);

    expect(screen.getByRole("radio", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Enterprise" }),
    ).toBeInTheDocument();
  });

  it("matches its snapshot", () => {
    const { container } = render(<RadioGroup items={PLANS} />);

    expect(container).toMatchSnapshot();
  });

  it("pre-selects the item passed via defaultValue", () => {
    render(<RadioGroup items={PLANS} defaultValue="free" />);

    expect(screen.getByRole("radio", { name: "Free" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Pro" })).not.toBeChecked();
  });

  it("selects an item when its radio is clicked", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ControlledRadioGroup onValueChange={onValueChange} />);

    await user.click(screen.getByRole("radio", { name: "Free" }));

    expect(onValueChange).toHaveBeenCalledWith("free");
    expect(screen.getByRole("radio", { name: "Free" })).toBeChecked();
  });

  it("switches selection when a different item is clicked", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ControlledRadioGroup onValueChange={onValueChange} />);

    await user.click(screen.getByRole("radio", { name: "Free" }));
    await user.click(screen.getByRole("radio", { name: "Pro" }));

    expect(onValueChange).toHaveBeenLastCalledWith("pro");
    expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
  });

  it("never selects or reports an item marked disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ControlledRadioGroup onValueChange={onValueChange} />);

    const enterprise = screen.getByRole("radio", { name: "Enterprise" });
    expect(enterprise).toBeDisabled();

    await user.click(enterprise);

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("disables every item when the group-level disabled prop is set", () => {
    render(<RadioGroup items={PLANS} disabled />);

    expect(screen.getByRole("radio", { name: "Free" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeDisabled();
  });

  it("associates an item's description without changing its accessible name", () => {
    render(
      <RadioGroup
        items={[{ value: "free", label: "Free", description: "Limited usage" }]}
      />,
    );

    const radio = screen.getByRole("radio", { name: "Free" });
    expect(screen.getByText("Limited usage").id).toBe(
      radio.getAttribute("aria-describedby"),
    );
  });
});
