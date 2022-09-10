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
    function handleAddItem() {
      if (item.amount < 99) {
        item.add();
        $cartQuantityValue.textContent = String(item.amount).padStart(2, 0);
      }
      if (item.amount >= 99) {
        $quantityAddBtn.disabled = true;
      }
      $quantitySubtractBtn.disabled = false;
    }

    function handleSubtractItem() {
      if (item.amount > 1) {
        item.subtract();
        $cartQuantityValue.textContent = String(item.amount).padStart(2, 0);
      }
      if (item.amount <= 1) {
        $quantitySubtractBtn.disabled = true;
      }
      $quantityAddBtn.disabled = false;
    }

    function handleRemoveItem() {
      CartStore.dispatch({ type: 'REMOVE_ITEM', payload: { key: item.key } });
      $cartItem.remove();
    }

    const $cartItem = CartItem({
      name: item.name,
      price: item.price,
      amount: item.amount,
      onAddItem: handleAddItem,
      onSubtractItem: handleSubtractItem,
      onRemove: handleRemoveItem,
    });

    const $quantitySubtractBtn = $cartItem.querySelector('.quantity-control__button--subtract');
    const $quantityAddBtn = $cartItem.querySelector('.quantity-control__button--add');
    const $cartQuantityValue = $cartItem.querySelector('.quantity-control__value');

    $fragment.appendChild($cartItem);
  });

  $cartList.appendChild($fragment);
}

function changeCartAmount() {
  const $cartAmount = $cart.querySelector('.cart__amount');
  const { items: cartItems } = CartStore.getState();

  $cartAmount.innerText = `${cartItems.length} ` + (cartItems.length === 1 ? 'item' : 'itens');

  $bags.forEach((item) => {
    item.querySelector('.purchases__amount').innerText = cartItems.length;
  });
}

export function addCartEvents() {
  addCartVisibilityEvents();
  CartStore.subscribe(changeCartAmount);
}
