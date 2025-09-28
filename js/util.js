//модуль с вспомогательными функциями
//Функция, которая будет выводить уникальное число от 1 до 25 и не повторяться
function getRandomNumber(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//Функция по получению рандомного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomNumber, getRandomArrayElement};
