// Task:
// Создать и добавить стиль для элемента:
// Напишите функцию, которая создает новый элемент, 
// добавляет его в DOM и устанавливает для него стиль с помощью CSS.

function createElementAndAddStyle(elem, styles) {
  // создаём новый элемент с переданным тегом
  const newElem = document.createElement(elem);

  // добавляем ему переданные стили
  for (let key in styles) {
    console.log(styles[key], key);
    newElem.style[key] = styles[key];
  }

  // добавляем его в DOM
  document.body.append(newElem);
}

createElementAndAddStyle('div', {
  width: '50px',
  height: '50px',
  backgroundColor: 'red',
})