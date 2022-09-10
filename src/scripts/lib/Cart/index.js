import Item from './Item.js';

class Cart {
  constructor() {
    /** @type {Item[]} items */
    this.items = [];
  }

  /**
   * @param {{
   *  key: string;
   *  name: string;
   *  price: number;
   * }}
   */
  addItem({ key, name, price }) {
    const item = new Item({
      key,
      name,
      price,
      amount: 1,
    });

    this.items.push(item);

    return item;
  }

  /**
   * @param {string} key
   */
  getItem(key) {
    return this.items.find((item) => item.key === key) ?? null;
  }

  /**
   * @param {string} key
   */
  removeItem(key) {
    this.items = this.items.filter((item) => item.key !== key);
  }

  getTotalItemsPrice() {
    return this.items.reduce((acc, item) => item.getTotalPrice() * 100 + acc, 0) / 100;
  }

  /**
   * @param {number} times
   */
  getInstallments(times = 1) {
    const formatPrice = (this.getTotalItemsPrice() / times).toFixed(2);
    return Number(formatPrice);
  }
}

export default new Cart();
