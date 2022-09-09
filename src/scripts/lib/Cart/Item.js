const generateID = (() => {
  let lastID = 1;
  return () => String(lastID++);
})();

class Item {
  /**
   * @param {{
   *  name: string;
   *  price: number;
   *  amount?: number;
   * }} item
   */
  constructor({ name, price, amount = 1 }) {
    this.id = generateID();
    this.name = name;
    this.setPrice(price);
    this.amount = Math.floor(amount);
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
