

//Функция по возврату рандомного числа в пределах диапазона включительно
const getRandomInteger = (min, max) => {
  const minInteger = Math.ceil(Math.min(min, max));
  const maxInteger = Math.floor(Math.max(min, max));
  const randomInteger = Math.random() * (maxInteger - minInteger + 1) + minInteger;
  return Math.floor(randomInteger);
};
getRandomInteger(1, 25);


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
const randomIdFromRangeGenerator = getRandomIdFromRangeGenerator(1, 25);
console.log(randomIdFromRangeGenerator());

const randomIdFromRangeGenerator2 = getRandomIdFromRangeGenerator(1, 25);
console.log(randomIdFromRangeGenerator2());
export { getRandomInteger, getRandomIdFromRangeGenerator };


//Функция в функции
function getNumber(number1) {
  console.log(number1());
}

getNumber(randomIdFromRangeGenerator);


