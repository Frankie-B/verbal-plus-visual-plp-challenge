const debounce = (fn, time, everyTimeFn) => {
  let timeout;
  return function (...args) {
    if (everyTimeFn) {
      everyTimeFn.apply(this);
    }
    const functionCall = () => {
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

export default debounce;
