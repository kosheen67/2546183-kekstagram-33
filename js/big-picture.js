import { isEscKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');//Третья секция в body
const body = document.querySelector('body');
const commentsCount = document.querySelector('.social__comment-count');//5 из 125 комментариев
const commentsList = document.querySelector('.social__comments');//список комментариев
const commentsLoader = document.querySelector('.comments-loader');//Кнопка загрузки новых пяти комментариев
const closeModalButton = document.querySelector('.big-picture__cancel');//Кнопка выхода из полноэкранного просомтра изображений
const bigPictureClass = bigPicture.querySelector('.big-picture__img img');//Большая картинка
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPicturesCaption = bigPicture.querySelector('.social__caption');//Подпись автора фотографии
const COMMENTS_TO_SHOWN = 5;
let commentsShown = 0;
let comments = [];

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function closeUserModal() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsShown = 0;

  document.removeEventListener('keydown', onDocumentKeydown);
}

const createBigPicutersComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;

  comment.appendChild(img);
  comment.appendChild(p);

  return comment;
};

const renderComments = () => {
	commentsShown += COMMENTS_TO_SHOWN;
	if (commentsShown >= comments.length) {
		commentsLoader.classList.add('hidden');
		commentsShown = comments.length;
	  } else {
		commentsLoader.classList.remove('hidden');
	  }

  commentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createBigPicutersComment(comments[i]);
    fragment.appendChild(commentElement);

  }


  commentsList.appendChild(fragment);
  commentsCount.innerHTML = `<span class="social__comment-shown-count">${commentsShown}</span> из <span class="comments-count">${comments.length}</span> комментариев`;
};

const renderBigPictureDetails = ({url, description, likes}) => {
  bigPictureClass.src = url;
  bigPictureClass.alt = description;
  bigPictureLikes.textContent = likes;
  bigPicturesCaption.textContent = description;
};

const openUserModal = (data) => {
  bigPicture.classList.remove('hidden');
  console.log(bigPicture)
  body.classList.add('modal-open');


  renderBigPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments(comments);
  }

  document.addEventListener('keydown', onDocumentKeydown);
};

const onCommentsLoaderClick = () => renderComments();

commentsLoader.addEventListener('click', (onCommentsLoaderClick));

const onCloseModalButtonClick = () => closeUserModal();


closeModalButton.addEventListener('click', (onCloseModalButtonClick));

export { openUserModal, body };
