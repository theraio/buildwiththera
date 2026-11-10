import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { captureException, captureMessage } from "~/widgets/telemetry";
import TelemetryTestPanel from "./telemetry-test-panel";
import { triggerServerError } from "~/app/telemetry-test/_actions/trigger-server-error";

vi.mock("~/widgets/telemetry", () => ({
  captureException: vi.fn(() => "client-event-id"),
  captureMessage: vi.fn(() => "message-event-id"),
}));

vi.mock("~/app/telemetry-test/_actions/trigger-server-error", () => ({
  triggerServerError: vi.fn(() =>
    Promise.resolve({ eventId: "server-event-id" }),
  ),
}));

describe("TelemetryTestPanel", () => {
  it("captures a handled exception and displays its event id", async () => {
    const user = userEvent.setup();
    render(<TelemetryTestPanel />);

    await user.click(
      screen.getByRole("button", { name: "Capture handled exception" }),
    );

    expect(captureException).toHaveBeenCalledWith(
      expect.objectContaining({ module: "TelemetryTest" }),
      expect.objectContaining({ errorName: "TelemetryTestClientError" }),
    );
    expect(screen.getByText("client-event-id")).toBeInTheDocument();
  });

  it("captures a message and displays its event id", async () => {
    const user = userEvent.setup();
    render(<TelemetryTestPanel />);

    await user.click(screen.getByRole("button", { name: "Capture message" }));

    expect(captureMessage).toHaveBeenCalledWith(
      "Telemetry test message",
      "info",
    );
    expect(screen.getByText("message-event-id")).toBeInTheDocument();
  });

  it("triggers the server action and displays its event id", async () => {
    const user = userEvent.setup();
    render(<TelemetryTestPanel />);

    await user.click(
      screen.getByRole("button", { name: "Trigger server-side error" }),
    );

    expect(triggerServerError).toHaveBeenCalled();
    expect(await screen.findByText("server-event-id")).toBeInTheDocument();
  });

  it("renders the unhandled-error trigger", () => {
    render(<TelemetryTestPanel />);

    // Actually throwing it here would surface as an uncaught exception in
    // jsdom rather than a catchable rejection — this button's throw behavior
    // is meant to be exercised manually in a browser against real Sentry.
    expect(
      screen.getByRole("button", { name: "Throw unhandled client error" }),
    ).toBeInTheDocument();
  });
});
