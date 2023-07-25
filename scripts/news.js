'use strict';

const articlesFields = {
  articlesContainer: document.querySelector('#news-container'),
  prevBtn: document.querySelector('#btn-prev'),
  nextBtn: document.querySelector('#btn-next'),
  pageNumEl: document.querySelector('#page-num'),
};
const paramRules = {
  country: 'us',
  pageSize: 5,
  category: 'technology',
};

const News = new NewsApp(articlesFields, paramRules);
