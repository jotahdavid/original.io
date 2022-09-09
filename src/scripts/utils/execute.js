const execute = (fn, ...args) => {
  if (typeof fn === 'function') {
    fn(...args);
  }
};

export default execute;
