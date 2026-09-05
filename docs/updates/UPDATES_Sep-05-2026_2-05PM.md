# Progress Bar Figma Alignment

## Changes

- Added explicit Progress processing aliases for the verified Figma processing gradient values.
- Preserved the existing uploading aliases as compatibility aliases.
- Added a deterministic Storybook visual QA matrix covering 0%, 25%, 50%, 75%, and 100% for brand, success, and processing variants in light and dark themes.
- Preserved the existing animated Progress Bar stories as demos.
- Expanded focused tests for boundary clamping, variants, progress values, and ARIA attributes.

## Confirmed behavior

- The reusable Progress Bar remains 8px high with responsive width behavior.
- Resolved track, brand, success, and processing colors remain unchanged.
- No public API, selector, component behavior, or Figma presentation-frame dimensions were changed.

## Validation

- Storybook production build passed and generated the deterministic matrix story.
- Headless component tests passed: 49/49.
- `git diff --check` passed.
- Existing non-blocking Storybook warnings remain for the absent MDX pattern and recommended asset-size limits.

## Remaining limitation and next step

The Figma component-specific Progress Bar collection does not separately define dark-mode mappings, so exact dark-theme parity remains a design verification item.

Recommended next component: review and align Stepper against the latest Figma specification.
