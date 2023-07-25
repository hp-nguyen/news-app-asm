'use strict';
const inputPageSize = document.querySelector('#input-page-size');
const inputCategory = document.querySelector('#input-category');
const saveBtn = document.querySelector('#btn-submit');
const newsLocalSettings = getFromStorage(newsLocalSettingsKey);
inputPageSize.value = newsLocalSettings?.pageSize || '';
inputCategory.value = newsLocalSettings?.category || 'General';
saveBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const settings = {
    pageSize: inputPageSize.value || undefined,
    category: inputCategory.value,
  };
  saveToStorage(newsLocalSettingsKey, settings);
  alert('Setting successful!');
});
