import TelemetryTestPanel from "./_components/telemetry-test-panel";
import type { Metadata } from "next";

// Dev-only tooling: keep it out of search results.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function TelemetryTestPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-20 sm:px-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-sans text-2xl font-bold tracking-tight">
          Telemetry test
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Dev-only page for exercising{" "}
          <span className="font-mono">widgets/telemetry</span> against a real
          Sentry project. Set{" "}
          <span className="font-mono">NEXT_PUBLIC_SENTRY_DSN</span> in{" "}
          <span className="font-mono">.env.local</span> to see events land in
          Sentry — otherwise every call below is a safe no-op.
        </p>
      </div>
      <TelemetryTestPanel />
    </div>
  );
}
