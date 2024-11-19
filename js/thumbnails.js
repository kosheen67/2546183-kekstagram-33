import {createPhotoDataArray} from './data.js';

const picturesContainer = document.querySelector('.pictures');


const pictureLinkTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesListFragment = document.createDocumentFragment();

const photoDataArray = createPhotoDataArray();


photoDataArray.forEach((element) => {

  const pictureElement = pictureLinkTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = element.url;
  pictureElement.querySelector('.picture__img').alt = element.description;

  pictureElement.querySelector('.picture__comments').textContent = element.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = element.likes;
  picturesListFragment.append(pictureElement);
});

picturesContainer.append(picturesListFragment);
