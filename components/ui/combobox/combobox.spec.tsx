import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Combobox from "./combobox";
import { ComboboxOption, ComboboxOptionGroup } from "./types";

const FRAMEWORKS: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro", disabled: true },
];

const GROUPED_FRAMEWORKS: ComboboxOptionGroup[] = [
  { label: "React", options: [{ value: "next", label: "Next.js" }] },
  { label: "Vue", options: [{ value: "nuxt", label: "Nuxt" }] },
];

function SingleCombobox(props: {
  onValueChange?: (value: string | null) => void;
}) {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      options={FRAMEWORKS}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        props.onValueChange?.(next);
      }}
    />
  );
}

function MultipleCombobox(props: {
  onValueChange?: (value: string[]) => void;
}) {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Combobox
      multiple
      options={FRAMEWORKS}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        props.onValueChange?.(next);
      }}
    />
  );
}

describe("Combobox", () => {
  it("renders the placeholder when nothing is selected", () => {
    render(<SingleCombobox />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Select an option");
  });

  it("matches its snapshot", () => {
    const { container } = render(<SingleCombobox />);

    expect(container).toMatchSnapshot();
  });

  it("opens and lists every option when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<SingleCombobox />);

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByRole("option", { name: "Next.js" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Remix" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Astro" })).toBeInTheDocument();
  });

  it("filters options by search text", async () => {
    const user = userEvent.setup();
    render(<SingleCombobox />);

    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Search..."), "rem");

    expect(screen.getByRole("option", { name: "Remix" })).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "Next.js" }),
    ).not.toBeInTheDocument();
  });

  it("selects a single option, closes the popover, and updates the trigger label", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<SingleCombobox onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Next.js" }));

    expect(onValueChange).toHaveBeenCalledWith("next");
    expect(screen.getByRole("combobox")).toHaveTextContent("Next.js");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not select a disabled option", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<SingleCombobox onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Astro" }));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("toggles multiple selections without closing the popover", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<MultipleCombobox onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Next.js" }));

    expect(onValueChange).toHaveBeenCalledWith(["next"]);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Remix" }));

    expect(onValueChange).toHaveBeenCalledWith(["next", "remix"]);
  });

  it("groups options under their group label", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={GROUPED_FRAMEWORKS}
        value={null}
        onValueChange={() => {}}
      />,
    );

    await user.click(screen.getByRole("combobox"));

    const listbox = screen.getByRole("listbox");
    expect(within(listbox).getByText("React")).toBeInTheDocument();
    expect(within(listbox).getByText("Vue")).toBeInTheDocument();
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        disabled
        options={FRAMEWORKS}
        value={null}
        onValueChange={() => {}}
      />,
    );

    await user.click(screen.getByRole("combobox"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
