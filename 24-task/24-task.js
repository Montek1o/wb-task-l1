// Task:
// Разработайте страницу, отображающую таблицу с данными. 
// Данные необходимо подгружать из этого источника:
// http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true
// Требования:
// * данные должны загружаться при загрузке страницы
// * необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// * необходимо реализовать клиентскую пагинацию (50 элементов на странице)

// контейнер для элементов
const container = document.querySelector('.table__body');
// данные
let data = [];
let dataNotSort = [];
// номер страницы
let page = 1;
const pageNumber = document.querySelector('.page-number');
// стрелки пагинации
const arrowLeft = document.querySelector('.arrows__arrow-left');
const arrowRight = document.querySelector('.arrows__arrow-right');
// заголовки колонок
const columnNames = document.querySelectorAll('.header__item');
// стрелки заголовков
const arrows = document.querySelectorAll('.header__item span');
// состояние сортировки
const stateSort = {
  fname: 0,
  lname: 0,
  tel: 0,
  address: 0,
  city: 0,
  state: 0,
  zip: 0,
}


// получаем данные
async function fetchData() {
  const response = await fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true)');
  const result = await response.json();
  data = result;
  dataNotSort = result;
  renderData(page, data);
}

// отрисовываем данные на странице
async function renderData(page, data) {
  const startIndex = (page - 1) * 50;
  const endIndex = startIndex + 50;
  
  // очищаем контейнер перед отрисовкой новой страницы
  container.innerHTML = '';

  for (let i = startIndex; i < endIndex; i++) {
    const element = document.createElement('div');
    element.className = 'table__item';
    element.innerHTML = `
    <p>${data[i].fname}</p>
    <p>${data[i].lname}</p>
    <p>${data[i].tel}</p>
    <p>${data[i].address}</p>
    <p>${data[i].city}</p>
    <p>${data[i].state}</p>
    <p>${data[i].zip}</p>
    `;
    
    container.append(element);
  }
}

// пагинация
function paggination() {
  // блокируем кнопки на границах 
  function disabledButton() {
    if (page == 1) {
      arrowLeft.disabled = true;
    } else {
      arrowLeft.disabled = false;
    }
    
    if (page == 20) {
      arrowRight.disabled = true;
    } else {
      arrowRight.disabled = false;
    }
  }
  
  // навешиваем событие клика на кнопки пагинации
  arrowLeft.addEventListener('click', () => {
    page--;
    renderData(page, data);
    disabledButton();
    pageNumber.textContent = `${page}`;
  })
  arrowRight.addEventListener('click', () => {
    page++;
    renderData(page, data);
    disabledButton();
    pageNumber.textContent = `${page}`;
  })
}

// сортировка
function sortColumn() {
  // перебираем имена колонок
  columnNames.forEach(column => {
    // вешаем событие клика на каждое имя
    column.addEventListener('click', (e) => {
      // по элементу на котором висит событие смотрим имя его атрибута
      const target = e.currentTarget.dataset.columnName;
      // стрелка этого элемента
      const arrow = e.currentTarget.querySelector('span');
      // другие стрелки скрываем и переворачиваем в исходное положение
      arrows.forEach(e => {
        e.style.display = 'none';
        e.style.transform = 'rotate(0deg)';
      })
      // стрелку таргета показываем
      arrow.style.display = 'inline';
      // если у целевого элемента состояние сортировки 0, то сортируем по убыванию
      if (stateSort[target] == 0) {
        // обнуляем сортировки других колонок
        for (let key in stateSort) {
          stateSort[key] = 0;
        }
        stateSort[target] = 1;
        data = data.slice().sort((item, nextItem) => {
          // и сортируем по имени из атрибута
          return item[target] > nextItem[target] ? 1 : -1;
        });
      // если у целевого элемента состояние сортировки 1, то сортируем по возрастанию
      } else if ((stateSort[target] == 1)) {
        stateSort[target] = 2;
        arrow.style.transform = 'rotate(180deg)';
        data = data.slice().sort((item, nextItem) => {
          return item[target] > nextItem[target] ? -1 : 1;
        });
      // если у целевого элемента состояние сортировки 2, то убираем сортировку и выводим исходный массив
      } else if ((stateSort[target] == 2)) {
        stateSort[target] = 0;
        arrow.style.transform = 'rotate(0deg)';
        arrow.style.display = 'none';
        data = dataNotSort;
      }
      renderData(page, data);
    });
  })
}

fetchData();
paggination();
sortColumn();

