// Task
// Посчитайте сколько раз можно вызвать функцию document.write() внутри document.write(). Объясните результат.

function documentWriteCall() {
  // устанавливаем счётчик вызовов
  let count = 0;
  // функция для вложенных вызовов document.write()
  function documentWriteCycle() {
    // увеличиваем счётчик
    count++;
    // повторно вызываем функцию
    document.write(documentWriteCycle());
  }

  // используем конструкцию try/catch для того, чтобы отловить ошибку и вывести в консоль количество вызовов
  try {
    documentWriteCycle()
  } catch (e) {
    console.log(count, e); // 10458, RangeError: Maximum call stack size exceeded
  }
}

documentWriteCall();

// У меня получилось вызвать функцию внутри себя 10458 раз, после чего произошла ошибка о превышении максимального размера стека вызовов.
// Из чего мы можем сделать вывод, что функцию document.write() можно вызвать внутри document.write() сколько угодно раз, пока не будет переполнен call stack.
// При этом, если бы мы утяжелили нашу функцию documentWriteCycle() дополнительными переменными, то за счёт большего объема памяти, стек вызовов переполнился бы раньше и функция вызвалась меньше раз.
