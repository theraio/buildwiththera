"use client";

import { useState } from "react";
import { Button } from "~/components/ui";
import {
  captureEvent,
  identifyUser,
  resetAnalytics,
} from "~/widgets/analytics";

function AnalyticsTestPanel() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  function handleCaptureEvent() {
    captureEvent("analytics_test_event", {
      source: "analytics-test-page",
      triggeredAt: new Date().toISOString(),
    });
    setLastAction("Captured event: analytics_test_event");
  }

  function handleIdentifyUser() {
    identifyUser("analytics-test-user", { plan: "test" });
    setLastAction("Identified user: analytics-test-user");
  }

  function handleResetAnalytics() {
    resetAnalytics();
    setLastAction("Reset analytics identity");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCaptureEvent}>Capture test event</Button>
        <Button onClick={handleIdentifyUser} variant="secondary">
          Identify test user
        </Button>
        <Button onClick={handleResetAnalytics} variant="secondary">
          Reset analytics identity
        </Button>
      </div>
      {lastAction && (
        <p className="text-sm text-muted-foreground">
          Last action: <span className="font-mono">{lastAction}</span>
        </p>
      )}
    </div>
  );
}

export default AnalyticsTestPanel;
