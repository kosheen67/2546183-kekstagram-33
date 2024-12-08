import { isEscKey } from './util';

const body = document.querySelector('body');

const closeNotificationMessage = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton || isEscKey (evt)) {
    existElement.remove();
    body.removeEventListener('click', closeNotificationMessage);
    body.removeEventListener('keydown', closeNotificationMessage);
  }
};

const showNotificationMessage = (template,) => {
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', closeNotificationMessage);
  body.addEventListener('keydown', closeNotificationMessage);
};


export { closeNotificationMessage, showNotificationMessage };
