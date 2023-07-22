'use strict';
const inputUsername = document.querySelector('#input-username');
const inputPassword = document.querySelector('#input-password');
const formFields = document.querySelectorAll('.form-control');
const loginBtn = document.querySelector('#btn-submit');
// Hàm báo lỗi khi nhập sai thông tin
function showInvalidMessage(field, message) {
  field.classList.add('invalid');
  // Element hiện thông báo cho trường bị sai thông tin
  const invalidMessageEl = field.nextElementSibling;
  invalidMessageEl.textContent = message;
}

// Hàm xóa lỗi khi nhập đúng thông tin
function removeInvalidMessage(field) {
  field.classList.remove('invalid');
  const invalidMessageEl = field.nextElementSibling;
  invalidMessageEl.textContent = '';
}
// Hàm kiểm tra trường bị bỏ trống
function emptyFieldCheck(field) {
  // Khi field bị bỏ trống
  if (!field.value.trim()) {
    const labelElement = document.querySelector(`label[for=${field.id}]`); // Label element tương ứng của field
    showInvalidMessage(field, `Please input ${labelElement.textContent}!`);
    return true;
    // Khi field không bị bỏ trống
  } else {
    removeInvalidMessage(field);
    return false;
  }
}
// Hàm kiểm tra xem có bất kỳ trường nào bị bỏ trống hay không
function noEmptyCheck(fields) {
  let isValid = true; // True có nghĩa là không có trường nào bị bỏ trống
  fields.forEach((field) => {
    if (emptyFieldCheck(field)) isValid = false;
  });
  return isValid;
}
// Hàm kiểm tra username & password so với các user đã có
function loginCheck() {
  const username = inputUsername.value;
  const password = inputPassword.value;
  const currentUser = userArr.find((user) => user.username === username && user.password === password);
  if (!currentUser) {
    showInvalidMessage(inputUsername, 'Wrong username or password!');
    removeInvalidMessage(inputPassword)
    return false;
  }
  saveToStorage(currentUserKey, currentUser);
  return true;
}

// Hàm kiểm tra thông tin đăng nhập hợp lệ
function validateData() {
  if (!noEmptyCheck(formFields)) return false
  if (!loginCheck()) return false
  return true
}
// Xử lý khi ấn nút login
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (!validateData()) return;
  window.location.href = '../index.html';
});


