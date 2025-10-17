const body = document.querySelector('body');
//раздел с полноценным фото
const bigPicture = document.querySelector('.big-picture');
//кнопка закрытия большой фотографии
const closeButton = document.querySelector('.big-picture__cancel.cancel');
//находим img в этом разделе
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');

//находим раздел с лайками у большой кратинки
const likesCount = bigPicture.querySelector('.likes-count');

const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');

const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

//cписок комментов
const usersComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');

//Функция открытия большой картинки
function openBigPicture (arrayElement) {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = arrayElement.url;
  likesCount.textContent = arrayElement.likes;

  commentsTotalCount.textContent = arrayElement.comments.length;

  // Описание фотографии
  socialCaption.textContent = arrayElement.description;

  usersComments.innerHTML = ''; //теперь пустой ul

  //загрузка комментариев
  arrayElement.comments.forEach((commentElement) => {

    const userCommentItem = document.createElement('li');//создали li
    userCommentItem.classList.add('social__comment');//добавили класс
    userCommentItem.innerHTML = `<img class="social__picture" src="${commentElement.avatar}" alt="${commentElement.name}" width="35" height="35"><p class="social__text">${commentElement.message}</p>`;
    usersComments.appendChild(userCommentItem);
  });
}

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
