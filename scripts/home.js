'use strict';
const welcomeMessage = document.querySelector('#welcome-message');
const loginModal = document.querySelector('#login-modal');
const logoutBtn = document.querySelector('#btn-logout');
// Xử lý nếu user login thành công
if (currentUser) {
  const logonUser = new User(currentUser);
  welcomeMessage.textContent = `Welcome, ${logonUser.getAcronymName()}`;
  loginModal.style.display = 'none';
} else {
  loginModal.style.display = 'block';
}
// Xử lý khi user logout
logoutBtn.addEventListener('click', function () {
  localStorage.removeItem(currentUserKey);
  window.location.href = './pages/login.html';
});
