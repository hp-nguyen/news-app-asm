'use strict';
class NewsApp {
  constructor(apiKey) {
    this.#apiKey = apiKey;
    this.renderPageNavigation();
  }

  // Public fields
  newsContainer = document.querySelector('#news-container');
  prevBtn = document.querySelector('#btn-prev');
  nextBtn = document.querySelector('#btn-next');
  pageNumEl = document.querySelector('#page-num');
  // Private fields
  #apiKey = '450b75dfe6ff463e9dd16960ccb64378';
  #curPage = 1;
  #newsPerPage = 5;
  #totalNews;
  #maxPage;
  // Public methods
  async renderNews() {
    this.newsContainer.innerHTML = '';
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=${
        this.#newsPerPage
      }&page=${this.#curPage}&apiKey=${this.#apiKey}`
    );
    const data = await response.json();
    this.#totalNews = data.totalResults;
    this.#maxPage = Math.ceil(this.#totalNews / this.#newsPerPage);
    const newsList = data.articles;
    newsList.forEach(news => {
      const newsContent = `<div class="card flex-row flex-wrap">
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${news.urlToImage}"
              class="card-img"
              alt="${news.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text">${news.description}</p>
              <a href="${news.url}" class="btn btn-primary" target="_blank">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      this.newsContainer.insertAdjacentHTML('afterbegin', newsContent);
    });
  }
  renderPageNavigation() {
    this.#DisplayPrevBtn();
    this.#HandlePrevBtn();
    this.#HandleNextBtn();
  }
  // Private methods
  #DisplayBtn(btn, displayAttr) {
    btn.style.display = displayAttr;
  }
  #DisplayPrevBtn() {
    if (this.pageNumEl.textContent === '1') {
      this.#DisplayBtn(this.prevBtn, 'none');
      return false;
    }
    this.prevBtn.style.display = 'block';
    return true;
  }
  #HandlePrevBtn() {
    this.prevBtn.addEventListener('click', () => {
      this.pageNumEl.innerText = this.#curPage -= 1;
      this.renderNews();
      this.#DisplayNextBtn();
      if (this.#DisplayPrevBtn()) {
        this.prevBtn.style.display = 'block';
      } else this.prevBtn.style.display = 'none';
    });
  }
  #DisplayNextBtn() {
    if (this.#curPage >= this.#maxPage) {
      this.#DisplayBtn(this.nextBtn, 'none');
      return false;
    }
    this.#DisplayBtn(this.nextBtn, 'block');
    return true;
  }
  #HandleNextBtn() {
    this.nextBtn.addEventListener('click', () => {
      this.pageNumEl.innerText = this.#curPage += 1;
      this.#DisplayPrevBtn();
      this.renderNews();
      if (this.#curPage >= this.#maxPage) {
        this.nextBtn.style.display = 'none';
      } else this.nextBtn.style.display = 'block';
    });
  }
}
const apiKey = 'badb947b74ee46619d65444ed2fd40a9'; // D
// const apiKey = '450b75dfe6ff463e9dd16960ccb64378'; // P

const News = new NewsApp(apiKey);
News.renderNews();
