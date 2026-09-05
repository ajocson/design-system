import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ArgTypes, Meta, StoryObj, moduleMetadata } from '@storybook/angular';

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
  @Input() emphasis: TdxTagEmphasis = TdxTagEmphasis.Subtle;
  @Input() iconLeft = true;
  @Input() removable = false;
  @Input() disabled = false;
  @Input() theme: TagStoryTheme = 'light';

}

const sharedArgTypes: ArgTypes<TagStoryHostComponent> = {
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
  emphasis: {
    control: 'select',
    options: TDX_TAG_EMPHASIS,
  },
};

type Story = StoryObj<TagStoryHostComponent>;

const fixedVariantArgTypes = {
  variant: {
    table: {
      disable: true,
    },
  },
};

const createColorStory = (
  variant: TdxTagVariant,
  supportsRemovable = false,
): Story => ({
  args: {
    label: 'Tag',
    variant,
    state: 'default',
    leadingIcon: 'info',
    emphasis: TdxTagEmphasis.Subtle,
    iconLeft: true,
    removable: false,
    disabled: false,
    theme: 'light',
  },
  argTypes: {
    ...fixedVariantArgTypes,
    ...(supportsRemovable
      ? {}
      : {
          removable: {
            table: {
              disable: true,
            },
          },
        }),
  },
});

export const Playground: Story = {
  args: {
    label: 'Tag',
    variant: TdxTagVariant.Neutral,
    state: 'default',
    leadingIcon: 'info',
    emphasis: TdxTagEmphasis.Subtle,
    iconLeft: true,
    removable: false,
    disabled: false,
    theme: 'light',
  },
};

export const Default: Story = createColorStory(TdxTagVariant.Neutral, true);
export const Purple: Story = createColorStory(TdxTagVariant.Primary);
export const Green: Story = createColorStory(TdxTagVariant.Success);
export const Yellow: Story = createColorStory(TdxTagVariant.Warning);
export const Red: Story = createColorStory(TdxTagVariant.Danger);
export const Info: Story = createColorStory(TdxTagVariant.Info);

const TAG_STATES: TagStoryState[] = ['default', 'hover', 'press', 'focus'];

@Component({
  selector: 'tdx-tag-state-matrix-story',
  standalone: false,
  template: `
    <div class="tdx-tag-matrix">
      <section *ngFor="let theme of themes" class="tdx-tag-matrix__theme" [attr.data-theme]="theme">
        <h3>{{ theme | titlecase }} theme · subtle emphasis</h3>
        <div class="tdx-tag-matrix__header">
          <span>Color</span>
          <span *ngFor="let state of states">{{ state }}</span>
        </div>
        <div *ngFor="let variant of variants" class="tdx-tag-matrix__row">
          <strong>{{ variant }}</strong>
          <div *ngFor="let state of states" class="tdx-tag-matrix__cell">
            <tdx-tag
              [class]="'tdx-tag-matrix__tag tdx-tag-matrix__tag--' + state"
              [label]="variant"
              [variant]="variant"
              [emphasis]="subtle"
              leadingIcon="info">
            </tdx-tag>
            <tdx-tag
              [class]="'tdx-tag-matrix__tag tdx-tag-matrix__tag--' + state"
              [label]="variant"
              [variant]="variant"
              [emphasis]="subtle"
              leadingIcon="info"
              [removable]="true">
            </tdx-tag>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      :host { display: block; }
      .tdx-tag-matrix { display: grid; gap: var(--space-3xl); padding: var(--space-3xl); overflow-x: auto; }
      .tdx-tag-matrix__theme { background: var(--alias-surface-default); padding: var(--space-3xl); min-width: 760px; }
      .tdx-tag-matrix__header, .tdx-tag-matrix__row { display: grid; grid-template-columns: 90px repeat(4, minmax(150px, 1fr)); gap: var(--space-md); align-items: center; }
      .tdx-tag-matrix__header { color: var(--alias-text-secondary); font-size: var(--caption-text-size); margin-bottom: var(--space-md); }
      .tdx-tag-matrix__row { border-top: 1px solid var(--alias-border-default); padding-block: var(--space-md); }
      .tdx-tag-matrix__cell { display: flex; flex-wrap: wrap; gap: var(--space-xs); align-items: center; }
      .tdx-tag-matrix__tag--hover { --tag-neutral-bg-default: var(--tag-neutral-bg-hover); --tag-primary-bg-default: var(--tag-primary-bg-hover); --tag-success-bg-default: var(--tag-success-bg-hover); --tag-warning-bg-default: var(--tag-warning-bg-hover); --tag-danger-bg-default: var(--tag-danger-bg-hover); --tag-info-bg-default: var(--tag-info-bg-hover); }
      .tdx-tag-matrix__tag--press { --tag-neutral-bg-default: var(--tag-neutral-bg-pressed); --tag-primary-bg-default: var(--tag-primary-bg-pressed); --tag-success-bg-default: var(--tag-success-bg-pressed); --tag-warning-bg-default: var(--tag-warning-bg-pressed); --tag-danger-bg-default: var(--tag-danger-bg-pressed); --tag-info-bg-default: var(--tag-info-bg-pressed); }
      .tdx-tag-matrix__tag--focus { display: inline-flex; position: relative; }
      .tdx-tag-matrix__tag--focus::after { border: var(--tag-focus-ring-width) solid var(--tag-focus-ring); border-radius: var(--tag-radius); content: ''; inset: calc(var(--tag-focus-ring-offset) * -1); pointer-events: none; position: absolute; }
    `,
  ],
})
class TagStateMatrixStoryComponent {
  readonly themes: TagStoryTheme[] = ['light', 'dark'];
  readonly states = TAG_STATES;
  readonly variants = TDX_TAG_VARIANTS;
  readonly subtle = TdxTagEmphasis.Subtle;
}

