function rem(px) {
  return px / 16;
}

export const smallOnlyMedia = window.matchMedia(`(max-width: ${rem(599)}rem)`);
export const smediumOnlyMedia = window.matchMedia(`(max-width: ${rem(699)}rem)`);

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
  smediumOnlyMedia.addEventListener('change', (event) => {
    setAboutCategoryIsOpen(event.matches);
  });

  setAboutCategoryIsOpen(smediumOnlyMedia.matches);
}
