import { renderCartList } from './cart.js';

export function addLightboxEvents() {
  const $lightbox = document.querySelector('.lightbox');
  const $confirmBtn = $lightbox.querySelector('.lightbox__confirm');
  const $continueBtn = $lightbox.querySelector('.lightbox__continue');
  const $closeBtn = $lightbox.querySelector('.close-button');

  const $portal = document.querySelector('.portal');

  [$confirmBtn, $continueBtn, $closeBtn].forEach((item) => {
    item.addEventListener('click', () => {
      $portal.classList.remove('show-lightbox');
      document.body.classList.remove('no-scroll');
    });
  });

  $confirmBtn.addEventListener('click', () => {
    $portal.classList.add('show-cart');
    document.body.classList.add('no-scroll');
    renderCartList();
  });
}