@Component({
  selector: 'tdx-tag-emphasis-matrix-story',
  standalone: false,
  template: `
    <div class="tdx-tag-emphasis-matrix">
      <section *ngFor="let theme of themes" class="tdx-tag-emphasis-matrix__theme" [attr.data-theme]="theme">
        <h3>{{ theme | titlecase }} theme</h3>
        <div *ngFor="let emphasis of emphases" class="tdx-tag-emphasis-matrix__group">
          <h4>{{ emphasis }}</h4>
          <div *ngFor="let variant of variants" class="tdx-tag-emphasis-matrix__row">
            <span>{{ variant }}</span>
            <tdx-tag [label]="variant" [variant]="variant" [emphasis]="emphasis" leadingIcon="info"></tdx-tag>
            <tdx-tag [label]="variant" [variant]="variant" [emphasis]="emphasis" leadingIcon="info" [removable]="true"></tdx-tag>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      :host { display: block; }
      .tdx-tag-emphasis-matrix { display: grid; gap: var(--space-3xl); padding: var(--space-3xl); }
      .tdx-tag-emphasis-matrix__theme { background: var(--alias-surface-default); padding: var(--space-3xl); }
      .tdx-tag-emphasis-matrix__group { border-top: 1px solid var(--alias-border-default); padding-block: var(--space-lg); }
      .tdx-tag-emphasis-matrix__row { align-items: center; display: flex; flex-wrap: wrap; gap: var(--space-md); padding-block: var(--space-xs); }
      .tdx-tag-emphasis-matrix__row > span { min-width: 80px; }
    `,
  ],
})
class TagEmphasisMatrixStoryComponent {
  readonly themes: TagStoryTheme[] = ['light', 'dark'];
  readonly emphases = TDX_TAG_EMPHASIS;
  readonly variants = TDX_TAG_VARIANTS;
}

@Component({
  selector: 'tdx-tag-disabled-matrix-story',
  standalone: false,
  template: `
    <div class="tdx-tag-disabled-matrix">
      <section *ngFor="let theme of themes" class="tdx-tag-disabled-matrix__theme" [attr.data-theme]="theme">
        <h3>{{ theme | titlecase }} theme · disabled</h3>
        <div class="tdx-tag-disabled-matrix__row">
          <tdx-tag *ngFor="let variant of variants" [label]="variant" [variant]="variant" [emphasis]="subtle" leadingIcon="info" [removable]="true" [disabled]="true"></tdx-tag>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      :host { display: block; }
      .tdx-tag-disabled-matrix { display: grid; gap: var(--space-3xl); padding: var(--space-3xl); }
      .tdx-tag-disabled-matrix__theme { background: var(--alias-surface-default); padding: var(--space-3xl); }
      .tdx-tag-disabled-matrix__row { display: flex; flex-wrap: wrap; gap: var(--space-md); }
    `,
  ],
})
class TagDisabledMatrixStoryComponent {
  readonly themes: TagStoryTheme[] = ['light', 'dark'];
  readonly variants = TDX_TAG_VARIANTS;
  readonly subtle = TdxTagEmphasis.Subtle;
}

export const StateMatrix: Story = {
  render: () => ({ template: '<tdx-tag-state-matrix-story></tdx-tag-state-matrix-story>' }),
  parameters: { controls: { disable: true } },
};

export const EmphasisMatrix: Story = {
  render: () => ({ template: '<tdx-tag-emphasis-matrix-story></tdx-tag-emphasis-matrix-story>' }),
  parameters: { controls: { disable: true } },
};

export const DisabledMatrix: Story = {
  render: () => ({ template: '<tdx-tag-disabled-matrix-story></tdx-tag-disabled-matrix-story>' }),
  parameters: { controls: { disable: true } },
};

const meta: Meta<TagStoryHostComponent> = {
  title: 'Components/Tag',
  component: TagStoryHostComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TagModule],
      declarations: [
        TagStoryHostComponent,
        TagStateMatrixStoryComponent,
        TagEmphasisMatrixStoryComponent,
        TagDisabledMatrixStoryComponent,
      ],
    }),
  ],
  argTypes: sharedArgTypes,
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
