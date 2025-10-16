import {createPhotoDescriptionList} from './data.js';
import {openBigPicture} from './bigPicture.js';

//вытащить шаблон
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesSection = document.querySelector('.pictures');
//создать коробочку хранилище
const pictureFragment = document.createDocumentFragment();


//функция перебора массива из 25 объектов
const thumbnailsSet = createPhotoDescriptionList();
console.log(thumbnailsSet);

thumbnailsSet.forEach((thumbnailElement, thumbnailIndex) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imgUrl = pictureElement.querySelector('.picture__img');
  imgUrl.src = thumbnailElement.url;
  imgUrl.alt = thumbnailElement.description;
  pictureElement.querySelector('.picture__likes').textContent = thumbnailElement.likes;
  pictureElement.querySelector('.picture__comments').textContent = thumbnailElement.comments.length;
  pictureFragment.appendChild(pictureElement);

  //добавить обработчик прямо здесь
  pictureElement.addEventListener('click', (evt) =>{
    evt.preventDefault();
    //вместо консоли мы будем выполнять функцию openBigPicture())
    openBigPicture(thumbnailsSet[thumbnailIndex]);
  });
  console.log(thumbnailsSet[thumbnailIndex]);

});
picturesSection.appendChild(pictureFragment);
