import GalleryProduct from './components/GalleryProduct.js';
import R$ from './utils/formatCurrency.js';

/**
 * @typedef {{
 *  name: string;
 *  code: string;
 * }} ProductColor
 */

/**
 * @typedef {{
 *  id: string;
 *  thumbnail: string;
 *  name: string;
 *  price: {
 *    original: number;
 *    current: number;
 *  };
 *  colors: ProductColor[];
 *  size: {
 *    min: number;
 *    max: number;
 *  } | null
 * }} Product
 */

/**
 * @param {Product[]} items
 */
export function renderGalleryItems(items) {
  const $gallery = document.querySelector('.gallery-wrapper');
  // $gallery.textContent = null;

  const $fragment = document.createDocumentFragment();

  items.forEach((item) => {
    $fragment.append(
      GalleryProduct({
        imageUrl: item.thumbnail,
        price: R$(item.price),
        colors: item.colors,
        className: 'carousel-horizontal__product',
      })
    );
  });

  $gallery.append($fragment);
}

async function getProducts() {
  const pathname = window.location.pathname;
  const response = await fetch(pathname + 'src/data/products.json');
  return response.json();
}

getProducts().then(({ products }) => renderGalleryItems(products));
