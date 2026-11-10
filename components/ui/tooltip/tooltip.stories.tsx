import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { PlusIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import Tooltip from "./tooltip";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A popup that reveals information on hover or keyboard focus. Built from `TooltipCore` (`@radix-ui/react-tooltip`, restyled against `DESIGN.md`'s confirmed `tooltip` spec: inverse fill `bg-foreground`/`text-background`, `{rounded.xl}` corners, `shadow-xl`). `Tooltip` wraps a single trigger element — pass the copy via `content` instead of a `Tooltip.Content` child.",
      },
    },
  },
  argTypes: {
    content: { control: "text" },
    disabled: { control: "boolean" },
    open: { control: "boolean" },
    onOpenChange: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    content: "Add to library",
    children: <Button variant="outline">Hover me</Button>,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every `side` the content can be positioned on, around a shared trigger grid. */
export const Sides: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={`Positioned ${side}`} side={side}>
          <Button variant="outline" className="capitalize">
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

/** An icon-only trigger — the most common real-world tooltip use case. */
export const IconTrigger: Story = {
  args: {
    content: "Add item",
    children: (
      <Button variant="outline" size="icon" aria-label="Add item">
        <PlusIcon />
      </Button>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Button variant="outline">No tooltip</Button>,
  },
};

/** Forced open via the controlled `open` prop, bypassing hover/focus entirely. */
export const Open: Story = {
  args: {
    open: true,
    children: <Button variant="outline">Always open</Button>,
  },
};

/** Interaction test: hovering the trigger reveals the tooltip content. */
export const HoverRevealsContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.hover(canvas.getByRole("button", { name: "Hover me" }));

    await waitFor(async () => {
      await expect(
        screen.getByRole("tooltip", { name: "Add to library" }),
      ).toBeInTheDocument();
    });
  },
};

/** Interaction test: keyboard focus reveals the tooltip just like hover does. */
export const FocusRevealsContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    canvas.getByRole("button", { name: "Hover me" }).focus();

    await waitFor(async () => {
      await expect(
        screen.getByRole("tooltip", { name: "Add to library" }),
      ).toBeInTheDocument();
    });
  },
};

/** Interaction test: a disabled tooltip never reveals content on hover. */
export const DisabledNeverReveals: Story = {
  args: {
    disabled: true,
    children: <Button variant="outline">No tooltip</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.hover(canvas.getByRole("button", { name: "No tooltip" }));

    await expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  },
};
