import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import Toaster from "./toast";

const meta = {
  title: "UI/Toaster",
  component: Toaster,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Renders the toast viewport. Mount once near the root of the app (e.g. in `layout.tsx`) and trigger toasts anywhere with `toast(...)` from the `sonner` package.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Button onClick={() => toast("Event created")}>Show toast</Button>
      <Toaster />
    </>
  ),
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          onClick={() =>
            toast("Event created", {
              description: "Sunday, December 3rd at 9:00 AM",
            })
          }
        >
          Default
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.success("Changes saved")}
        >
          Success
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error("Something went wrong")}
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Undo delete?", {
              action: { label: "Undo", onClick: () => {} },
            })
          }
        >
          With action
        </Button>
      </div>
      <Toaster />
    </>
  ),
};
