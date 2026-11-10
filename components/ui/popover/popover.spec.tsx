import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Popover from "./popover";

describe("Popover", () => {
  it("renders the trigger without showing the content", () => {
    render(<Popover trigger={<button>Open</button>}>Popover content</Popover>);

    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("matches its snapshot", () => {
    const { container } = render(
      <Popover trigger={<button>Open</button>}>Popover content</Popover>,
    );

    expect(container).toMatchSnapshot();
  });

  it("shows the content when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<Popover trigger={<button>Open</button>}>Popover content</Popover>);

    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("calls onOpenChange when the trigger is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover trigger={<button>Open</button>} onOpenChange={onOpenChange}>
        Popover content
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("respects a controlled open prop", () => {
    render(
      <Popover trigger={<button>Open</button>} open>
        Popover content
      </Popover>,
    );

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });
});
