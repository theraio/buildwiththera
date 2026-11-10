# MCP Server Setup

This project ships an [`mcp.json`](./mcp.json) with the MCP servers we use: `context7`, `shadcn`, and `clickup`. Some of them need credentials before they'll connect. This doc explains how to get and configure each one.

## `context7` — no auth required

Fetches up-to-date library docs (Next.js, Tailwind, and anything else). Works out of the box, no credentials needed.

## `shadcn` — no auth required

Official shadcn/ui registry MCP (component browsing/installation). Works out of the box against the public `@shadcn` registry. If we ever add a private registry, credentials for that go in `components.json` (see [shadcn MCP docs](https://ui.shadcn.com/docs/mcp)), not here.

## `clickup` — official server, OAuth (no env vars)

We use ClickUp's own first-party MCP server (`https://mcp.clickup.com/mcp`, public beta, free on every plan), not a third-party package. It authenticates via OAuth, not an API key/env var:

1. Start Claude Code in this project and run `/mcp`.
2. Select `clickup` and follow the prompt — it opens a browser window to sign in to ClickUp and authorize access.
3. Credentials are cached after the first authorization; you won't be prompted again unless access is revoked.

Nothing needs to go in `.env` for this one. If auth ever breaks (revoked token, workspace change), just re-run `/mcp` and re-authorize.

## Troubleshooting

- Run `/mcp` in Claude Code to see connection status per server and surface auth errors.
- If `clickup` fails, re-run `/mcp` and re-authorize — it's almost always a stale/revoked OAuth session, not a config issue.
- Never paste real tokens into commits, PR descriptions, or ClickUp comments — if one leaks, revoke/rotate it immediately.
