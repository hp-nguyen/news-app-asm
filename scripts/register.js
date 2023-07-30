'use strict';
const registerForm = document.querySelector('#register-form');
const inputFirstName = document.querySelector('#input-firstname');
const inputLastName = document.querySelector('#input-lastname');
const inputUsername = document.querySelector('#input-username');
const inputPassword = document.querySelector('#input-password');
const inputConfirmPassword = document.querySelector('#input-password-confirm');
const formFields = registerForm.querySelectorAll('.form-control');
const submitBtn = document.querySelector('#btn-submit');

// Hàm báo lỗi khi nhập sai thông tin
function showInvalidMessage(field, message) {
  field.classList.add('invalid'); // Đổi style cho trường bị sai thông tin
  const invalidMessageEl = field.nextElementSibling;  // Element hiện thông báo tương ứng
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
  fields.forEach(field => {
    if (emptyFieldCheck(field)) isValid = false;
  });
  return isValid;
}

// Hàm kiểm tra username có trùng hay không
function usernameCheck(usernameField) {
  if (userArr.length > 0) {
    for (let user of userArr) {
      if (usernameField.value === user.username) {
        showInvalidMessage(usernameField, 'Username already exists!');
        return false;
      }
    }
  }
  return true;
}

// Hàm kiểm tra password
function passwordCheck(passwordField) {
  if (passwordField.value.length > 0 && passwordField.value.length < 9) {
    showInvalidMessage(
      passwordField,
      `Password must be more than 8 characters!`
    );
    return false;
  }
  return true;
}

// Hàm kiểm tra confirm password
function confirmPasswordCheck(confirmPasswordField) {
  if (confirmPasswordField.value !== inputPassword.value) {
    showInvalidMessage(
      confirmPasswordField,
      'The password and confirm password must be the same!'
    );
    return false;
  }
  return true;
}

// Hàm validate tất cả data của form
function validateData() {
  let isValid = true;
  if (!noEmptyCheck(formFields)) isValid = false;
  if (!usernameCheck(inputUsername)) isValid = false;
  if (!passwordCheck(inputPassword)) isValid = false;
  if (!confirmPasswordCheck(inputConfirmPassword)) isValid = false;
  return isValid;
}

// Validate khi đang input
for (let i = 0; i < formFields.length; i++) {
  formFields[i].addEventListener('input', function () {
    emptyFieldCheck(this);
  });
}

// Xử lý khi submit form
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  // Lấy dữ liệu nhập vào từ form
  const data = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    username: inputUsername.value,
    password: inputPassword.value,
  };
  // Kiểm tra form hợp lệ
  if (!validateData()) return;
  // Khởi tạo user mới với các dữ liệu hợp lệ
  const newUser = new User(data);
  // Thêm user vào mảng, lưu mảng vào localStorage
  userArr.push(newUser);
  saveToStorage(usersKey, userArr);
  // Chuyển trang đến màn hình login
  window.location.href = './login.html';
});
