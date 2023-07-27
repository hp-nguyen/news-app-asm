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
  }
  // PUBLIC FIELDS
  apiEndpoint = 'https://newsapi.org/v2/top-headlines?';
  // PRIVATE FIELDS
  // #apiKey = 'badb947b74ee46619d65444ed2fd40a9'; // D
  #apiKey = '450b75dfe6ff463e9dd16960ccb64378'; // P1
  // #apiKey = '7520e7cb1dec4c91b8144650a610a0cc'; // P2
  // PUBLIC METHODS
  // Hàm lấy dữ liệu từ API
  async getNewsData() {
    try {
      const url = this.getApiUrl();
      const response = await fetch(url); // Dữ liệu JSON trả về từ API
      const newsData = await response.json(); // Lấy dữ liệu từ JSON
      if (!response.ok) throw new Error(newsData.message);
      this.totalArticles = newsData.totalResults; // Tổng số articles lấy được
      this.maxPage = Math.ceil(this.totalArticles / this.articlesPerPage); // Số trang tối đa
      return newsData;
    } catch (err) {
      console.error(`Fetching API failed. Message: "${err.message}"`);
      return undefined;
    }
  }
  // Hàm lấy url để fetch API
  getApiUrl() {
    const requestParams = this.paramRules.reduce((result, [param, value]) => {
      if (value === '') return result;
      return result + `&${param}=${value.toString().toLowerCase()}`;
    }, '');
    const url =
      this.apiEndpoint +
      `page=${this.curPage}` +
      requestParams +
      `&apiKey=${this.#apiKey}`;
    return url;
  }
  // Hàm hiển thị Articles
  async renderArticles() {
    this.articlesContainer.innerHTML = ''; // Reset nội dung container
    const data = await this.getNewsData();
    // Nếu không lấy được dữ liệu
    if (!data) {
      this.maxPage = 0;
      this.#displayPaginationComponents();
      return;
    }
    // Nếu lấy dữ liệu thành công
    this.#displayPaginationComponents(); // Hiển thị điều hướng trang
    // Nếu không có bài viết nào trong dữ liệu trả về
    if (data.totalResults === 0) {
      this.articlesContainer.insertAdjacentHTML(
        'afterbegin',
        `<p class="text-center">We couldn't find any articles</p>`
      );
      return;
    }
    // Nếu có bài viết trong dữ liệu trả về
    const articles = data.articles;
    articles.forEach(article => {
      const newsContent = `<div class="card flex-row flex-wrap">
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="${article.urlToImage ?? '../img/no-image-icon.png'}"
                class="card-img"
                alt="${
                  article.title
                }" onerror="event.target.src='../img/no-image-icon.png'">
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
    this.#displayPaginationComponents();
    this.#handlePrevBtn();
    this.#handleNextBtn();
  }
  // PRIVATE METHODS
  // Hàm kiểm tra & hiển thị các thành phần của pagination
  #displayPaginationComponents() {
    // Update & Hiển thị số trang hiện tại
    this.pageNumEl.textContent = this.curPage;
    // Kiểm tra nút Previous
    if (this.curPage === 1) {
      // Ẩn nút này khi đang ở trang đầu tiên
      this.prevBtn.style.display = 'none';
    } else this.prevBtn.style.display = 'block';

    // Kiểm tra nút Next
    if (this.curPage >= this.maxPage) {
      this.nextBtn.style.display = 'none'; // Ẩn nút này khi đang ở trang cuối cùng
    } else this.nextBtn.style.display = 'block';
  }
  // Xử lý sự kiện click nút Prev
  #handlePrevBtn() {
    // Không dùng addEventListener vì bị lặp event click ở nhiều instance khác nhau, dùng onclick để ghi đè event click
    this.prevBtn.onclick = () => {
      this.curPage -= 1;
      this.renderArticles();
    };
  }
  // Xử lý sự kiện click nút Next
  #handleNextBtn() {
    this.nextBtn.onclick = () => {
      this.curPage += 1;
      this.renderArticles();
    };
  }
}
