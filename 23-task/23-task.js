// Task:
// Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля. 
// Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах. 
// Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.

function passwordComplexity() {
  const passwordInput = document.querySelector('input');
  const complexity = document.querySelector('.complexity');
  const suggestions = document.querySelector('.suggestions');

  function passwordCheck() {
    // переменная для подсчёта сложности пароля
    let complexityScore = 0;
    // массив для сбора уведомлений об улучшении 
    const suggestionsList = [];
    // обнуление уведомлений на странице
    suggestions.textContent = '';
    complexity.textContent = '';

    // проверка длины 
    if (passwordInput.value.length > 8) {
      complexityScore += 1;
    } else {
      suggestionsList.push('Пароль должен содержать более 8 символов');
    }

    // проверка на буквы в верхнем регистре
    if (/[A-ZА-Я]/.test(passwordInput.value)) {
      complexityScore += 1;    
    } else {
      suggestionsList.push('Добавьте символ в верхнем регистре');    
    }

    // проверка на буквы в нижнем регистре
    if (/[a-zа-я]/.test(passwordInput.value)) {
      complexityScore += 1;    
    } else {
      suggestionsList.push('Добавьте символ в нижнем регистре');    
    }

    // проверка на цифры
    if (/\d/.test(passwordInput.value)) {
      complexityScore += 1;    
    } else {
      suggestionsList.push('Укажите хотя бы одну цифру');    
    }

    // проверка на символы
    if (/[^A-ZА-Яа-яa-z0-9]/.test(passwordInput.value)) {
      complexityScore += 1;    
    } else {
      suggestionsList.push('Используйте специальные символы, такие как @, #, $ и т.д.'); 
    }

    // оценка сложности
    let strength = '';    
    if (complexityScore == 5) {
      strength = 'Надежный пароль';
      passwordInput.style.boxShadow = '0 0 10px green';
    } else {
      strength = 'Слабый пароль';
      passwordInput.style.boxShadow = '0 0 10px red';
    }

    // выводим на страницу сложность пароля
    complexity.textContent = strength;
    // выводим на страницу уведомления об улучшении
    suggestionsList.map(suggestion => {
      suggestions.innerHTML += `<span class="suggestion"><span class="icon">!</span> ${suggestion}</span>`;
    })

    // очищаем уведомления и визуальные эффекты, если поле ввода стало пустым
    if (passwordInput.value.length == 0) {
      suggestions.textContent = '';
      complexity.textContent = '';
      passwordInput.style.boxShadow = 'none';
    }
  }

  // вешаем обработчик событий на изменение значения инпута
  passwordInput.addEventListener('input', passwordCheck);
}

passwordComplexity();