// Task:
// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.
// аналог JSON.parse

function stringToJson(str) {
  // функция для парсинга всех типов данных
  function parseValue(value) {
    // строки (проверяем по двойным кавычкам)
    if (value.startsWith('"') && value.endsWith('"')) {
      // возвращаем значение без кавычек
      return value.slice(1, -1);
    }
    // числа (проверяем через регулярное выражение) 
    if (/[1-9]/.test(value[0])) {
      // приводим к числу
      return +value;
    }
    // булевые и null
    if (value === "true") {
      return true;
    } else if (value === "false") {
      return false;
    } else if (value === "null") {
      return null;
    }
    // массивы (проверяем по квадартным скобкам)
    if (value.startsWith('[') && value.endsWith(']')) {
      // возвращаем функцию для парсинга массивов, аргументом передаём найденную строку без скобок
      return parseArray(value.slice(1, -1));
    }
    // объекты (проверяем по фигурным скобкам)
    if (value.startsWith('{') && value.endsWith('}')) {
      // возвращаем функцию для парсинга объектов, аргументом передаём найденную строку без скобок
      return parseObject(value.slice(1, -1));
    }
  }

  // функция для парсинга массивов
  function parseArray(arrayString) {
    // создаём массив, куда будем складывать значения
    const array = [];
    // счётчики скобок, для проверки вложенных массивов/объектов
    let bracketLevel = 0;
    let braceLevel = 0;
    // значение строка или нет
    let inString = false;
    // индекс начала значения
    let startIdx = 0;

    // циклом проходим по каждому символу из полученной строки
    for (let i = 0; i < arrayString.length; i++) {
      const char = arrayString[i];
      if (char === '"' && arrayString[i - 1] !== '\\') {
        inString = !inString;
      } else if (char === '[' && !inString) {
        bracketLevel++;
      } else if (char === ']' && !inString) {
        bracketLevel--;
      } else if (char === '{' && !inString) {
        braceLevel++;
      } else if (char === '}' && !inString) {
        braceLevel--;
      // если символ ',' и все вложенные массивы/объекты обработаны и это также не является строкой
      } else if (char === ',' && bracketLevel === 0 && braceLevel === 0 && !inString) {
        // то добавляем в наш массив эту часть строки и парсим её parseValue
        array.push(parseValue(arrayString.slice(startIdx, i)));
        // сдвигаем начало значения
        startIdx = i + 1;
      }
    }
    // добавляем последний элемент массива
    array.push(parseValue(arrayString.slice(startIdx)));

    return array;
  }

  // функция для парсинга объектов
  function parseObject(objectString) {
    // создаём объект, куда будем складывать его свойства
    const obj = {};
    // счётчики скобок, для проверки вложенных массивов/объектов
    let bracketLevel = 0;
    let braceLevel = 0;
    // значение строка или нет
    let inString = false;
    // индекс начала значения
    let startIdx = 0;
    // переменная определяющая ключ это или нет
    let inKey = true;
    // сам ключ
    let key = null;

    // циклом проходим по каждому символу из полученной строки
    for (let i = 0; i < objectString.length; i++) {
      const char = objectString[i];
      if (char === '"' && objectString[i - 1] !== '\\') {
        inString = !inString;
      } else if (char === '[' && !inString) {
        bracketLevel++;
      } else if (char === ']' && !inString) {
        bracketLevel--;
      } else if (char === '{' && !inString) {
        braceLevel++;
      } else if (char === '}' && !inString) {
        braceLevel--;
      // если символ ':' и все вложенные массивы/объекты обработаны и это также не является строкой и является ключом
      } else if (char === ':' && bracketLevel === 0 && braceLevel === 0 && !inString && inKey) {
        // записываем имя ключа
        key = parseValue(objectString.slice(startIdx, i));
        // сдвигаем индекс 
        startIdx = i + 1;
        // меняем состояние ключа и говорим, что дальше идёт не ключ
        inKey = false;
      // если символ ',' и все вложенные массивы/объекты обработаны и это также не является строкой и не является ключом
      } else if (char === ',' && bracketLevel === 0 && braceLevel === 0 && !inString && !inKey) {
        // присваиваем объекту, найденный до этого ключ и записываем в него найденное значение
        obj[key] = parseValue(objectString.slice(startIdx, i));
        // сдвигаем индекс 
        startIdx = i + 1;
        // меняем состояние ключа и говорим, что дальше идёт ключ
        inKey = true;
      }
    }
    // добавляем последнее значение
    if (!inKey) {
      obj[key] = parseValue(objectString.slice(startIdx));
    }

    return obj;
  }

  return parseValue(str);
}

const str = '{"name":"Andrey","age":26,"address":{"city":"Moscow","index":123103,"obj":{"a":1,"b":"2"}},"boolean":true,"booleanTwo":false,"null":null,"arr":["1",true,3],"arrTwo":[{"name":"Vasya"},["a","b","c"],6]}';

console.log(stringToJson(str));
// {
//   name: 'Andrey',
//   age: 26,
//   address: { city: 'Moscow', index: 123103, obj: { a: 1, b: '2' } },
//   boolean: true,
//   booleanTwo: false,
//   null: null,
//   arr: [ '1', true, 3 ],
//   arrTwo: [ { name: 'Vasya' }, [ 'a', 'b', 'c' ], 6 ]
// }
console.log(JSON.parse(str));
// {
//   name: 'Andrey',
//   age: 26,
//   address: { city: 'Moscow', index: 123103, obj: { a: 1, b: '2' } },
//   boolean: true,
//   booleanTwo: false,
//   null: null,
//   arr: [ '1', true, 3 ],
//   arrTwo: [ { name: 'Vasya' }, [ 'a', 'b', 'c' ], 6 ]
// }
