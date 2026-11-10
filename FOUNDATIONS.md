# Foundations

This document is the code-level rulebook for this project: how files are named, how code is organized on disk, and the conventions every PR is expected to follow. It complements [`DESIGN.md`](./DESIGN.md) (visual tokens) and [`CONTRIBUTION.md`](./CONTRIBUTION.md) (git/PR workflow) — this file is about the code itself.

If a rule here is missing or ambiguous for a case you're working on, raise it instead of guessing — then add the resolution back to this document.

## Principles

- **Check for shared code before creating anything new.** Search `components/ui/`, `components/`, `utils/`, `_constants/`, `_types/`, and `components/icons/` for an existing component, util, type, or constant that already does the job — reuse or extend it instead of writing a parallel one.
- **Prefer shared over duplicated.** If a piece of code is (or could be) reused by any other component, extract it into a shared component/util/type/constant rather than copying it. Duplication is never the default.
- **KISS and SOLID.** Keep each unit as simple as the requirement allows — no speculative abstractions or preemptive options. Each file/component/function has a single responsibility; extend through props and composition rather than editing a unit to special-case one consumer; depend on small, focused interfaces (props types) rather than whole objects a component doesn't need.
- **Strict TypeScript.** `strict: true` in `tsconfig.json` stays on. Type everything explicitly at module boundaries (props, util params/returns, exported constants); no `any`, no `@ts-ignore`/`@ts-expect-error` to silence an error — fix the type instead.

## File naming

File names are **descriptive and kebab-case, with no type segment** before the extension — the name says what the file is about, not what kind of file it is:

```
<descriptive-name>.<ext>
```

| Instead of                  | Write                 |
| --------------------------- | --------------------- |
| `avatar.component.tsx`      | `avatar.tsx`          |
| `get-avatar-label.utils.ts` | `get-avatar-label.ts` |
| `use-debounce.hook.ts`      | `use-debounce.ts`     |
| `theme-options.constant.ts` | `theme-options.ts`    |
| `billing.service.ts`        | `billing.ts`          |

**Exception — tooling suffixes stay.** Vitest and Storybook find files by suffix, so these keep their segment:

| Suffix    | Use for                                                                      | Example               |
| --------- | ---------------------------------------------------------------------------- | --------------------- |
| `spec`    | Behavior-level test — what the feature/component should do (preferred)       | `avatar.spec.tsx`     |
| `test`    | Narrow unit test for an isolated function/hook, only when a spec doesn't fit | `format-date.test.ts` |
| `stories` | Storybook story                                                              | `avatar.stories.tsx`  |

Never use PascalCase or camelCase file names (no `Avatar.tsx`, no `getAvatarLabel.ts`).

**Generic vs. descriptive names:**

- **Inside a component's own folder**, a single file of a kind uses the generic name — `types.ts`, `constants.ts`, `utils.ts`, `mocks.ts` — because the folder already says what it belongs to. Once there's more than one file of a kind, they move into a kind folder and take descriptive names (see **Folder structure** below).
- **Hooks are always named after the hook** (`use-filters.ts`), never a generic `hooks.ts`.
- **Shared code** (types, utils/helpers, constants used by more than one component or feature) gets a specific, descriptive name — `get-label.ts`, `theme-options.ts`, `user.ts` — since there's no owning folder to give it context.

## Folder structure

**One component = one folder** holding every file that component needs — its types, constants, utils, mocks, spec, story, and `index.ts` — flat, side by side:

```
avatar/
  avatar.tsx          # the component only — default export
  types.ts            # AvatarProps and any other types it needs
  constants.ts        # its constants
  utils.ts            # its helpers
  mocks.ts            # its test fixtures / mock data
  avatar.spec.tsx
  avatar.stories.tsx
  index.ts
```

