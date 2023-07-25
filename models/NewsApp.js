'use strict';
class NewsApp {
  constructor(articlesUIFields, paramRules) {
    this.articlesContainer = articlesUIFields.articlesContainer;
    this.prevBtn = articlesUIFields.prevBtn;
    this.nextBtn = articlesUIFields.nextBtn;
    this.pageNumEl = articlesUIFields.pageNumEl;
    this.paramRules = Object.entries(paramRules); // Các quy định về tham số của url khi gọi API
    this.curPage = 1; // Trang hiện tại
    this.articlesPerPage = paramRules.pageSize; // Số bài báo hiển thị mỗi trang
    this.totalArticles; // Tổng số bài báo
    this.maxPage; // Số trang tối đa có thể hiển thị
    this.handlePagination(); // Hiển thị pagination ngay khi tạo instance
    this.renderArticles(); // Hiển thị các tin tức ngay khi tạo instance
  }

  // PRIVATE FIELDS
  // #apiKey = 'badb947b74ee46619d65444ed2fd40a9'; // D
  #apiKey = '450b75dfe6ff463e9dd16960ccb64378'; // P
  // PUBLIC METHODS
  // Hàm lấy dữ liệu từ API
  async getNewsData() {
    try {
      const url = this.getApiUrl();
      const response = await fetch(url); // Dữ liệu JSON trả về từ API
      const newsData = await response.json(); // Lấy dữ liệu từ JSON
      if (!response.ok) throw new Error(response.status);
      this.totalArticles = newsData.totalResults; // Tổng số articles lấy được
      this.maxPage = Math.ceil(this.totalArticles / this.articlesPerPage); // Số trang tối đa
      return newsData;
    } catch (err) {
      console.error(`Fetching API failed ... ${err}`);
      return undefined;
    }
  }
  // Hàm lấy url để fetch API
  getApiUrl() {
    const requestParams = this.paramRules.reduce(
      (result, rule) => result + `&${rule[0]}=${rule[1]}`,
      ''
    );
    const url =
      `https://newsapi.org/v2/top-headlines?page=${this.curPage}&apiKey=${
        this.#apiKey
      }` + requestParams;
    return url;
  }
  // Hàm hiển thị Articles
  async renderArticles() {
    this.articlesContainer.innerHTML = '';
    const data = await this.getNewsData();
    if (!data) return;
    this.#displayPaginationBtns();
    const articles = data.articles;
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
      this.articlesContainer.insertAdjacentHTML('beforeend', newsContent);
    });
  }
  // Hàm hiển thị & gắn event Pagination
  handlePagination() {
    this.#displayPaginationBtns();
    this.#handlePrevBtn();
    this.#handleNextBtn();
  }
  // PRIVATE METHODS
  // Hàm kiểm tra & hiển thị prevBtn & nextBtn
  #displayPaginationBtns() {
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
    });
  }
  // Xử lý sự kiện click nút Next
  #handleNextBtn() {
    this.nextBtn.addEventListener('click', () => {
      this.pageNumEl.innerText = this.curPage += 1;
      this.renderArticles();
    });
  }
}
