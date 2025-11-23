const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

// Общая функция для выполнения HTTP-запросов
const httpRequest = function(url, options = {}) {//Пойти на сервер по адресу BASE_URL + "/data"

  // Проверяем, что BASE_URL определен
  if (typeof BASE_URL === 'undefined') {
    return Promise.reject(new Error('BASE_URL не определен'));
  }

  // Проверяем валидность URL
  if (!url || typeof url !== 'string') {
    return Promise.reject(new Error('Неверный URL'));
  }

  return fetch(`${BASE_URL}${url}`, options)//Вежливо попросить: "Дай мне фотографии, пожалуйста"
    .then((response)=>{//Подождать ответ от сервера
      // Проверяем успешность ответа сервера
      if(!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      // Проверяем Content-Type перед вызовом .json()
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Ответ сервера не в формате JSON');
      }

      return response.json();//Перевести ответ с "серверного языка" на "человеческий" (JSON → объект)
    })
    .catch((error) =>{
      // Обрабатываем ошибки сети
      if(error.name === 'TypeError') {
        throw new Error ('Проблемы с подключением к серверу');
      }
      //Пробрасываем другие ошибки дальше
      throw error;
    });
};
//Функция для получения данных с сервера (GET)
const getData = () => httpRequest('/data');

//Функция для отправки данных на сервер(POST)
const sendData = (formData) => httpRequest('/post', {
  method: 'POST',
  body: formData,
});

export { getData, sendData };
