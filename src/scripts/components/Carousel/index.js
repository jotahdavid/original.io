const CLASS_ACTIVE = 'active';

const SELECTOR_ITEM = '.carousel-item';
const SELECTOR_ACTIVE = '.active';

class Carousel {
  /**
   * @param {string} selector
   */
  constructor(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`${selector} element doesn not exists!`);
    }
    this._element = element;
    this._activeElement = null;
  }

  /**
   *
   * @param {number} index
   */
  to(index) {
    const items = this.getItems();
    if (index > items.length - 1 || index < 0 || isNaN(index)) {
      return;
    }

    const activeIndex = this.getItemIndex(this.getActive());
    if (activeIndex === index) {
      return;
    }

    const order = index > activeIndex ? 'next' : 'prev';

    this.slide(order, items[index]);
  }

  /**
   * @returns {Element[]}
   */
  getItems() {
    return Array.from(this._element.querySelectorAll(SELECTOR_ITEM));
  }

  /**
   * @param {Element} element
   */
  getItemIndex(element) {
    return this.getItems().indexOf(element);
  }

  /**
   * @returns {Element | null}
   */
  getActive() {
    return this._element.querySelector(SELECTOR_ITEM + SELECTOR_ACTIVE);
  }

  /**
   * @param {"next" | "prev"} order
   * @param {Element} nextElement
   */
  slide(order, element = null) {
    const activeElement = this.getActive();
    const isNext = order === 'next';
    const nextElement = element ?? this.getNextActiveElement(this.getItems(), activeElement, isNext);

    if (activeElement === nextElement) {
      return;
    }

    activeElement.classList.remove(CLASS_ACTIVE);
    nextElement.classList.add(CLASS_ACTIVE);
  }

  /**
   * @param {Element[]} list
   * @param {Element} activeElement
   * @param {boolean} shouldGetNext
   * @returns {Element}
   */
  getNextActiveElement(list, activeElement, shouldGetNext) {
    const listLength = list.length;
    let index = list.indexOf(activeElement);

    if (index === -1) {
      return list[0];
    }

    index += shouldGetNext ? 1 : -1;
    index = (index + listLength) % listLength;

    return list[Math.max(0, Math.min(index, listLength - 1))];
  }

  next() {
    this.slide('next');
  }

  prev() {
    this.slide('prev');
  }

  addEvents() {
    const carousel = this;

    const $slideTo = Array.from(this._element.querySelectorAll('[data-slide-to]'));
    const $slideControl = Array.from(this._element.querySelectorAll('[data-slide-control]'));

    $slideTo.concat($slideControl).forEach((item) => {
      item.addEventListener('click', handleSlide);
    });

    function handleSlide(event) {
      event.preventDefault();

      const slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        carousel.to(slideIndex);
        return;
      }

      if (this.getAttribute('data-slide-control') === 'next') {
        carousel.next();
        return;
      }

      carousel.prev();
    }
  }
}

export default Carousel;
