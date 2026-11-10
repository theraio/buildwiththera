import { CheckIcon, PlusIcon } from "~/components/icons";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import Input from "./input";
import { cn } from "~/utils/cn";
import { createRef } from "react";
import { inputVariants } from "./constants";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  it("renders a text input", () => {
    render(<Input placeholder="Email" />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("matches its snapshot", () => {
    const { container } = render(<Input placeholder="Email" />);

    expect(container).toMatchSnapshot();
  });

  it("accepts typed input and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input placeholder="Email" onChange={onChange} />);

    await user.type(screen.getByPlaceholderText("Email"), "hi@example.com");

    expect(screen.getByPlaceholderText("Email")).toHaveValue("hi@example.com");
    expect(onChange).toHaveBeenCalled();
  });

  it("does not accept input when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input placeholder="Email" disabled onChange={onChange} />);

    const input = screen.getByPlaceholderText("Email");
    await user.type(input, "hi@example.com");

    expect(input).toHaveValue("");
    expect(input).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("marks itself invalid via the aria-invalid attribute", () => {
    render(<Input placeholder="Email" aria-invalid="true" />);

    expect(screen.getByPlaceholderText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("forwards a ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Email" />);

    expect(ref.current).toBe(screen.getByPlaceholderText("Email"));
  });

  it("renders a left icon before the input", () => {
    render(<Input placeholder="Search" leftIcon={<PlusIcon />} />);

    const wrapper = screen.getByPlaceholderText("Search").parentElement;
    expect(wrapper?.querySelector("svg")).toBeInTheDocument();
    expect(wrapper?.firstElementChild?.tagName).toBe("SPAN");
  });

  it("renders a right icon after the input", () => {
    render(<Input placeholder="Search" rightIcon={<CheckIcon />} />);

    const wrapper = screen.getByPlaceholderText("Search").parentElement;
    expect(wrapper?.querySelector("svg")).toBeInTheDocument();
    expect(wrapper?.lastElementChild?.tagName).toBe("SPAN");
  });

  it("does not render icon wrappers when no icons are given", () => {
    render(<Input placeholder="Email" />);

    const wrapper = screen.getByPlaceholderText("Email").parentElement;
    expect(wrapper?.querySelectorAll("span")).toHaveLength(0);
  });

  it.each(["sm", "default", "lg"] as const)(
    "renders the %s size, matching Button's height scale",
    (size) => {
      render(<Input placeholder="Email" size={size} />);

      const wrapper = screen.getByPlaceholderText("Email").parentElement;
      expect(wrapper?.className).toBe(cn(inputVariants({ size })));
    },
  );
});
