import View from "./View";
import icons from "url:../../img/icons.svg";
import fracty from "fracty";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errMessage = "We could not find that recipe. Please try another one!";
  _message = "";

  /**
   * Adds event handlers to render the recipe when the page loads or the hash changes.
   * @method
   * @param {Function} handler - The function to be called when the event occurs.
   */
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  /**
   * Adds event handler to update the servings when the user clicks the update buttons.
   * @method
   * @param {Function} handler - The function to be called when the servings are updated.
   */
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;

      const updateTo = Number(btn.dataset.updateTo);
      if (updateTo > 0) handler(updateTo);
    });
  }

  /**
   * Adds event handler to toggle the bookmark status of the recipe.
   * @method
   * @param {Function} handler - The function to be called when the bookmark button is clicked.
   */
  addHandlerToggleBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  /**
   * Generates the HTML markup for the recipe.
   * @method
   * @returns {string} The generated HTML string for the recipe.
   * @private
   */
  _generateMarkup() {
    return `<figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button data-update-to="${
              this._data.servings - 1
            }" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-update-to="${
              this._data.servings + 1
            }" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

      <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>

        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateMarkupIngredients).join("")}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
  }

  /**
   * Generates the HTML markup for a single ingredient.
   * @method
   * @param {Object} el - The ingredient object containing quantity, unit, and description.
   * @returns {string} The generated HTML string for the ingredient.
   * @private
   */
  _generateMarkupIngredients(el) {
    return `<li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              el.quantity ? fracty(el.quantity).toString() : ""
            }</div>
            <div class="recipe__description">
              <span class="recipe__unit">${el.unit}</span>
              ${el.description}
            </div>
          </li>`;
  }
}

export default new RecipeView();
