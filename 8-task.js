// Task:
// Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, 
// которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.

const functions = [
  function f1() {
    return 'Первая функция';
  },
  function f2() {
    return 'Вторая функция';
  },
  function f3() {
    return 'Третья функция';
  },
  function f4() {
    return 'Четвертая функция';
  },
];

function сlosures(functions) {
  return function() {
    // массив для результатов 
    const result = [];
    // перебираем каждую функцию методом map, вызываем её, после чего добавляем результат вызова в массив с результатами
    functions.map((func) => {
      result.push(func());
    })
    // возвращаем результат
    return result;
  }
}
// момент замыкания функций переданных аргументом
const resultFunc = сlosures(functions)

console.log(resultFunc()); 
/* [
  'Первая функция',
  'Вторая функция',
  'Третья функция',
  'Четвертая функция'
] */