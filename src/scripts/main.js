const smallOnlyMedia = window.matchMedia('(max-width: 37.5rem)');
const smediumOnlyMedia = window.matchMedia('(max-width: 43.75rem)');

function changeImagesPerPageOfCarousel(matches) {
  const $products = document.querySelectorAll('.carousel-horizontal__product');
  const productPerPage = matches ? 2 : 4;

  $products.forEach(($product, index) => {
    if (index < productPerPage) {
      return $product.classList.add('--visible');
    }
    $product.classList.remove('--visible');
  });
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

smallOnlyMedia.addEventListener('change', (event) =>
  changeImagesPerPageOfCarousel(event.matches)
);

smediumOnlyMedia.addEventListener('change', (event) => {
  setAboutCategoryIsOpen(event.matches);
});

changeImagesPerPageOfCarousel(smallOnlyMedia.matches);
setAboutCategoryIsOpen(smediumOnlyMedia.matches);
