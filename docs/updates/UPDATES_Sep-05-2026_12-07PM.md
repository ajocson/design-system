# Design System Repository Baseline

## Current state

This repository contains a reusable Angular Design System with token-driven, accessible components, colocated tests, and Storybook documentation. The current working tree contains the Preview-removal and Storybook migration changes described below; these changes are not committed.

Reusable components currently include Button, Progress Bar, Progress Indicator, Stepper, and Tag under `src/app/shared/components/`. Shared tokens and theme mappings remain in `src/styles.scss`.

## Meaningful changes in the working tree

- User-facing branding was changed from “TDX Design System” to “Design System” in README and visible documentation.
- Existing `tdx-*` selectors/classes, `Tdx*` symbols, and `TDX_*` constants were intentionally preserved for technical compatibility.
- The standalone Angular Preview application, routes, bootstrap files, preview pages, and Preview-only styles were removed.
- Storybook is now the canonical environment for component preview, documentation, state and variant coverage, and visual QA.
- `ProgressIndicatorComponent` received colocated Storybook coverage.
- Angular and Storybook configuration now uses a minimal Storybook host target rather than Preview routes or `main.ts`.
- npm scripts and GitHub Pages deployment now build and publish Storybook directly; Preview output paths and the Storybook-copy deployment step were removed.
- Preview-only Angular dependencies, including router and dynamic platform bootstrap dependencies, were removed after reference checks.
- `docs/skills/angular-component-standards.md` was added as the repository-owned component engineering standard.
- `AGENTS.md` was added with persistent project identity, workflow, recovery, and Git-safety instructions.

## Validation

- Storybook production build passed.
- Complete component test suite passed: 42/42 tests.
- Build output included non-blocking size warnings; no functional validation failures were recorded.
- The current standards require continuing to run Storybook build, the full component suite, `git diff --check`, and relevant Angular validation for future component changes.

## Unfinished work and next step

No additional cleanup is recorded in this checkpoint. Review the latest Figma Design System specifications against the existing Angular implementation, then update components incrementally while preserving public APIs, tokens, stories, tests, and compatibility identifiers.
