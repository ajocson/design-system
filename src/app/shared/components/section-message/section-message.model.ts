export type TdxSectionMessageAppearance = 'info' | 'success' | 'warning' | 'error' | 'discovery';
export type TdxSectionMessageSize = 'large' | 'medium';

export const TDX_SECTION_MESSAGE_APPEARANCES: readonly TdxSectionMessageAppearance[] = [
  'info',
  'success',
  'warning',
  'error',
  'discovery',
] as const;

export const TDX_SECTION_MESSAGE_SIZES: readonly TdxSectionMessageSize[] = ['large', 'medium'] as const;
