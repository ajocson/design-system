# Documentation and Self-Containment Cleanup

## Changes since the baseline checkpoint

- Corrected the README component inventory by adding Progress Bar.
- Added a concise public API inventory covering the current Button, Progress Bar, Progress Indicator, Stepper, and Tag selectors, inputs, and outputs.
- Added the exact validation commands to the README: `npm run build-storybook` and `npm test -- --watch=false --browsers=ChromeHeadless`.
- Added Progress Indicator to the Storybook component sort order after Progress Bar.

These changes are documentation and Storybook organization only. No component implementation, public API, token, style, or behavior was changed.

## Validation and repository status

- Storybook production build passed successfully.
- Headless component tests passed: 42/42.
- `git diff --check` passed.
- Storybook still reports non-blocking warnings for the absent MDX story pattern and recommended asset-size limits.
- The broader working tree still contains the previously reviewed Preview removal, Storybook migration, naming cleanup, standards, and configuration changes; nothing has been committed or pushed.

## Self-containment result

The repository passed the self-containment check. `AGENTS.md`, the repository-owned Angular standards, the latest checkpoint, README, current source, Storybook setup, tests, tokens, and project configuration provide sufficient project-specific context for a fresh session to continue component development.

The personal TDX-specific Codex skills are no longer required as the source of project-specific knowledge. The repository now contains the relevant architecture, naming, token, Storybook, accessibility, testing, Figma-to-Angular, compatibility, validation, and Git-safety guidance. Generic Figma-tool operating procedures may still be useful externally but are not required to understand this repository.

## Next step

Review the latest Figma Design System specifications against the existing Angular implementation and update components incrementally, preserving current APIs, tokens, Storybook coverage, tests, and compatibility identifiers.
