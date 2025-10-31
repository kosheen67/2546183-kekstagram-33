//Этап 1: Подготовка элементов
const sliderContainer = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const filters = document.querySelectorAll('input[name = "effect"]');

// Изначально скрываем слайдер (для эффекта "Оригинал" по умолчанию)
sliderContainer.classList.add('hidden');

// Этап 2: Инициализация слайдера
noUiSlider.create(sliderElement, {
  range:{
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

//Обработчик изменения слайдера
sliderElement.noUiSlider.on('update', (values, handle) => {
  const chosenRangeValue = parseFloat(values[handle]);
  effectLevelValue.value = chosenRangeValue; // Записываем значение в скрытое поле для сервера
  const currentEffect = document.querySelector('input[name="effect"]:checked').value; // Получаем текущий выбранный эффект
  applyFilter(currentEffect, chosenRangeValue); // Обновляем CSS-фильтр
});


// Этап 3: Обработка переключения эффектов
filters.forEach((element) => {
  element.addEventListener('change', (evt) =>{//Добавить обработчики на все радиокнопки эффектов
    const selectedEffect = evt.target.value;

    if(selectedEffect === 'none') {
      sliderContainer.classList.add('hidden');
    } else {
      sliderContainer.classList.remove('hidden');
    }

    effectLevelValue.value = 100;//Сбросить уровень эффекта до 100% при переключении

    //Настроить слайдер под выбранный эффект
    updateSliderForEffect(selectedEffect);

    // Применить начальный CSS-фильтр
    applyFilter(selectedEffect, 100);
  });
});

//Для каждого эффекта настроить свои параметры:
function updateSliderForEffect(selectedFilter) {
  const filterSettings = {
    chrome: {min: 0, max: 1, step: 0.1},
    sepia: {min: 0, max: 1, step: 0.1},
    marvin: {min: 0, max: 100, step: 1},
    phobos: {min: 0, max: 3, step: 0.1},
    heat: {min: 1, max: 3, step: 0.1},
    none:{},//or null попробовать
  };

  if(filterSettings[selectedFilter] && selectedFilter !== 'none') {
    const settings = filterSettings[selectedFilter];
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: settings.min,
        max: settings.max
      },
      step: settings.step,
      start: settings.max
    });
    effectLevelValue.value = settings.max;
  }
}

// 🔥 ДОБАВЛЕНА функция применения CSS-фильтра
function applyFilter(effect, value) {
  const filtersCSS = {
    chrome: `grayscale(${value})`,
    sepia: `sepia(${value})`,
    marvin: `invert(${value}%)`,
    phobos: `blur(${value}px)`,
    heat: `brightness(${value})`,
    none: 'none'
  };

  // Применяем фильтр или удаляем его для "Оригинала"
  imagePreview.style.filter = filtersCSS[effect] || 'none';
}
