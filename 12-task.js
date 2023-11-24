// Task:
// Задача на работу с объектами: создайте объект, представляющий собой книгу. 
// Объект должен иметь свойства, такие как: название книги, автор и год издания. 
// Напишите методы для получения и изменения значений свойств книги.

const book = {
  // так как по условию нам необходимо написать методы для получения и изменения свойств, 
  // делаем вывод, что свойства являются внутренними, а потому к ним не должно быть доступа из вне, 
  // поэтому обозначаем их символом "_"
  _name: 'Заводной апельсин',
  _author: 'Энтони Бёрджесс',
  _yearPublication: 1962,

  // объявляем сеттеры и геттеры для изменения и получения значений свойств объекта
  get name() {
    return this._name;
  },
  set name(value) {
    this._name = value;
  },

  get author() {
    return this._author;
  },
  set author(value) {
    this._author = value;
  },

  get yearPublication() {
    return this._yearPublication;
  },
  set yearPublication(value) {
    this._yearPublication = value;;
  },
}

console.log(book.name); // Заводной апельсин
console.log(book.author); // Энтони Бёрджесс
console.log(book.yearPublication); // 1962

book.name = 'Transsiberian Back2black';
book.author = 'Андрей Доронин';
book.yearPublication = 2013;

console.log(book.name); // Transsiberian Back2black
console.log(book.author); // Андрей Доронин
console.log(book.yearPublication); // 2013