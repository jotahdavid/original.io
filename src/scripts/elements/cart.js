import CartStore from '../store/CartStore.js';
import CartItem from '../components/CartItem.js';
import R$ from '../utils/formatCurrency.js';
import Cart from '../lib/Cart/index.js';

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

  const $finishOrderBtn = $cart.querySelector('.cart__cta');

  $finishOrderBtn.addEventListener('click', () => {
    CartStore.dispatch({ type: 'FINISH_ORDER' });
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
        CartStore.dispatch({ type: 'INCREASE_ITEM_AMOUNT', payload: { key: item.key } });
        $cartQuantityValue.textContent = String(item.amount).padStart(2, 0);
      }
      if (item.amount >= 99) {
        $quantityAddBtn.disabled = true;
      }
      $quantitySubtractBtn.disabled = false;
    }

    function handleSubtractItem() {
      if (item.amount > 1) {
        CartStore.dispatch({ type: 'DECREASE_ITEM_AMOUNT', payload: { key: item.key } });
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

function changeCartTotalPrice() {
  const { total } = CartStore.getState();
  const $cartFooter = $cart.querySelector('.cart__footer');
  const $cartTotalPrice = $cart.querySelector('.cart__total-price__value');
  const $cartInstallments = $cart.querySelector('.cart__installments');

  if (total <= 0) {
    $cartFooter.classList.add('no-display');
  } else {
    $cartFooter.classList.remove('no-display');
  }

  $cartTotalPrice.textContent = R$(total);
  $cartInstallments.textContent = total > 0 ? `até 3x de ${R$(Cart.getInstallments(3))} sem juros` : null;
}

export function addCartEvents() {
  addCartVisibilityEvents();
  CartStore.subscribe(changeCartAmount);
  CartStore.subscribe(changeCartTotalPrice);
  CartStore.dispatch({
    type: 'ADD_ITEM',
    payload: {
      name: 'Rasteira Tira Dedo',
      price: 55.2,
    },
  });
}
