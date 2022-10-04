import Carousel from './components/Carousel/index.js';
import Gallery from './components/Gallery/index.js';

import { addMatchMediaEvents, smallOnlyMedia } from './matchMedia.js';
import { addCartEvents } from './elements/cart.js';
import { addLightboxEvents } from './elements/lightbox.js';
import { addProductInfoEvents } from './elements/productInfo.js';
import { addNewsletterEvents } from './elements/newsletter.js';
import { addModalEvents } from './elements/modal.js';
import { renderGalleryItems } from './elements/gallery.js';
import shuffleArray from './utils/shuffleArray.js';

const carousel = new Carousel('.carousel-vertical__gallery');
const gallery = new Gallery('.carousel-horizontal', {
  onChangePage: (currentPage, limit) => {
    const $index = gallery._element.querySelector('.carousel-horizontal__controllers__index');
    $index.textContent = `${currentPage} de ${limit}`;
  },
});

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
  const shuffledProducts = shuffleArray(products).concat(
    shuffleArray(products),
    shuffleArray(products),
    shuffleArray(products).slice(2)
  );
  return shuffledProducts;
}

function createWindowResizeHandler() {
  let prevWindowWidth = window.innerWidth;
  return () => {
    if (prevWindowWidth === window.innerWidth) return;
    prevWindowWidth = window.innerWidth;
    updateGallery(smallOnlyMedia.matches);
  };
}

function bootstrap() {
  preventEvents();
  addMatchMediaEvents();
  addCartEvents();
  addLightboxEvents();
  addProductInfoEvents();
  addNewsletterEvents();
  addModalEvents();

  setColorOptions();

  window.addEventListener('resize', createWindowResizeHandler());

  getProducts().then((products) => {
    renderGalleryItems(products);
    updateGallery(smallOnlyMedia.matches);
  });

  carousel.addEvents();
  gallery.addEvents();
}

window.addEventListener('DOMContentLoaded', bootstrap);
