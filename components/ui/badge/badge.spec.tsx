import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Badge from "./badge";
import { badgeVariants } from "./constants";
import { cn } from "~/utils/cn";
import { createRef } from "react";

describe("Badge", () => {
  it("renders its label", () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("matches its snapshot", () => {
    const { container } = render(<Badge>New</Badge>);

    expect(container).toMatchSnapshot();
  });

  it.each(["primary", "destructive", "outline", "secondary"] as const)(
    "renders the %s variant",
    (variant) => {
      render(<Badge variant={variant}>New</Badge>);

      const badge = screen.getByText("New");
      expect(badge.className).toBe(cn(badgeVariants({ variant })));
    },
  );

  it("renders as its child element when asChild is set, without an extra DOM wrapper", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Badge asChild>
        <a ref={ref} href="/billing">
          Paid
        </a>
      </Badge>,
    );

    const link = screen.getByRole("link", { name: "Paid" });
    expect(link).toBe(ref.current);
    expect(link.tagName).toBe("A");
    expect(link.className).toContain("bg-primary");
  });
});
