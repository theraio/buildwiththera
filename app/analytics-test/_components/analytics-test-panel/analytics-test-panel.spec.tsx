import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  captureEvent,
  identifyUser,
  resetAnalytics,
} from "~/widgets/analytics";
import AnalyticsTestPanel from "./analytics-test-panel";

vi.mock("~/widgets/analytics", () => ({
  captureEvent: vi.fn(),
  identifyUser: vi.fn(),
  resetAnalytics: vi.fn(),
}));

describe("AnalyticsTestPanel", () => {
  it("captures a test event and displays the last action", async () => {
    const user = userEvent.setup();
    render(<AnalyticsTestPanel />);

    await user.click(
      screen.getByRole("button", { name: "Capture test event" }),
    );

    expect(captureEvent).toHaveBeenCalledWith(
      "analytics_test_event",
      expect.objectContaining({ source: "analytics-test-page" }),
    );
    expect(
      screen.getByText("Captured event: analytics_test_event"),
    ).toBeInTheDocument();
  });

  it("identifies a test user and displays the last action", async () => {
    const user = userEvent.setup();
    render(<AnalyticsTestPanel />);

    await user.click(
      screen.getByRole("button", { name: "Identify test user" }),
    );

    expect(identifyUser).toHaveBeenCalledWith("analytics-test-user", {
      plan: "test",
    });
    expect(
      screen.getByText("Identified user: analytics-test-user"),
    ).toBeInTheDocument();
  });

  it("resets the analytics identity and displays the last action", async () => {
    const user = userEvent.setup();
    render(<AnalyticsTestPanel />);

    await user.click(
      screen.getByRole("button", { name: "Reset analytics identity" }),
    );

    expect(resetAnalytics).toHaveBeenCalled();
    expect(screen.getByText("Last action:").parentElement).toHaveTextContent(
      "Reset analytics identity",
    );
  });
});
