/**
 * @param {*} value
 * @returns {'string' | 'number' | 'boolean' | 'function' | 'array' | 'object' | 'null' | 'undefined' | string }
 */
export default function typeOf(value) {
  return Object.prototype.toString
    .call(value)
    .replace(/(\[|\])/g, '')
    .split(' ')[1]
    .toLowerCase();
}
