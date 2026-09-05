# Design System

An Angular implementation of the Design System. The repository provides reusable, token-driven UI components with Storybook documentation for visual QA and component development.

## What is included

- **Design Tokens**: global CSS custom properties for color, typography, spacing, radius, icons, and component semantics.
- **Angular Components**: reusable, accessible components implemented with Angular modules, templates, styles, models, and unit tests.
- **Storybook Documentation**: interactive component stories, controls, accessibility checks, and generated component documentation.

## Components

- Button
- Progress Bar
- Section Message
- Stepper
- Tag

## Component API inventory

| Component | Selectors | Inputs | Outputs |
| --- | --- | --- | --- |
| Button | `tdx-button`, `app-button` | `label`, `variant`, `emphasis`, `appearance`, `size`, `disabled`, `loading`, `leftIcon`, `rightIcon`, `ariaLabel`, `ariaExpanded`, `ariaControls`, `ariaPressed` | `clicked` |
| Progress Bar | `tdx-progress-bar`, `app-progress-bar` | `variant` (`brand`, `success`, `processing`), `progress`, `ariaLabel`, `ariaValueText` | — |
| Section Message | `tdx-section-message`, `app-section-message` | `title`, `description`, `appearance` (`info`, `success`, `warning`, `error`, `discovery`), `size` (`large`, `medium`), `showTitle`, `showDescription`, `showAction1`, `showAction2`, `label1`, `label2`, `isDismissible`, `icon`, `iconFill` | `action1Clicked`, `action2Clicked`, `dismissed` |
| Stepper | `tdx-stepper`, `app-stepper` | `steps`, `currentIndex`, `orientation` (`vertical`, `horizontal`), `showLeftConnector`, `showRightConnector`, `backLabel`, `nextLabel`, `showPreviewControls`, `clickableSteps` | `currentIndexChange`, `stepChange` |
| Tag | `tdx-tag`, `app-tag` | `label`, `variant`, `emphasis`, `leadingIcon`, `removable`, `disabled` | `removed` |

## Storybook

Storybook is the primary environment for viewing, documenting, and validating components locally at [http://127.0.0.1:6006/](http://127.0.0.1:6006/).

## Getting Started

```sh
npm install
npm run storybook
```

## Available Commands

```sh
npm test
npm run storybook
npm run build-storybook
```

## Validation

```sh
npm run build-storybook
npm test -- --watch=false --browsers=ChromeHeadless
```

## Project Structure

```text
.storybook/                         Storybook configuration
src/
  app/
    shared/components/
      button/                       Reusable Button component
      progress-bar/                 Reusable Progress Bar component
      section-message/              Reusable Section Message component
      stepper/                      Reusable Stepper component
      tag/                          Reusable Tag component
  styles.scss                       Global design tokens and theme mappings
```

## Development Principles

Components consume design-system tokens rather than hardcoded visual values, support accessible native interactions, and are documented through Storybook. Each component keeps its implementation, stories, and tests close together to make design-to-code review straightforward.
