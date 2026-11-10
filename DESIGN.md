---
version: alpha
name: Thera - Build with Thera
description: A high-contrast monochrome system — Thera ink (#1E1E1E) on white, inverted to white on ink for dark surfaces — with five saturated service colors (magenta, orange, lime, electric blue, violet) used as identity signals, never as decoration. Chillax, a rounded geometric sans from Fontshare, is the one and only typeface. The pentagon-of-nodes symbol drives the visual language: geometric precision, connected nodes, and a soft glow on the active node. Card geometry is generously rounded (2xl), buttons stay closer to the ground (md), and pills/avatars/progress go fully round.

colors:
  background: "var(--color-background)"
  foreground: "var(--color-foreground)"
  card: "var(--color-card)"
  card-foreground: "var(--color-card-foreground)"
  primary: "var(--color-primary)"
  primary-foreground: "var(--color-primary-foreground)"
  secondary: "var(--color-secondary)"
  secondary-foreground: "var(--color-secondary-foreground)"
  muted: "var(--color-muted)"
  muted-foreground: "var(--color-muted-foreground)"
  accent: "var(--color-accent)"
  accent-foreground: "var(--color-accent-foreground)"
  destructive: "var(--color-destructive)"
  destructive-foreground: "var(--color-destructive-foreground)"
  border: "var(--color-border)"
  input: "var(--color-input)"
  ring: "var(--color-ring)"
  service-sd: "var(--color-service-sd)"
  service-ux: "var(--color-service-ux)"
  service-ps: "var(--color-service-ps)"
  service-dv: "var(--color-service-dv)"
  service-qa: "var(--color-service-qa)"

typography:
  heading-1:
    fontFamily: Chillax
    fontSize: 60px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: Chillax
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: Chillax
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: Chillax
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: Chillax
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.3

rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  2xl: 16px
  full: 9999px

spacing:
  unit: 4px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
  card:
    backgroundColor: "{colors.card}"
    borderColor: "{colors.border}"
    rounded: "{rounded.2xl}"
  tooltip:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.xl}"
---

## Overview

Source of truth: the **thera LLC Brandbook** — brand strategy, logo system, color palette, typography and favicon set. This file translates it into UI tokens; where the brandbook is silent (UI grays, radii, elevation, component chrome) the rules below are this codebase's extension and are marked as such.

THERA comes from the Greek _therízō_ — "to harvest" — and from the Terabyte, the unit that stores what matters most. The brand pillars — **to grow together**, **to trust**, **to harvest** — translate into a UI that is clear, precise and human: a calm monochrome base where the five service colors appear only to say _which part of Thera_ you are looking at.

The core is strictly monochrome: **Thera ink** (`#1E1E1E`) on white, and white on ink for negative/dark surfaces. One typeface, **Chillax**, carries everything. The pentagon symbol — five connected nodes around a "t" — is the visual anchor: geometric forms for precision, nodes and connecting lines for the network between Thera and its clients.

**Key Characteristics:**

- Monochrome base: ink `#1E1E1E` + white. Positive, negative and grayscale are the only three logo treatments.
- Five service colors, one per service line, used as identity accents — never as general decoration or a second "brand" hue.
- Chillax is mandatory for all brand applications — no substitutions, no second family.
- Geometric, node-based motifs (pentagon, connected dots, lines); the active node may glow in its service color.
- Card radius (`{rounded.2xl}`, 16px) is deliberately softer than button radius (`{rounded.md}`, 6px) — echoes the rounded terminals of Chillax and the logo's round nodes.

## Colors

All values belong in `app/globals.css`: primitives and the semantic tokens that alias them, both in `@theme`. Components use the semantic names only, never primitives or raw hex values.

Raw scales (50→900, 500 = brand hex): `gray` (neutral, ink at 900), `error` (magenta), `warning` (orange), `success` (lime), `blue` (electric blue), `violet`. Every family is anchored on a brand color, so even status colors stay inside the Thera palette.

