'use strict';
const beforeLoginUI = document.querySelector('#login-modal'); // Phần giao diện khi chưa login
const afterLoginUI = document.querySelector('#main-content'); // Phần giao diện khi đã login
const welcomeMessage = document.querySelector('#welcome-message');
const logoutBtn = document.querySelector('#btn-logout');
// Xử lý nếu user đã login thành công
if (currentUser) {
  const logonUser = new User(currentUser);
  welcomeMessage.textContent = `Welcome, ${logonUser.getAcronymName()}`;
  beforeLoginUI.style.display = 'none';
  // afterLoginUI.style.display = 'block';
} else {
  // Khi user chưa login
  afterLoginUI.style.display = 'none';
  // beforeLoginUI.style.display = 'block';
}

// Xử lý khi user logout
logoutBtn.addEventListener('click', function () {
  localStorage.removeItem(currentUserKey);
  window.location.href = './pages/login.html';
});

// Test API
const KEY = 'de6c2f16dcee940a0727c754009e0d38'
fetch('http://api.mediastack.com/v1/news?access_key=de6c2f16dcee940a0727c754009e0d38').then(res => res.json()).then(data => console.log(data))