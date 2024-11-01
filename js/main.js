const ID_MIN = 1;
const ID_MAX = 25;
const PHOTO_DESCRIPTIONS = ['Вся красота мира в одной картинке','Моменты, которые запечатлены навсегда','Счастье в каждом кадре','История, рассказанная через объектив','Остановить время в одном кадре','Сегодня — самый лучший день','Я не доверяю словам. Я доверяю фотографиям','Фотографии — это свидетельство о том, что мы жили','Момент, когда небо и земля сливаются воедино','Сделано объективом и любовью','Зарядитесь нашим теплом','Жизнь лучше, когда ты смеешься','Море — это вечное движение и любовь, вечная жизнь','Море — лучший лекарь для усталой души','Свежий ветер моря обнимает все чувства','Волны моря — лучший танец для глаз','Когда море становится зеркалом неба','Морской бриз наполняет душу свободой','Море никогда не стареет','Семья — это спасательный жилет в бурном море жизни','Вы не выбираете свою семью. Ее члены — подарок Бога вам, как и вы им','Семья — это один из шедевров природы','Семья — зеркало, в котором мы видим себя','Моя семья — лучшая команда, которую я встречал','Друзей много, но лучших выбирает время'];
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_ID_MIN = 1;
const COMMENTS_ID_MAX = 999;
const AVATAR_ID_MIN = 1;
const AVATAR_ID_MAX = 6;
const COMMENTS_TO_PHOTOS = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const COMMENTATORS_TO_PHOTOS = ['Иван-царевич', 'Кот Баюн','Змей Горыныч','Никита Кожемяка','Василиса Премудрая','Аленушка','Илья Муромец','Алеша Попович','Добрыня Никитич','Забава Микулошна','Микула Селянинович','Крошечка-Ховрюшечка','Марфа Прекрасная','Чудо-юдо','Федот-стрелец','Емеля','Юнона и Авось','Руслан и Людмила','Елена Прекрасная','Сестрица Аленушка','Братец Иванушка','Алатырь-камень','Жар-птица','Конек-горбунок','Сивка-Бурка'];

//Функция генератор массива из 25 объектов
function createPhotoDataArray () {
  const PHOTO_DATA = [];
  for (let i = 0; i <= PHOTO_DATA.length - 1; i++) {
    PHOTO_DATA.push(createPhotoDescription());
  }
  return PHOTO_DATA;
}

//Функция по возврату рандомного числа в пределах диапазона включительно
const getRandomInteger = (min, max) => {
  const minInteger = Math.ceil(Math.min(min, max));
  const maxInteger = Math.floor(Math.max(min, max));
  const randomInteger = Math.random() * (maxInteger - minInteger + 1) + minInteger;
  return Math.floor(randomInteger);
};
getRandomInteger(ID_MIN, ID_MAX);

//Функция по возврату неповторяющегося числа в пределах диапазона включительно
function getRandomIdFromRangeGenerator (min, max) {
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

//Функция-генератор объектов
const PHOTO_URL_NUMBER = getRandomIdFromRangeGenerator(ID_MIN, ID_MAX);
function createPhotoDescription () {
  return {
    id: getRandomIdFromRangeGenerator(ID_MIN, ID_MAX),
    url: `photos/${PHOTO_URL_NUMBER}.jpg`,
    description: PHOTO_DESCRIPTIONS[getRandomIdFromRangeGenerator(ID_MIN, ID_MAX)],
    likes: getRandomIdFromRangeGenerator(LIKES_MIN, LIKES_MAX),
    comments: getPhotoComments(),
  };
}

//Функция-генератор комментариев для объекта
const AVATAR_IMAGE_NUMBER = getRandomIdFromRangeGenerator(AVATAR_ID_MIN, AVATAR_ID_MAX);
function getPhotoComments() {
  return {
    id: getRandomIdFromRangeGenerator(COMMENTS_ID_MIN, COMMENTS_ID_MAX),
    avatar: `img/avatar-${AVATAR_IMAGE_NUMBER}.svg`,
    message: COMMENTS_TO_PHOTOS[getRandomIdFromRangeGenerator(ID_MIN, ID_MAX)],
    name: COMMENTATORS_TO_PHOTOS[getRandomIdFromRangeGenerator(ID_MIN, ID_MAX)],
  };
}
