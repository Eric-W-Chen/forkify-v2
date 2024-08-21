import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  /**
   * Generates the HTML markup for the pagination buttons based on the current page and total number of pages.
   * @method
   * @returns {string} The generated HTML string for the pagination buttons.
   */
  _generateMarkup() {
    const resultsLength = this._data.results.length;
    const resultsPerPage = this._data.resultsPerPage;
    const numPages = Math.ceil(resultsLength / resultsPerPage);
    const currPage = this._data.page;

    const prevButton = `<button data-goto="${
      currPage - 1
    }"button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
         <span>Page ${currPage - 1}</span>               
        </button>`;

    const nextButton = `
    <button data-goto="${
      currPage + 1
    }"class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;

    // If on the first page and there are multiple pages
    if (currPage === 1 && numPages > 1) {
      return nextButton;
    }

    // If on the last page
    if (resultsLength <= resultsPerPage || currPage === numPages) {
      return prevButton;
    }

    // If on any other page
    return `${prevButton}${nextButton}`;
  }

  /**
   * Adds an event handler to the pagination buttons to handle clicks and navigate to the selected page.
   * @method
   * @param {Function} handler - The function to be called when a pagination button is clicked.
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
}

export default new PaginationView();
