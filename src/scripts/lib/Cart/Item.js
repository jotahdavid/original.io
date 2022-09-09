class Item {
  /**
   * @param {{
   *  key: string;
   *  name: string;
   *  price: number;
   *  amount?: number;
   * }} item
   */
  constructor({ key, name, price, amount = 1 }) {
    this.key = key;
    this.name = name;
    this.setPrice(price);
    this.amount = Math.floor(amount);
  }

  get price() {
    return this._price / 100;
  }

  /**
   * @param {number} value
   */
  setPrice(value) {
    const formatPrice = Number(value).toFixed(2);
    const newPrice = Number(formatPrice) * 100;

    this._price = newPrice;
  }

  add() {
    this.amount++;
  }

  subtract() {
    this.amount--;
  }

  getTotalPrice() {
    return (this._price * this.amount) / 100;
  }
}

export default Item;
