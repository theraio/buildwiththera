import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckIcon } from "~/components/icons";
import { BadgeProps } from "./types";
import Badge from "./badge";

const VARIANTS = [
  "primary",
  "destructive",
  "outline",
  "secondary",
] as const satisfies readonly BadgeProps["variant"][];

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A small status/label chip. Built on Radix UI's `Slot` (via the `asChild` prop) and styled with `class-variance-authority`. Shape (`{rounded.lg}`) and text size (`{typography.caption}`) track DESIGN.md's confirmed 'badges/tags' and 'tooltip/badge microcopy' entries; per-variant fills mirror `Button`'s primary/destructive/outline/secondary treatments, since no standalone badge color spec is confirmed yet.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
      description: "Visual style of the badge.",
      table: { defaultValue: { summary: "primary" } },
    },
    asChild: {
      control: "boolean",
      description:
        "Render as the single child element (via Radix `Slot`) instead of a `<span>` — e.g. to make a `<Link>` look like a badge.",
    },
    children: { control: "text" },
  },
  args: {
    children: "Badge",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Every variant in one canvas — a single snapshot target for visual
 * regression, and the fastest way to eyeball the whole component at once.
 */
export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {VARIANTS.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

/** Default emphasis — fills with `{colors.primary}`. */
export const Primary: Story = {
  args: { variant: "primary" },
};

/** Destructive/error states (expired, revoked, failed). */
export const Destructive: Story = {
  args: { variant: "destructive" },
};

/** Lowest-emphasis chrome — a hairline border, no fill. */
export const Outline: Story = {
  args: { variant: "outline" },
};

/** Neutral emphasis — deliberately not a second accent color. */
export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <CheckIcon />
        Verified
      </>
    ),
  },
};

/** Renders the child `<a>` directly — no extra `<span>` wrapper in the DOM. */
export const AsLink: Story = {
  args: {
    asChild: true,
    children: <a href="#billing">Paid</a>,
  },
};
