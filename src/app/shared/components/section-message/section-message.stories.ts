import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  TDX_SECTION_MESSAGE_APPEARANCES,
  TDX_SECTION_MESSAGE_SIZES,
  TdxSectionMessageAppearance,
  TdxSectionMessageSize,
} from './section-message.model';
import { SectionMessageModule } from './section-message.module';

type SectionMessageStoryTheme = 'light' | 'dark';

@Component({
  selector: 'tdx-section-message-story-host',
  standalone: false,
  template: `
    <section class="tdx-section-message-story" [attr.data-theme]="theme">
      <tdx-section-message
        [appearance]="appearance"
        [size]="size"
        [title]="title"
        [description]="description"
        [showTitle]="showTitle"
        [showDescription]="showDescription"
        [showAction1]="showAction1"
        [showAction2]="showAction2"
        [label1]="label1"
        [label2]="label2"
        [isDismissible]="isDismissible"
        [icon]="icon || null"
        [iconFill]="iconFill">
      </tdx-section-message>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-section-message-story {
        background: var(--alias-surface-default);
        box-sizing: border-box;
        min-height: 180px;
        padding: var(--space-6xl);
      }

      @media (max-width: 767px) {
        .tdx-section-message-story {
          padding: var(--space-3xl);
        }
      }
    `,
  ],
})
class SectionMessageStoryHostComponent {
  @Input() appearance: TdxSectionMessageAppearance = 'info';
  @Input() size: TdxSectionMessageSize = 'large';
  @Input() title = 'Section Message';
  @Input() description = 'A section message is used to alert users to a particular section of the screen.';
  @Input() showTitle = true;
  @Input() showDescription = true;
  @Input() showAction1 = true;
  @Input() showAction2 = true;
  @Input() label1 = 'Action';
  @Input() label2 = 'Action';
  @Input() isDismissible = true;
  @Input() icon = '';
  @Input() iconFill: boolean | null = null;
  @Input() theme: SectionMessageStoryTheme = 'light';
}

const meta: Meta<SectionMessageStoryHostComponent> = {
  title: 'Components/Section Message',
  component: SectionMessageStoryHostComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SectionMessageModule],
      declarations: [SectionMessageStoryHostComponent],
    }),
  ],
  argTypes: {
    appearance: {
      control: 'select',
      options: TDX_SECTION_MESSAGE_APPEARANCES,
    },
    size: {
      control: 'select',
      options: TDX_SECTION_MESSAGE_SIZES,
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    showTitle: {
      control: 'boolean',
    },
    showDescription: {
      control: 'boolean',
    },
    showAction1: {
      control: 'boolean',
    },
    showAction2: {
      control: 'boolean',
    },
    label1: {
      control: 'text',
    },
    label2: {
      control: 'text',
    },
    isDismissible: {
      control: 'boolean',
    },
    icon: {
      control: 'text',
      description: 'Material Symbols name. Leave blank to use the appearance default.',
    },
    iconFill: {
      control: 'boolean',
      description: 'Toggle the leading Material Symbol between filled and outlined.',
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<SectionMessageStoryHostComponent>;

export const Playground: Story = {
  args: {
    appearance: 'info',
    size: 'large',
    title: 'Section Message',
    description: 'A section message is used to alert users to a particular section of the screen.',
    showTitle: true,
    showDescription: true,
    showAction1: true,
    showAction2: true,
    label1: 'Action',
    label2: 'Action',
    isDismissible: true,
    icon: '',
    iconFill: true,
    theme: 'light',
  },
};
