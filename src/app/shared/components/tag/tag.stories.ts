import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { TagModule } from './tag.module';
import { TDX_TAG_EMPHASIS, TDX_TAG_VARIANTS, TdxTagEmphasis, TdxTagVariant } from './tag.model';

type TagStoryTheme = 'light' | 'dark';
type TagStoryState = 'default' | 'hover' | 'press' | 'focus';

@Component({
  selector: 'tdx-tag-story-host',
  standalone: false,
  template: `
    <section class="tdx-tag-story" [attr.data-theme]="theme">
      <tdx-tag
        [class]="'tdx-tag-story__tag--' + state"
        [label]="label"
        [variant]="variant"
        [emphasis]="emphasis"
        [leadingIcon]="iconLeft ? leadingIcon : null"
        [removable]="removable"
        [disabled]="disabled">
      </tdx-tag>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-tag-story {
        align-items: flex-start;
        background: var(--alias-surface-default);
        box-sizing: border-box;
        display: flex;
        min-height: 160px;
        padding: var(--space-6xl);
      }

      .tdx-tag-story__tag--hover {
        --tag-neutral-bg-default: var(--tag-neutral-bg-hover);
        --tag-primary-bg-default: var(--tag-primary-bg-hover);
        --tag-success-bg-default: var(--tag-success-bg-hover);
        --tag-warning-bg-default: var(--tag-warning-bg-hover);
        --tag-danger-bg-default: var(--tag-danger-bg-hover);
        --tag-info-bg-default: var(--tag-info-bg-hover);
      }

      .tdx-tag-story__tag--press {
        --tag-neutral-bg-default: var(--tag-neutral-bg-pressed);
        --tag-primary-bg-default: var(--tag-primary-bg-pressed);
        --tag-success-bg-default: var(--tag-success-bg-pressed);
        --tag-warning-bg-default: var(--tag-warning-bg-pressed);
        --tag-danger-bg-default: var(--tag-danger-bg-pressed);
        --tag-info-bg-default: var(--tag-info-bg-pressed);
      }

      .tdx-tag-story__tag--focus {
        display: inline-flex;
        position: relative;
      }

      .tdx-tag-story__tag--focus::after {
        border: var(--tag-focus-ring-width) solid var(--tag-focus-ring);
        border-radius: var(--tag-radius);
        content: '';
        inset: calc(var(--tag-focus-ring-offset) * -1);
        pointer-events: none;
        position: absolute;
      }

      @media (max-width: 767px) {
        .tdx-tag-story {
          padding: var(--space-3xl);
        }
      }
    `,
  ],
})
class TagStoryHostComponent {
  @Input() label = 'Tag';
  @Input() variant: TdxTagVariant = TdxTagVariant.Neutral;
  @Input() state: TagStoryState = 'default';
  @Input() leadingIcon?: string;
  readonly emphasis = TdxTagEmphasis.Subtle;
  @Input() iconLeft = true;
  @Input() removable = false;
  @Input() disabled = false;
  @Input() theme: TagStoryTheme = 'light';
}

const meta: Meta<TagStoryHostComponent> = {
  title: 'Components/Tag',
  component: TagStoryHostComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TagModule],
      declarations: [TagStoryHostComponent],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
    },
    variant: {
      control: {
        type: 'select',
        labels: {
          neutral: 'default',
          primary: 'purple',
          success: 'green',
          warning: 'yellow',
          danger: 'red',
          info: 'info',
        },
      },
      options: TDX_TAG_VARIANTS,
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'press', 'focus'],
    },
    leadingIcon: {
      control: 'text',
    },
    iconLeft: {
      name: 'Icon Left',
      control: 'boolean',
    },
    removable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Figma review note: active is a persistent selected-state candidate for the standard non-removable Tag and is not represented by an Angular active API yet. Show slot is an optional Figma composition point; its production content contract remains under design review.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<TagStoryHostComponent>;

export const Playground: Story = {
  args: {
    label: 'Tag',
    variant: TdxTagVariant.Neutral,
    state: 'default',
    leadingIcon: 'info',
    iconLeft: true,
    removable: false,
    disabled: false,
    theme: 'light',
  },
};
