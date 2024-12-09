import {openUserModal} from './big-picture.js';

const pictureSection = document.querySelector('.pictures');
const pictureItemTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictures = ((data) => {
  const {url, description, likes, comments} = data;

  const pictureElement = pictureItemTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', () => openUserModal(data));

  return pictureElement;
});

const makePicturesOnPage = (pictures) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());

  const picturesListFragment = document.createDocumentFragment();

  pictures.forEach((pictureElement) => {
    const createElement = createPictures(pictureElement);
    picturesListFragment.appendChild(createElement);
  });

  pictureSection.appendChild(picturesListFragment);
};

export { makePicturesOnPage };
