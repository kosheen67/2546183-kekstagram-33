import {getRandomInteger, getRandomElementFromArray, getRandomIdFromRangeGenerator} from './util.js';

const ID_MIN = 1;
const ID_MAX = 25;
const PHOTO_DESCRIPTIONS = ['Вся красота мира в одной картинке','Моменты, которые запечатлены навсегда','Счастье в каждом кадре','История, рассказанная через объектив','Остановить время в одном кадре','Сегодня — самый лучший день','Я не доверяю словам. Я доверяю фотографиям','Фотографии — это свидетельство о том, что мы жили','Момент, когда небо и земля сливаются воедино','Сделано объективом и любовью','Зарядитесь нашим теплом','Жизнь лучше, когда ты смеешься','Море — это вечное движение и любовь, вечная жизнь','Море — лучший лекарь для усталой души','Свежий ветер моря обнимает все чувства','Волны моря — лучший танец для глаз','Когда море становится зеркалом неба','Морской бриз наполняет душу свободой','Море никогда не стареет','Семья — это спасательный жилет в бурном море жизни','Вы не выбираете свою семью. Ее члены — подарок Бога вам, как и вы им','Семья — это один из шедевров природы','Семья — зеркало, в котором мы видим себя','Моя семья — лучшая команда, которую я встречал','Друзей много, но лучших выбирает время'];
const LIKES_MIN = 15;
const LIKES_MAX = 200;

const COMMENTS_MIN_AMOUNT = 0;
const COMMENTS_MAX_AMOUNT = 30;

const COMMENTS_ID_MIN = 1;
const COMMENTS_ID_MAX = 999;
const AVATAR_ID_MIN = 1;
const AVATAR_ID_MAX = 6;
const COMMENTS_TO_PHOTOS = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const COMMENTATORS_TO_PHOTOS = ['Иван-царевич', 'Кот Баюн','Змей Горыныч','Никита Кожемяка','Василиса Премудрая','Аленушка','Илья Муромец','Алеша Попович','Добрыня Никитич','Забава Микулошна','Микула Селянинович','Крошечка-Ховрюшечка','Марфа Прекрасная','Чудо-юдо','Федот-стрелец','Емеля','Юнона и Авось','Руслан и Людмила','Елена Прекрасная','Сестрица Аленушка','Братец Иванушка','Алатырь-камень','Жар-птица','Конек-горбунок','Сивка-Бурка'];


//Функция-генератор объекта
const photoIdGenerator = getRandomIdFromRangeGenerator(ID_MIN, ID_MAX);
const photoUrlNumber = getRandomIdFromRangeGenerator(ID_MIN, ID_MAX);
const likesAmountGenerator = getRandomIdFromRangeGenerator(LIKES_MIN, LIKES_MAX);
const commentsIdGenerator = getRandomIdFromRangeGenerator(COMMENTS_ID_MIN, COMMENTS_ID_MAX);

const createPhotoDescription = () => ({
  id: photoIdGenerator(),
  url: `photos/${photoUrlNumber()}.jpg`,
  description: getRandomElementFromArray(PHOTO_DESCRIPTIONS),
  likes: likesAmountGenerator(),
  comments: getPhotoComments(),
});

//Функция-генератор комментариев для объекта
function getPhotoComments() {
  const comments = [];
  const numberOfComments = getRandomInteger(COMMENTS_MIN_AMOUNT, COMMENTS_MAX_AMOUNT);

  for (let i = 0; i <= numberOfComments; i++) {
    comments.push({
      id: commentsIdGenerator(),
      avatar: `img/avatar-${getRandomInteger(AVATAR_ID_MIN, AVATAR_ID_MAX)}.svg`,
      message: getRandomElementFromArray(COMMENTS_TO_PHOTOS),
      name: getRandomElementFromArray(COMMENTATORS_TO_PHOTOS),
    });
  }
  return comments;
}

//Функция генератор массива из 25 объектов
const createPhotoDataArray = () => {
  const PHOTO_DATA = [];
  for (let i = 0; i <= 24; i++) {
    PHOTO_DATA.push(createPhotoDescription());
  }
  return PHOTO_DATA;
};

export {ID_MIN,
  ID_MAX,
  PHOTO_DESCRIPTIONS,
  LIKES_MIN,
  LIKES_MAX,
  COMMENTS_ID_MIN,
  COMMENTS_ID_MAX,
  AVATAR_ID_MIN,
  AVATAR_ID_MAX,
  COMMENTS_TO_PHOTOS,
  COMMENTATORS_TO_PHOTOS,
  createPhotoDataArray,
  photoUrlNumber,
  createPhotoDescription,
  getPhotoComments
};
