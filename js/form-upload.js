import { sendData } from './api.js';
import { resetScale } from './scale-change.js';
import { resetFilters } from './filter-change.js';

const body = document.querySelector('body');
const uploadForm = body.querySelector('.img-upload__form');//форма с # и комментами
const imageUploadInput = body.querySelector('.img-upload__input'); //кнопка загрузки фото, буква О
const overlay = body.querySelector('.img-upload__overlay');//загруженная картинка
const uploadCloseButton = body.querySelector('.img-upload__cancel');//кнопка закрытия загруженного фото
const submitButton = uploadForm.querySelector('.img-upload__submit');
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const effectsPreviews = document.querySelectorAll('.effects__preview');

//Находим элементы для сброса
const scaleControl = uploadForm.querySelector('.scale__control--value');
const effectsList = uploadForm.querySelector('.effects__list');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');


// Функция для загрузки и отображения выбранной фотографии
const loadUserPhoto = (file) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    // Устанавливаем загруженное изображение в основное превью
    imagePreview.src = reader.result;

    // 🔥 ДОБАВЛЕНО: Устанавливаем загруженное изображение в превью фильтров
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${reader.result})`;
    });
  });

  reader.readAsDataURL(file);
};

// Валидация файла
const validateFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!file) {
    return false;
  }

  if (!allowedTypes.includes(file.type)) {
    alert('Пожалуйста, выберите файл в формате JPEG, PNG, GIF или WebP');
    return false;
  }

  if (file.size > maxSize) {
    alert('Файл слишком большой. Максимальный размер: 5MB');
    return false;
  }

  return true;
};

// 🔥 ДОБАВЛЕНО: Обновленный обработчик открытия формы
const onFileInputChange = (evt) => {
  const file = evt.target.files[0];

  if (file && validateFile(file)) {
    loadUserPhoto(file);
    showOverlay();
  } else {
    // Сбрасываем input если файл невалидный
    imageUploadInput.value = '';
  }
};

imageUploadInput.addEventListener('change', onFileInputChange);

//валидация формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//  Функция полного сброса формы в исходное состояние
const resetFormToInitialState = () => {
  // 1. Сбрасываем стандартные поля формы
  uploadForm.reset();

  // 2. Возвращаем масштаб к 100%
  resetScale();

  // 3. Сбрасываем эффект на «Оригинал»
  resetFilters();

  // 4. Очищаем поля ввода (на всякий случай)
  if (hashtagsField) {
    hashtagsField.value = '';
  }
  if (commentField) {
    commentField.value = '';
  }

  // 5. Убираем CSS фильтры с изображения
  if (imagePreview) {
    imagePreview.style.filter = 'none';
    imagePreview.src = 'img/upload-default-image.jpg';
  }

  // 🔥 ДОБАВЛЕНО: Сбрасываем превью фильтров
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  // 6. Сбрасываем валидацию Pristine
  pristine.reset();

  // 7. Очищаем поле загрузки файла (буква "О")
  if (imageUploadInput) {
    imageUploadInput.value = '';
  }

  // 🔥 ДОБАВЛЕНО: Скрываем слайдер эффектов если он есть
  const effectLevel = document.querySelector('.effect-level');
  if (effectLevel) {
    effectLevel.classList.add('hidden');
  }

  // 8. Скрываем слайдер эффектов
  if (effectLevel) {
    effectLevel.classList.add('hidden');
  }

  // 🔥 ДОБАВЛЕНО: Сбрасываем слайдер
  if (window.sliderElement && window.sliderElement.noUiSlider) {
    window.sliderElement.noUiSlider.updateOptions({
      range: { min: 0, max: 100 },
      start: 100,
      step: 1
    });
  }
};


// Функции блокировки кнопки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Функции сообщений
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  if (!successTemplate) {
    console.error('Шаблон успеха не найден');
    return;
  }

  const successElement = successTemplate.content.cloneNode(true);
  document.body.appendChild(successElement);

  const successModal = document.querySelector('.success');
  const closeButton = successModal.querySelector('.success__button');

  const closeSuccessModal = () => {
    successModal.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeSuccessModal();
    }
  };

  const onOutsideClick = (evt) => {
    if (evt.target === successModal) {
      closeSuccessModal();
    }
  };

  closeButton.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error');
  if (!errorTemplate) {
    console.error('Шаблон ошибки не найден');
    return;
  }

  const errorElement = errorTemplate.content.cloneNode(true);
  document.body.appendChild(errorElement);

  const errorModal = document.querySelector('.error');
  const closeButton = errorModal.querySelector('.error__button');
  const retryButton = errorModal.querySelector('.error__button:last-child');

  const closeErrorModal = () => {
    errorModal.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  const onRetryClick = () => {
    closeErrorModal();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeErrorModal();
    }
  };

  const onOutsideClick = (evt) => {
    if (evt.target === errorModal) {
      closeErrorModal();
    }
  };

  closeButton.addEventListener('click', closeErrorModal);
  retryButton.addEventListener('click', onRetryClick);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

//показ и скрытие загруженного фото
function showOverlay() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

function closeUploadForm(){
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetFormToInitialState();
}

// Клик на кнопку закрытия
uploadCloseButton.addEventListener('click', closeUploadForm);

// Нажатие Esc на документе
document.addEventListener('keydown', (evt)=>{
  if(evt.key === 'Escape') {
    const successModal = document.querySelector('.success');
    const errorModal = document.querySelector('.error');

    if (!successModal && !errorModal) {
      closeUploadForm();
    }
  }
});

// Обработка Esc в полях ввода
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

// Обработчик отправки формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    pristine.validate(true);
    return;
  }

  // Блокируем кнопку отправки
  blockSubmitButton();

  // Создаём FormData из формы
  const formData = new FormData(uploadForm);

  // Отправляем данные на сервер через Promise
  sendData(formData)
    .then((result) => {
      console.log('Фото успешно загружено:', result);
      showSuccessMessage();
      closeUploadForm(); // Закрываем форму
    })
    .catch((error) => {
      console.error('Ошибка отправки формы:', error);
      showErrorMessage();
    })
    .finally(() => {
      // Всегда разблокируем кнопку
      unblockSubmitButton();
    });
});

//Обработчик кнопки сброса (если есть в форме)
const resetButton = uploadForm.querySelector('.img-upload__cancel[type="reset"]');
if (resetButton) {
  resetButton.addEventListener('click', resetFormToInitialState);
}

