import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ThemeProvider } from "~/providers/theme-provider";
import ThemeToggle from "./theme-toggle";
import userEvent from "@testing-library/user-event";

// next-themes reads `prefers-color-scheme` via matchMedia, which jsdom
// doesn't implement.
beforeEach(() => {
  // next-themes persists the selected theme to localStorage, which would
  // otherwise leak the active theme from one test into the next.
  window.localStorage.clear();
  window.matchMedia =
    window.matchMedia ??
    ((query: string) => ({
      // Reporting reduced-motion as preferred makes the indicator snap
      // to position synchronously (via gsap.set) instead of tweening,
      // so assertions don't race a GSAP animation.
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
});

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  it("renders one radio per theme option", () => {
    renderToggle();

    expect(
      screen.getByRole("radiogroup", { name: "Theme" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Light" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Dark" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "System" })).toBeInTheDocument();
  });

  it("marks the active theme as checked after switching", async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole("radio", { name: "Dark" }));

    expect(screen.getByRole("radio", { name: "Dark" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Light" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("slides the indicator to the newly active option's position", async () => {
    const user = userEvent.setup();
    const { container } = renderToggle();

    // jsdom doesn't lay elements out, so fake each radio's geometry as if
    // they were laid out left-to-right in a row.
    screen.getAllByRole("radio").forEach((radio, index) => {
      Object.defineProperty(radio, "offsetLeft", {
        configurable: true,
        value: index * 44,
      });
      Object.defineProperty(radio, "offsetWidth", {
        configurable: true,
        value: 40,
      });
    });

    await user.click(screen.getByRole("radio", { name: "Dark" }));

    const indicator = container.querySelector(
      '[data-testid="theme-toggle-indicator"]',
    );
    expect(indicator).toHaveStyle({ left: "44px", width: "40px" });
  });
});
