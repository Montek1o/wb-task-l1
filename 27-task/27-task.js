// Task:
// Добавить анимацию для элемента: 
// Напишите функцию, которая добавляет анимацию для элемента на веб-странице, 
// например, плавное изменение его положения или размера.

function addAnimation() {
  // элемент, который анимируем
  const elem = document.querySelector('.red-square');
  // позиция, где находится элемент
  let pos = 0;
  // анимация реализуется через последовательность кадров, 
  // которая происходит через setInterval
  const id = setInterval(frame, 10)

  function frame() {
    // если позиция равна 450, то останавливаем анимацию
    if(pos == 450) {
      clearInterval(id)
    } else {
      // иначе увеличиваем позицию
      pos++;
      // и записываем её в стили
      elem.style.top = `${pos}px`;
      elem.style.left = `${pos}px`;
    }
  }
}

document.querySelector('.btn-animation').addEventListener('click', addAnimation);