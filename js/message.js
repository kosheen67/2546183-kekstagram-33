const showErrorMessage = (message) => {
  const errorElement = document.createElement('div');
  errorElement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ff4d4d;
    color: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 1000;
    text-align: center;
  `;
  errorElement.textContent = message;

  document.body.appendChild(errorElement);

  // Автоматически удаляем сообщение через 5 секунд
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

export { showErrorMessage };
