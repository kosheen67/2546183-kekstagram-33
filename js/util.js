const getRandomInteger = (min, max) => {
  const minInteger = Math.ceil(Math.min(min, max));
  const maxInteger = Math.floor(Math.max(min, max));
  const randomInteger = Math.random() * (maxInteger - minInteger + 1) + minInteger;
  return Math.floor(randomInteger);
};
getRandomInteger(1, 25);

function getRandomElementFromArray (array) {
  const i = getRandomInteger(0, array.length - 1);
  return array[i];
}
getRandomElementFromArray([1,2,3,4]);

function getRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const isEscKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomInteger, getRandomElementFromArray, getRandomIdFromRangeGenerator, isEscKey, debounce };
