import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, userEvent, within } from "storybook/test";
import Select from "./select";
import { SelectOption, SelectOptionGroup } from "./types";

const FRAMEWORKS: SelectOption[] = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "sveltekit", label: "SvelteKit", disabled: true },
];

const GROUPED_FRAMEWORKS: SelectOptionGroup[] = [
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

function SelectDemo() {
  const [value, setValue] = useState<string | undefined>(undefined);

  return <Select options={FRAMEWORKS} value={value} onValueChange={setValue} />;
}

function GroupedSelectDemo() {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <Select
      options={GROUPED_FRAMEWORKS}
      value={value}
      onValueChange={setValue}
    />
  );
}

const meta = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A single-value dropdown select. Built on Radix UI's `@radix-ui/react-select` — positioning, keyboard navigation, and typeahead come from the primitive itself. Pass `options` (flat or grouped) instead of hand-assembling items, the same shape `Combobox` uses. Supports both controlled (`value`/`onValueChange`) and uncontrolled (`defaultValue`) usage.",
      },
    },
  },
  argTypes: {
    onValueChange: { table: { disable: true } },
    value: { table: { disable: true } },
  },
  args: {
    options: FRAMEWORKS,
    onValueChange: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SelectDemo />,
};

/** An uncontrolled select, pre-selected via `defaultValue`. */
export const WithDefaultValue: Story = {
  args: { defaultValue: "remix" },
};

/** Options split into labeled groups with a separator between them. */
export const Grouped: Story = {
  render: () => <GroupedSelectDemo />,
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { "aria-invalid": true },
};

/** Interaction test: opening the trigger reveals every option. */
export const OpensOnClick: Story = {
  render: () => <SelectDemo />,
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

/** Interaction test: picking an option closes the popover and updates the trigger label. */
export const SelectingAnOptionClosesThePopover: Story = {
  render: () => <SelectDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "Next.js" }));

    await expect(canvas.getByRole("combobox")).toHaveTextContent("Next.js");
    await expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  },
};
