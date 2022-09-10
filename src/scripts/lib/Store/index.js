import execute from '../../utils/execute.js';

/**
 * @class
 * @template T
 */
class Store {
  /**
   * @param {Function} reducer
   * @param {T} initialState
   */
  constructor(reducer, initialState) {
    if (typeof reducer !== 'function') {
      throw new TypeError(`reducer must be a function`);
    }

    /** @private @type {Function} */
    this._reducer = reducer;
    /** @private @type {T} */
    this._state = Object.freeze(initialState);
    /** @private @type {Function[]} */
    this._subscribers = [];
  }

  dispatch(action) {
    this._state = this._reducer(this._state, action);

    for (const subscriber of this._subscribers) {
      execute(subscriber);
    }
  }

  getState() {
    return this._state;
  }

  /**
   * @param {Function} listener
   */
  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError(`listener must be a function`);
    }
    this._subscribers.push(listener);
  }
}

export default Store;
