import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Tooltip from "./tooltip";

describe("Tooltip", () => {
  it("renders the trigger without showing the tooltip content", () => {
    render(
      <Tooltip content="Add to library">
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(
      screen.getByRole("button", { name: "Hover me" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Add to library")).not.toBeInTheDocument();
  });

  it("matches its snapshot", () => {
    const { container } = render(
      <Tooltip content="Add to library">
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(container).toMatchSnapshot();
  });

  it("shows the tooltip content when the trigger is hovered", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Add to library">
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Hover me" }));

    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Add to library",
    );
  });

  it("hides the tooltip content when the trigger loses keyboard focus", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Tooltip content="Add to library">
          <button>Hover me</button>
        </Tooltip>
        <button>Elsewhere</button>
      </>,
    );

    await user.tab();
    await screen.findByRole("tooltip");

    await user.tab();

    await waitFor(() =>
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  });

  it("shows the tooltip content when the trigger receives keyboard focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Add to library">
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.tab();

    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Add to library",
    );
  });

  it("respects a controlled open prop", () => {
    render(
      <Tooltip content="Add to library" open>
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(screen.getByRole("tooltip")).toHaveTextContent("Add to library");
  });

  it("renders only the trigger, without a tooltip, when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Add to library" disabled>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Hover me" }));

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