### Brand palette (from the brandbook)

| Name                    | Hex       | CMYK             | Role                                     |
| ----------------------- | --------- | ---------------- | ---------------------------------------- |
| Thera ink               | `#1E1E1E` | 0 / 0 / 0 / 88   | Primary brand color, text, positive logo |
| White                   | `#FFFFFF` | 0 / 0 / 0 / 0    | Page floor, negative logo                |
| Magenta (Software Dev.) | `#FF0055` | 0 / 100 / 67 / 0 | Service: Software Development            |
| Orange (UX/UI Design)   | `#FF6B00` | 0 / 74 / 100 / 0 | Service: UX/UI Design                    |
| Lime (Product Strategy) | `#9BD301` | 32 / 0 / 100 / 0 | Service: Product Strategy & Growth       |
| Electric blue (DevOps)  | `#0066FF` | 100 / 60 / 0 / 0 | Service: DevOps & Cloud Architecture     |
| Violet (QA & Testing)   | `#A020F0` | 32 / 86 / 0 / 6  | Service: Quality Assurance & Testing     |

> The brandbook labels the white swatch `Hex: #000000`; the swatch and CMYK (K 0%) are white, so `#FFFFFF` is the intended value.

### Semantic tokens

Grays between ink and white are not defined in the brandbook — they are this codebase's extension, kept strictly neutral (no warm or cool tint) to match the grayscale logo treatment.

| Token                            | Light     | Dark      | Use                                    |
| -------------------------------- | --------- | --------- | -------------------------------------- |
| `background`                     | `#FFFFFF` | `#1E1E1E` | Page floor                             |
| `card`                           | `#FFFFFF` | `#262626` | Cards, popovers                        |
| `secondary` / `muted`            | `#F4F4F4` | `#2E2E2E` | Secondary buttons, muted panels        |
| `accent`                         | `#EBEBEB` | `#383838` | Hover/highlight states                 |
| `border` / `input`               | `#DEDEDE` | `#3D3D3D` | Every structural line and input border |
| `foreground` / `card-foreground` | `#1E1E1E` | `#FFFFFF` | Headings and body                      |
| `muted-foreground`               | `#6E6E6E` | `#A3A3A3` | Secondary copy, captions               |
| `primary` / `ring`               | `#1E1E1E` | `#FFFFFF` | Primary action, active state, focus    |
| `primary-foreground`             | `#FFFFFF` | `#1E1E1E` | Text on primary                        |
| `destructive`                    | `#FF0055` | `#FF0055` | Destructive actions/states             |
| `destructive-foreground`         | `#FFFFFF` | `#FFFFFF` | Text on destructive                    |

### Brand

- **Primary** (`{colors.primary}`): Thera ink. Fills primary CTAs and active states. It inverts to white in dark mode, exactly like the negative logo.
- **Primary Foreground** (`{colors.primary-foreground}`): Text/icon on primary fills.

### Service colors

Each service line owns one color. Use it to tag, label or highlight content that belongs to that service — the service name under the logo, a node glow, a tag, a section accent. Never mix two service colors in one element, and never use a service color for generic UI (links, primary buttons, focus).

| Token                 | Hex       | Service                          | Meaning (brandbook)                         |
| --------------------- | --------- | -------------------------------- | ------------------------------------------- |
| `{colors.service-sd}` | `#FF0055` | Software Development (SD)        | Creation, drive, innovation, dynamism       |
| `{colors.service-ux}` | `#FF6B00` | UX/UI Design (UX)                | Empathy, connection, creativity, expression |
| `{colors.service-ps}` | `#9BD301` | Product Strategy & Growth (PS)   | Growth, evolution, direction, energy        |
| `{colors.service-dv}` | `#0066FF` | DevOps & Cloud Architecture (DV) | Stability, trust, precision, performance    |
| `{colors.service-qa}` | `#A020F0` | Quality Assurance & Testing (QA) | Detail, control, analysis, perfection       |

