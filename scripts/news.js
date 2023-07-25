'use strict';

const articlesFields = {
  articlesContainer: document.querySelector('#news-container'),
  prevBtn: document.querySelector('#btn-prev'),
  nextBtn: document.querySelector('#btn-next'),
  pageNumEl: document.querySelector('#page-num'),
};
const newsLocalSettings = getFromStorage(newsLocalSettingsKey);
const paramRules = {
  country: 'us',
  pageSize: newsLocalSettings?.pageSize || 5,
  category: newsLocalSettings?.category || '',
};

const News = new NewsApp(articlesFields, paramRules);
