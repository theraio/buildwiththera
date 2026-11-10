import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import Dialog from "./dialog";

function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="What went wrong?"
        description="Let us know what the automation got wrong so we can improve it."
      >
        <textarea
          placeholder="Describe the issue..."
          className="min-h-24 w-full rounded-md border border-input bg-transparent p-3 text-sm text-foreground outline-none focus:border-primary"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Submit</Button>
        </div>
      </Dialog>
    </>
  );
}

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A centered, modal overlay — distinct from `Sheet`'s slide-over panel. Built on Radix UI's `@radix-ui/react-dialog`, fully controlled via `open`/`onOpenChange`. Use for a focused, blocking task (like confirming an action or collecting short feedback) rather than a side panel of ongoing content.",
      },
    },
  },
  args: {
    open: false,
    onOpenChange: fn(),
    title: "What went wrong?",
    children: null,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DialogDemo />,
};

/** Interaction test: clicking the trigger reveals the dialog's content. */
export const OpensOnClick: Story = {
  render: () => <DialogDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Open dialog" }));

    await expect(
      within(document.body).getByRole("heading", { name: "What went wrong?" }),
    ).toBeInTheDocument();
  },
};
