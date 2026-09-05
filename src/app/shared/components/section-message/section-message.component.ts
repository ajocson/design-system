import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TdxSectionMessageAppearance, TdxSectionMessageSize } from './section-message.model';

@Component({
  selector: 'tdx-section-message, app-section-message',
  standalone: false,
  templateUrl: './section-message.component.html',
  styleUrls: ['./section-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionMessageComponent {
  @Input() title = 'Section Message';
  @Input() description = 'A section message is used to alert users to a particular section of the screen.';
  @Input() appearance: TdxSectionMessageAppearance = 'info';
  @Input() size: TdxSectionMessageSize = 'large';
  @Input() showTitle = true;
  @Input() showDescription = true;
  @Input() showAction1 = true;
  @Input() showAction2 = true;
  @Input() label1 = 'Action';
  @Input() label2 = 'Action';
  @Input() isDismissible = true;
  @Input() icon?: string | null;
  @Input() iconFill: boolean | null = null;

  @Output() action1Clicked = new EventEmitter<MouseEvent>();
  @Output() action2Clicked = new EventEmitter<MouseEvent>();
  @Output() dismissed = new EventEmitter<MouseEvent>();

  get resolvedIcon(): string {
    if (this.icon) {
      return this.icon;
    }

    const icons: Record<TdxSectionMessageAppearance, string> = {
      info: 'info',
      success: 'check_circle',
      warning: 'warning',
      error: 'warning',
      discovery: 'lightbulb',
    };

    return icons[this.appearance];
  }

  get iconFontVariation(): string {
    return `'FILL' ${this.resolvedIconFill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`;
  }

  get resolvedIconFill(): boolean {
    return this.iconFill ?? this.size === 'large';
  }

  get sectionMessageClasses(): Record<string, boolean> {
    return {
      [`tdx-section-message--${this.appearance}`]: true,
      [`tdx-section-message--${this.size}`]: true,
    };
  }
}
