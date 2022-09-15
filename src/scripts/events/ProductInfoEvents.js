import capitalize from '../utils/capitalize.js';

const $productInfo = document.querySelector('.product-info');
const $colorOptions = $productInfo.querySelectorAll('.product-info__color-options__item');
const $sizeOptions = $productInfo.querySelectorAll('.product-info__size-options__item');

function handleProductColorChange({ currentTarget }) {
  $colorOptions.forEach((item) => {
    if (item === currentTarget) {
      item.classList.add('--active');
      return;
    }
    item.classList.remove('--active');
  });

  const $colorName = $productInfo.querySelector('.product-info__color-line .product-info__chosen-option');
  const color = currentTarget.getAttribute('value');

  $colorName.textContent = `(${capitalize(color)})`;
}

function handleProductSizeChange({ currentTarget }) {
  $sizeOptions.forEach((item) => {
    if (item === currentTarget) {
      item.classList.add('--active');
      return;
    }
    item.classList.remove('--active');
  });

  const $size = $productInfo.querySelector('.product-info__size-line .product-info__chosen-option');
  const size = currentTarget.getAttribute('value');

  $size.textContent = `(${size})`;
}

export function addProductInfoEvents() {
  $colorOptions.forEach((item) => {
    item.addEventListener('click', handleProductColorChange);
  });
  $sizeOptions.forEach((item) => {
    item.addEventListener('click', handleProductSizeChange);
  });
}
