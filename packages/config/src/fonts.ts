import { createFont } from 'tamagui';

export const fonts = createFont({
  family: 'Roboto, Arial, sans-serif',
  size: {
    3: 12,
    3.5: 14,
    4.5: 18,
  },
  lineHeight: {
    xs: 14.06,
    sm: 17.5,
    md: 18,
    lg: 22.5,
  },
  letterSpacing: {
    true: 0.16,
  },
});
