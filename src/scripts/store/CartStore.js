import Store from '../lib/Store/index.js';
import Cart from '../lib/Cart/index.js';
import generateID from '../utils/generateID.js';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      Cart.addItem({
        key: generateID(),
        name: action.payload.name,
        price: action.payload.price,
      });
      return state;
    default:
      return state;
  }
};

const initialState = { items: Cart.items };
const store = new Store(reducer, initialState);

export default store;
