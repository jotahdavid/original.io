import { addMatchMediaEvents } from './matchMedia.js';
import Carousel from './carousel.js';
import Gallery from './gallery.js';

const carousel = new Carousel('.carousel-vertical__gallery');
const gallery = new Gallery('.carousel-horizontal', { perPage: 4, onChangePage: handleChangePage });

function handleChangePage(page, limit) {
  const $index = gallery._element.querySelector('.carousel-horizontal__controllers__index');
  $index.textContent = `${page} de ${limit}`;
}

window.addEventListener('DOMContentLoaded', () => {
  addMatchMediaEvents();
  carousel.addEventListener();
  gallery.addEventListener();
});
