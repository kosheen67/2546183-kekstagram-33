
import './data.js';
import './form-upload.js';
import {makePicturesOnPage} from './thumbnails.js';
import {setUserFormSubmit, hideOverlay} from './form-upload.js';
import './scale-change.js';
import './filter-change.js';
import { getData } from './api.js';
import { createDataErrorMessage } from './result-message-data.js';
import { debounce } from './util.js';
import { filterPictures, applyFilter } from './display-filter.js';

const bootstrap = async () => {
  try {
    const photos = await getData();
    const debouncedMakePicturesOnPage = debounce(makePicturesOnPage, 500);
    applyFilter(photos, debouncedMakePicturesOnPage);
    makePicturesOnPage(filterPictures());
  } catch (error) {
    createDataErrorMessage(error.message);
  }
};

bootstrap();
setUserFormSubmit(hideOverlay);
