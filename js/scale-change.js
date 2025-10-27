const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');


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
    console.log(`scale(${currentScaleValue / 100})`);
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


// При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).
