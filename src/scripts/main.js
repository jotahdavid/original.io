const media = window.matchMedia('(max-width: 37.5rem)');

function handleMatchMedia(matches) {
  const $products = document.querySelectorAll('.carousel-horizontal__product');
  const productPerPage = matches ? 2 : 4;

  $products.forEach(($product, index) => {
    if (index < productPerPage) {
      return $product.classList.add('--visible');
    }
    $product.classList.remove('--visible');
  });
}

media.addEventListener('change', (event) => handleMatchMedia(event.matches));

handleMatchMedia(media.matches);
