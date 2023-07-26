'use strict';
const logoutUIContainer = document.querySelector('#login-modal'); // Container phần giao diện khi chưa login
const welcomeMessage = document.querySelector('#welcome-message');
const logoutBtn = document.querySelector('#btn-logout');
const loginUIContainer = document.querySelector('#main-content');  // Container phần giao diện khi đã login
// Xử lý nếu user login thành công
if (currentUser) {
  const logonUser = new User(currentUser);
  welcomeMessage.textContent = `Welcome, ${logonUser.getAcronymName()}`;
  logoutUIContainer.style.display = 'none';
} else {
  loginUIContainer.style.display = 'none';
  // loginModal.style.display = 'block';
}
// Xử lý khi user logout
logoutBtn.addEventListener('click', function () {
  localStorage.removeItem(currentUserKey);
  window.location.href = './pages/login.html';
});
