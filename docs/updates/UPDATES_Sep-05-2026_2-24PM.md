# Stepper Figma Alignment

## Changes

- Corrected vertical connector geometry to match Figma: a 20px indicator followed immediately by a 2px × 18px connector within the 38px vertical step.
- Aligned disabled indicator opacity to 30% and confirmed disabled labels remain 40% opacity.
- Preserved horizontal connector sizing and responsive behavior intentionally.
- Added deterministic Storybook coverage for completed, current, upcoming, incomplete, and disabled states across vertical/horizontal orientations and light/dark themes.
- Added connector-control Storybook coverage.
- Expanded tests for connector geometry, opacity, connector visibility, keyboard navigation, ARIA state, and navigation blocking.

## Decisions and remaining work

- `Show Step #` and a generic `Show Connector` remain API decisions for a future update; existing compatibility inputs are preserved.
- Figma Vertical Stepper Group, Horizontal Stepper Group, and Vertical Stepper Section remain Figma-only composition concepts.
- No public API, flat `steps` model, horizontal sizing behavior, or dark-theme token values were changed.

## Validation

- Storybook production build passed and generated the Stepper state matrix and connector-control stories.
- Headless component tests passed: 54/54.
- `git diff --check` passed.
- Existing non-blocking Storybook warnings remain for the absent MDX pattern and recommended asset-size limits.

## Next step

Recommended next component: review and align Tag against the latest Figma specification.
