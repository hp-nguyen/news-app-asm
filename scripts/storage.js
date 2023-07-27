'use strict';
// Users info
const usersKey = 'userArr';
const userArr = getFromStorage(usersKey) || [];
// Current User info
const currentUserKey = 'currentUser';
const currentUser = getFromStorage(currentUserKey);
// Todo info
const todoArrKey = 'todoArr';
const todoArr = getFromStorage(todoArrKey) || [];
// Settings info
const newsLocalSettingsKey = 'localSettings';
const defaultNewsSettings = {
  pageSize: 5,
  category: 'General',
};
const newsLocalSettings =
    getFromStorage(newsLocalSettingsKey) || defaultNewsSettings;
    
// Hàm lưu data vào local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy data từ local storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? undefined;
}
