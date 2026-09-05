# Progress Indicator / Progress Summary Architecture Review

## Figma definition

- Figma `Progress Summary` is a `216px × 33px` composition with a 20px title/value row and an 8px nested Progress Bar.
- Its properties are `Title`, `Show Fraction Value`, and `Fraction Value`.
- The nested Progress Bar uses the success variant and composes Progress Track with a Progress Fill slot.

## Alignment and decisions

- Angular fraction mode closely maps to Figma Progress Summary.
- Angular percentage mode and cancellation are code-side extensions not currently represented in the inspected Figma source.
- `ProgressIndicatorComponent` remains unchanged for now.
- Do not rename, split, or narrow the component until design/product requirements are confirmed.

## Outstanding decisions

- Whether percentage mode belongs in the official Design System.
- Whether cancellation belongs in the intended Progress Summary contract.
- Whether dark-theme Progress Summary mappings should be added to Figma.
- Whether the approximately 1px height difference between Figma and Angular composition is intentional.

## Future architecture

If a strict Figma mapping is required, consider a dedicated `ProgressSummaryComponent` composed with `ProgressBarComponent`, while preserving `ProgressIndicatorComponent` and its current API for compatibility.

No component code was modified as part of this review.
