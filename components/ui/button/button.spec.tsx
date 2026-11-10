import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import Button from "./button";
import { buttonVariants } from "./constants";
import { cn } from "~/utils/cn";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Save changes</Button>);

    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
  });

  it("matches its snapshot", () => {
    const { container } = render(<Button>Save changes</Button>);

    expect(container).toMatchSnapshot();
  });

  it.each([
    "primary",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
  ] as const)("renders the %s variant", (variant) => {
    render(<Button variant={variant}>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button.className).toBe(cn(buttonVariants({ variant })));
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    await user.click(screen.getByRole("button", { name: "Click me" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Click me" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as its child element when asChild is set, without an extra DOM wrapper", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Button asChild>
        <a ref={ref} href="/billing">
          Go to billing
        </a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Go to billing" });
    expect(link).toBe(ref.current);
    expect(link.tagName).toBe("A");
    expect(link.className).toContain("bg-primary/86");
  });
});
