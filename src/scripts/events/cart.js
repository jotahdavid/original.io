export function addCartEvents() {
  const $portal = document.querySelector('.portal');
  const $bag = document.querySelectorAll('.purchases');

  $bag.forEach((item) => {
    item.addEventListener('click', () => {
      $portal.classList.add('show-cart');
      document.body.classList.add('no-scroll');
    });
  });

  const $cart = document.querySelector('.cart');
  const $closeBtn = $cart.querySelector('.close-button');

  $closeBtn.addEventListener('click', () => {
    $portal.classList.remove('show-cart');
    document.body.classList.remove('no-scroll');
  });
}
