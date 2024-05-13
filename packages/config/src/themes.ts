import { tokens } from './tokens';

/**
 * Dark theme to be set at a later time
 */
const defaultTheme = {
  background: tokens.color.white,
  color: tokens.color.black,
  yellow: tokens.color.mediumGoldenRod,
  grayLight: tokens.color.grayLight,
  gray: tokens.color.gray,
  grayDark: tokens.color.grayDark,
  grayDarker: tokens.color.grayDarker,
  title: tokens.color.prussianBlue,
};

export const themes = {
  dark: defaultTheme,
  light: defaultTheme,
};
