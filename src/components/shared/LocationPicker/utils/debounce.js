/**
 * Returns a debounced version of the given function.
 * @param {Function} fn
 * @param {number} delay  milliseconds
 */
export function debounce(fn, delay) {
    let timer;
    const debounced = (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
    debounced.cancel = () => clearTimeout(timer);
    return debounced;
  }