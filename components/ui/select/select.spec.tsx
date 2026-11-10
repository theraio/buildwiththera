import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Select from "./select";
import { SelectOption, SelectOptionGroup } from "./types";

const FRAMEWORKS: SelectOption[] = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro", disabled: true },
];

const GROUPED_FRAMEWORKS: SelectOptionGroup[] = [
  { label: "React", options: [{ value: "next", label: "Next.js" }] },
  { label: "Vue", options: [{ value: "nuxt", label: "Nuxt" }] },
];

function ControlledSelect(props: { onValueChange?: (value: string) => void }) {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <Select
      options={FRAMEWORKS}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        props.onValueChange?.(next);
      }}
    />
  );
}

describe("Select", () => {
  it("renders the placeholder when nothing is selected", () => {
    render(<Select options={FRAMEWORKS} />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Select an option");
  });

  it("matches its snapshot", () => {
    const { container } = render(<Select options={FRAMEWORKS} />);

    expect(container).toMatchSnapshot();
  });

  it("opens and lists every option when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<Select options={FRAMEWORKS} />);

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByRole("option", { name: "Next.js" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Remix" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Astro" })).toBeInTheDocument();
  });

  it("selects an option, closes the popover, and updates the trigger label", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<ControlledSelect onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Next.js" }));

    expect(onValueChange).toHaveBeenCalledWith("next");
    expect(screen.getByRole("combobox")).toHaveTextContent("Next.js");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("pre-selects the item passed via defaultValue", () => {
    render(<Select options={FRAMEWORKS} defaultValue="remix" />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Remix");
  });

  it("does not warn about switching from uncontrolled to controlled when a controlled value starts undefined", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<ControlledSelect />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Next.js" }));

    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("does not select a disabled option", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<ControlledSelect onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Astro" }));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("groups options under their group label", async () => {
    const user = userEvent.setup();
    render(<Select options={GROUPED_FRAMEWORKS} />);

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<Select disabled options={FRAMEWORKS} />);

    await user.click(screen.getByRole("combobox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