Contrast (WCAG ratio on white / on ink `#1E1E1E`): magenta 3.9 / 4.3, orange 2.9 / 5.8, lime 1.8 / 9.3, blue 4.8 / 3.5, violet 5.3 / 3.1. Only blue and violet pass AA for small text on white; only orange and lime pass on ink. Otherwise use service colors as fills, dots, glows or large text (≥24px, or ≥18.66px semibold) — lime on white fails even that. For small labels, set the text in `foreground` next to a service-colored marker.

### Semantic

- **Destructive** (`{colors.destructive}`): Brand magenta. The brandbook forbids colors outside the Thera palette, so destructive reuses `#FF0055` instead of a separate red. Always pair it with an icon or explicit copy so it isn't confused with the Software Development accent. It's 3.9:1 against white in both directions (magenta text on white, white text on a magenta fill), below AA for small text — prefer a magenta border or icon next to `foreground` copy.
- **Ring** (`{colors.ring}`): Focus ring, aliased to `primary`.
- No warning/success/info colors are defined by the brand. This codebase maps them onto the palette — warning → orange, success → lime, info → electric blue — as its own extension.

## Dark mode

- **Mechanism:** `next-themes` (`ThemeProvider` in `providers/theme-provider/`, `attribute="class"`, `defaultTheme="system"`) toggles `.dark` on `<html>`. `ThemeToggle` (`components/theme-toggle/`) is the switch.
- **Palette:** dark mode is the brand's _negative_ treatment — ink `#1E1E1E` floor, white text and primary. Values are in the semantic table above. The brand's dark presentation surfaces may fade ink into a deep violet/magenta gradient (see moodboard) — reserve that for hero/marketing sections, not app chrome.
- **Implementation:** `app/globals.css` declares `@custom-variant dark (&:where(.dark, .dark *))` and a `.dark` block that redefines only semantic tokens (plus `color-scheme: dark`).
- **Rule:** theme by token, not by class. Components shouldn't need `dark:` variants — fix the token in `.dark`. `dark:` is acceptable only for a one-off with no token (e.g. an illustration).
- **Elevation in dark:** shadows disappear on ink — floating layers add a subtle 1px white ring (`rgb(255 255 255 / 0.04–0.06)`).

## Typography

### Font Family

