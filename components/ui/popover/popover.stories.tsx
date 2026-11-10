import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, userEvent, within } from "storybook/test";
import { Button } from "~/components/ui/button";
import Popover from "./popover";

const meta = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays floating content next to a trigger. Built on Radix UI's `@radix-ui/react-popover` — positioning and dismiss behavior come from the primitive itself. Supports both controlled (`open`/`onOpenChange`) and uncontrolled usage.",
      },
    },
  },
  args: {
    trigger: <Button variant="outline">Open popover</Button>,
    children: <p className="text-sm">Place content for the popover here.</p>,
    onOpenChange: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Placement: Story = {
  args: {
    side: "right",
    align: "start",
  },
};

/** Interaction test: clicking the trigger reveals the popover content. */
export const OpensOnClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Open popover" }));

    await expect(
      screen.getByText("Place content for the popover here."),
    ).toBeInTheDocument();
  },
};
