import createElement from '../utils/createElement.js';

/**
 * @typedef {import('../gallery.js').ProductColor} ProductColor
 */

/**
 * @param {{
 *  className?: string;
 *  imageUrl: string;
 *  price: string;
 *  colors: ProductColor[];
 * }} props
 * @returns {HTMLLIElement}
 */
function GalleryProduct({ className, imageUrl, price, colors }) {
  return createElement(
    'li',
    {
      className: 'gallery-item ' + className,
    },
    createElement(
      'div',
      {
        className: 'carousel-horizontal__product-img',
      },
      createElement('img', { src: imageUrl, alt: 'Product image' })
    ),
    createElement(
      'div',
      {
        className: 'carousel-horizontal__product-info',
      },
      createElement('span', { className: 'carousel-horizontal__product-info__price' }, price),
      createElement(
        'ul',
        { className: 'carousel-horizontal__product-info__colors-list' },
        colors.map((color) =>
          createElement('li', {
            className: 'carousel-horizontal__product-info__color',
            'data-color': color.code,
            value: color.name,
            style: `--color: ${color.code}`,
          })
        )
      )
    )
  );
}

export default GalleryProduct;
