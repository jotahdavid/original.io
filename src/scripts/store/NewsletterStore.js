import Store from '../lib/Store/index.js';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        ...state,
        errors: [...state.errors, action.payload.error],
      };
    case 'REMOVE_ERROR':
      return {
        ...state,
        errors: state.errors.filter((error) => error.field !== action.payload.field),
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: [],
      };
    case 'SUBMIT_FIELDS':
      const { name, email } = action.payload;
      return {
        ...state,
        isSubmitting: true,
        fields: { name, email },
      };
    case 'RESET_FIELDS':
      return {
        ...state,
        isSubmitting: false,
        fields: { name: '', email: '' },
      };
    default:
      return state;
  }
};

const initialState = { isSubmitting: false, fields: { name: '', email: '' }, errors: [] };
const store = new Store(reducer, initialState);

export default store;
