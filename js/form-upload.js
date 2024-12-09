import { isEscKey } from './util.js';
import './filter-change.js';
import { showNotificationMessage } from './result-message-form.js';
import { sendData } from './api.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;
const overlay = form.querySelector('.img-upload__overlay');
const uploadFile = form.querySelector('#upload-file');
const hashtagField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const cancelUploadButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');
const photoPreview = form.querySelector('.img-upload__preview img');
const effectsPreview = form.querySelectorAll('.effects__preview');


const HASHTAG_UNVALID = /[^\w\u0400-\u04FF]/;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const showOverlay = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
};

const hideOverlay = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydown);
};

const resetForm = () => {
  form.reset();
  pristine.reset();
};

const textFieldActive = () => document.activeElement === hashtagField || document.activeElement === descriptionField;

function onEscKeydown(evt) {
  if (isEscKey(evt) && !textFieldActive()) {
    evt.preventDefault();
    hideOverlay();
    resetForm();
  }
}

const startsWithHashtag = (string) => string[0] === '#';
const hasValidLength = (string) => string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;
const hasValidSymbols = (string) => !HASHTAG_UNVALID.test(string.slice(1));
const isValidHashtag = (tag) => startsWithHashtag(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const isValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const isUniqueHashtags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtags = (value) => {
  const hashtags = value.split(' ').filter((tag) => tag.trim());
  return isValidCount(hashtags) && isUniqueHashtags(hashtags) && hashtags.every(isValidHashtag);
};

pristine.addValidator(
  hashtagField,
  validateHashtags,
  'Недопустимый хэштег'
);

const hasValidCommentLength = (string) => string.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  descriptionField,
  hasValidCommentLength,
  'Слишком длинный комментарий'
);

const onCancelUploadButtonClick = () => hideOverlay();

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Идет отправка';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onFileInputChange = () => {
  const file = uploadFile.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  showOverlay();
};

const setUserFormSubmit = async (forElement) => {

  const isValid = pristine.validate();
  if(isValid) {
    blockSubmitButton();
    try {
      await sendData(new FormData(forElement));
      showNotificationMessage(templateSuccess);
      hideOverlay();
      resetForm();
    } catch (error) {
      showNotificationMessage(templateError);
    } finally {
      unblockSubmitButton();
    }
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  setUserFormSubmit(evt.target);
};

form.addEventListener('submit', formSubmitHandler);
uploadFile.addEventListener('change', onFileInputChange);
cancelUploadButton.addEventListener('click', onCancelUploadButtonClick);

export {setUserFormSubmit, showOverlay, hideOverlay};
