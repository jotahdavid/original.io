export function addLightboxEvents() {
  const $portal = document.querySelector('.portal');
  const $addItemBtn = document.querySelector('.product-info__button');

  $addItemBtn.addEventListener('click', () => {
    $portal.classList.add('show-lightbox');
    document.body.classList.add('no-scroll');
  });

  const $lightbox = document.querySelector('.lightbox');
  const $confirmBtn = $lightbox.querySelector('.lightbox__confirm');
  const $continueBtn = $lightbox.querySelector('.lightbox__continue');
  const $closeBtn = $lightbox.querySelector('.close-button');

  [$confirmBtn, $continueBtn, $closeBtn].forEach((item) => {
    item.addEventListener('click', () => {
      $portal.classList.remove('show-lightbox');
      document.body.classList.remove('no-scroll');
    });
  });

  $confirmBtn.addEventListener('click', () => {
    $portal.classList.add('show-cart');
    document.body.classList.add('no-scroll');
  });
}
