import typeOf from './typeOf.js';

export default function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length <= 0;
  }
  if (typeOf(value) === 'object') {
    return Object.keys(value).length <= 0;
  }
  if (typeOf(value) === 'string') {
    return value.length <= 0;
  }
  return typeOf(value) === 'null' || typeOf(value) === 'undefined';
}
