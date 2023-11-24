// Task:
// Задача о палиндроме: напишите функцию, которая проверяет, является ли заданная строка палиндромом. 
// Палиндром — это строка, которая читается одинаково в обоих направлениях (например, «аргентина манит негра»).

function isPalindrome(str) {
  // Избавляемся от пробелов и приводим к единому регистру
  const strWithoutSpaces = str.replaceAll(' ', '').toLowerCase();

  // Переворачиваем строку
  const strReverse = strWithoutSpaces.split('').reverse().join('');

  // Сравниваем строки и возвращаем результат
  return strWithoutSpaces == strReverse;
}

function isPalindromeCicle(str) {
  // Избавляемся от пробелов и приводим к единому регистру
  const strWithoutSpaces = str.replaceAll(' ', '').toLowerCase();

  // Циклом сравниваем крайние символы доходя до середины строки, где сравнение символов пересечется
  for (let i = 0; i < (strWithoutSpaces.length / 2); i++) {
    // Если символы не равны, значит строка не является палиндромом
    if (strWithoutSpaces[i] != strWithoutSpaces[strWithoutSpaces.length - 1 - i]) {
      return false;
    }
  }

  // Если весь цикл прошёл успешно, значит строка палиндромом
  return true;
}

console.log(isPalindrome('аргентина манит негра')); // true
console.log(isPalindrome('негр манит аргентину')); // false
console.log(isPalindromeCicle('аргентина манит негра')); // true
console.log(isPalindromeCicle('негр манит аргентину')); // false