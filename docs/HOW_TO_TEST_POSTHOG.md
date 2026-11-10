# How to test the PostHog integration

All PostHog usage in this repo is centralized in [`widgets/analytics`](./widgets/analytics). Without a key configured, every call is a safe no-op — nothing is sent anywhere. Follow these steps to verify it actually reaches your PostHog project.

## 1. Get your PostHog values

From your PostHog project settings (**Project settings → Project API key**), you'll need:

- **Project API key** — starts with `phc_`
- **API host** — `https://us.i.posthog.com` (US cloud, the default) or `https://eu.i.posthog.com` (EU cloud), or your self-hosted instance's URL

## 2. Add them to `.env.local`

Copy `.env.example` to `.env.local` (git-ignored, never committed) and fill in the PostHog section:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_POSTHOG_KEY=phc_<your-project-key>
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

`NEXT_PUBLIC_POSTHOG_HOST` can be left blank to use the US cloud default.

## 3. Restart the dev server

Env vars are only read at process start:

```bash
pnpm dev
```

## 4. Visit the test page

Go to [http://localhost:3000/analytics-test](http://localhost:3000/analytics-test) and try each button:

| Button                      | What it exercises                                  |
| ---------------------------- | --------------------------------------------------- |
| **Capture test event**       | `captureEvent` with custom properties                |
| **Identify test user**       | `identifyUser`, associating subsequent events with a known identity |
| **Reset analytics identity** | `resetAnalytics`, clearing the identified user       |

Each click updates the "Last action" line on the page once it's fired.

## 5. Confirm pageview capture

Navigate between pages (e.g. back to `/` and then back to `/analytics-test`) using the browser's address bar or links — client-side route changes are captured automatically via `capture_pageview: "history_change"`, no manual tracking call needed.

## 6. Confirm in PostHog

Open your project's **Activity → Events** view in PostHog — you should see `analytics_test_event`, `$identify`, and `$pageview` events land within a few seconds. If nothing shows up:

- Double check `NEXT_PUBLIC_POSTHOG_KEY` is set and the dev server was restarted after adding it.
- Check the browser console for any PostHog SDK errors.
- Ad-blockers commonly block requests to PostHog's ingest endpoint from the browser — try in an incognito window if events don't appear.

`app/analytics-test` is a dev-only page — it isn't linked from any navigation and has no effect in production beyond being a reachable route, so there's no need to remove it before shipping.
