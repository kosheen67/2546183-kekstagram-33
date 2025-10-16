//раздел с полноценным фото
const bigPicture = document.querySelector('.big-picture');

//находим img в этом разделе
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
//находим раздел с лайками у большой кратинки
const likesCount = bigPicture.querySelector('.likes-count');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');

const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');


//Функция открытия большой картинки
function openBigPicture (arrayElement) {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = arrayElement.url;
  likesCount.textContent = arrayElement.likes;

  commentsTotalCount.textContent = arrayElement.comments.length;


  console.log(bigPicture);
  console.log(arrayElement.comments);
}

export {openBigPicture};
