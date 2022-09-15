import Carousel from './components/Carousel/index.js';
import Gallery from './components/Gallery/index.js';

import { addMatchMediaEvents, smallOnlyMedia } from './matchMedia.js';
import { addCartEvents } from './elements/cart.js';
import { addLightboxEvents } from './elements/lightbox.js';
import { addProductInfoEvents } from './elements/productInfo.js';
import { renderGalleryItems } from './elements/gallery.js';
import shuffleArray from './utils/shuffleArray.js';

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

function preventEvents() {
  const $anchors = document.querySelectorAll('a');
  $anchors.forEach((item) => {
    item.addEventListener('click', (event) => {
      if (event.currentTarget.getAttribute('href') === '#') {
        event.preventDefault();
      }
    });
  });

  const $forms = document.querySelectorAll('form');
  $forms.forEach((item) => {
    item.addEventListener('submit', (event) => event.preventDefault());
  });
}

function setColorOptions() {
  const $colorOptions = document.querySelectorAll('[data-color]');
  $colorOptions.forEach((item) => {
    item.style.setProperty('--color', item.getAttribute('data-color'));
  });
}

async function getProducts() {
  const pathname = window.location.pathname;
  const response = await fetch(pathname + 'src/data/products.json');
  const { products } = await response.json();
  const shuffledProducts = shuffleArray(products).concat(shuffleArray(products), shuffleArray(products));
  return shuffledProducts;
}

window.addEventListener('DOMContentLoaded', () => {
  addMatchMediaEvents();
  addCartEvents();
  addLightboxEvents();
  addProductInfoEvents();
  preventEvents();
  setColorOptions();

  window.addEventListener('resize', () => updateGallery(smallOnlyMedia.matches));
  getProducts().then((products) => {
    renderGalleryItems(products);
    updateGallery(smallOnlyMedia.matches);
  });

  carousel.addEvents();
  gallery.addEvents();
});
