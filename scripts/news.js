'use strict';
// Các thành phần của News UI
const articlesFields = {
  articlesContainer: document.querySelector('#news-container'),
  prevBtn: document.querySelector('#btn-prev'),
  nextBtn: document.querySelector('#btn-next'),
  pageNumEl: document.querySelector('#page-num'),
};
// Các cài đặt tham số của API url
const paramRules = {
  country: 'us',
  pageSize: newsLocalSettings.pageSize,
  category: newsLocalSettings.category,
};

// Tạo instance hiển thị các bài viết
const News = new NewsApp(articlesFields, paramRules);
News.renderArticles(); // Hiển thị bài viết
News.handlePagination(); // Hiển thị và xử lý sự kiện cho các nút điều hướng trang
