export type StepperOrientation = 'vertical' | 'horizontal';

export type StepperVisualState = 'completed' | 'current' | 'upcoming' | 'incomplete' | 'disabled' | 'custom';

export type StepperSpecialState = Exclude<StepperVisualState, 'completed' | 'current' | 'upcoming'>;

export interface StepperStep {
  label: string;
  number?: number | string;
  state?: StepperVisualState;
  iconName?: string;
  customIconFill?: boolean;
}

export const STEPPER_ORIENTATIONS: readonly StepperOrientation[] = ['vertical', 'horizontal'] as const;
