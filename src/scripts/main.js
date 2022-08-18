import { addMatchMediaEvents } from './matchMedia.js';
import Carousel from './carousel.js';

const carousel = new Carousel('.carousel-vertical__gallery');

window.addEventListener('DOMContentLoaded', () => {
  addMatchMediaEvents();
  carousel.addEventListener();
});
