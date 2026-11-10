# How to test the Sentry integration

All Sentry usage in this repo is centralized in [`widgets/telemetry`](./widgets/telemetry). Without a DSN configured, every call is a safe no-op — nothing is sent anywhere. Follow these steps to verify it actually reaches your Sentry project.

## 1. Get your Sentry values

From your Sentry project settings, you'll need:

- **DSN** — Settings → Projects → (your project) → Client Keys (DSN)
- **Org slug** and **project slug** — from the project URL (`sentry.io/organizations/<org>/projects/<project>/`)
- **Auth token** — Settings → Auth Tokens (needed for source map upload on build, not for runtime error reporting)

## 2. Add them to `.env.local`

Copy `.env.example` to `.env.local` (git-ignored, never committed) and fill in the Sentry section:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SENTRY_DSN=https://<key>@<org>.ingest.sentry.io/<project-id>
SENTRY_ORG=<your-org-slug>
SENTRY_PROJECT=<your-project-slug>
SENTRY_AUTH_TOKEN=<your-auth-token>
```

## 3. Restart the dev server

Env vars are only read at process start:

```bash
pnpm dev
```

## 4. Visit the test page

Go to [http://localhost:3000/telemetry-test](http://localhost:3000/telemetry-test) and try each button:

| Button | What it exercises |
| --- | --- |
| **Capture handled exception** | `captureException` from the client runtime, with an `errorName` and `tags` |
| **Capture message** | `captureMessage` from the client runtime |
| **Trigger server-side error** | A server action calling `captureException` from the server runtime |
| **Throw unhandled client error** | An intentional uncaught throw — not routed through our wrapper, so it instead proves `@sentry/nextjs`'s own global error handler (wired via `instrumentation-client.ts`) is active |

The first three render a "Last Sentry event id" once they're clicked. The fourth will show the Next.js dev error overlay.

## 5. Confirm in Sentry

Open your project's **Issues** page in Sentry — you should see four new issues (or events grouped into fewer issues) land within a few seconds of clicking. If nothing shows up:

- Double check `NEXT_PUBLIC_SENTRY_DSN` is set and the dev server was restarted after adding it.
- Check the browser console / terminal for any Sentry SDK errors.
- Ad-blockers can block requests to Sentry's ingest endpoint from the browser — try in an incognito window if the client-side events don't appear but the server-side one does.

`app/telemetry-test` is a dev-only page — it isn't linked from any navigation and has no effect in production beyond being a reachable route, so there's no need to remove it before shipping.
