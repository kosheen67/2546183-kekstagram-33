import {getRandomInteger, getRandomIdFromRangeGenerator} from './util.js';

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


//Функция-генератор объектов
const PHOTO_ID_GENERATOR = getRandomIdFromRangeGenerator(ID_MIN, ID_MAX);
const PHOTO_URL_NUMBER = getRandomIdFromRangeGenerator(ID_MIN, ID_MAX);
const PHOTO_DESCRIPTIONS_INDEX = getRandomIdFromRangeGenerator(ID_MIN, ID_MAX);
const LIKES_AMOUNT_GENERATOR = getRandomIdFromRangeGenerator(LIKES_MIN, LIKES_MAX);
const COMMENTS_ID_GENERATOR = getRandomIdFromRangeGenerator(COMMENTS_ID_MIN, COMMENTS_ID_MAX);

//Если заменить на getRandomInteger от 1 до 6, то он пишет в консоли, что AVATAR_IMAGE_NUMBER - not a function
const AVATAR_IMAGE_NUMBER = getRandomIdFromRangeGenerator(1, 6);

//Здесь скорее всего такая же ерунда будет
const COMMENTS_TO_PHOTO_INDEX = getRandomIdFromRangeGenerator(1, 6);
const COMMENTATORS_TO_PHOTOS_INDEX = getRandomIdFromRangeGenerator(ID_MIN, ID_MAX);

const createPhotoDescription = () => ({
  id: PHOTO_ID_GENERATOR(),
  url: `photos/${PHOTO_URL_NUMBER()}.jpg`,
  description: PHOTO_DESCRIPTIONS[PHOTO_DESCRIPTIONS_INDEX()],
  likes: LIKES_AMOUNT_GENERATOR(),
  comments: getPhotoComments(),
});


//Функция-генератор комментариев для объекта
function getPhotoComments() {
  return {
    id: COMMENTS_ID_GENERATOR(),
    avatar: `img/avatar-${AVATAR_IMAGE_NUMBER()}.svg`,
    message: COMMENTS_TO_PHOTOS[COMMENTS_TO_PHOTO_INDEX()],
    name: COMMENTATORS_TO_PHOTOS[COMMENTATORS_TO_PHOTOS_INDEX()],
  };
}

// function getPhotoComments() {
//   const comments = [];
//   const numberOfComments = COMMENTS_TO_PHOTO_INDEX ();

//   for (let i = 0; i < numberOfComments; i++) {
//     comments.push({
//       id: COMMENTS_ID_GENERATOR(),
//       avatar: `img/avatar-${AVATAR_IMAGE_NUMBER()}.svg`,
//       message: COMMENTS_TO_PHOTOS[getRandomIdFromRangeGenerator(0, COMMENTS_TO_PHOTOS.length - 1)()],
//       name: COMMENTATORS_TO_PHOTOS[getRandomIdFromRangeGenerator(0, COMMENTATORS_TO_PHOTOS.length - 1)()],
//     });

//   }
//   return comments;
// }

//Функция генератор массива из 25 объектов
const createPhotoDataArray = () => {
  const PHOTO_DATA = [];
  for (let i = 0; i <= 24; i++) {
    PHOTO_DATA.push(createPhotoDescription());
  }
  return PHOTO_DATA;
};
console.log(createPhotoDataArray());

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
  PHOTO_URL_NUMBER,
  AVATAR_IMAGE_NUMBER,
  createPhotoDescription,
  getPhotoComments
};
