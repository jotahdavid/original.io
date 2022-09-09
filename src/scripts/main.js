import Carousel from './components/Carousel/index.js';
import Gallery from './components/Gallery/index.js';

import { addMatchMediaEvents, smallOnlyMedia } from './matchMedia.js';
import { addCartEvents } from './events/cart.js';
import { addLightboxEvents } from './events/lightbox.js';

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
  addCartEvents();
  addLightboxEvents();

  window.addEventListener('resize', () => updateGallery(smallOnlyMedia.matches));
  updateGallery(smallOnlyMedia.matches);

  carousel.addEvents();
  gallery.addEvents();
});
