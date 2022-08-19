const SELECTOR_LIST = '.gallery-list';
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
    this._container = this._element.querySelector(SELECTOR_LIST);
    this._isSliding = false;
    this._page = 0;
    this._itemPerPage = config.perPage ?? 4;
    this._element.style.setProperty('--item-per-page', this._itemPerPage);
    this._changePageListener = config.onChangePage ?? null;
  }

  async next() {
    const distance = Math.round((this._container.scrollWidth / this.lastPage) * (this._page + 1));
    await this.scroll(distance);
    this.changePage();
  }

  async prev() {
    const distance = Math.round((this._container.scrollWidth / this.lastPage) * (this._page - 1));
    await this.scroll(distance);
    this.changePage();
  }

  /**
   * @param {number} distance
   * @returns {Promise<void>}
   */
  scroll(distance) {
    if (this._isSliding || distance < 0 || distance > this._container.scrollWidth - this._container.clientWidth) {
      return Promise.resolve();
    }

    this._container.scrollLeft = distance;
    this._isSliding = true;

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this._container.scrollLeft === distance) {
          this._isSliding = false;
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  changePage() {
    for (let i = 0; i < this.lastPage; i++) {
      if (Math.round((this._container.scrollWidth / this.lastPage) * i) === this._container.scrollLeft) {
        this._page = i;
        this.execute(this._changePageListener, i + 1, this.lastPage);
      }
    }
  }

  /**
   * @returns {number}
   */
  get lastPage() {
    return this.getItems().length / this._itemPerPage;
  }

  /**
   * @returns {Element[]}
   */
  getItems() {
    return Array.from(this._element.querySelectorAll(SELECTOR_ITEM));
  }

  addEventListener() {
    this.changePage();

    const gallery = this;
    const $controls = this._element.querySelectorAll('[data-gallery-control]');

    $controls.forEach(($control) => $control.addEventListener('click', handleControlClick));

    function handleControlClick() {
      const action = this.getAttribute('data-gallery-control');

      if (action === 'next') {
        gallery.next();
        return;
      }

      gallery.prev();
    }
  }

  /**
   * @param {function} fn
   */
  onChangePage(fn) {
    this._changePageListener = fn;
  }

  /**
   * @param {function} fn
   * @param  {...unknown} args
   */
  execute(fn, ...args) {
    if (typeof fn === 'function') {
      fn(...args);
    }
  }
}

export default Gallery;
