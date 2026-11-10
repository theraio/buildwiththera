import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Dialog from "./dialog";

describe("Dialog", () => {
  it("does not render its content when closed", () => {
    render(
      <Dialog open={false} onOpenChange={() => {}} title="Feedback">
        Dialog content
      </Dialog>,
    );

    expect(screen.queryByText("Dialog content")).not.toBeInTheDocument();
  });

  it("renders its title and content when open", () => {
    render(
      <Dialog open onOpenChange={() => {}} title="Feedback">
        Dialog content
      </Dialog>,
    );

    expect(
      screen.getByRole("heading", { name: "Feedback" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Dialog content")).toBeInTheDocument();
  });

  it("renders a visible description when provided", () => {
    render(
      <Dialog
        open
        onOpenChange={() => {}}
        title="Feedback"
        description="Tell us what went wrong"
      >
        Dialog content
      </Dialog>,
    );

    expect(screen.getByText("Tell us what went wrong")).toBeInTheDocument();
  });

  it("calls onOpenChange with false when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange} title="Feedback">
        Dialog content
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onOpenChange with false when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange} title="Feedback">
        Dialog content
      </Dialog>,
    );

    await user.keyboard("{Escape}");

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
