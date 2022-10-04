/**
 * @param {number | string} value
 * @returns {string}
 */
export default function doubleDigit(value) {
  return String(value).padStart(2, 0);
}
