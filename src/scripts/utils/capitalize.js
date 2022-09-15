/**
 * @param {string} text
 * @returns {string}
 */
export default function capitalize(text) {
  return text.replace(/\w/, (letter) => letter.toUpperCase());
}
