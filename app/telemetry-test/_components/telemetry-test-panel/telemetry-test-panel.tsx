"use client";

import { useState } from "react";
import { Button } from "~/components/ui";
import { captureException, captureMessage } from "~/widgets/telemetry";
import { triggerServerError } from "~/app/telemetry-test/_actions/trigger-server-error";

function TelemetryTestPanel() {
  const [lastEventId, setLastEventId] = useState<string | null>(null);

  function handleCaptureException() {
    const eventId = captureException(
      {
        module: "TelemetryTest",
        component: "telemetry-test-panel.tsx",
        func: "handleCaptureException",
        message: "Simulated handled exception",
      },
      {
        errorName: "TelemetryTestClientError",
        tags: { source: "telemetry-test-page" },
        context: { triggeredAt: new Date().toISOString() },
      },
    );
    setLastEventId(eventId);
  }

  function handleCaptureMessage() {
    setLastEventId(captureMessage("Telemetry test message", "info"));
  }

  function handleThrowUnhandled(): never {
    throw new Error("Simulated unhandled client error");
  }

  async function handleServerError() {
    const { eventId } = await triggerServerError();
    setLastEventId(eventId);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCaptureException}>
          Capture handled exception
        </Button>
        <Button onClick={handleCaptureMessage} variant="secondary">
          Capture message
        </Button>
        <Button onClick={handleServerError} variant="secondary">
          Trigger server-side error
        </Button>
        <Button onClick={handleThrowUnhandled} variant="destructive">
          Throw unhandled client error
        </Button>
      </div>
      {lastEventId && (
        <p className="text-sm text-muted-foreground">
          Last Sentry event id: <span className="font-mono">{lastEventId}</span>
        </p>
      )}
    </div>
  );
}

export default TelemetryTestPanel;
