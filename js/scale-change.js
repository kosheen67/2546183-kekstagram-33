// Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+», значение должно стать равным 75%. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
// При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');

const scaleOptions = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT:100
};


//Уменьшение масштаба
scaleControlSmaller.addEventListener('click', () =>{
  // 1. Получаем текущее значение
  const currentScaleValue = scaleControlInput.value;

  // 2. Преобразуем в число (убираем %)
  let scaleValueInNumber = +currentScaleValue.replace('%', '');

  scaleValueInNumber = scaleValueInNumber - scaleOptions.STEP;

  if(scaleValueInNumber < scaleOptions.MIN) {
    scaleValueInNumber = scaleOptions.MIN;
  }
  //3. Обновляем поле ввода
  scaleControlInput.value = `${scaleValueInNumber}%`;

});


