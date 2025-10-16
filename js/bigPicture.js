//раздел с полноценным фото
const bigPicture = document.querySelector('.big-picture');

//находим img в этом разделе
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
//находим раздел с лайками у большой кратинки
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-shown-count');
//Функция открытия большой картинки
function openBigPicture (arrayElement) {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = arrayElement.url;
  likesCount.textContent = arrayElement.likes;
  commentsCount.textContent = arrayElement.comments.length;
  console.log(bigPicture);
}

export {openBigPicture};
// openBigPicture();
// const thumbnailsArray = document.querySelectorAll('.picture');
// console.log(thumbnailsArray);
// const bigPicture = document.querySelector('.big-picture');
// function openBigPictureModule (element) {
//   element.addEventListener('click', () =>{
//     bigPicture.classList.remove('hidden');
//   });
// }


