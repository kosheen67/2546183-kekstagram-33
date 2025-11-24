import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

// Модуль фильтрации
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM:'filter-random',
  DISCUSSED: 'filter-discussed',
};

// Глобальные переменные
let currentFilter = Filter.DEFAULT;
let pictures = [];

// Функция для показа блока фильтров
const showFilters = () => {
  const filtersElement = document.querySelector('.img-filters');
  filtersElement.classList.remove('img-filters--inactive');
};

// Функции фильтрации
//1
const getDefaultPictures = () => pictures;

//2
const getRandomPictures = () => {
  const shuffled = [...pictures].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
};

//3
const getDiscussedPictures = () => [...pictures].sort((a, b) => b.comments.length - a.comments.length);

// Основная функция фильтрации
const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return getRandomPictures();
    case Filter.DISCUSSED:
      return getDiscussedPictures();
    case Filter.DEFAULT:
    default:
      return getDefaultPictures();
  }
};

// Функция обновления отображения
const updatePictures = () => {
// Удаляем предыдущие фотографии
  const picturesContainer = document.querySelector('.pictures');
  const currentPictures = picturesContainer.querySelectorAll('.picture');
  currentPictures.forEach((picture) => {
    picture.remove();
  });
};
// Получаем отфильтрованные фотографии
const filteredPictures = getFilteredPictures();

// Отрисовываем новые фотографии
renderThumbnails(filteredPictures);

// Создаем debounced версию функции обновления
const debouncedUpdate = debounce(updatePictures, 500);

// Функция обновления активного фильтра
const updateActiveFilter = (newFilter) => {
  // Удаляем класс активности у текущего фильтра
  const currentActiveButton = document.querySelector('.img-filters__button--active');
  if (currentActiveButton) {
    currentActiveButton.classList.remove('img-filters__button--active');
  }

  // Добавляем класс активности новому фильтру
  const newActiveButton = document.querySelector(`#${newFilter}`);
  if (newActiveButton) {
    newActiveButton.classList.add('img-filters__button--active');
  }
  currentFilter = newFilter;
};

// Обработчик изменения фильтра
const onFilterChange = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const newFilter = evt.target.id;

  // Игнорируем клик по уже активному фильтру
  if (newFilter === currentFilter) {
    return;
  }
  // Обновляем активный фильтр
  updateActiveFilter(newFilter);

  // Запускаем обновление с устранением дребезга
  debouncedUpdate();
};

// Инициализация фильтров
const initFilters = (loadedPictures) => {
  pictures = loadedPictures;

  // Показываем блок фильтров
  showFilters();

  // Добавляем обработчики событий
  const filtersForm = document.querySelector('.img-filters__form');
  if (filtersForm) {
    filtersForm.addEventListener('click', onFilterChange);
  }

  // Устанавливаем фильтр по умолчанию как активный
  updateActiveFilter(Filter.DEFAULT);
};

export { initFilters };
