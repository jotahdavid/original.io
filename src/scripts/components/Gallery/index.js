import execute from '../../utils/execute.js';

const SELECTOR_WRAPPER = '.gallery-wrapper';
const SELECTOR_ITEM = '.gallery-item';

/**
 * @typedef {{ perPage?: number; onChangePage?: function; }} GalleryConfigs
 */

class Gallery {
  /**
   * @param {string} selector
   * @param {GalleryConfigs} config
   */
  constructor(selector, config = {}) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`${selector} element doesn not exists!`);
    }
    this._element = element;
    this._wrapper = element.querySelector(SELECTOR_WRAPPER);

    this._isSliding = false;
    this._page = 0;

    this._changePageListener = config.onChangePage ?? null;
    this.itemPerPage = config.perPage ?? 4;
  }

  set itemPerPage(value) {
    this._itemPerPage = value;
    this._element.style.setProperty('--item-per-page', value);
  }

  async next() {
    const distance = this.getDistance(this._page + 1);
    await this.scroll(distance);
    this.updatePage();
  }

  async prev() {
    const distance = this.getDistance(this._page - 1);
    await this.scroll(distance);
    this.updatePage();
  }

  /**
   * @param {number} value
   * @returns {number}
   */
  getDistance(value = 0) {
    return Math.round((this._wrapper.scrollWidth / (this._lastPage + 1)) * value);
  }

  /**
   * @param {number} distance
   * @returns {Promise<void>}
   */
  scroll(distance) {
    if (this._isSliding || distance < 0 || distance > this.getDistance(this._lastPage)) {
      return Promise.resolve();
    }

    this._wrapper.scrollLeft = distance;
    this._isSliding = true;

    return new Promise((resolve) => {
      let attempts = 0;

      const interval = setInterval(() => {
        if (this._wrapper.scrollLeft === distance) {
          this._isSliding = false;
          clearInterval(interval);
          resolve();
        }

        if (attempts > 10) {
          console.error(`Infinite scroll: "scrollLeft" == ${this._wrapper.scrollLeft} "distance" == ${distance}`);
          this._isSliding = false;
          clearInterval(interval);
          resolve(this.scroll(0));
        }

        attempts += 1;
      }, 100);
    });
  }

  updatePage() {
    for (let i = 0; i <= this._lastPage; i++) {
      if (this.getDistance(i) === this._wrapper.scrollLeft) {
        this._page = i;
        execute(this._changePageListener, i + 1, this._lastPage + 1);
        return;
      }
    }

    if (this.getItems().length > 1) {
      console.error(`Can't get the wrapper distance: "scrollLeft" == ${this._wrapper.scrollLeft}`);
    }
  }

  /**
   * @returns {number}
   */
  get _lastPage() {
    return this.getItems().length / this._itemPerPage - 1;
  }

  /**
   * @returns {Element[]}
   */
  getItems() {
    return Array.from(this._element.querySelectorAll(SELECTOR_ITEM));
  }

  /**
   * @param {function} fn
   */
  onChangePage(fn) {
    this._changePageListener = fn;
  }

  addEvents() {
    this.updatePage();

    const gallery = this;
    const $controls = this._element.querySelectorAll('[data-gallery-control]');

    $controls.forEach((item) => {
      item.addEventListener('click', handleControlClick);
    });

    function handleControlClick(event) {
      event.preventDefault();

      const action = this.getAttribute('data-gallery-control');

      if (action === 'next') {
        gallery.next();
        return;
      }

      gallery.prev();
    }
  }
}

export default Gallery;
