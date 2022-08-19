function rem(px) {
  return px / 16;
}

export const smallOnlyMedia = window.matchMedia(`(max-width: ${rem(599)}rem)`);
export const smediumOnlyMedia = window.matchMedia(`(max-width: ${rem(699)}rem)`);

function changeImagesPerPageOfCarousel(matches) {
  const $gallery = document.querySelector('.carousel-horizontal');
  const productPerPage = matches ? 2 : 4;
  $gallery.style.setProperty('--item-per-page', productPerPage);
}

function setAboutCategoryIsOpen(matches) {
  const $categories = document.querySelectorAll('.about-category');

  $categories.forEach(($category) => {
    if (!matches) {
      return $category.setAttribute('open', true);
    }
    $category.removeAttribute('open');
  });
}

export function addMatchMediaEvents() {
  smallOnlyMedia.addEventListener('change', (event) => {
    changeImagesPerPageOfCarousel(event.matches);
  });

  smediumOnlyMedia.addEventListener('change', (event) => {
    setAboutCategoryIsOpen(event.matches);
  });

  changeImagesPerPageOfCarousel(smallOnlyMedia.matches);
  setAboutCategoryIsOpen(smediumOnlyMedia.matches);
}
