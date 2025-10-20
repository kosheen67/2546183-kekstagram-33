const body = document.querySelector('body');
//раздел с полноценным фото
const bigPicture = document.querySelector('.big-picture');
//кнопка закрытия большой фотографии
const closeButton = document.querySelector('.big-picture__cancel.cancel');
//находим img в этом разделе
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');

//находим раздел с лайками у большой кратинки
const likesCount = bigPicture.querySelector('.likes-count');

const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');//сколько показано комментариев от общего числа

const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');//общее количество комментариев по длине массива с комментами
// const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');//кнопка Загруузить еще

//cписок комментов
const usersComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');

//загрзука комментариев по 5 штук только
let allComments = [];//создаем массив для хранения комментариев
let shownComments = 0;//счетчик показанных коммментариев
const comments_per_click = 5; //количество показанных комментариев за раз

//Функция открытия большой картинки
function openBigPicture (arrayElement) {
  allComments = arrayElement.comments;

  shownComments = 0;

  commentsLoader.classList.remove('hidden');

  //показываем большую картинку
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  //заполняем основные данные:путь к картинке, кол-во лайков и кол-во комментариев
  bigPictureImg.src = arrayElement.url;
  likesCount.textContent = arrayElement.likes;
  commentsTotalCount.textContent = arrayElement.comments.length;
  // Описание фотографии
  socialCaption.textContent = arrayElement.description;

  //загрузка комментариев
  usersComments.innerHTML = ''; //теперь пустой ul

  //показываем ПЕРВЫЕ 5 комментариев
  showNextComments();
}

//Функция для закрызки следующих комментариев
function showNextComments() {
  //поазываем первые 5 комментариев
  const commentsToShow = allComments.slice(shownComments, shownComments + comments_per_click);

  commentsToShow.forEach((commentElement) => {
    const userCommentItem = document.createElement('li');//создали li
    userCommentItem.classList.add('social__comment');//добавили класс
    userCommentItem.innerHTML = `<img class="social__picture" src="${commentElement.avatar}" alt="${commentElement.name}" width="35" height="35"><p class="social__text">${commentElement.message}</p>`;
    usersComments.appendChild(userCommentItem);
  });
  shownComments += commentsToShow.length;

  commentsShownCount.textContent = shownComments;

  if (shownComments >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
}


// Обработчик кнопки "Загрузить ещё"
commentsLoader.addEventListener('click', showNextComments);

//Функция закрытия картинки
closeButton.addEventListener('click', () =>{
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt)=>{
  if(evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

export {openBigPicture};
