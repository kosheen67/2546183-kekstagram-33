import {createPhotoDataArray} from './data.js';
import {openUserModal} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureLinkTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesListFragment = document.createDocumentFragment();

const photoDataArray = createPhotoDataArray();

photoDataArray.forEach((data) => {
  const {url, description, likes, comments} = data;

  const pictureElement = pictureLinkTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  picturesListFragment.append(pictureElement);

  picturesContainer.append(picturesListFragment);

  pictureElement.addEventListener('click', () =>  openUserModal(data))});
