'use strict';
const usersKey = 'userArr';
const userArr = getFromStorage(usersKey) || [];
const currentUserKey = 'currentUser';
const currentUser = getFromStorage(currentUserKey);
const todoArrKey = 'todoArr';
const todoArr = getFromStorage(todoArrKey) || [];
const newsLocalSettingsKey = 'localSettings';

// Hàm lưu data vào local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy data từ local storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? undefined;
}
