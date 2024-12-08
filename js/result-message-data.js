const body = document.querySelector('body');
const errorDataTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const REMOVE_MESSAGE_TIMEOUT = 5000;

const createDataErrorMessage = (message) => {
  const defaultErrorMesage = 'Не удалось загрузить данные, попробуйте позже';
  const errorDataElement = errorDataTemplate.cloneNode(true);
  if (!message) {
    errorDataElement.querySelector('.data-error__title').textContent = defaultErrorMesage;
  }
  errorDataElement.querySelector('.data-error__title').textContent = message;
  body.appendChild(errorDataElement);
  const errorLoadDataElement = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export {createDataErrorMessage};
