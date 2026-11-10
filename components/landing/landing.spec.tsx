import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LANDING_COPY } from "./constants";
import Landing from "./landing";
import { Locale } from "./types";

describe.each<Locale>(["en", "es"])("Landing (%s)", (locale) => {
  const copy = LANDING_COPY[locale];

  it("leads with the growth promise and a way to book a call", () => {
    render(<Landing locale={locale} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      copy.hero.title.join(" "),
    );
    const bookingLinks = screen.getAllByRole("link", {
      name: new RegExp(copy.closing.cta, "i"),
    });
    expect(bookingLinks.length).toBeGreaterThan(0);
  });

  it("walks through the four seasons, five services and three principles", () => {
    render(<Landing locale={locale} />);
    for (const season of copy.seasons.items) {
      const heading = screen.getByRole("heading", {
        name: new RegExp(season.title),
      });
      expect(heading).toHaveTextContent(season.name);
    }
    for (const service of copy.services.items) {
      expect(
        screen.getByRole("tab", { name: new RegExp(service.name) }),
      ).toBeInTheDocument();
    }
    for (const principle of copy.principles.items) {
      expect(
        screen.getByRole("heading", { name: principle.title }),
      ).toBeInTheDocument();
    }
  });

  it("shows one discipline at a time, switching on selection", async () => {
    const user = userEvent.setup();
    render(<Landing locale={locale} />);
    const [first, second] = copy.services.items;
    expect(screen.getByRole("tabpanel")).toHaveTextContent(first.body);
    await user.click(
      screen.getByRole("tab", { name: new RegExp(second.name) }),
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent(second.body);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  });

  it("links to the other language and marks the content language", () => {
    const { container } = render(<Landing locale={locale} />);
    expect(
      screen.getByRole("link", { name: copy.nav.switchLabel }),
    ).toHaveAttribute("href", copy.nav.switchHref);
    expect(container.querySelector("[data-surface='landing']")).toHaveAttribute(
      "lang",
      locale,
    );
  });
});
