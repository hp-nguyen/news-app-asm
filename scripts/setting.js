'use strict';
const inputPageSize = document.querySelector('#input-page-size');
const inputCategory = document.querySelector('#input-category');
const settingsFormEl = document.querySelector('#settings-form')
const saveBtn = document.querySelector('#btn-submit');

// Hàm hiển thị các settings từ local storage
function showNewsSettings() {
  const defaultNewsSettings = {
    pageSize: 5,
    category: 'General',
  };
  const newsLocalSettings =
    getFromStorage(newsLocalSettingsKey) || defaultNewsSettings;

  inputPageSize.value = newsLocalSettings.pageSize;
  inputCategory.value = newsLocalSettings.category;
}

showNewsSettings();

// Xử lý sự kiện thay đổi settings
settingsFormEl.addEventListener('submit', function (e) {
  e.preventDefault();
  const settings = {
    pageSize: Number(inputPageSize.value),
    category: inputCategory.value,
  };
  saveToStorage(newsLocalSettingsKey, settings);
  alert('Setting successful!');
});
