# Contributing to Spar

This document describes how we collaborate on this project: our GitHub workflow, branch naming convention, and commit message convention.

## Conventional Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) for **both commit messages and branch names**.

The core types we use:

| Type       | Use for                                                              |
| ---------- | -------------------------------------------------------------------- |
| `feat`     | A new feature                                                        |
| `fix`      | A bug fix                                                            |
| `hotfix`   | An urgent fix applied outside the normal release flow                |
| `chore`    | Maintenance work that doesn't affect app behavior (deps, configs...) |
| `docs`     | Documentation only changes                                           |
| `style`    | Formatting, whitespace, missing semicolons, etc. (no code change)    |
| `refactor` | Code change that neither fixes a bug nor adds a feature              |
| `perf`     | Performance improvement                                              |
| `test`     | Adding or correcting tests                                           |
| `ci`       | Changes to CI configuration/scripts                                  |
| `build`    | Changes to the build system or external dependencies                 |

## Branching workflow

- **`main`** is our entry point and the only long-lived branch. It should always be deployable.
- Every branch is cut **from `main`**.
- All work happens on short-lived branches that get merged back into `main` via Pull Request.
- Once a PR is merged, delete the branch if it is not delete automatically.

### Branch naming convention

```
[type]/CU-[ticket-id]-[descriptive-branch-name]
```

- **type**: one of `feat`, `fix`, `hotfix`, `chore`, `docs`, `refactor`, `test`, `ci`, `build`, etc. (see table above).
- **CU-[ticket-id]**: the related ClickUp ticket ID.
- **descriptive-branch-name**: short, kebab-case summary of the work.

#### Examples

```bash
# New feature, ClickUp ticket CU-86dv1a2
git checkout main
git pull
git checkout -b feat/CU-86dv1a2-agent-dashboard-filters

# Bug fix, ClickUp ticket CU-86dv3b7
git checkout main
git pull
git checkout -b fix/CU-86dv3b7-login-redirect-loop

# Urgent production hotfix, ClickUp ticket CU-86dv9k1
git checkout main
git pull
git checkout -b hotfix/CU-86dv9k1-crash-on-empty-payload

# Chore, ClickUp ticket CU-86dv0z4
git checkout main
git pull
git checkout -b chore/CU-86dv0z4-upgrade-next-to-16
```

### Typical flow

1. Sync `main`:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Create your branch off `main` following the naming convention above.
3. Commit your work using Conventional Commits (see below).
4. Push your branch and open a Pull Request into `main`.
5. Address review feedback with additional commits (avoid force-pushing over reviewed history unless requested).
6. Once approved and checks pass, merge the PR (squash preferred, so the PR title — itself a Conventional Commit — becomes the commit on `main`).
7. Delete the branch after merge.

## Commit message convention

Commits also follow Conventional Commits:

```
[type](scope): short summary

optional longer body

optional footer(s)
```

- Use the imperative mood: "add", not "added" or "adds".
- Keep the summary line concise (~50-72 chars).
- Reference the ClickUp ticket in the footer when useful, e.g. `Refs: CU-86dv1a2`.
- Use `!` after the type (or a `BREAKING CHANGE:` footer) for breaking changes, e.g. `feat!: drop support for Node 16`.

#### Examples

```bash
git commit -m "feat(dashboard): add filter by agent status"

git commit -m "fix(auth): stop redirect loop after expired session"

git commit -m "hotfix(api): guard against empty payload crash"

git commit -m "chore(deps): upgrade next to 16.3.6"

git commit -m "docs: document branching and commit conventions"

git commit -m "feat(api)!: rename /agents endpoint to /Spars

BREAKING CHANGE: consumers must update to the new endpoint path.
Refs: CU-86dv4c2"
```

## Pull Requests

A PR is not just a place to hand off code — it's **evidence** that the change works and is production-ready. A reviewer should be able to approve from the PR itself, without pulling the branch down to find out if it builds or looks right.

- PR title should also follow Conventional Commits, since it becomes the squash commit message on `main`.
- Link the related ClickUp ticket in the PR description.
- Keep PRs focused and scoped to a single ticket/change where possible.

### Every PR is created with the `create-draft-pr` skill — no exceptions

All pull requests are standardized through [`.github/pull_request_template.md`](.github/pull_request_template.md) and must be created by invoking the [`create-draft-pr`](.claude/skills/create-draft-pr/SKILL.md) skill (`/create-draft-pr`), never by running `gh pr create`/opening the "New PR" page manually. The skill:

- always opens the PR as a **Draft**,
- populates the template straight from git context (diff, commits, branch name, `CODEOWNERS`),
- keeps every PR structured the same way, so reviewers know exactly where to look.

Only mark the PR "Ready for review" (undraft it) once the evidence below is in place.

### Evidence bar — required for approval

**A PR without evidence of a green build, green types, green tests, and (for anything user-facing) a screenshot/video of the change working will not be approved.** This isn't optional polish — it's how we guarantee what's being shipped is actually working, not just "looks right in the diff."

Before undrafting, run locally and paste the results (or a passing CI check run) into the **Testing** section of the PR:

```bash
pnpm build            # build is green
pnpm exec tsc --noEmit  # types are green
pnpm lint              # lint is green
pnpm test              # tests are green (once a test suite exists for the touched code)
```

- Paste the final passing output (or a link to the green CI run) — not just "✅ works on my machine".
- If a check doesn't apply (e.g. no tests exist yet for the touched code), say so explicitly rather than leaving it blank.

For any UI/behavioral change, attach a screenshot or short screen recording under **Screenshots 📸** showing the change working end-to-end (happy path, and the specific bug/edge case if it's a `fix`). Reference recordings/images and attach them directly to the ClickUp ticket and link it.

Reviewers should reject/request changes on any PR missing this evidence rather than approving on trust.
