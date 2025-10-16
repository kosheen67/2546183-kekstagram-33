import {createPhotoDescriptionList} from './data.js';

//вытащить шаблон
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
//
const picturesSection = document.querySelector('.pictures');
//создать коробочку хранилище
const pictureFragment = document.createDocumentFragment();


//функция перебора массива из 25 объектов
const thumbnailsSet = createPhotoDescriptionList();
thumbnailsSet.forEach((thumbnail) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imgUrl = pictureElement.querySelector('.picture__img');
  imgUrl.src = thumbnail.url;
  imgUrl.alt = thumbnail.description;
  pictureElement.querySelector('.picture__likes').textContent = thumbnail.likes;
  pictureElement.querySelector('.picture__comments').textContent = thumbnail.comments.length;
  pictureFragment.appendChild(pictureElement);
});

picturesSection.appendChild(pictureFragment);

//1 миниатюры в ДОМе
const thumbnailsArray = document.querySelectorAll('.picture');

//2 Функция по клику на миниатюру
function addClickHandler() {
  thumbnailsArray.forEach((thumbnailsElement, thumbnailsIndex) =>{
    thumbnailsElement.addEventListener('click', (evt) =>{
      evt.preventDefault();
      //вместо консоли мы будем выполнять функцию openBigPicture()
      console.log(thumbnailsArray[thumbnailsIndex]);
    });
  });
}
addClickHandler();
