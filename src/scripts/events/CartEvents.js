import CartStore from '../store/CartStore.js';

const $cart = document.querySelector('.cart');
const $bags = document.querySelectorAll('.purchases');

function addCartVisibilityEvents() {
  const $portal = document.querySelector('.portal');

  $bags.forEach((item) => {
    item.addEventListener('click', () => {
      $portal.classList.add('show-cart');
      document.body.classList.add('no-scroll');

      renderCartList();
    });
  });

  const $closeBtn = $cart.querySelector('.close-button');

  $closeBtn.addEventListener('click', () => {
    $portal.classList.remove('show-cart');
    document.body.classList.remove('no-scroll');
  });
}

export function renderCartList() {
  const { items: cartItems } = CartStore.getState();

  const $cartList = $cart.querySelector('.cart__item-list');
  $cartList.innerHTML = '';

  cartItems.forEach((item) => {
    $cartList.innerHTML += `
      <li class="cart__item">
        <img class="cart__item__image" src="./src/images/products/prod02-small.png" alt="Preview do produto" />
        <div class="cart__item__info">
          <p class="cart__item__name">${item.name}</p>
          <p class="cart__item__price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
        </div>
        <div class="quantity-control">
          <button class="quantity-control__button">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.1673 15.1669H15.1673H12.834H5.83398V12.8336H12.834H15.1673H22.1673V15.1669Z"
                fill="black"
              />
            </svg>
          </button>
          <span class="quantity-control__value">01</span>
          <button class="quantity-control__button">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.1673 15.1669H15.1673V22.1669H12.834V15.1669H5.83398V12.8336H12.834V5.83359H15.1673V12.8336H22.1673V15.1669Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
        <button class="cart__item__clear">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.1673 7.47859L20.5223 5.83359L14.0007 12.3553L7.47898 5.83359L5.83398 7.47859L12.3557 14.0002L5.83398 20.5219L7.47898 22.1669L14.0007 15.6452L20.5223 22.1669L22.1673 20.5219L15.6457 14.0002L22.1673 7.47859Z"
              fill="black"
            />
          </svg>
        </button>
      </li>
    `;
  });
}

function handleNewItem() {
  const $cartAmount = $cart.querySelector('.cart__amount');
  const { items: cartItems } = CartStore.getState();

  $cartAmount.innerText = `${cartItems.length} ` + (cartItems.length === 1 ? 'item' : 'itens');

  $bags.forEach((item) => {
    item.querySelector('.purchases__amount').innerText = cartItems.length;
  });
}

export function addCartEvents() {
  addCartVisibilityEvents();
  CartStore.subscribe(handleNewItem);
}
