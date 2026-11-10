import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import Avatar from "./avatar";
import { avatarVariants } from "./constants";
import { cn } from "~/utils/cn";

// Radix's AvatarImage preloads via a plain `new window.Image()` (independent
// of the rendered <img>) and only swaps the fallback out once that succeeds
// or fails — jsdom never resolves real image loads, so this stub drives
// that outcome deterministically.
class FakeImage {
  onload: ((event: { currentTarget: FakeImage }) => void) | null = null;
  onerror: ((event: { currentTarget: FakeImage }) => void) | null = null;
  complete = false;
  naturalWidth = 0;

  set src(_value: string) {
    this.complete = true;
    this.naturalWidth = FakeImage.shouldFail ? 0 : 1;
    if (FakeImage.shouldFail) this.onerror?.({ currentTarget: this });
    else this.onload?.({ currentTarget: this });
  }

  addEventListener(
    event: "load" | "error",
    handler: (event: { currentTarget: FakeImage }) => void,
  ) {
    if (event === "load") this.onload = handler;
    if (event === "error") this.onerror = handler;
  }

  removeEventListener() {}

  static shouldFail = false;
}

describe("Avatar", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    FakeImage.shouldFail = false;
  });

  it("renders the fallback when no src is given", () => {
    render(<Avatar fallback="AB" />);

    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders the image once it loads successfully, replacing the fallback", async () => {
    vi.stubGlobal("Image", FakeImage);

    render(<Avatar src="/user.png" alt="Jane Doe" fallback="JD" />);

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "Jane Doe" })).toHaveAttribute(
        "src",
        "/user.png",
      );
    });
    expect(screen.queryByText("JD")).not.toBeInTheDocument();
  });

  it("keeps showing the fallback when the image fails to load", async () => {
    FakeImage.shouldFail = true;
    vi.stubGlobal("Image", FakeImage);

    render(<Avatar src="/broken.png" alt="Jane Doe" fallback="JD" />);

    await waitFor(() => {
      expect(screen.getByText("JD")).toBeInTheDocument();
    });
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("matches its snapshot", () => {
    const { container } = render(<Avatar fallback="AB" />);

    expect(container).toMatchSnapshot();
  });

  it.each(["sm", "default", "lg"] as const)("renders the %s size", (size) => {
    render(<Avatar size={size} fallback="AB" data-testid="avatar" />);

    const avatar = screen.getByTestId("avatar");
    expect(avatar.className).toBe(cn(avatarVariants({ size })));
  });

  it("applies fallbackClassName to the fallback, not the root", () => {
    render(
      <Avatar
        fallback="AB"
        fallbackClassName="bg-primary/10 text-primary"
        data-testid="avatar"
      />,
    );

    expect(screen.getByText("AB").className).toContain("bg-primary/10");
    expect(screen.getByTestId("avatar").className).not.toContain(
      "bg-primary/10",
    );
  });
});
