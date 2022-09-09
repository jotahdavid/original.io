import createElement from '../utils/createElement.js';

/**
 * @param {{
 *  name: string;
 *  price: number;
 *  amount: number;
 * }} item
 * @returns {HTMLElement}
 */
function CartItem({ name, price, amount }) {
  return createElement(
    'li',
    { className: 'cart__item' },
    createElement('img', {
      className: 'cart__item__image',
      src: './src/images/products/prod02-small.png',
      alt: 'Preview do produto',
    }),
    createElement(
      'div',
      {
        className: 'cart__item__info',
      },
      createElement('p', { className: 'cart__item__name' }, name),
      createElement('p', { className: 'cart__item__price' }, `R$ ${price.toFixed(2).replace('.', ',')}`)
    ),
    createElement(
      'div',
      { className: 'quantity-control' },
      createElement('button', {
        className: 'quantity-control__button',
        html: `
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.1673 15.1669H15.1673H12.834H5.83398V12.8336H12.834H15.1673H22.1673V15.1669Z"
              fill="black"
            />
          </svg>
        `,
      }),
      createElement('span', { className: 'quantity-control__value' }, String(amount).padStart(2, 0)),
      createElement('button', {
        className: 'quantity-control__button',
        html: `
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.1673 15.1669H15.1673V22.1669H12.834V15.1669H5.83398V12.8336H12.834V5.83359H15.1673V12.8336H22.1673V15.1669Z"
              fill="black"
            />
          </svg>
        `,
      })
    ),
    createElement('button', {
      className: 'cart__item__clear',
      html: `
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.1673 7.47859L20.5223 5.83359L14.0007 12.3553L7.47898 5.83359L5.83398 7.47859L12.3557 14.0002L5.83398 20.5219L7.47898 22.1669L14.0007 15.6452L20.5223 22.1669L22.1673 20.5219L15.6457 14.0002L22.1673 7.47859Z"
            fill="black"
          />
        </svg>
      `,
    })
  );
}

export default CartItem;
