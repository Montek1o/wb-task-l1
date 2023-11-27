// Task 19:
// Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много). Например, с помощью этой функции API VK. 
// Виджет должен иметь фиксированные размеры и возможность прокрутки. При прокрутке содержимого виджета до конца должны подгружаться новые посты. 
// Необходимо реализовать возможность кэширования уже загруженных данных: если пользователь закрыл страницу, а потом снова открыл ее, 
// виджет должен отображать все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).
// При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.

// Task 20:
// Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи. 
// При изменении данных в localStorage в консоль должен выводиться объем занятой памяти / максимальный размер 	хранилища. 

const token = '27ac3e1c27ac3e1c27ac3e1c1724ba5170227ac27ac3e1c42ce46189e8b5dce3c9405ee';
const postsContainer = document.querySelector('.posts');
const widget = document.querySelector('.widget');

// переменная для хранения загруженных постов
let cash = []
// переменная, которая обозначает с какой позиции по счёту загрузить посты из паблика
let offset = 0;
// переменная для обозначения состояния загрузки, нужна для того, чтобы при скролле в самый низ,
// новые посты подгружались один раз на наше значение count (5 шт.), а не в большом количестве сразу
let isLoading = false;

// через обычный fetch запрос данные получить не удалось из-за блокировки политикой CORS, 
// поэтому для обхода блокировки используем протокол JSONP
function JSONP() {
  const script = document.createElement('script');
  script.src = `https://api.vk.com/method/wall.get?access_token=${token}&domain=vktranserfing&count=5&offset=${offset}&v=5.199&callback=fetchPosts`;
  document.body.append(script);
  script.remove();
}

// функция, которую мы указываем в url-параметре callback в нашем запросе для получения постов
function fetchPosts(data) {
  // получили посты
  const posts = data.response.items;
  // перебрали каждый и отрисовали на странице
  posts.forEach(post => {
    renderPost(post)
    // добавили элементы в кеш
    cash.push(post);
  });
  // перевели элементы в json и добавили в Local storage
  localStorage.setItem('posts', JSON.stringify(cash));
  // подсчёт и вывод в консоль объём данных в хранилище
  calcDataLocalStorage();
  // загрузка завершена
  isLoading = false;
}

// отрисовка поста
function renderPost(post) {
  const date = new Date(post.date * 1000);
  const dateFormat = date.toLocaleTimeString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  
  postsContainer.innerHTML += 
  `
    <div class="post">
      <p class="post__date"><span>${dateFormat}</span><span>Лайки: ${post.likes.count}</span></p>
      <p class="post__text">${post.text}</p>
      ${post.attachments.length != 0 ? `<img class="post__img" src="${post.attachments[0].photo.sizes[3].url}" alt="photo">` : ''}
    </div>
  `
}

// подгрузка новых постов при скролле
widget.addEventListener('scroll', () => {
  // нижняя граница постов
  let relativeBottom = postsContainer.getBoundingClientRect().bottom;
  // если пользователь прокрутил почти до конца (60px запас) и не выполняется загрузка
  if (relativeBottom < widget.clientHeight + 60 && isLoading == false) {
    // запускаем загрузку постов
    isLoading = true;
    // сдвигаем на 5 позиций, чтобы грузить именно следующие посты, а не те, что уже есть
    offset += 5;
    JSONP();
  }
})

// кеширование данных
function cashPosts() {
  // если в local storage отсутствуют посты, то вызываем функцию на получение и отрисовку первых 5 постов
  if (!localStorage.getItem('posts')) {
    JSONP();
  } else {
    // если посты есть, преобразуем json из хранилища в массив объектов
    const postsStorage = JSON.parse(localStorage.getItem('posts'));
    // сдвигаем указатель загрузки новых постов на количество уже загруженных постов
    offset = postsStorage.length;
    // добавляем элементы в кеш
    cash = postsStorage;
    // отрисовываем на странице
    postsStorage.forEach(post => {
      renderPost(post);
    })
  }
}

// подсчёт данных в хранилище
function calcDataLocalStorage() {
  let total = 0;
  // перебираем все ключи
  for (let x in localStorage) {
    // исключаем прямые свойства
    if (localStorage.hasOwnProperty(x)) {
      // далее переводим байт -> килобайт -> мегабайт
      const amount = (localStorage[x].length) / 1024 / 1024;
      total += amount
    } 
  }
  // исходя из 18 задачи, мы знаем, что максимальный объём хранилища 5 мб
  console.log(`Хранилище заполнено на ${total.toFixed(3)} мб из 5 мб`); 
}

calcDataLocalStorage();
cashPosts();

