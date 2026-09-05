import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { StepperModule } from './stepper.module';
import { STEPPER_ORIENTATIONS, StepperOrientation, StepperStep, StepperVisualState } from './stepper.model';

const STEPPER_STATES: readonly StepperVisualState[] = [
  'completed',
  'current',
  'upcoming',
  'incomplete',
  'disabled',
  'custom',
];

type StepperStoryTheme = 'light' | 'dark';

@Component({
  selector: 'tdx-stepper-story-host',
  standalone: false,
  template: `
    <section class="tdx-stepper-story" [attr.data-theme]="theme">
      <tdx-stepper
        [steps]="steps"
        [orientation]="orientation"
        [showLeftConnector]="effectiveLeftConnector"
        [showRightConnector]="effectiveRightConnector"
        [iconName]="iconName"
        [customIconFill]="customIconFill">
      </tdx-stepper>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-stepper-story {
        align-items: flex-start;
        background: var(--alias-surface-default);
        box-sizing: border-box;
        display: flex;
        min-height: 120px;
        padding: var(--space-6xl);
      }

      @media (max-width: 760px) {
        .tdx-stepper-story {
          min-height: 100px;
          padding: var(--space-3xl);
        }
      }
    `,
  ],
})
class StepperStoryHostComponent {
  @Input() orientation: StepperOrientation = 'vertical';
  @Input() state: StepperVisualState = 'current';
  @Input() label = 'Step Label';
  @Input() stepNumber: number | string = 1;
  @Input() theme: StepperStoryTheme = 'light';
  @Input() showVerticalConnector = true;
  @Input() showLeftConnector = true;
  @Input() showRightConnector = true;
  @Input() iconName = 'docs';
  @Input() customIconFill = true;

  get steps(): StepperStep[] {
    return [
      {
        label: this.label,
        number: this.stepNumber,
        state: this.state,
      },
    ];
  }

  get effectiveLeftConnector(): boolean {
    return this.orientation === 'vertical' ? true : this.showLeftConnector;
  }

  get effectiveRightConnector(): boolean {
    return this.orientation === 'vertical' ? this.showVerticalConnector : this.showRightConnector;
  }
}

const meta: Meta<StepperStoryHostComponent> = {
  title: 'Components/Stepper',
  component: StepperStoryHostComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, StepperModule],
      declarations: [StepperStoryHostComponent],
    }),
  ],
  argTypes: {
    orientation: {
      control: 'select',
      options: STEPPER_ORIENTATIONS,
    },
    state: {
      control: 'select',
      options: STEPPER_STATES,
      description: 'Explicit visual state for the single Figma-aligned step.',
    },
    label: {
      control: 'text',
    },
    stepNumber: {
      control: 'text',
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
    showVerticalConnector: {
      control: 'boolean',
      description: 'Maps to the existing right-connector input for vertical Stepper rendering.',
      if: { arg: 'orientation', eq: 'vertical' },
    },
    showLeftConnector: {
      control: 'boolean',
      if: { arg: 'orientation', eq: 'horizontal' },
    },
    showRightConnector: {
      control: 'boolean',
      if: { arg: 'orientation', eq: 'horizontal' },
    },
    iconName: {
      control: 'text',
      description: 'Material Symbols icon name used only when state is custom, for example docs, home, or verified.',
    },
    customIconFill: {
      control: 'boolean',
      description: 'Filled Material Symbol when state is custom; false renders the outlined form.',
    },
  },
};

export default meta;

type Story = StoryObj<StepperStoryHostComponent>;

export const Playground: Story = {
  args: {
    orientation: 'vertical',
    state: 'current',
    label: 'Step Label',
    stepNumber: 1,
    theme: 'light',
    showVerticalConnector: true,
    showLeftConnector: true,
    showRightConnector: true,
    iconName: 'docs',
    customIconFill: true,
  },
};
