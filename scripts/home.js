'use strict';
const currentUser = getFromStorage(currentUserKey)
const welcomeMessage = document.querySelector('#welcome-message')
const loginModal = document.querySelector('#login-modal')
const logoutBtn = document.querySelector('#btn-logout')
if (currentUser) {
  welcomeMessage.textContent = `Welcome ${currentUser.firstName}`
  loginModal.style.display = 'none'
} else { 
  loginModal.style.display = 'block'
}

logoutBtn.addEventListener('click', function() {
  localStorage.removeItem(currentUserKey)
  window.location.href = './pages/login.html'
} )




