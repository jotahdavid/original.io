export default function execute(fn, ...args) {
  if (typeof fn === 'function') {
    fn(...args);
  }
}
