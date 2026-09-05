# Figma-to-Code Token Alignment Checkpoint

## Completed alignment work

- Completed Phase 1 semantic token alignment in `src/styles.scss`, preserving the hierarchy from Figma primitives to semantic aliases to component-facing tokens.
- Corrected confirmed dark-theme mappings for surface and brand icon values during the foundation work.
- Re-inspected Stepper sizing in Figma. The verified `24px` value applies to the Stepper indicator/icon sizing already represented by the existing `icon-2xl` mapping; no additional Stepper size change was necessary. Direct opacity values remain intentional Figma-authored values.
- Completed the remaining verified semantic alias migration for non-primary Button variants: secondary, success, danger, warning, discovery, and subtle.
- Migrated verified Tag color/state mappings for primary, success, warning, danger, and info treatments while preserving existing component-facing custom property names.
- Progress and remaining Stepper mapped color tokens were already aligned to semantic tokens and were not changed further.

No Angular component APIs, markup, behavior, Storybook stories, tests, dimensions, or compatibility identifiers were changed.

## Visual and validation status

- Resolved component visual values remain unchanged by the alias migration. The only intentional resolved-value changes are the previously corrected, Figma-confirmed dark-theme mismatches.
- Storybook production build passed with the existing non-blocking MDX-pattern and asset-size warnings.
- Storybook output was generated at `storybook-static/`.
- Headless component tests passed: 42/42.
- `git diff --check` passed.
- The token work remains uncommitted and unpushed in the working tree.

## Remaining work

Token-level alignment is complete for the verified mappings covered by this phase. Component-level Figma alignment remains, including API/state/variant decisions that were intentionally not addressed during token-only work.

Recommended next step: compare the latest Figma specifications with the existing Angular implementation and begin incremental component-level alignment with Button, preserving its current public API, behavior, tokens, Storybook coverage, tests, and compatibility identifiers.
