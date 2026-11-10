import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, userEvent, within } from "storybook/test";
import Combobox from "./combobox";
import { ComboboxOption, ComboboxOptionGroup } from "./types";

const FRAMEWORKS: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "sveltekit", label: "SvelteKit", disabled: true },
];

const GROUPED_FRAMEWORKS: ComboboxOptionGroup[] = [
  {
    label: "React",
    options: [
      { value: "next", label: "Next.js" },
      { value: "remix", label: "Remix" },
    ],
  },
  {
    label: "Other",
    options: [
      { value: "nuxt", label: "Nuxt" },
      { value: "sveltekit", label: "SvelteKit" },
    ],
  },
];

function SingleComboboxDemo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox options={FRAMEWORKS} value={value} onValueChange={setValue} />
  );
}

function GroupedComboboxDemo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      options={GROUPED_FRAMEWORKS}
      value={value}
      onValueChange={setValue}
    />
  );
}

function MultipleComboboxDemo() {
  const [value, setValue] = useState<string[]>(["next"]);

  return (
    <Combobox
      multiple
      options={FRAMEWORKS}
      value={value}
      onValueChange={setValue}
    />
  );
}

const meta = {
  title: "UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A searchable, selectable dropdown. Built from `ComboboxCore` (`@radix-ui/react-popover` for positioning + `cmdk` for the filterable list), restyled against `DESIGN.md`'s tokens. Supports flat or grouped options and single or multiple selection, and is a fully controlled component (`value`/`onValueChange` are required).",
      },
    },
  },
  argTypes: {
    onValueChange: { table: { disable: true } },
  },
  args: {
    options: FRAMEWORKS,
    value: null,
    onValueChange: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Flat list of options, nothing selected initially. */
export const Default: Story = {
  render: () => <SingleComboboxDemo />,
};

/** Options split into labeled groups with a separator between them. */
export const Grouped: Story = {
  render: () => <GroupedComboboxDemo />,
};

/** `multiple` keeps the popover open and accumulates a list of values. */
export const Multiple: Story = {
  render: () => <MultipleComboboxDemo />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    options: FRAMEWORKS,
    value: null,
    onValueChange: fn(),
  },
};

/** Interaction test: opening the trigger reveals every option. */
export const OpensOnClick: Story = {
  render: () => <SingleComboboxDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));

    await expect(
      screen.getByRole("option", { name: "Next.js" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("option", { name: "Remix" }),
    ).toBeInTheDocument();
  },
};

/** Interaction test: typing in the search input filters the option list. */
export const SearchFilters: Story = {
  render: () => <SingleComboboxDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));
    await userEvent.type(screen.getByPlaceholderText("Search..."), "rem");

    await expect(
      screen.getByRole("option", { name: "Remix" }),
    ).toBeInTheDocument();
    await expect(
      screen.queryByRole("option", { name: "Next.js" }),
    ).not.toBeInTheDocument();
  },
};

/** Interaction test: picking an option closes the popover and updates the trigger label. */
export const SelectingAnOptionClosesThePopover: Story = {
  render: () => <SingleComboboxDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "Next.js" }));

    await expect(canvas.getByRole("combobox")).toHaveTextContent("Next.js");
    await expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  },
};

/**
 * Interaction test: a disabled option is marked `aria-disabled` and styled
 * `pointer-events-none`, which (correctly) makes it physically unclickable
 * in a real browser — so this only asserts the disabled state, rather than
 * attempting a click a real pointer could never land.
 */
export const DisabledOptionIsNotSelectable: Story = {
  render: () => <SingleComboboxDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));

    await expect(
      screen.getByRole("option", { name: "SvelteKit" }),
    ).toHaveAttribute("aria-disabled", "true");
    await expect(canvas.getByRole("combobox")).toHaveTextContent(
      "Select an option",
    );
  },
};