- **Component, types, and constants (mocks included) are always separate files — never combined, no exceptions.** Even a single `Props` interface or a single exported constant gets its own file. Only create the files the component actually needs — no empty placeholder files.
- **One file of a kind sits flat; more than one gets a kind folder.** A single util/type/constant/mock file sits next to the component under its generic name (`utils.ts`). As soon as a component needs a second file of the same kind, all files of that kind move into an unprefixed kind folder named for it — `utils/`, `hooks/`, `types/`, `constants/`, `mocks/` — each with a descriptive name. Their tests move with them:

  ```
  data-filter/
    data-filter.tsx
    types.ts
    index.ts
    hooks/
      use-filters.ts
      use-filters.spec.ts
      use-data-filter-state.ts
    utils/
      data-filtering.ts
      data-filtering.test.ts
      data-filter-query.ts
  ```

  These kind folders take no `_` prefix (that's reserved for route kind folders, below) and have no `index.ts`: import the file directly (`./utils/data-filtering`).

- **A sub-component is its own component**, so it gets its own folder nested inside its parent's (or in a `_components/` folder for route-local components — see below), following the same shape.
- Each folder's own `index.ts` re-exports whatever that folder needs to expose — at minimum the component's default export, plus any named exports (e.g. a shared `ButtonProps` type) other files are allowed to use.
- `components/ui/` is the design-system layer (see **UI library components** below) and has a single root barrel, `components/ui/index.ts`, that re-exports every component **by name** from its folder:

  ```ts
  // components/ui/index.ts
  export { default as Button } from "./button";
  export { default as Card } from "./card";
  ```

  This is what makes `import { Button, Card } from "~/components/ui"` work. Consumers outside `components/ui/` import from this root barrel, not from a component's own folder path.

- **Shared utils/helpers** live in `utils/`, one folder per utility group, with a descriptive file name:

  ```
  utils/date/
    format-date.ts
    format-date.spec.ts
    index.ts
  ```

  There is **no** single root `utils/index.ts` aggregating every group — that would get unwieldy as the number of utility groups grows and would defeat tree-shaking/clarity. Consumers import directly from the group's own folder: `import { formatDate } from "~/utils/date"`.

  **`utils/` vs `lib/`**: `utils/` is the one home for this pattern — both wrapped third-party dependencies (`utils/date` wrapping `date-fns`, `utils/local-storage`) and pure first-party helpers with no external dependency (`utils/cn`, `utils/create-namespace-component`) live here, one folder per group. `lib/` was this convention's earlier name and is retired — don't create `lib/<name>/` folders.

- Feature-specific components that aren't part of the shared design system live closer to where they're used (`app/<route>/_components/<name>/`), following the same one-folder-per-component and naming rules, but are **not** subject to the UI-library-only requirements (namespace, snapshot test, story) below. This is the confirmed convention — not a shared `components/<feature>/` folder — for every route-local feature.

### Grouping by kind (route folders)

Component folders are flat (see above). Route folders (`app/<route>/`) are **not** a component — they hold **only their entry files** at the root; every other file goes into a `_`-prefixed folder named for its kind.

**Entry files** — the only files allowed at the root of a route folder: Next.js route files only (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`).

**Kind folders:**

| Folder         | Holds                                                                   |
| -------------- | ----------------------------------------------------------------------- |
| `_components/` | Route-local components, one folder per component (`_components/board/`) |
| `_hooks/`      | Custom React hooks                                                      |
| `_constants/`  | Constants shared across the route's components                          |
| `_types/`      | Types shared across the route's components                              |
| `_schemas/`    | Validation schemas (e.g. Zod)                                           |
| `_utils/`      | Utils/helpers shared across the route's components                      |
| `_mocks/`      | Test fixtures/mock data shared across the route's components            |
| `_services/`   | API/data-access calls                                                   |
| `_actions/`    | Server Actions (`"use server"`) used by the route                       |
| `_contexts/`   | React context providers                                                 |

Rules for kind folders:

- Since file names carry no type segment, files inside kind folders use descriptive names (`_constants/order-filter-fields.ts`, `_types/order.ts`).
- Something used by only one component belongs in that component's folder, not in a kind folder.
- **Tests and stories stay next to the file they cover**, inside the same kind folder (`_utils/email-body.ts` + `_utils/email-body.test.ts`) — never in their own `_specs/`/`_tests/` folder.
- **Only create the folders a feature actually needs** — no empty or placeholder kind folders.
- **Always use the `_` prefix** in route folders — inside `app/` it also marks the folder as private so Next.js never treats it as a route segment. Kind folders inside a component folder are the exception: unprefixed (see **Folder structure** above).
- **No `index.ts` barrel inside a kind folder** — import the file directly (`~/app/work-orders/_types/order`). A folder's single public `index.ts` (when it has one) lives at its root and re-exports from the kind folders.
- A helper that's genuinely cross-feature (used by more than one route or feature) belongs in a top-level `utils/<group>/`, not duplicated per feature or reached into from another feature's kind folder.

Reference layout — `app/work-orders/`:

```
app/work-orders/
  page.tsx
  _components/
    work-orders-board/
      work-orders-board.tsx
      types.ts
      constants.ts
      work-orders-board.spec.tsx
      work-orders-board.stories.tsx
      index.ts
    order-detail-sheet/
      order-detail-sheet.tsx
      types.ts
      utils.ts
      order-detail-sheet.spec.tsx
      index.ts
  _constants/
    order-filter-fields.ts
    order-filter-fields.spec.ts
  _utils/
    email-body.ts
    email-body.test.ts
  _types/
    order.ts
  _schemas/
    order.ts
  _mocks/
    orders.ts
```

A shared feature component outside `components/ui/` is a component folder like any other:

```
components/sidebar/
  sidebar.tsx
  types.ts
  constants.ts
  sidebar.spec.tsx
  sidebar.stories.tsx
  index.ts
```

## Components

- **Always `export default`.** One component per file; the default export is that component.
- Non-component files (utils, constants, types, services, etc.) use **named exports** — a default export doesn't make sense when a file can legitimately hold more than one util/type/constant.
- Props types are named `<ComponentName>Props` and always live in the component's `types.ts` — never inline in the component file.
- **Explain complex code, not the component.** Add a short comment above any non-obvious logic (tricky state transitions, workarounds, non-trivial calculations) describing what it does and why. **Do not** add a comment block at the top of the file describing what the component is or does — the name, props type, and story cover that.

### UI library components (`components/ui/`)

Components in `components/ui/` are the shared design system — anything meant to be composed across features (hand-built or vendored, e.g. shadcn-style primitives). They carry extra requirements:

1. **Namespace when composition needs more than one part.** If a component is made of sub-parts (e.g. `Card` with a header/body/footer), attach the sub-components to the default export instead of exporting each separately — via the shared `createNamespaceComponent` util (`~/utils/create-namespace-component`), not manual assignment:

   ```tsx
   // card.tsx
   import { createNamespaceComponent } from "~/utils/create-namespace-component";

   function Card({ children }: CardProps) {
     /* ... */
   }
   function CardHeader({ children }: CardHeaderProps) {
     /* ... */
   }
   function CardBody({ children }: CardBodyProps) {
     /* ... */
   }

   export default createNamespaceComponent(Card, {
     Header: CardHeader,
     Body: CardBody,
   });
   ```

   Consumers then write `<Card.Header>` / `<Card.Body>` off a single import. Skip the namespace for a component with no sub-parts — don't add one preemptively.

2. **Split into a `<name>-core` primitive layer plus a smart `<name>` layer for a "complex" component — one that wraps a headless/primitive library (Radix, cmdk, etc.) across more than one sub-part (`Root`/`Trigger`/`Content`/...) _and_ is worth giving a simplified, opinionated public API on top of that raw composition.** A "simple" component — a single interactive element, however many `cva` variants it has — stays flat (`Button`, `Input`). Don't apply the two-layer split preemptively to a simple component, and don't flatten a complex one just to cut files.

   - **`<name>-core`** is a thin, namespaced restyling of the raw primitive(s) against `DESIGN.md` tokens — no business logic, one function per primitive part, attached via `createNamespaceComponent` (point 1 above). It's always namespaced, since its whole job is exposing the primitive's sub-parts.
   - **`<name>`** is the smart layer: it consumes the `-core` namespace internally and exposes a simplified, prop-driven API instead of making every consumer hand-assemble sub-parts — e.g. `Combobox`'s `options`/`value`/`onValueChange` instead of composing `ComboboxCore.Trigger`/`ComboboxCore.Item` by hand, or `Tooltip`'s `content`/`children` instead of composing `TooltipCore.Trigger`/`TooltipCore.Content`. It owns any controlled/uncontrolled state (the `open`/`onOpenChange` pattern in `combobox.tsx`/`tooltip.tsx`). It's only namespaced itself if it exposes further composition beyond its props — `Combobox`/`Tooltip` aren't.
   - Each layer is its own component, so each gets its own folder with its own `types.ts` (one component = one folder) — the `-core` folder nests inside the smart layer's:

     ```
     components/ui/combobox/
       combobox.tsx
       types.ts
       combobox.spec.tsx
       combobox.stories.tsx
       index.ts
       combobox-core/
         combobox-core.tsx
         types.ts
         index.ts
     ```

   - The smart layer's `index.ts` exports both (`export { default as Combobox } from "./combobox"; export { default as ComboboxCore } from "./combobox-core";`) — the smart layer is what app code reaches for; the `-core` export exists for the rare case a consumer needs the raw primitive composition directly.
   - Only the smart layer needs its own `.spec.tsx`/`.stories.tsx` (points 3–4 below) — the `-core` layer is exercised indirectly through it, the same way `ComboboxCore`/`TooltipCore` have no spec/story files of their own.

3. **A spec test is required** (`<name>.spec.tsx`) covering what the component should do, at minimum rendering it (and its meaningful variant/prop combinations) and asserting against a snapshot. For a two-layer complex component (point 2 above), this is the smart layer's spec only — the `-core` layer has no spec of its own.
4. **A Storybook story is required** (`<name>.stories.tsx`) covering the component's primary states/variants, co-located next to the component (e.g. `components/ui/button/button.stories.tsx`). Every story gets a docs page automatically (`tags: ["autodocs"]` is set globally in `.storybook/preview.tsx`) — no per-story opt-in needed. For a two-layer complex component (point 2 above), this is the smart layer's story only — the `-core` layer has no story of its own.
   - If the component has more than one variant/size axis, include an `AllVariants` story that renders every combination in one canvas, **grouped by variant** (a heading per variant, with that variant's sizes/states in a row underneath) rather than one flat grid — see `button.stories.tsx` for the pattern. Export it **first**, immediately after `export default meta`, so it's always the story directly after "Docs" in the sidebar — the fastest way to eyeball the whole component at once, and a single snapshot target for Chromatic.

The component/types/constants split from **Folder structure** applies here as everywhere — e.g. `button.tsx` imports `ButtonProps` from `types.ts` and `buttonVariants` (the `cva` map) from `constants.ts`; `types.ts` may import from `constants.ts` (e.g. `VariantProps<typeof buttonVariants>`).

#### shadcn-sourced components

Some `components/ui/` components are adapted from [shadcn/ui](https://ui.shadcn.com). For these:

- **Manual installation only — never the shadcn CLI.** Copy/adapt the component's source by hand into this project's own file layout and naming convention (never `npx shadcn add`). **No `components.json` is ever added to this repo** — that file only exists to configure the CLI, which we don't use.
- **[Radix UI](https://www.radix-ui.com/primitives) is the headless primitive library** behind these components (e.g. `@radix-ui/react-slot` for `asChild`, `@radix-ui/react-dialog` for a future `Dialog`, etc.) — install the specific `@radix-ui/react-*` package the component needs, not a bundled meta-package.
- **Variants are restyled against `DESIGN.md`, not shadcn's default palette.** Keep shadcn's structural pattern (`cva` for variants, the `asChild`/`Slot` escape hatch, the overall prop shape) but map every color/radius/spacing value to this project's own design tokens (`app/globals.css` `@theme` + `DESIGN.md`). Where `DESIGN.md` doesn't confirm a value (e.g. an untested size), extrapolate conservatively from confirmed values and leave a one-line comment noting it's extrapolated.
- **Shared styling utility**: `cn()` (`clsx` + `tailwind-merge`) lives at `~/utils/cn`, following the standard `utils/<group>/` pattern — import it rather than re-implementing class merging per component.

## Constants

- **File**: a component's own constants go in its `constants.ts`; shared constants get a descriptive kebab-case file — `theme-options.ts`.
- **Exported identifier**: `UPPER_SNAKE_CASE`, matching the constant's subject — `THEME_OPTIONS`.

```ts
// theme-options.ts
export const THEME_OPTIONS = {
  light: "light",
  dark: "dark",
} as const;
```

## Documentation

- **Every util/helper function gets a JSDoc comment** — whether it lives in a component's `utils.ts`, a kind folder, or a shared `utils/<group>/`. Describe what the function does, then `@param` for each parameter and `@returns` for the return value.

  ```ts
  /**
   * Merges Tailwind class names, resolving conflicting utility classes (via
   * `tailwind-merge`) after combining conditional class values (via `clsx`).
   *
   * @param inputs - Class values: strings, conditionals, arrays, etc.
   * @returns The merged, conflict-resolved class string.
   */
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```

- Components don't get a JSDoc block or a top-of-file description — instead, comment the complex code inside them (see **Components** above).

## Wrapping third-party dependencies

If a dependency's API will be called from more than one place in the codebase, don't import it directly at every call site — wrap it once so swapping the dependency later means editing one file, not hunting down every usage.

- **Non-UI dependency** (date formatting, analytics client, currency math, etc.) → a `utils/<group>/` folder (see **Folder structure** above) wrapping the specific `date-fns`/`dayjs`/etc. functions actually used, and the rest of the app imports from `~/utils/<group>`, never from the library directly.
- **Infra dependency needing framework-level entry points** (an APM/error-tracking client like Sentry that Next.js wires up via root files such as `instrumentation.ts`/`instrumentation-client.ts`/`sentry.server.config.ts`/`sentry.edge.config.ts`/`next.config.ts`) → a top-level `widgets/<name>/` folder (e.g. `widgets/telemetry/`), same `index.ts` barrel pattern as `utils/`. The root files Next.js (or the vendor's own convention) requires stay at project root (resolved by fixed path, they can't move), but each is a one-line delegate into `widgets/<name>/` — all actual vendor logic and every direct import of the vendor package lives in the widget, never duplicated or re-imported at the root. Don't confuse this with `components/` — it holds no UI.

  This also covers a dependency that requires a Next.js route file at a framework-fixed path (e.g. `app/api/trpc/[trpc]/route.ts` for tRPC) — not only root config files like `instrumentation.ts`. The route file stays a one-line delegate into the widget, same as the config-file case.

  A widget that needs genuinely separate server-only and client-only surfaces (e.g. one half importing `next/headers` or a server SDK, the other half marked `"use client"`) may split into `widgets/<name>/index.ts` (server-safe) and `widgets/<name>/client/index.ts` (client-only) instead of one barrel re-exporting both. `widgets/trpc/client` wraps both `@trpc/react-query` and `@tanstack/react-query` behind a single `trpc` proxy (`trpc.health.ping.useQuery()`) — app code imports `trpc` from `~/widgets/trpc/client`, never `@tanstack/react-query` directly. tRPC routers are named after their namespace (`health.ts`).

- **UI dependency** (a chart library, a rich text editor, a map widget) → a component under `components/widgets/` following the normal one-folder-per-component + default-export rules, e.g. `components/widgets/chart/chart.tsx`, wrapping the vendor component behind this project's own props.
- **Icons** (`lucide-react`) → `components/icons/`, one file per icon (e.g. `components/icons/check.tsx` exporting `CheckIcon`), re-exported from `components/icons/index.ts`. Every icon takes the shared `IconProps` (`components/icons/icon-props.ts`) — a deliberately curated subset of lucide's props (`size`, `color`, `strokeWidth`, `className`, `aria-hidden`, `aria-label`), not a full SVG-attributes passthrough. Import icons from `~/components/icons`, never `lucide-react` directly.

Rule of thumb: if grepping the codebase for the raw package name turns up more than one call site outside of `utils/`, `widgets/`, `components/widgets/`, or `components/icons/`, it should have been wrapped.

## Imports

- Use the `~/*` path alias (configured in `tsconfig.json`) for any cross-folder import; relative imports (`./`, `../`) are reserved for files within the same folder.

## Testing & tooling

- **Spec tests are preferred over narrow unit tests.** Default to a `.spec.ts`/`.spec.tsx` file that describes what a feature is supposed to do — the behavior a user or caller observes — rather than its internal implementation. Reach for a plain `.test.ts` only for an isolated pure function/hook that doesn't warrant a full behavior spec (see **File naming** above).
- **Every feature must ship with a spec test** covering what it should do — no feature merges without one.

  > **Human-readability note — AI agents can skip this, it's obvious to you:** a **unit test** exercises one isolated function/method/hook in isolation (often with mocked dependencies) to check its internal correctness and edge cases. A **spec test** exercises a feature's observable behavior the way a consumer would use it — "given X, when Y, it should Z" — independent of how it's implemented internally, so it keeps passing across refactors as long as the behavior doesn't change.

- **Coverage bar for a PR, best to worst:**

  | Coverage          | Verdict                                                                                                                                    |
  | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
  | Spec + unit tests | Ideal — behavior is covered end-to-end, and the tricky internals get unit-level coverage too.                                              |
  | Spec test only    | Good — meets the bar on its own.                                                                                                           |
  | Unit test(s) only | Acceptable only when a spec genuinely doesn't apply — e.g. a pure utility with no user-observable "feature" behavior to spec against.      |
  | No tests          | Rejected, unless the PR description explains why testing doesn't apply to this change — without that explanation, it will not be approved. |

- **Test runner**: Vitest + React Testing Library (`pnpm test`, `pnpm test:watch`, `pnpm test:update` to rewrite snapshots). See `vitest.config.mts`.
- **Storybook**: required for every `components/ui/` component (see above). `.storybook/main.ts` scans `components/**/*.stories.tsx` and `app/**/*.stories.tsx` for per-component stories — those stay co-located, never in a shared folder. The one exception is `stories/`: a top-level folder reserved for **global, non-component documentation** (`.mdx` only, e.g. `stories/foundations.mdx` — the rendered counterpart of `DESIGN.md`) that doesn't belong to any single component.
  - `pnpm storybook` — local dev server (port 6006).
  - `pnpm build-storybook` — static build, output to `storybook-static/` (git-ignored).
  - `pnpm test:storybook` — runs every story as a Vitest component test in a real browser (Playwright/Chromium), via `@storybook/addon-vitest`. `pnpm test` already runs this project alongside the regular spec/unit suite, so no extra step is needed in CI.
  - `pnpm chromatic` — publishes a build to [Chromatic](https://www.chromatic.com) for cloud visual regression (pixel diffing across stories). Requires a `CHROMATIC_PROJECT_TOKEN` (from the project's Chromatic settings) set as an env var — not yet configured for this repo; set it up before relying on this script in CI.
  - Addons installed: `@storybook/addon-docs` (autodocs + Controls, both built on top of it), `@storybook/addon-vitest` (component/interaction testing), `@chromatic-com/storybook` (in-Storybook panel for the Chromatic integration above). `@storybook/addon-storysource` was deliberately skipped — it predates Storybook's v9 addon API and is unmaintained; addon-docs' own "Show code" panel on each story covers the same need.
  - Framework: `@storybook/nextjs-vite` (Vite-based, Storybook's current recommended default for Next.js — faster than the webpack-based `@storybook/nextjs`).
  - **`.mdx` files can't resolve the `~/*` alias** (a tooling limitation of the MDX/Vite pipeline, confirmed — plain `.tsx` stories resolve it fine). Use a relative import instead when pulling a component into an `.mdx` doc (e.g. `import { Button } from "../components/ui"`); this is the one place in the codebase where the "always use `~/*` for cross-folder imports" rule doesn't apply.
  - The sidebar is pinned with `Foundations` first, then `UI`, via `options.storySort.order` in `.storybook/preview.tsx` — keep any new top-level doc page's title ahead of component groups in that list if it should also lead the sidebar.

## Open questions

These are flagged rather than decided — resolve and move them into the sections above once answered:

_None right now._
