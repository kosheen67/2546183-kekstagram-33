import {openBigPicture} from './bigPicture.js';


const renderThumbnails = (photos) => {
//вытащить шаблон
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesSection = document.querySelector('.pictures');
  //создать коробочку хранилище
  const pictureFragment = document.createDocumentFragment();

  //Создаем новые миниатюры из данных с сервера
  photos.forEach((photo, index) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const imgUrl = pictureElement.querySelector('.picture__img');

    imgUrl.src = photo.url;
    imgUrl.alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureFragment.appendChild(pictureElement);

    //добавить обработчик прямо здесь
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      //вместо консоли мы будем выполнять функцию openBigPicture())
      openBigPicture(photos[index]);
    });
  });
  picturesSection.appendChild(pictureFragment);
};

export { renderThumbnails };