**Chillax** (Fontshare — <https://www.fontshare.com/fonts/chillax>) is the only typeface. It's a rounded geometric sans: minimal, balanced stroke weights, clean contours. The brandbook makes it mandatory for every brand and service application — **no substitutions or alterations**.

- Weights in use: 400 (body), 500 (UI emphasis), 600 Semibold (headings, labels, logo and service descriptors), 700 (rare, display only).
- Loading: self-hosted variable font `app/fonts/chillax-variable.woff2` (weights 200–700, ITF Free Font License in `app/fonts/chillax-license.txt`) via `next/font/local` in `app/layout.tsx`, exposed as `--font-chillax` and aliased to `--font-sans`. Fallback stack: `ui-sans-serif, system-ui, sans-serif`.
- Logo descriptors (e.g. "Software Development") are set in Chillax Semibold in their service color.

### Hierarchy

| Token                    | Classes                                             | Size                | Weight | Tracking | Use                     |
| ------------------------ | --------------------------------------------------- | ------------------- | ------ | -------- | ----------------------- |
| `{typography.heading-1}` | `text-4xl md:text-6xl font-semibold tracking-tight` | 36px → 60px (`md:`) | 600    | tight    | Page hero headline      |
| `{typography.title}`     | `text-lg font-semibold`                             | 18px                | 600    | normal   | Card/feature titles     |
| `{typography.label}`     | `text-sm font-semibold`                             | 14px                | 600    | normal   | Nav, small UI labels    |
| `{typography.body}`      | `text-lg`                                           | 18px                | 400    | normal   | Lead/body paragraphs    |
| `{typography.caption}`   | `text-xs`                                           | 12px                | 400    | normal   | Tooltip/badge microcopy |

### Principles

- **One family, weight does the work** — hierarchy comes from 400 vs 600, not from a second typeface.
- **Taglines use the underscore voice** — section subtitles in the brandbook are prefixed with `_` (e.g. "_Harvesting connection."), set in a lighter/italic style under a semibold headline. Use it for section kickers, sparingly.
- **Tighter tracking on the hero only**; Chillax's rounded forms get crowded at small sizes with negative tracking.

## Layout

### Spacing System

- **Base unit**: 4px (Tailwind's default scale).
- **Logo clear space** (brandbook): measured in **a** = the height of the lowercase "a" in the wordmark. Keep ½ a above and below, 1 a left and right. "LLC" sits ¼ a from the wordmark. Clear space scales with the logo — no fixed units.

### Grid & Container

- _Not yet defined._

### Responsive Strategy

- Default Tailwind breakpoints; `md:` is the primary responsive prefix.

## Elevation & Depth

| Level   | Treatment                                              | Use                                               |
| ------- | ------------------------------------------------------ | ------------------------------------------------- |
| 0       | Flat, no shadow                                        | Default page content                              |
| 1       | `shadow-sm`                                            | Resting cards                                     |
| 2       | `shadow-md`                                            | Card hover state                                  |
| 3       | `shadow-lg`                                            | Floating action button (chat launcher)            |
| 4       | `shadow-xl` / `shadow-2xl`                             | Tooltips, popovers, modals, the chat widget panel |
| Inverse | `{colors.foreground}` fill, `{colors.background}` text | Tooltips (ink chip on white page)                 |

Shadows are this codebase's extension. The brand's only "depth" effect is the **service glow**: a soft blurred halo in the service color on one node of the symbol. Use glow only on the symbol/node motif — never on text, buttons or the wordmark (the brandbook lists drop shadows, glows and 3D effects on the logo as incorrect applications).

## Shapes

### Border Radius Scale

| Token            | Value  | Use                                                             |
| ---------------- | ------ | --------------------------------------------------------------- |
| `{rounded.full}` | 9999px | Pills, avatars, progress bars, toggles, node dots, the chat FAB |
| `{rounded.2xl}`  | 16px   | Cards, feature tiles, modals, the chat widget panel             |
| `{rounded.xl}`   | 12px   | Secondary tiles, tooltips/popovers                              |
| `{rounded.lg}`   | 8px    | Badges/tags, smaller chrome, color swatches                     |
| `{rounded.md}`   | 6px    | Buttons, form inputs                                            |
| `{rounded.sm}`   | 4px    | Fine details                                                    |

### Motifs

- **Pentagon + nodes**: the symbol's geometry (five round nodes joined by straight strokes) can inspire dividers, diagrams and illustrations — circles at the joints, straight lines between them.
- **Network of nodes**: for backgrounds/illustrations, a sparse node-and-line network evokes the neural-connection moodboard. Keep it subtle behind content.

## Components

### Logo

- **Primary logo (imagotype)**: pentagon symbol with a "t" + **thera** wordmark + small "LLC".
- **Secondary logo**: wordmark only (**thera** + LLC).
- **Treatments**: positive (ink on white), negative (white on ink), grayscale. Print uses black, white or grayscale only.
- **Service variants (combination mark)**: the pentagon holds the service initials (SD, UX, PS, DV, QA) instead of the "t"; one node glows in the service color and the service name sits under the wordmark in Chillax Semibold, service color.
- **Minimum size** (digital / print): with LLC 32px / 8mm; without LLC 20px / 7mm; symbol only 20px / 5mm. Drop "LLC" whenever it isn't perfectly legible (favicons, footers, small UI).
- **Incorrect applications**: low-contrast backgrounds; stretching or distortion; drop shadows, glows or 3D effects on the logo; strokes/outlines/borders; rotation; colors outside the Thera palette.
- **Header**: primary logo without "LLC" (`public/brand/thera-horizontal.svg`, negative `thera-horizontal-white.svg` in dark mode) at 28px height — the symbol keeps the brand recognizable, and LLC is dropped below 32px per the brandbook.
- **Assets**: `public/brand/` holds the Thera header logos; the inherited Spar marks there (and `app/icon.svg`, `public/logo-mark.svg`, PWA icons) are still pending replacement with the Thera exports from the brandbook Drive folder (symbol, wordmark, per-service variants, favicon set for web, Windows, iOS and Android).

### Buttons

**`button-primary`**

- Fill `{colors.primary}`, label `{colors.primary-foreground}`, shape `{rounded.md}` (shadcn `Button` base chrome: `text-sm font-medium`, focus ring)
- Padding variants: `px-8 py-3` (standard CTA), `h-12` + `text-base` (larger hero CTA)

### Cards

**`card`**

- Fill `{colors.card}`, 1px `{colors.border}` border, shape `{rounded.2xl}`
- Padding variants: `p-6`, `p-7`, `px-8 py-7`
- Hover adds a `{colors.primary}` border and, on some tiles, lifts from `shadow-sm` to `shadow-md`. Service cards may use the service color for a top node/dot or label instead.

### Overlays

**`tooltip`**

- Inverse fill (`{colors.foreground}` background, `{colors.background}` text), `{rounded.xl}`, `shadow-xl`, `{typography.caption}` text
- Chat widget panel and modals follow the same logic at `{rounded.2xl}` and `shadow-2xl`

### Inputs & Forms

- `rounded-md border border-input bg-transparent text-foreground` — no filled input background. Sizes track `Button`'s (`sm` `h-9 px-3 text-xs`, default `h-10 px-4 text-sm`, `lg` `h-12 px-4 text-base`).
- Hover and focus `border-primary`; invalid (`aria-invalid`) `border-destructive` with a destructive focus outline; disabled `opacity-50`.

### Badges

- `rounded-full px-2.5 py-0.5 text-xs font-medium`, `size-3` icons. Variants: `primary`, `secondary`, `destructive`, `outline` (`border-foreground/30`). Service badges: neutral badge with a `size-2 rounded-full` dot in the service color.

### Other components (nav, data tables, etc.)

- _Not yet defined — extend this section as each component is built (see `components/ui/<name>/` constants)._

## Voice

- Bilingual brand (EN/ES, based in Buenos Aires); brand copy in the brandbook is English.
- Tone: close, clear, human, purposeful. Recurring vocabulary: _grow together, trust, harvest, seed, step by step, purpose, connection_.
- Tagline: **"Purpose-driven software for meaningful growth."**

## Do's and Don'ts

### Do

- Keep the base monochrome: ink `#1E1E1E` and white, inverted for dark.
- Use Chillax for everything — headings, body, UI, logo descriptors.
- Use each service color only to identify its service.
- Round cards more than buttons — `{rounded.2xl}` containers holding `{rounded.md}` actions.
- Respect logo clear space (½ a vertical, 1 a horizontal) and minimum sizes; drop "LLC" when it's small.
- Theme with semantic tokens; check every new screen in light **and** dark.

### Don't

- Don't introduce colors outside the Thera palette (grays between ink and white are the only exception).
- Don't use a service color as a generic accent, link color or primary button.
- Don't set small text in magenta, orange or lime on white — it fails contrast (see Service colors).
- Don't substitute or pair Chillax with another typeface.
- Don't add shadows, glows, outlines, rotation or distortion to the logo.
- Don't hard-code `bg-white`, `text-black`, primitives or hex colors in components; they break dark mode.
