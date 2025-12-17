const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');


const scaleOptions = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT:100
};


//Изменение масштаба
function changeScale(clickedScale) {
  // Получаем текущее значение
  let currentScaleValue = parseInt(scaleControlInput.value);
  // Изменяем значение
  if(clickedScale === 'smaller') {
    currentScaleValue = currentScaleValue - scaleOptions.STEP;
  } else {
    currentScaleValue = currentScaleValue + scaleOptions.STEP;

  }

  //Проверить границы
  if (currentScaleValue < scaleOptions.MIN) {
    currentScaleValue = scaleOptions.MIN;
  }
  if(currentScaleValue > scaleOptions.MAX) {
    currentScaleValue = scaleOptions.MAX;
  }

  // Обновляем поле
  scaleControlInput.value = `${currentScaleValue}%`;
  imgUploadPreview.style.transform = `scale(${currentScaleValue / 100})`;
}

scaleControlSmaller.addEventListener('click', () => changeScale('smaller'));
scaleControlBigger.addEventListener('click', () => changeScale('bigger'));

// Функция сброса масштаба
const resetScale = () => {
  scaleControlInput.value = `${scaleOptions.DEFAULT}%`;
  imagePreview.style.transform = `scale(${scaleOptions.DEFAULT / 100})`;
};

export { resetScale }; // экспорт для использования в form-upload
