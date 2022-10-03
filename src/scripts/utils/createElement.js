import isEmpty from './isEmpty.js';
import typeOf from './typeOf.js';

function getElementByTag(tag) {
  if (tag instanceof HTMLElement) {
    return tag;
  }
  if (typeOf(tag) !== 'string') {
    throw new TypeError('tag must be string or an element');
  }
  if (tag.toLowerCase() === 'fragment') {
    return document.createDocumentFragment();
  }
  return document.createElement(tag);
}

/**
 * @param {string | HTMLElement} tag
 * @param {Record<string, string | number | boolean | Function>} attributes
 * @param  {...string | Node} content
 * @returns {HTMLElement}
 */
export default function createElement(tag, attributes, ...content) {
  const $element = getElementByTag(tag);
  if (attributes) {
    for (const [attribute, value] of Object.entries(attributes)) {
      const attr = attribute.toLowerCase();
      if (attr === 'classname') {
        $element.setAttribute('class', value.trim());
      } else if (attr.startsWith('on') && typeof value === 'function') {
        $element.addEventListener(attr.slice(2), value);
      } else if (attr === 'html') {
        $element.innerHTML = value;
      } else if (attr in $element) {
        $element[attr] = value;
      } else {
        $element.setAttribute(attr, value);
      }
    }
  }
  if (!isEmpty(content)) {
    for (const value of content) {
      if (value !== 0 && !Boolean(value)) {
        continue;
      }
      if (Array.isArray(value)) {
        $element.append(...value);
        continue;
      }
      $element.append(value);
    }
  }
  return $element;
}
