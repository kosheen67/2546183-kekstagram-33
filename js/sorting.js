import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

// Константы для фильтров
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

// Глобальные переменные
let currentFilter = Filter.DEFAULT;
let pictures = [];

// Функция для показа блока фильтров
const showFilters = () => {
  const filtersElement = document.querySelector('.img-filters');
  if (filtersElement) {
    filtersElement.classList.remove('img-filters--inactive');
    console.log('✅ Фильтры показаны');
  }
};

// Функции фильтрации
const getDefaultPictures = () => {
  console.log('🔄 Фильтр: По умолчанию', pictures.length);
  return pictures;
};

const getRandomPictures = () => {
  const shuffled = [...pictures].sort(() => Math.random() - 0.5);
  const result = shuffled.slice(0, 10);
  console.log('🔄 Фильтр: Случайные', result.length);
  return result;
};

const getDiscussedPictures = () => {
  const result = [...pictures].sort((a, b) => b.comments.length - a.comments.length);
  console.log('🔄 Фильтр: Обсуждаемые', result.length);
  return result;
};

// Основная функция фильтрации
const getFilteredPictures = () => {
  console.log('🎯 Текущий фильтр:', currentFilter);
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
  console.log('🔄 Начинаем обновление картинок...');

  // Удаляем предыдущие фотографии
  const picturesContainer = document.querySelector('.pictures');
  const currentPictures = picturesContainer.querySelectorAll('.picture');

  console.log('🗑️ Удаляем картинок:', currentPictures.length);
  currentPictures.forEach((picture) => {
    picture.remove();
  });

  // Получаем отфильтрованные фотографии
  const filteredPictures = getFilteredPictures();
  console.log('🖼️ Отфильтровано картинок:', filteredPictures.length);

  // Отрисовываем новые фотографии
  if (filteredPictures.length > 0) {
    renderThumbnails(filteredPictures);
    console.log('✅ Новые картинки отрисованы');
  } else {
    console.error('❌ Нет картинок для отрисовки!');
  }
};

// Создаем debounced версию функции обновления
const debouncedUpdate = debounce(updatePictures, 500);

// Функция обновления активного фильтра
const updateActiveFilter = (newFilter) => {
  console.log('🎛️ Меняем фильтр с', currentFilter, 'на', newFilter);

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
  console.log('🖱️ Клик по фильтру:', newFilter);

  // Игнорируем клик по уже активному фильтру
  if (newFilter === currentFilter) {
    console.log('⏭️ Фильтр уже активен, пропускаем');
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
  console.log('📸 Загружено картинок:', pictures.length);

  // Показываем блок фильтров
  showFilters();

  // Добавляем обработчики событий
  const filtersForm = document.querySelector('.img-filters__form');
  if (filtersForm) {
    filtersForm.addEventListener('click', onFilterChange);
    console.log('✅ Обработчики фильтров добавлены');
  } else {
    console.error('❌ Форма фильтров не найдена!');
  }

  // Устанавливаем фильтр по умолчанию как активный
  updateActiveFilter(Filter.DEFAULT);
};

export { initFilters };
