// Task:
// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

function maxDataLocalStorage() {
  let test = '';
  // добавляем каждую итерацию + 10000 символов,
  // когда хранилище будет переполнено и мы не сможем добавить очередные 10к символов,
  // у нас произойдёт ошибка 'DOMException: установка значения первысила квоту', тем самым заверша цикл
  // количество символов в строке сохранённой под ключом test и есть максимальное количество байтов, которые можно записать в ls
  try {
    while(true) {
      test += 'a'.repeat(10000);
      localStorage.setItem('test', test);
    }
  } catch(e) {
    console.log(e);
  }
  // переводим байт ->(/ 1024) килобайт ->(/ 1024) мегабайт
  console.log(localStorage.getItem('test').length / 1024 / 1024);
}

maxDataLocalStorage(); // 4.99725341796875 

// учитываем погрешность в 10к символов, и делаем вывод, что максимальный объём данных, 
// который можно записать в localStorage нашего браузера = 5МБ
