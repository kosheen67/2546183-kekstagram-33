const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const PICTURE_VIEW_COUNT = 10;

const imageFilterSection = document.querySelector('.img-filters');

let pictures = [];
let currentFilter = Filter.DEFAULT;

const randomSort = () => Math.random() - 0.5;

const discussedSortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const filterPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(randomSort).slice(0, PICTURE_VIEW_COUNT);

    case Filter.DISCUSSED:
      return [...pictures].sort(discussedSortByComments);

    default:
      return [...pictures];
  }
};

const setOnFilterClick = (callback) => {
  imageFilterSection.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    imageFilterSection.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(filterPictures());
  });
};

function applyFilter(loadedPictures, callback) {
  imageFilterSection.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
}

export { filterPictures, applyFilter };
