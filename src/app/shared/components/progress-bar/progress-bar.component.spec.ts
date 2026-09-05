import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressBarComponent } from './progress-bar.component';
import { ProgressBarModule } from './progress-bar.module';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getProgressBar = (): HTMLElement =>
    fixture.debugElement.query(By.css('[role="progressbar"]')).nativeElement as HTMLElement;

  it('renders the brand variant by default', () => {
    const progressBar = fixture.debugElement.query(By.css('.tdx-progress-bar')).nativeElement as HTMLElement;
    expect(progressBar.classList).toContain('tdx-progress-bar--brand');
  });

  it('renders the requested variant and progress', () => {
    fixture.componentRef.setInput('variant', 'processing');
    fixture.componentRef.setInput('progress', 75);
    fixture.detectChanges();

    const progressBar = fixture.debugElement.query(By.css('.tdx-progress-bar')).nativeElement as HTMLElement;
    const fill = fixture.debugElement.query(By.css('.tdx-progress-bar__fill')).nativeElement as HTMLElement;

    expect(progressBar.classList).toContain('tdx-progress-bar--processing');
    expect(fill.style.width).toBe('75%');
  });

  it('renders the success variant class', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();

    expect(getProgressBar().classList).toContain('tdx-progress-bar--success');
  });

  it('renders the required progressbar accessibility attributes', () => {
    fixture.componentRef.setInput('ariaLabel', 'Upload progress');
    fixture.componentRef.setInput('ariaValueText', '75 percent complete');
    fixture.detectChanges();

    const progressBar = getProgressBar();
    expect(progressBar.getAttribute('aria-valuemin')).toBe('0');
    expect(progressBar.getAttribute('aria-valuemax')).toBe('100');
    expect(progressBar.getAttribute('aria-valuenow')).toBe('75');
    expect(progressBar.getAttribute('aria-label')).toBe('Upload progress');
    expect(progressBar.getAttribute('aria-valuetext')).toBe('75 percent complete');
  });

  it('renders boundary progress values without changing them', () => {
    fixture.componentRef.setInput('progress', 0);
    fixture.detectChanges();
    expect(getProgressBar().getAttribute('aria-valuenow')).toBe('0');

    fixture.componentRef.setInput('progress', 100);
    fixture.detectChanges();
    expect(getProgressBar().getAttribute('aria-valuenow')).toBe('100');
  });

  it('clamps progress values below zero', () => {
    fixture.componentRef.setInput('progress', -25);
    fixture.detectChanges();

    expect(getProgressBar().getAttribute('aria-valuenow')).toBe('0');
  });

  it('clamps progress values above 100', () => {
    fixture.componentRef.setInput('progress', 120);
    fixture.detectChanges();

    expect(getProgressBar().getAttribute('aria-valuenow')).toBe('100');
  });
});
