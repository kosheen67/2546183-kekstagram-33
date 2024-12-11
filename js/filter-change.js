const EFFECTS = [
  {
    effectName: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    querySelector: document.querySelector('#effect-none'),
  },
  {
    effectName: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    querySelector: document.querySelector('#effect-chrome'),
  },
  {
    effectName: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    querySelector: document.querySelector('#effect-sepia'),
  },
  {
    effectName: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    querySelector: document.querySelector('#effect-marvin'),
  },
  {
    effectName: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    querySelector: document.querySelector('#effect-phobos'),
  },
  {
    effectName: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    querySelector: document.querySelector('#effect-heat'),
  },
];

const effectValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max:  100,
  },
  start: 0,
  connect: 'lower',
  step: 1,
  format: {
    to: function (value) {
      return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});


effectLevelSlider.noUiSlider.on('update', () => {
  const value = effectLevelSlider.noUiSlider.get();
  effectValue.value = value;
  applyEffect();
});

function applyEffect() {
  const selectedEffect = EFFECTS.find((effect) => effect.querySelector.checked);

  if (selectedEffect) {
    const value = parseFloat(effectValue.value);
    imagePreview.style.filter = `${selectedEffect.filter}(${value}${selectedEffect.unit})`;
  } else {
    imagePreview.style.filter = '';
  }
}

EFFECTS.forEach((effect) => {
  effect.querySelector.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      effectLevelContainer.style.display = 'block';
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: effect.min,
          max: effect.max,
        },
        step: effect.step,
      });
      effectLevelSlider.noUiSlider.set(effect.max);
      applyEffect();
      if (effect.effectName === 'none') {
        effectLevelContainer.style.display = 'none';
        imagePreview.style.filter = '';
      }
    }

    if (EFFECTS.every((e) => !e.querySelector.checked)) {
      effectLevelContainer.style.display = 'none';
      imagePreview.style.filter = '';
    }
  });
});

effectLevelContainer.style.display = 'none';
