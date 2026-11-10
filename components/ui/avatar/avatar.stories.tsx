import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AvatarProps } from "./types";
import Avatar from "./avatar";

const SIZES = [
  "sm",
  "default",
  "lg",
] as const satisfies readonly AvatarProps["size"][];

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A user/entity image with a graceful text fallback. Built as a two-layer component on Radix UI's `Avatar` primitive (`AvatarCore`'s `Root`/`Image`/`Fallback` restyling) with a simplified `src`/`alt`/`fallback` prop API on top — always fully round (`{rounded.full}`, DESIGN.md's confirmed 'pills/avatars/progress go fully round'). Sizes aren't confirmed in DESIGN.md yet — extrapolated from `Button`'s `size` height scale (sm: h-9, default: h-10, lg: h-12).",
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "Image source. Omit to always show `fallback`.",
    },
    alt: { control: "text" },
    fallback: {
      control: "text",
      description:
        "Shown while the image is loading/missing/broken — e.g. initials.",
    },
    fallbackClassName: {
      control: "text",
      description:
        "Extra classes for the fallback itself, e.g. a per-identity fill color.",
    },
    size: {
      control: "select",
      options: SIZES,
      description: "Visual size of the avatar.",
      table: { defaultValue: { summary: "default" } },
    },
  },
  args: {
    fallback: "AB",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Every size in one canvas — a single snapshot target for visual regression,
 * and the fastest way to eyeball the whole component at once.
 */
export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex items-center gap-4">
      {SIZES.map((size) => (
        <Avatar key={size} size={size} fallback="AB" />
      ))}
    </div>
  ),
};

/** Falls back to initials when no image is set, or while one is loading. */
export const Fallback: Story = {
  args: { fallback: "AB" },
};

/** Renders the image once it loads, with the fallback as a loading/error state. */
export const WithImage: Story = {
  args: {
    src: "https://github.com/shadcn.png",
    alt: "Profile picture",
    fallback: "CN",
  },
};

export const Small: Story = {
  args: { size: "sm", fallback: "AB" },
};

export const Large: Story = {
  args: { size: "lg", fallback: "AB" },
};

/** `fallbackClassName` colors the fallback itself — e.g. a per-identity fill. */
export const ColoredFallback: Story = {
  args: {
    fallback: "JB",
    fallbackClassName: "bg-primary/10 text-primary",
  },
};
