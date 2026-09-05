# Angular Component Standards

Repository-owned guidance for implementing and reviewing the Design System’s Angular components.

## Source of truth and priorities

Use these sources in order:

1. The current repository implementation, tokens, public APIs, tests, and Storybook stories.
2. Figma, when it provides the intended visual or interaction design.
3. This document.
4. External examples or assumptions.

When sources conflict, preserve working repository behavior unless a change is explicitly approved. Do not introduce a new pattern merely to match an external example.

## Repository architecture

- Reusable components live under `src/app/shared/components/`.
- Each component owns its implementation, template, SCSS, model, module, and focused spec where applicable.
- Stories live next to the component and are the canonical environment for preview, documentation, state coverage, and visual QA.
- `src/styles.scss` contains shared Design System tokens and theme mappings; keep it available to Storybook.
- Do not create or restore a separate Angular Preview/demo application. Do not add routes, bootstrap entrypoints, or standalone preview pages for new components.

## Component structure

Use kebab-case names and the existing module-based structure:

```text
component-name/
├── component-name.component.ts
├── component-name.component.html
├── component-name.component.scss
├── component-name.model.ts
├── component-name.module.ts
├── component-name.spec.ts
└── component-name.stories.ts
```

Not every component requires every file, but additions should follow the patterns of neighboring components. Prefer one configurable component per concept over duplicated components for individual variants.

Use PascalCase for exported classes, enums, and types. Keep implementation details private unless they are part of an intentional public API.

## Public API and compatibility

- Preserve existing selectors, inputs, outputs, model types, enum values, exported constants, and supported defaults.
- Treat changes to public names, accepted values, event payloads, or behavior as potentially breaking.
- Add a new API only when the existing API cannot support the requirement cleanly.
- Keep compatibility aliases when they already exist; remove them only with explicit approval and migration guidance.
- Do not rename technical identifiers solely to improve display branding.
- Do not introduce product-generation labels such as `V2`, `v2`, or `2.0` into package names, selectors, CSS classes, import paths, or exported symbols.

Inputs and outputs should be:

- Explicitly typed.
- Safe with sensible defaults.
- Directly mappable to Storybook controls where practical.
- Named for their behavior rather than an implementation detail.

Use Angular’s native semantic elements and event patterns. Do not replace a native button, link, checkbox, or form control with a non-semantic element for styling convenience.

## States, variants, and interaction

Model supported variants and states explicitly. Do not invent combinations that are not supported by the component contract.

For the existing Button component:

- Variants are `primary`, `secondary`, `success`, `danger`, `warning`, `discovery`, and `subtle`.
- Emphasis values are `default`, `outline`, and `transparent`.
- Sizes are `small`, `medium`, and `large`.
- Supported states include default, hover, pressed, focus, disabled, and loading.
- `subtle + outline`, `subtle + transparent`, and `disabled + loading` are unsupported combinations.
- Loading uses the existing centered three-dot treatment, preserves dimensions, and disables interaction.

For other components, use their existing model types, tests, and stories as the contract. If a state or variant is missing from those sources, clarify the intended behavior before changing the API.

## Design tokens and SCSS

Use the token hierarchy:

```text
Primitive tokens → Semantic tokens → Component tokens → Angular components
```

Rules:

- Consume semantic or component CSS variables in component SCSS.
- Do not hardcode colors, spacing, typography, radius, shadows, or opacity when a repository token exists.
- Use the canonical `space/*` token namespace; do not introduce `spacing/*`.
- Use lowercase slash-delimited token names, for example `surface/default`, `text/neutral/primary`, and `space/xl`.
- Keep component token names scoped to the component and state.
- Avoid changing an existing token name or value without checking all consumers and Storybook states.
- Keep selectors consistent with the existing component naming scheme. Technical `tdx-*` selectors and classes may be compatibility identifiers; do not change them as part of ordinary component work.

Prefer:

```scss
background: var(--button-primary-default-bg);
padding: var(--space-md) var(--space-xl);
```

over hardcoded visual values.

## Themes

Components must support the repository’s light and dark theme model when their tokens provide both modes.

- Use `[data-theme='light']` and `[data-theme='dark']` scopes.
- Resolve colors through semantic or component tokens.
- Do not make a component know the literal light and dark color values.
- Ensure Storybook stories expose or demonstrate both themes when the component supports them.

## Accessibility

Every interactive component must provide:

- Semantic HTML.
- Keyboard access and expected focus behavior.
- Visible focus indicators.
- Correct disabled and loading semantics.
- Accessible names and useful ARIA attributes where needed.
- State changes that are understandable to assistive technology.

Do not use ARIA to compensate for incorrect native HTML. Keep labels, roles, values, and emitted events aligned with the actual behavior.

## Storybook requirements

Storybook is required for reusable components and is the canonical visual and documentation surface.

Each component story should, where applicable, cover:

- Default usage and the main supported variants.
- Sizes, emphasis, icons, and other public inputs.
- Interactive states such as hover, pressed, focus, disabled, loading, active, or processing.
- Light and dark themes.
- Boundary values and visibility options.
- Relevant accessibility behavior and documentation.

Use `moduleMetadata` and the component’s existing Angular module conventions. Keep story-only host components local to the story file unless they are genuinely reusable application components.

Do not create a second preview application or route to demonstrate a component. Add or improve the component’s colocated Storybook story instead.

## Testing

Add or update focused component specs for behavior that is not adequately covered by Storybook.

Tests should cover, as applicable:

- Default rendering and public inputs.
- Variant/state class or token resolution.
- Input validation, clamping, and fallback behavior.
- Output emission and interaction behavior.
- Disabled/loading behavior.
- Accessibility-relevant attributes and native semantics.
- Unsupported combinations and safe fallback behavior.

Run the complete existing suite with:

```sh
npm test -- --watch=false --browsers=ChromeHeadless
```

## Figma-to-Angular workflow

When implementing from Figma:

1. Inspect the existing component, model, tokens, module, stories, and specs.
2. Map the design to existing components and tokens before creating anything new.
3. Update the existing implementation when the concept and public API already exist.
4. Add or adjust tokens only when the current token system cannot express the design.
5. Preserve supported API values and behavior unless a breaking change is approved.
6. Add Storybook coverage for the new visual states, variants, themes, and interactions.
7. Add focused tests for behavioral changes.
8. Compare the Storybook result with Figma and verify responsive, theme, focus, disabled, and loading behavior.

Do not recreate an existing component solely because the Figma layer has a different name. Resolve the mapping through the repository’s component and token model.

## Validation checklist

Before handing off a component change:

- Confirm the public API and defaults remain compatible.
- Confirm token usage and light/dark theme behavior.
- Confirm supported states and variants are represented in Storybook.
- Confirm unsupported combinations are not exposed or are handled safely.
- Run the relevant component tests and the full test suite.
- Build Storybook with `npm run build-storybook`.
- Run `git diff --check`.
- Search for accidental Preview routes, bootstrap files, hardcoded visual values, or obsolete technical identifiers.
- Review the final diff for unrelated changes.
