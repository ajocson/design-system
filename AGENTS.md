# Codex Project Instructions

## Project identity

- Refer to this project as **Design System**.
- It is the new generation of the Design System and may be described organizationally as **Design System 2.0**. Do not add `2.0` to package names, selectors, APIs, paths, or semantic package versions automatically.
- Do not reintroduce `TDX` as product or system branding.
- Existing `tdx-*`, `Tdx*`, and `TDX_*` technical identifiers may remain for compatibility. Do not rename them without explicit instruction.

## Required reading

- Read this file at the beginning of each session.
- Before creating or modifying Angular Design System components, read and follow `docs/skills/angular-component-standards.md`.

## Repository principles

- Preserve reusable component APIs and behavior unless a breaking change is explicitly approved.
- Prefer updating existing components over recreating them.
- Reuse existing Design System tokens, patterns, and components whenever possible; do not introduce hard-coded design values when an appropriate token exists.
- Do not create a standalone Preview or demo application.
- Storybook is the canonical environment for component preview, documentation, states, variants, and visual QA.
- New or meaningfully changed reusable components should have appropriate Storybook coverage and tests.
- Treat the current codebase as the source of truth when older documentation, logs, or external guidance conflicts with the implementation.

## Figma-to-Angular workflow

- Treat Figma as the design specification and reference, but inspect the existing Angular component first.
- Identify the delta between the current implementation and the latest Figma specification.
- Modify only what is necessary; do not regenerate or rewrite working components unnecessarily.
- Follow the detailed implementation and validation requirements in `docs/skills/angular-component-standards.md`.

## Update checkpoints

- Store explicitly requested checkpoints under `docs/updates/`.
- Do not create an update file after every code change. Create one only when explicitly instructed, for example: `Create an update checkpoint.`
- Each checkpoint is a separate timestamped Markdown file containing meaningful changes, decisions, issues, unfinished work, and useful handoff context.
- Do not duplicate stable standards from this file or `docs/skills/angular-component-standards.md`.

## Future-session recovery

- At the start of a new session, read `AGENTS.md`, then read `docs/skills/angular-component-standards.md` when component work is involved.
- Review the latest relevant checkpoint files under `docs/updates/` and inspect the current repository before making changes.
- If update logs conflict with the implementation, follow the current codebase.

## Git safety

- Do not commit, push, tag, reset, discard changes, or perform destructive Git operations unless explicitly instructed.
- Leave changes in the working directory for review.
