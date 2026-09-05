import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TagComponent } from './tag.component';
import { TdxTagEmphasis, TdxTagVariant } from './tag.model';
import { TagModule } from './tag.module';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the label', () => {
    fixture.componentRef.setInput('label', 'Reviewed');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('.tdx-tag__label')).nativeElement as HTMLElement;

    expect(label.textContent?.trim()).toBe('Reviewed');
  });

  it('renders a decorative leading icon when provided', () => {
    fixture.componentRef.setInput('leadingIcon', 'info');
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.tdx-tag__icon')).nativeElement as HTMLElement;

    expect(icon.textContent?.trim()).toBe('info');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies variant and emphasis classes', () => {
    fixture.componentRef.setInput('variant', TdxTagVariant.Success);
    fixture.componentRef.setInput('emphasis', TdxTagEmphasis.Outline);
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('.tdx-tag')).nativeElement as HTMLElement;

    expect(tag.classList).toContain('tdx-tag--success');
    expect(tag.classList).toContain('tdx-tag--outline');
  });

  it('preserves the 22px base height and tokenized dimensions', () => {
    const tag = fixture.debugElement.query(By.css('.tdx-tag')).nativeElement as HTMLElement;
    tag.style.setProperty('--tag-height', '22px');
    tag.style.setProperty('--tag-border-width', '1px');
    tag.style.setProperty('--tag-radius', '9999px');
    fixture.detectChanges();

    const styles = getComputedStyle(tag);

    expect(styles.height).toBe('22px');
    expect(styles.borderRadius).toBe('9999px');
  });

  it('uses the verified leading and removable icon sizes', () => {
    fixture.componentRef.setInput('leadingIcon', 'info');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('.tdx-tag')).nativeElement as HTMLElement;
    tag.style.setProperty('--tag-icon-size', '12px');
    tag.style.setProperty('--tag-remove-size', '16px');
    tag.style.setProperty('--tag-remove-icon-size', '16px');
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.tdx-tag__icon')).nativeElement as HTMLElement;
    const remove = fixture.debugElement.query(By.css('.tdx-tag__remove')).nativeElement as HTMLElement;
    const removeIcon = fixture.debugElement.query(By.css('.tdx-tag__remove-icon')).nativeElement as HTMLElement;

    expect(getComputedStyle(icon).width).toBe('12px');
    expect(getComputedStyle(remove).width).toBe('16px');
    expect(getComputedStyle(removeIcon).width).toBe('16px');
  });

  it('uses a 2px focus-ring expansion while retaining focus-within behavior', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('.tdx-tag')).nativeElement as HTMLElement;
    const remove = fixture.debugElement.query(By.css('.tdx-tag__remove')).nativeElement as HTMLButtonElement;
    tag.style.setProperty('--tag-focus-ring-width', '2px');
    tag.style.setProperty('--tag-focus-ring-offset', '2px');
    tag.style.setProperty('--tag-focus-ring', 'rgb(0, 0, 0)');
    tag.style.setProperty('--tag-radius', '9999px');
    remove.focus();

    expect(getComputedStyle(tag, '::after').inset).toBe('-2px');
    expect(document.activeElement).toBe(remove);
  });

  it('retains hover and pressed state token wiring across emphasis modes', () => {
    fixture.componentRef.setInput('variant', TdxTagVariant.Warning);
    fixture.componentRef.setInput('emphasis', TdxTagEmphasis.Filled);
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('.tdx-tag')).nativeElement as HTMLElement;

    expect(tag.classList).toContain('tdx-tag--warning');
    expect(tag.classList).toContain('tdx-tag--filled');
    expect(tag.matches(':hover')).toBeFalse();
  });

  it('applies the disabled opacity token without changing the public API', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('.tdx-tag')).nativeElement as HTMLElement;
    tag.style.setProperty('--tag-disabled-opacity', '40%');
    fixture.detectChanges();

    expect(getComputedStyle(tag).opacity).toBe('0.4');
  });

  it('renders a removable action when removable is true', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('label', 'Status');
    fixture.detectChanges();

    const remove = fixture.debugElement.query(By.css('.tdx-tag__remove')).nativeElement as HTMLButtonElement;

    expect(remove).toBeTruthy();
    expect(remove.getAttribute('aria-label')).toBe('Remove Status');
  });

  it('emits removed when the remove action is clicked', () => {
    spyOn(component.removed, 'emit');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const remove = fixture.debugElement.query(By.css('.tdx-tag__remove')).nativeElement as HTMLButtonElement;
    remove.click();

    expect(component.removed.emit).toHaveBeenCalledTimes(1);
  });

  it('disables the remove action and does not emit when disabled', () => {
    spyOn(component.removed, 'emit');
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const remove = fixture.debugElement.query(By.css('.tdx-tag__remove')).nativeElement as HTMLButtonElement;
    remove.click();

    expect(remove.disabled).toBeTrue();
    expect(component.removed.emit).not.toHaveBeenCalled();
  });
});
