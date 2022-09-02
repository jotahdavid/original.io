import { addMatchMediaEvents, smallOnlyMedia } from './matchMedia.js';
import Carousel from './carousel.js';
import Gallery from './gallery.js';

const carousel = new Carousel('.carousel-vertical__gallery');
const gallery = new Gallery('.carousel-horizontal', { perPage: 4, onChangePage: handleChangePage });

function handleChangePage(page, limit) {
  const $index = gallery._element.querySelector('.carousel-horizontal__controllers__index');
  $index.textContent = `${page} de ${limit}`;
}

async function updateGallery(matches) {
  await gallery.scroll(0);
  gallery.itemPerPage = matches ? 2 : 4;
  gallery.updatePage();
}

window.addEventListener('DOMContentLoaded', () => {
  addMatchMediaEvents();
  window.addEventListener('resize', () => updateGallery(smallOnlyMedia.matches));
  updateGallery(smallOnlyMedia.matches);
  carousel.addEventListener();
  gallery.addEventListener();
});

(function () {
  const $portal = document.querySelector('.portal');
  const $addItemBtn = document.querySelector('.product-info__button');

  $addItemBtn.addEventListener('click', () => {
    $portal.classList.add('show-lightbox');
  });

  const $lightbox = document.querySelector('.lightbox');
  const $confirmBtn = $lightbox.querySelector('.lightbox__confirm');
  const $continueBtn = $lightbox.querySelector('.lightbox__continue');
  const $closeBtn = $lightbox.querySelector('.close-button');

  [$confirmBtn, $continueBtn, $closeBtn].forEach((item) => {
    item.addEventListener('click', () => {
      $portal.classList.remove('show-lightbox');
    });
  });

  const $purchases = document.querySelectorAll('.purchases');

  $purchases.forEach((item) => {
    item.addEventListener('click', () => {
      $portal.classList.add('show-cart');
    });
  });

  const $cart = document.querySelector('.cart');
  const $closeCartBtn = $cart.querySelector('.close-button');

  $closeCartBtn.addEventListener('click', () => {
    $portal.classList.remove('show-cart');
  });
})();
