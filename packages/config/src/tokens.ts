import { tokens as baseTokens } from '@tamagui/themes/v2';
import { createTokens } from 'tamagui';

/**
 * Generate sizes for font, radius, etc
 * Each value is the key times 4
 *
 * @param until the number of sizes to generate
 */
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
    none: 0,
    3.75: 15,
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
  zIndex: baseTokens.zIndex,
});
