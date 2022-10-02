import CartStore from '../store/CartStore.js';
import capitalize from '../utils/capitalize.js';

const $productInfo = document.querySelector('.product-info');
const $colorOptions = $productInfo.querySelectorAll('.product-info__color-options__item');
const $sizeOptions = $productInfo.querySelectorAll('.product-info__size-options__item');

function handleAddItem() {
  const $portal = document.querySelector('.portal');

  $portal.classList.add('show-lightbox');
  document.body.classList.add('no-scroll');

  CartStore.dispatch({
    type: 'ADD_ITEM',
    payload: {
      name: 'Rasteira Tira Dedo',
      price: 55.2,
    },
  });
}

function changeCurrentActive(list, target) {
  list.forEach((item) => {
    if (item === target) {
      item.classList.add('active');
      return;
    }
    item.classList.remove('active');
  });
}

function handleProductColorChange({ currentTarget }) {
  changeCurrentActive($colorOptions, currentTarget);

  const $colorName = $productInfo.querySelector('.product-info__color-line .product-info__chosen-option');
  const color = currentTarget.getAttribute('data-value');

  $colorName.textContent = `(${capitalize(color)})`;
}

function handleProductSizeChange({ currentTarget }) {
  changeCurrentActive($sizeOptions, currentTarget);

  const $size = $productInfo.querySelector('.product-info__size-line .product-info__chosen-option');
  const size = currentTarget.getAttribute('data-value');

  $size.textContent = `(${size})`;
}

export function addProductInfoEvents() {
  const $addItemBtn = $productInfo.querySelector('.product-info__button');
  $addItemBtn.addEventListener('click', handleAddItem);

  $colorOptions.forEach((item) => {
    item.addEventListener('click', handleProductColorChange);
  });
  $sizeOptions.forEach((item) => {
    item.addEventListener('click', handleProductSizeChange);
  });
}
