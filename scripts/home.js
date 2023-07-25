'use strict';
const welcomeMessage = document.querySelector('#welcome-message');
const logoutBtn = document.querySelector('#btn-logout');
const mainContentEl = document.querySelector('#main-content');  // Element chứa nút logout
// const loginModal = document.querySelector('#login-modal');
// Xử lý nếu user login thành công
if (currentUser) {
  const logonUser = new User(currentUser);
  welcomeMessage.textContent = `Welcome, ${logonUser.getAcronymName()}`;
  loginModal.style.display = 'none';
} else {
  mainContentEl.style.display = 'none';
  // loginModal.style.display = 'block';
}
// Xử lý khi user logout
logoutBtn.addEventListener('click', function () {
  localStorage.removeItem(currentUserKey);
  window.location.href = './pages/login.html';
});
