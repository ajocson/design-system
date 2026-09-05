import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ProgressIndicatorModule } from './progress-indicator.module';
import {
  TDX_PROGRESS_INDICATOR_VALUE_TYPES,
  TdxProgressIndicatorValueType,
} from './progress-indicator.model';

type ProgressIndicatorStoryTheme = 'light' | 'dark';

@Component({
  selector: 'tdx-progress-indicator-story-host',
  standalone: false,
  template: `
    <section class="tdx-progress-indicator-story" [attr.data-theme]="theme">
      <tdx-progress-indicator
        [label]="label"
        [valueType]="valueType"
        [progress]="progress"
        [fractionValue]="fractionValue"
        [percentageValue]="percentageValue"
        [showFractionValue]="showFractionValue"
        [showPercentValue]="showPercentValue"
        [showCancel]="showCancel"
        (cancelled)="handleCancel()">
      </tdx-progress-indicator>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-progress-indicator-story {
        background: var(--alias-surface-default);
        box-sizing: border-box;
        min-height: var(--space-10xl);
        padding: var(--space-6xl);
      }

      @media (max-width: 767px) {
        .tdx-progress-indicator-story {
          padding: var(--space-3xl);
        }
      }
    `,
  ],
})
class ProgressIndicatorStoryHostComponent {
  @Input() label = 'Profile completion';
  @Input() valueType: TdxProgressIndicatorValueType = 'fraction';
  @Input() progress = 20;
  @Input() fractionValue = '1/5';
  @Input() percentageValue = '75%';
  @Input() showFractionValue = true;
  @Input() showPercentValue = true;
  @Input() showCancel = true;
  @Input() theme: ProgressIndicatorStoryTheme = 'light';

  handleCancel(): void {
    this.showCancel = false;
  }
}

const meta: Meta<ProgressIndicatorStoryHostComponent> = {
  title: 'Components/Progress Indicator',
  component: ProgressIndicatorStoryHostComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ProgressIndicatorModule],
      declarations: [ProgressIndicatorStoryHostComponent],
    }),
  ],
  argTypes: {
    valueType: {
      control: 'select',
      options: TDX_PROGRESS_INDICATOR_VALUE_TYPES,
    },
    progress: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<ProgressIndicatorStoryHostComponent>;

export const Playground: Story = {
  args: {
    label: 'Profile completion',
    valueType: 'fraction',
    progress: 20,
    fractionValue: '1/5',
    percentageValue: '75%',
    showFractionValue: true,
    showPercentValue: true,
    showCancel: true,
    theme: 'light',
  },
};

export const Fraction: Story = {
  args: {
    ...Playground.args,
    valueType: 'fraction',
  },
};

export const Percentage: Story = {
  args: {
    ...Playground.args,
    valueType: 'percentage',
    progress: 75,
  },
};
