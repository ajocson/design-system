# Design System Update Checkpoint

## Current work

- Simplified Storybook navigation for Button, Progress Bar, and Tag; retained the requested Docs/Playground entries and Button's Icon Only example.
- Removed the standalone Progress Indicator component, including its implementation, module, model, tests, and Storybook story. Progress Bar remains the reusable foundational progress component.
- Updated active Storybook sorting and README component documentation to match the remaining component inventory.

## Decisions and compatibility

- The removal target was the repository's `ProgressIndicatorComponent`; no separate Progress Stepper component or internal consumer was found.
- Existing Button, Progress Bar, Stepper, and Tag component APIs, selectors, tokens, and behavior were not changed by this cleanup.
- Historical checkpoints retain references to Progress Indicator as records of earlier repository state; active source, configuration, README, and Storybook references were removed.
- External consumers of `tdx-progress-indicator` or `app-progress-indicator` would need migration because the component and its public Angular contract are intentionally removed.

## Affected files

- `.storybook/preview.ts`
- `README.md`
- `src/app/shared/components/progress-bar/progress-bar.stories.ts`
- `src/app/shared/components/tag/tag.stories.ts`
- Removed `src/app/shared/components/progress-indicator/`

## Validation

- Storybook build passed and generated `storybook-static`.
- Headless component tests passed: `57/57`.
- `git diff --check` passed.
- Active source/config reference scan found no remaining Progress Indicator references.
- Storybook reported only existing non-blocking missing-MDX and recommended asset-size warnings.

## Deferred considerations

- No files have been staged, committed, or pushed.
- Before migration handoff, confirm external consumers have moved from Progress Indicator to Progress Bar or another approved composition.
