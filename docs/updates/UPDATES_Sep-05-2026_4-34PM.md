# Design System Update Checkpoint

## Current work

- Added the Figma `custom` Stepper state for vertical and horizontal orientations.
- Added configurable Material Symbols icon names for custom steps, with filled/outlined rendering control.
- Updated the Stepper Playground to show one step with state, orientation, label, number, theme, connector, icon-name, and icon-fill controls.
- Corrected single-step connector visibility so the existing vertical and horizontal connector inputs are observable in Storybook.
- Simplified Stepper navigation to `Docs` and `Playground` while preserving automated coverage.
- Added a Button `iconFill` input and Playground control for filled or outlined Material Symbols.

## Decisions and compatibility

- `custom` remains an explicit per-step state and overrides `currentIndex` derivation.
- `iconName` is only applied for the custom state; existing state icons remain fixed.
- `iconFill` defaults to filled rendering for compatibility with the current Button and Stepper visuals.
- Existing selectors, progression behavior, connector inputs, outputs, and navigation behavior remain available.
- No new color input or arbitrary hard-coded icon color was introduced; Stepper custom icons use the neutral semantic token.

## Affected files

- Button component, template, Storybook story, and tests.
- Stepper model, component, template, styles, Storybook story, and tests.
- Shared Stepper token mappings in `src/styles.scss`.

## Validation

- Storybook build passed and generated `storybook-static`.
- Headless component tests passed: `66/66`.
- `git diff --check` passed.

## Deferred considerations

- Figma exposes per-instance connector controls while the Angular API retains its existing root-level connector inputs.
- Storybook continues to report non-blocking missing-MDX and recommended asset-size warnings.
- Changes are prepared for review only; nothing has been staged, committed, or pushed.
