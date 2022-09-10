/**
 * @param {string | HTMLElement} tag
 * @param {Record<string, string | number | boolean | Function>} attributes
 * @param  {...string | Node} content
 * @returns {HTMLElement}
 */
export default function createElement(tag, attributes, ...content) {
  const $element = !(tag instanceof HTMLElement) ? document.createElement(tag) : tag;
  if (attributes) {
    for (const [attribute, value] of Object.entries(attributes)) {
      const attr = attribute.toLowerCase();
      if (attr === 'classname') {
        $element.setAttribute('class', value);
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
  if (content && content.length) {
    $element.append(...content);
  }
  return $element;
}
