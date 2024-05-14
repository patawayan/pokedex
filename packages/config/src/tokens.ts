import { tokens as baseTokens } from '@tamagui/themes/v2';
import { createTokens } from 'tamagui';

/**
 * Generate sizes for font, radius, etc
 * Each value is the key times 4
 *
 * @param until the number of sizes to generate
 */
const defaultSizes = {
  none: 0,
  full: '100%',
  0: 0,
  0.25: 1,
  0.5: 2,
  0.75: 3,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.75: 14,
  4: 16,
  4.5: 18,
  5: 20,
  6: 24,
  7: 28,
  7.5: 32,
  10: 40,
  14: 56,
  15: 60,
  19: 76,
  25: 100,
  35: 140,
  55: 220,
};

/**
 * Custom tokens for pokedex app
 */
export const tokens = createTokens({
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
    ...defaultSizes,
  },
  size: {
    true: 12,
    ...defaultSizes,
  },
  space: {
    true: 12,
    ...defaultSizes,
  },
  zIndex: baseTokens.zIndex,
});
