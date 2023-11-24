// Task:
// Реализовать функцию конвертации JSON в строку
// аналог JSON.stringify

const obj = {
  name: 'Andrey',
  age: 26,
  address: {
    city: 'Moscow',
    index: 123103,
  },
  [Symbol('id')]: 1,
  boolean: true,
  null: null,
  undefined: undefined,
  arr: [1, 2, 3],
  func: (a, b) => {
    return a + b 
  },
};

function jsonToString(obj) {
  let json = '';

  // циклом перебираем каждую пару ключ:значение объекта
  for (const key in obj) {
    // так как метод JSON.stringify опускает undefined и function делаем проверку. 
    // Symbol также не должен попдать в json, но так как мы используем цикл for in, он будет проигнорирован
    if (typeof obj[key] != 'undefined' && typeof obj[key] != 'function') {
      // добавляем ключ объекта в строку с двойными кавычками, так как это требует json формат
      json += `"${key}":`
      // если значение строка, добавляем его в строку с двойными кавычками
      if (typeof obj[key] == 'string') {
        json += `"${obj[key]}",`
      // если значение массив, добавляем его в строку с квадратными скобками
      } else if (Array.isArray(obj[key])) {
        json += `[${obj[key]}]` + ','
      // если значение объект, но не null, рекурсивно запускаем эту же функцию, обрабатывая значения внутреннего объекта
      } else if (typeof obj[key] == 'object' && obj[key] != null) {
        json += jsonToString(obj[key]) + ',';
      // если все остальные значения (number, boolean, null) просто добавляем само значение
      } else {
        json += obj[key] + ','
      }
    }
  }
  // возвращаем получившуеся строку без последней ',' оборачивая всё в '{}'
  return `{${json.slice(0, -1)}}`;
}

console.log(jsonToString(obj)); // {"name":"Andrey","age":26,"address":{"city":"Moscow","index":123103},"boolean":true,"null":null,"arr":[1,2,3]}
console.log(JSON.stringify(obj)); // {"name":"Andrey","age":26,"address":{"city":"Moscow","index":123103},"boolean":true,"null":null,"arr":[1,2,3]}
