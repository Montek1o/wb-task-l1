// Task
// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: 
// пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), 
// подбирается адрес. Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.
// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

const apikey = '1a539e66-b779-4e96-b7ec-dd922f6ab4d0';
const input = document.querySelector('input');
const select = document.querySelector('select');

// функция для поиска адресов по нашему запросу
async function fetchGeo(address) {
  const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&geocode=${address}&format=json`);
  const data = await response.json();
  return data.response.GeoObjectCollection.featureMember;
}

async function addNewValueToSelect() {
  // если поле ввода стало пустым
  if (input.value == '') {
    // удаляем найденные адреса из списка
    select.innerHTML = '<option>Выберите адрес</option>';
    return;
  };
  // получаем адреса
  const foundAddresses = await fetchGeo(input.value);
  // очищаем выпадающий список от старых значений
  select.innerHTML = '<option>Выберите адрес</option>';
  // добавляем новые значения
  foundAddresses.forEach(address => {
    const option = document.createElement('option');
    option.textContent = address.GeoObject.metaDataProperty.GeocoderMetaData.text;
    select.append(option);
  });
}

// функция debounce, предназначена для того, 
// чтобы переданная в аргумент функция срабатывала не сразу,
// а после окончания периода "бездействия" (время, которое передаём вторым аргументом)
function debounce(func, delay) {
  let timeOut;

  return () => {
    clearTimeout(timeOut);
    timeOut = setTimeout(func, delay);
  }
}

// функция throttle, предназначена для того,
// чтобы переданная в аргумент функция вызывалась не чаще того времени,
// которое передаём вторым аргументом
function throttle(func, delay) {
  // состояние задержки
  let shouldWait = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    // в состоянии задержки запоминаем все вызовы в saveArgs / saveThis
    if (shouldWait) {
      savedArgs = arguments;
      savedThis = this;
      return
    };
    // при первом вызове просто вызываем нашу функцию
    func.apply(this, arguments)
    // состояние задержки ставим true
    shouldWait = true;
    // затем про прошествию delay
    setTimeout(() => {
      // сбрасываем задержку
      shouldWait = false;
      // и если мы проигнориовали вызовы, то "обёртка" выполняется с последними запомненными аргументами и контекстом
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, delay)
  }
  return wrapper;
}

// вешаем событие инпут на поле ввода, чтобы оно срабатывало каждый раз при изменении значения
input.addEventListener('input', debounce(addNewValueToSelect, 1000));

// вешаем событие смены значения на select
select.addEventListener('change', () => {
  // находим индекс выбранного элемента из списка
  const index = select.selectedIndex;
  // все элементы списка
  const options = select.options;

  // если выбран первый элемент списка "выберите адрес", то очищаем поле ввода
  if (index == 0) {
    input.value = '';
  // иначе подставляем текст выбранного элемента
  } else {
    input.value = options[index].textContent;
  }
})
