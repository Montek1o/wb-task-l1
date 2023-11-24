// Task:
// Разработайте функцию преобразования JSON в связный список. 
// На входе функция должна получать JSON, содержащий список объектов, на выходе объект, представляющий из себя односвязный список.

const objs = [
  {name: 'Andrey', age: 26},
  {name: 'Marina', age: 27},
  {name: 'Simba', age: 1},
  {name: 'Maxim', age: 26},
  {name: 'Dima', age: 26},
  {name: 'Irakli', age: 26},
];

const jsonObjs = JSON.stringify(objs);

function jsonToLinkedList(json) {
  // преобразуем в список объектов
  const objs = JSON.parse(json);
  // циклом проходим по каждому объекту и задаём им новое свойство nextNode
  // оно будет ссылаться на следующий объект
  for (let i = 0; i < objs.length; i++) {
    // если это последний элемент, то ссылка на следующий элемент будет ссылаться на null, по условию связного списка
    if (i == objs.length - 1) {
      objs[i].nextNode = null;
    // во всех остальных случаях элемент ссылается на следующий элемент
    } else {
      objs[i].nextNode = objs[i + 1];
    }
  }
  // возвращаем первый элемент с которого идёт начало списка, так называемый "head"
  return objs[0];
}

console.log(jsonToLinkedList(jsonObjs)); 
