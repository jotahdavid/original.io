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
