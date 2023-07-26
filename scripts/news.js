'use strict';

const defaultNewsSettings = {
  pageSize: 5,
  category: 'General',
};
const newsLocalSettings =
  getFromStorage(newsLocalSettingsKey) || defaultNewsSettings;

const articlesFields = {
  articlesContainer: document.querySelector('#news-container'),
  prevBtn: document.querySelector('#btn-prev'),
  nextBtn: document.querySelector('#btn-next'),
  pageNumEl: document.querySelector('#page-num'),
};
const paramRules = {
  country: 'us',
  pageSize: newsLocalSettings.pageSize,
  category: newsLocalSettings.category,
};

const News = new NewsApp(articlesFields, paramRules);
