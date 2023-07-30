'use strict';
// Các thành phần của search form
const searchFormEl = document.querySelector('#search-form');
const inputSearchEl = document.querySelector('#input-query');
// Các thành phần của News UI
const articlesContainer = document.querySelector('#news-container');
const prevBtn = document.querySelector('#btn-prev');
const nextBtn = document.querySelector('#btn-next');
const pageNumEl = document.querySelector('#page-num');
const articlesFields = {
  articlesContainer,
  prevBtn,
  nextBtn,
  pageNumEl,
};
// Class News với apiEndpoint khác
class SearchNews extends NewsApp {
  apiEndpoint = 'https://newsapi.org/v2/everything?';
}

// VALIDATE SEARCH INPUT
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
    // const labelElement = document.querySelector(`label[for=${field.id}]`); // Label element tương ứng của field
    showInvalidMessage(field, `Please input search keyword!`);
    return true;
    // Khi field không bị bỏ trống
  } else {
    removeInvalidMessage(field);
    return false;
  }
}
// Validate khi đang input
inputSearchEl.addEventListener('input', function () {
  emptyFieldCheck(this);
});
inputSearchEl.addEventListener('focusout', function () {
  removeInvalidMessage(this);
});
// Hàm lấy từ khóa từ input
function getSearchKeyword() {
  let keyword = inputSearchEl.value.trim().toLowerCase();
  keyword = `%22${keyword.replaceAll(' ', '%20')}%22`; // Chuyển thành url-encoded
  return keyword;
}
// Khi user đã login
if (currentUser) {
  // Xử lý khi user search articles
  searchFormEl.addEventListener('submit', function (e) {
    e.preventDefault();
    // Kiểm tra user đã nhập từ khóa chưa
    if (emptyFieldCheck(inputSearchEl)) return;
    // Lấy search keyword
    const searchKeyword = getSearchKeyword();
    // Các cài đặt tham số của API url
    const paramRules = {
      pageSize: newsLocalSettings.pageSize,
      q: searchKeyword,
      sortBy: 'relevancy',
      // country: 'us',
      // category: newsLocalSettings.category,
    };

    // Tạo instance hiển thị các bài viết
    const News = new SearchNews(articlesFields, paramRules);
    News.renderArticles();
    News.handlePagination();
  });
} else {
  // Khi user chưa login
  searchFormEl.addEventListener('submit', function (e) {
    e.preventDefault();
  });
  articlesContainer.textContent = 'Please login to use this feature!';
}
