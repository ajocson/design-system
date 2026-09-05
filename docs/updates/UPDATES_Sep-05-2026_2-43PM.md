# Tag Figma Alignment

## Changes

- Aligned the Tag focus-ring expansion from 3px to 2px using the existing `--space-2xs` token.
- Added deterministic Storybook matrices covering all six color mappings, default/hover/pressed/focus states, emphasis modes, removable/non-removable variants, disabled treatment, and light/dark themes.
- Removed misleading simulated `active` Storybook behavior.
- Documented Figma `active` and optional slot behavior as future API/design-review items rather than adding unsupported Angular APIs.
- Added focused tests for the 22px base dimension, leading/removable icon sizes, focus geometry, disabled opacity, and variant/emphasis behavior.

## Compatibility and remaining work

- No public API, selector, component behavior, or dark-theme value changed.
- Figma’s persistent `active` state and optional slot remain intentionally unimplemented pending design/API decisions.

## Validation

- Storybook production build passed and generated successfully, with existing non-blocking asset-size and absent-MDX warnings.
- Headless component tests passed: 59/59.
- `git diff --check` passed.

## Next step

Recommended next work: review the Progress Indicator / Progress Summary mapping against the latest Figma specification.
