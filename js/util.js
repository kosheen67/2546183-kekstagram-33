
import {ID_MIN, ID_MAX} from './data.js';

//Функция по возврату рандомного числа в пределах диапазона включительно
const getRandomInteger = (min, max) => {
  const minInteger = Math.ceil(Math.min(min, max));
  const maxInteger = Math.floor(Math.max(min, max));
  const randomInteger = Math.random() * (maxInteger - minInteger + 1) + minInteger;
  return Math.floor(randomInteger);
};
getRandomInteger(ID_MIN, ID_MAX);


//Функция по возврату неповторяющегося числа в пределах диапазона включительно
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
const randomIdFromRangeGenerator = getRandomIdFromRangeGenerator(ID_MIN, ID_MAX);

export { getRandomInteger, getRandomIdFromRangeGenerator };


