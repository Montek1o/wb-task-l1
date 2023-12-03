// Task:
// Взаимодействие с формами: 
// Напишите функцию, которая получает данные из формы на веб-странице и выполняет определенные действия с этими данными, 
// например, отправляет их на сервер или отображает всплывающее окно с результатами.

function getDataForm() {
  const form = document.querySelector('form');

  form.addEventListener('submit', () => {
    const name = form.querySelector('.name').value;
    const lastName = form.querySelector('.last-name').value;
    
    alert(`Имя: ${name}, Фамилия: ${lastName}`);
  })
}

getDataForm();