import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PlusIcon } from "~/components/icons";
import { ButtonProps } from "./types";
import Button from "./button";

const VARIANTS = [
  "primary",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const satisfies readonly ButtonProps["variant"][];

const SIZES = [
  "default",
  "sm",
  "lg",
  "icon",
] as const satisfies readonly ButtonProps["size"][];

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The primary interactive action. Built on Radix UI's `Slot` (via the `asChild` prop) and styled with `class-variance-authority`, using the color/radius/spacing tokens confirmed in `DESIGN.md` (`button-primary`: `{colors.primary}` fill, `{rounded.md}` corners, `12px 32px` padding). Six variants across four sizes.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
      description: "Visual style of the button.",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: SIZES,
      description: "Padding/height of the button.",
      table: { defaultValue: { summary: "default" } },
    },
    asChild: {
      control: "boolean",
      description:
        "Render as the single child element (via Radix `Slot`) instead of a `<button>` — e.g. to make a `<Link>` look like a button.",
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
    onClick: { table: { disable: true } },
  },
  args: {
    children: "Button",
    onClick: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Every variant, grouped by variant, each shown across every size — a
 * single snapshot target for visual regression, and the fastest way to
 * eyeball the whole system at once.
 */
export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground capitalize">
            {variant}
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            {SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size === "icon" ? <PlusIcon /> : size}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Default CTA style — fills with `{colors.primary}`. */
export const Primary: Story = {
  args: { variant: "primary" },
};

/** Destructive actions (delete, revoke, cancel-with-loss). */
export const Destructive: Story = {
  args: { variant: "destructive" },
};

/** Secondary emphasis with a hairline border; brand-tinted on hover. */
export const Outline: Story = {
  args: { variant: "outline" },
};

/** Neutral emphasis — deliberately not a second accent color. */
export const Secondary: Story = {
  args: { variant: "secondary" },
};

/** Lowest-emphasis action, typically paired with a stronger sibling button. */
export const Ghost: Story = {
  args: { variant: "ghost" },
};

/** Looks like an inline text link rather than a button chrome. */
export const Link: Story = {
  args: { variant: "link" },
};

export const Small: Story = {
  args: { size: "sm" },
};

/** The confirmed "hero CTA" size (`h-12` + `text-base`). */
export const Large: Story = {
  args: { size: "lg" },
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    "aria-label": "Add item",
    children: <PlusIcon />,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** Renders the child `<a>` directly — no extra `<button>` wrapper in the DOM. */
export const AsLink: Story = {
  args: {
    asChild: true,
    children: <a href="#billing">Go to billing</a>,
  },
};

/** Interaction test: clicking the button fires `onClick` exactly once. */
export const Clickable: Story = {
  args: { variant: "primary" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/**
 * Interaction test: a disabled button is inert — it's not just visually
 * dimmed, it's unclickable (`disabled:pointer-events-none`), so a real
 * pointer interaction never reaches it.
 */
export const DisabledIsNotClickable: Story = {
  args: { variant: "primary", disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });

    await expect(button).toBeDisabled();
    await expect(userEvent.click(button)).rejects.toThrow(/pointer-events/i);

    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
