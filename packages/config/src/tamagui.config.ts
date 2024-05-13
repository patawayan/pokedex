import { createFont, createTamagui, createTokens } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { grayDark, tokens } from '@tamagui/themes/v2';
import { createMedia } from '@tamagui/react-native-media-driver';

import { animations } from '@my/ui/src/animations';

const generateSizes = (until = 100) => {
  const sizes = {
    0: 0,
    0.25: 1,
    0.5: 2,
    0.75: 3,
  };

  for (let i = 1; i < until; i += 0.5) {
    sizes[i] = i * 4;
  }

  return sizes;
};

const customTokens = createTokens({
  color: {
    white: '#FFFFFF',
    black: '#000000',
    grayLight: '#8A8A8A',
    gray: '#959595',
    grayDark: '#4A4A4A',
    grayDarker: '#363636',
    prussianBlue: '#02385A',
    pastelGreen: '#63E760',
    mediumGoldenRod: '#EAE8A6',
    hillary: '#A8A878',
    sun: '#F08030',
    cornflowerBlue: '#6890F0',
    saffron: '#F8D030',
    mantisGreen: '#78C850',
    regentStBlue: '#98D8D8',
    fireBrick: '#C03028',
    violetBlue: '#A040A0',
    chenin: '#E0C068',
    mediumSlateBlue: '#A890F0',
    brinkPink: '#F85888',
    bahia: '#A8B820',
    hokeyPokey: '#B8A038',
    butterflyBlush: '#705898',
    hanPurple: '#7038F8',
    quincy: '#705848',
    blueHaze: '#B8B8D0',
    chantilly: '#F0B6BC',
    summerSky: '#35ACE7',
  },
  radius: {
    none: 0,
    ...generateSizes(),
  },
  size: {
    none: 0,
    true: 12,
    ...generateSizes(),
  },
  space: {
    none: 0,
    true: 12,
    ...generateSizes(),
  },
  zIndex: tokens.zIndex,
});

const fonts = createFont({
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

/**
 * Dark theme to be set at a later date
 */
const defaultTheme = {
  background: customTokens.color.white,
  color: customTokens.color.black,
  yellow: customTokens.color.mediumGoldenRod,
  grayLight: customTokens.color.grayLight,
  gray: customTokens.color.gray,
  grayDark: customTokens.color.grayDark,
  grayDarker: customTokens.color.grayDarker,
  title: customTokens.color.prussianBlue,
};

export const config = createTamagui({
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,

  // highly recommended to turn this on if you are using shorthands
  // to avoid having multiple valid style keys that do the same thing
  // we leave it off by default because it can be confusing as you onboard.
  onlyAllowShorthands: false,
  shorthands,
  fonts: {
    body: fonts,
    heading: fonts,
  },
  tokens: customTokens,
  themes: {
    dark: defaultTheme,
    light: defaultTheme,
  },
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

// for the compiler to find it
export default config;
