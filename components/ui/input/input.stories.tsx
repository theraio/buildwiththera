import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Mail, Search } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";
import { CheckIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import Input from "./input";
import { InputProps } from "./types";

const SIZES = [
  "sm",
  "default",
  "lg",
] as const satisfies readonly InputProps["size"][];

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A native `<input>` styled against `DESIGN.md`'s confirmed `Inputs & forms` spec: a `bg-transparent` field inside a `{rounded.md}` bordered container — no separate 'field fill' color. Its `size` heights (`h-9`/`h-10`/`h-12`) track `buttonVariants`' scale, so an `Input` and a `Button` of matching size line up in the same row.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: SIZES,
      description: "Height of the field — matches Button's `size` scale.",
      table: { defaultValue: { summary: "default" } },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "file"],
      description: "Native `<input>` type.",
      table: { defaultValue: { summary: "text" } },
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    "aria-invalid": {
      control: "boolean",
      description:
        "Marks the field as invalid, switching the border/focus ring to the error tokens.",
    },
    onChange: { table: { disable: true } },
  },
  args: {
    placeholder: "Email address",
    onChange: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Every size, each paired with a Button of the matching size to verify they
 * line up at the same height.
 */
export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {SIZES.map((size) => (
        <div key={size} className="flex items-center gap-3">
          <Input size={size} placeholder="Email address" className="max-w-64" />
          <Button size={size}>Submit</Button>
        </div>
      ))}
    </div>
  ),
};

export const Default: Story = {};

/** An uncontrolled field pre-filled via `defaultValue`. */
export const WithValue: Story = {
  args: { defaultValue: "hi@example.com" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "hi@example.com" },
};

/** Driven by the native `aria-invalid` attribute — the same signal form libraries like react-hook-form set on failed validation. */
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
};

export const Password: Story = {
  args: { type: "password", placeholder: "Password", defaultValue: "secret" },
};

export const File: Story = {
  args: { type: "file", placeholder: undefined },
};

/** A leading decorative icon, e.g. for a search field. */
export const WithLeftIcon: Story = {
  args: { placeholder: "Search", leftIcon: <Search /> },
};

/** A trailing icon, e.g. to confirm a validated value. */
export const WithRightIcon: Story = {
  args: { defaultValue: "hi@example.com", rightIcon: <CheckIcon /> },
};

/** Both a leading and a trailing icon on the same field. */
export const WithBothIcons: Story = {
  args: {
    type: "email",
    defaultValue: "hi@example.com",
    leftIcon: <Mail />,
    rightIcon: <CheckIcon />,
  },
};

/** Interaction test: typing into the input fires `onChange` and updates its value. */
export const Typable: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Email address");

    await userEvent.type(input, "hi@example.com");

    await expect(input).toHaveValue("hi@example.com");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

/** Interaction test: a disabled input is inert — it never receives typed input. */
export const DisabledIsNotTypable: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Email address");

    await expect(input).toBeDisabled();
    await userEvent.type(input, "hi@example.com");

    await expect(input).toHaveValue("");
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};
