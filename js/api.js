const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

// Общая функция для выполнения HTTP-запросов
const httpRequest = function(url, options = {}) {//Пойти на сервер по адресу BASE_URL + "/data"

  return fetch(`${BASE_URL}${url}`, options)//Вежливо попросить: "Дай мне фотографии, пожалуйста"
    .then((response)=>{//Подождать ответ от сервера
      // Проверяем успешность ответа сервера
      if(!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
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
