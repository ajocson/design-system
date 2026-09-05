# Design System Update Checkpoint

## Current work

- Added the reusable Section Message component with `info`, `success`, `warning`, `error`, and `discovery` appearances.
- Added Figma-aligned large and medium sizing, responsive width behavior, natural content sizing, title/description visibility, two actions, dismissible behavior, custom Material Symbols, and filled/outlined icon control.
- Added light/dark token mappings, a colocated Storybook Docs/Playground entry, README inventory documentation, and Storybook sort ordering.
- Updated the Medium Storybook control to a dropdown and `iconFill` to a boolean toggle.

## Decisions and compatibility

- Preserved the technical `tdx-section-message` selector and `app-section-message` compatibility selector.
- Kept the component API explicit and typed; no existing component APIs, tokens, or behavior were removed.
- The Figma reference widths remain maximums; the component can shrink to its available container and Medium descriptions wrap responsively.
- Existing repository architecture remains Storybook-first with no standalone Preview application.

## Affected files

- `.storybook/preview.ts`
- `README.md`
- `src/styles.scss`
- Added `src/app/shared/components/section-message/`

## Validation

- Storybook build passed and generated `storybook-static`.
- Headless component tests passed: `71/71`.
- `git diff --check` passed.
- Storybook browser verification confirmed Medium uses a dropdown, `iconFill` uses a toggle, and the responsive layout fits the available preview width.
- Storybook reports the existing non-blocking warning that no `src/**/*.mdx` files were found.

## Deferred considerations

- Changes are not staged, committed, or pushed.
- Further visual review against additional Section Message Figma states may be useful before release handoff.
