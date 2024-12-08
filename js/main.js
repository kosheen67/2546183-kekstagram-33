
import './data.js';
import './form-upload.js';
import {makePicturesOnPage} from './thumbnails.js';
import {setUserFormSubmit, hideOverlay} from './form-upload.js';
import './scale-change.js';
import './filter-change.js';
import { getData } from './api.js';
import { createDataErrorMessage } from './result-message-data.js';

const bootstrap = async () => {
  try {
    const photos = await getData();
    makePicturesOnPage(photos);
  } catch (error) {
    createDataErrorMessage(error.message);
  }
};

bootstrap();
setUserFormSubmit(hideOverlay);
