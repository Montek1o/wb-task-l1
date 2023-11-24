// Task:
// Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }. 
// Напишите код, который сортирует этот массив по возрастанию возраста, а при равных возрастах сортирует по алфавиту по полю name.

const objs = [
  {name: 'Andrey', age: 26},
  {name: 'Marina', age: 27},
  {name: 'Simba', age: 1},
  {name: 'Maxim', age: 26},
  {name: 'Dima', age: 26},
  {name: 'Irakli', age: 26},
];

function sortObjects(arrObjects) {
  // используем метод sort для сортировки массива
  const sort = arrObjects.sort((item, nextItem) => {
    // если возраст не равен, сортируем от меньшего к большему
    if (item.age !== nextItem.age) {
      return item.age - nextItem.age;
    // но если возвраст равен, то сортируем по алфавиту
    } else {
      return item.name > nextItem.name ? 1 : -1;
    }
  })

  return sort;
}

console.log(sortObjects(objs));
// [
//   { name: 'Simba', age: 1 },
//   { name: 'Andrey', age: 26 },
//   { name: 'Dima', age: 26 },
//   { name: 'Irakli', age: 26 },
//   { name: 'Maxim', age: 26 },
//   { name: 'Marina', age: 27 }
// ]