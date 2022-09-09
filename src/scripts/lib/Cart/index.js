import Item from './Item.js';

class Cart {
  constructor() {
    /** @type {Item[]} items */
    this.items = [];
  }

  /**
   * @param {{
   *  name: string;
   *  price: number;
   * }}
   */
  addItem({ name, price }) {
    const item = new Item({
      name,
      price,
      amount: 1,
    });

    this.items.push(item);

    return item;
  }

  /**
   * @param {string} id
   */
  getItem(id) {
    return this.items.find((item) => item.id === id) ?? null;
  }

  /**
   * @param {string} id
   */
  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
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
