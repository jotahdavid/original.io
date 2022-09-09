import CartStore from '../store/CartStore.js';
import CartItem from '../components/CartItem.js';

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
  $cartList.textContent = null;

  const $fragment = document.createDocumentFragment();

  cartItems.forEach((item) => {
    $fragment.appendChild(CartItem(item));
  });

  $cartList.appendChild($fragment);
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
