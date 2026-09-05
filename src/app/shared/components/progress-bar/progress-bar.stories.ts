import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ProgressBarModule } from './progress-bar.module';
import { TDX_PROGRESS_BAR_VARIANTS, TdxProgressBarVariant } from './progress-bar.model';

type ProgressBarStoryTheme = 'light' | 'dark';

@Component({
  selector: 'tdx-progress-bar-story-host',
  standalone: false,
  template: `
    <section class="tdx-progress-bar-story" [attr.data-theme]="theme">
      <tdx-progress-bar [variant]="variant" [progress]="progress"></tdx-progress-bar>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-progress-bar-story {
        background: var(--alias-surface-default);
        box-sizing: border-box;
        min-height: var(--space-10xl);
        padding: var(--space-6xl);
      }

      @media (max-width: 767px) {
        .tdx-progress-bar-story {
          padding: var(--space-3xl);
        }
      }
    `,
  ],
})
class ProgressBarStoryHostComponent implements OnInit, OnDestroy {
  @Input() variant: TdxProgressBarVariant = 'brand';
  @Input() theme: ProgressBarStoryTheme = 'light';
  @Input() animate = true;

  progress = 10;
  private progressTimer?: ReturnType<typeof setInterval>;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.animate) {
      return;
    }

    this.progressTimer = setInterval(() => {
      this.progress = (this.progress + 1) % 101;
      this.changeDetectorRef.markForCheck();
    }, 80);
  }

  ngOnDestroy(): void {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
  }
}

@Component({
  selector: 'tdx-progress-bar-matrix-story',
  standalone: false,
  template: `
    <div class="tdx-progress-bar-matrix-story">
      <section
        *ngFor="let theme of themes"
        class="tdx-progress-bar-matrix-story__theme"
        [attr.data-theme]="theme">
        <h3>{{ theme }} theme</h3>
        <div *ngFor="let variant of variants" class="tdx-progress-bar-matrix-story__variant">
          <h4>{{ variant }}</h4>
          <div class="tdx-progress-bar-matrix-story__values">
            <div *ngFor="let progress of progressValues" class="tdx-progress-bar-matrix-story__value">
              <span>{{ progress }}%</span>
              <tdx-progress-bar [variant]="variant" [progress]="progress"></tdx-progress-bar>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-progress-bar-matrix-story {
        display: grid;
        gap: var(--space-3xl);
        padding: var(--space-6xl);
      }

      .tdx-progress-bar-matrix-story__theme {
        background: var(--alias-surface-default);
        display: grid;
        gap: var(--space-xl);
        padding: var(--space-3xl);
      }

      .tdx-progress-bar-matrix-story__variant,
      .tdx-progress-bar-matrix-story__values {
        display: grid;
        gap: var(--space-md);
      }

      .tdx-progress-bar-matrix-story__values {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }

      .tdx-progress-bar-matrix-story__value {
        display: grid;
        gap: var(--space-xs);
      }

      @media (max-width: 767px) {
        .tdx-progress-bar-matrix-story {
          padding: var(--space-3xl);
        }

        .tdx-progress-bar-matrix-story__values {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
class ProgressBarMatrixStoryComponent {
  readonly themes: ProgressBarStoryTheme[] = ['light', 'dark'];
  readonly variants = TDX_PROGRESS_BAR_VARIANTS;
  readonly progressValues = [0, 25, 50, 75, 100];
}

const meta: Meta<ProgressBarStoryHostComponent> = {
  title: 'Components/Progress Bar',
  component: ProgressBarStoryHostComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ProgressBarModule],
      declarations: [ProgressBarMatrixStoryComponent, ProgressBarStoryHostComponent],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: TDX_PROGRESS_BAR_VARIANTS,
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<ProgressBarStoryHostComponent>;

export const Playground: Story = {
  args: {
    variant: 'brand',
    theme: 'light',
  },
};

const fixedVariantArgTypes = {
  variant: {
    table: {
      disable: true,
    },
  },
};

export const Brand: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    variant: 'brand',
    theme: 'light',
  },
};

export const Success: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    variant: 'success',
    theme: 'light',
  },
};

export const Processing: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    variant: 'processing',
    theme: 'light',
  },
};

export const DeterministicMatrix: Story = {
  render: () => ({
    template: '<tdx-progress-bar-matrix-story></tdx-progress-bar-matrix-story>',
  }),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
