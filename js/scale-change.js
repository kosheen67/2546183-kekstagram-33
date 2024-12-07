const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
let currentScale = 100;

const updateScale = (newScaleValue) => {
  currentScale = newScaleValue;
  scaleValue.value = currentScale;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

const onSmallerButtonClick = () => {
  if (currentScale > 25) {
    updateScale(currentScale - 25);
  }
};

const onBiggerButtonClick = () => {
  if (currentScale < 100) {
    updateScale(currentScale + 25);
  }
};

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);
