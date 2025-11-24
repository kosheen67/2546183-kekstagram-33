import { renderThumbnails } from './thumbnails.js';
import './bigPicture.js';
import './form-upload.js';
import './scale-change.js';
import './filter-change.js';
import { getData } from './api.js';
import { initFilters } from './sorting.js';
import { showErrorMessage } from './message.js';

// Функция показа сообщения об ошибке загрузки данных
const showDataError = () => {
  //Находим шаблон ошибки
  const errorTemplate = document.querySelector('#data-error');
  if (!errorTemplate) {
    console.error('Шаблон ошибки не найден');
    return;
  }
  //Клонируем содержимое шаблона
  const errorElement = errorTemplate.content.cloneNode(true);

  // Добавляем сообщение в body (перед закрывающим тегом)
  document.body.appendChild(errorElement);

  // Удаляем сообщение через 5 секунд
  setTimeout(() => {
    const errorMessage = document.body.querySelector('.data-error');
    if(errorMessage) {
      errorMessage.remove();
    }
  }, 5000);
};

// Функция загрузки фотографий с сервера через Promise
const loadPhotosFromServer = () => {
  console.log('Starting uploading photos');

  getData()
    .then((photos) => {
      // Успешная загрузка
      console.log(`Successful upload of${photos.length} photos`);

      // Проверяем что данные не пустые
      if(photos && photos.length > 0) {
        renderThumbnails(photos);
      } else {
        console.log('Server returned an empty array');
        showDataError();
      }
    })
    .catch((error) => {
      // Обработка ошибки загрузки
      console.log('Error while uploading photos:', error.message);
      // Показываем сообщение об ошибке
      showDataError();
    });
};

// Загружаем данные сразу после открытия страницы
document.addEventListener('DOMContentLoaded', () => {
  loadPhotosFromServer();
});


// Основная функция инициализации приложения
const initApp = () => {
  getData()
    .then((photos) => {
      // Отрисовываем первоначальные миниатюры
      renderThumbnails(photos);

      // Инициализируем фильтры
      initFilters(photos);
    })
    .catch((error) => {
      console.error('Ошибка загрузки фотографий:', error);
      showErrorMessage('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
    });
};

// Запускаем приложение когда DOM загружен
document.addEventListener('DOMContentLoaded', initApp);
