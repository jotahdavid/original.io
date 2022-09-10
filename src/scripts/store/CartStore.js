import Store from '../lib/Store/index.js';
import Cart from '../lib/Cart/index.js';
import generateID from '../utils/generateID.js';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      Cart.addItem({
        key: generateID(),
        name: action.payload.name,
        price: action.payload.price,
      });
      return {
        ...state,
        items: Cart.items,
        total: Cart.getTotalItemsPrice(),
      };
    case 'INCREASE_ITEM_AMOUNT':
      Cart.getItem(action.payload.key)?.add();
      return {
        ...state,
        items: Cart.items,
        total: Cart.getTotalItemsPrice(),
      };
    case 'DECREASE_ITEM_AMOUNT':
      Cart.getItem(action.payload.key)?.subtract();
      return {
        ...state,
        items: Cart.items,
        total: Cart.getTotalItemsPrice(),
      };
    case 'REMOVE_ITEM':
      Cart.removeItem(action.payload.key);
      return {
        ...state,
        items: Cart.items,
        total: Cart.getTotalItemsPrice(),
      };
    default:
      return state;
  }
};

const initialState = { total: 0, items: Cart.items };
const store = new Store(reducer, initialState);

export default store;
