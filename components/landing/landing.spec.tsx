import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LANDING_COPY } from "./constants";
import Landing from "./landing";
import { Locale } from "./types";

describe.each<Locale>(["en", "es"])("Landing (%s)", (locale) => {
  const copy = LANDING_COPY[locale];

  it("leads with the growth promise and a way to start a project", () => {
    render(<Landing locale={locale} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      copy.hero.title.join(" "),
    );
    expect(
      screen.getAllByRole("link", { name: copy.hero.primary }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(copy.hero.availability)).toBeInTheDocument();
  });

  it("walks through the seasons, services, commitments and questions", () => {
    render(<Landing locale={locale} />);
    for (const season of copy.seasons.items) {
      const heading = screen.getByRole("heading", {
        name: new RegExp(season.title),
      });
      expect(heading).toHaveTextContent(season.name);
      expect(screen.getByText(season.meta)).toBeInTheDocument();
    }
    for (const service of copy.services.items) {
      expect(
        screen.getByRole("link", { name: new RegExp(service.name) }),
      ).toBeInTheDocument();
    }
    for (const principle of copy.principles.items) {
      expect(
        screen.getByRole("heading", { name: principle.title }),
      ).toBeInTheDocument();
    }
    for (const item of copy.faq.items) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
  });

  it("starts the project screen from a service, skipping straight to the budget", async () => {
    const user = userEvent.setup();
    render(<Landing locale={locale} />);
    const [service] = copy.services.items;
    await user.click(
      screen.getByRole("link", { name: new RegExp(service.name) }),
    );
    expect(
      screen.getByRole("heading", { name: copy.contact.budget.title }),
    ).toBeInTheDocument();
  });

  it("opens the project screen and walks it one question at a time, and back", async () => {
    const user = userEvent.setup();
    render(<Landing locale={locale} />);
    await user.click(
      screen.getAllByRole("link", { name: copy.hero.primary })[0],
    );
    expect(
      screen.getByRole("dialog", { name: copy.contact.cta }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: copy.contact.need.title }),
    ).toHaveFocus();
    await user.click(
      screen.getByRole("button", {
        name: new RegExp(copy.contact.need.unsure),
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: new RegExp(copy.contact.budget.options[0]),
      }),
    );
    expect(
      screen.getByRole("heading", { name: copy.contact.details.title }),
    ).toHaveFocus();
    expect(screen.getByLabelText(copy.contact.details.email)).toBeRequired();
    await user.click(
      screen.getByRole("button", { name: new RegExp(copy.contact.back) }),
    );
    expect(
      screen.getByRole("button", {
        name: new RegExp(copy.contact.budget.options[0]),
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("keeps one answer open at a time", async () => {
    const user = userEvent.setup();
    const { container } = render(<Landing locale={locale} />);
    const answers = container.querySelectorAll("#faq details");
    expect(answers[0]).toHaveAttribute("open");
    await user.click(screen.getByText(copy.faq.items[1].question));
    expect(answers[1]).toHaveAttribute("open");
    expect(answers[0]).not.toHaveAttribute("open");
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
