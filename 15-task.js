// Task:
// Задача на асинхронность: напишите асинхронную функцию, 
// которая использует ключевое слово await для ожидания выполнения других асинхронных операций, 
// и возвращает результат выполнения.

async function getRick() {
  // делаем GET-запрос, и ожидаем ответ
  const response = await fetch('https://rickandmortyapi.com/api/character/1');
  // ожидаем тело ответа (декодируем ответ в формате json)
  const json = await response.json();
  // возвращаем результат
  return json;
}

getRick().then(rick => console.log(rick.name)) // Rick Sanchez