// Task
// Рекурсивный обход дерева DOM: Напишите функцию, которая рекурсивно обходит дерево DOM, начиная с указанного элемента, 
// и выполняет определенное действие с каждым узлом (например, выводить информацию о теге в консоль).

const sectionOne = document.querySelector('.section-one');
const body = document.body;

function walkDom(node) {
  // выводим информацию о теге
  console.log(`tag - ${node.tagName}, class - ${node.className || 'нет класса'}`);
  // цикл по каждому вложенному тегу, если они есть
  for (let children of node.children) {
    // рекурсивно вызываем функцию
    walkDom(children);
  }
}

// walkDom(sectionOne);
walkDom(body);