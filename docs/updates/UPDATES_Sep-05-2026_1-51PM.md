# Button Figma Alignment Checkpoint

## Completed work

- Aligned Button Material Symbols to Figma’s filled treatment with `FILL: 1`.
- Updated loading presentation to reserve the Figma loading visual width: 48×12px content, 12px dots, 6px gaps, and 50% opacity. Desktop reserved Button widths are 88px, 80px, and 72px for large, medium, and small sizes.
- Updated derived icon-only Buttons so large is 48×48px, while medium and small remain 40×40px and 32×32px.
- Confirmed standard Button heights remain unchanged at 52px, 40px, and 32px.
- Retained the existing 2px outer `:focus-visible` ring because it provides clear keyboard focus without changing layout; no focus behavior replacement was necessary.
- Added grouped Storybook matrix coverage for variants, emphasis, states, sizes, themes, icon-only usage, loading, and disabled states.
- Added focused tests for filled icon rendering, loading sizing, icon-only dimensions, and standard Button sizing.

The existing single Angular Button API is intentionally retained. The implementation was not split into separate Button, Button Icon, or Button Loading components, and existing inputs, outputs, variants, aliases, selectors, and compatibility behavior remain available.

## Validation

- Storybook production build passed; existing non-blocking MDX-pattern and asset-size warnings remain.
- `storybook-static/` was generated successfully.
- Headless component tests passed: 45/45.
- `git diff --check` passed.
- Changes remain uncommitted and unpushed.

## Next step

Continue Figma-to-code alignment with Progress Bar, preserving its existing Angular API and using the verified token mappings and Storybook workflow established here.
