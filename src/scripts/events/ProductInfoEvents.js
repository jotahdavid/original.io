import capitalize from '../utils/capitalize.js';

const $productInfo = document.querySelector('.product-info');
const $colorOptions = $productInfo.querySelectorAll('.product-info__color-options__item');

function handleProductColorChange({ currentTarget }) {
  $colorOptions.forEach((item) => {
    if (item === currentTarget) {
      item.classList.add('--active');
      return;
    }
    item.classList.remove('--active');
  });

  const $colorName = $productInfo.querySelector('.product-info__chosen-option');
  const color = currentTarget.getAttribute('value');

  $colorName.textContent = `(${capitalize(color)})`;
}

export function addProductInfoEvents() {
  $colorOptions.forEach((item) => {
    item.addEventListener('click', handleProductColorChange);
  });
}
