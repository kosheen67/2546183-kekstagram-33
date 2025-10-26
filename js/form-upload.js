const body = document.querySelector('body');
const uploadForm = body.querySelector('.img-upload__form');//форма с # и комментами
const imageUploadInput = body.querySelector('.img-upload__input'); //кнопка загрузки фото, буква О
const overlay = body.querySelector('.img-upload__overlay');//загруженная картинка
const uploadCloseButton = body.querySelector('.img-upload__cancel');//кнопка закрытия загруженного фото
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;


//валидация формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


//показ и скрытие загруженного фото
function showOverlay() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
}
function hideOverlay(){
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
}
//Обработчик открытия формы
imageUploadInput.addEventListener('change', showOverlay);
// Клик на кнопку закрытия
uploadCloseButton.addEventListener('click', hideOverlay);
// Нажатие Esc на документе
document.addEventListener('keydown', (evt)=>{
  if(evt.key === 'Escape') {
    hideOverlay();
  }
});

// Обработка Esc в полях ввода
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

[hashtagsField, commentField].forEach((field) => {
  field.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
});


//валидация хештэгов
function validateHashtags(value) {
  if (value.trim() === '') {
    return true;
  }
  // Разделяем хэштеги по пробелам
  const hashtags = value.trim().split(/\s+/);
  if(hashtags.length > 5) {
    return 'Не более 5 хэштегов';
  }

  // Проверка 2: Каждый хэштег соответствует формату
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if(!/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)) {
      return 'Введен некорректный хештэг. Хэштег должен начинаться с # и содержать только буквы/цифры';
    }

    // Проверка 3: Нет повторяющихся хэштегов (регистронезависимо)
    for (let j = i + 1; j < hashtags.length; j++) {
      if(hashtag.toLowerCase() === hashtags[j].toLowerCase()) {
        return 'Хэштеги не должны повторяться';
      }
    }
  }
  return true;
}

pristine.addValidator(uploadForm.querySelector('.text__hashtags'),
  validateHashtags
);


//валидация комментариев
function validateCommentArea(value) {
  return value.length <= 140;
}
pristine.addValidator(uploadForm.querySelector('.text__description'),
  validateCommentArea,
  'Текст не может быть более 140 символов');

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
    pristine.validate(true);
  }
});
