import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SectionMessageComponent } from './section-message.component';
import { SectionMessageModule } from './section-message.module';

describe('SectionMessageComponent', () => {
  let fixture: ComponentFixture<SectionMessageComponent>;
  let component: SectionMessageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionMessageModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getMessage = (): HTMLElement => fixture.debugElement.query(By.css('.tdx-section-message')).nativeElement as HTMLElement;

  it('creates an info message by default', () => {
    expect(component).toBeTruthy();
    expect(getMessage().classList).toContain('tdx-section-message--info');
    expect(fixture.debugElement.query(By.css('.tdx-section-message__icon')).nativeElement.textContent).toContain('info');
  });

  it('hugs the visible default content instead of retaining the Figma documentation-frame dimensions', () => {
    const message = getMessage();
    const iconBox = fixture.debugElement.query(By.css('.tdx-section-message__icon-box')).nativeElement as HTMLElement;
    const content = fixture.debugElement.query(By.css('.tdx-section-message__content')).nativeElement as HTMLElement;

    expect(message.getBoundingClientRect().width).toBeLessThan(607);
    expect(message.getBoundingClientRect().height).toBeLessThan(124);
    expect(iconBox.getBoundingClientRect().width).toBe(24);
    expect(content.getBoundingClientRect().width).toBeLessThan(511);
  });

  it('uses the Figma typography, background, and filled 24px icon treatment', () => {
    const message = getMessage();
    const title = fixture.debugElement.query(By.css('.tdx-section-message__title')).nativeElement as HTMLElement;
    const description = fixture.debugElement.query(By.css('.tdx-section-message__description')).nativeElement as HTMLElement;
    const icon = fixture.debugElement.query(By.css('.tdx-section-message__icon')).nativeElement as HTMLElement;

    expect(getComputedStyle(message).backgroundColor).toBe('rgb(238, 249, 252)');
    expect(getComputedStyle(title).fontSize).toBe('16px');
    expect(getComputedStyle(title).lineHeight).toBe('24px');
    expect(getComputedStyle(description).fontSize).toBe('14px');
    expect(getComputedStyle(description).lineHeight).toBe('20px');
    expect(getComputedStyle(icon).fontSize).toBe('24px');
    expect(getComputedStyle(icon).fontVariationSettings).toContain('1');
  });

  it('supports the requested outline Material Symbols treatment for the leading icon', () => {
    fixture.componentRef.setInput('iconFill', false);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.tdx-section-message__icon')).nativeElement as HTMLElement;

    expect(getComputedStyle(icon).fontVariationSettings).toContain('0');
  });

  it('maps Medium to the Figma compact layout and outlined icon treatment', () => {
    fixture.componentRef.setInput('size', 'medium');
    fixture.detectChanges();

    const message = getMessage();
    const title = fixture.debugElement.query(By.css('.tdx-section-message__title')).nativeElement as HTMLElement;
    const description = fixture.debugElement.query(By.css('.tdx-section-message__description')).nativeElement as HTMLElement;
    const icon = fixture.debugElement.query(By.css('.tdx-section-message__icon')).nativeElement as HTMLElement;

    expect(message.classList).toContain('tdx-section-message--medium');
    expect(message.getBoundingClientRect().width).toBeLessThanOrEqual(537);
    expect(getComputedStyle(title).fontSize).toBe('14px');
    expect(getComputedStyle(title).lineHeight).toBe('20px');
    expect(getComputedStyle(description).fontSize).toBe('12px');
    expect(getComputedStyle(description).lineHeight).toBe('16px');
    expect(getComputedStyle(icon).fontSize).toBe('20px');
    expect(getComputedStyle(icon).fontVariationSettings).toContain('0');
  });

  it('centers content vertically while keeping leading and dismiss icons top-aligned', () => {
    const iconBox = fixture.debugElement.query(By.css('.tdx-section-message__icon-box')).nativeElement as HTMLElement;
    const content = fixture.debugElement.query(By.css('.tdx-section-message__content')).nativeElement as HTMLElement;
    const dismiss = fixture.debugElement.query(By.css('.tdx-section-message__dismiss')).nativeElement as HTMLElement;

    expect(getComputedStyle(content).alignSelf).toBe('center');
    expect(getComputedStyle(iconBox).alignSelf).toBe('flex-start');
    expect(getComputedStyle(dismiss).alignSelf).toBe('flex-start');
  });

  it('renders the Figma title and description properties', () => {
    fixture.componentRef.setInput('title', 'Saved');
    fixture.componentRef.setInput('description', 'Your changes were saved.');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Saved');
    expect(fixture.nativeElement.textContent).toContain('Your changes were saved.');
  });

  it('supports the Figma appearance variants and their default icons', () => {
    const expectations = [
      ['success', 'check_circle', 'rgb(244, 253, 238)'],
      ['warning', 'warning', 'rgb(253, 235, 208)'],
      ['error', 'warning', 'rgb(252, 225, 230)'],
      ['discovery', 'lightbulb', 'rgb(238, 230, 250)'],
    ] as const;

    for (const [appearance, icon, background] of expectations) {
      fixture.componentRef.setInput('appearance', appearance);
      fixture.detectChanges();

      expect(getMessage().classList).toContain(`tdx-section-message--${appearance}`);
      expect(fixture.debugElement.query(By.css('.tdx-section-message__icon')).nativeElement.textContent).toContain(icon);
      expect(getComputedStyle(getMessage()).backgroundColor).toBe(background);
    }
  });

  it('resolves Section Message component tokens in dark theme', () => {
    fixture.nativeElement.setAttribute('data-theme', 'dark');
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.tdx-section-message__title')).nativeElement as HTMLElement;

    expect(getComputedStyle(getMessage()).backgroundColor).toBe('rgb(14, 74, 85)');
    expect(getComputedStyle(title).color).toBe('rgb(249, 250, 251)');
  });

  it('supports the error appearance and default warning icon', () => {
    fixture.componentRef.setInput('appearance', 'error');
    fixture.detectChanges();

    expect(getMessage().classList).toContain('tdx-section-message--error');
    expect(fixture.debugElement.query(By.css('.tdx-section-message__icon')).nativeElement.textContent).toContain('warning');
    expect(getComputedStyle(getMessage()).backgroundColor).toBe('rgb(252, 225, 230)');
  });

  it('supports the Figma show-title and show-description properties', () => {
    fixture.componentRef.setInput('showTitle', false);
    fixture.componentRef.setInput('showDescription', false);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.tdx-section-message__title'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.tdx-section-message__description'))).toBeNull();
  });

  it('supports a Material Symbols icon override', () => {
    fixture.componentRef.setInput('icon', 'info');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.tdx-section-message__icon')).nativeElement.textContent).toContain('info');
  });

  it('renders and emits its Figma action and dismiss controls', () => {
    const action1Spy = jasmine.createSpy('action1Clicked');
    const action2Spy = jasmine.createSpy('action2Clicked');
    const dismissSpy = jasmine.createSpy('dismissed');
    component.action1Clicked.subscribe(action1Spy);
    component.action2Clicked.subscribe(action2Spy);
    component.dismissed.subscribe(dismissSpy);

    const actionButtons = fixture.debugElement.queryAll(By.css('.tdx-section-message__action'));
    const dismissButton = fixture.debugElement.query(By.css('.tdx-section-message__dismiss'));

    expect(actionButtons.length).toBe(2);
    expect(dismissButton.nativeElement.getAttribute('aria-label')).toBe('Dismiss message');

    actionButtons[0].nativeElement.click();
    actionButtons[1].nativeElement.click();
    dismissButton.nativeElement.click();

    expect(action1Spy).toHaveBeenCalled();
    expect(action2Spy).toHaveBeenCalled();
    expect(dismissSpy).toHaveBeenCalled();
  });

  it('can independently hide actions and lets the message hug its remaining content', () => {
    fixture.componentRef.setInput('showAction1', false);
    fixture.componentRef.setInput('showAction2', false);
    fixture.componentRef.setInput('isDismissible', false);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.tdx-section-message__actions'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.tdx-section-message__dismiss'))).toBeNull();
    expect(getMessage().getBoundingClientRect().height).toBe(80);
  });
});
