/**
 * Capitalize the first letter of a string
 */
export const capitalize = ([firstLetter, ...restOfWord]: string) =>
  firstLetter.toLocaleUpperCase() + restOfWord.join('');

/**
 * Pad a number with leading zeros
 * @param number
 */
export const paddedNum = (number: Number) => String(number).padStart(4, '0');
