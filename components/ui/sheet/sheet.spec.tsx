import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Sheet from "./sheet";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

function ToggleableSheet() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
      <Sheet open={open} onOpenChange={setOpen} title="Order details">
        Sheet content
      </Sheet>
    </div>
  );
}

describe("Sheet", () => {
  it("does not render its content when closed", () => {
    render(
      <Sheet open={false} onOpenChange={() => {}} title="Order details">
        Sheet content
      </Sheet>,
    );

    expect(screen.queryByText("Sheet content")).not.toBeInTheDocument();
  });

  it("renders its title and content when open", () => {
    render(
      <Sheet open onOpenChange={() => {}} title="Order details">
        Sheet content
      </Sheet>,
    );

    expect(
      screen.getByRole("heading", { name: "Order details" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Sheet content")).toBeInTheDocument();
  });

  it("renders headerEnd content beside the title", () => {
    render(
      <Sheet
        open
        onOpenChange={() => {}}
        title="Order details"
        headerEnd={<span>AB</span>}
      >
        Sheet content
      </Sheet>,
    );

    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders a visible description when provided", () => {
    render(
      <Sheet
        open
        onOpenChange={() => {}}
        title="Order details"
        description="Case 123"
      >
        Sheet content
      </Sheet>,
    );

    expect(screen.getByText("Case 123")).toBeInTheDocument();
  });

  it("calls onOpenChange with false when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Sheet open onOpenChange={onOpenChange} title="Order details">
        Sheet content
      </Sheet>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onOpenChange with false when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Sheet open onOpenChange={onOpenChange} title="Order details">
        Sheet content
      </Sheet>,
    );

    await user.keyboard("{Escape}");

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("transitions the panel into view after mounting open", async () => {
    render(
      <Sheet open onOpenChange={() => {}} title="Order details">
        Sheet content
      </Sheet>,
    );

    const panel = screen
      .getByText("Sheet content")
      .closest('[data-slot="sheet-content"]') as HTMLElement;

    expect(panel.className).toContain("transition-[transform,max-width]");
    await waitFor(() => expect(panel.className).toContain("translate-x-0"));
  });

  it("keeps the panel mounted through the exit transition instead of vanishing instantly", async () => {
    render(<ToggleableSheet />);

    await waitFor(() =>
      expect(
        screen
          .getByText("Sheet content")
          .closest('[data-slot="sheet-content"]'),
      ).toHaveClass("translate-x-0"),
    );

    fireEvent.click(screen.getByText("Toggle")); // close

    const panel = screen
      .getByText("Sheet content")
      .closest('[data-slot="sheet-content"]') as HTMLElement;
    expect(panel.className).toContain("translate-x-full");

    await waitFor(() =>
      expect(screen.queryByText("Sheet content")).not.toBeInTheDocument(),
    );
  });

  it("re-plays the entrance transition every time the sheet reopens", async () => {
    render(<ToggleableSheet />);

    let panel = screen
      .getByText("Sheet content")
      .closest('[data-slot="sheet-content"]') as HTMLElement;
    await waitFor(() => expect(panel.className).toContain("translate-x-0"));

    fireEvent.click(screen.getByText("Toggle")); // close
    fireEvent.click(screen.getByText("Toggle")); // reopen

    panel = screen
      .getByText("Sheet content")
      .closest('[data-slot="sheet-content"]') as HTMLElement;
    expect(panel.className).toContain("translate-x-full");
    await waitFor(() => expect(panel.className).toContain("translate-x-0"));
  });
});
