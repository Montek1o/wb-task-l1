// Task:
// Создать и добавить элемент с использованием шаблонов: 
// Напишите функцию, которая создает новый элемент с использованием шаблонов 
// (например, с помощью тега <template>) и добавляет его в DOM.

function addTemplate() {
  // создаём новый элемент div
  const elem = document.createElement('div');
  // клонируем содержимое шаблона для того, чтобы переиспользовать его несколько раз
  elem.append(tmpl.content.cloneNode(true));
  // вставляем в разметку
  document.body.append(elem);
}

addTemplate();