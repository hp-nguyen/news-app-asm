'use strict'
class NewsApp {
  constructor(articlesFields) {
    this.articlesContainer = articlesFields.articlesContainer;
    this.prevBtn = articlesFields.prevBtn;
    this.nextBtn = articlesFields.nextBtn;
    this.pageNumEl = articlesFields.pageNumEl;
    this.curPage = 1;
    this.articlesPerPage = 5;
    this.renderPagination(); // Hiển thị pagination ngay khi tạo instance
    this.renderArticles(); // Hiển thị các tin tức ngay khi tạo instance
  }

  // PRIVATE FIELDS
  // #apiKey = 'badb947b74ee46619d65444ed2fd40a9'; // D
  #apiKey = '450b75dfe6ff463e9dd16960ccb64378'; // P
  // PUBLIC METHODS
  // Hàm lấy dữ liệu từ API
  async getNewsData() {
    const requestParams = this.getRequestParams();
    const url =
      'https://newsapi.org/v2/top-headlines?country=us' +
      '&apiKey=' +
      this.#apiKey +
      requestParams;
    const response = await fetch(url); // Dữ liệu JSON trả về từ API
    const newsData = await response.json(); // Lấy dữ liệu từ JSON
    this.totalArticles = newsData.totalResults; // Tổng số articles lấy được
    this.maxPage = Math.ceil(this.totalArticles / this.articlesPerPage); // Số trang tối đa
    return newsData;
  }
  // Hàm lấy các tham số cần cho Url fetch API
  getRequestParams() {
    const requestParams = [
      `&pageSize=${this.articlesPerPage}`,
      `&page=${this.curPage}`,
    ].join('');

    return requestParams;
  }
  // Hàm hiển thị Articles
  async renderArticles() {
    this.articlesContainer.innerHTML = '';
    const data = await this.getNewsData();
    const articles = data.articles;
    console.log(articles);
    articles.forEach(article => {
      const newsContent = `<div class="card flex-row flex-wrap">
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${article.urlToImage ?? `..\\\\img\\no-image-icon.png`}"
              class="card-img"
              alt="${article.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${
                article.description ?? 'No description available'
              }</p>
              <a href="${
                article.url
              }" class="btn btn-primary" target="_blank">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      this.articlesContainer.insertAdjacentHTML('afterbegin', newsContent);
    });
  }

  // Hàm hiển thị Pagination
  renderPagination() {
    this.#checkPaginationBtns();
    this.#handlePrevBtn();
    this.#handleNextBtn();
  }
  // PRIVATE METHODS
  // Hàm kiểm tra prevBtn & nextBtn
  #checkPaginationBtns() {
    // Kiểm tra nút Previous
    if (this.curPage === 1) {
      // Ẩn nút này khi đang ở trang đầu tiên
      this.prevBtn.style.display = 'none';
    } else this.prevBtn.style.display = 'block';

    // Kiểm tra nút Next
    if (this.curPage === this.maxPage) {
      this.nextBtn.style.display = 'none'; // Ẩn nút này khi đang ở trang cuối cùng
    } else this.nextBtn.style.display = 'block';
  }
  // Xử lý sự kiện click nút Prev
  #handlePrevBtn() {
    this.prevBtn.addEventListener('click', () => {
      this.pageNumEl.innerText = this.curPage -= 1;
      this.renderArticles();
      this.#checkPaginationBtns();
    });
  }
  // Xử lý sự kiện click nút Next
  #handleNextBtn() {
    this.nextBtn.addEventListener('click', () => {
      this.pageNumEl.innerText = this.curPage += 1;
      this.renderArticles();
      this.#checkPaginationBtns();
    });
  }
}