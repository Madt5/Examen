//Регистрация
function registerUser(email, password) {
  const users = getUsersFromLocalStorage();
  if (!users[email]) {
    users[email] = password;
    saveUsersToLocalStorage(users);
    return true;
  }
  return false;
}

//Вход
function loginUser(email, password) {
  const users = getUsersFromLocalStorage();
  if (users[email] === password) {
    return true;
  }
  return false;
}

//Получение пользователей из localStorage
function getUsersFromLocalStorage() {
  const usersJSON = localStorage.getItem('users');
  return usersJSON ? JSON.parse(usersJSON) : {};
}

//Сохранение пользователей в localStorage
function saveUsersToLocalStorage(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

//Нажатие на кнопку "Signup"
const signupButton = document.getElementById('signupButton');
if (signupButton) {
  signupButton.addEventListener('click', handleSignup);
}

function handleSignup(event) {
  event.preventDefault();

  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');

  const email = emailInput.value;
  const password = passwordInput.value;

  if (email && password) {
    const registrationSuccessful = registerUser(email, password);
    if (registrationSuccessful) {
      alert('Вы успешно зарегистрировались');
    } else {
      alert('Пользаватель с такой почтой уже существует');
    }
  } else {
    alert('Введите ваши почту и пароль');
  }
}

//Нажатие на кнопку "Login"
const loginButton = document.getElementById('loginButton');
if (loginButton) {
  loginButton.addEventListener('click', handleLogin);
}

function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');

  const email = emailInput.value;
  const password = passwordInput.value;

  if (email && password) {
    const loginSuccessful = loginUser(email, password);
    if (loginSuccessful) {
      window.location.href = 'catalog.html';
    } else {
      alert('Неправильный пароль или почта');
    }
  } else {
    alert('Введите ваши почту и пароль');
  }
}
