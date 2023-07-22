'use strict';
const currentUser = getFromStorage(currentUserKey);
const welcomeMessage = document.querySelector('#welcome-message');
const loginModal = document.querySelector('#login-modal');
const logoutBtn = document.querySelector('#btn-logout');

function getWelcomeName() {
  let welcomeName = `${currentUser.lastName} ${currentUser.firstName}`;
  welcomeName = welcomeName.split(' ');
  const firstName = welcomeName.pop();
  const acronym = welcomeName.reduce((result, word) => result + word[0], '');
  return firstName + acronym;
}
if (currentUser) {
  const welcomeName = getWelcomeName();
  welcomeMessage.textContent = `Welcome, ${welcomeName}`;
  loginModal.style.display = 'none';
} else {
  loginModal.style.display = 'block';
}

logoutBtn.addEventListener('click', function () {
  localStorage.removeItem(currentUserKey);
  window.location.href = './pages/login.html';
});
