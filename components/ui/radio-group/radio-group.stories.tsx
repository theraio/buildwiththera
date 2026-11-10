import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import RadioGroup from "./radio-group";
import { RadioGroupItem } from "./types";

const PLANS: RadioGroupItem[] = [
  {
    value: "free",
    label: "Free",
    description: "For individuals trying things out",
  },
  { value: "pro", label: "Pro", description: "For growing teams" },
  { value: "enterprise", label: "Enterprise" },
];

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A set of mutually exclusive options sharing a single `string` value. Built on Radix UI's `@radix-ui/react-radio-group` — selection state, roving focus, and arrow-key navigation come from the primitive itself. Each item renders its own radio paired with a native `<label>` — pass `items` instead of hand-assembling radios, the same `items`-driven shape `CheckboxGroup` uses. Supports both controlled (`value`/`onValueChange`) and uncontrolled (`defaultValue`) usage.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      table: { defaultValue: { summary: "vertical" } },
    },
    disabled: { control: "boolean" },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  args: {
    items: PLANS,
    onValueChange: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** An uncontrolled group, pre-selected via `defaultValue`. */
export const WithDefaultValue: Story = {
  args: { defaultValue: "free" },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    items: [
      { value: "free", label: "Free" },
      { value: "pro", label: "Pro" },
      { value: "enterprise", label: "Enterprise" },
    ],
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [...PLANS, { value: "legacy", label: "Legacy", disabled: true }],
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "free" },
};

/** A fully controlled group, driven from the story's own React state. */
export const Controlled: Story = {
  render: (args) => {
    function ControlledExample() {
      const [value, setValue] = useState<string | undefined>("free");

      return (
        <RadioGroup
          {...args}
          value={value}
          onValueChange={(next) => {
            setValue(next);
            args.onValueChange?.(next);
          }}
        />
      );
    }

    return <ControlledExample />;
  },
};

/** Interaction test: selecting an item reports it in `onValueChange`. */
export const Selectable: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("radio", { name: "Pro" }));

    await expect(args.onValueChange).toHaveBeenCalledWith("pro");
  },
};
